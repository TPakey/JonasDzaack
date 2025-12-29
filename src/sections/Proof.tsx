import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatTile {
  id: 'audience' | 'revenue' | 'communities';
  label: string;
  helper: string | string[];
  finalValue: number;
  format: (value: number) => string;
  lineWidth: string;
}

const stats: StatTile[] = [
  {
    id: 'audience',
    label: 'AUDIENCE REACHED',
    helper: 'Across creator ecosystems (Eddie Hall + others)',
    finalValue: 21.6,
    format: (value) => `${value.toFixed(1)}M+`,
    lineWidth: '50%',
  },
  {
    id: 'revenue',
    label: 'REVENUE IMPACT (2025)',
    helper: [
      '2025 revenue impact',
      'Plus outcomes like +$7k MRR uplift → $11k total (Q1 2025)',
    ],
    finalValue: 464,
    format: (value) => `$${Math.round(value)}k`,
    lineWidth: '42%',
  },
  {
    id: 'communities',
    label: 'COMMUNITIES BUILT / MANAGED',
    helper: 'Systems, reporting, funnels, ops',
    finalValue: 40,
    format: (value) => `${Math.round(value)}+`,
    lineWidth: '58%',
  },
];

const Proof: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasCountedRef = useRef(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const [scrollRoom, setScrollRoom] = useState(() =>
    typeof window !== 'undefined'
      ? window.innerHeight + (window.innerWidth < 768 ? 260 : 420)
      : 1400
  );
  const [displayValues, setDisplayValues] = useState<Record<StatTile['id'], string>>({
    audience: '0',
    revenue: '$0',
    communities: '0',
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setScrollRoom(window.innerHeight + (window.innerWidth < 768 ? 260 : 420));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const setFinalValues = () => {
      setDisplayValues({
        audience: stats.find((s) => s.id === 'audience')?.format(21.6) ?? '21.6M+',
        revenue: stats.find((s) => s.id === 'revenue')?.format(464) ?? '$464k',
        communities: stats.find((s) => s.id === 'communities')?.format(40) ?? '40+',
      });
    };

    if (prefersReducedMotion) {
      setFinalValues();
      return;
    }

    const ctx = gsap.context(() => {
      const startCountUp = () => {
        if (hasCountedRef.current) return;
        hasCountedRef.current = true;

        stats.forEach((stat) => {
          const counter = { value: 0 };
          gsap.to(counter, {
            value: stat.finalValue,
            duration: stat.id === 'revenue' ? 1.15 : 1.05,
            ease: 'power3.out',
            onUpdate: () => {
              setDisplayValues((prev) => ({
                ...prev,
                [stat.id]: stat.format(counter.value),
              }));
            },
            onComplete: () => {
              setDisplayValues((prev) => ({
                ...prev,
                [stat.id]: stat.format(stat.finalValue),
              }));
            },
          });
        });
      };
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: startCountUp,
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="section relative overflow-hidden py-16 md:py-24"
      style={{
        background:
          'radial-gradient(120% 120% at 50% 15%, rgba(124, 203, 255, 0.35), transparent), linear-gradient(180deg, #f7fbff 0%, #ecf7ff 65%, #f9fdff 100%)',
      }}
      aria-label="Proof HUD"
    >
      <div
        className="container-custom relative"
      >
        <div className="mb-6 text-left">
          <span className="text-[12px] tracking-[0.18em] text-text-2 uppercase">IMPACT</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="proof-tile card border border-outline/60 shadow-[0_30px_80px_rgba(10,16,32,0.08)] bg-white/70 backdrop-blur-sm px-6 py-7"
            >
              <p className="text-xs tracking-[0.12em] text-text-2 uppercase mb-2">{stat.label}</p>
              <p className="text-4xl md:text-5xl font-bold text-text-0 mb-3">{displayValues[stat.id]}</p>
              <div className="h-[2px] rounded-full bg-[rgba(213,255,79,0.7)] mb-3" style={{ width: stat.lineWidth, opacity: 0.65 }} />
              {Array.isArray(stat.helper) ? (
                <div className="space-y-1 text-sm text-text-1 leading-relaxed">
                  {stat.helper.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-text-1 leading-relaxed">{stat.helper}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Proof;
