#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Автофикс статического Framer-сайта:
- ищет Framer siteId в файлах;
- находит недостающие .mjs-модули, assets и searchIndex-*.json;
- докачивает их с https://framerusercontent.com.

Запуск из корня проекта:
    python fix_framer_site.py

Или с указанием корня:
    python fix_framer_site.py --root "C:\\Downloaded Web Sites\\geniai.framer.website"
"""

import argparse
import os
import re
import sys
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import urlretrieve

FRAMER_CDN = "https://framerusercontent.com"


def log(msg: str):
    print(msg, file=sys.stdout)


def find_site_ids(root: Path) -> set[str]:
    """
    Ищем siteId по паттернам:
    - https://framerusercontent.com/sites/<id>/
    - sites/<id>/searchIndex-*.json
    """
    site_ids: set[str] = set()
    pattern_url = re.compile(r"framerusercontent\.com/sites/([A-Za-z0-9_-]+)")
    pattern_local = re.compile(r"sites/([A-Za-z0-9_-]+)/searchIndex-[^\"'>]+\.json")

    for path in root.rglob("*"):
        if not path.is_file():
            continue
        if path.suffix.lower() not in {".html", ".htm", ".js", ".mjs", ".json"}:
            continue
        try:
            text = path.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue

        for m in pattern_url.findall(text):
            site_ids.add(m)
        for m in pattern_local.findall(text):
            site_ids.add(m)

    return site_ids


def find_missing_mjs_for_site(root: Path, site_id: str) -> list[str]:
    """
    Находим недостающие .mjs-модули для конкретного siteId:
    - ищем import("./xxx.mjs") и import "./xxx.mjs";
    - проверяем их наличие в sites/<site_id>/.
    """
    site_dir = root / "sites" / site_id
    if not site_dir.is_dir():
        log(f"[WARN] sites/{site_id} не найден локально")
        return []

    missing: set[str] = set()
    # dynamic + static imports
    dyn_import = re.compile(r'import\(\s*["\']\./([^"\']+\.mjs)["\']\s*\)')
    static_import = re.compile(r'from\s+["\']\./([^"\']+\.mjs)["\']')

    for mjs in site_dir.glob("*.mjs"):
        try:
            text = mjs.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue

        for rel in dyn_import.findall(text):
            if not (site_dir / rel).exists():
                missing.add(rel)

        for rel in static_import.findall(text):
            if not (site_dir / rel).exists():
                missing.add(rel)

    return sorted(missing)


def find_missing_assets(root: Path) -> list[str]:
    """
    Ищем ссылки на https://framerusercontent.com/assets/<file>
    и проверяем, каких файлов нет ни в assets/, ни в images/.
    """
    asset_names: set[str] = set()
    pattern = re.compile(r"https://framerusercontent\.com/assets/([A-Za-z0-9_\-\.]+\.(?:png|jpe?g|webp|gif|mp4|svg|woff2?))")

    for path in root.rglob("*"):
        if not path.is_file():
            continue
        if path.suffix.lower() not in {".html", ".htm", ".js", ".mjs", ".css"}:
            continue
        try:
            text = path.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue

        for m in pattern.findall(text):
            asset_names.add(m)

    missing: list[str] = []
    for name in sorted(asset_names):
        in_assets = (root / "assets" / name).exists()
        in_images = (root / "images" / name).exists()
        if not in_assets and not in_images:
            missing.append(name)

    return missing


def find_missing_search_indexes(root: Path, site_id: str) -> list[str]:
    """
    Ищем searchIndex-*.json для данного siteId, которые указаны в коде,
    но отсутствуют локально в sites/<siteId>/.
    """
    pattern = re.compile(
        r"https://framerusercontent\.com/sites/"
        + re.escape(site_id)
        + r"/(searchIndex-[^\"'>]+\.json)"
    )
    indexes: set[str] = set()

    for path in root.rglob("*"):
        if not path.is_file():
            continue
        if path.suffix.lower() not in {".html", ".htm", ".js", ".mjs"}:
            continue
        try:
            text = path.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue

        for m in pattern.findall(text):
            indexes.add(m)

    site_dir = root / "sites" / site_id
    missing: list[str] = []
    for name in sorted(indexes):
        if not (site_dir / name).exists():
            missing.append(name)

    return missing


def download_file(url: str, dest: Path):
    dest.parent.mkdir(parents=True, exist_ok=True)
    try:
        log(f"[GET] {url}")
        urlretrieve(url, dest)
        log(f"[OK ] {dest}")
    except HTTPError as e:
        log(f"[ERR] HTTP {e.code} for {url}")
    except URLError as e:
        log(f"[ERR] URL error for {url}: {e}")
    except Exception as e:
        log(f"[ERR] Fail {url}: {e}")


def main():
    parser = argparse.ArgumentParser(
        description="Анализ и докачка недостающих файлов для Framer-зеркала."
    )
    parser.add_argument(
        "--root",
        type=str,
        default=".",
        help="Корень проекта (по умолчанию текущая папка).",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Только показать, что будет скачано, без реального скачивания.",
    )

    args = parser.parse_args()
    root = Path(args.root).resolve()

    if not root.is_dir():
        log(f"[FATAL] root '{root}' не найден")
        sys.exit(1)

    log(f"[INFO] Root: {root}")

    # 1. Ищем все siteId.
    site_ids = find_site_ids(root)
    if not site_ids:
        log("[WARN] Не найдено ни одного siteId. Можно указать вручную и дописать скрипт.")
    else:
        log(f"[INFO] Найдены siteId: {', '.join(sorted(site_ids))}")

    # 2. Анализируем каждый siteId.
    for site_id in sorted(site_ids):
        log(f"\n=== Анализ siteId: {site_id} ===")
        missing_mjs = find_missing_mjs_for_site(root, site_id)
        if missing_mjs:
            log("[MISS] Отсутствующие .mjs:")
            for f in missing_mjs:
                log(f"   - {f}")
        else:
            log("[OK  ] Все импортируемые .mjs существуют локально.")

        missing_indexes = find_missing_search_indexes(root, site_id)
        if missing_indexes:
            log("[MISS] searchIndex JSON, указанные в коде, но отсутствующие локально:")
            for f in missing_indexes:
                log(f"   - {f}")
        else:
            log("[OK  ] searchIndex JSON для этого siteId локально присутствуют либо не используются.")

        # Скачиваем для этого siteId
        if not args.dry_run:
            for f in missing_mjs:
                url = f"{FRAMER_CDN}/sites/{site_id}/{f}"
                dest = root / "sites" / site_id / f
                download_file(url, dest)

            for f in missing_indexes:
                url = f"{FRAMER_CDN}/sites/{site_id}/{f}"
                dest = root / "sites" / site_id / f
                download_file(url, dest)

    # 3. Анализируем assets
    log("\n=== Анализ assets (framerusercontent.com/assets/...) ===")
    missing_assets = find_missing_assets(root)
    if missing_assets:
        log("[MISS] Нет локальных копий для следующих assets:")
        for name in missing_assets:
            log(f"   - {name}")
    else:
        log("[OK  ] Все assets из framerusercontent.com имеют локальные копии в assets/ или images/.")

    if not args.dry_run:
        for name in missing_assets:
            url = f"{FRAMER_CDN}/assets/{name}"
            # по умолчанию кладём в assets/
            dest = root / "assets" / name
            download_file(url, dest)

    log("\n=== Готово ===")
    if args.dry_run:
        log("Режим dry-run: ничего не скачивалось, только анализ.")
    else:
        log("Недостающие файлы попытались докачаться. Проверь логи и перезапусти сервер.")


if __name__ == "__main__":
    main()
