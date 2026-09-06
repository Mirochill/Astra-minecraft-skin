   if(c.id==='eren'&&v===0){shade('body','back','#617457',true);for(let f of ['left','right'])shade('body',f,'#617457',true);collar('#738362');scout('body','back',2,3,true);}
   if(c.id==='eren'&&v===2){shade('body','back',shirt);stamp('body','back',2,3,['w..w','.ww.','.ww.','w..w'],{w:'#d9d2ba'});paint('body','front',2,2,4,4,'#aaa99a');paint('body','front',3,0,2,2,S);for(let p of ['ra','la']){let f=p==='ra'?'right':'left';paint(p,f,0,3,4,5,shirt);stamp(p,f,0,3,['w..w','.ww.','.ww.','w..w'],{w:'#d9d2ba'});}}
   if(c.id==='levi'&&v===1){shade('body','back','#627354',true);for(let f of ['left','right'])shade('body',f,'#627354',true);collar('#778264');scout('body','back',2,3,true);}
  }
  break;
 case'deku':
  for(let x of [0,2,5,7])dot('head','front',x,5,'#967b61');
  if(v!==1){
   paint('body','front',0,0,2,9,'#384d48');paint('body','front',6,0,2,9,'#384d48');paint('body','front',3,2,2,6,'#b6c3b7');
   collar(v===2?'#c3b58d':'#b6c3bc');paint('body','front',2,0,4,2,v===2?'#c2b392':'#c2cec3',true);for(let p of ['ra','la']){band(p,7,2,'#737f77');band(p,9,1,'#d2d5c6');}for(let p of ['rl','ll'])band(p,6,2,'#343f3d');
   if(v===2){paint('head','front',0,5,8,3,'#a4aca0',true);paint('head','front',1,6,6,1,'#4b635d',true);dot('head','front',1,4,'#dae8cc');dot('head','front',6,4,'#dae8cc');}
  }else{collar('#49665f');vneck('#ece7dc',4);paint('body','front',3,2,2,5,'#9c4a4b');for(let y of [6,8])dot('body','front',4,y,'#6c6b64');band('ra',9,1,'#5f7970');band('la',9,1,'#5f7970');}
  break;
 case'saitama':
  if(v===0){
   collar('#eae4d7');paint('body','front',3,1,2,7,'#b79b54');paint('body','front',3,0,2,1,'#f0ead8');dot('body','front',1,1,'#6c7779',true);dot('body','front',6,1,'#6c7779',true);
   shade('body','back','#e5dfd1',true);for(let f of ['left','right'])paint('body',f,0,0,1,12,'#ded9cf',true);paint('body','front',3,9,2,2,'#d0c8b8');
  }else if(v===1){paint('body','front',3,0,2,12,'#b9a561');collar('#3c598d');for(let p of ['ra','la'])for(let f of ['left','right'])paint(p,f,1,0,1,10,'#c1b16a');for(let p of ['rl','ll'])for(let f of ['left','right'])paint(p,f,1,0,1,9,'#baa966');}
  else{collar('#b892a2');stamp('body','front',1,3,['kk..kk','k....k','kk..kk','......','.kkkk.'],{k:'#7c596f'});paint('body','front',2,8,4,2,'#b48fa0');}
  break;
 case'killua':
  collar(v===0?'#637096':v===1?'#a6b9df':'#806da6');
  if(v===0){paint('body','front',3,0,2,4,'#7281a3');paint('body','front',3,4,2,1,'#a5aeba');for(let p of ['ra','la'])band(p,0,5,'#e3e2e3');}
  if(v===1){vneck('#dfe5e8',4);seam('body','front',4,3,7,'#d5ddef');for(let p of ['ra','la'])band(p,0,4,'#a7b3d6');stamp('body','back',2,3,['..w.','.ww.','ww..','.ww.','..w.'],{w:'#d9ebf4'});}
  if(v===2){paint('body','front',3,0,2,5,'#8874b0');band('body',9,2,'#a1a4bd');for(let p of ['ra','la']){band(p,0,4,'#e2e4e6');band(p,4,5,'#7e6da4');}}
  break;
 }
 // Correct golden Majin hair using only head UVs, never recoloring clothes or skin.
 if(c.id==='vegeta'&&v===1){
  function isDarkHair(color){if(!color)return false;let n=parseInt(color.slice(1),16);let r=n>>16&255,g=n>>8&255,b=n&255;return b>=r&&b>g&&r<65&&g<65&&b<84}
  for(let o of [false,true])for(let f of FACES){let [x,y,w,h]=uvRect('head',f,o);for(let j=0;j<h;j++)for(let i=0;i<w;i++){let k=(y+j)*64+x+i;if(isDarkHair(px[k]))px[k]=tint('#dac067',(i%3===0?13:0)-(j>4?5:0));}}
  stamp('head','front',2,2,['k..k','kkkk'],{k:'#514442'});paint('head','front',2,2,4,1,null,true);dot('head','front',2,4,'#739c99');dot('head','front',5,4,'#739c99');
 }
 const result={pixels:px,character:c,variant:v,name:c.variants[v],key};
 skinCache.set(key,result);return result;
}
function xmlEscape(s){return String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function pixelsSVG(pixels,w,h,title='',scale=1){
 const colors=new Map();
 for(let y=0;y<h;y++)for(let x=0;x<w;){const color=pixels[y*w+x];let end=x+1;while(end<w&&pixels[y*w+end]===color)end++;if(color){if(!colors.has(color))colors.set(color,[]);colors.get(color).push(`M${x} ${y}h${end-x}v1H${x}z`);}x=end;}
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${w*scale}" height="${h*scale}" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges" role="img" aria-label="${xmlEscape(title)}"><title>${xmlEscape(title)}</title>${[...colors].map(([c,p])=>`<path fill="${c}" d="${p.join('')}"/>`).join('')}</svg>`;
}
function atlasSVG(skin){return pixelsSVG(skin.pixels,64,64,`${skin.character.name} — ${skin.name} | Classic Minecraft skin, 64×64`)}
function frontPixels(skin,back=false,layers=true){
 const out=new Array(16*32).fill(null);const f=back?'back':'front';
 const positions={head:[4,0],body:[4,8],ra:[back?12:0,8],la:[back?0:12,8],rl:[back?8:4,20],ll:[back?4:8,20]};
 for(let [p,[tx,ty]]of Object.entries(positions))for(let o of layers?[false,true]:[false]){let[x,y,w,h]=uvRect(p,f,o);for(let j=0;j<h;j++)for(let i=0;i<w;i++){let col=skin.pixels[(y+j)*64+x+i];if(col)out[(ty+j)*16+tx+i]=col;}}
 return out;
}
function frontSVG(skin,back=false){return pixelsSVG(frontPixels(skin,back),16,32,`${skin.character.name} — ${skin.name}, ${back?'back':'front'} view`)}
function avatarSVG(skin){const p=new Array(64).fill(null);for(let o of [false,true]){let[x,y]=uvRect('head','front',o);for(let j=0;j<8;j++)for(let i=0;i<8;i++){let col=skin.pixels[(y+j)*64+x+i];if(col)p[j*8+i]=col;}}return pixelsSVG(p,8,8,skin.character.short)}
function rgbaPixels(skin){const data=new Uint8Array(64*64*4);skin.pixels.forEach((c,i)=>{if(c){let n=parseInt(c.slice(1),16);data.set([n>>16&255,n>>8&255,n&255,255],i*4)}});return data;}
if(typeof module!=='undefined')module.exports={CHARACTERS,PARTS,FACES,uvRect,createSkin,atlasSVG,frontSVG,frontPixels,avatarSVG,rgbaPixels,pixelsSVG};
