 if(e.key==='ArrowRight'){e.preventDefault();selectCharacter(state.index+1,0,true)}
 if(e.key==='['){e.preventDefault();selectCharacter(state.index,state.variant-1)}
 if(e.key===']'){e.preventDefault();selectCharacter(state.index,state.variant+1)}
 if(e.code==='Space'){e.preventDefault();togglePause()}
 if(/^[1-8]$/.test(e.key))setAnimation(motionNames[Number(e.key)-1]);
 if(e.key.toLowerCase()==='r')switchRotate();if(e.key.toLowerCase()==='l')switchLayers();if(e.key==='0')resetCamera();if(e.key.toLowerCase()==='f')fullscreen();
 if(e.key==='?')openModal('helpModal');
});
document.addEventListener('fullscreenchange',()=>{$('fullscreenBtn').innerHTML=icon(document.fullscreenElement?'minimize':'maximize');if(renderer)setTimeout(()=>renderer.resize(),0)});
// UV guides are a preview overlay and never contaminate exported textures.
$('uvGuide').innerHTML='<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">'+Object.entries(PARTS).map(([p,s])=>[false,true].map(o=>{const[x,y]=o?s.outer:s.base;return `<rect x="${x+.1}" y="${y+.1}" width="${2*s.w+2*s.d-.2}" height="${s.h+s.d-.2}" rx=".4" fill="none" stroke="${o?'#b4da89':'#d5e1ee'}" stroke-width=".18" stroke-dasharray=".6 .5"/>`}).join('')).join('')+'</svg>';
try{renderer=new SkinRenderer($('previewCanvas'));renderer.onOrbit=()=>{toggleButton('rotateBtn',false);document.querySelectorAll('[data-view]').forEach(b=>b.classList.remove('active'))};renderer.onError=message=>{toast(message,6000);showFallback()};if(matchMedia('(prefers-reduced-motion: reduce)').matches){renderer.paused=true;renderPause();}}
catch(e){console.warn('WebGL fallback:',e.message);}
let initialIndex=0,initialVariant=0;
try{const saved=JSON.parse(localStorage.getItem('anime-skin-studio-v1')||'null');if(saved){const index=CHARACTERS.findIndex(c=>c.id===saved.id);if(index>=0)initialIndex=index;initialVariant=Number(saved.variant)||0;if(saved.theme==='light')document.body.classList.add('light');}}
catch(e){}
const hash=location.hash.slice(1).split('/');if(hash[0]){const i=CHARACTERS.findIndex(c=>c.id===hash[0]);if(i>=0){initialIndex=i;initialVariant=Number(hash[1])||0;}}
