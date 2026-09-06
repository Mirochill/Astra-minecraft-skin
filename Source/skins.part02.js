 function checker(p,f,a,b,size=2,o=false){let r=uvRect(p,f,o);for(let y=0;y<r[3];y++)for(let x=0;x<r[2];x++)dot(p,f,x,y,((Math.floor(x/size)+Math.floor(y/size))%2)?a:b,o)}
 function cloud(p,f,x,y){stamp(p,f,x,y,['.rr.','rrrr','.rrr','..r.'],{r:'#b44854'});dot(p,f,x,y+1,'#ddd4d0')}
 function fan(p='body',f='back',x=2,y=3){stamp(p,f,x,y,['.rr.','rrrr','wwww','.ww.','..w.'],{r:'#b74c57',w:'#e8e1da'})}
 function scout(p='body',f='back',x=2,y=3,o=false){stamp(p,f,x,y,['w..b','wwbb','wbwb','wwbb','.wb.'],{w:'#dcded6',b:'#6987a3'},o)}
 function seam(p,f,x,y,len,col,o=false){paint(p,f,x,y,1,len,col,o);}
 function openCoat(under,coat,width=2){for(let f of ['front']){paint('body',f,width,0,8-width*2,9,under);paint('body',f,0,0,width,12,coat);paint('body',f,8-width,0,width,12,coat);}paint('body','front',3,0,2,2,S)}
 function collar(col){paint('body','front',0,0,3,2,col,true);paint('body','front',5,0,3,2,col,true);paint('body','back',0,0,8,2,col,true);for(let f of ['left','right'])paint('body',f,0,0,4,2,col,true);}
 switch(c.id){
 case'naruto':
  if(v!==2)headband(v===1?'#604039':'#3b3f4c');
  paint('head','front',0,5,2,1,'#a87b64');paint('head','front',6,5,2,1,'#a87b64');
  dot('head','front',0,6,'#a87b64');dot('head','front',7,6,'#a87b64');
  if(v===0){
   band('body',0,4,'#343b4b');paint('body','front',3,0,2,12,'#babcc0');seam('body','front',4,0,12,'#666b72');
   collar('#373e4d');for(let p of ['ra','la']){band(p,4,5,'#ed853e');band(p,9,1,'#343b4b');}
   stamp('body','back',2,4,['.rr.','r..r','r.rr','.rr.'],{r:'#a14a44'});
  }else if(v===1){
   openCoat('#e78236','#9e443e');paint('body','front',3,0,2,7,'#3c3b40');collar('#a0443f');
   band('body',10,2,'#313540');for(let p of ['ra','la'])band(p,8,2,'#303441');
   for(let f of ['front']){dot('head',f,1,3,'#cb7241');dot('head',f,6,3,'#cb7241')}
   stamp('body','back',2,4,['.yy.','y..y','y.yy','.yy.'],{y:'#d9c596'});
  }else{
   openCoat('#da813e','#eee5d4');collar('#ede5d4');paint('body','front',3,2,2,7,'#bc713d');
   for(let p of ['body','ra','la']){let w=PARTS[p].w;for(let f of ['front','back','left','right'])for(let x=0;x<w;x++){paint(p,f,x,10-(x%3),1,2+(x%3),'#c64d45');}}
   stamp('body','back',2,2,['.rr.','rrrr','.rr.','r.r.','.rr.'],{r:'#a7433c'});
  }
  break;
 case'sasuke':
  if(v===0){openCoat(S,'#e3dfdf');vneck('#eeece6',5);collar('#ddd9df');band('body',9,2,'#927fa8');for(let p of ['rl','ll'])band(p,0,3,'#a899bf');dot('body','front',5,10,'#b8a4cb');fan();}
  if(v===1){headband('#313346',true);collar('#983e49');cloud('body','front',1,5);cloud('body','back',3,4);cloud('ra','front',0,4);cloud('la','back',0,5);seam('body','front',4,2,10,'#ab4452');eye='#b44354';dot('head','front',2,4,eye);dot('head','front',5,4,eye);}
  if(v===2){vneck(S,4);collar('#414353');fan();band('ra',6,4,'#d5ccbe');band('la',6,4,'#d5ccbe');paint('body','front',3,8,2,3,'#a69abd');}
  break;
 case'kakashi':
  if(v===1){
   fill('head','front','#dbd8cd');paint('head','front',0,0,8,1,'#c3c6c6');stamp('head','front',0,1,['g......g','.r....r','..r..r..','.gg..gg.','..r..r..','...gg...','...gg...'],{g:'#4b525b',r:'#a5464b'});
   paint('head','front',0,0,8,3,null,true);vneck('#3b4558');paint('body','front',2,4,4,4,'#bec2c8');band('body',9,2,'#525c70');band('ra',0,6,S);band('la',0,6,S);stamp('la','left',1,2,['r.','rr','.r'],{r:'#a54e56'});
  }else{
   headband('#394355');paint('head','front',4,3,4,2,'#a2aeb8');paint('head','front',5,3,2,1,'#d2d6d7');
   paint('head','front',0,5,8,3,'#394353');paint('head','front',2,6,4,1,'#414e60');
   if(v===0){collar('#899179');seam('body','front',3,1,10,'#536452');for(let x of [1,5]){paint('body','front',x,4,2,4,'#8d987e');paint('body','front',x,4,2,1,'#a3aa92')}paint('body','back',1,3,6,5,'#78876b');}
   else{openCoat('#667765','#eee7d9');collar('#b34347');stamp('body','back',2,2,['.rr.','rrrr','r.r.','.rr.','..r.'],{r:'#ad4c49'});band('body',10,2,'#b84945');}
  }break;
 case'itachi':
  if(v!==1)headband('#36343d',v===0);
  dot('head','front',2,5,'#987d77');dot('head','front',5,5,'#987d77');dot('head','front',1,6,'#ad8e82');dot('head','front',6,6,'#ad8e82');
  if(v===0){collar('#a24652');seam('body','front',4,1,11,'#99414e');cloud('body','front',1,5);cloud('body','back',3,4);cloud('ra','front',0,5);cloud('la','back',0,4);band('rl',6,3,'#d7c9bc');band('ll',6,3,'#d7c9bc');}
  else if(v===1){vneck('#394050');paint('body','front',2,3,4,5,'#b9bac2');band('body',9,2,'#695c79');band('ra',5,4,'#393e52');band('la',5,4,'#393e52');stamp('ra','right',1,1,['r.','rr','.r'],{r:'#a24851'});fan();}
  else{collar('#3c485d');fan();paint('body','front',3,0,2,3,'#e5d8c5');band('ra',8,2,'#bac3ca');band('la',8,2,'#bac3ca');}
  break;
 case'luffy':
  if(v<2){
   for(let f of ['top','back','left','right']){paint('head',f,0,0,8,f==='top'?8:2,'#d9b665',true);if(f!=='top')paint('head',f,0,2,8,1,'#ac4845',true)}
   paint('head','front',0,0,8,1,'#e7c97d',true);paint('head','front',0,1,8,1,'#b94f42',true);paint('head','front',0,2,8,1,'#e0bd6b',true);
  }else{paint('head','front',1,1,2,1,'#faf4f1',true);paint('head','front',5,0,2,1,'#ffffff',true);}
  paint('head','front',6,5,2,1,'#9d7359');
  openCoat(S,shirt,2);paint('body','front',2,8,4,3,S);for(let y of [3,6,9])dot('body','front',1,y,'#e3c36b');
  if(v!==0){stamp('body','front',2,4,['s..s','.ss.','.ss.','s..s'],{s:'#a66c58'});band('body',10,2,'#e5c263');}
  if(v===1){shade('body','back','#333039');for(let f of ['left','right'])paint('body',f,0,0,2,12,'#333039',true);collar('#3f3038');}
  if(v===2){collar('#f6f0ef');band('rl',6,1,'#f8f3ed');band('ll',6,1,'#f8f3ed');}
  break;
 case'zoro':
  dot('head','front',5,3,'#9a7658');dot('head','front',5,4,'#9a7658');dot('head','front',5,5,'#9a7658');
  for(let y of [5,6,7])dot('head','left',3,y,'#e0c773',true);
  if(v===0){openCoat(S,shirt);vneck('#2f4d3a',6);paint('body','front',2,3,1,4,'#aa7960');band('body',9,2,'#a44946');collar('#568165');}
  if(v===1){collar('#d8c8ba');vneck(S,4);paint('body','front',3,5,1,4,'#c4bbb0');for(let y of [5,7,9])dot('body','front',5,y,'#c2b297');}
  if(v===2){band('body',8,4,'#609552');for(let y of [8,10])band('body',y,1,'#477e45');vneck('#b1b5aa',2);}
  for(let p of ['rl','ll'])paint(p,'front',0,0,1,3,tint(pants,-18));
  break;
 case'goku':
  if(v!==2){vneck('#334e83',5);for(let p of ['ra','la'])band(p,0,2,'#3a568b');stamp('body','front',5,3,['ww','wk','ww'],{w:'#eee0cb',k:'#354151'});stamp('body','back',2,3,['.ww.','wkkw','wkwk','.ww.'],{w:'#eddec4',k:'#394552'});}
  else{paint('body','front',1,3,2,1,D);paint('body','front',5,3,2,1,D);seam('body','front',4,3,5,D);paint('body','front',2,6,2,1,D);paint('body','front',5,7,1,1,D);paint('body','back',1,3,1,4,D);paint('body','back',6,3,1,4,D);}
  for(let p of ['ra','la'])band(p,8,2,'#3f6095');for(let p of ['rl','ll']){band(p,8,1,'#cfb668');band(p,11,1,'#ab6052');}
  break;
 case'vegeta':
  if(v!==1){
   paint('body','front',1,0,6,5,'#e9e9dd');paint('body','front',1,5,6,4,'#bdab76');for(let y of [5,7])paint('body','front',1,y,6,1,'#988758');
   paint('body','back',1,2,6,6,'#d9dcd5');for(let p of ['ra','la'])band(p,0,v===2?3:1,v===2?'#bfac78':'#e8e8dd');
   if(v===2){paint('head','front',0,3,3,2,'#7faa87',true);dot('head','front',1,3,'#b9dbb8',true);paint('head','right',5,3,3,2,'#dee0d9',true);band('body',9,2,'#886b57');for(let p of ['rl','ll'])band(p,0,2,'#c3af7b');}
  }else{stamp('head','front',2,2,['k..k','kkkk','.kk.'],{k:'#413c42'});paint('head','front',2,2,4,1,null,true);paint('body','front',1,2,2,1,'#48629a');paint('body','front',5,2,2,1,'#48629a');paint('body','front',3,9,2,2,'#d8c269');hair='#ddc46c';/* majin gold hair: repaint only hair-valued pixels below */}
  for(let p of ['rl','ll'])band(p,9,1,'#b9ab7c');
  break;
 case'tanjiro':
  for(let p of ['body','ra','la'])for(let f of ['front','back','left','right']){
   if(v===0)checker(p,f,'#54a889','#283e3b',2);
   else if(v===1){shade(p,f,'#8cbdca');stamp(p,f,0,3,['.ww.','wwww','.ww.'],{w:'#e3e8dc'});stamp(p,f,2,8,['.ww.','wwww'],{w:'#e3e8dc'});}
   else{shade(p,f,'#7e9bb9');for(let y=2;y<12;y+=4)paint(p,f,x=0,y,PARTS[p].w,1,'#aec8d2');}
  }
  openCoat('#333946',v===0?'#58a88a':v===1?'#8bbcc9':'#819fbb',1);if(v===0){checker('body','front','#54a889','#283e3b',2);paint('body','front',2,0,4,9,'#333946');paint('body','front',3,0,2,2,S);}band('body',9,1,'#dedacc');
  for(let p of ['ra','la']){band(p,10,2,S);band(p,9,1,'#303740');}
  paint('body','front',3,2,2,1,'#ccc6b8');for(let y of [4,6,8])dot('body','front',4,y,'#bbb9af');
  stamp('head','front',5,1,['rr','r.','.r'],{r:'#a2514c'});paint('head','front',5,1,2,2,null,true);
  for(let f of ['left','right']){paint('head',f,4,5,1,3,'#e8dfd7',true);dot('head',f,4,6,'#b55652',true)}
  if(v===1){stamp('head','left',1,2,['www','wrw','wkw'],{w:'#ece5df',r:'#bd6e60',k:'#413d3e'},true);}
  if(v===2)vneck('#e2dfd0',4);
  break;
 case'nezuko':
  for(let f of ['back','left','right'])for(let y=5;y<8;y++)paint('head',f,0,y,8,1,tint('#914d37',(y-5)*13),true);
  if(v!==2){
   for(let f of ['front','back'])for(let y=0;y<9;y++)for(let x=0;x<8;x++)if((x+y)%4===0||(x-y+12)%4===0)dot('body',f,x,y,'#b66a89');
   vneck('#ead1ca',4);band('body',8,3,'#ad4c54');paint('body','front',0,8,8,1,'#e8d4c6');paint('body','front',3,8,2,3,'#719c80');
   for(let p of ['rl','ll']){for(let f of ['front','back'])for(let y=0;y<5;y++)for(let x=0;x<4;x++)if((x+y)%3===0)dot(p,f,x,y,'#b4718e');band(p,5,4,'#e4c9bf');band(p,7,1,'#f1ded0');}
   paint('head','front',1,6,6,1,'#84a575',true);paint('head','front',2,6,3,1,'#b0c68b',true);dot('head','front',1,6,'#67865c',true);dot('head','front',6,6,'#67865c',true);
   for(let f of ['back','left','right'])shade('body',f,'#493036');
  }else{vneck('#3c3e57',5);stamp('body','front',2,3,['r..r','.rr.','..r.','..r.'],{r:'#b35b70'});band('body',9,3,'#51516a');for(let p of ['rl','ll']){band(p,0,4,'#53516a');band(p,4,4,S);band(p,8,3,'#f0e5df');}}
  dot('head','front',7,2,'#e6a5b7',true);dot('head','front',6,2,'#efaec4',true);
  if(v===1){stamp('head','front',5,0,['.w','ww','.d'],{w:'#e3cfad',d:'#bfa689'},true);stamp('head','front',0,3,['.k','k.','.k'],{k:'#7c514d'});stamp('body','front',1,4,['k.','.k','k.'],{k:'#91545f'});}
  break;
 case'zenitsu':
  if(v===0){for(let p of ['body','ra','la'])for(let f of ['front','back','left','right']){let r=uvRect(p,f);for(let y=2;y<10;y+=4)for(let x=(y%8===2?1:3);x<r[2];x+=4)stamp(p,f,x,y,['w','ww'],{w:'#eee5ce'});}openCoat('#34373b','#ddb04e',1);collar('#e7c374');}
  else if(v===1){collar('#dfdccf');seam('body','front',4,2,8,'#bbb6a6');stamp('body','back',2,3,['wwww','.ww.','wwww','.w..'],{w:'#d6d0c0'});}
  else{vneck('#e6ded0',4);paint('body','front',3,2,2,5,'#944e43');paint('body','front',5,4,2,2,'#c19a53');band('ra',8,2,'#b39769');band('la',8,2,'#b39769');}
  band('body',9,1,'#e6dfd0');for(let p of ['ra','la'])band(p,10,2,S);
  break;
 case'gojo':
  collar(v===2?'#3e4659':'#303749');paint('body','front',3,1,2,2,shirt);dot('body','front',5,3,'#b1a17e');seam('body','front',4,4,7,tint(shirt,12));
  if(v===0){paint('head','front',0,3,8,2,'#262e3b',true);paint('head','front',1,3,6,1,'#353e4c',true);for(let f of ['back','left','right'])paint('head',f,0,3,8,2,'#2b3543',true)}
  else if(v===1){paint('head','front',1,4,2,1,'#75d9f7');paint('head','front',5,4,2,1,'#75d9f7');dot('head','front',2,4,'#d3f9ff');dot('head','front',5,4,'#d3f9ff');}
  else{paint('head','front',0,4,3,1,'#34404b',true);paint('head','front',5,4,3,1,'#34404b',true);paint('head','front',3,4,2,1,'#66717b',true);paint('body','front',4,2,1,7,'#566072');}
  break;
 case'yuji':case'sukuna':
  if(v===0){collar('#9f454d');paint('body','front',1,0,6,2,'#a64851',true);paint('body','back',1,0,6,4,'#a54a53',true);seam('body','front',5,2,8,'#4f5265');dot('body','front',6,3,'#b7a174');for(let p of ['ra','la'])band(p,9,1,'#a94e55');}
  if(c.id==='yuji'&&v===1){vneck('#747b8b',2);paint('body','front',2,5,4,1,'#737e92');paint('body','front',3,6,2,1,'#6d788b');band('ra',9,1,'#929aad');band('la',9,1,'#929aad');}
  if(c.id==='yuji'&&v===2){collar('#e9e6df');vneck(S,3);paint('body','front',4,3,1,7,'#b4b6b4');for(let y of [3,6,8])dot('body','front',4,y,'#737d82');}
  if(c.id==='sukuna'){
   stamp('head','front',0,3,['k......k','........','kk....kk','.k.kk.k.','..k..k..'],{k:'#574049'});dot('head','front',3,1,'#644b50');dot('head','front',4,1,'#644b50');
   if(v===1){vneck('#66616b',6);seam('body','front',4,5,4,'#aa9b9e');collar('#ddd5d0');}
   if(v===2){stamp('body','front',0,1,['kk....kk','.kk..kk.','..k..k..','kk....kk','...kk...','kk....kk'],{k:'#62434c'});for(let p of ['ra','la']){band(p,2,1,'#5c4046');band(p,4,1,'#5c4046');band(p,7,1,'#5c4046');}paint('body','back',3,1,2,7,'#5e444a');}
  }break;
 case'ichigo':
  vneck(v===0?'#e6e0d3':'#a24b53',6);paint('body','front',4,5,1,5,'#a5a0a0');collar(v===0?'#d2c9bb':'#743c47');
  for(let p of ['ra','la'])band(p,9,1,v===0?'#e0dace':'#a13e49');
  if(v>0){for(let p of ['rl','ll']){paint(p,'front',0,0,1,7,'#a3444d');paint(p,'back',3,0,1,6,'#913e48');}}
  if(v===2){paint('head','front',0,1,4,7,'#e9e3d5',true);stamp('head','front',0,1,['r...','rr..','.rr.','kkk.','r...','.rr.','kk.k'],{r:'#99494a',k:'#38343a'},true);}
  break;
 case'eren':case'levi':
  if(c.id==='eren'&&v===1){openCoat('#b4b0a5','#373737');vneck(S,5);collar('#414141');seam('body','back',3,1,10,'#303030');}
  else{
   if(c.id==='levi'&&v===2){openCoat('#ddd6c7','#aaa699');vneck('#eae2d4',3);paint('body','front',3,4,2,3,'#c4bdaf');}
   else{openCoat('#c4c6b6',shirt);collar(tint(shirt,12));scout();scout('la','left',0,3);scout('ra','right',0,3);paint('body','front',0,5,2,1,'#d4c5a6');paint('body','front',6,5,2,1,'#d4c5a6');}
   for(let p of ['rl','ll']){band(p,2,1,'#6f6054');band(p,6,1,'#6f6054');for(let f of ['front','back']){paint(p,f,1,0,1,8,'#6f6054');paint(p,f,3,3,1,2,'#8e8880');}}
   paint('body','front',2,7,4,1,'#695c53');paint('body','front',3,9,2,2,'#b9b6a5');
   if(c.id==='levi'){stamp('body','front',2,0,['w..w','.ww.','.ww.','..w.'],{w:'#ebe5d7'});}
