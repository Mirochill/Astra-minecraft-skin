function selectCharacter(index,variant=0,scroll=false){
 state.index=(index+CHARACTERS.length)%CHARACTERS.length;state.variant=(variant+3)%3;
 const c=CHARACTERS[state.index];currentSkin=createSkin(c,state.variant);
 document.documentElement.style.setProperty('--accent',c.accent);document.documentElement.style.setProperty('--accent-rgb',hexRGB(c.accent).map(v=>Math.round(v*255)).join(','));
 $('characterName').textContent=c.name;$('seriesLabel').textContent=c.series;$('characterCounter').innerHTML=`<b>${String(state.index+1).padStart(2,'0')}</b> / 20`;$('ghostIndex').textContent=String(state.index+1).padStart(2,'0');
 document.title=`${c.short} · ${currentSkin.name} — Anime Skin Studio`;
 if(renderer)renderer.setSkin(currentSkin);else showFallback();
 renderSource();renderVariants();updateRosterSelection();store();
 if(scroll){const selected=$('roster').querySelector('.selected');if(selected){let left=selected.offsetLeft-$('roster').offsetLeft-($('roster').clientWidth-selected.offsetWidth)/2;$('roster').scrollTo({left,behavior:'smooth'});}}
 try{history.replaceState(null,'',`#${c.id}/${state.variant}`)}catch(e){}
}
function renderVariants(){
 const c=CHARACTERS[state.index];$('wardrobeIndex').textContent=`0${state.variant+1} / 03`;
 $('variantList').innerHTML=c.variants.map((name,v)=>`<button class="variant ${v===state.variant?'selected':''}" data-variant="${v}" role="tab" aria-selected="${v===state.variant}" title="${xmlEscape(c.name+' — '+name)}"><span class="variant-preview">${frontSVG(createSkin(c,v))}</span><span><strong>${xmlEscape(name)}</strong><small>${v===0?'Signature':'Alternate '+String(v).padStart(2,'0')}</small></span></button>`).join('');
}
function renderSource(){
 const isAtlas=state.source==='atlas';$('sourceBacking').classList.toggle('portrait',!isAtlas);
 $('sourceArt').innerHTML=isAtlas?atlasSVG(currentSkin):frontSVG(currentSkin,state.back);
 $('sourceDimension').textContent=isAtlas?'64 × 64 PIXELS':'16 × 32 PIXELS';$('sourceMeta').textContent=isAtlas?'64 × 64':'16 × 32';$('pixelInfo').textContent='RGBA';$('flipSource').hidden=isAtlas;$('guideBtn').hidden=!isAtlas;
 $('uvGuide').hidden=!state.guide||!isAtlas;
