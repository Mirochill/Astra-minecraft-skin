 for(const file of files){const name=utf8.encode(file.name),data=typeof file.data==='string'?utf8.encode(file.data):file.data,crc=crc32(data);const h=new Uint8Array(30+name.length),v=new DataView(h.buffer);
  v.setUint32(0,0x04034b50,true);v.setUint16(4,20,true);v.setUint16(6,0x0800,true);v.setUint16(12,0x0021,true);v.setUint32(14,crc,true);v.setUint32(18,data.length,true);v.setUint32(22,data.length,true);v.setUint16(26,name.length,true);h.set(name,30);blocks.push(h,data);
  const ch=new Uint8Array(46+name.length),cv=new DataView(ch.buffer);cv.setUint32(0,0x02014b50,true);cv.setUint16(4,20,true);cv.setUint16(6,20,true);cv.setUint16(8,0x0800,true);cv.setUint16(14,0x0021,true);cv.setUint32(16,crc,true);cv.setUint32(20,data.length,true);cv.setUint32(24,data.length,true);cv.setUint16(28,name.length,true);cv.setUint32(42,offset,true);ch.set(name,46);central.push(ch);centralSize+=ch.length;offset+=h.length+data.length;
 }
 const end=new Uint8Array(22),e=new DataView(end.buffer);e.setUint32(0,0x06054b50,true);e.setUint16(8,files.length,true);e.setUint16(10,files.length,true);e.setUint32(12,centralSize,true);e.setUint32(16,offset,true);return new Blob([...blocks,...central,end],{type:'application/zip'});
}
async function exportCollection(){
 if(packBusy)return;packBusy=true;$('exportBtn').disabled=true;setExportOpen(false);
 try{
  const files=[{name:'READ_ME.txt',data:'ANIME SKIN STUDIO\n20 characters / 60 fan-made looks\n\nChoose the Classic (Steve, 4-pixel arms) model in Minecraft.\nImport the 64 x 64 PNG. The SVG is the editable, transparent vector atlas.\nTransparent spaces outside the UV islands are intentional. All base faces are opaque.\nOuter layers contain the hair, collars and garment detailing.\n\nFan-made artwork; character and Minecraft rights belong to their respective owners.\nNot an official or endorsed collection.\n'}];
  let n=0;
  for(const c of CHARACTERS)for(let v=0;v<3;v++){const s=createSkin(c,v),path=`skins/${c.id}/${filename(s)}`;files.push({name:path+'.svg',data:atlasSVG(s)},{name:path+'.png',data:PNGbytes(s)});n++;if(n%5===0){toast(`Preparing collection… ${n} / 60`,10000);await new Promise(r=>setTimeout(r,0));}}
