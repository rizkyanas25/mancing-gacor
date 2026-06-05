# MANCING GACOR

<div align="center">

![Expo](https://img.shields.io/badge/Expo-56-black?style=for-the-badge&logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.85-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript)
![NativeWind](https://img.shields.io/badge/NativeWind-4-38B2AC?style=for-the-badge&logo=tailwind-css)

**A premium mobile fishing logbook and spot finder centered in Tulungagung**

[Live Demo](#) • [Features](#-features) • [Tech Stack](#%EF%B8%8F-tech-stack) • [Contact](#-contact)

</div>

---

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Start development server (Expo / Metro)
npm run start

# Run on iOS Simulator (Requires Xcode)
npm run ios

# Run on Android Emulator (Requires Android Studio)
npm run android
```

---

## 🎨 Features

- **Interactive Fishing Map** — Fully integrated Google Maps centered in Kauman, Tulungagung with custom Gacor/Quiet markers, current GPS location tracking, and standard/satellite view layers toggle.
- **Dynamic Filter Bottom Sheet** — Multi-criteria filter sheet (Water type, Gacor status, Free entry, and Family friendliness) that dynamically updates the matching spots count in real-time.
- **Pemancing Logbook Feed** — A visually rich feed timeline showcasing other pemancing's catches, including fish weight, spot location links, bait recommendations, and micro-animations.
- **Detailed Spot Overview** — Slides up a Gacor Meter indicator with dinamyc thermal colors (Mega Gacor, Active, Quiet), horizontal catch carousels, bait tags, bookmark status, and direct GPS zooming.
- **Tactical Navigation Layout** — Clean 3-tab custom menu bar (Peta, Tambah, Feed) with a raised center action button, hiding the tab bar automatically on detail forms and profile pages.
- **Secure Secrets Management** — Complete security with zero hardcoded API keys; all Google Maps API keys are dynamically loaded from local `.env.local` files using `app.config.js`.

---

## 📸 Screens

| Screen | Description |
| --- | --- |
| **Peta Utama** | Main map dashboard containing floating header search, quick filter pills, layers, GPS fab, custom markers, and bottom sheets. |
| **Logbook Feed** | Timeline of catches shared by the local Tulungagung pemancing community. |
| **Profil Pemancing** | Personal stats (trips, total catches, heavy record), Level Pemancing progress bar, and personal catch logs. |
| **Catat Tangkapan** | Field-note style form to record a new catch with photo upload, weight, fish type, and bait inputs. |
| **Tambah Spot Baru** | Form to register a new fishing spot with custom GPS coordinates, water types, and spot options. |

---

## 🛠️ Tech Stack

| Category | Technologies |
| --- | --- |
| **Framework** | Expo SDK 56 (Expo Router, Metro) |
| **UI Library** | React Native 0.85 (React 19) |
| **Language** | TypeScript |
| **Styling** | NativeWind v4 (Tailwind CSS 3) |
| **Map & GPS** | `react-native-maps` & `expo-location` |
| **Bottom Sheets** | `@gorhom/bottom-sheet` (Reanimated) |
| **Icons** | Lucide React Native |

---

## 📁 Project Structure

```
src/
├── app/                 # Expo Router navigation routes
│   ├── _layout.tsx      # Root tab navigator & post overlay menu
│   ├── index.tsx        # Map Dashboard main screen
│   ├── community.tsx    # Logbook Feed timeline screen
│   ├── post.tsx         # Catat Tangkapan Baru form screen
│   ├── add-spot.tsx     # Tambah Spot Baru form screen
│   └── profile.tsx      # Profil Pemancing screen
├── components/          # Reusable components
│   ├── custom-markers.tsx   # Custom Gacor & Quiet map markers
│   ├── custom-tab-bar.tsx   # 3-tab custom navigation bar
│   ├── spot-detail-sheet.tsx # Spot detail bottom sheet
│   ├── filter-bottom-sheet.tsx # Advanced filter criteria sheet
│   ├── floating-header.tsx   # Search and quick filter header overlay
│   └── page-header.tsx      # Consistent header with ArrowLeft back action
├── constants/
│   └── spots-data.ts    # Custom mock spot data centered in Tulungagung
└── hooks/               # Custom react hooks
```

---

## 🎯 Design System (Wildshore Tactical)

### Colors

- **Primary (Deep Green)**: `#012d1d` (dense forest and deep water)
- **Secondary (Warm Sand)**: `#75593a` (community highlights, esen & soil)
- **Neutral (Charcoal & Off-White)**: `#161c22` / `#f7f9ff` (high-contrast grays)

### Typography

- **Font Family**: Inter (high legibility under direct sunlight glare)
- **Size Scale**: Slightly oversized for one-handed mobile outdoor usage

### Layout Principles

- **Ruggedly Rounded**: Buttons use `rounded` (8px), cards `rounded-lg` (16px), and sheets `rounded-t-[32px]` for architectural structure.
- **Field Note Input Fields**: 1px solid outlines in `#717973` with a light warm sand fill (`bg-secondary-fixed/10`) to feel like a physical logbook.

---

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm run start` | Start development server |
| `npm run start -c` | Start development server and clear cache |
| `npm run ios` | Run project on iOS simulator |
| `npm run android` | Run project on Android emulator |
| `npx tsc --noEmit` | Validate TypeScript types |
| `npm run lint` | Run ESLint checks |

---

## 📧 Contact

**Rizky Anas Bukhori**

- 📧 Email: [rizkyanas25@gmail.com](mailto:rizkyanas25@gmail.com)
- 💼 LinkedIn: [Rizky Anas Bukhori](https://www.linkedin.com/in/rizky-anas-bukhori-9a692218b/)
- 📍 Location: Tulungagung, Indonesia

---

## 📝 License

© 2026 Rizky Anas Bukhori. All rights reserved.

---

<div align="center">

_"Mancing di mana? Mancing Gacor!"_

**Visual Interface Optimized for Outdoor Fishing Environments**

</div>
