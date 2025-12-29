import React from 'react';

const ProofStrip: React.FC = () => {
  const proofPoints = [
    '+$7k MRR uplift → $11k total (Q1 2025)',
    '$15k revenue in 21 days',
    'SkoolReportingDashboard peaked ~$12k/mo'
  ];

  return (
    <section className="section bg-white/30 backdrop-blur-sm border-y border-outline py-12 md:py-16">
      <div className="container-custom">
        <p className="text-sm md:text-base text-text-2 mb-6 text-center">
          Results I contributed to:
        </p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {proofPoints.map((point, index) => (
            <div key={index} className="text-center">
              <p className="text-base md:text-lg font-medium text-text-0">
                {point}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProofStrip;
