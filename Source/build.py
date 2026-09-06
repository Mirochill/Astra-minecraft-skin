"""Rebuild the offline HTML from its editable sources. Python 3, no dependencies."""
from pathlib import Path

source = Path(__file__).resolve().parent
html = (source / "template.html").read_text(encoding="utf-8")
for token, filename in (("SKINS", "skins.js"), ("ENGINE", "engine.js"), ("UI", "ui.js")):
    marker = "/*__" + token + "__*/"
    if marker not in html:
        raise ValueError(f"Missing template marker: {marker}")
    html = html.replace(marker, (source / filename).read_text(encoding="utf-8"))
output = source.parent / "Anime_Skin_Studio.html"
output.write_text(html, encoding="utf-8")
print(f"Created {output} ({output.stat().st_size:,} bytes)")
