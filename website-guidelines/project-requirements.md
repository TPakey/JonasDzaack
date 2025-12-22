# Jonas Dzaack — Portfolio Project Requirements (v1)

## 1) Project Overview
Build a premium, fast, responsive portfolio website for job/internship applications.
Audience: recruiters + founders.
Goal: make Jonas stand out visually (wow effects) while staying credible and clean.

Must-have CTAs:
- Email me (mailto: j.dzaack@gmx.de)
- View CV (placeholder for now)

Must-have links:
- LinkedIn: https://www.linkedin.com/in/jonas-dzaack-9252a032a/
- GitHub: https://github.com/TPakey

Hosting:
- Free deployment via GitHub (GitHub Pages or similar). No recurring cost.

## 2) Tech Stack (recommended)
- Vite + React + TypeScript
- TailwindCSS
- Lenis for smooth scrolling
- Motion: Framer Motion (micro) + GSAP/ScrollTrigger (only if needed for horizontal section)
- Optional (Hero effect):
  - Canvas 2D first (mask/brush + fade)
  - If needed later: Three.js shader upgrade

Rationale: fast dev + easy GitHub deploy + strong animation ecosystem.

## 3) IA / Pages
Default v1: One-page site with anchored sections.
Nav anchors:
- #projects
- #about
- #contact

Optional later: project detail pages (not required for v1).

## 4) Section Order (locked)
1. Nav
2. Hero
3. Proof/Results Strip (text-based, no logos required)
4. Projects (horizontal scroll section)
5. About
6. Contact
7. Footer

## 5) Content Requirements (v1 copy)
### Hero
Headline (locked):
I build digital products with creators.

Subline (locked):
Studying CS & Business at the University of Hamburg. Building digital products for creators.

CTAs (locked labels):
- Email me
- View CV (placeholder)

### Projects (order locked)
Cards show: Project name + Role + Outcome metric (no bullets).

1) Maureen — Funnel + sales strategy support  
Outcome: $15k revenue in 21 days (do not link source)

2) Ryan Walker — Skool funnel + engagement optimization  
Outcome: +$7k MRR uplift → $11k total by end of Q1 2025  
Extra: Spirituality category Q1 2025, King’s Chat (free) / King’s Hall (paid)

3) SkoolReportingDashboard — product + sales/community ops  
Outcome: peaked ~$12k/mo, currently ~$7k/mo

4) Kyle Kane — sales team lead/closer, ran client calls  
Outcome: ~$10k MRR after 2 months (May 2025)
Note: Kyle worked with Katy Perry & Samsung (allowed)

5) Red5 Performance (Coach Red / Ian Harding) — community build & engagement  
Outcome: (no hard number required; focus on build/ops impact)

6) Eddie Hall communities acquisition + revival  
Outcome: revived engagement (qualitative, no numeric claim unless later proven)

### About
Short, credible:
- Studying Wirtschaftsinformatik @ University of Hamburg
- Built and sold / shipped digital products with creators
- Not positioning as “just a programmer”

### Contact
- Email: j.dzaack@gmx.de
- LinkedIn + GitHub
- Optional: “Open to Hamburg / Remote EU/US” (do NOT add badge in hero for v1; can live in About/Contact text)

## 6) Design System
Source of truth:
- `website-guidelines/style-guide.md` (must be followed)
Assets:
- Logo SVG/PNG (JD monogram)
- favicon.zip
- Sky hero background (provided)
Placeholders:
- CV PDF placeholder
- Proof visuals placeholder
- Hero portrait placeholder (not used in v1)

## 7) Motion & Interactions (locked)
- Loader: 0.3–0.6s “JD” quick reveal
- Lenis smooth scroll
- Projects: horizontal scroll section (wheel/trackpad scroll drives sideways)
- Cards: subtle tilt, glow
- Hero: Cloud Brush / Dissipate interaction on sky background
- Mobile: keep effects, but degrade heavy ones if performance drops

## 8) Performance & Quality Gates
- Lighthouse targets (rough):
  - Performance 90+
  - Accessibility 90+
- 60fps goal on modern devices
- Prefer-reduced-motion support
- No layout shift on load (avoid CLS)

## 9) Repo + Structure (required)
Suggested structure:
- `/website-guidelines/` (docs)
- `/src/sections/` (Hero, Projects, About, Contact)
- `/src/components/` (Nav, Buttons, Card)
- `/src/lib/` (lenis, motion helpers)
- `/public/assets/` (logo, noise, sky)

Deployment:
- GitHub Pages (build + deploy via Actions)