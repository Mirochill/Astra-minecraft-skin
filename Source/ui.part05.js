function closeModal(id){$(id).hidden=true;document.body.style.overflow='';if(lastFocus&&lastFocus.focus)lastFocus.focus()}
function setAnimation(name){if(!motionNames.includes(name))return;state.animation=name;if(renderer){renderer.animation=name;renderer.time=0;}document.querySelectorAll('[data-motion]').forEach(b=>{const selected=b.dataset.motion===name;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected))});}
function togglePause(){if(!renderer)return;renderer.paused=!renderer.paused;renderPause()}
function renderPause(){if(!renderer)return;$('pauseBtn').innerHTML=icon(renderer.paused?'play':'pause');$('pauseBtn').setAttribute('aria-label',renderer.paused?'Play animation':'Pause animation');$('pauseBtn').setAttribute('aria-pressed',String(renderer.paused))}
function setExportOpen(open){$('exportMenu').hidden=!open;$('exportBtn').setAttribute('aria-expanded',String(open));}
function slug(s){return s.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function filename(s=currentSkin){return `${s.character.id}_${slug(s.name)}`}
function downloadBlob(blob,name){const a=document.createElement('a');const url=URL.createObjectURL(blob);a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000)}
function skinCanvas(skin){const c=document.createElement('canvas');c.width=64;c.height=64;const ctx=c.getContext('2d');ctx.putImageData(new ImageData(new Uint8ClampedArray(rgbaPixels(skin)),64,64),0,0);return c}
function PNGbytes(s){const data=skinCanvas(s).toDataURL('image/png').split(',')[1];return Uint8Array.from(atob(data),x=>x.charCodeAt(0))}
const utf8=new TextEncoder();
const crcTable=(()=>{let t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=(c&1)?0xedb88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})();
function crc32(data){let c=0xffffffff;for(let b of data)c=crcTable[(c^b)&255]^(c>>>8);return(c^0xffffffff)>>>0}
function zipStore(files){
 const blocks=[],central=[];let offset=0,centralSize=0;
