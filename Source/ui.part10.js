$('pauseBtn').addEventListener('click',togglePause);$('speedRange').addEventListener('input',()=>{let speed=Number($('speedRange').value)/100;if(renderer)renderer.speed=speed;$('speedOutput').textContent=(Number.isInteger(speed)?speed.toFixed(1):String(speed))+'×'});
$('motionGroup').insertAdjacentHTML('beforeend',motionNames.map((name,i)=>`<button class="motion-button ${i===0?'selected':''}" data-motion="${name}" title="${name[0].toUpperCase()+name.slice(1)} (${i+1})" aria-pressed="${i===0}">${icon(name)}<span>${name[0].toUpperCase()+name.slice(1)}</span></button>`).join(''));
$('motionGroup').addEventListener('click',e=>{const b=e.target.closest('[data-motion]');if(b)setAnimation(b.dataset.motion)});
$('sourceArt').addEventListener('pointermove',e=>{if(state.source!=='atlas')return;let r=$('sourceArt').getBoundingClientRect(),x=Math.max(0,Math.min(63,Math.floor((e.clientX-r.left)/r.width*64))),y=Math.max(0,Math.min(63,Math.floor((e.clientY-r.top)/r.height*64)));$('pixelInfo').textContent=`${x},${y} · ${currentSkin.pixels[y*64+x]||'alpha'}`;});
$('sourceArt').addEventListener('pointerleave',()=>$('pixelInfo').textContent='RGBA');
window.addEventListener('keydown',e=>{
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();if($('browseModal').hidden)openModal('browseModal');else closeModal('browseModal');return;}
 if(e.key==='Escape'){closeExpanded();setExportOpen(false);if(!$('browseModal').hidden)closeModal('browseModal');if(!$('helpModal').hidden)closeModal('helpModal');return;}
 const openDialog=!$('browseModal').hidden?$('browseModal'):!$('helpModal').hidden?$('helpModal'):null;
 if(openDialog){if(e.key==='Tab'){let elems=[...openDialog.querySelectorAll('button,input,[tabindex]')].filter(x=>!x.disabled);let first=elems[0],last=elems[elems.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}return;}
 if(e.target.matches('input,textarea,select,[contenteditable="true"]')||e.ctrlKey||e.metaKey||e.altKey)return;
 if(e.key==='ArrowLeft'){e.preventDefault();selectCharacter(state.index-1,0,true)}
