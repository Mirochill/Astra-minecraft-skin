"""Materialize the two original HTML snapshots without changing a single byte."""
from pathlib import Path
import gzip
import hashlib
import json
import lzma
import re

ROOT = Path(__file__).resolve().parents[2]
EXPECTED = {
    'Anime_Skin_Studio.html': '1b7b51275682cd340a84c77cedc9cccb80cc269a55dbb7c8dee438e49418e8e2',
    'Anime_Atelier_Sculpted.html': '0ed86047513a8456033225e087c98c57eb7bfa90908bbfb4e18bd1268fd44ebd',
}
index = (ROOT / 'index.html').read_bytes()
blob = hashlib.sha1(b'blob ' + str(len(index)).encode() + b'\0' + index).hexdigest()
if blob != '2294b1e966b0b0bcc079b26aa01b0fd061dd9bf0':
    raise RuntimeError('The existing entry point changed; refusing to use a different source.')
match = re.search(r'const s=`(.*?)`,n=(\d+);', index.decode('utf-8'), re.S)
if not match:
    raise RuntimeError('Original snapshot not found in the existing entry point.')
size = int(match.group(2))
packed = bytearray()
value = bits = 0
for char in match.group(1):
    value = (value << 15) | (ord(char) - 0x3400)
    bits += 15
    while bits >= 8 and len(packed) < size:
        bits -= 8
        packed.append((value >> bits) & 255)
    value &= (1 << bits) - 1
original = gzip.decompress(packed)
patch = b''.join(p.read_bytes() for p in sorted(Path(__file__).parent.glob('patch.*')))
operations, literals = lzma.decompress(patch).split(b'\n', 1)
offset = 0
sculpted = bytearray()
for source, length in json.loads(operations):
    if source < 0:
        sculpted.extend(literals[offset:offset + length])
        offset += length
    else:
        sculpted.extend(original[source:source + length])
if offset != len(literals):
    raise RuntimeError('Unconsumed publication data.')
outputs = dict(zip(EXPECTED, [original, bytes(sculpted)]))
manifest = {'format': 1, 'editions': [], 'legacy_entry_point_unchanged': True}
for name, content in outputs.items():
    checksum = hashlib.sha256(content).hexdigest()
    if checksum != EXPECTED[name]:
        raise RuntimeError(f'Integrity check failed for {name}.')
    (ROOT / name).write_bytes(content)
    manifest['editions'].append({'file': name, 'bytes': len(content), 'sha256': checksum})
    print(f'Verified {name}: {len(content)} bytes; SHA256 {checksum}')
(ROOT / 'docs').mkdir(exist_ok=True)
(ROOT / 'docs/manifest.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
