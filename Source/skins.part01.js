/* Anime Skin Studio — original, code-drawn fan-art textures.
   Standard 64 × 64 Classic / Steve UV layout; opaque base faces, transparent outer layers.
   No downloaded character art or pre-existing skins. */
'use strict';
const CHARACTERS = [
 {id:'naruto',name:'Naruto Uzumaki',short:'Naruto',series:'NARUTO',accent:'#f7a84c',hair:'#efbc3b',skin:'#efbb91',eye:'#409cda',variants:['Shippuden','Sage Mode','Hokage']},
 {id:'sasuke',name:'Sasuke Uchiha',short:'Sasuke',series:'NARUTO',accent:'#aaa0ee',hair:'#202637',skin:'#e8c8b0',eye:'#47424e',variants:['Hebi','Akatsuki','Final Battle']},
 {id:'kakashi',name:'Kakashi Hatake',short:'Kakashi',series:'NARUTO',accent:'#b6c9c2',hair:'#c5ced3',skin:'#dfb799',eye:'#343b43',variants:['Jonin','ANBU','Sixth Hokage']},
 {id:'itachi',name:'Itachi Uchiha',short:'Itachi',series:'NARUTO',accent:'#e47578',hair:'#272631',skin:'#e1c0af',eye:'#c14950',variants:['Akatsuki','ANBU','Young Uchiha']},
 {id:'luffy',name:'Monkey D. Luffy',short:'Luffy',series:'ONE PIECE',accent:'#f5bd60',hair:'#26252b',skin:'#e8b485',eye:'#373039',variants:['East Blue','Onigashima','Gear 5']},
 {id:'zoro',name:'Roronoa Zoro',short:'Zoro',series:'ONE PIECE',accent:'#91c986',hair:'#649854',skin:'#d8ab85',eye:'#33362f',variants:['Wano','Dressrosa','East Blue']},
 {id:'goku',name:'Son Goku',short:'Goku',series:'DRAGON BALL',accent:'#f49d61',hair:'#252632',skin:'#e2ac7e',eye:'#292f3b',variants:['Turtle Gi','Super Saiyan','Ultra Instinct']},
 {id:'vegeta',name:'Vegeta',short:'Vegeta',series:'DRAGON BALL',accent:'#80aaf0',hair:'#222432',skin:'#ddae87',eye:'#283145',variants:['Battle Armor','Majin','Saiyan Prince']},
 {id:'tanjiro',name:'Tanjiro Kamado',short:'Tanjiro',series:'DEMON SLAYER',accent:'#76c4a3',hair:'#492b32',skin:'#eac3aa',eye:'#8a444a',variants:['Checkered Haori','Final Selection','Training']},
 {id:'nezuko',name:'Nezuko Kamado',short:'Nezuko',series:'DEMON SLAYER',accent:'#eda4b7',hair:'#2e292e',skin:'#f0ccba',eye:'#df839c',variants:['Pink Kimono','Awakened','School Uniform']},
 {id:'zenitsu',name:'Zenitsu Agatsuma',short:'Zenitsu',series:'DEMON SLAYER',accent:'#edc76c',hair:'#edbb55',skin:'#edc4a4',eye:'#ab7333',variants:['Thunder Haori','Corps Uniform','School Uniform']},
 {id:'gojo',name:'Satoru Gojo',short:'Gojo',series:'JUJUTSU KAISEN',accent:'#8fceee',hair:'#e1e6ed',skin:'#edcfc0',eye:'#6ad4f4',variants:['Blindfold','Shibuya','Student']},
 {id:'yuji',name:'Yuji Itadori',short:'Yuji',series:'JUJUTSU KAISEN',accent:'#ee9895',hair:'#cc8883',skin:'#e6bd9e',eye:'#9b624c',variants:['Jujutsu Uniform','Training','School Days']},
 {id:'sukuna',name:'Ryomen Sukuna',short:'Sukuna',series:'JUJUTSU KAISEN',accent:'#d87f91',hair:'#d29a92',skin:'#e9c2a4',eye:'#c74352',variants:['Cursed Vessel','White Kimono','Domain']},
 {id:'ichigo',name:'Ichigo Kurosaki',short:'Ichigo',series:'BLEACH',accent:'#eea063',hair:'#d97c38',skin:'#e6bc9a',eye:'#88502d',variants:['Shikai','Bankai','Hollow Mask']},
 {id:'eren',name:'Eren Yeager',short:'Eren',series:'ATTACK ON TITAN',accent:'#a9bd84',hair:'#49372f',skin:'#dfbd9e',eye:'#609987',variants:['Scout Regiment','Final Season','Training']},
 {id:'levi',name:'Levi Ackerman',short:'Levi',series:'ATTACK ON TITAN',accent:'#a2b8a1',hair:'#292932',skin:'#e1c5b1',eye:'#8b979d',variants:['Scout Regiment','Captain','Underground']},
 {id:'deku',name:'Izuku Midoriya',short:'Deku',series:'MY HERO ACADEMIA',accent:'#72c9ac',hair:'#284d43',skin:'#eac4a4',eye:'#65a182',variants:['Hero Costume','U.A. Uniform','Vigilante']},
 {id:'saitama',name:'Saitama',short:'Saitama',series:'ONE PUNCH MAN',accent:'#e5ce76',hair:null,skin:'#ebc19e',eye:'#4b413e',variants:['Hero Suit','Training','Casual']},
 {id:'killua',name:'Killua Zoldyck',short:'Killua',series:'HUNTER × HUNTER',accent:'#b2bdf3',hair:'#dce1ec',skin:'#e9c8b1',eye:'#668cca',variants:['Classic','Godspeed','Hunter Exam']}
];
const PARTS={
 head:{w:8,h:8,d:8,base:[0,0],outer:[32,0]},
 body:{w:8,h:12,d:4,base:[16,16],outer:[16,32]},
 ra:{w:4,h:12,d:4,base:[40,16],outer:[40,32]},
 la:{w:4,h:12,d:4,base:[32,48],outer:[48,48]},
 rl:{w:4,h:12,d:4,base:[0,16],outer:[0,32]},
 ll:{w:4,h:12,d:4,base:[16,48],outer:[0,48]}
};
function uvRect(part,face,outer=false){
 const p=PARTS[part], [x,y]=outer?p.outer:p.base, {w,h,d}=p;
 const f={top:[d,0,w,d],bottom:[d+w,0,w,d],right:[0,d,d,h],front:[d,d,w,h],left:[d+w,d,d,h],back:[2*d+w,d,w,h]}[face];
 return [x+f[0],y+f[1],f[2],f[3]];
}
const FACES=['front','back','left','right','top','bottom'];
const skinCache=new Map();
function tint(hex,amount=0){
 if(!hex)return null;
 const s=hex.replace('#','');let n=parseInt(s,16);return '#'+[n>>16&255,n>>8&255,n&255].map(v=>Math.max(0,Math.min(255,Math.round(v+amount))).toString(16).padStart(2,'0')).join('');
}
function createSkin(character,variant=0){
 const c=typeof character==='string'?CHARACTERS.find(c=>c.id===character):character;
 if(!c)throw new Error('Unknown character');
 const v=Math.max(0,Math.min(2,variant|0)),key=c.id+'-'+v;
 if(skinCache.has(key))return skinCache.get(key);
 const px=new Array(4096).fill(null), S=c.skin, D=tint(S,-23), H=tint(S,10);
 let hair=c.hair,eye=c.eye;
 if(c.id==='goku'&&v===1){hair='#edcf6b';eye='#5aaea9'}
 if(c.id==='goku'&&v===2){hair='#d4dceb';eye='#909fb9'}
 if(c.id==='luffy'&&v===2){hair='#eeedf1';eye='#a55272'}
 if(c.id==='eren'&&v===1)hair='#302b2b';
 if(c.id==='killua'&&v===1){hair='#e0eafa';eye='#6de1ed'}
 function put(x,y,col){if(x>=0&&x<64&&y>=0&&y<64)px[y*64+x]=col}
 function paint(p,f,x,y,w,h,col,o=false){let r=uvRect(p,f,o);for(let j=Math.max(0,y);j<Math.min(r[3],y+h);j++)for(let i=Math.max(0,x);i<Math.min(r[2],x+w);i++)put(r[0]+i,r[1]+j,col)}
 function dot(p,f,x,y,col,o=false){paint(p,f,x,y,1,1,col,o)}
 function fill(p,f,col,o=false){let r=uvRect(p,f,o);paint(p,f,0,0,r[2],r[3],col,o)}
 function shade(p,f,col,o=false){
  const r=uvRect(p,f,o),w=r[2],h=r[3];
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
   let a=0;if(x===0||x===w-1)a-=8;if(y===h-1)a-=9;if(y===0)a+=5;
   if(x===1&&y>0&&y<h-2)a+=5;
   // Sparse, intentional seams and highlights, rather than random pixel noise.
   if((x*7+y*3)%19===0)a+=4;
   dot(p,f,x,y,tint(col,a),o);
  }
 }
 function all(p,col){FACES.forEach(f=>shade(p,f,col))}
 function band(p,y,h,col,o=false){for(let f of ['front','back','left','right'])paint(p,f,0,y,PARTS[p].w+PARTS[p].d,h,col,o)}
 function stamp(p,f,x,y,rows,palette,o=false){rows.forEach((row,j)=>[...row].forEach((k,i)=>{if(palette[k])dot(p,f,x+i,y+j,palette[k],o)}))}
 let shirt='#273242',pants='#293242',sleeve=null,boots='#323643',belt=null,neck=true,short=false,gloves=null;
 switch(c.id){
 case'naruto':shirt=v===2?'#f0e7d8':'#ed843c';pants=v===2?'#2e3440':'#e87b35';sleeve=v===0?'#303441':v===1?'#99433c':'#f0e7d8';boots='#303544';belt=v===2?'#382f2c':null;break;
 case'sasuke':shirt=v===0?'#e1dede':v===1?'#28252e':'#39394a';pants='#383645';sleeve=shirt;boots='#424152';belt=v===0?'#9c83ba':'#615373';break;
 case'kakashi':shirt=v===0?'#6e8063':v===1?'#a7adbb':'#eee7d8';pants='#343e50';sleeve=v===2?'#ede5d6':'#3b455b';boots='#2d3545';gloves='#3b4556';break;
 case'itachi':shirt=v===0?'#29252e':v===1?'#9d9fab':'#354054';pants=v===0?'#302730':'#3b4054';sleeve=v===1?S:shirt;boots='#343441';belt=v===1?'#705885':null;break;
 case'luffy':shirt=v===2?'#f2eced':'#bd4944';pants=v===0?'#427cad':v===1?'#795095':'#e7e5e8';sleeve=S;boots='#9d783e';short=true;neck=false;belt=v===0?null:'#eec35c';break;
 case'zoro':shirt=v===0?'#4b785b':v===1?'#333c42':'#e7e3d6';pants=v===0?'#45694c':'#39473e';sleeve=v===1?shirt:v===0?'#4b785b':S;boots='#373c32';belt=v===0?'#aa4644':'#679855';neck=v!==0;break;
 case'goku':shirt=v===2?S:'#e58b39';pants='#df8a3b';sleeve=S;boots='#3d4e79';belt='#3c5985';neck=false;break;
 case'vegeta':shirt=v===1?'#293c78':'#e4e5dc';pants=v===2?'#354377':'#344e96';sleeve=v===1?S:pants;boots='#e7e5d9';gloves=v===1?'#e8e3d6':'#e7e6dc';belt=v===1?'#e3e1d5':null;break;
 case'tanjiro':shirt=v===0?'#55a789':v===1?'#79b3c2':'#8cafc9';pants=v===2?'#7b9fba':'#333946';sleeve=shirt;boots='#e0d7c4';belt='#e2d9c9';break;
 case'nezuko':shirt=v===2?'#eee5d9':'#d990a8';pants=v===2?'#555269':'#d59aaf';sleeve=v===2?'#eee5d9':'#473033';boots='#4b353e';belt=v===2?'#4e4760':'#aa424a';break;
 case'zenitsu':shirt=v===0?'#e3b24b':v===1?'#34353b':'#d7b670';pants=v===2?'#6c635d':'#38363d';sleeve=shirt;boots=v===0?'#cf9944':'#4a4140';belt='#ede5d6';break;
 case'gojo':shirt=v===2?'#303644':'#282d3e';pants=shirt;sleeve=shirt;boots='#33343a';neck=false;break;
 case'yuji':shirt=v===0?'#29334b':v===1?'#b7bbc6':'#e4e3df';pants=v===0?'#2c3347':v===1?'#343b4b':'#373e4b';sleeve=v===2?S:shirt;boots=v===0?'#b6494c':'#9f594c';break;
 case'sukuna':shirt=v===0?'#303247':v===1?'#e7e2dc':S;pants=v===0?'#303446':'#e6dfd4';sleeve=shirt;boots=v===0?'#a34d51':'#4b4249';belt=v===0?null:'#53424f';neck=v===0;break;
 case'ichigo':shirt=v===0?'#32323d':'#252630';pants=shirt;sleeve=shirt;boots='#e8ddd0';belt=v===0?'#eae3d7':'#a13e48';neck=false;break;
 case'eren':shirt=v===1?'#383839':'#a08562';pants=v===1?'#49403c':'#d8d3c2';sleeve=shirt;boots='#655044';belt='#65544b';break;
 case'levi':shirt=v===0?'#a08360':v===1?'#647455':'#c0b8a7';pants='#d6d1c2';sleeve=v===2?'#e3dccc':shirt;boots='#5a4940';belt='#655a52';break;
 case'deku':shirt=v===0?'#459482':v===1?'#bcc5c1':'#3d6c64';pants=v===1?'#385353':shirt;sleeve=shirt;boots=v===1?'#695048':'#b24d49';gloves=v===1?null:'#d8d4c5';belt=v===1?'#5b6560':'#bc5e4c';break;
 case'saitama':shirt=v===0?'#e7c454':v===1?'#385184':'#c9a6b1';pants=v===0?'#dfb94a':v===1?'#334a7a':'#485873';sleeve=shirt;boots=v===0?'#b34748':'#d8d9d0';gloves=v===0?'#bd4e4c':null;belt=v===0?'#292e39':null;break;
 case'killua':shirt=v===0?'#e4e2e2':v===1?'#a3add6':'#e2e5e6';pants=v===0?'#637799':v===1?'#5b6c93':'#6583b0';sleeve=v===0?'#465478':v===1?S:'#72689a';boots='#59648e';short=true;break;
 }
 // All six base faces are completely opaque, including hidden faces.
 all('head',S);all('body',shirt);all('ra',sleeve||shirt);all('la',sleeve||shirt);all('rl',pants);all('ll',pants);
 for(let p of ['ra','la']){
  if(sleeve===S){for(let f of FACES)shade(p,f,S)}
  if(!gloves){band(p,10,2,S);fill(p,'bottom',D)}
  else {band(p,9,3,gloves);fill(p,'bottom',tint(gloves,-10))}
  if((c.id==='luffy'||c.id==='goku'||c.id==='zoro'&&v===2)&&sleeve===S){band(p,0,3,S)}
 }
 for(let p of ['rl','ll']){
  if(short){band(p,7,4,S);band(p,6,1,tint(pants,22));}
  band(p,short?11:9,short?1:3,boots);fill(p,'bottom',tint(boots,-17));
  for(let f of ['front','left','right'])paint(p,f,1,short?11:10,2,1,tint(boots,14));
  if(!short){paint(p,'front',1,3,1,3,tint(pants,9));paint(p,'front',3,6,1,3,tint(pants,-10));}
 }
 if(neck){paint('body','front',3,0,2,2,S);dot('body','front',3,2,D);dot('body','front',4,2,D);}
 if(belt){band('body',9,2,belt);paint('body','front',3,9,2,2,tint(belt,35));}
 // Head foundation. Long hair and silhouettes live in the real hat layer.
 let longHair=['sasuke','itachi','nezuko'].includes(c.id)||(c.id==='eren'&&v===1);
 if(hair){
  shade('head','top',hair);shade('head','back',hair);
  for(let f of ['left','right']){
   shade('head',f,hair);paint('head',f,2,4,4,4,S);paint('head',f,2,5,1,2,D);
   if(longHair)paint('head',f,0,3,3,5,hair);
   if(!longHair)paint('head','back',2,7,4,1,D);
  }
  let rows=['hhhhhhhh','hHhhhhHh','hh.h.hh.','h......h'];
  if(c.id==='sasuke')rows=['hhhhhhhh','HhhHhhhh','hhhhh.hH','hhh....h','hh.....h'];
  if(c.id==='itachi')rows=['hhhhhhhh','hHhhhhHh','hh....hh','h......h','h......h','h......h'];
  if(c.id==='luffy')rows=['hhhhhhhh','hHhHhhHh','hhhhh.hh','h.h....h'];
  if(c.id==='vegeta')rows=['hhhhhhhh','hh.hh.hh','h..hh..h','h......h'];
  if(c.id==='goku')rows=['hhHhhhHh','hhhhhhhh','hhh.h.hh','h.h...hh'];
  if(c.id==='zenitsu')rows=['hhhhhhhh','HhHHhHhh','hhhhhhhh','h.h.h.hh'];
  if(c.id==='gojo')rows=['hhhHhhhh','hHhhhHhH','hhh.hh.h','h......h'];
  if(c.id==='levi')rows=['hhhhhhhh','hhhHHhhh','hhhh.hhh','hhh...hh','h......h'];
  if(c.id==='eren')rows=v===1?['hhhhhhhh','hhhHHhhh','hh....hh','h......h','h......h']:['hhhhhhhh','hhHhhhHh','hh.hhhhh','h...h..h'];
  if(c.id==='nezuko')rows=['hhhhhhhh','hHHhhhhh','hhh...hh','hh.....h','h......h','h......h'];
  if(c.id==='deku')rows=['hHhhhHhh','hhhHhhhh','hhhh.hh.','h.hh...h'];
  if(c.id==='killua')rows=['hhHhhhHh','hHhhhHhh','hhh.hh.h','h.h...hh'];
  stamp('head','front',0,0,rows,{h:hair,H:tint(hair,18)});
  // An offset outer shell gives the hair and fringe actual Minecraft layer depth.
  shade('head','top',tint(hair,6),true);
  for(let f of ['back','left','right']){
   for(let y=0;y<(longHair?8:4);y++)for(let x=0;x<8;x++){
    if(y===3&&!longHair&&(x+y)%3===0)continue;
    dot('head',f,x,y,tint(hair,(x%3===0?13:0)-(y>4?9:0)),true);
   }
  }
  stamp('head','front',0,0,rows.slice(0,3),{h:hair,H:tint(hair,19)},true);
 }else{
  shade('head','top',H);paint('head','top',2,2,3,2,tint(S,19));
  paint('head','front',1,1,3,1,H);paint('head','back',0,6,8,2,D);
 }
 // Eyes, ears, cheeks and a one-pixel smile. Kept deliberately pixel-perfect.
 paint('head','front',1,4,2,1,'#f0e9e0');paint('head','front',5,4,2,1,'#f0e9e0');
 dot('head','front',2,4,eye);dot('head','front',5,4,eye);
 dot('head','front',0,5,D);dot('head','front',7,5,D);
 paint('head','front',3,7,2,1,tint(S,-28));
 dot('head','front',4,5,tint(S,-12));
 function headband(color='#3b4255',slash=false){
  for(let f of ['front','left','right','back'])paint('head',f,0,2,8,2,color);
  paint('head','front',1,2,6,2,'#bdc4c6');paint('head','front',2,2,4,1,'#d7d9d1');
  dot('head','front',3,3,'#58616a');dot('head','front',4,2,'#657075');
  if(slash)paint('head','front',1,3,6,1,'#555763');
  // Remove shell pixels that would otherwise conceal the headband.
  paint('head','front',0,2,8,2,null,true);
  for(let f of ['left','right','back'])paint('head',f,0,2,8,2,color,true);
 }
 function vneck(color,depth=5){for(let y=0;y<depth;y++){let x=Math.min(3,Math.floor(y/1.5));dot('body','front',x,y,color);dot('body','front',7-x,y,color)}}
