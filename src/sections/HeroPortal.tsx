import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroPortal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const screenAnchorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx: gsap.Context;
    
    const initHero = () => {
      const isMobile = window.innerWidth < 900;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      ctx = gsap.context(() => {
        // 1. Position the content inside the screen hole
        if (screenAnchorRef.current && contentRef.current && stickyRef.current && overlayRef.current) {
          const anchorRect = screenAnchorRef.current.getBoundingClientRect();
          const stickyRect = stickyRef.current.getBoundingClientRect();
          
          // Calculate center of the anchor relative to the sticky container
          const cx = anchorRect.left + anchorRect.width / 2 - stickyRect.left;
          const cy = anchorRect.top + anchorRect.height / 2 - stickyRect.top;

          // Position content centered on that point
          gsap.set(contentRef.current, {
            position: 'absolute',
            left: cx,
            top: cy,
            xPercent: -50,
            yPercent: -50,
            width: 'min(920px, 90vw)', // Ensure it fits
            zIndex: 1
          });

          // If we are doing the animation (Desktop + Motion)
          if (!isMobile && !prefersReducedMotion) {
            // Set transform origin of the overlay to the hole center
            gsap.set(overlayRef.current, {
              transformOrigin: `${cx}px ${cy}px`
            });

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
                invalidateOnRefresh: true,
              }
            });

            // A) Zoom the overlay
            tl.to(overlayRef.current, {
              scale: 6,
              ease: 'none',
              duration: 1
            })
            // B) Fade out overlay near the end (last 20%)
            .to(overlayRef.current, {
              opacity: 0,
              ease: 'none',
              duration: 0.2
            }, 0.8)
            // C) Subtle content scale
            .to(contentRef.current, {
              scale: 1.15,
              ease: 'none',
              duration: 1
            }, 0);
          }
        }
      }, sectionRef);
    };

    // Run initialization
    initHero();

    // Handle resize
    const handleResize = () => {
      ctx?.revert();
      initHero();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx?.revert();
    };
  }, []);

  return (
    <section 
      id="hero-portal" 
      ref={sectionRef} 
      className="relative w-full bg-[#0b1220]"
      style={{ height: '240vh' }}
    >
      <div 
        ref={stickyRef} 
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* Layer A: Real Hero Content (HTML) - Z-Index 1 */}
        <div 
          ref={contentRef} 
          className="absolute z-10 flex flex-col items-center justify-center text-center pointer-events-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            I build digital products<br />with creators.
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-lg">
            Helping founders and teams ship better software.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors">
              View Work
            </button>
            <button className="px-8 py-3 bg-transparent border border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors">
              Contact Me
            </button>
          </div>
        </div>

        {/* Layer B: PNG Overlay (above content) - Z-Index 2 */}
        <div 
          ref={overlayRef} 
          className="absolute inset-0 z-20 pointer-events-none w-full h-full"
          aria-hidden="true"
        >
          <img 
            src="/assets/hero/tv-meadow.png" 
            alt="" 
            className="w-full h-full object-cover block"
          />
          
          {/* Anchor rect positioned EXACTLY over the screen hole area */}
          <div 
            ref={screenAnchorRef} 
            className="absolute opacity-0"
            style={{
              left: '39%',
              top: '36%',
              width: '22%',
              height: '18%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        </div>
      </div>
    </section>
  );
}
