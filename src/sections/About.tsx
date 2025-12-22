import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="section bg-bg-1/50">
      <div className="container-custom max-w-3xl">
        <h2 className="heading-2 mb-8 text-center">About</h2>
        <div className="body-text space-y-4 text-center">
          <p>
            I'm studying Wirtschaftsinformatik (Computer Science & Business) at the University of Hamburg.
          </p>
          <p>
            I've built and shipped digital products with creators, helping them grow their communities and revenue.
          </p>
          <p>
            I focus on the intersection of product, sales, and community — not just programming.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
