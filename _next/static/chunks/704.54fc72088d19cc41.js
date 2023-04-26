(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[704],{5671:function(e,n,t){"use strict";t.d(n,{T:function(){return d}});var r=t(5893),i=t(9008),a=t.n(i),o=t(1163),s=t(7294),u=t(9147),f=t.n(u);t(7319);let l=e=>{let n=(0,s.useRef)(null),i=(0,s.useMemo)(()=>e.sources.map(e=>{let{name:n,contents:i}=e;return{name:n,...function(e){let n;let i=null;{i=document.createElement("div");let a=t(4631);n=a(i,{lineNumbers:!0,lineWrapping:!0,theme:"monokai",readOnly:!0})}return{Container:function(t){return(0,r.jsx)("div",{...t,children:(0,r.jsx)("div",{ref(t){i&&t&&(t.appendChild(i),n.setOption("value",e))}})})}}}(i)}}),e.sources),u=(0,s.useRef)(null),l=(0,s.useMemo)(()=>{if(e.gui){let n=t(4376);return new n.GUI({autoPlace:!1})}},[]),d=(0,o.useRouter)(),c=d.asPath.match(/#([a-zA-Z0-9\.\/]+)/),[g,m]=(0,s.useState)(null),[p,h]=(0,s.useState)(null);return(0,s.useEffect)(()=>{c?h(c[1]):h(i[0].name),l&&u.current&&u.current.appendChild(l.domElement);let t={active:!0},r=()=>{t.active=!1};try{let a=n.current,o=e.init({canvas:a,pageState:t,gui:l});o instanceof Promise&&o.catch(e=>{console.error(e),m(e)})}catch(s){console.error(s),m(s)}return r},[]),(0,r.jsxs)("main",{children:[(0,r.jsxs)(a(),{children:[(0,r.jsx)("style",{dangerouslySetInnerHTML:{__html:"\n            .CodeMirror {\n              height: auto !important;\n              margin: 1em 0;\n            }\n\n            .CodeMirror-scroll {\n              height: auto !important;\n              overflow: visible !important;\n            }\n          "}}),(0,r.jsx)("title",{children:"".concat(e.name," - WebGPU Samples")}),(0,r.jsx)("meta",{name:"description",content:e.description}),(0,r.jsx)("meta",{httpEquiv:"origin-trial",content:e.originTrial})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("h1",{children:e.name}),(0,r.jsx)("a",{target:"_blank",rel:"noreferrer",href:"https://github.com/".concat("webgpu/webgpu-samples","/tree/main/").concat(e.filename),children:"See it on Github!"}),(0,r.jsx)("p",{children:e.description}),g?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("p",{children:"Is WebGPU Enabled?"}),(0,r.jsx)("p",{children:"".concat(g)})]}):null]}),(0,r.jsxs)("div",{className:f().canvasContainer,children:[(0,r.jsx)("div",{style:{position:"absolute",right:10},ref:u}),(0,r.jsx)("canvas",{ref:n})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("nav",{className:f().sourceFileNav,children:(0,r.jsx)("ul",{children:i.map((e,n)=>(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"#".concat(e.name),"data-active":p==e.name,onClick(){h(e.name)},children:e.name})},n))})}),i.map((e,n)=>(0,r.jsx)(e.Container,{className:f().sourceFileContainer,"data-active":p==e.name},n))]})]})},d=e=>(0,r.jsx)(l,{...e})},3057:function(e,n,t){"use strict";t.d(n,{W:function(){return o}});var r=t(6906),i=t(3560);let a={xy:[0,1],xz:[0,2],yz:[1,2]},o={positions:r.m,triangles:r.g,normals:[],uvs:[]};o.normals=function(e,n){let t=e.map(()=>[0,0,0]);return n.forEach(n=>{let[r,a,o]=n,s=e[r],u=e[a],f=e[o],l=i.R3.subtract(u,s),d=i.R3.subtract(f,s);i.R3.normalize(l,l),i.R3.normalize(d,d);let c=i.R3.cross(l,d);i.R3.add(t[r],c,t[r]),i.R3.add(t[a],c,t[a]),i.R3.add(t[o],c,t[o])}),t.forEach(e=>{i.R3.normalize(e,e)}),t}(o.positions,o.triangles),o.uvs=function(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"xy",t=a[n],r=e.map(()=>[0,0]),i=[1/0,1/0],o=[-1/0,-1/0];return e.forEach((e,n)=>{r[n][0]=e[t[0]],r[n][1]=e[t[1]],i[0]=Math.min(e[t[0]],i[0]),i[1]=Math.min(e[t[1]],i[1]),o[0]=Math.max(e[t[0]],o[0]),o[1]=Math.max(e[t[1]],o[1])}),r.forEach(e=>{e[0]=(e[0]-i[0])/(o[0]-i[0]),e[1]=(e[1]-i[1])/(o[1]-i[1])}),r}(o.positions,"xy"),o.triangles.push([o.positions.length,o.positions.length+2,o.positions.length+1],[o.positions.length,o.positions.length+1,o.positions.length+3]),o.positions.push([-100,20,-100],[100,20,100],[-100,20,100],[100,20,-100]),o.normals.push([0,1,0],[0,1,0],[0,1,0],[0,1,0]),o.uvs.push([0,0],[1,1],[0,1],[1,0])},9704:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return v}});var r=t(5671),i=t(3560),a=t(3057),o="struct LightData {\n  position : vec4<f32>,\n  color : vec3<f32>,\n  radius : f32,\n}\nstruct LightsBuffer {\n  lights: array<LightData>,\n}\n@group(0) @binding(0) var<storage, read_write> lightsBuffer: LightsBuffer;\n\nstruct Config {\n  numLights : u32,\n}\n@group(0) @binding(1) var<uniform> config: Config;\n\nstruct LightExtent {\n  min : vec4<f32>,\n  max : vec4<f32>,\n}\n@group(0) @binding(2) var<uniform> lightExtent: LightExtent;\n\n@compute @workgroup_size(64, 1, 1)\nfn main(@builtin(global_invocation_id) GlobalInvocationID : vec3<u32>) {\n  var index = GlobalInvocationID.x;\n  if (index >= config.numLights) {\n    return;\n  }\n\n  lightsBuffer.lights[index].position.y = lightsBuffer.lights[index].position.y - 0.5 - 0.003 * (f32(index) - 64.0 * floor(f32(index) / 64.0));\n\n  if (lightsBuffer.lights[index].position.y < lightExtent.min.y) {\n    lightsBuffer.lights[index].position.y = lightExtent.max.y;\n  }\n}\n",s="struct Uniforms {\n  modelMatrix : mat4x4<f32>,\n  normalModelMatrix : mat4x4<f32>,\n}\nstruct Camera {\n  viewProjectionMatrix : mat4x4<f32>,\n}\n@group(0) @binding(0) var<uniform> uniforms : Uniforms;\n@group(0) @binding(1) var<uniform> camera : Camera;\n\nstruct VertexOutput {\n  @builtin(position) Position : vec4<f32>,\n  @location(0) fragPosition: vec3<f32>,  // position in world space\n  @location(1) fragNormal: vec3<f32>,    // normal in world space\n  @location(2) fragUV: vec2<f32>,\n}\n\n@vertex\nfn main(\n  @location(0) position : vec3<f32>,\n  @location(1) normal : vec3<f32>,\n  @location(2) uv : vec2<f32>\n) -> VertexOutput {\n  var output : VertexOutput;\n  output.fragPosition = (uniforms.modelMatrix * vec4(position, 1.0)).xyz;\n  output.Position = camera.viewProjectionMatrix * vec4(output.fragPosition, 1.0);\n  output.fragNormal = normalize((uniforms.normalModelMatrix * vec4(normal, 1.0)).xyz);\n  output.fragUV = uv;\n  return output;\n}\n",u="struct GBufferOutput {\n  @location(0) position : vec4<f32>,\n  @location(1) normal : vec4<f32>,\n\n  // Textures: diffuse color, specular color, smoothness, emissive etc. could go here\n  @location(2) albedo : vec4<f32>,\n}\n\n@fragment\nfn main(\n  @location(0) fragPosition: vec3<f32>,\n  @location(1) fragNormal: vec3<f32>,\n  @location(2) fragUV : vec2<f32>\n) -> GBufferOutput {\n  // faking some kind of checkerboard texture\n  let uv = floor(30.0 * fragUV);\n  let c = 0.2 + 0.5 * ((uv.x + uv.y) - 2.0 * floor((uv.x + uv.y) / 2.0));\n\n  var output : GBufferOutput;\n  output.position = vec4(fragPosition, 1.0);\n  output.normal = vec4(fragNormal, 1.0);\n  output.albedo = vec4(c, c, c, 1.0);\n\n  return output;\n}\n",f="@vertex\nfn main(\n  @builtin(vertex_index) VertexIndex : u32\n) -> @builtin(position) vec4<f32> {\n  const pos = array(\n    vec2(-1.0, -1.0), vec2(1.0, -1.0), vec2(-1.0, 1.0),\n    vec2(-1.0, 1.0), vec2(1.0, -1.0), vec2(1.0, 1.0),\n  );\n\n  return vec4<f32>(pos[VertexIndex], 0.0, 1.0);\n}\n",l="@group(0) @binding(0) var gBufferPosition: texture_2d<f32>;\n@group(0) @binding(1) var gBufferNormal: texture_2d<f32>;\n@group(0) @binding(2) var gBufferAlbedo: texture_2d<f32>;\n\noverride canvasSizeWidth: f32;\noverride canvasSizeHeight: f32;\n\n@fragment\nfn main(\n  @builtin(position) coord : vec4<f32>\n) -> @location(0) vec4<f32> {\n  var result : vec4<f32>;\n  let c = coord.xy / vec2<f32>(canvasSizeWidth, canvasSizeHeight);\n  if (c.x < 0.33333) {\n    result = textureLoad(\n      gBufferPosition,\n      vec2<i32>(floor(coord.xy)),\n      0\n    );\n  } else if (c.x < 0.66667) {\n    result = textureLoad(\n      gBufferNormal,\n      vec2<i32>(floor(coord.xy)),\n      0\n    );\n    result.x = (result.x + 1.0) * 0.5;\n    result.y = (result.y + 1.0) * 0.5;\n    result.z = (result.z + 1.0) * 0.5;\n  } else {\n    result = textureLoad(\n      gBufferAlbedo,\n      vec2<i32>(floor(coord.xy)),\n      0\n    );\n  }\n  return result;\n}\n",d="@group(0) @binding(0) var gBufferPosition: texture_2d<f32>;\n@group(0) @binding(1) var gBufferNormal: texture_2d<f32>;\n@group(0) @binding(2) var gBufferAlbedo: texture_2d<f32>;\n\nstruct LightData {\n  position : vec4<f32>,\n  color : vec3<f32>,\n  radius : f32,\n}\nstruct LightsBuffer {\n  lights: array<LightData>,\n}\n@group(1) @binding(0) var<storage, read> lightsBuffer: LightsBuffer;\n\nstruct Config {\n  numLights : u32,\n}\n@group(1) @binding(1) var<uniform> config: Config;\n\n@fragment\nfn main(\n  @builtin(position) coord : vec4<f32>\n) -> @location(0) vec4<f32> {\n  var result : vec3<f32>;\n\n  let position = textureLoad(\n    gBufferPosition,\n    vec2<i32>(floor(coord.xy)),\n    0\n  ).xyz;\n\n  if (position.z > 10000.0) {\n    discard;\n  }\n\n  let normal = textureLoad(\n    gBufferNormal,\n    vec2<i32>(floor(coord.xy)),\n    0\n  ).xyz;\n\n  let albedo = textureLoad(\n    gBufferAlbedo,\n    vec2<i32>(floor(coord.xy)),\n    0\n  ).rgb;\n\n  for (var i = 0u; i < config.numLights; i++) {\n    let L = lightsBuffer.lights[i].position.xyz - position;\n    let distance = length(L);\n    if (distance > lightsBuffer.lights[i].radius) {\n      continue;\n    }\n    let lambert = max(dot(normal, normalize(L)), 0.0);\n    result += vec3<f32>(\n      lambert * pow(1.0 - distance / lightsBuffer.lights[i].radius, 2.0) * lightsBuffer.lights[i].color * albedo\n    );\n  }\n\n  // some manual ambient\n  result += vec3(0.2);\n\n  return vec4(result, 1.0);\n}\n",c="src/sample/deferredRendering/main.ts";let g=i.R3.fromValues(-50,-30,-50),m=i.R3.fromValues(50,50,50),p=async e=>{let{canvas:n,pageState:t,gui:r}=e,c=await navigator.gpu.requestAdapter(),p=await c.requestDevice();if(!t.active)return;let h=n.getContext("webgpu"),v=window.devicePixelRatio||1;n.width=n.clientWidth*v,n.height=n.clientHeight*v;let x=n.width/n.height,B=navigator.gpu.getPreferredCanvasFormat();h.configure({device:p,format:B,alphaMode:"premultiplied"});let b=p.createBuffer({size:8*a.W.positions.length*Float32Array.BYTES_PER_ELEMENT,usage:GPUBufferUsage.VERTEX,mappedAtCreation:!0});{let P=new Float32Array(b.getMappedRange());for(let y=0;y<a.W.positions.length;++y)P.set(a.W.positions[y],8*y),P.set(a.W.normals[y],8*y+3),P.set(a.W.uvs[y],8*y+6);b.unmap()}let E=3*a.W.triangles.length,w=p.createBuffer({size:E*Uint16Array.BYTES_PER_ELEMENT,usage:GPUBufferUsage.INDEX,mappedAtCreation:!0});{let T=new Uint16Array(w.getMappedRange());for(let U=0;U<a.W.triangles.length;++U)T.set(a.W.triangles[U],3*U);w.unmap()}let M=p.createTexture({size:[n.width,n.height],usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING,format:"rgba32float"}),G=p.createTexture({size:[n.width,n.height],usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING,format:"rgba16float"}),R=p.createTexture({size:[n.width,n.height],usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING,format:"bgra8unorm"}),S=[M.createView(),G.createView(),R.createView()],A=[{arrayStride:8*Float32Array.BYTES_PER_ELEMENT,attributes:[{shaderLocation:0,offset:0,format:"float32x3"},{shaderLocation:1,offset:3*Float32Array.BYTES_PER_ELEMENT,format:"float32x3"},{shaderLocation:2,offset:6*Float32Array.BYTES_PER_ELEMENT,format:"float32x2"}]}],_={topology:"triangle-list",cullMode:"back"},L=p.createRenderPipeline({layout:"auto",vertex:{module:p.createShaderModule({code:s}),entryPoint:"main",buffers:A},fragment:{module:p.createShaderModule({code:u}),entryPoint:"main",targets:[{format:"rgba32float"},{format:"rgba16float"},{format:"bgra8unorm"}]},depthStencil:{depthWriteEnabled:!0,depthCompare:"less",format:"depth24plus"},primitive:_}),V=p.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"unfilterable-float"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"unfilterable-float"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"unfilterable-float"}}]}),D=p.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT|GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.FRAGMENT|GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]}),N=p.createRenderPipeline({layout:p.createPipelineLayout({bindGroupLayouts:[V]}),vertex:{module:p.createShaderModule({code:f}),entryPoint:"main"},fragment:{module:p.createShaderModule({code:l}),entryPoint:"main",targets:[{format:B}],constants:{canvasSizeWidth:n.width,canvasSizeHeight:n.height}},primitive:_}),C=p.createRenderPipeline({layout:p.createPipelineLayout({bindGroupLayouts:[V,D]}),vertex:{module:p.createShaderModule({code:f}),entryPoint:"main"},fragment:{module:p.createShaderModule({code:d}),entryPoint:"main",targets:[{format:B}]},primitive:_}),O=p.createTexture({size:[n.width,n.height],format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}),F={colorAttachments:[{view:S[0],clearValue:{r:Number.MAX_VALUE,g:Number.MAX_VALUE,b:Number.MAX_VALUE,a:1},loadOp:"clear",storeOp:"store"},{view:S[1],clearValue:{r:0,g:0,b:1,a:1},loadOp:"clear",storeOp:"store"},{view:S[2],clearValue:{r:0,g:0,b:0,a:1},loadOp:"clear",storeOp:"store"}],depthStencilAttachment:{view:O.createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}},z={colorAttachments:[{view:void 0,clearValue:{r:0,g:0,b:0,a:1},loadOp:"clear",storeOp:"store"}]},I={mode:"rendering",numLights:128},j=(()=>{let e=p.createBuffer({size:Uint32Array.BYTES_PER_ELEMENT,mappedAtCreation:!0,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});return new Uint32Array(e.getMappedRange())[0]=I.numLights,e.unmap(),e})();r.add(I,"mode",["rendering","gBuffers view"]),r.add(I,"numLights",1,1024).step(1).onChange(()=>{p.queue.writeBuffer(j,0,new Uint32Array([I.numLights]))});let W=p.createBuffer({size:128,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),k=p.createBuffer({size:64,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),q=p.createBindGroup({layout:L.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:W}},{binding:1,resource:{buffer:k}}]}),Y=p.createBindGroup({layout:V,entries:[{binding:0,resource:S[0]},{binding:1,resource:S[1]},{binding:2,resource:S[2]}]}),X=i.R3.sub(m,g),H=8192*Float32Array.BYTES_PER_ELEMENT,Q=p.createBuffer({size:H,usage:GPUBufferUsage.STORAGE,mappedAtCreation:!0}),J=new Float32Array(Q.getMappedRange()),Z=i.vh.create(),K=0;for(let $=0;$<1024;$++){K=8*$;for(let ee=0;ee<3;ee++)Z[ee]=Math.random()*X[ee]+g[ee];Z[3]=1,J.set(Z,K),Z[0]=2*Math.random(),Z[1]=2*Math.random(),Z[2]=2*Math.random(),Z[3]=20,J.set(Z,K+4)}Q.unmap();let en=p.createBuffer({size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),et=new Float32Array(8);et.set(g,0),et.set(m,4),p.queue.writeBuffer(en,0,et.buffer,et.byteOffset,et.byteLength);let er=p.createComputePipeline({layout:"auto",compute:{module:p.createShaderModule({code:o}),entryPoint:"main"}}),ei=p.createBindGroup({layout:D,entries:[{binding:0,resource:{buffer:Q}},{binding:1,resource:{buffer:j}}]}),ea=p.createBindGroup({layout:er.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:Q}},{binding:1,resource:{buffer:j}},{binding:2,resource:{buffer:en}}]}),eo=i.R3.fromValues(0,50,-100),es=i.R3.fromValues(0,1,0),eu=i.R3.fromValues(0,0,0),ef=i._E.perspective(2*Math.PI/5,x,1,2e3),el=i._E.inverse(i._E.lookAt(eo,eu,es)),ed=i._E.multiply(ef,el),ec=i._E.translation([0,-45,0]);p.queue.writeBuffer(k,0,ed.buffer,ed.byteOffset,ed.byteLength),p.queue.writeBuffer(W,0,ec.buffer,ec.byteOffset,ec.byteLength);let eg=i._E.invert(ec);i._E.transpose(eg,eg),p.queue.writeBuffer(W,64,eg.buffer,eg.byteOffset,eg.byteLength),requestAnimationFrame(function e(){if(!t.active)return;let n=function(){let e=i.R3.fromValues(0,50,-100),n=Math.PI*(Date.now()/5e3),t=i._E.rotateY(i._E.translation(eu),n);i.R3.transformMat4(e,t,e);let r=i._E.inverse(i._E.lookAt(e,eu,es));return i._E.multiply(ef,r,ed),ed}();p.queue.writeBuffer(k,0,n.buffer,n.byteOffset,n.byteLength);let r=p.createCommandEncoder();{let a=r.beginRenderPass(F);a.setPipeline(L),a.setBindGroup(0,q),a.setVertexBuffer(0,b),a.setIndexBuffer(w,"uint16"),a.drawIndexed(E),a.end()}{let o=r.beginComputePass();o.setPipeline(er),o.setBindGroup(0,ea),o.dispatchWorkgroups(Math.ceil(16)),o.end()}if("gBuffers view"===I.mode){z.colorAttachments[0].view=h.getCurrentTexture().createView();let s=r.beginRenderPass(z);s.setPipeline(N),s.setBindGroup(0,Y),s.draw(6),s.end()}else{z.colorAttachments[0].view=h.getCurrentTexture().createView();let u=r.beginRenderPass(z);u.setPipeline(C),u.setBindGroup(0,Y),u.setBindGroup(1,ei),u.draw(6),u.end()}p.queue.submit([r.finish()]),requestAnimationFrame(e)})},h=()=>(0,r.T)({name:"Deferred Rendering",description:"This example shows how to do deferred rendering with webgpu.\n      Render geometry info to multiple targets in the gBuffers in the first pass.\n      In this sample we have 3 gBuffers for positions, normals, and albedo.\n      And then do the lighting in a second pass with per fragment data read from gBuffers so it's independent of scene complexity.\n      We also update light position in a compute shader, where further operations like tile/cluster culling could happen.",gui:!0,init:p,sources:[{name:c.substring(29),contents:"import { makeSample, SampleInit } from '../../components/SampleLayout';\nimport { mat4, vec3, vec4 } from 'wgpu-matrix';\nimport { mesh } from '../../meshes/stanfordDragon';\n\nimport lightUpdate from './lightUpdate.wgsl';\nimport vertexWriteGBuffers from './vertexWriteGBuffers.wgsl';\nimport fragmentWriteGBuffers from './fragmentWriteGBuffers.wgsl';\nimport vertexTextureQuad from './vertexTextureQuad.wgsl';\nimport fragmentGBuffersDebugView from './fragmentGBuffersDebugView.wgsl';\nimport fragmentDeferredRendering from './fragmentDeferredRendering.wgsl';\n\nconst kMaxNumLights = 1024;\nconst lightExtentMin = vec3.fromValues(-50, -30, -50);\nconst lightExtentMax = vec3.fromValues(50, 50, 50);\n\nconst init: SampleInit = async ({ canvas, pageState, gui }) => {\n  const adapter = await navigator.gpu.requestAdapter();\n  const device = await adapter.requestDevice();\n\n  if (!pageState.active) return;\n  const context = canvas.getContext('webgpu') as GPUCanvasContext;\n\n  const devicePixelRatio = window.devicePixelRatio || 1;\n  canvas.width = canvas.clientWidth * devicePixelRatio;\n  canvas.height = canvas.clientHeight * devicePixelRatio;\n  const aspect = canvas.width / canvas.height;\n  const presentationFormat = navigator.gpu.getPreferredCanvasFormat();\n  context.configure({\n    device,\n    format: presentationFormat,\n    alphaMode: 'premultiplied',\n  });\n\n  // Create the model vertex buffer.\n  const kVertexStride = 8;\n  const vertexBuffer = device.createBuffer({\n    // position: vec3, normal: vec3, uv: vec2\n    size:\n      mesh.positions.length * kVertexStride * Float32Array.BYTES_PER_ELEMENT,\n    usage: GPUBufferUsage.VERTEX,\n    mappedAtCreation: true,\n  });\n  {\n    const mapping = new Float32Array(vertexBuffer.getMappedRange());\n    for (let i = 0; i < mesh.positions.length; ++i) {\n      mapping.set(mesh.positions[i], kVertexStride * i);\n      mapping.set(mesh.normals[i], kVertexStride * i + 3);\n      mapping.set(mesh.uvs[i], kVertexStride * i + 6);\n    }\n    vertexBuffer.unmap();\n  }\n\n  // Create the model index buffer.\n  const indexCount = mesh.triangles.length * 3;\n  const indexBuffer = device.createBuffer({\n    size: indexCount * Uint16Array.BYTES_PER_ELEMENT,\n    usage: GPUBufferUsage.INDEX,\n    mappedAtCreation: true,\n  });\n  {\n    const mapping = new Uint16Array(indexBuffer.getMappedRange());\n    for (let i = 0; i < mesh.triangles.length; ++i) {\n      mapping.set(mesh.triangles[i], 3 * i);\n    }\n    indexBuffer.unmap();\n  }\n\n  // GBuffer texture render targets\n  const gBufferTexture2DFloat32 = device.createTexture({\n    size: [canvas.width, canvas.height],\n    usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,\n    format: 'rgba32float',\n  });\n  const gBufferTexture2DFloat16 = device.createTexture({\n    size: [canvas.width, canvas.height],\n    usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,\n    format: 'rgba16float',\n  });\n  const gBufferTextureAlbedo = device.createTexture({\n    size: [canvas.width, canvas.height],\n    usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,\n    format: 'bgra8unorm',\n  });\n  const gBufferTextureViews = [\n    gBufferTexture2DFloat32.createView(),\n    gBufferTexture2DFloat16.createView(),\n    gBufferTextureAlbedo.createView(),\n  ];\n\n  const vertexBuffers: Iterable<GPUVertexBufferLayout> = [\n    {\n      arrayStride: Float32Array.BYTES_PER_ELEMENT * 8,\n      attributes: [\n        {\n          // position\n          shaderLocation: 0,\n          offset: 0,\n          format: 'float32x3',\n        },\n        {\n          // normal\n          shaderLocation: 1,\n          offset: Float32Array.BYTES_PER_ELEMENT * 3,\n          format: 'float32x3',\n        },\n        {\n          // uv\n          shaderLocation: 2,\n          offset: Float32Array.BYTES_PER_ELEMENT * 6,\n          format: 'float32x2',\n        },\n      ],\n    },\n  ];\n\n  const primitive: GPUPrimitiveState = {\n    topology: 'triangle-list',\n    cullMode: 'back',\n  };\n\n  const writeGBuffersPipeline = device.createRenderPipeline({\n    layout: 'auto',\n    vertex: {\n      module: device.createShaderModule({\n        code: vertexWriteGBuffers,\n      }),\n      entryPoint: 'main',\n      buffers: vertexBuffers,\n    },\n    fragment: {\n      module: device.createShaderModule({\n        code: fragmentWriteGBuffers,\n      }),\n      entryPoint: 'main',\n      targets: [\n        // position\n        { format: 'rgba32float' },\n        // normal\n        { format: 'rgba16float' },\n        // albedo\n        { format: 'bgra8unorm' },\n      ],\n    },\n    depthStencil: {\n      depthWriteEnabled: true,\n      depthCompare: 'less',\n      format: 'depth24plus',\n    },\n    primitive,\n  });\n\n  const gBufferTexturesBindGroupLayout = device.createBindGroupLayout({\n    entries: [\n      {\n        binding: 0,\n        visibility: GPUShaderStage.FRAGMENT,\n        texture: {\n          sampleType: 'unfilterable-float',\n        },\n      },\n      {\n        binding: 1,\n        visibility: GPUShaderStage.FRAGMENT,\n        texture: {\n          sampleType: 'unfilterable-float',\n        },\n      },\n      {\n        binding: 2,\n        visibility: GPUShaderStage.FRAGMENT,\n        texture: {\n          sampleType: 'unfilterable-float',\n        },\n      },\n    ],\n  });\n\n  const lightsBufferBindGroupLayout = device.createBindGroupLayout({\n    entries: [\n      {\n        binding: 0,\n        visibility: GPUShaderStage.FRAGMENT | GPUShaderStage.COMPUTE,\n        buffer: {\n          type: 'read-only-storage',\n        },\n      },\n      {\n        binding: 1,\n        visibility: GPUShaderStage.FRAGMENT | GPUShaderStage.COMPUTE,\n        buffer: {\n          type: 'uniform',\n        },\n      },\n    ],\n  });\n\n  const gBuffersDebugViewPipeline = device.createRenderPipeline({\n    layout: device.createPipelineLayout({\n      bindGroupLayouts: [gBufferTexturesBindGroupLayout],\n    }),\n    vertex: {\n      module: device.createShaderModule({\n        code: vertexTextureQuad,\n      }),\n      entryPoint: 'main',\n    },\n    fragment: {\n      module: device.createShaderModule({\n        code: fragmentGBuffersDebugView,\n      }),\n      entryPoint: 'main',\n      targets: [\n        {\n          format: presentationFormat,\n        },\n      ],\n      constants: {\n        canvasSizeWidth: canvas.width,\n        canvasSizeHeight: canvas.height,\n      },\n    },\n    primitive,\n  });\n\n  const deferredRenderPipeline = device.createRenderPipeline({\n    layout: device.createPipelineLayout({\n      bindGroupLayouts: [\n        gBufferTexturesBindGroupLayout,\n        lightsBufferBindGroupLayout,\n      ],\n    }),\n    vertex: {\n      module: device.createShaderModule({\n        code: vertexTextureQuad,\n      }),\n      entryPoint: 'main',\n    },\n    fragment: {\n      module: device.createShaderModule({\n        code: fragmentDeferredRendering,\n      }),\n      entryPoint: 'main',\n      targets: [\n        {\n          format: presentationFormat,\n        },\n      ],\n    },\n    primitive,\n  });\n\n  const depthTexture = device.createTexture({\n    size: [canvas.width, canvas.height],\n    format: 'depth24plus',\n    usage: GPUTextureUsage.RENDER_ATTACHMENT,\n  });\n\n  const writeGBufferPassDescriptor: GPURenderPassDescriptor = {\n    colorAttachments: [\n      {\n        view: gBufferTextureViews[0],\n\n        clearValue: {\n          r: Number.MAX_VALUE,\n          g: Number.MAX_VALUE,\n          b: Number.MAX_VALUE,\n          a: 1.0,\n        },\n        loadOp: 'clear',\n        storeOp: 'store',\n      },\n      {\n        view: gBufferTextureViews[1],\n\n        clearValue: { r: 0.0, g: 0.0, b: 1.0, a: 1.0 },\n        loadOp: 'clear',\n        storeOp: 'store',\n      },\n      {\n        view: gBufferTextureViews[2],\n\n        clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },\n        loadOp: 'clear',\n        storeOp: 'store',\n      },\n    ],\n    depthStencilAttachment: {\n      view: depthTexture.createView(),\n\n      depthClearValue: 1.0,\n      depthLoadOp: 'clear',\n      depthStoreOp: 'store',\n    },\n  };\n\n  const textureQuadPassDescriptor: GPURenderPassDescriptor = {\n    colorAttachments: [\n      {\n        // view is acquired and set in render loop.\n        view: undefined,\n\n        clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },\n        loadOp: 'clear',\n        storeOp: 'store',\n      },\n    ],\n  };\n\n  const settings = {\n    mode: 'rendering',\n    numLights: 128,\n  };\n  const configUniformBuffer = (() => {\n    const buffer = device.createBuffer({\n      size: Uint32Array.BYTES_PER_ELEMENT,\n      mappedAtCreation: true,\n      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,\n    });\n    new Uint32Array(buffer.getMappedRange())[0] = settings.numLights;\n    buffer.unmap();\n    return buffer;\n  })();\n\n  gui.add(settings, 'mode', ['rendering', 'gBuffers view']);\n  gui\n    .add(settings, 'numLights', 1, kMaxNumLights)\n    .step(1)\n    .onChange(() => {\n      device.queue.writeBuffer(\n        configUniformBuffer,\n        0,\n        new Uint32Array([settings.numLights])\n      );\n    });\n\n  const modelUniformBuffer = device.createBuffer({\n    size: 4 * 16 * 2, // two 4x4 matrix\n    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,\n  });\n\n  const cameraUniformBuffer = device.createBuffer({\n    size: 4 * 16, // 4x4 matrix\n    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,\n  });\n\n  const sceneUniformBindGroup = device.createBindGroup({\n    layout: writeGBuffersPipeline.getBindGroupLayout(0),\n    entries: [\n      {\n        binding: 0,\n        resource: {\n          buffer: modelUniformBuffer,\n        },\n      },\n      {\n        binding: 1,\n        resource: {\n          buffer: cameraUniformBuffer,\n        },\n      },\n    ],\n  });\n\n  const gBufferTexturesBindGroup = device.createBindGroup({\n    layout: gBufferTexturesBindGroupLayout,\n    entries: [\n      {\n        binding: 0,\n        resource: gBufferTextureViews[0],\n      },\n      {\n        binding: 1,\n        resource: gBufferTextureViews[1],\n      },\n      {\n        binding: 2,\n        resource: gBufferTextureViews[2],\n      },\n    ],\n  });\n\n  // Lights data are uploaded in a storage buffer\n  // which could be updated/culled/etc. with a compute shader\n  const extent = vec3.sub(lightExtentMax, lightExtentMin);\n  const lightDataStride = 8;\n  const bufferSizeInByte =\n    Float32Array.BYTES_PER_ELEMENT * lightDataStride * kMaxNumLights;\n  const lightsBuffer = device.createBuffer({\n    size: bufferSizeInByte,\n    usage: GPUBufferUsage.STORAGE,\n    mappedAtCreation: true,\n  });\n\n  // We randomaly populate lights randomly in a box range\n  // And simply move them along y-axis per frame to show they are\n  // dynamic lightings\n  const lightData = new Float32Array(lightsBuffer.getMappedRange());\n  const tmpVec4 = vec4.create();\n  let offset = 0;\n  for (let i = 0; i < kMaxNumLights; i++) {\n    offset = lightDataStride * i;\n    // position\n    for (let i = 0; i < 3; i++) {\n      tmpVec4[i] = Math.random() * extent[i] + lightExtentMin[i];\n    }\n    tmpVec4[3] = 1;\n    lightData.set(tmpVec4, offset);\n    // color\n    tmpVec4[0] = Math.random() * 2;\n    tmpVec4[1] = Math.random() * 2;\n    tmpVec4[2] = Math.random() * 2;\n    // radius\n    tmpVec4[3] = 20.0;\n    lightData.set(tmpVec4, offset + 4);\n  }\n  lightsBuffer.unmap();\n\n  const lightExtentBuffer = device.createBuffer({\n    size: 4 * 8,\n    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,\n  });\n  const lightExtentData = new Float32Array(8);\n  lightExtentData.set(lightExtentMin, 0);\n  lightExtentData.set(lightExtentMax, 4);\n  device.queue.writeBuffer(\n    lightExtentBuffer,\n    0,\n    lightExtentData.buffer,\n    lightExtentData.byteOffset,\n    lightExtentData.byteLength\n  );\n\n  const lightUpdateComputePipeline = device.createComputePipeline({\n    layout: 'auto',\n    compute: {\n      module: device.createShaderModule({\n        code: lightUpdate,\n      }),\n      entryPoint: 'main',\n    },\n  });\n  const lightsBufferBindGroup = device.createBindGroup({\n    layout: lightsBufferBindGroupLayout,\n    entries: [\n      {\n        binding: 0,\n        resource: {\n          buffer: lightsBuffer,\n        },\n      },\n      {\n        binding: 1,\n        resource: {\n          buffer: configUniformBuffer,\n        },\n      },\n    ],\n  });\n  const lightsBufferComputeBindGroup = device.createBindGroup({\n    layout: lightUpdateComputePipeline.getBindGroupLayout(0),\n    entries: [\n      {\n        binding: 0,\n        resource: {\n          buffer: lightsBuffer,\n        },\n      },\n      {\n        binding: 1,\n        resource: {\n          buffer: configUniformBuffer,\n        },\n      },\n      {\n        binding: 2,\n        resource: {\n          buffer: lightExtentBuffer,\n        },\n      },\n    ],\n  });\n  //--------------------\n\n  // Scene matrices\n  const eyePosition = vec3.fromValues(0, 50, -100);\n  const upVector = vec3.fromValues(0, 1, 0);\n  const origin = vec3.fromValues(0, 0, 0);\n\n  const projectionMatrix = mat4.perspective(\n    (2 * Math.PI) / 5,\n    aspect,\n    1,\n    2000.0\n  );\n\n  const viewMatrix = mat4.inverse(mat4.lookAt(eyePosition, origin, upVector));\n\n  const viewProjMatrix = mat4.multiply(projectionMatrix, viewMatrix);\n\n  // Move the model so it's centered.\n  const modelMatrix = mat4.translation([0, -45, 0]);\n\n  const cameraMatrixData = viewProjMatrix as Float32Array;\n  device.queue.writeBuffer(\n    cameraUniformBuffer,\n    0,\n    cameraMatrixData.buffer,\n    cameraMatrixData.byteOffset,\n    cameraMatrixData.byteLength\n  );\n  const modelData = modelMatrix as Float32Array;\n  device.queue.writeBuffer(\n    modelUniformBuffer,\n    0,\n    modelData.buffer,\n    modelData.byteOffset,\n    modelData.byteLength\n  );\n  const invertTransposeModelMatrix = mat4.invert(modelMatrix);\n  mat4.transpose(invertTransposeModelMatrix, invertTransposeModelMatrix);\n  const normalModelData = invertTransposeModelMatrix as Float32Array;\n  device.queue.writeBuffer(\n    modelUniformBuffer,\n    64,\n    normalModelData.buffer,\n    normalModelData.byteOffset,\n    normalModelData.byteLength\n  );\n\n  // Rotates the camera around the origin based on time.\n  function getCameraViewProjMatrix() {\n    const eyePosition = vec3.fromValues(0, 50, -100);\n\n    const rad = Math.PI * (Date.now() / 5000);\n    const rotation = mat4.rotateY(mat4.translation(origin), rad);\n    vec3.transformMat4(eyePosition, rotation, eyePosition);\n\n    const viewMatrix = mat4.inverse(mat4.lookAt(eyePosition, origin, upVector));\n\n    mat4.multiply(projectionMatrix, viewMatrix, viewProjMatrix);\n    return viewProjMatrix as Float32Array;\n  }\n\n  function frame() {\n    // Sample is no longer the active page.\n    if (!pageState.active) return;\n\n    const cameraViewProj = getCameraViewProjMatrix();\n    device.queue.writeBuffer(\n      cameraUniformBuffer,\n      0,\n      cameraViewProj.buffer,\n      cameraViewProj.byteOffset,\n      cameraViewProj.byteLength\n    );\n\n    const commandEncoder = device.createCommandEncoder();\n    {\n      // Write position, normal, albedo etc. data to gBuffers\n      const gBufferPass = commandEncoder.beginRenderPass(\n        writeGBufferPassDescriptor\n      );\n      gBufferPass.setPipeline(writeGBuffersPipeline);\n      gBufferPass.setBindGroup(0, sceneUniformBindGroup);\n      gBufferPass.setVertexBuffer(0, vertexBuffer);\n      gBufferPass.setIndexBuffer(indexBuffer, 'uint16');\n      gBufferPass.drawIndexed(indexCount);\n      gBufferPass.end();\n    }\n    {\n      // Update lights position\n      const lightPass = commandEncoder.beginComputePass();\n      lightPass.setPipeline(lightUpdateComputePipeline);\n      lightPass.setBindGroup(0, lightsBufferComputeBindGroup);\n      lightPass.dispatchWorkgroups(Math.ceil(kMaxNumLights / 64));\n      lightPass.end();\n    }\n    {\n      if (settings.mode === 'gBuffers view') {\n        // GBuffers debug view\n        // Left: position\n        // Middle: normal\n        // Right: albedo (use uv to mimic a checkerboard texture)\n        textureQuadPassDescriptor.colorAttachments[0].view = context\n          .getCurrentTexture()\n          .createView();\n        const debugViewPass = commandEncoder.beginRenderPass(\n          textureQuadPassDescriptor\n        );\n        debugViewPass.setPipeline(gBuffersDebugViewPipeline);\n        debugViewPass.setBindGroup(0, gBufferTexturesBindGroup);\n        debugViewPass.draw(6);\n        debugViewPass.end();\n      } else {\n        // Deferred rendering\n        textureQuadPassDescriptor.colorAttachments[0].view = context\n          .getCurrentTexture()\n          .createView();\n        const deferredRenderingPass = commandEncoder.beginRenderPass(\n          textureQuadPassDescriptor\n        );\n        deferredRenderingPass.setPipeline(deferredRenderPipeline);\n        deferredRenderingPass.setBindGroup(0, gBufferTexturesBindGroup);\n        deferredRenderingPass.setBindGroup(1, lightsBufferBindGroup);\n        deferredRenderingPass.draw(6);\n        deferredRenderingPass.end();\n      }\n    }\n    device.queue.submit([commandEncoder.finish()]);\n\n    requestAnimationFrame(frame);\n  }\n  requestAnimationFrame(frame);\n};\n\nconst DeferredRendering: () => JSX.Element = () =>\n  makeSample({\n    name: 'Deferred Rendering',\n    description: `This example shows how to do deferred rendering with webgpu.\n      Render geometry info to multiple targets in the gBuffers in the first pass.\n      In this sample we have 3 gBuffers for positions, normals, and albedo.\n      And then do the lighting in a second pass with per fragment data read from gBuffers so it's independent of scene complexity.\n      We also update light position in a compute shader, where further operations like tile/cluster culling could happen.`,\n    gui: true,\n    init,\n    sources: [\n      {\n        name: __filename.substring(__dirname.length + 1),\n        contents: __SOURCE__,\n      },\n      {\n        name: 'vertexWriteGBuffers.wgsl',\n        contents: vertexWriteGBuffers,\n        editable: true,\n      },\n      {\n        name: 'fragmentWriteGBuffers.wgsl',\n        contents: fragmentWriteGBuffers,\n        editable: true,\n      },\n      {\n        name: 'vertexTextureQuad.wgsl',\n        contents: vertexTextureQuad,\n        editable: true,\n      },\n      {\n        name: 'fragmentGBuffersDebugView.wgsl',\n        contents: fragmentGBuffersDebugView,\n        editable: true,\n      },\n      {\n        name: 'fragmentDeferredRendering.wgsl',\n        contents: fragmentDeferredRendering,\n        editable: true,\n      },\n      {\n        name: 'lightUpdate.wgsl',\n        contents: lightUpdate,\n        editable: true,\n      },\n    ],\n    filename: __filename,\n  });\n\nexport default DeferredRendering;\n"},{name:"vertexWriteGBuffers.wgsl",contents:s,editable:!0},{name:"fragmentWriteGBuffers.wgsl",contents:u,editable:!0},{name:"vertexTextureQuad.wgsl",contents:f,editable:!0},{name:"fragmentGBuffersDebugView.wgsl",contents:l,editable:!0},{name:"fragmentDeferredRendering.wgsl",contents:d,editable:!0},{name:"lightUpdate.wgsl",contents:o,editable:!0}],filename:c});var v=h},9147:function(e){e.exports={canvasContainer:"SampleLayout_canvasContainer__zRR_l",sourceFileNav:"SampleLayout_sourceFileNav__ml48P",sourceFileContainer:"SampleLayout_sourceFileContainer__3s84x"}}}]);