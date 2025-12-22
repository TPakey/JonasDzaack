import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="section">
      <div className="container-custom max-w-2xl text-center">
        <h2 className="heading-2 mb-8">Get in Touch</h2>
        <p className="body-text mb-8">
          Open to Hamburg / Remote EU/US opportunities
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <a 
            href="mailto:j.dzaack@gmx.de" 
            className="btn-primary focus-ring"
          >
            Email me
          </a>
          <a
            href="https://www.linkedin.com/in/jonas-dzaack-9252a032a/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary focus-ring"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/TPakey"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary focus-ring"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
