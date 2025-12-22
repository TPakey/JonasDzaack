import React from 'react';

interface Project {
  id: number;
  name: string;
  role: string;
  outcome: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      name: 'Maureen',
      role: 'Funnel + sales strategy support',
      outcome: '$15k revenue in 21 days'
    },
    {
      id: 2,
      name: 'Ryan Walker',
      role: 'Skool funnel + engagement optimization',
      outcome: '+$7k MRR uplift → $11k total by end of Q1 2025'
    },
    {
      id: 3,
      name: 'SkoolReportingDashboard',
      role: 'Product + sales/community ops',
      outcome: 'Peaked ~$12k/mo, currently ~$7k/mo'
    },
    {
      id: 4,
      name: 'Kyle Kane',
      role: 'Sales team lead/closer, ran client calls',
      outcome: '~$10k MRR after 2 months (May 2025)'
    },
    {
      id: 5,
      name: 'Red5 Performance',
      role: 'Community build & engagement',
      outcome: 'Built and scaled community operations'
    },
    {
      id: 6,
      name: 'Eddie Hall Communities',
      role: 'Acquisition + revival',
      outcome: 'Revived engagement and growth'
    }
  ];

  return (
    <section id="projects" className="section">
      <div className="container-custom">
        <h2 className="heading-2 mb-12 text-center">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="card p-8 hover:shadow-lg hover:-translate-y-1"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-3">
                {project.name}
              </h3>
              <p className="text-text-2 text-sm mb-4">
                {project.role}
              </p>
              <p className="text-text-0 font-medium">
                {project.outcome}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
