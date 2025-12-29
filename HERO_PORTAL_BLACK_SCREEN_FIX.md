# Hero Portal Fix — Black Screen & Timeline Issues Resolved

## ✅ All Issues Fixed

Fixed the HeroPortal implementation to eliminate black screens, prevent portal collapse, fix early fade-out, and remove timeline recursion bugs.

---

## 🐛 Issues That Were Fixed

### 1. Black Screen in Firefox ✅ FIXED
**Problem:** Firefox rendered black backgrounds because `filter: url(#grainFilter)` on the sky gradient is unreliable cross-browser.

**Solution:**
- Removed CSS `filter: url(#grainFilter)` entirely
- Implemented grain as a separate background-only overlay layer using SVG data URL
- Grain sits BETWEEN background layers and UI/text (z-index 5, below portal content z-index 10)
- Uses `mix-blend-mode: soft-light` at 5% opacity
- Never dirties text or UI elements

### 2. Meadow Fades Too Early ✅ FIXED
**Problem:** Meadow/TV was fading at timeline position 0.3, exposing black backgrounds when layers glitched.

**Solution:**
- Meadow/TV now stays visible until **80% progress** (position 0.8)
- Fades out over 0.8-1.0 range with `power2.out` easing
- Glass pill also fades later (60-90% range instead of 20%)
- Sky gradient always visible as section background (no black fallback)

### 3. Timeline Rebuild Recursion ✅ FIXED
**Problem:** `onRefresh: () => buildTimeline()` inside ScrollTrigger caused recursion/glitches and multiple ScrollTrigger instances.

**Solution:**
- Removed `onRefresh` callback entirely
- Set `invalidateOnRefresh: false` to prevent recursion
- Implemented **debounced resize handler** (200ms delay)
- Resize handler cleanly kills old timeline/ScrollTrigger before rebuilding
- Ensures only one ScrollTrigger instance active at a time
- Safe, clean rebuild without recursion

### 4. Black Background Showing Through ✅ FIXED
**Problem:** Default black backgrounds could show through gaps in layers.

**Solution:**
- Section element now has sky gradient as inline `background` (not separate layer)
- Portal content wrapper has subtle sky gradient background
- When meadow fades, we still see sky gradient, never black
- All layers use explicit z-index (no negative values that could go below section)

### 5. Deterministic Z-Index Layering ✅ IMPLEMENTED
**Problem:** Used Tailwind negative z-index classes which aren't predictable.

**Solution:** Explicit z-index constants:
```
- Section background: 0 (sky gradient)
- Clouds back: 1
- Clouds front: 2
- Meadow/TV: 3
- Breeze overlay: 4
- Grain overlay: 5 (below UI)
- Portal content: 10
- Glass pill: 11
- Debug overlay: 9999
```

---

## 🔧 Implementation Changes Made

### A) Background Grain (Background-Only)
```tsx
// OLD: SVG filter on sky gradient (broken in Firefox)
<div style={{ filter: 'url(#grainFilter)' }} />

// NEW: Separate grain overlay layer
<div
  style={{
    zIndex: 5,
    mixBlendMode: 'soft-light',
    opacity: 0.05,
    backgroundImage: 'url("data:image/svg+xml,...")',
  }}
/>
```

### B) Explicit Z-Index Layering
```tsx
// All layers now have explicit numeric z-index
style={{ zIndex: 1 }}  // clouds back
style={{ zIndex: 2 }}  // clouds front
style={{ zIndex: 3 }}  // meadow
style={{ zIndex: 5 }}  // grain
style={{ zIndex: 10 }} // portal content
```

### C) Timeline Choreography (Fixed Timing)
```tsx
// Portal expansion (0-1.0)
.to(portalContent, { scale: 1, x: 0, y: 0, clipPath: ... }, 0)

// Meadow fades at 80-100% (was 30-110%)
.to(meadowLayer, { opacity: 0, duration: 0.2 }, 0.8)

// Glass pill fades at 60-90% (was 20-60%)
.to(glassPill, { opacity: 0, duration: 0.3 }, 0.6)

// Clouds parallax (subtle, full range)
.to(cloudBack, { y: -8 }, 0)
.to(cloudFront, { y: -15 }, 0)
```

### D) Safe Resize Handler (No Recursion)
```tsx
// OLD: Recursion bug
scrollTrigger: {
  invalidateOnRefresh: true,
  onRefresh: () => buildTimeline(), // ❌ Recursion!
}

// NEW: Debounced resize
let resizeTimeout: ReturnType<typeof setTimeout> | null = null;

const handleResize = () => {
  if (resizeTimeout) clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    buildTimeline(); // ✅ Clean rebuild after debounce
  }, 200);
};

scrollTrigger: {
  invalidateOnRefresh: false, // ✅ No recursion
}
```

### E) Sky Gradient Fallback (No Black)
```tsx
// Section has sky gradient as background
<section 
  style={{
    background: 'linear-gradient(180deg, #87CEEB 0%, #E0F6FF 50%, #F0F9FF 100%)',
  }}
>

// Portal content also has subtle gradient
<div style={{
  zIndex: 10,
  background: 'linear-gradient(180deg, rgba(135, 206, 235, 0.05) 0%, transparent 100%)',
}}>
```

---

## ✅ What Was Preserved

All A1 enhancements remain intact:
- ✅ Mini glass pill with backdrop-filter blur
- ✅ 2-layer cloud parallax (8px and 15px, subtle)
- ✅ Fake grass breeze (noise drift + micro transform)
- ✅ Grain/vignette on backgrounds only (never on text/UI)
- ✅ Single DOM portal (no screenshot swap)
- ✅ Smooth scroll-scrubbed expansion (~150vh)
- ✅ Prefers-reduced-motion support
- ✅ Source-based TV screen mapping (object-fit: cover compatible)
- ✅ Debug overlay (press "D" to toggle)

---

## 📋 TV_SCREEN_SRC Calibration

The current values are:
```typescript
const TV_SCREEN_SRC = {
  x: 716,      // TV screen X position in source pixels
  y: 532,      // TV screen Y position in source pixels
  w: 108,      // TV screen width in source pixels
  h: 79,       // TV screen height in source pixels
  radiusPx: 10 // Border radius
};
```

**To calibrate:**
1. Press **"D"** key to show debug overlay
2. Check if neon-lime outline matches TV screen in tv-meadow.png
3. If misaligned, open tv-meadow.png in image editor
4. Measure TV screen in source pixels (x, y, width, height)
5. Update TV_SCREEN_SRC values
6. Refresh and press "D" again to verify

**If portal appears as tiny square:**
- TV_SCREEN_SRC values are likely wrong or too small
- Open tv-meadow.png and measure the actual TV screen dimensions
- The screen should be large enough to contain the hero content visibly

---

## 🚀 Testing Checklist

Test in both browsers:
- [x] **Firefox**: No black background at any point
- [x] **Chrome**: No black background at any point
- [x] **Load**: Meadow scene + TV visible, hero content inside TV screen
- [x] **Scroll**: Smooth portal expansion, meadow visible until 80%
- [x] **Resize**: No crashes, clean rebuild after 200ms debounce
- [x] **Reduced Motion**: Portal disabled, hero fullscreen
- [x] **Debug Mode**: Press "D" shows overlay, press "D" again hides it

---

## 📁 Files Changed

**Modified:**
- `src/sections/HeroPortal.tsx` - Complete fix for all issues

**Key Changes:**
1. Removed SVG filter approach, implemented grain as overlay layer
2. Added explicit z-index to all layers (1, 2, 3, 5, 10, 11, 9999)
3. Fixed timeline fade timing (meadow at 0.8-1.0, glass pill at 0.6-0.9)
4. Removed onRefresh recursion, added debounced resize handler
5. Added sky gradient to section background (no black fallback)
6. Portal content has subtle gradient background
7. Removed scanlines entirely (they could interfere with UI)

**No new files created** - used existing tv-meadow.png

---

## 🎨 Design Compliance

All North Star rules maintained:
- ✅ Look: Sky/clouds/soft gradients + neon-lime highlights
- ✅ Motion: ease-out settle (power3.out), never robotic
- ✅ Texture: Grain only on backgrounds (z-index 5, below portal at 10)
- ✅ Single DOM portal (no bait-and-switch)
- ✅ Premium feel with subtle effects

---

## 💡 Key Takeaways

1. **SVG filters are unreliable** - Use separate overlay layers instead
2. **Fade timing matters** - Keep backgrounds visible until late (80%+)
3. **ScrollTrigger onRefresh causes recursion** - Use debounced resize instead
4. **Always have a fallback background** - Section-level sky gradient prevents black
5. **Explicit z-index prevents layering bugs** - No negative values, clear hierarchy

---

**Status:** ✅ All issues resolved  
**Tested:** Firefox + Chrome  
**Ready for:** Production deployment
