import React, { useState } from 'react';

type TabId = 'growth' | 'community' | 'product';

interface Tab {
  id: TabId;
  label: string;
  content: string[];
}

const tabs: Tab[] = [
  {
    id: 'growth',
    label: 'Growth',
    content: [
      'Funnels & conversion systems',
      'Offer + onboarding optimization',
      'Paid acquisition ops (Meta, tracking)',
    ],
  },
  {
    id: 'community',
    label: 'Community',
    content: [
      'Retention & churn reduction',
      'Engagement loops + programming',
      'Free → paid conversion systems',
    ],
  },
  {
    id: 'product',
    label: 'Product',
    content: [
      'Dashboards & reporting',
      'Automation & ops tooling',
      'Data instrumentation',
    ],
  },
];

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('growth');

  const handleKeyDown = (e: React.KeyboardEvent, tabId: TabId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveTab(tabId);
    }
  };

  return (
    <section id="about" className="section bg-bg-1/50 py-16 md:py-24">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left column - Copy */}
          <div className="space-y-4 max-w-xl">
            <h2 className="heading-2 text-text-0">About</h2>
            <p className="text-2xl md:text-3xl font-semibold leading-tight text-text-0">
              I build growth systems for creators.
            </p>
            <p className="body-text text-text-1">
              Product, funnel, and community ops — shipped end-to-end.
            </p>
            <p className="text-sm text-text-2 pt-4">
              Studying Business Informatics @ University of Hamburg.
            </p>
          </div>

          {/* Right column - Operator Console */}
          <div className="space-y-4">
            <div className="bg-white/85 backdrop-blur-md rounded-[24px] border border-outline shadow-[0_10px_40px_rgba(10,16,32,0.08)] overflow-hidden">
              {/* Top bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-outline bg-white/70">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#fca5a5]" aria-hidden="true" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#fcd34d]" aria-hidden="true" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#86efac]" aria-hidden="true" />
                </div>
                <span className="text-xs font-semibold tracking-wide text-text-1 uppercase">Operator Console</span>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 px-3 pt-3 pb-1 border-b border-outline bg-bg-0/60">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    onKeyDown={(e) => handleKeyDown(e, tab.id)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 focus-ring ${
                      activeTab === tab.id
                        ? 'text-text-0 bg-white shadow-[0_4px_18px_rgba(10,16,32,0.06)]'
                        : 'text-text-2 hover:text-text-1'
                    }`}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    tabIndex={0}
                  >
                    {tab.label}
                    <span
                      className={`absolute left-3 right-3 -bottom-[1px] h-[2px] rounded-full bg-text-0 transition-transform duration-200 origin-center ${
                        activeTab === tab.id ? 'scale-x-100' : 'scale-x-0'
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="relative p-6 min-h-[180px] bg-white/70 overflow-hidden">
                {tabs.map((tab) => (
                  <div
                    key={tab.id}
                    className={`absolute inset-0 space-y-3 transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-2 pointer-events-none'
                    }`}
                    role="tabpanel"
                    aria-hidden={activeTab !== tab.id}
                  >
                    {tab.content.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 text-sm text-text-1"
                      >
                        <span className="text-text-2 select-none">→</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
