 pause:'<path d="M8 5v14M16 5v14" stroke-width="3"/>',play:'<path d="m8 4 12 8-12 8Z" fill="currentColor" stroke="none"/>',
 idle:'<circle cx="12" cy="4" r="2"/><path d="M12 8v7m-4-6-2 5m10-5 2 5m-6 1-3 7m3-7 3 7"/>',
 walk:'<circle cx="13" cy="3.5" r="2"/><path d="m12 8-2 6 3 3v5m-3-8-5 7m7-13 4 5h4M11 8l-5 3-2 3"/>',
 run:'<circle cx="16" cy="3.5" r="2"/><path d="m14 8-5 5 5 3-2 6m-3-9-3 5H2m12-10 3 4h5m-9-5-5-1-3 4"/>',
 sneak:'<circle cx="16" cy="5" r="2"/><path d="m13 9-5 4 6 3v5m-6-8-3 4 2 4m6-12 3 6h5M3 21h17"/>',
 jump:'<circle cx="12" cy="6" r="2"/><path d="m4 3 4 7h8l4-7m-8 7v6m0 0-5 5m5-5 5 5"/>',
 swim:'<circle cx="18" cy="8" r="2"/><path d="m15 11-7-3-4 3m4-3 4-5 4 1M2 16c3-4 5 4 8 0s5 4 8 0 3 0 4 0M2 21c3-4 5 4 8 0s5 4 8 0 3 0 4 0"/>',
 fly:'<circle cx="18" cy="6" r="2"/><path d="m15 9-6 5-7 2m7-2 2 5-5 3m9-13 6 4m-6-4-7-4-4 2"/>',
 attack:'<path d="m4 21 7-7m-6-2 7 7m-5-5L18 3l3 0v3L10 17M3 18l3 3"/>',
 close:'<path d="m6 6 12 12M6 18 18 6"/>',check:'<path d="m5 12 4 4 10-10"/>',heart:'<path d="M20 5c-3-3-7-1-8 2-1-3-5-5-8-2s-1 7 8 14c9-7 11-11 8-14Z"/>'
};
function icon(name){return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]||ICONS.cube}</svg>`}
function mountIcons(root=document){root.querySelectorAll('[data-icon]').forEach(el=>{el.outerHTML=icon(el.dataset.icon)})}
const $=id=>document.getElementById(id);
mountIcons();
let state={index:0,variant:0,source:'atlas',back:false,guide:false,animation:'idle'},renderer=null,currentSkin=null,toastTimer=null,lastFocus=null,packBusy=false;
const motionNames=['idle','walk','run','sneak','jump','swim','fly','attack'];
function toast(text,duration=2400){$('toastText').textContent=text;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),duration)}
function store(){try{localStorage.setItem('anime-skin-studio-v1',JSON.stringify({id:CHARACTERS[state.index].id,variant:state.variant,theme:document.body.classList.contains('light')?'light':'dark'}))}catch(e){}}
function toggleButton(id,on){const b=$(id);b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on))}
