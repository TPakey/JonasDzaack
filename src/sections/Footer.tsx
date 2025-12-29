import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/85 backdrop-blur-md pt-14 pb-8">
      <div className="container-custom">
        <p className="text-center text-text-2 text-sm">
          © {new Date().getFullYear()} Jonas Dzaack. Built with Vite + React + TailwindCSS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
