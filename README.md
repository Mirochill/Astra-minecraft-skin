<div align="center">

# Anime Skin Studio

### 20 iconic anime characters · 60 handcrafted Minecraft-style skins · one offline 3D studio

<img src="Collection_60_Looks.png" alt="Anime Skin Studio — 60 looks" width="100%" />

![HTML](https://img.shields.io/badge/HTML-single--file-E34F26?logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E?logo=javascript&logoColor=111)
![SVG](https://img.shields.io/badge/SVG-vector_assets-FFB13B?logo=svg&logoColor=111)
![Offline](https://img.shields.io/badge/offline-ready-22c55e)
![Minecraft](https://img.shields.io/badge/skin_layout-64%C3%9764-62B47A)

**A completely self-contained character skin gallery and interactive Minecraft-style 3D viewer.**  
No framework. No CDN. No runtime dependency. Open the HTML file and it works.

</div>

---

## What is this?

Anime Skin Studio is an experimental, code-generated collection of Minecraft-style fan skins inspired by 20 well-known anime characters.

Each character has **three distinct looks**, for a total of **60 skins**. The project includes the complete 64×64 skin atlases, transparent SVG versions, front-facing vector sprites, an interactive 3D previewer, several Minecraft-inspired animations, environment controls, and export tools.

The entire viewer can run from a **single offline HTML file**. The source version is split into small editable JavaScript and HTML files, then rebuilt into that standalone file with a tiny Python script.

## Included characters

| Series | Characters |
| --- | --- |
| Naruto | Naruto Uzumaki, Sasuke Uchiha, Kakashi Hatake, Itachi Uchiha |
| One Piece | Monkey D. Luffy, Roronoa Zoro |
| Dragon Ball | Son Goku, Vegeta |
| Demon Slayer | Tanjiro Kamado, Nezuko Kamado, Zenitsu Agatsuma |
| Jujutsu Kaisen | Satoru Gojo, Yuji Itadori, Ryomen Sukuna |
| Bleach | Ichigo Kurosaki |
| Attack on Titan | Eren Yeager, Levi Ackerman |
| My Hero Academia | Izuku Midoriya / Deku |
| One-Punch Man | Saitama |
| Hunter × Hunter | Killua Zoldyck |

Every character ships with three costume or transformation variants selected to make the silhouettes, colors, clothing and iconic details meaningfully different rather than merely recolored.

---

## Features

- **60 complete 64×64 skins** using the Minecraft Classic / Steve UV layout.
- **Transparent SVG skin atlases** generated from the same pixel data as the PNG skins.
- **Front-facing SVG character sprites** for every variation.
- **Interactive 3D preview** with orbit, zoom and automatic rotation.
- **Outer skin layer support** for hair, clothing, accessories and raised details.
- **Eight animation modes**: idle, walk, run, crouch, jump, swim, fly and attack.
- **Multiple preview environments**, including a minimal void view, studio platform and block-built outdoor stage.
- **Offline fallback renderer**: if WebGL is unavailable, the app contains its own software triangle rasterizer with perspective-correct texture mapping and a depth buffer.
- **Exports** for the generated assets directly from the viewer.
- **Search and wardrobe navigation** designed to remain simple despite the size of the collection.
- **No external assets or libraries at runtime**.

---

## How it was made

This project was built as a code-first graphics experiment rather than by drawing sixty skins manually in an image editor.

### 1. Character design as structured data

The 20 characters are first represented as compact JavaScript objects containing the character name, series, core palette, hair and eye colors, accent color and three variant names.

The skin generator then applies character-specific rules for clothing, hair, facial details, accessories and each variant. Those rules paint directly into a **4096-pixel RGBA buffer**, corresponding to a 64×64 Minecraft skin.

The important part is that the variants are not separate downloaded images. They are generated from code and share a consistent construction system.

### 2. Minecraft UV mapping

The generator implements the standard six-face cuboid mapping for:

- head
- torso
- left/right arms
- left/right legs
- outer head layer
- outer body and limb layers

A custom `uvRect()` function maps each body face to the correct region of the 64×64 texture. Higher-level paint helpers then draw bands, stamps, highlights and layered details without having to manually reason about raw atlas coordinates every time.

### 3. Procedural pixel-art detailing

The skins are built with deterministic palette operations instead of random noise. Highlights, seams, shading and small character-specific motifs are placed by code so the result remains repeatable every time the project is rebuilt.

This produces the base textures used for both the PNG and SVG exports.

### 4. The 3D model is custom-rendered

The viewer does not embed an existing Minecraft renderer.

It constructs the player from six textured cuboids, calculates the geometry for every body face, maps the generated skin atlas onto those faces, and animates the model by applying transformations to the limbs and torso.

The primary renderer uses **WebGL**. A second renderer was also written from scratch as a fallback: it projects triangles in software, uses barycentric coordinates, perspective-correct UV interpolation, per-pixel depth testing and alpha blending, and therefore remains a real rotatable 3D model rather than a static fake preview.

### 5. Animation system

Animation poses are computed mathematically from time rather than stored as sprite frames. Walking and running use sinusoidal arm/leg motion; jumping, swimming, flying, crouching and attacks use dedicated pose functions and smoothed interpolation between target joint angles.

This keeps the file compact while allowing the same generated skin to animate immediately.

### 6. Single-file offline build

The editable source is split into:

```text
Source/
├── template.html
├── skins.js
├── engine.js
├── ui.js
└── build.py
```

`build.py` has no third-party dependencies. It simply inserts the three JavaScript source files into the HTML template and writes the final standalone `Anime_Skin_Studio.html`.

```bash
python Source/build.py
```

The resulting file can be opened directly in a modern browser. No server is required.

---

## Repository structure

```text
Anime_Skin_Studio/
├── Anime_Skin_Studio.html       # Complete offline application
├── Collection_20_Defaults.svg   # Default-character overview
├── Collection_60_Looks.png      # Full 60-look contact sheet
├── Skins/                       # 64×64 PNG + transparent SVG atlases
├── Sprites/                     # Front-facing transparent SVG previews
├── Source/                      # Editable application source
├── manifest.json                # Collection metadata
├── LICENSE_CODE.txt             # License for the original project code
└── README.md
```

---

## Run it

The easiest way is gloriously primitive, because apparently software is occasionally allowed to be simple:

1. Download the repository.
2. Open `Anime_Skin_Studio.html` in Chrome, Edge, Firefox or another modern browser.
3. Pick a character and wardrobe variant.
4. Drag to rotate the model, scroll to zoom, and select an animation.

No `npm install`. No dev server. No dependency archaeology.

---

## Rebuild from source

Python 3 is the only tool required for the build step:

```bash
python Source/build.py
```

That regenerates `Anime_Skin_Studio.html` from the editable source files.

---

## Design constraints

The project intentionally follows a few constraints:

- all skins use the **Classic 4-pixel-arm model**;
- the viewer must remain usable offline;
- the runtime must not depend on external frameworks, CDNs or downloaded textures;
- generated textures should remain valid 64×64 Minecraft-style atlases;
- character identity should come from palette, costume, hair and iconic details rather than pasted artwork;
- the interface should prioritize visual browsing over walls of explanatory text.

---

## AI creation note

The project was designed, coded and generated in ChatGPT with **OpenAI GPT-6 Astra Pro** from a user request describing a large anime-themed Minecraft skin collection and interactive visualizer.

The model produced the character data system, procedural skin-generation logic, custom UV mapping, WebGL renderer, software-rendering fallback, animation system, interface, export pipeline and generated asset collection. The result was then packaged as an offline HTML application together with editable sources and exported PNG/SVG assets.

This repository does **not** claim that an AI model manually painted each skin pixel-by-pixel in an external graphics application. The distinguishing idea is precisely the opposite: the character textures are represented and produced by code, then rendered and exported programmatically.

---

## Fan-project / trademark notice

This is an unofficial fan-made technical demo. Character names and associated franchises belong to their respective rights holders. Minecraft is a trademark of Microsoft / Mojang Studios. This project is not affiliated with, endorsed by, sponsored by or approved by those rights holders.

The repository contains original project code and code-generated fan interpretations. It does not include downloaded anime artwork, official textures, game source code or extracted Minecraft assets.

See `LICENSE_CODE.txt` for the code license. Character-inspired fan-art assets may be subject to the rights of their respective franchise owners and should not be assumed to inherit the software license.

---

<div align="center">

**60 looks. 20 characters. One file. No dependencies.**

Built as an experiment in procedural pixel art, browser rendering and absurdly compact tooling.

</div>
