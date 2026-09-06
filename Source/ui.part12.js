$('themeBtn').innerHTML=icon(document.body.classList.contains('light')?'moon':'sun');
renderRoster();selectCharacter(initialIndex,initialVariant);
// A small documented surface for automated tests and embedding; no network access.
window.SkinStudio={characters:CHARACTERS,get state(){return {...state}},get renderer(){return renderer},get skin(){return currentSkin},select:selectCharacter,setAnimation,createSkin,atlasSVG,frontSVG,rgbaPixels,zipStore,PNGbytes};
