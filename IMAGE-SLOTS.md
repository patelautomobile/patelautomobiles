# Patel Automobiles — Folder-Based Image Slot System

Welcome to the **Patel Automobiles** folder-based image slot architecture.

With this system, **you do NOT need to rename your uploaded photos to match any strict filenames** (such as `front-3-4.webp` or `side.webp`).

Instead, **every slot is an isolated folder**. You can drop your photo directly into that folder with **ANY filename** (e.g. `IMG_20260918_153201.jpg`, `my-scooter-side.png`, `WhatsApp_Image_2026.jpeg`). The website will automatically discover and display it at build time.

---

## 📁 Root Directory for Image Slots

All image slot folders are located inside:
```
src/assets/site-images/
├── scooters/
│   ├── zelio/
│   │   ├── eeva/
│   │   │   ├── front-3-4/
│   │   │   ├── side/
│   │   │   ├── rear-3-4/
│   │   │   └── rear/
│   │   └── ... (17 Zelio models)
│   ├── warivo/
│   │   └── ... (7 Warivo models)
│   └── dynamo/
│       └── ... (15 Dynamo models)
└── photos/
    ├── home/
    │   ├── hero-fallback/
    │   ├── home-scooter-01/
    │   ├── home-scooter-02/
    │   ├── home-showroom/
    │   └── home-feature/
    ├── brands/
    │   ├── zelio/
    │   ├── warivo/
    │   └── dynamo/
    ├── about/
    │   ├── founder-pradeep-patel/
    │   ├── showroom/
    │   ├── dealership/
    │   └── team/
    ├── stories/
    │   ├── story-01/
    │   ├── story-02/
    │   ├── story-03/
    │   ├── story-04/
    │   └── story-05/
    └── contact/
        └── showroom-contact/
```

---

## ⚡ Supported Image Formats

You can upload images in any of the following standard formats:
* `.webp`
* `.jpg` / `.jpeg`
* `.png`
* `.avif`
*(Both lowercase and uppercase extensions are supported, e.g. `.JPG`, `.PNG`)*

---

## 🛵 Scooter Image Slots (39 Models × 4 Angles = 156 Folders)

Each scooter model has 4 dedicated angle slot folders:

| Slot Folder | Angle / View | What to Upload |
| :--- | :--- | :--- |
| `front-3-4/` | Front 3/4 Perspective | Primary front angled showcase photo |
| `side/` | Side Profile View | Full horizontal profile of the scooter |
| `rear-3-4/` | Rear 3/4 Perspective | Angled view showing rear design & tail lights |
| `rear/` | Rear View | Direct rear view |

### Example Usage for a Scooter:
To add photos for the **Zelio Eeva Eco**:
1. Open folder: `src/assets/site-images/scooters/zelio/eeva-eco/front-3-4/`
2. Drop your photo file there: e.g. `camera_shot_front.jpg`
3. Open folder: `src/assets/site-images/scooters/zelio/eeva-eco/side/`
4. Drop your side photo: e.g. `IMG_8821.png`

The website will immediately display `camera_shot_front.jpg` as the main card photo and in the interactive 4-angle gallery.

---

## 📸 Site-Wide Photos (18 Folders)

| Category | Slot Folder | Website Placement |
| :--- | :--- | :--- |
| `home` | `photos/home/hero-fallback/` | Fallback cover background for Hero section |
| `home` | `photos/home/home-scooter-01/` | Home showcase banner (Power • Style • Performance) |
| `home` | `photos/home/home-scooter-02/` | Home showcase banner (Simple • Stylish • Smart) |
| `home` | `photos/home/home-showroom/` | Main showroom showcase photo |
| `home` | `photos/home/home-feature/` | Test ride billboard background banner |
| `brands` | `photos/brands/zelio/` | Zelio brand card visual |
| `brands` | `photos/brands/warivo/` | Warivo brand card visual |
| `brands` | `photos/brands/dynamo/` | Dynamo brand card visual |
| `about` | `photos/about/founder-pradeep-patel/` | Founder Pradeep Patel portrait card |
| `about` | `photos/about/showroom/` | About Us showroom facility photo |
| `about` | `photos/about/dealership/` | Authorized multi-brand dealership photo |
| `about` | `photos/about/team/` | Technical & service team photo |
| `stories` | `photos/stories/story-01/` | Customer delivery ceremony photo / video card |
| `stories` | `photos/stories/story-02/` | Range test ride photo / video card |
| `stories` | `photos/stories/story-03/` | Customer delivery photo 3 |
| `stories` | `photos/stories/story-04/` | Customer delivery photo 4 |
| `stories` | `photos/stories/story-05/` | Customer delivery photo 5 |
| `contact` | `photos/contact/showroom-contact/` | Contact page hero backdrop & showroom card |

---

## 🛡️ Empty Folder Behavior

If any slot folder is empty (no image dropped yet), the website **does not crash or display broken icons**. Instead, it renders an authentic, luxury **black & red Patel Automobiles branded placeholder** (`RedImagePlaceholder`) indicating that the slot is ready for your photo.

---

## 🎬 Hero Scroll Cinematic Frames Exception

The 200 sequential scroll frames for the hero section remain in:
```
public/hero-scroll/frame_0001.png ... frame_0200.png
```
These sequential animation frames are preserved exactly as designed and are not arbitrary single-slot folders.
