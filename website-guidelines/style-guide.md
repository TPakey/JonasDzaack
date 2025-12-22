# Jonas Dzaack — Portfolio Style Guide (v1)

## Purpose
Premium “Hire Me” portfolio for jobs/internships (Working Student / Internship). Audience: recruiters + founders.
Tone: confident, modern, crisp. No agency/freelance vibes. No pricing.

## Brand
Name: Jonas Dzaack
Logo: JD Monogram (use provided SVG/PNG)
Favicon: provided favicon.zip

Headline (locked):
“I build digital products with creators.”

Hero subline (locked):
“Studying CS & Business at the University of Hamburg. Building digital products for creators.”

Primary CTAs (locked labels):
- Email me (mailto: j.dzaack@gmx.de)
- View CV (placeholder file for now)

## Visual Direction
Overall look: bright, sky/cloud aesthetic. Clean, modern, “premium product” feel.
Key ingredients:
- Sky-blue/white base
- Neon-lime accent sparingly
- Emitted gradients (soft glows)
- Subtle gray noise overlay (apply primarily to Hero; can expand later)
- Minimal glass usage (avoid “too glassy”/distracting)
- Wow-motion: smooth scrolling (Lenis), horizontal projects section, micro-interactions

## Color System (tokens)
Background:
- `--bg-0`: #F7FBFF (near-white sky)
- `--bg-1`: #DFF1FF (soft sky tint)
- `--bg-2`: #7CCBFF (sky blue)

Text:
- `--text-0`: #0A1020 (primary)
- `--text-1`: #334155 (secondary)
- `--text-2`: #64748B (muted)

Accent:
- `--accent`: #D5FF4F (neon lime)
- `--accent-ink`: #0A1020 (text on accent)
- `--outline`: rgba(10,16,32,0.12)

Gradients (examples)
- Hero wash: radial from `--bg-2` → `--bg-1` → `--bg-0`
- Accent glow: `--accent` at low opacity, blurred

Noise
- Noise overlay: gray/neutral grain at ~6–12% opacity.
- Start: Hero only (global optional later).

## Typography
Vibe: modern clean tech.
- Primary: Inter (or system-ui fallback)
- Optional secondary (later): none for now (keep clean)
Type scale:
- H1: 56–72 desktop / 36–44 mobile
- H2: 32–40 desktop / 26–32 mobile
- Body: 16–18
- Small: 13–14

Rules:
- Short lines, strong whitespace.
- No “marketing fluff”. Results and clarity win.

## Layout & Spacing
Grid:
- Max width: 1100–1200px content
- Gutters: 24–32px desktop, 16–20px mobile
- Section padding: 96–120px desktop, 64–80px mobile

Corners:
- Cards: 20–28px radius (2xl feel)
- Buttons: pill/rounded-full

Shadows:
- Soft, subtle. Avoid heavy dark shadows on light UI.

## Motion (locked)
Loader:
- 0.3–0.6s total (fast)
- “JD” logo-based quick reveal (no long preloader)

Scroll:
- Lenis ultra-smooth
- Vertical page with one horizontal Projects section (Option 1)
- Mobile keeps effects (but degrade heavy effects if FPS drops)

Micro-interactions:
- Project cards: tilt (subtle), glow on hover, cursor parallax (light)
- Buttons: magnetic hover optional (subtle), clean focus states

Hero Interaction Mode A (locked):
“Cloud Brush / Dissipate”
- User “paints” soft cloud strokes with cursor/touch
- Strokes fade away like smoke
- No portrait required for v1 (sky-only hero)

Performance rule:
- Always prefer 60fps over “more effects”.
- Use progressive enhancement: disable heavy shaders on low-power devices.

## Components (style)
Nav:
- Minimal top nav: “Projects / About / Contact”
- Right side: 2 CTAs not in nav (or in hero only; keep nav clean)

Buttons:
- Primary: accent (`--accent`) with subtle glow
- Secondary: outline with minimal fill

Cards:
- Clean surfaces with faint border `--outline`
- No heavy glass by default

## Copy Rules
- Results phrasing: “Results I contributed to” / “Helped achieve” (safe until proof assets are added)
- No invented logos, no fake testimonials
- Projects: show outcome + role (no bullet overload)

## Accessibility
- Contrast AA minimum
- Keyboard focus visible
- Reduce motion support (prefers-reduced-motion)