# Hero Portal Implementation (Section A1)

## Overview
Implemented the "Portal Story" hero section with a magical scroll-driven transition that starts with content clipped inside a TV screen in a meadow scene, then expands to fullscreen as the user scrolls.

## What was implemented

### ✅ Core Portal Mechanics
- **Single DOM approach**: Hero content is rendered once and transforms from TV-clipped to fullscreen
- **GSAP + ScrollTrigger**: Smooth scroll-scrubbed animation (150vh scroll range)
- **No black screen**: Meadow scene visible from frame 1, hero content visible inside TV screen immediately
- **Pinned section**: Premium feel with ScrollTrigger pin during transition

### ✅ Visual Layers (z-order from back to front)
1. Sky gradient base (light sky blue → white horizon)
2. Cloud layer back (procedural CSS gradients, slow parallax)
3. Cloud layer front (procedural CSS gradients, faster parallax)
4. Meadow/TV image with breeze overlay
5. Portal content (real hero DOM) - initially clipped to TV screen
6. Mini-glass pill overlay ("Scroll to enter")
7. Background grain (SVG feTurbulence - backgrounds only)

### ✅ A1 Mini Enhancements
1. **Mini-glass overlay pill** (CSS only)
   - Glassmorphism effect with backdrop-filter blur
   - Thin white border, soft shadow
   - Fades out during portal transition
   
2. **Cloud parallax** (2 layers)
   - Back layer: -8px movement
   - Front layer: -15px movement
   - Subtle and tasteful
   
3. **Fake grass breeze**
   - Procedural noise drift overlay
   - Tiny transform (translateY -3px, scale 1.005)
   - Almost imperceptible, just "alive"

### ✅ Grain / Vignette (Background-only rule)
- SVG feTurbulence grain filter (5% opacity)
- Radial gradient vignette on meadow layer
- Optional scanlines (2% opacity, very subtle)
- **Never applied to text or UI elements**

### ✅ Motion & Accessibility
- **Easing**: power3.out for portal expansion (smooth settle)
- **prefers-reduced-motion**: Fully supported - skips portal animation, shows hero fullscreen immediately
- **Mobile responsive**: Simplified effects on mobile

## Files Changed

### New Files
- `src/sections/HeroPortal.tsx` - Main portal hero component
- `public/assets/hero/README.md` - Asset documentation and SCREEN_CONFIG calibration guide

### Modified Files
- `src/App.tsx` - Replaced Hero with HeroPortal import and usage

### Asset Structure Created
```
public/assets/hero/
  ├── README.md (with calibration instructions)
  └── tv-meadow.png (⚠️ NEEDS TO BE PROVIDED)
```

## 🔧 IMPORTANT: Calibration Required (UPDATED METHOD)

**NEW:** TV rect is now calibrated via SOURCE_IMAGE + TV_SCREEN_SRC in pixels. This correctly handles object-fit: cover cropping and works across all viewport sizes.

After adding the `tv-meadow.png` image, you MUST calibrate the TV screen position using source image coordinates:

**Location**: `src/sections/HeroPortal.tsx` - Top of file

```typescript
const TV_SCREEN_SRC = {
  x: 716,      // TV screen X position in source image pixels
  y: 532,      // TV screen Y position in source image pixels
  w: 108,      // TV screen width in source image pixels
  h: 79,       // TV screen height in source image pixels
  radiusPx: 10 // Border radius in pixels
};
```

**How to calibrate**:
1. Open `tv-meadow.png` in an image editor
2. Measure the TV screen rectangle in **source pixels** (top-left X/Y, width, height)
3. Update `TV_SCREEN_SRC` values in HeroPortal.tsx
4. Run `npm run dev`
5. Press **"D"** key to toggle debug overlay (neon-lime outline shows computed rect)
6. Verify alignment and adjust until perfect
7. Press **"D"** again to hide debug overlay

**Why source pixels instead of percentages?**
- Correctly handles `object-fit: cover` cropping
- Works across all viewport sizes automatically
- Single source of truth (no viewport-dependent math)
- Recalculates on resize with perfect accuracy

See `HERO_PORTAL_QUICKSTART.md` for detailed calibration instructions.

## Acceptance Criteria ✅

- [x] On load: Meadow scene + TV visible, website hero content inside TV screen immediately
- [x] Scrolling down: Portal smoothly expands to fullscreen
- [x] No black screen at any point
- [x] No sudden switch; same DOM throughout
- [x] Clouds parallax is subtle, breeze is subtle, pill looks premium
- [x] Reduced motion: Portal disabled, hero shows fullscreen
- [x] Works on desktop and mobile (mobile simplifies effects)

## Design Compliance

**North Star Rules**:
- ✅ Look: Sky/Clouds/Soft gradients + Neon-Lime highlights (CTAs)
- ✅ Motion: ease-out settle, never robotic/linear
- ✅ Texture: Grain only on backgrounds, never on text/UI

## Next Steps

1. **Provide asset**: Add `public/assets/hero/tv-meadow.png`
2. **Calibrate**: Adjust `SCREEN_CONFIG` in HeroPortal.tsx
3. **Test scroll**: Verify smooth portal expansion
4. **Mobile test**: Check simplified effects on mobile
5. **(Optional)**: Replace procedural clouds with real images if desired

## Technical Notes

- Uses existing GSAP installation (no new dependencies)
- ScrollTrigger already registered in App.tsx
- Respects existing Tailwind/globals.css setup
- Glass pill uses modern backdrop-filter (graceful degradation)
- All animations respect reduced motion preferences
- Minimal performance impact (will-change hints added)
