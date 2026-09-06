function switchEnvironment(env){if(!renderer)return;renderer.environment=env;$('previewCard').classList.toggle('overworld',env==='overworld');$('previewCard').classList.toggle('void',env==='void');document.querySelectorAll('[data-env]').forEach(b=>{const on=b.dataset.env===env;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on))});}
function switchLayers(){if(!renderer)return;renderer.layers=!renderer.layers;toggleButton('layersBtn',renderer.layers)}
function switchRotate(){if(!renderer)return;renderer.autoRotate=!renderer.autoRotate;toggleButton('rotateBtn',renderer.autoRotate)}
function resetCamera(){if(renderer){renderer.reset();toggleButton('rotateBtn',false);document.querySelectorAll('[data-view]').forEach(b=>b.classList.remove('active'))}}
// Event delegation keeps character and outfit changes lightweight.
$('variantList').addEventListener('click',e=>{const b=e.target.closest('[data-variant]');if(b)selectCharacter(state.index,Number(b.dataset.variant))});
$('roster').addEventListener('click',e=>{const b=e.target.closest('[data-character]');if(b)selectCharacter(Number(b.dataset.character))});
$('modalGrid').addEventListener('click',e=>{const b=e.target.closest('[data-character]');if(b){selectCharacter(Number(b.dataset.character),0,true);closeModal('browseModal')}});
$('rosterSearch').addEventListener('input',renderRoster);$('modalSearch').addEventListener('input',renderBrowser);
$('sourceTabs').addEventListener('click',e=>{const b=e.target.closest('[data-source]');if(b){state.source=b.dataset.source;renderSource()}});
$('flipSource').addEventListener('click',()=>{state.back=!state.back;renderSource()});
$('guideBtn').addEventListener('click',()=>{state.guide=!state.guide;toggleButton('guideBtn',state.guide);renderSource()});
$('sourceDownload').addEventListener('click',()=>doExport(state.source==='atlas'?'svg':'front'));
$('prevCharacter').addEventListener('click',()=>selectCharacter(state.index-1,0,true));$('nextCharacter').addEventListener('click',()=>selectCharacter(state.index+1,0,true));
