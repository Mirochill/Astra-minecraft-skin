/* A small dependency-free WebGL renderer. Real UV-mapped cuboids, rigid Minecraft
   limb pivots, z-buffered outer layers, nearest-neighbor textures, orbit camera. */
const V3={
 sub:(a,b)=>a.map((x,i)=>x-b[i]),
 cross:(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],
 norm:a=>{let d=Math.hypot(...a)||1;return a.map(x=>x/d)},
 dot:(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0)
};
function perspective(fov,aspect,near,far){let f=1/Math.tan(fov/2),nf=1/(near-far);return new Float32Array([f/aspect,0,0,0,0,f,0,0,0,0,(far+near)*nf,-1,0,0,2*far*near*nf,0])}
function lookAt(eye,target){let z=V3.norm(V3.sub(eye,target)),x=V3.norm(V3.cross([0,1,0],z)),y=V3.cross(z,x);return new Float32Array([x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-V3.dot(x,eye),-V3.dot(y,eye),-V3.dot(z,eye),1])}
function mul4(a,b){let o=new Float32Array(16);for(let c=0;c<4;c++)for(let r=0;r<4;r++)for(let k=0;k<4;k++)o[c*4+r]+=a[k*4+r]*b[c*4+k];return o}
function rot3(p,r){let[x,y,z]=p;let c=Math.cos(r[0]),s=Math.sin(r[0]);[y,z]=[y*c-z*s,y*s+z*c];c=Math.cos(r[1]);s=Math.sin(r[1]);[x,z]=[x*c+z*s,-x*s+z*c];c=Math.cos(r[2]);s=Math.sin(r[2]);[x,y]=[x*c-y*s,x*s+y*c];return[x,y,z]}
function hexRGB(h){let n=parseInt(h.slice(1),16);return[n>>16&255,n>>8&255,n&255].map(v=>v/255)}
function compileShader(gl,type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s}
class SkinRenderer{
 constructor(canvas){
  this.canvas=canvas;this.gl=canvas.getContext('webgl',{alpha:true,antialias:true,premultipliedAlpha:false,preserveDrawingBuffer:true,powerPreference:'low-power'});
  this.backend=this.gl?'webgl':'software';
  if(!this.gl){this.ctx=canvas.getContext('2d',{alpha:true});if(!this.ctx)throw new Error('Canvas is unavailable');}
  if(this.gl){
  const gl=this.gl;
  const vs=`attribute vec3 aPosition;attribute vec3 aNormal;attribute vec2 aUV;attribute vec4 aColor;uniform mat4 uVP;varying vec3 vNormal;varying vec2 vUV;varying vec4 vColor;void main(){gl_Position=uVP*vec4(aPosition,1.0);vNormal=aNormal;vUV=aUV;vColor=aColor;}`;
  const fs=`precision mediump float;uniform sampler2D uTexture;varying vec3 vNormal;varying vec2 vUV;varying vec4 vColor;void main(){vec4 col=vColor;if(vUV.x>=0.0){col*=texture2D(uTexture,vUV);if(col.a<0.5)discard;vec3 n=normalize(vNormal);float key=max(dot(n,normalize(vec3(-0.45,0.8,0.9))),0.0);float fill=max(dot(n,normalize(vec3(0.85,0.3,-0.55))),0.0);col.rgb*=0.73+key*0.28+fill*0.09;}gl_FragColor=col;}`;
  this.program=gl.createProgram();gl.attachShader(this.program,compileShader(gl,gl.VERTEX_SHADER,vs));gl.attachShader(this.program,compileShader(gl,gl.FRAGMENT_SHADER,fs));gl.linkProgram(this.program);if(!gl.getProgramParameter(this.program,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(this.program));
  gl.useProgram(this.program);
  this.buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,this.buffer);
  const attrs=[['aPosition',3,0],['aNormal',3,3],['aUV',2,6],['aColor',4,8]];
  for(let[name,size,offset]of attrs){let at=gl.getAttribLocation(this.program,name);gl.enableVertexAttribArray(at);gl.vertexAttribPointer(at,size,gl.FLOAT,false,48,offset*4)}
  this.uVP=gl.getUniformLocation(this.program,'uVP');
  this.texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,this.texture);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.uniform1i(gl.getUniformLocation(this.program,'uTexture'),0);
  gl.enable(gl.DEPTH_TEST);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.clearColor(0,0,0,0);
  }
  this.yaw=-0.42;this.pitch=0.13;this.distance=63;this.autoRotate=false;this.layers=true;this.grid=true;this.environment='studio';this.animation='idle';this.speed=1;this.paused=false;this.time=0;this.accent='#f7a84c';this.pose={};this.skin=null;this.last=0;this.running=true;this.lastTouchDistance=0;
  this.bindInput();this.resizeObserver=new ResizeObserver(()=>this.resize());this.resizeObserver.observe(canvas);this.resize();
  this.tick=this.tick.bind(this);requestAnimationFrame(this.tick);
 }
 setSkin(skin){this.skin=skin;this.accent=skin.character.accent;this.softwareTexture=rgbaPixels(skin);if(!this.gl)return;const gl=this.gl;gl.bindTexture(gl.TEXTURE_2D,this.texture);gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,64,64,0,gl.RGBA,gl.UNSIGNED_BYTE,rgbaPixels(skin));}
 resize(){let r=this.canvas.getBoundingClientRect();let ratio=Math.min(window.devicePixelRatio||1,2);let w=Math.max(1,Math.round(r.width*ratio)),h=Math.max(1,Math.round(r.height*ratio));if(this.canvas.width!==w||this.canvas.height!==h){this.canvas.width=w;this.canvas.height=h;}if(this.gl)this.gl.viewport(0,0,w,h)}
 reset(){this.yaw=-.42;this.pitch=.13;this.distance=63;this.autoRotate=false}
 view(which){if(which==='front'){this.yaw=0;this.pitch=0;}if(which==='back'){this.yaw=Math.PI;this.pitch=0;}if(which==='iso'){this.yaw=-Math.PI/4;this.pitch=.3;}this.autoRotate=false;}
 bindInput(){
  const c=this.canvas,pointers=new Map();let last={x:0,y:0};
  c.addEventListener('pointerdown',e=>{c.setPointerCapture(e.pointerId);pointers.set(e.pointerId,[e.clientX,e.clientY]);last={x:e.clientX,y:e.clientY};this.dragging=true;c.classList.add('dragging');this.autoRotate=false;if(this.onOrbit)this.onOrbit();});
  c.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId))return;pointers.set(e.pointerId,[e.clientX,e.clientY]);if(pointers.size===2){let pts=[...pointers.values()],dist=Math.hypot(pts[0][0]-pts[1][0],pts[0][1]-pts[1][1]);if(this.lastTouchDistance)this.distance=Math.max(37,Math.min(105,this.distance*this.lastTouchDistance/dist));this.lastTouchDistance=dist;}else{this.yaw-=(e.clientX-last.x)*.008;this.pitch=Math.max(-.45,Math.min(1.25,this.pitch+(e.clientY-last.y)*.006));}last={x:e.clientX,y:e.clientY};});
  const end=e=>{pointers.delete(e.pointerId);this.lastTouchDistance=0;if(!pointers.size){this.dragging=false;c.classList.remove('dragging')}};
  c.addEventListener('pointerup',end);c.addEventListener('pointercancel',end);c.addEventListener('lostpointercapture',end);
  c.addEventListener('wheel',e=>{e.preventDefault();this.distance=Math.max(37,Math.min(105,this.distance*Math.exp(e.deltaY*.001)));},{passive:false});
  c.addEventListener('dblclick',()=>{this.reset();if(this.onOrbit)this.onOrbit()});
  c.addEventListener('webglcontextlost',e=>{e.preventDefault();this.running=false;if(this.onError)this.onError('3D context lost. Reload to restore the viewer.');});
 }
 targetPose(t){
  let p={raX:.05*Math.sin(t*1.2),laX:-.05*Math.sin(t*1.2),raZ:-.05-.025*Math.cos(t*1.4),laZ:.05+.025*Math.cos(t*1.4),rlX:0,llX:0,rlZ:0,llZ:0,bodyX:0,bodyY:0,headX:.015*Math.sin(t),headY:.035*Math.sin(t*.6),headZ:0,rootY:0,rootX:0,rootYaw:0};
  let s=Math.sin(t*6),q=Math.cos(t*6);
  switch(this.animation){
  case'walk':p.raX=s*.68;p.laX=-s*.68;p.rlX=-s*.7;p.llX=s*.7;p.rootY=Math.abs(q)*.35;break;
  case'run':s=Math.sin(t*10);p.raX=s*1.05;p.laX=-s*1.05;p.rlX=-s*.96;p.llX=s*.96;p.bodyX=.12;p.headX=-.12;p.rootY=Math.abs(Math.cos(t*10))*.85;break;
  case'sneak':s=Math.sin(t*4);p.bodyX=.42;p.headX=-.42;p.rootY=-1.5;p.raX=-.1+s*.23;p.laX=-.1-s*.23;p.rlX=-.15-s*.22;p.llX=-.15+s*.22;break;
  case'jump':p.rootY=Math.abs(Math.sin(t*2.8))*4.8;p.raX=-.52;p.laX=-.52;p.raZ=-.17;p.laZ=.17;p.rlX=.18;p.llX=-.18;break;
  case'swim':p.rootX=Math.PI/2;p.rootY=-4;p.headX=-.18;p.raX=-t*4;p.laX=-t*4+Math.PI;p.rlX=Math.sin(t*7)*.24;p.llX=-p.rlX;break;
  case'fly':p.rootX=1.35;p.rootY=-2+Math.sin(t*2)*.3;p.raX=-2.3;p.laX=-2.3;p.raZ=-.18;p.laZ=.18;p.rlX=.06;p.llX=-.06;p.headX=-.65;break;
  case'attack':{let a=(t*1.15)%1;let swing=Math.sin(Math.PI*a);p.raX=-.35-swing*1.45;p.raZ=-.14-swing*.15;p.bodyY=-swing*.18;p.headY=-p.bodyY;p.laX=.08;break;}
  }
  return p;
 }
 tick(now){
  if(!this.running)return;
  const dt=Math.min(.04,this.last?(now-this.last)/1000:1/60);this.last=now;
  if(!document.hidden){if(!this.paused)this.time+=dt*this.speed;if(this.autoRotate&&!this.dragging)this.yaw+=dt*.28;let target=this.targetPose(this.time);for(let k in target){if(this.pose[k]===undefined)this.pose[k]=target[k];if((this.animation==='swim')&&(k==='raX'||k==='laX'))this.pose[k]=target[k];else this.pose[k]+=(target[k]-this.pose[k])*(1-Math.exp(-dt*12));}if(this.skin)this.render();}
  requestAnimationFrame(this.tick);
 }
 pushVertex(out,p,n,uv=[-1,-1],color=[1,1,1,1]){out.push(...p,...n,...uv,...color)}
 solidQuad(out,vertices,color){for(let i of [0,1,2,2,1,3])this.pushVertex(out,vertices[i],[0,1,0],[-1,-1],color)}
 ring(out,r1,r2,y,col,segments=96){for(let i=0;i<segments;i++){let a=i/segments*Math.PI*2,b=(i+1)/segments*Math.PI*2;this.solidQuad(out,[[Math.sin(a)*r1,y,Math.cos(a)*r1],[Math.sin(a)*r2,y,Math.cos(a)*r2],[Math.sin(b)*r1,y,Math.cos(b)*r1],[Math.sin(b)*r2,y,Math.cos(b)*r2]],col)}}
 stageGeometry(){
  const a=[],accent=hexRGB(this.accent);
  if(this.environment==='void')return a;
  if(this.environment==='studio'){
   const n=96,R=12.8,y=-.32,h=1.25;
   for(let i=0;i<n;i++){let p=i/n*Math.PI*2,q=(i+1)/n*Math.PI*2,x=Math.sin(p)*R,z=Math.cos(p)*R,x2=Math.sin(q)*R,z2=Math.cos(q)*R;
    this.solidQuad(a,[[x,y,z],[x,y-h,z],[x2,y,z2],[x2,y-h,z2]],[.087,.102,.095,1]);
    for(let v of [[0,y,0],[x,y,z],[x2,y,z2]])this.pushVertex(a,v,[0,1,0],[-1,-1],[.127,.145,.134,1]);
   }
   this.ring(a,12.5,12.8,-.30,[...accent.map(x=>x*.5),.9]);this.ring(a,12.77,12.83,-.48,[...accent,.6]);
   if(this.grid){for(let x=-10;x<=10;x+=2){let z=Math.sqrt(12*12-x*x);this.solidQuad(a,[[x-.05,-.29,-z],[x+.05,-.29,-z],[x-.05,-.29,z],[x+.05,-.29,z]],[.24,.27,.24,.52]);this.solidQuad(a,[[-z,-.285,x-.05],[-z,-.285,x+.05],[z,-.285,x-.05],[z,-.285,x+.05]],[.24,.27,.24,.52]);}}
   this.ring(a,16,16.025,-1.62,[...accent,.15]);this.ring(a,17.5,17.515,-1.62,[...accent,.065]);
  }else{
   const R=14,step=2,y=-.3;
   for(let x=-R;x<R;x+=step)for(let z=-R;z<R;z+=step){let t=((x*13+z*7+70)%11)/90;let col=[.25+t,.36+t,.20+t*.5,1];this.solidQuad(a,[[x,y,z],[x,y,z+step],[x+step,y,z],[x+step,y,z+step]],col);}
   for(let y1=-4;y1<0;y1+=2)for(let x=-14;x<14;x+=2){let k=((x*3+y1*7+500)%13)/130;let col=y1===-2?[.30+k,.33+k,.17,1]:[.27+k,.22+k,.17,1];for(let z of [-14,14])this.solidQuad(a,[[x,y1-.3,z],[x,y1+1.7,z],[x+2,y1-.3,z],[x+2,y1+1.7,z]],col);for(let s of [-14,14])this.solidQuad(a,[[s,y1-.3,x],[s,y1+1.7,x],[s,y1-.3,x+2],[s,y1+1.7,x+2]],col);}
  }
  const lift=Math.max(0,this.pose.rootY||0),radius=7.4+lift*.35,opacity=.24-lift*.013;
  for(let i=0;i<64;i++){let p=i/64*Math.PI*2,q=(i+1)/64*Math.PI*2;this.pushVertex(a,[0,-.255,0],[0,1,0],[-1,-1],[.016,.02,.02,opacity]);this.pushVertex(a,[Math.sin(p)*radius,-.255,Math.cos(p)*radius],[0,1,0],[-1,-1],[.016,.02,.02,0]);this.pushVertex(a,[Math.sin(q)*radius,-.255,Math.cos(q)*radius],[0,1,0],[-1,-1],[.016,.02,.02,0]);}
  return a;
 }
 actorGeometry(){
  const out=[],p=this.pose,torso=[p.bodyX,p.bodyY,0];
  const configs={body:{pivot:[0,0,0],offset:[0,6,0],rot:[0,0,0],parent:true},head:{pivot:[0,12,0],offset:[0,4,0],rot:[p.headX,p.headY,p.headZ],parent:true},ra:{pivot:[-6,10,0],offset:[0,-4,0],rot:[p.raX,0,p.raZ],parent:true},la:{pivot:[6,10,0],offset:[0,-4,0],rot:[p.laX,0,p.laZ],parent:true},rl:{pivot:[-2,0,0],offset:[0,-6,0],rot:[p.rlX,0,p.rlZ]},ll:{pivot:[2,0,0],offset:[0,-6,0],rot:[p.llX,0,p.llZ]}};
  function transform(v,c,normal=false){
   let q=normal?v:v.map((x,i)=>x+c.offset[i]);q=rot3(q,c.rot);if(!normal)q=q.map((x,i)=>x+c.pivot[i]);if(c.parent)q=rot3(q,torso);if(!normal){q[1]+=12;q[1]-=16;}q=rot3(q,[p.rootX,0,0]);q=rot3(q,[0,p.rootYaw,0]);if(!normal)q[1]+=16+p.rootY;return q;
  }
  for(let outer of this.layers?[false,true]:[false])for(let part of ['body','rl','ll','ra','la','head']){
   const d=PARTS[part],c=configs[part],expand=outer?(part==='head'?.48:.24):0,x=d.w/2+expand,y=d.h/2+expand,z=d.d/2+expand;
   const faces={front:{n:[0,0,1],v:[[-x,y,z],[-x,-y,z],[x,y,z],[x,-y,z]]},back:{n:[0,0,-1],v:[[x,y,-z],[x,-y,-z],[-x,y,-z],[-x,-y,-z]]},right:{n:[-1,0,0],v:[[-x,y,-z],[-x,-y,-z],[-x,y,z],[-x,-y,z]]},left:{n:[1,0,0],v:[[x,y,z],[x,-y,z],[x,y,-z],[x,-y,-z]]},top:{n:[0,1,0],v:[[-x,y,-z],[-x,y,z],[x,y,-z],[x,y,z]]},bottom:{n:[0,-1,0],v:[[-x,-y,z],[-x,-y,-z],[x,-y,z],[x,-y,-z]]}};
   for(let[f,data]of Object.entries(faces)){
    const r=uvRect(part,f,outer),u0=(r[0]+.002)/64,v0=(r[1]+.002)/64,u1=(r[0]+r[2]-.002)/64,v1=(r[1]+r[3]-.002)/64;
    const uvs=[[u0,v0],[u0,v1],[u1,v0],[u1,v1]],n=transform(data.n,c,true);
    for(let i of [0,1,2,2,1,3])this.pushVertex(out,transform(data.v[i],c),n,uvs[i]);
   }
  }
  return out;
 }
 render(){
  if(!this.gl){this.renderSoftware();return;}
  const gl=this.gl,w=this.canvas.width,h=this.canvas.height;
  if(w<2||h<2)return;
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.useProgram(this.program);gl.bindTexture(gl.TEXTURE_2D,this.texture);
  const eye=[Math.sin(this.yaw)*Math.cos(this.pitch)*this.distance,15.5+Math.sin(this.pitch)*this.distance,Math.cos(this.yaw)*Math.cos(this.pitch)*this.distance];
  const vp=mul4(perspective(37*Math.PI/180,w/h,.1,300),lookAt(eye,[0,15.5,0]));gl.uniformMatrix4fv(this.uVP,false,vp);
  const stage=this.stageGeometry(),actor=this.actorGeometry();gl.bindBuffer(gl.ARRAY_BUFFER,this.buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([...stage,...actor]),gl.DYNAMIC_DRAW);
  gl.depthMask(true);gl.drawArrays(gl.TRIANGLES,0,stage.length/12);gl.drawArrays(gl.TRIANGLES,stage.length/12,actor.length/12);
 }
 renderSoftware(){
  const w=this.canvas.width,h=this.canvas.height;if(w<2||h<2)return;
  if(!this.frame||this.frame.width!==w||this.frame.height!==h){this.frame=this.ctx.createImageData(w,h);this.zbuffer=new Float32Array(w*h)}
  const pixels=this.frame.data,zbuf=this.zbuffer,texture=this.softwareTexture;pixels.fill(0);zbuf.fill(Infinity);
  const eye=[Math.sin(this.yaw)*Math.cos(this.pitch)*this.distance,15.5+Math.sin(this.pitch)*this.distance,Math.cos(this.yaw)*Math.cos(this.pitch)*this.distance];
  const m=mul4(perspective(37*Math.PI/180,w/h,.1,300),lookAt(eye,[0,15.5,0]));
  const input=[...this.stageGeometry(),...this.actorGeometry()];
  const key=V3.norm([-.45,.8,.9]),fill=V3.norm([.85,.3,-.55]);
  for(let t=0;t<input.length;t+=36){
   let v=[];
   for(let k=0;k<3;k++){let i=t+k*12,x=input[i],y=input[i+1],z=input[i+2],cw=m[3]*x+m[7]*y+m[11]*z+m[15];
    if(cw<=.1)break;let iw=1/cw;v.push([(m[0]*x+m[4]*y+m[8]*z+m[12])*iw*w*.5+w*.5,h*.5-(m[1]*x+m[5]*y+m[9]*z+m[13])*iw*h*.5,(m[2]*x+m[6]*y+m[10]*z+m[14])*iw,iw,input[i+6],input[i+7],input[i+8],input[i+9],input[i+10],input[i+11]]);
   }
   if(v.length!==3)continue;
   let a=v[0],b=v[1],c=v[2],den=(b[1]-c[1])*(a[0]-c[0])+(c[0]-b[0])*(a[1]-c[1]);if(Math.abs(den)<.0001)continue;
   let x0=Math.max(0,Math.floor(Math.min(a[0],b[0],c[0]))),x1=Math.min(w-1,Math.ceil(Math.max(a[0],b[0],c[0]))),y0=Math.max(0,Math.floor(Math.min(a[1],b[1],c[1]))),y1=Math.min(h-1,Math.ceil(Math.max(a[1],b[1],c[1])));
   if(x1<x0||y1<y0)continue;
   const da=(b[1]-c[1])/den,db=(c[1]-a[1])/den,ya=(c[0]-b[0])/den,yb=(a[0]-c[0])/den;
   const textured=a[4]>=0,normal=V3.norm([input[t+3],input[t+4],input[t+5]]),light=.73+Math.max(0,V3.dot(normal,key))*.28+Math.max(0,V3.dot(normal,fill))*.09;
   const u0=a[4]*a[3],u1=b[4]*b[3],u2=c[4]*c[3],v0=a[5]*a[3],v1=b[5]*b[3],v2=c[5]*c[3];
   const flatColor=a[6]===b[6]&&a[6]===c[6]&&a[7]===b[7]&&a[7]===c[7]&&a[8]===b[8]&&a[8]===c[8]&&a[9]===b[9]&&a[9]===c[9];
   for(let y=y0;y<=y1;y++){
    let aa=da*(x0+.5-c[0])+ya*(y+.5-c[1]),bb=db*(x0+.5-c[0])+yb*(y+.5-c[1]);
    for(let x=x0;x<=x1;x++,aa+=da,bb+=db){let cc=1-aa-bb;if(aa<-.00001||bb<-.00001||cc<-.00001)continue;
     let z=aa*a[2]+bb*b[2]+cc*c[2],at=y*w+x;if(z>=zbuf[at])continue;
     let r,g,bl,alpha;
     if(textured){let inv=1/(aa*a[3]+bb*b[3]+cc*c[3]);let u=Math.max(0,Math.min(63,Math.floor((aa*u0+bb*u1+cc*u2)*inv*64))),vv=Math.max(0,Math.min(63,Math.floor((aa*v0+bb*v1+cc*v2)*inv*64))),ti=(vv*64+u)*4;if(texture[ti+3]<128)continue;r=texture[ti]*light;g=texture[ti+1]*light;bl=texture[ti+2]*light;alpha=1;}
     else if(flatColor){r=a[6]*255;g=a[7]*255;bl=a[8]*255;alpha=a[9];}
     else{r=(a[6]*aa+b[6]*bb+c[6]*cc)*255;g=(a[7]*aa+b[7]*bb+c[7]*cc)*255;bl=(a[8]*aa+b[8]*bb+c[8]*cc)*255;alpha=a[9]*aa+b[9]*bb+c[9]*cc;}
     if(alpha<=.001)continue;
     let p=at*4;
     if(alpha>=.999){pixels[p]=r;pixels[p+1]=g;pixels[p+2]=bl;pixels[p+3]=255;}
     else{let oldA=pixels[p+3]/255,outA=alpha+oldA*(1-alpha),factor=oldA*(1-alpha);pixels[p]=(r*alpha+pixels[p]*factor)/outA;pixels[p+1]=(g*alpha+pixels[p+1]*factor)/outA;pixels[p+2]=(bl*alpha+pixels[p+2]*factor)/outA;pixels[p+3]=outA*255;}
     zbuf[at]=z;
    }
   }
  }
  this.ctx.putImageData(this.frame,0,0);
 }
 destroy(){this.running=false;this.resizeObserver.disconnect();if(this.gl){this.gl.deleteTexture(this.texture);this.gl.deleteBuffer(this.buffer);this.gl.deleteProgram(this.program)}}
}
