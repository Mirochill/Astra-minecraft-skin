  downloadBlob(zipStore(files),'anime-skin-studio_60-skins.zip');toast('All 60 skins exported. Enjoy your collection.',3500);
 }catch(err){console.error(err);toast('The export could not be completed. Please try again.',4000)}finally{packBusy=false;$('exportBtn').disabled=false;}
}
function doExport(type){
 setExportOpen(false);const base=filename();
 if(type==='pack'){exportCollection();return}
 if(type==='svg'){downloadBlob(new Blob([atlasSVG(currentSkin)],{type:'image/svg+xml'}),base+'.svg');toast('Transparent SVG atlas exported');}
 if(type==='front'){downloadBlob(new Blob([frontSVG(currentSkin,state.back)],{type:'image/svg+xml'}),base+(state.back?'_back':'_front')+'.svg');toast('Transparent character sprite exported');}
 if(type==='png'){skinCanvas(currentSkin).toBlob(blob=>{if(blob){downloadBlob(blob,base+'.png');toast('64 × 64 skin exported · Choose Classic in Minecraft')}});}
 if(type==='snapshot'){
  if(!renderer){toast('A 3D snapshot needs WebGL. SVG and skin PNG exports still work.');return;}
  renderer.render();renderer.canvas.toBlob(blob=>{if(blob){downloadBlob(blob,base+'_3d.png');toast('3D snapshot exported')}});
 }
}
function showFallback(){if(!currentSkin)return;$('fallback').hidden=false;$('fallback').innerHTML=frontSVG(currentSkin)+'<p>3D needs WebGL. Enable hardware acceleration or open this file in Chrome, Edge or Firefox. All 60 SVG / PNG skins remain available.</p>';}
function closeExpanded(){if($('previewCard').classList.contains('expanded')){$('previewCard').classList.remove('expanded');document.body.style.overflow='';$('fullscreenBtn').innerHTML=icon('maximize');if(renderer)renderer.resize();return true;}return false;}
async function fullscreen(){if(closeExpanded())return;try{if(document.fullscreenElement)await document.exitFullscreen();else await $('previewCard').requestFullscreen();}catch(e){$('previewCard').classList.add('expanded');document.body.style.overflow='hidden';$('fullscreenBtn').innerHTML=icon('minimize');if(renderer)renderer.resize();}}
