import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center gradient-sky overflow-hidden">
      <div className="container-custom py-20 md:py-32 relative z-10">
        <div className="max-w-4xl">
          <h1 className="heading-1 mb-6">
            I build digital products with creators.
          </h1>
          <p className="body-text text-xl md:text-2xl mb-12">
            Studying CS & Business at the University of Hamburg. Building digital products for creators.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="mailto:j.dzaack@gmx.de" 
              className="btn-primary focus-ring"
            >
              Email me
            </a>
            <button 
              className="btn-secondary focus-ring"
              disabled
              title="Coming soon"
            >
              View CV
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
