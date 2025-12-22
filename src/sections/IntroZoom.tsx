import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface IntroZoomProps {
  onComplete?: () => void;
}

export default function IntroZoom({ onComplete }: IntroZoomProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const introWrapperRef = useRef<HTMLDivElement>(null);
  const [hasScreenImage, setHasScreenImage] = useState(false);

  // Check if tv-screen.png exists
  useEffect(() => {
    const img = new Image();
    img.onload = () => setHasScreenImage(true);
    img.onerror = () => setHasScreenImage(false);
    img.src = '/hero/tv-screen.png';
  }, []);

  useLayoutEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Skip animation for reduced motion users
      if (sectionRef.current) {
        sectionRef.current.style.display = 'none';
      }
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%', // Scroll distance for the zoom effect (1-2 swipes)
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Main zoom animation - centered on TV screen
      tl.to(zoomRef.current, {
        scale: 10,
        ease: 'power1.inOut',
      }, 0);

      // Fade out intro wrapper in the last 15-20% (crossfade to real site)
      tl.to(introWrapperRef.current, {
        opacity: 0,
        ease: 'power2.in',
      }, 0.8); // Start fading at 80% progress

    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [onComplete]);

  // Screen bounding box coordinates (percent of image)
  const screenLeft = 46.615;
  const screenTop = 51.953;
  const screenRight = 53.646;
  const screenBottom = 59.668;
  
  // Calculate width and height
  const screenWidth = screenRight - screenLeft; // ~7.031%
  const screenHeight = screenBottom - screenTop; // ~7.715%

  // Transform origin for zoom center
  const originX = '50.13%';
  const originY = '55.81%';

  return (
    <div 
      ref={sectionRef} 
      className="intro-zoom-section"
    >
      <div
        ref={introWrapperRef}
        className="absolute inset-0"
      >
        {/* Zoom container */}
        <div
          ref={zoomRef}
          className="relative w-full h-full"
          style={{
            transformOrigin: `${originX} ${originY}`,
          }}
        >
          {/* Hero image */}
          <img
            src="/hero/tv-meadow.PNG"
            alt="TV in meadow"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* TV screen overlay */}
          <div
            ref={screenRef}
            className="tv-screen-overlay"
            style={{
              left: `${screenLeft}%`,
              top: `${screenTop}%`,
              width: `${screenWidth}%`,
              height: `${screenHeight}%`,
            }}
          >
            {hasScreenImage ? (
              // Show tv-screen.png if it exists
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: 'url(/hero/tv-screen.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            ) : (
              // Fallback: neutral gradient + noise
              <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black">
                <div className="noise-overlay" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
