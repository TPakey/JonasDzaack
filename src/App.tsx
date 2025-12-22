import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import IntroZoom from './sections/IntroZoom';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import ProofStrip from './sections/ProofStrip';
import Projects from './sections/Projects';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import './styles/globals.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const siteContentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Show site content immediately for reduced motion users
      if (siteContentRef.current) {
        siteContentRef.current.style.opacity = '1';
        siteContentRef.current.style.pointerEvents = 'auto';
      }
      return;
    }

    const ctx = gsap.context(() => {
      // Fade in site content during the zoom
      gsap.to(siteContentRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        ease: 'power2.out',
        scrollTrigger: {
          trigger: siteContentRef.current,
          start: 'top bottom',
          end: 'top center',
          scrub: 1,
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <IntroZoom />
      
      <div 
        ref={siteContentRef}
        className="opacity-0 pointer-events-none"
      >
        <Navigation />
        <main>
          <Hero />
          <ProofStrip />
          <Projects />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
