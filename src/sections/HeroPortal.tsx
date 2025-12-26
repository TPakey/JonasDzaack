import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroPortal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pngRef = useRef<HTMLDivElement>(null);
  const screenAnchorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let resizeHandler: () => void;

    const ctx = gsap.context(() => {
      // Initial positioning logic
      const positionContent = () => {
        if (!screenAnchorRef.current || !contentRef.current || !pngRef.current) return;
        
        const rect = screenAnchorRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const cRect = contentRef.current.getBoundingClientRect();
        const ccx = cRect.left + cRect.width / 2;
        const ccy = cRect.top + cRect.height / 2;

        const dx = cx - ccx;
        const dy = cy - ccy;

        // Move content to align with screen hole
        gsap.set(contentRef.current, { x: dx, y: dy });
        
        // Set transform origin for zoom to the center of the screen hole
        gsap.set(pngRef.current, { transformOrigin: `${cx}px ${cy}px` });
      };

      resizeHandler = positionContent;

      // Run initially
      positionContent();
      window.addEventListener('resize', positionContent);

      const isMobile = window.innerWidth < 900;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!isMobile && !prefersReducedMotion) {
        // ScrollTrigger Timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
            onRefresh: positionContent, // Re-calculate on resize/refresh
          },
        });

        // 0% to 80%: Zoom in
        tl.to(pngRef.current, {
          scale: 5, // Zoom factor - tune as needed
          ease: 'none',
          duration: 0.8,
        })
        // 80% to 100%: Fade out PNG
        .to(pngRef.current, {
          opacity: 0,
          ease: 'none',
          duration: 0.2,
        }, 0.8)
        // Simultaneously scale content slightly for depth effect
        .to(contentRef.current, {
          scale: 1.5,
          ease: 'none',
          duration: 0.8,
        }, 0);
      }
    });

    return () => {
      ctx.revert();
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <section id="hero-portal" ref={sectionRef} style={{ height: '240vh' }} className="relative w-full bg-[#0b1220]">
      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Layer A: Real Hero Content (HTML) */}
        <div ref={contentRef} className="hero-content absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              I build digital products<br />with creators.
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-lg">
              Helping founders and teams ship better software.
            </p>
            <div className="flex gap-4 pointer-events-auto">
              <button className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors">
                View Work
              </button>
              <button className="px-8 py-3 bg-transparent border border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors">
                Contact Me
              </button>
            </div>
        </div>

        {/* Layer B: PNG Overlay (above content) */}
        <div ref={pngRef} className="hero-png-layer absolute inset-0 z-20 pointer-events-none">
          <img 
            src="/assets/hero/tv-meadow.png" 
            alt="TV Meadow" 
            className="w-full h-full object-cover"
          />
          {/* Screen Anchor - Invisible element marking the screen hole */}
          {/* Assuming the screen is roughly centered in the image. Adjust if needed. */}
          <div 
            ref={screenAnchorRef} 
            className="screen-anchor absolute"
            style={{
                top: '50%',
                left: '50%',
                width: '10px', 
                height: '10px', 
                transform: 'translate(-50%, -50%)',
                visibility: 'hidden' // Invisible but measurable
            }} 
          />
        </div>

      </div>
    </section>
  );
}
