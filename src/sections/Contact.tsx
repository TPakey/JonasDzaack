import React, { useState } from 'react';

interface DockIcon {
  id: string;
  label: string;
  href: string;
  icon: JSX.Element;
  tooltip?: string;
  placeholder?: boolean;
}

const dockIcons: DockIcon[] = [
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:j.dzaack@gmx.de',
    tooltip: 'Email',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jonas-dzaack-9252a032a/',
    tooltip: 'LinkedIn',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/TPakey',
    tooltip: 'GitHub',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    tooltip: 'WhatsApp (soon)',
    href: 'mailto:j.dzaack@gmx.de',
    placeholder: true,
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    ),
  },
  {
    id: 'instagram',
    label: 'Instagram',
    tooltip: 'Instagram (soon)',
    href: '#',
    placeholder: true,
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
];

const Contact: React.FC = () => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const hoveredIndex = hoveredIcon ? dockIcons.findIndex((icon) => icon.id === hoveredIcon) : null;

  const getIconScale = (index: number, hoveredIndex: number | null) => {
    if (hoveredIndex === null) return 1;
    if (index === hoveredIndex) return 1.18;
    if (Math.abs(index - hoveredIndex) === 1) return 1.06;
    return 1;
  };

  const getTranslateY = (index: number, hoveredIndex: number | null) => {
    if (hoveredIndex === null) return '0';
    if (index === hoveredIndex) return '-2px';
    if (Math.abs(index - hoveredIndex) === 1) return '-1px';
    return '0';
  };

  return (
    <section id="contact" className="section relative bg-gradient-to-b from-bg-1/40 via-bg-0 to-white pb-20 pt-16">
      <div className="container-custom max-w-4xl text-center relative z-10 flex flex-col gap-10">
        <div className="space-y-3">
          <h2 className="heading-2 text-text-0">Contact</h2>
          <p className="text-xl md:text-2xl font-medium text-text-0">
            Want to build something together?
          </p>
        </div>

        {/* Dock */}
        <div className="flex justify-center">
          <div className="dock bg-white/80 backdrop-blur-xl rounded-3xl border border-outline shadow-[0_14px_38px_rgba(10,16,32,0.12)] px-5 sm:px-7 py-4 inline-flex gap-3 sm:gap-4">
            {dockIcons.map((icon, index) => (
              <a
                key={icon.id}
                href={icon.href}
                target={icon.id !== 'email' ? '_blank' : undefined}
                rel={icon.id !== 'email' ? 'noopener noreferrer' : undefined}
                onClick={(e) => {
                  if (icon.placeholder && icon.id === 'instagram') {
                    e.preventDefault();
                  }
                }}
                className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl text-text-0 bg-white/85 border border-outline/70 transition-all duration-200 ease-out"
                style={{
                  transform: `translateY(${getTranslateY(index, hoveredIndex)}) scale(${getIconScale(index, hoveredIndex)})`,
                  boxShadow: hoveredIndex === index
                    ? '0 0 0 2px var(--lime), 0 18px 30px rgba(10,16,32,0.16)'
                    : '0 12px 26px rgba(10,16,32,0.10)',
                }}
                onMouseEnter={() => setHoveredIcon(icon.id)}
                onMouseLeave={() => setHoveredIcon(null)}
                onFocus={() => setHoveredIcon(icon.id)}
                onBlur={() => setHoveredIcon(null)}
                aria-label={icon.tooltip ?? icon.label}
              >
                {icon.icon}
                {hoveredIcon === icon.id && (
                  <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-xs text-white px-2 py-1 rounded"
                    style={{ background: 'var(--ink)' }}
                  >
                    {icon.tooltip ?? icon.label}
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Hill divider into footer */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          className="w-full h-32"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,120 C200,60 400,30 600,80 C800,130 1000,160 1200,100 L1200,200 L0,200 Z"
            fill="url(#hillGradient)"
          />
          <defs>
            <linearGradient id="hillGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#f7fbff" />
              <stop offset="70%" stopColor="#dfefff" />
              <stop offset="100%" stopColor="#f8fbff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Contact;
