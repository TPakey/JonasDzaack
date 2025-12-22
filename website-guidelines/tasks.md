# Build Tasks — Jonas Dzaack Portfolio (v1)

## Phase 0 — Repo Setup
- [ ] Create repo (or use existing)
- [ ] Add folders:
  - [ ] /website-guidelines (place docs here)
  - [ ] /public/assets (logo, favicon, sky, noise placeholder)
- [ ] Add assets:
  - [ ] JD logo SVG/PNG
  - [ ] favicon.zip (extract to /public)
  - [ ] hero sky background

## Phase 1 — Project Setup (Vite + Tailwind + basics)
- [ ] Initialize Vite React TS
- [ ] Install TailwindCSS + configure
- [ ] Add base layout + global styles
- [ ] Add CSS variables/tokens from Style Guide
- [ ] Add responsive container + section spacing utilities

## Phase 2 — Navigation + Anchors
- [ ] Build top nav with links: Projects / About / Contact
- [ ] Add smooth anchor scrolling (Lenis-compatible)
- [ ] Keep nav minimal (no Proof tab, no clutter)

## Phase 3 — Loader (0.3–0.6s)
- [ ] Implement quick “JD” logo reveal
- [ ] Ensure it does not repeat aggressively (optional: only first load)
- [ ] Respect prefers-reduced-motion

## Phase 4 — Hero Section (Sky + Cloud Brush Dissipate)
- [ ] Render sky background (image + gradient wash)
- [ ] Add subtle noise overlay (Hero only)
- [ ] Add headline + subline + 2 CTAs
- [ ] Implement Cloud Brush interaction:
  - [ ] Canvas overlay captures cursor/touch
  - [ ] Brush strokes appear as soft white cloud “paint”
  - [ ] Strokes dissipate/fade over time
  - [ ] Keep 60fps; degrade effect on low power

## Phase 5 — Proof / Results Strip (text-only)
- [ ] Add compact strip with 3–5 proof highlights (no logos required)
  Examples:
  - [ ] +$7k MRR uplift → $11k total (Q1 2025)
  - [ ] $15k revenue in 21 days
  - [ ] SkoolReportingDashboard peaked ~$12k/mo (now ~$7k/mo)
- [ ] Use “contributed to / helped achieve” wording

## Phase 6 — Projects Section (Horizontal Scroll)
- [ ] Implement Option 1 layout:
  - [ ] Vertical scroll
  - [ ] Projects section scrolls horizontally via wheel/trackpad
  - [ ] After Projects, vertical resumes
- [ ] Create project cards with:
  - [ ] Title
  - [ ] Role
  - [ ] Outcome metric
  - [ ] “View case study” disabled/placeholder (optional)
- [ ] Add subtle tilt on hover + glow

Project order (locked):
1) Maureen
2) Ryan Walker
3) SkoolReportingDashboard
4) Kyle Kane
5) Red5 Performance
6) Eddie Hall Communities

## Phase 7 — About
- [ ] Add short About copy (Uni Hamburg + positioning)
- [ ] Keep it crisp, not “frontend dev” positioning

## Phase 8 — Contact
- [ ] Add contact module:
  - [ ] Email button (mailto)
  - [ ] LinkedIn link
  - [ ] GitHub link
- [ ] Add small note: “Hamburg / Remote EU/US” (not as hero badge)

## Phase 9 — Footer
- [ ] Minimal footer + small credits

## Phase 10 — Polish Pass
- [ ] Typography scaling
- [ ] Spacing + alignment consistency
- [ ] Mobile behavior review (effects kept, but performant)
- [ ] Accessibility: focus states, contrast, keyboard nav
- [ ] prefers-reduced-motion fallback

## Phase 11 — Deploy (Free)
- [ ] GitHub Actions build + deploy to GitHub Pages
- [ ] Verify favicon + OG image placeholder
- [ ] Final pass on performance (Lighthouse)

## Phase 12 — Later (not now)
- [ ] CV PDF
- [ ] Proof visuals (screenshots)
- [ ] Project detail pages
- [ ] Hero portrait upgrade (optional)