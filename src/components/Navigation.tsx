import React from 'react';

const Navigation: React.FC = () => {
  const navLinks = [
    { href: '#projects', label: 'Projects' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-0/80 backdrop-blur-md border-b border-outline">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <div className="font-bold text-xl">
            JD
          </div>
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-text-1 hover:text-text-0 transition-colors focus-ring px-3 py-2 rounded"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
