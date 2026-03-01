
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import TranslatedText from './TranslatedText';

const Services: React.FC = () => {
  const { t } = useLanguage();

  const SERVICES = [
    {
      id: 'MOD_01',
      title: t.services.service1_title,
      description: t.services.service1_desc,
      dark: true,
    },
    {
      id: 'MOD_02',
      title: t.services.service2_title,
      description: t.services.service2_desc,
      dark: false,
    },
    {
      id: 'MOD_03',
      title: t.services.service3_title,
      description: t.services.service3_desc,
      dark: true,
    },
  ];

  return (
    <section id="services" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-red-600 font-mono text-[10px] font-bold tracking-[0.4em] uppercase mb-4">
              <TranslatedText text={t.services.label} duration={1000} />
            </h2>
            <h3 className="text-4xl md:text-6xl font-black text-white uppercase leading-tight">
              <TranslatedText text={t.services.title} duration={1200} /> <span className="text-red-600"><TranslatedText text={t.services.title_highlight} duration={1200} delay={200} /></span>
            </h3>
            <p className="text-gray-400 mt-4 max-w-xl">
              <TranslatedText text={t.services.description} duration={1500} delay={400} />
            </p>
          </div>
          <div className="p-4 border-l border-red-600 bg-red-600/5 text-[10px] font-mono text-gray-400">
            LOAD_AVG: 0.42 / 0.81 / 0.99<br/>
            TASKS: 4 RUNNING, 0 SLEEPING
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, index) => (
            <div 
              key={service.id}
              className="relative p-8 bg-black border border-white/5 transition-all duration-300 group hover:border-red-600/40 hover:-translate-y-2"
            >
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-red-600/0 group-hover:border-red-600/50 transition-all"></div>
              
              <div className="text-red-600 font-mono text-[10px] mb-12 font-bold tracking-tighter">[{service.id}]</div>
              <h4 className="text-xl font-black mb-6 text-white uppercase group-hover:text-red-600 transition-colors">
                <TranslatedText text={service.title} duration={1000} delay={index * 200} />
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 group-hover:text-gray-400 transition-colors">
                <TranslatedText text={service.description} duration={1500} delay={index * 200 + 200} />
              </p>
              
              <div className="flex items-center gap-2 mt-4 overflow-hidden">
                <div className="h-0.5 bg-red-600 w-full -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                <div className="text-[8px] font-mono text-red-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">DEPLOY_READY</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
