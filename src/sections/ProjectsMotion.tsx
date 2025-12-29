import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

interface Project {
  id: number;
  name: string;
  role: string;
  outcome: string;
}

interface Anchor {
  x: number;
  y: number;
}

const STEPS = 6;
const SCROLL_DISTANCE_VH = 300; // Total scroll distance in vh
const CARD_WIDTH = 'clamp(320px, 28vw, 460px)';
const CARD_LEFT_X = 'clamp(32px, 8vw, 120px)';
const ROW_Y = [18, 44, 70];

const projects: Project[] = [
  { id: 1, name: 'Maureen', role: 'Funnel + sales strategy support', outcome: '$15k revenue in 21 days' },
  { id: 2, name: 'Ryan Walker', role: 'Skool funnel + engagement optimization', outcome: '+$7k MRR uplift → $11k total by end of Q1 2025' },
  { id: 3, name: 'SkoolReportingDashboard', role: 'Product + sales/community ops', outcome: 'Peaked ~$12k/mo, currently ~$7k/mo' },
  { id: 4, name: 'Kyle Kane', role: 'Sales team lead/closer, ran client calls', outcome: '~$10k MRR after 2 months (May 2025)' },
  { id: 5, name: 'Eddie Hall', role: 'Acquisition + revival', outcome: 'Revived engagement and growth' },
  { id: 6, name: 'Red5 Performance', role: 'Community build & engagement', outcome: 'Built and scaled community operations' },
];

// Compute anchors relative to the stage dimensions
const computeAnchors = (width: number, height: number): Anchor[] => {
  const midX = width * 0.5;
  const wiggle = width * 0.06; // Slight left/right wiggle
  
  return [
    { x: midX - wiggle, y: height * 0.28 },
    { x: midX + wiggle, y: height * 0.32 },
    { x: midX - wiggle, y: height * 0.50 },
    { x: midX + wiggle, y: height * 0.54 },
    { x: midX - wiggle, y: height * 0.72 },
    { x: midX + wiggle, y: height * 0.76 },
  ];
};

const ProjectsMotion: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tokenRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const sweepTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeIndexRef = useRef(0);
  const [tokenError, setTokenError] = useState(false);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 900 : false
  );
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [sweepingIndex, setSweepingIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  const debug = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('debug') === '1';
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setPrefersReducedMotion(motionQuery.matches);
    updateMotion();
    motionQuery.addEventListener('change', updateMotion);
    return () => motionQuery.removeEventListener('change', updateMotion);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLayoutEffect(() => {
    if (prefersReducedMotion || isMobile) {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      return;
    }

    const ctx = gsap.context(() => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }

      // Initial setup
      const stage = stageRef.current;
      if (!stage) return;
      
      const anchors = computeAnchors(stage.clientWidth, stage.clientHeight);
      gsap.set(tokenRef.current, { x: anchors[0].x, y: anchors[0].y });
      
      activeIndexRef.current = 0;
      setActiveIndex(0);
      setSweepingIndex(0);
      if (sweepTimeoutRef.current) clearTimeout(sweepTimeoutRef.current);
      sweepTimeoutRef.current = setTimeout(() => setSweepingIndex(null), 300);

      // Create timeline (paused, controlled by ScrollTrigger progress)
      const tl = gsap.timeline({ 
        paused: true,
        defaults: { ease: 'none' } 
      });
      
      tl.to(tokenRef.current, {
        duration: 1, // Normalized duration
        motionPath: {
          path: anchors,
          curviness: 1.2,
          autoRotate: false,
        },
      });

      timelineRef.current = tl;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        invalidateOnRefresh: true,
        markers: debug,
        onUpdate: (self) => {
          // Sync timeline to scroll progress
          tl.progress(self.progress);
          setProgress(self.progress);
          
          // Calculate active step
          const step = Math.min(STEPS - 1, Math.floor(self.progress * STEPS));
          
          if (step !== activeIndexRef.current) {
            activeIndexRef.current = step;
            setActiveIndex(step);
            setSweepingIndex(step);
            if (sweepTimeoutRef.current) clearTimeout(sweepTimeoutRef.current);
            sweepTimeoutRef.current = setTimeout(() => setSweepingIndex(null), 300);
          }
        },
        onRefresh: () => {
          // Recompute anchors on resize
          if (stageRef.current && timelineRef.current) {
            const newAnchors = computeAnchors(stageRef.current.clientWidth, stageRef.current.clientHeight);
            // We can't easily update motionPath in-place without complex logic, 
            // but invalidateOnRefresh helps. For robust resize, we often rebuild.
            // Here we rely on GSAP's internal refresh mechanism or simple re-render.
          }
        }
      });

    }, sectionRef);

    return () => {
      ctx.revert();
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      if (sweepTimeoutRef.current) {
        clearTimeout(sweepTimeoutRef.current);
      }
    };
  }, [prefersReducedMotion, isMobile, debug]);

  const renderCard = (project: Project, index: number) => {
    const isActive = activeIndex === index;
    const isHovered = hoveredIndex === index;
    const isSweeping = sweepingIndex === index;

    // Explicit mapping for left/right columns
    // Projects 1, 3, 5 -> Left
    // Projects 2, 4, 6 -> Right
    const isLeftColumn = [1, 3, 5].includes(project.id);
    
    const row = index === 0 ? 0 : index === 2 ? 1 : index === 4 ? 2 : index === 1 ? 0 : index === 3 ? 1 : 2;
    const top = `${ROW_Y[row]}vh`;
    
    // Use same inset for both sides for symmetry
    const style: React.CSSProperties = {
      position: 'absolute',
      top,
      width: CARD_WIDTH,
    };

    if (isLeftColumn) {
      style.left = CARD_LEFT_X;
    } else {
      style.right = CARD_LEFT_X; // Symmetric right inset
    }

    return (
      <article
        key={project.id}
        className={`projects-card ${isActive ? 'projects-card-active' : 'projects-card-inactive'} ${isHovered ? 'projects-card-hovered' : ''} ${isSweeping ? 'projects-card-sweep' : ''}`.trim()}
        style={style}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <p className="text-xs tracking-[0.14em] text-text-2 uppercase mb-2">Project {project.id}</p>
        <h3 className="text-2xl font-bold text-text-0 mb-2">{project.name}</h3>
        <p className="text-sm text-text-1 mb-3">{project.role}</p>
        <p className="text-base font-semibold text-text-0">{project.outcome}</p>
      </article>
    );
  };

  const renderFallback = () => (
    <div className="container-custom py-20">
      <div className="text-center mb-8">
        <p className="text-sm tracking-[0.14em] text-text-2 uppercase mb-2">Projects</p>
        <h2 className="heading-2">Stories in motion</h2>
        <div className="flex justify-center mt-4">
          <div
            className="w-12 h-12 rounded-full bg-white shadow-[0_10px_30px_rgba(10,16,32,0.12)] flex items-center justify-center"
            style={{ border: '1px solid rgba(213, 255, 79, 0.6)' }}
          >
            <img src="/brand/skool.svg" alt="Skool token" className="w-8 h-8" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="projects-card projects-card-active w-full">
            <p className="text-xs tracking-[0.14em] text-text-2 uppercase mb-2">Project {project.id}</p>
            <h3 className="text-xl md:text-2xl font-bold text-text-0 mb-2">{project.name}</h3>
            <p className="text-sm text-text-1 mb-3">{project.role}</p>
            <p className="text-base font-semibold text-text-0">{project.outcome}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section relative"
      style={{
        // Ensure section has height for scrolling
        height: prefersReducedMotion || isMobile ? 'auto' : `calc(100vh * ${STEPS + 1})`,
        background:
          'radial-gradient(110% 110% at 60% 10%, rgba(124, 203, 255, 0.28), transparent), linear-gradient(180deg, #f8fcff 0%, #e8f3ff 65%, #f9fdff 100%)',
      }}
      aria-label="Projects motion path"
    >
      {prefersReducedMotion || isMobile ? (
        renderFallback()
      ) : (
        <div className="relative w-full h-full">
          {/* Sticky Stage */}
          <div 
            className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center"
            ref={stageRef}
          >
            <div className="container-custom max-w-[1100px] mt-10 text-center relative z-10">
              <p className="text-sm tracking-[0.14em] text-text-2 uppercase mb-2">Projects</p>
              <h2 className="heading-2">Continuous motion, steady delivery</h2>
              <p className="text-text-1 text-base">Token follows a curated path while each story stays in view.</p>
            </div>

            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(600px 320px at 30% 30%, rgba(255,255,255,0.65), transparent), radial-gradient(640px 360px at 70% 55%, rgba(255,255,255,0.52), transparent)',
                  opacity: 0.85,
                }}
              />
            </div>

            {/* Cards Container - positioned relative to stage */}
            <div className="absolute inset-0 w-full max-w-[1400px] mx-auto left-0 right-0">
              {projects.map((project, index) => renderCard(project, index))}
            </div>

            {/* Token */}
            <div
              ref={tokenRef}
              className="absolute w-14 h-14 rounded-full bg-white shadow-[0_10px_40px_rgba(10,16,32,0.16)] flex items-center justify-center token-glow pointer-events-none"
              style={{
                border: '1px solid rgba(213, 255, 79, 0.9)',
                boxShadow: '0 0 0 6px rgba(213, 255, 79, 0.14), 0 12px 30px rgba(10,16,32,0.18)',
                top: 0,
                left: 0,
                zIndex: 20
              }}
            >
              {!tokenError ? (
                <img 
                  src="/brand/skool.svg" 
                  alt="Skool token" 
                  className="w-10 h-10" 
                  onError={() => setTokenError(true)}
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-lime-300" />
              )}
            </div>

            {debug && (
              <div className="absolute top-3 right-3 text-xs bg-white/80 px-3 py-2 rounded z-50">
                <div>progress: {progress.toFixed(3)}</div>
                <div>step: {activeIndexRef.current + 1} / {STEPS}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsMotion;
