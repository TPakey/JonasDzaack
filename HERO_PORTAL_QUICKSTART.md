# Hero Portal — Quick Start Guide

## 🎯 What You Need to Do Next

### 1. Add Your Hero Image ✅ DONE
Your image is already here:
```
public/assets/hero/tv-meadow.png
```

### 2. Calibrate the TV Screen Position (NEW METHOD)

**IMPORTANT:** TV rect is now calibrated via SOURCE_IMAGE + TV_SCREEN_SRC in pixels. This correctly handles object-fit: cover cropping and works across all viewport sizes.

Open: `src/sections/HeroPortal.tsx`

Find this config at the top of the file:

```typescript
const TV_SCREEN_SRC = {
  x: 716,      // TV screen X position in source image pixels
  y: 532,      // TV screen Y position in source image pixels
  w: 108,      // TV screen width in source image pixels
  h: 79,       // TV screen height in source image pixels
  radiusPx: 10 // Border radius in pixels for TV screen edges
};
```

**How to calibrate (updated method):**
1. Open `tv-meadow.png` in an image editor (Photoshop, Figma, Preview, etc.)
2. Measure the TV screen rectangle in **source pixels** (not viewport percentages)
   - X, Y = top-left corner position
   - W, H = width and height
3. Update the `TV_SCREEN_SRC` values above
4. Run `npm run dev` and open http://localhost:5173
5. Press **"D"** key to toggle debug overlay
   - You'll see a neon-lime outline showing the computed TV screen position
   - Adjust values until the outline perfectly matches the TV screen
6. Press **"D"** again to hide debug overlay

**What each value means:**
- `x`: Horizontal position of TV screen's top-left corner in source image pixels
- `y`: Vertical position of TV screen's top-left corner in source image pixels
- `w`: Width of TV screen in source image pixels
- `h`: Height of TV screen in source image pixels
- `radiusPx`: Corner rounding to match TV screen shape

**Why this method is better:**
- Works correctly with `object-fit: cover` (no more misalignment when image is cropped)
- Single source of truth (source image coordinates)
- Automatically scales correctly on any viewport size
- Recalculates on window resize

### 3. Test the Scroll Animation

1. Page loads → You should see meadow scene with hero content visible inside TV screen
2. Scroll down slowly → Content should smoothly expand from TV to fullscreen
3. Continue scrolling → Normal website scrolling resumes

**What to check:**
- ✅ No black screen at any point
- ✅ Smooth transition (not jumpy)
- ✅ Clouds move subtly during scroll
- ✅ Glass pill fades out as you enter
- ✅ Hero content is always readable

### 4. Test Reduced Motion

In your browser:
- **macOS**: System Preferences → Accessibility → Display → Reduce motion
- **Windows**: Settings → Ease of Access → Display → Show animations
- **Browser DevTools**: Can also simulate in Chrome/Firefox DevTools

With reduced motion enabled:
- Portal animation should be skipped
- Hero appears fullscreen immediately
- Still uses sky gradient background

### 5. Test Mobile

Open on mobile device or use browser DevTools:
- Effects should be simplified
- Scroll should still work smoothly
- Glass pill should be smaller
- No performance issues

## 📁 Files Changed

**New Files:**
- `src/sections/HeroPortal.tsx` — Main portal component
- `public/assets/hero/README.md` — Full asset documentation
- `public/assets/hero/tv-meadow.svg` — Placeholder (replace with PNG)
- `HERO_PORTAL_IMPLEMENTATION.md` — Complete implementation docs
- `COMMIT_MESSAGE.txt` — Ready-to-use git commit message

**Modified Files:**
- `src/App.tsx` — Now uses HeroPortal instead of Hero
- `website-guidelines/tasks.md` — Phase 4 marked complete

## 🚀 Current Status

**✅ Fully Functional:**
- Portal animation works with placeholder SVG
- All visual effects implemented
- Reduced motion support
- Mobile responsive
- No TypeScript errors
- Dev server running successfully

**⚠️ Action Required:**
- Add your `tv-meadow.png` image
- Calibrate `SCREEN_CONFIG` to match your image
- Test on multiple screen sizes

## 🔧 Troubleshooting

**Hero content doesn't fit in TV screen:**
→ Press "D" key to toggle debug overlay and see computed TV screen rect
→ Open tv-meadow.png in image editor and measure TV screen in source pixels
→ Adjust `TV_SCREEN_SRC` values in HeroPortal.tsx (use source pixel coordinates, not percentages)

**Animation is too fast/slow:**
→ Change `end: '+=150vh'` in ScrollTrigger config (around line 120)

**Portal feels jerky:**
→ Check browser performance, may need to reduce parallax ranges

**TV image not showing:**
→ Ensure file path is correct: `/public/assets/hero/tv-meadow.png`
→ Check browser console for 404 errors

**Glass pill not blurred:**
→ Browser may not support backdrop-filter (graceful degradation)

**Debug overlay not showing when pressing "D":**
→ Make sure the page has focus (click on it first)
→ Check browser console for JavaScript errors

## 📞 Need Help?

See full documentation:
- `HERO_PORTAL_IMPLEMENTATION.md` — Complete technical docs
- `public/assets/hero/README.md` — Asset calibration guide

## 🎨 Design Notes

**North Star Rules (followed):**
- ✅ Look: Sky/Clouds/Soft gradients + Neon-Lime highlights
- ✅ Motion: ease-out settle, never robotic/linear  
- ✅ Texture: Grain only on backgrounds, never on text/UI

**What Makes This Special:**
- Single DOM approach (no bait-and-switch)
- Smooth scroll-driven magic
- Subtle, tasteful effects
- Premium feel
- Accessibility first
- Performance optimized
