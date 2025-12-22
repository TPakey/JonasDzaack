# Jonas Dzaack — Portfolio

Premium portfolio website for job/internship applications. Built with modern, performant technologies.

## 🎯 Overview

One-page portfolio showcasing digital products built with creators. Features:
- Sky-blue aesthetic with neon-lime accents
- Subtle noise overlay for texture
- Smooth scrolling and micro-interactions
- Full accessibility support (keyboard navigation, reduced-motion)
- SEO-optimized with Open Graph tags
- Mobile-responsive design

## 🛠 Tech Stack

- **Framework:** Vite + React + TypeScript
- **Styling:** TailwindCSS v4 + Custom CSS
- **Font:** Inter (Google Fonts)
- **Build:** Vite
- **Deployment:** GitHub Pages (planned)

## 📦 Project Structure

```
/
├── public/
│   ├── brand/          # Brand assets (logo, etc.)
│   ├── favicon/        # Favicon assets
│   └── favicon.svg     # Site favicon
├── src/
│   ├── components/     # Reusable components (Navigation, etc.)
│   ├── sections/       # Page sections (Hero, Projects, About, Contact, Footer)
│   ├── styles/         # Global styles and CSS
│   ├── lib/            # Utilities and helpers
│   ├── App.tsx         # Main app component
│   └── main.tsx        # App entry point
├── index.html          # HTML template with SEO tags
└── package.json        # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start dev server (http://localhost:5173)
npm run dev
```

The dev server supports:
- Hot module replacement (HMR)
- Fast refresh for React components
- TypeScript type checking

### Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

Build output goes to `/dist` folder.

### Linting

```bash
# Run ESLint
npm run lint
```

## 🎨 Design System

### Colors
- **Background:** Light sky-blue palette (#F7FBFF → #7CCBFF)
- **Text:** Dark blue-gray (#0A1020 → #64748B)
- **Accent:** Neon lime (#D5FF4F)

### Typography
- **Font:** Inter (400, 500, 600, 700)
- **H1:** 36px mobile / 64px desktop
- **H2:** 28px mobile / 36px desktop
- **Body:** 17px

### Effects
- Subtle noise overlay (8% opacity)
- Radial gradient sky background
- Smooth scrolling
- Card hover effects (lift + glow)

## ♿️ Accessibility

- Keyboard navigation support
- Focus states on all interactive elements
- `prefers-reduced-motion` support (disables animations)
- Semantic HTML structure
- ARIA labels where needed

## 📱 Responsive Design

Optimized breakpoints:
- Mobile: < 768px
- Desktop: ≥ 768px

All effects are mobile-friendly and performant.

## 🚢 Deployment

### GitHub Pages (Recommended)

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy `/dist` folder to GitHub Pages

3. Configure custom domain (optional)

### Manual Deployment

Upload `/dist` folder contents to any static hosting provider:
- Netlify
- Vercel
- Cloudflare Pages
- AWS S3 + CloudFront

## 📝 Content Management

### Project Data
Edit project cards in [`src/sections/Projects.tsx`](src/sections/Projects.tsx)

### Contact Links
Update links in [`src/sections/Contact.tsx`](src/sections/Contact.tsx)

### SEO Meta Tags
Edit tags in [`index.html`](index.html)

## 🎯 Performance

Build targets:
- Lighthouse Performance: 90+
- Lighthouse Accessibility: 90+
- 60fps animations on modern devices
- No cumulative layout shift (CLS)

## 📄 License

© 2025 Jonas Dzaack. All rights reserved.

## 📧 Contact

- **Email:** j.dzaack@gmx.de
- **LinkedIn:** [jonas-dzaack](https://www.linkedin.com/in/jonas-dzaack-9252a032a/)
- **GitHub:** [TPakey](https://github.com/TPakey)

---

Built with ❤️ using Vite, React, and TailwindCSS
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
