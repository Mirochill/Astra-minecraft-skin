 $('sourceTabs').querySelectorAll('button').forEach(b=>{const active=b.dataset.source===state.source;b.classList.toggle('selected',active);b.setAttribute('aria-selected',String(active))});
}
function renderRoster(){
 const q=$('rosterSearch').value.trim().toLowerCase();const matches=CHARACTERS.map((c,i)=>({c,i})).filter(({c})=>(c.name+' '+c.short+' '+c.series).toLowerCase().includes(q));
 $('rosterCount').textContent=matches.length;
 $('roster').innerHTML=matches.length?matches.map(({c,i})=>`<button class="roster-card ${i===state.index?'selected':''}" data-character="${i}" role="option" aria-selected="${i===state.index}" aria-label="${xmlEscape(c.name+' — '+c.series)}" title="${xmlEscape(c.name+' · '+c.series)}"><span class="roster-number">${String(i+1).padStart(2,'0')}</span><span class="roster-avatar">${avatarSVG(createSkin(c,0))}</span><span class="roster-name">${c.short}</span></button>`).join(''):'<div class="no-results">No characters found.</div>';
}
function updateRosterSelection(){document.querySelectorAll('[data-character]').forEach(b=>{let active=Number(b.dataset.character)===state.index;b.classList.toggle('selected',active);if(b.getAttribute('role')==='option')b.setAttribute('aria-selected',String(active));})}
function renderBrowser(){
 const q=$('modalSearch').value.trim().toLowerCase();const matches=CHARACTERS.map((c,i)=>({c,i})).filter(({c})=>(c.name+' '+c.series).toLowerCase().includes(q));
 $('modalCount').textContent=`${matches.length} CHARACTERS / ${matches.length*3} LOOKS`;
 $('modalGrid').innerHTML=matches.length?matches.map(({c,i})=>`<button class="modal-character ${i===state.index?'selected':''}" data-character="${i}" style="--char-accent:${c.accent}" aria-label="${xmlEscape(c.name)}">${avatarSVG(createSkin(c,0))}<strong>${c.short}</strong><small>${xmlEscape(c.series)}</small></button>`).join(''):'<div class="no-results">No match. Try a name or an anime.</div>';
}
function openModal(id){lastFocus=document.activeElement;$(id).hidden=false;document.body.style.overflow='hidden';if(id==='browseModal'){$('modalSearch').value='';renderBrowser();setTimeout(()=>$('modalSearch').focus(),0)}else setTimeout(()=>$('closeHelp').focus(),0)}
