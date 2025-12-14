import{A as d,D as z,F as D,a as N,f as W,y as v}from"./chunk-Y54W6LH6.mjs";import{A as L,p as _,t as S,u as A,v as T,z as y}from"./chunk-YZ2MURRK.mjs";import{c as h}from"./chunk-A3IIQ6X3.mjs";var Y=/var\s*\(\s*(--[\w-]+)(?:\s*,\s*((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*))?\s*\)/;function G(...e){let t=v.current()===v.canvas,a=typeof h>"u",o=K(),[s,i]=T(()=>j(e.map(E)));_(()=>{if(!t)return;let r=document.body.querySelector("main > div");if(!r)return;let n=new MutationObserver(()=>{i(j(e.map(E)))});return n.observe(r,{attributes:!0,attributeFilter:["style"]}),()=>n.disconnect()},e);let l=S(()=>e.map(E),[e]);if(a)return e.map(r=>Q(r));let c=[];for(let r=0;r<e.length;r++){let n=e[r];if(typeof n!="string"){c.push(n);continue}let u=l[r],p=s[u];u&&p?c.push(o?p.dark||p.light||n:p.light||n):c.push(n)}return c}function j(e){let t=v.current()===v.canvas,a={},o={},s={};if(t&&typeof document<"u"){let l=document.body.querySelector("main > div");if(l){let c=l.getAttribute("style");if(c){let r=O(c);o=r,s=r}}}else{let{light:l,dark:c}=$();o=O(l),s=O(c)}return new Set([...Object.keys(o),...Object.keys(s)]).forEach(l=>{a[l]={light:o[l]||"",dark:s[l]||""}}),a}function $(){let e="",t="";if(typeof document<"u"){let a=document.head.querySelectorAll("style[data-framer-css], style[data-framer-css-ssr], style[data-framer-css-ssr-minified]");for(let o of a){let s=o.sheet?.cssRules;if(!s)continue;let i=[];for(let l of s)if(l instanceof CSSStyleRule)i.push([l,!1]);else if(l instanceof CSSMediaRule&&l.conditionText==="(prefers-color-scheme: dark)")for(let c of l.cssRules)c instanceof CSSStyleRule&&i.push([c,!0]);for(let[l,c]of i){let r=l.cssText;if(!r.includes("--token-"))continue;let u=c?l.selectorText==="body":l.selectorText==='body[data-framer-theme="dark"]',p=!c&&l.selectorText==="body";if(!(!u&&!p)&&(u?t||(t=r.substring(r.indexOf("{")+1,r.lastIndexOf("}")).trim()):e||(e=r.substring(r.indexOf("{")+1,r.lastIndexOf("}")).trim()),t&&e))break}if(t&&e)break}}return{light:e,dark:t}}function K(){let e=typeof h<"u"&&h.location.origin.endsWith("framercanvas.com"),[t,a]=T(()=>typeof h>"u"?!1:e&&typeof document<"u"?document.body.getAttribute("data-framer-theme")==="dark":h.matchMedia("(prefers-color-scheme: dark)").matches);return _(()=>{if(e){let o=new MutationObserver(s=>{s.forEach(i=>{if(i.attributeName==="data-framer-theme"){let l=document.body.getAttribute("data-framer-theme");a(l==="dark")}})});return o.observe(document.body,{attributes:!0,attributeFilter:["data-framer-theme"]}),()=>o.disconnect()}else{let o=h.matchMedia("(prefers-color-scheme: dark)"),s=i=>{a(i.matches)};return o.matches!==t&&a(o.matches),o.addListener(s),()=>o.removeListener(s)}},[e]),t}function E(e){if(!e||!e.startsWith("var("))return"";let t=Y.exec(e);return t&&t[1]||""}function O(e){let t={};return e&&e.split(";").filter(Boolean).forEach(o=>{let[s,i]=o.split(":").map(l=>l.trim());s&&i&&(t[s]=i)}),t}function Q(e){if(!e||!e.startsWith("var("))return e;let a=e.slice(4,-1).split(",");return a.length>1?a.slice(1).join(",").trim():""}function f(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var C=class{constructor(t,a,o={},s,i=1,l=0){f(this,"canvas",void 0),f(this,"gl",void 0),f(this,"program",null),f(this,"uniformLocations",{}),f(this,"fragmentShader",void 0),f(this,"rafId",null),f(this,"lastFrameTime",0),f(this,"totalAnimationTime",0),f(this,"speed",1),f(this,"providedUniforms",void 0),f(this,"hasBeenDisposed",!1),f(this,"resolutionChanged",!0),f(this,"initWebGL",()=>{let r=J(this.gl,X,this.fragmentShader);r&&(this.program=r,this.setupPositionAttribute(),this.setupUniforms())}),f(this,"setupPositionAttribute",()=>{let r=this.gl.getAttribLocation(this.program,"a_position"),n=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,n);let u=[-1,-1,1,-1,-1,1,-1,1,1,-1,1,1];this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(u),this.gl.STATIC_DRAW),this.gl.enableVertexAttribArray(r),this.gl.vertexAttribPointer(r,2,this.gl.FLOAT,!1,0,0)}),f(this,"setupUniforms",()=>{this.uniformLocations={u_time:this.gl.getUniformLocation(this.program,"u_time"),u_pixelRatio:this.gl.getUniformLocation(this.program,"u_pixelRatio"),u_resolution:this.gl.getUniformLocation(this.program,"u_resolution"),...Object.fromEntries(Object.keys(this.providedUniforms).map(r=>[r,this.gl.getUniformLocation(this.program,r)]))}}),f(this,"resizeObserver",null),f(this,"setupResizeObserver",()=>{this.resizeObserver=new ResizeObserver(()=>this.handleResize()),this.resizeObserver.observe(this.canvas),this.handleResize()}),f(this,"handleResize",()=>{let r=h.devicePixelRatio,n=this.canvas.clientWidth*r,u=this.canvas.clientHeight*r;(this.canvas.width!==n||this.canvas.height!==u)&&(this.canvas.width=n,this.canvas.height=u,this.resolutionChanged=!0,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.render(performance.now()))}),f(this,"render",r=>{if(this.hasBeenDisposed)return;let n=r-this.lastFrameTime;this.lastFrameTime=r,this.speed!==0&&(this.totalAnimationTime+=n*this.speed),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.useProgram(this.program),this.gl.uniform1f(this.uniformLocations.u_time,this.totalAnimationTime*.001),this.resolutionChanged&&(this.gl.uniform2f(this.uniformLocations.u_resolution,this.gl.canvas.width,this.gl.canvas.height),this.gl.uniform1f(this.uniformLocations.u_pixelRatio,h.devicePixelRatio),this.resolutionChanged=!1),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.speed!==0?this.requestRender():this.rafId=null}),f(this,"requestRender",()=>{this.rafId!==null&&cancelAnimationFrame(this.rafId),this.rafId=requestAnimationFrame(this.render)}),f(this,"updateProvidedUniforms",()=>{this.gl.useProgram(this.program),Object.entries(this.providedUniforms).forEach(([r,n])=>{let u=this.uniformLocations[r];if(u)if(Array.isArray(n))switch(n.length){case 2:this.gl.uniform2fv(u,n);break;case 3:this.gl.uniform3fv(u,n);break;case 4:this.gl.uniform4fv(u,n);break;default:n.length===9?this.gl.uniformMatrix3fv(u,!1,n):n.length===16?this.gl.uniformMatrix4fv(u,!1,n):console.warn(`Unsupported uniform array length: ${n.length}`)}else typeof n=="number"?this.gl.uniform1f(u,n):typeof n=="boolean"?this.gl.uniform1i(u,n?1:0):console.warn(`Unsupported uniform type for ${r}: ${typeof n}`)})}),f(this,"setSeed",r=>{let n=8.333333333333334;this.totalAnimationTime=r*n,this.lastFrameTime=performance.now(),this.render(performance.now())}),f(this,"setSpeed",(r=1)=>{this.speed=r,this.rafId===null&&r!==0&&(this.lastFrameTime=performance.now(),this.rafId=requestAnimationFrame(this.render)),this.rafId!==null&&r===0&&(cancelAnimationFrame(this.rafId),this.rafId=null)}),f(this,"setUniforms",r=>{this.providedUniforms={...this.providedUniforms,...r},this.updateProvidedUniforms(),this.render(performance.now())}),f(this,"dispose",()=>{this.hasBeenDisposed=!0,this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.gl&&this.program&&(this.gl.deleteProgram(this.program),this.program=null,this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,null),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,null),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.getError()),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),this.uniformLocations={}}),this.canvas=t,this.fragmentShader=a,this.providedUniforms=o,this.totalAnimationTime=l;let c=t.getContext("webgl2",s);if(!c)throw new Error("WebGL not supported");this.gl=c,this.initWebGL(),this.setupResizeObserver(),this.setSpeed(i),this.canvas.setAttribute("data-paper-shaders","true")}},X=`#version 300 es
layout(location = 0) in vec4 a_position;

void main() {
  gl_Position = a_position;
}
`;function q(e,t,a){let o=e.createShader(t);return o?(e.shaderSource(o,a),e.compileShader(o),e.getShaderParameter(o,e.COMPILE_STATUS)?o:(console.error("An error occurred compiling the shaders: "+e.getShaderInfoLog(o)),e.deleteShader(o),null)):null}function J(e,t,a){let o=q(e,e.VERTEX_SHADER,t),s=q(e,e.FRAGMENT_SHADER,a);if(!o||!s)return null;let i=e.createProgram();return i?(e.attachShader(i,o),e.attachShader(i,s),e.linkProgram(i),e.getProgramParameter(i,e.LINK_STATUS)?(e.detachShader(i,o),e.detachShader(i,s),e.deleteShader(o),e.deleteShader(s),i):(console.error("Unable to initialize the shader program: "+e.getProgramInfoLog(i)),e.deleteProgram(i),e.deleteShader(o),e.deleteShader(s),null)):null}var I={Checks:0,Stripes:1,Edge:2},U=`#version 300 es
precision highp float;

uniform float u_time;
uniform float u_pixelRatio;
uniform vec2 u_resolution;

uniform float u_scale;
uniform float u_rotation;
uniform vec4 u_color1;
uniform vec4 u_color2;
uniform vec4 u_color3;
uniform float u_proportion;
uniform float u_softness;
uniform float u_shape;
uniform float u_shapeScale;
uniform float u_distortion;
uniform float u_swirl;
uniform float u_swirlIterations;


out vec4 fragColor;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}
float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  // Smoothstep for interpolation
  vec2 u = f * f * (3.0 - 2.0 * f);

  // Do the interpolation as two nested mix operations
  // If you try to do this in one big operation, there's enough precision loss to be off by 1px at cell boundaries
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);

}

vec4 blend_colors(vec4 c1, vec4 c2, vec4 c3, float mixer, float edgesWidth, float edge_blur) {
    vec3 color1 = c1.rgb * c1.a;
    vec3 color2 = c2.rgb * c2.a;
    vec3 color3 = c3.rgb * c3.a;

    float r1 = smoothstep(.0 + .35 * edgesWidth, .7 - .35 * edgesWidth + .5 * edge_blur, mixer);
    float r2 = smoothstep(.3 + .35 * edgesWidth, 1. - .35 * edgesWidth + edge_blur, mixer);

    vec3 blended_color_2 = mix(color1, color2, r1);
    float blended_opacity_2 = mix(c1.a, c2.a, r1);

    vec3 c = mix(blended_color_2, color3, r2);
    float o = mix(blended_opacity_2, c3.a, r2);
    return vec4(c, o);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 uv_original = uv;

    float t = .5 * u_time;

    float noise_scale = .0005 + .006 * u_scale;

    uv -= .5;
    uv *= (noise_scale * u_resolution);
    uv = rotate(uv, u_rotation * .5 * PI);
    uv /= u_pixelRatio;
    uv += .5;

    float n1 = noise(uv * 1. + t);
    float n2 = noise(uv * 2. - t);
    float angle = n1 * TWO_PI;
    uv.x += 4. * u_distortion * n2 * cos(angle);
    uv.y += 4. * u_distortion * n2 * sin(angle);

    float iterations_number = ceil(clamp(u_swirlIterations, 1., 30.));
    for (float i = 1.; i <= iterations_number; i++) {
        uv.x += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1.5 * uv.y);
        uv.y += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1. * uv.x);
    }

    float proportion = clamp(u_proportion, 0., 1.);

    float shape = 0.;
    float mixer = 0.;
    if (u_shape < .5) {
      vec2 checks_shape_uv = uv * (.5 + 3.5 * u_shapeScale);
      shape = .5 + .5 * sin(checks_shape_uv.x) * cos(checks_shape_uv.y);
      mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
    } else if (u_shape < 1.5) {
      vec2 stripes_shape_uv = uv * (.25 + 3. * u_shapeScale);
      float f = fract(stripes_shape_uv.y);
      shape = smoothstep(.0, .55, f) * smoothstep(1., .45, f);
      mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
    } else {
      float sh = 1. - uv.y;
      sh -= .5;
      sh /= (noise_scale * u_resolution.y);
      sh += .5;
      float shape_scaling = .2 * (1. - u_shapeScale);
      shape = smoothstep(.45 - shape_scaling, .55 + shape_scaling, sh + .3 * (proportion - .5));
      mixer = shape;
    }

    vec4 color_mix = blend_colors(u_color1, u_color2, u_color3, mixer, 1. - clamp(u_softness, 0., 1.), .01 + .01 * u_scale);

    fragColor = vec4(color_mix.rgb, color_mix.a);
}
`;function b(e,t=[0,0,0,1]){if(Array.isArray(e))return e.length===4?e:e.length===3?[...e,1]:b(t);if(typeof e!="string")return b(t);let a,o,s,i=1;if(e.startsWith("#"))[a,o,s,i]=Z(e);else if(e.startsWith("rgb"))[a,o,s,i]=ee(e);else if(e.startsWith("hsl"))[a,o,s,i]=re(te(e));else return console.error("Unsupported color format",e),b(t);return[M(a,0,1),M(o,0,1),M(s,0,1),M(i,0,1)]}function Z(e){e=e.replace(/^#/,""),e.length===3&&(e=e.split("").map(i=>i+i).join("")),e.length===6&&(e=e+"ff");let t=parseInt(e.slice(0,2),16)/255,a=parseInt(e.slice(2,4),16)/255,o=parseInt(e.slice(4,6),16)/255,s=parseInt(e.slice(6,8),16)/255;return[t,a,o,s]}function ee(e){let t=e.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)$/i);return t?[parseInt(t[1]??"0")/255,parseInt(t[2]??"0")/255,parseInt(t[3]??"0")/255,t[4]===void 0?1:parseFloat(t[4])]:[0,0,0,1]}function te(e){let t=e.match(/^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([0-9.]+))?\s*\)$/i);return t?[parseInt(t[1]??"0"),parseInt(t[2]??"0"),parseInt(t[3]??"0"),t[4]===void 0?1:parseFloat(t[4])]:[0,0,0,1]}function re(e){let[t,a,o,s]=e,i=t/360,l=a/100,c=o/100,r,n,u;if(a===0)r=n=u=c;else{let p=(x,P,g)=>(g<0&&(g+=1),g>1&&(g-=1),g<.16666666666666666?x+(P-x)*6*g:g<.5?P:g<.6666666666666666?x+(P-x)*(.6666666666666666-g)*6:x),V=c<.5?c*(1+l):c+l-c*l,k=2*c-V;r=p(k,V,i+1/3),n=p(k,V,i),u=p(k,V,i-1/3)}return[r,n,u,s]}var M=(e,t,a)=>Math.min(Math.max(e,t),a);var H=N(.65,0,.88,.77),R={Prism:{color1:"#050505",color2:"#66B3FF",color3:"#FFFFFF",rotation:-50,proportion:1,scale:.01,speed:30,distortion:0,swirl:50,swirlIterations:16,softness:47,offset:-299,shape:"Checks",shapeSize:45},Lava:{color1:"#FF9F21",color2:"#FF0303",color3:"#000000",rotation:114,proportion:100,scale:.52,speed:30,distortion:7,swirl:18,swirlIterations:20,softness:100,offset:717,shape:"Edge",shapeSize:12},Plasma:{color1:"#B566FF",color2:"#000000",color3:"#000000",rotation:0,proportion:63,scale:.75,speed:30,distortion:5,swirl:61,swirlIterations:5,softness:100,offset:-168,shape:"Checks",shapeSize:28},Pulse:{color1:"#66FF85",color2:"#000000",color3:"#000000",rotation:-167,proportion:92,scale:0,speed:20,distortion:54,swirl:75,swirlIterations:3,softness:28,offset:-813,shape:"Checks",shapeSize:79},Vortex:{color1:"#000000",color2:"#FFFFFF",color3:"#000000",rotation:50,proportion:41,scale:.4,speed:20,distortion:0,swirl:100,swirlIterations:3,softness:5,offset:-744,shape:"Stripes",shapeSize:80},Mist:{color1:"#050505",color2:"#FF66B8",color3:"#050505",rotation:0,proportion:33,scale:.48,speed:39,distortion:4,swirl:65,swirlIterations:5,softness:100,offset:-235,shape:"Edge",shapeSize:48}};function B(e){let t=D(),a=v.current()===v.canvas,o=e.preset==="custom"||e.colorMode==="custom",s=e.preset==="custom"?e:R[e.preset]||Object.values(R)[0],[i,l,c]=G(e.color1,e.color2,e.color3),r=A(null),n=W(r,{once:!1,amount:.1}),u=S(()=>a&&e.preview||!t&&n?H(e.speed/100)*5:0,[n,t,e.speed,e.preview,a]);return L("div",{ref:r,style:{borderRadius:e.radius,overflow:"hidden",position:"relative",...e.style},children:[y(se,{color1:o?i:s.color1,color2:o?l:s.color2,color3:o?c:s.color3,scale:s.scale,proportion:s.proportion/100,distortion:s.distortion/50,swirl:s.swirl/100,swirlIterations:s.swirl===0?0:s.swirlIterations,rotation:s.rotation*Math.PI/180,speed:u,seed:s.offset*10,shape:I[s.shape],shapeScale:s.shapeSize/100,softness:s.softness/100,style:e.style}),e.noise&&e.noise.opacity>0&&y("div",{style:{position:"absolute",inset:0,backgroundImage:'url("https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png")',backgroundSize:e.noise.scale*200,backgroundRepeat:"repeat",opacity:e.noise.opacity/2}})]})}z(B,{preset:{type:d.Enum,defaultValue:Object.keys(R)[0],options:[...Object.keys(R),"custom"],optionTitles:[...Object.keys(R),"Custom"]},preview:{type:d.Boolean,defaultValue:!1},colorMode:{type:d.Enum,defaultValue:"preset",options:["preset","custom"],optionTitles:["Preset","Custom"],displaySegmentedControl:!0,title:"Colors",hidden:e=>e.preset==="custom"},color1:{type:d.Color,defaultValue:"#262626",hidden:e=>e.preset!=="custom"&&e.colorMode==="preset"},color2:{type:d.Color,defaultValue:"#75c1f0",hidden:e=>e.preset!=="custom"&&e.colorMode==="preset"},color3:{type:d.Color,defaultValue:"#ffffff",hidden:e=>e.preset!=="custom"&&e.colorMode==="preset"},noise:{type:d.Object,optional:!0,icon:"effect",controls:{opacity:{type:d.Number,defaultValue:.5,min:0,max:1,step:.01},scale:{type:d.Number,defaultValue:1,min:.2,max:2,step:.1}}},rotation:{type:d.Number,defaultValue:0,min:-360,max:360,step:1,unit:"\xB0",hidden:e=>e.preset!=="custom"},proportion:{type:d.Number,defaultValue:35,min:0,max:100,step:1,hidden:e=>e.preset!=="custom"},scale:{type:d.Number,defaultValue:1,min:0,max:10,step:.01,hidden:e=>e.preset!=="custom"},speed:{type:d.Number,defaultValue:25,step:1,min:0,max:100},distortion:{type:d.Number,defaultValue:12,min:0,max:100,step:1,hidden:e=>e.preset!=="custom"},swirl:{type:d.Number,defaultValue:80,min:0,max:100,step:1,hidden:e=>e.preset!=="custom"},swirlIterations:{type:d.Number,defaultValue:10,min:0,max:20,step:1,title:"Iterations",hidden:e=>e.swirl===0||e.preset!=="custom"},softness:{type:d.Number,defaultValue:100,min:0,max:100,step:1,hidden:e=>e.preset!=="custom"},offset:{type:d.Number,defaultValue:0,min:-1e3,max:1e3,step:1,hidden:e=>e.preset!=="custom"},shape:{type:d.Enum,defaultValue:"Checks",options:Object.keys(I),hidden:e=>e.preset!=="custom"},shapeSize:{type:d.Number,defaultValue:10,min:0,max:100,step:1,hidden:e=>e.preset!=="custom"},radius:{type:d.BorderRadius,defaultValue:"0px"}});var m={name:"Default",params:{scale:1,rotation:0,speed:20,seed:0,color1:"hsla(0, 0%, 15%, 1)",color2:"hsla(203, 80%, 70%, 1)",color3:"hsla(0, 0%, 100%, 1)",proportion:.35,softness:1,distortion:.25,swirl:.8,swirlIterations:10,shapeScale:.1,shape:I.Checks}},se=e=>{let t=S(()=>({u_scale:e.scale??m.params.scale,u_rotation:e.rotation??m.params.rotation,u_color1:b(e.color1,m.params.color1),u_color2:b(e.color2,m.params.color2),u_color3:b(e.color3,m.params.color2),u_proportion:e.proportion??m.params.proportion,u_softness:e.softness??m.params.softness,u_distortion:e.distortion??m.params.distortion,u_swirl:e.swirl??m.params.swirl,u_swirlIterations:e.swirlIterations??m.params.swirlIterations,u_shapeScale:e.shapeScale??m.params.shapeScale,u_shape:e.shape??m.params.shape}),[e.scale,e.rotation,e.color1,e.color2,e.color3,e.proportion,e.softness,e.distortion,e.swirl,e.swirlIterations,e.shapeScale,e.shape,e.speed]);return y(oe,{...e,fragmentShader:U,uniforms:t})},oe=({ref:e,fragmentShader:t,style:a,uniforms:o={},webGlContextAttributes:s,speed:i=1,seed:l=0})=>{let c=e??A(null),r=A(null);return _(()=>(c.current&&(r.current=new C(c.current,t,o,s,i,l)),()=>{r.current?.dispose()}),[t,s]),_(()=>{r.current?.setUniforms(o)},[o]),_(()=>{r.current?.setSpeed(i)},[i]),_(()=>{r.current?.setSeed(l)},[l]),y("canvas",{ref:c,style:a})};B.displayName="Animated Gradient Background";export{B as a};
//# sourceMappingURL=chunk-WFUVBYLC.mjs.map
