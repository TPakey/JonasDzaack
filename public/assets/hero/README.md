# Hero Portal Assets

This directory contains assets for the Hero Portal animation (Section A1).

## Required Assets

### tv-meadow.png (REQUIRED)
**Status:** ⚠️ **NEEDS TO BE PROVIDED**

A composite image showing:
- A meadow/outdoor scene
- A TV/monitor prominently placed in the scene
- The TV screen should be clearly visible and recognizable

**Requirements:**
- Format: PNG (for transparency if needed)
- Recommended size: 1920x1080 or higher
- The TV screen area should be clearly defined for clipping coordinates

**Configuration:**
After adding the image, you MUST adjust the TV screen coordinates in the component.

## Optional Assets (Using Procedural Generation)

### clouds-back.webp
### clouds-front.webp

**Status:** ✅ Currently using CSS gradient-based clouds

These are optional. If you want to use real cloud images:
1. Add the images to this directory
2. Update the cloud layer backgrounds in `HeroPortal.tsx` to use:
   ```
   backgroundImage: 'url(/assets/hero/clouds-back.webp)'
   ```

## Adjusting TV Screen Position (UPDATED METHOD)

**IMPORTANT:** TV rect is now calibrated via SOURCE_IMAGE + TV_SCREEN_SRC in pixels. Adjust TV_SCREEN_SRC only.

After adding `tv-meadow.png`, you need to calibrate the screen position using **source image coordinates** (not viewport percentages).

Open `/Users/jonas/JonasDzaack/src/sections/HeroPortal.tsx` and find the `TV_SCREEN_SRC` object at the top:

```typescript
const TV_SCREEN_SRC = {
  x: 716,      // TV screen X position in source image pixels
  y: 532,      // TV screen Y position in source image pixels
  w: 108,      // TV screen width in source image pixels
  h: 79,       // TV screen height in source image pixels
  radiusPx: 10 // Border radius in pixels for TV screen edges
};
```

### How to Adjust:

1. **Open tv-meadow.png in an image editor**
   - Use Photoshop, Figma, Sketch, Preview (Mac), Paint.NET (Windows), etc.
   - You need to measure pixel coordinates in the source image

2. **Measure the TV screen rectangle**
   - Find the TV screen's **top-left corner** position (X, Y)
   - Measure the screen's **width** and **height**
   - All values should be in source image pixels

3. **Update TV_SCREEN_SRC** with measured values
   ```typescript
   x: [top-left X position]
   y: [top-left Y position]
   w: [screen width]
   h: [screen height]
   ```

4. **Use Debug Overlay to verify**
   - Run `npm run dev` and open http://localhost:5173
   - Press **"D"** key to toggle debug overlay
   - You'll see a neon-lime outline showing where the system thinks the TV screen is
   - The outline should perfectly match the TV screen in the image
   - Press **"D"** again to hide the overlay

### Why Source Pixels Instead of Percentages?

The new method uses **source image coordinates** which correctly handles `object-fit: cover`:
- ✅ Works correctly when image is cropped by cover
- ✅ Automatically scales to any viewport size
- ✅ Single source of truth (no viewport math needed)
- ✅ Recalculates perfectly on window resize

The old percentage-based method didn't account for how `background-size: cover` crops images, causing misalignment on different screen sizes.

### Testing:

1. Start the dev server: `npm run dev`
2. Open the site in browser
3. Press **"D"** key to toggle debug overlay
4. Check if the neon-lime outline matches the TV screen exactly
5. Scroll down slowly and verify the portal expansion is smooth
6. Adjust TV_SCREEN_SRC values if needed and refresh

### Current Placeholder Configuration:

The included placeholder SVG (`tv-meadow.svg`) has the TV screen at:
- Position: x=740, y=390 (in 1920×1080 source)
- Size: 440×360 pixels

When you replace with your real `tv-meadow.png`:
1. Open the PNG in an image editor
2. Measure the TV screen in source pixels
3. Update `TV_SCREEN_SRC` in HeroPortal.tsx
4. Use debug overlay (press "D") to verify alignment

### Tips:

- **Measuring in Photoshop**: Use the Rectangular Marquee Tool to select the TV screen, then check Info panel for X, Y, W, H
- **Measuring in Figma**: Import the image, draw a rectangle over the TV screen, check position and size in properties
- **Measuring in Preview (Mac)**: Use the Rectangular Selection tool, coordinates show in toolbar
- **Be precise**: Even a few pixels off can be visible, especially on large screens
- Use the debug overlay (press "D") to verify alignment quickly
- Start with rough values and fine-tune incrementally
- Test on different screen sizes (mobile, tablet, desktop)
- The system automatically handles `object-fit: cover` cropping, so you only need to measure once

## Asset Guidelines

From the project style guide:
- **Look**: Sky / Clouds / Soft gradients + Neon-Lime only as action/highlight
- **Motion**: ease-out settle, never robotic/linear
- **Texture**: Grain only on backgrounds, never on text/UI
