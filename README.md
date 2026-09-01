# LIBRA TECHLAB — Premium Digital Development Studio

A high-end creative agency portfolio and digital studio web application for **LIBRA TECHLAB**, built with React, TypeScript, Three.js, GSAP ScrollTrigger, and Lenis smooth scrolling.

---

## 🌟 Visual & Aesthetic Architecture

- **Color System**: Warm Ivory / Cream background (`#F4F1EA`), Deep Olive / Sage Green (`#4E5E43`), Light Khaki (`#DFE5DB`), and Muted Gold accents (`#B89343`).
- **Typography**: Google Fonts — `Plus Jakarta Sans` for body, `Syne` for modern headings, and `Caveat` for the authentic founder signature.
- **3D AI Hero Visual**: Procedural 3D Neural AI Brain generated in Three.js featuring dual cerebral hemispheres, synaptic nodes, dynamic axon connection lines, animated action potentials, and a futuristic concentric circular pedestal with glowing rings and mouse parallax.
- **Services Timeline**: Central vertical timeline with progressive scroll drawing and 6 alternating service cards.
- **Process Section**: Flowing curved connected steps (`01 Discover`, `02 Design`, `03 Develop`, `04 Launch`).
- **About & Founder**: 4 animated metric counters and Karthik's Founder card with silhouette portrait and cursive signature.
- **Contact & Neural Globe**: Interactive 3D neural network globe with contact form and toast feedback.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm / yarn / pnpm

### Installation
```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build
```bash
# Typecheck and compile production bundle
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
/
├── index.html                  # HTML5 entry with fonts, SEO meta tags & favicon
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/
│   └── favicon.svg             # Custom LIBRA geometric icon
└── src/
    ├── main.tsx                # React root mount
    ├── App.tsx                 # App layout with Lenis & ScrollSpy
    ├── components/
    │   ├── Navbar.tsx          # Floating pill navigation with elevation on scroll
    │   ├── MobileNav.tsx       # Slide-in mobile drawer
    │   ├── CustomCursor.tsx    # Magnetic smooth cursor
    │   ├── BotanicalDecor.tsx  # Organic botanical leaf accents
    │   ├── ThreeBrainCanvas.tsx # 3D Three.js Neural AI Brain & Platform
    │   ├── NeuralGlobe.tsx     # 3D/Canvas network globe for Contact
    │   ├── StatCounter.tsx     # Animated metric counters
    │   └── Toast.tsx           # Success notification modal
    ├── sections/
    │   ├── HeroSection.tsx     # Hero section with 3D brain & CTAs
    │   ├── ServicesSection.tsx # Central vertical timeline (6 services)
    │   ├── ProcessSection.tsx  # "How We Work" 4-step banner
    │   ├── AboutSection.tsx    # Studio bio, stats & Karthik founder card
    │   ├── ContactSection.tsx  # "Have An Idea? Let's Build It." form
    │   └── FooterSection.tsx   # 4-column footer with links & social badges
    ├── styles/
    │   ├── variables.css       # Design tokens & color palette
    │   ├── typography.css      # Fluid type scales & heading highlights
    │   ├── components.css      # Reusable cards, buttons & form styles
    │   ├── animations.css      # Keyframes, glow & cursor effects
    │   └── index.css           # Global layout & header styling
    └── utils/
        └── smoothScroll.ts     # Lenis & GSAP ScrollTrigger synchronization
```

---

## 💻 Tech Stack

- **React 19**
- **TypeScript**
- **Vite**
- **Three.js**
- **GSAP & ScrollTrigger**
- **Lenis Smooth Scroll**
- **Lucide Icons**
