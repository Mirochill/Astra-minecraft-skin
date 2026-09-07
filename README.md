<div align="center">

<img src="docs/assets/header.svg" alt="Astra Anime Skin Studios : du pixel au volume. 20 personnages, 60 tenues, deux applications." width="100%" />

### Deux codes. La même collection. Une évolution visuelle.

**HTML autonome** &nbsp; / &nbsp; **SVG transparent** &nbsp; / &nbsp; **3D interactive** &nbsp; / &nbsp; **Sans connexion**

[Les deux versions](#les-deux-versions) · [Ce qui change](#ce-qui-change) · [Démarrage](#démarrage) · [Exports](#exports-et-compatibilité) · [La collection](#la-collection)

</div>

> [!IMPORTANT]
> **Ce dépôt contient deux applications différentes, chacune dans son propre fichier HTML.**
> `Anime_Skin_Studio.html` est la **version originale, V1**. `Anime_Atelier_Sculpted.html` est la **version améliorée, V2**, construite à partir de la première avec une interface repensée, des textures plus fines et de véritables volumes supplémentaires.
>
> Ce ne sont pas deux noms pour le même fichier, ni deux thèmes d'une seule application. Les deux partagent une base de génération et le même catalogue, mais embarquent des codes de visualisation distincts. **La V2 ne remplace pas la V1 : les deux sont conservées pour être utilisées et comparées.**

## Les deux versions

<table>
<tr>
<td width="50%" valign="top">

### 01 · Anime Skin Studio

**La version originale**

<a href="Anime_Skin_Studio.html"><img src="docs/assets/v1-preview.png" alt="Capture réelle de la V1 : atlas transparent et Naruto en Sage Mode dans le visualisateur classique." width="100%" /></a>

Un studio centré sur le **skin Minecraft classique** : atlas transparent à gauche, personnage animé à droite, garde-robe et collection accessibles immédiatement.

Textures 64 × 64, couches externes, aperçu 3D, huit animations, exports SVG/PNG et export ZIP de la collection.

**[Voir le code V1](Anime_Skin_Studio.html)** &nbsp; · &nbsp; **[Télécharger le HTML V1](https://github.com/Mirochill/Astra-minecraft-skin/raw/refs/heads/main/Anime_Skin_Studio.html)**

</td>
<td width="50%" valign="top">

### 02 · Anime Atelier Sculpted

**La version améliorée**

<a href="Anime_Atelier_Sculpted.html"><img src="docs/assets/v2-preview.png" alt="Capture réelle de la V2 : le même Naruto en Sage Mode, avec cheveux en volume, vêtement détaillé et nouvelle interface." width="100%" /></a>

Une évolution vers un **atelier de personnages en relief** : mèches séparées, vêtements sculptés, accessoires et textures plus détaillées dans un nouvel espace de présentation.

Textures 256 × 256, modes Sculpted/Classic, cadrage portrait, ambiances Chalk/Noir/Sage et export du modèle animé en GLB.

**[Voir le code V2](Anime_Atelier_Sculpted.html)** &nbsp; · &nbsp; **[Télécharger le HTML V2](https://github.com/Mirochill/Astra-minecraft-skin/raw/refs/heads/main/Anime_Atelier_Sculpted.html)**

</td>
</tr>
</table>

<p align="center"><sub>Comparaison à personnage et tenue identiques : Naruto Uzumaki · Sage Mode. Les aperçus proviennent de l'exécution des véritables fichiers HTML.</sub></p>

## Ce qui change

| | V1 · Original | V2 · Sculpted |
| :--- | :--- | :--- |
| **Intention** | Créer et explorer des skins classiques. | Reprendre la collection avec davantage de détail et de volume. |
| **Collection** | 20 personnages, trois variantes chacun. | Les mêmes 20 personnages, les mêmes 60 variantes, dans le même ordre. |
| **Textures** | Atlas 64 × 64. | Atlas détaillé 256 × 256 et export Classic 64 × 64 séparé. |
| **Cheveux et vêtements** | Détails dessinés dans la texture et les couches externes. | Mèches en géométrie, cols, revers, pans de vêtements et accessoires selon le personnage. |
| **Visualisateur** | Studio classique, environnements Studio/Overworld/Void. | Nouvelle interface, ambiances Chalk/Noir/Sage, cadrages Full body/Portrait/Back. |
| **Asset à gauche** | Atlas ou personnage, vue de face ou de dos. | Sculpt, Front, Back ou UV map. |
| **Mouvement** | Huit animations inspirées de Minecraft. | Huit animations et mouvements secondaires sur certaines pièces. |
| **Export 3D** | Capture PNG du visualisateur. | Modèle GLB avec huit clips d'animation, plus capture transparente. |
| **Autonomie** | Un seul HTML, sans dépendance externe à charger. | Un autre HTML complet, sans avoir besoin du fichier V1. |

> [!NOTE]
> Le bouton **Classic / Sculpted à l'intérieur de la V2** change son modèle de prévisualisation. Il **ne charge pas le code de la V1**. Pour retrouver le premier studio, il faut ouvrir `Anime_Skin_Studio.html`.

### Le détail devient du volume

<img src="docs/assets/sculpted-detail.png" alt="Gros plan réel de Gojo, variante Shibuya, dans la V2 : mèches distinctes, yeux détaillés et col en relief." width="100%" />

<p align="center"><sub>Satoru Gojo · Shibuya · mode Sculpted. Gros plan du modèle rendu par l'application, pas une illustration de présentation.</sub></p>

L'amélioration ne se limite pas à changer la palette de l'interface. La V2 ajoute un modèle articulé composé de pièces distinctes, des détails de texture plus fins et des silhouettes adaptées aux tenues. Les cheveux, les vêtements et les accessoires restent visibles lorsque le personnage tourne.

## Démarrage

**Télécharger un HTML, puis l'ouvrir dans un navigateur.** Aucun serveur, aucune installation de paquet et aucune clé API ne sont nécessaires pour utiliser les visualisateurs. Le HTML inclut son interface, son code de génération, son moteur de rendu et ses exports.

Sur GitHub, **Voir le code** affiche le fichier source. Utiliser le lien **Télécharger le HTML** ou le bouton **Download raw file**, puis ouvrir le fichier enregistré avec un navigateur. Pour une première découverte, commencer par la V2 ; pour comparer les implémentations ou travailler avec le studio classique, ouvrir la V1 à côté.

Pour récupérer tout le dépôt :

```bash
git clone https://github.com/Mirochill/Astra-minecraft-skin.git
cd Astra-minecraft-skin
```

Ouvrir ensuite `Anime_Skin_Studio.html` ou `Anime_Atelier_Sculpted.html`. Les images et les fichiers JSON du dossier `docs/` servent uniquement à la documentation ; **ils ne sont requis par aucun des deux HTML**.

### Commandes essentielles

| Action | V1 | V2 |
| :--- | :--- | :--- |
| Tourner / zoomer | Glisser sur le modèle / molette ou pincement. | Glisser sur le modèle / molette ou pincement. |
| Changer de personnage | Collection ou flèches gauche/droite. | Collection ou flèches gauche/droite. |
| Changer de tenue | Garde-robe ou touches `[` et `]`. | Garde-robe ou touches `1`, `2`, `3`. |
| Choisir une animation | Boutons ou touches `1` à `8`. | Boutons Idle, Walk, Run, Sneak, Jump, Swim, Elytra, Attack. |
| Lecture / pause | `Espace` | `Espace` |
| Rotation / plein écran / réinitialisation | `R` / `F` / `0` | `R` / `F` / `0` |

Les interfaces restent en anglais et privilégient les contrôles visuels. Le bouton d'aide de chaque application contient ses commandes propres.

## Exports et compatibilité

**Un skin plat et un personnage sculpté sont deux types d'assets différents.** Le visualisateur permet de les voir ensemble, mais les fichiers exportés n'ont pas le même usage.

| Format | Disponible dans | Usage |
| :--- | :--- | :--- |
| **PNG 64 × 64** | V1 et V2 | Skin prévu pour le modèle Classic / Steve, avec des bras de quatre pixels. |
| **SVG transparent** | V1 et V2 | Atlas vectoriel et aperçus du personnage. La V2 ajoute l'export de sa projection sculptée. |
| **ZIP de la collection** | V1 | Export des 60 skins en PNG et SVG. |
| **PNG / SVG 256 × 256** | V2 | Texture détaillée du modèle de l'atelier. |
| **GLB animé** | V2 | Géométrie sculptée, texture et huit clips d'animation pour un outil 3D compatible. |
| **Capture PNG** | V1 et V2 | Image du rendu ; la V2 propose une capture transparente. |

> [!WARNING]
> **Les volumes supplémentaires de la V2 ne sont pas transportés par un skin Minecraft standard.** Un PNG 64 × 64 ne peut pas contenir la géométrie des mèches, des fourreaux ou des pans de manteau. Le GLB n'est pas un pack Minecraft directement importable, et la texture 256 × 256 n'est pas présentée comme un skin Java standard.
>
> Les animations sont des recréations **inspirées de Minecraft**, pas du code d'animation extrait du jeu.

## La collection

**20 personnages × 3 tenues = 60 looks par application.** Le catalogue et son ordre sont identiques dans les deux fichiers ; il ne s'agit pas de 120 tenues différentes.

<details>
<summary><b>Afficher les 20 personnages et leurs 60 variantes</b></summary>

| # | Personnage | Variante 1 | Variante 2 | Variante 3 |
| :--- | :--- | :--- | :--- | :--- |
| 01 | Naruto Uzumaki | Shippuden | Sage Mode | Hokage |
| 02 | Sasuke Uchiha | Hebi | Akatsuki | Final Battle |
| 03 | Kakashi Hatake | Jonin | ANBU | Sixth Hokage |
| 04 | Itachi Uchiha | Akatsuki | ANBU | Young Uchiha |
| 05 | Monkey D. Luffy | East Blue | Onigashima | Gear 5 |
| 06 | Roronoa Zoro | Wano | Dressrosa | East Blue |
| 07 | Son Goku | Turtle Gi | Super Saiyan | Ultra Instinct |
| 08 | Vegeta | Battle Armor | Majin | Saiyan Prince |
| 09 | Tanjiro Kamado | Checkered Haori | Final Selection | Training |
| 10 | Nezuko Kamado | Pink Kimono | Awakened | School Uniform |
| 11 | Zenitsu Agatsuma | Thunder Haori | Corps Uniform | School Uniform |
| 12 | Satoru Gojo | Blindfold | Shibuya | Student |
| 13 | Yuji Itadori | Jujutsu Uniform | Training | School Days |
| 14 | Ryomen Sukuna | Cursed Vessel | White Kimono | Domain |
| 15 | Ichigo Kurosaki | Shikai | Bankai | Hollow Mask |
| 16 | Eren Yeager | Scout Regiment | Final Season | Training |
| 17 | Levi Ackerman | Scout Regiment | Captain | Underground |
| 18 | Izuku Midoriya | Hero Costume | U.A. Uniform | Vigilante |
| 19 | Saitama | Hero Suit | Training | Casual |
| 20 | Killua Zoldyck | Classic | Godspeed | Hunter Exam |

</details>

## Deux fichiers, deux implémentations

Les données de personnage et une partie de la génération des skins constituent une base commune. Les différences résident ensuite dans l'interface, les textures enrichies, la construction des modèles, le rendu, l'animation et les exports. **La V2 est bien une évolution de la V1, pas un projet sans rapport avec elle.**

```text
V1 : CHARACTERS → createSkin() → atlas 64 × 64 → SkinRenderer
                                                └─ PNG / SVG / ZIP

V2 : CHARACTERS → createHD() → texture 256 × 256 → SculptModel
                                                  └─ AtelierRenderer
                                                       └─ SVG / PNG / GLB animé
```

Chaque application intègre également un moteur logiciel de secours lorsque WebGL n'est pas disponible. Les sources sont regroupées dans leur HTML respectif : on peut lire et modifier directement les styles, les générateurs et le JavaScript sans étape de compilation.

### Organisation du dépôt

```text
Astra-minecraft-skin/
├── Anime_Skin_Studio.html          # V1 : application originale complète
├── Anime_Atelier_Sculpted.html     # V2 : application améliorée complète
├── index.html                     # Ancien point d'entrée V1, conservé tel quel
├── README.md
└── docs/
    ├── assets/                    # Bannière et captures réelles des applications
    ├── manifest.json              # Tailles et empreintes SHA-256 des deux HTML
    └── validation.json            # Résultat et périmètre des vérifications
```

`index.html` est l'ancien emballage compressé de la V1 déjà présent dans le dépôt. Il reste inchangé pour préserver ce point d'entrée. **Ce n'est pas une troisième édition.** Les deux sources complètes à comparer sont les HTML nommés explicitement ci-dessus.

## Vérifications et limites

La publication conserve les deux fichiers fournis **octet pour octet**, avec des empreintes dans [`docs/manifest.json`](docs/manifest.json). La syntaxe JavaScript, la présence des 20 personnages et des 60 variantes, l'identité de leur ordre et de leurs noms, ainsi que le rendu des aperçus ont été vérifiés. Les captures sont réalisées dans Chromium avec le moteur logiciel de secours, sans requête réseau externe de l'application et sans erreur JavaScript non interceptée pendant ces vérifications.

Le détail figure dans [`docs/validation.json`](docs/validation.json). Ces tests ne constituent pas une validation exhaustive du rendu WebGL matériel, de toutes les interactions et combinaisons d'exports, ni de l'import des skins dans le client Minecraft ou des GLB dans un logiciel tiers. Aucun multiplicateur de qualité ou de performance « ×100 » n'est revendiqué comme une mesure technique.

---

<div align="center">

**Une collection, deux étapes de création.**  
Le skin classique comme point de départ. Le personnage sculpté comme évolution.

<sub>Projet fan-made indépendant. Les personnages représentés et les marques citées appartiennent à leurs titulaires respectifs. Ce projet n'est ni officiel ni affilié à Mojang, Microsoft ou aux ayants droit des œuvres représentées.</sub>

</div>
