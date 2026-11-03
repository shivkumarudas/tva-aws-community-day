# ⌛ CHRONOVERSE — AWS Student Community Day Pune

> **"Every Timeline Builds The Cloud."**  
> An immersive, cinematic, TVA-themed interactive web platform for AWS Student Community Day — Pune.

---

## ⚡ Overview

**CHRONOVERSE** merges the retro-futuristic aesthetic of Marvel's Time Variance Authority (TVA) with the power of modern cloud engineering. At its core stands the **Timekeeper Character Animation Engine**—bringing a static transparent PNG to life as a living architect of the multiverse with fluid breathing, biological blinking, secondary fabric/hair physics, pulsating golden palm energy, and organic Catmull-Rom timeline ribbons that react to cursor proximity.

---

## 🚀 Key Features

### 1. Central Timekeeper Animation
- **Subtle Idle Floating**: Harmonic damped vertical translation (`translateY(-5px)` to `+5px`) and micro-scale oscillation.
- **Organic Breathing Illusion**: Independent feathered chest and lapel layer breathing on a 4.4s cycle without facial distortion.
- **Natural Irregular Blinking**: Eyelids drop and reopen at randomized intervals (2.6s to 6.2s) with occasional realistic double-blinks.
- **Secondary Breeze & Fabric Movement**: Subtle rotational sway on wind-blown hair locks and lower jacket coat flaps.
- **Pulsating Golden Palm Energy**: Dual-palm concentrated white-gold cores, warm amber ambient halos, and micro-particles escaping along finger vectors without occluding fingers.
- **Living Multiverse Timelines**: Emerald green and gold Catmull-Rom spline ribbons branching outward from both palms to screen boundaries with traveling sparks and magnetic mouse attraction.
- **Chrono Mode State Switcher**: Interactive HUD allowing instant switching between **`IDLE`**, **`POWER`**, **`TIMELINES`**, and **`SURGE`**, plus smooth **`AUTO CYCLE`**.
- **Temporal Astrolabe Dial**: Giant rotating Roman numeral clock dial (`XII`, `I`, `II`...) centered behind the Timekeeper.
- **Holographic Clock Wordmark**: Custom `CHRON(O)VERSE` typography with an animated clock target reticle inside the letter "O".

### 2. Streamlined Cinematic Intro
- **Scene 1 (Void)**: Multiverse timeline fracture and cosmic dust.
- **Scene 2 (Loki Timelines)**: The Timekeeper commanding the threads of time.
- **Scene 3 (TVA Timedoor Portal)**: Relativistic quantum accretion vortex and hyperspace starfield warp breaching directly into the main site.
- **Skip & Navigation Controls**: Instant "ENTER CHRONOVERSE" skip button and interactive scene jump pills.

### 3. Interactive Conference Experience
- **Miss Minutes AI Mascot**: Fully voiced interactive CRT widget with audio synthesizers and contextual section dialogues.
- **Variant Pass Generator**: Interactive registration module generating customizable TVA agent badges with canvas confetti and photo upload.
- **TVA Terminal Dashboard**: Real-time telemetry, Sacred Timeline variance meters, and event statistics.
- **Full Schedule & Speakers**: Comprehensive agenda tracks, workshops, sponsor showcases, and FAQs.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Bundler**: Vite 5
- **Styling**: Tailwind CSS + Custom TVA Typography (Bebas Neue, Cinzel, JetBrains Mono, Inter)
- **Animation**: Framer Motion + GSAP + HTML5 Canvas
- **3D Graphics**: Three.js + WebGL
- **Audio**: Web Audio API Procedural Synthesizer (Zero asset dependencies, zero lag)
- **Smooth Scrolling**: Lenis

---

## 💻 Local Development

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **pnpm**

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/your-username/chronoverse-tva.git
cd chronoverse-tva

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

To skip the intro sequence directly during development:
[http://localhost:3000/?skipIntro=true](http://localhost:3000/?skipIntro=true)

---

## 📦 Production Build & Testing

```bash
# Type check and build production bundle
npm run build

# Preview production build locally
npm run preview
```

The compiled output is generated into the `dist/` directory.

---

## 🌐 Deployment

### Deploy to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
1. Push your repository to GitHub.
2. Import the project into Vercel.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.

### Deploy to Netlify
1. Connect repository on Netlify.
2. Build command: `npm run build`.
3. Publish directory: `dist`.

### Deploy to GitHub Pages
Add the following workflow to `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - id: deployment
        uses: actions/deploy-pages@v4
```

---

## 📜 License

Created for **AWS Student Community Day — Pune**. Built with temporal fidelity. For all time. Always.
