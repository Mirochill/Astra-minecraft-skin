"""Capture real application previews and record a bounded smoke test."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json
import re
import shutil
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[2]
ASSETS = ROOT / 'docs/assets'
ASSETS.mkdir(parents=True, exist_ok=True)
FILES = [('v1', 'Anime_Skin_Studio.html'), ('v2', 'Anime_Atelier_Sculpted.html')]
report = {'scope': 'Chromium software renderer; desktop smoke test, not a Minecraft import test', 'editions': {}}
characters = []
for edition, filename in FILES:
    source = (ROOT / filename).read_text(encoding='utf-8')
    for script in re.findall(r'<script\b[^>]*>([\s\S]*?)</script>', source):
        with tempfile.NamedTemporaryFile(suffix='.js', mode='w', encoding='utf-8') as js:
            js.write(script)
            js.flush()
            subprocess.run(['node', '--check', js.name], check=True)
with sync_playwright() as p:
    executable = shutil.which('google-chrome') or shutil.which('chromium')
    browser = p.chromium.launch(executable_path=executable, headless=True,
        args=['--no-sandbox', '--disable-dev-shm-usage', '--disable-webgl'])
    for edition, filename in FILES:
        errors = []
        requests = []
        context = browser.new_context(viewport={'width': 1440, 'height': 1050}, device_scale_factor=1)
        context.route('http*://**/*', lambda route: (requests.append(route.request.url), route.abort()))
        page = context.new_page()
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.set_content((ROOT / filename).read_text(encoding='utf-8'))
        api = 'SkinStudio' if edition == 'v1' else 'atelier'
        page.wait_for_function(f'window.{api}?.renderer', timeout=60000)
        page.wait_for_timeout(1200)
        roster = page.evaluate('''name => {
            const app = window[name];
            return (app.characters || app.CHARACTERS).map(c => ({id:c.id,name:c.name,variants:c.variants}));
        }''', api)
        assert len(roster) == 20 and sum(len(c['variants']) for c in roster) == 60
        characters.append(roster)
        page.evaluate(f'{api}.select(0,1)')
        page.wait_for_timeout(900)
        page.locator('#pauseBtn' if edition == 'v1' else '#playBtn').click()
        page.evaluate(f'{api}.renderer.paused=true; {api}.renderer.time=0; {api}.renderer.render();')
        page.screenshot(path=str(ASSETS / f'{edition}-preview.png'), full_page=True)
        if edition == 'v2':
            page.evaluate('atelier.select(11,1)')
            page.wait_for_timeout(700)
            page.locator('[data-frame="face"]').click()
            page.wait_for_timeout(900)
            page.evaluate('atelier.renderer.time=0;atelier.renderer.render();')
            page.locator('#stage').screenshot(path=str(ASSETS / 'sculpted-detail.png'))
        backend = page.evaluate(f'{api}.renderer.backend')
        assert not errors, errors
        assert not requests, requests
        report['editions'][edition] = {
            'file':filename, 'characters':20, 'variants':60, 'javascript_syntax':'passed',
            'preview':'passed', 'backend':backend, 'uncaught_errors':errors,
            'external_requests':requests,
        }
        context.close()
    browser.close()
assert characters[0] == characters[1], 'Character order or wardrobe changed.'
report['identical_character_order_and_variant_names'] = True
report['not_tested'] = ['Hardware WebGL', 'Every export/import combination', 'Minecraft client import', 'External GLB import']
(ROOT / 'docs/validation.json').write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
print(json.dumps(report, indent=2))
