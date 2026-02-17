
import React from 'react';
import { Service } from '../types';

const SERVICES: Service[] = [
  {
    id: 'MOD_01',
    title: 'Inteligência Artificial Aplicada',
    description: 'Desenvolvimento de agentes autônomos e LLMs customizados para análise de documentos, prazos e automação de decisões complexas.',
    dark: true,
  },
  {
    id: 'MOD_02',
    title: 'Sistemas de Gestão & Escala',
    description: 'Plataformas SaaS centralizadas com dashboards em tempo real para controle operacional absoluto e fluxos de agendamento inteligentes.',
    dark: false,
  },
  {
    id: 'MOD_03',
    title: 'Engenharia de Conversão B2B',
    description: 'Interfaces de alto impacto e autoridade digital projetadas para o setor industrial, focadas em transformar visitantes em orçamentos reais.',
    dark: true,
  },
  {
    id: 'MOD_04',
    title: 'Automação de Fluxos Críticos',
    description: 'Integração de APIs e robôs (RPA) para eliminar tarefas manuais repetitivas, escalando a produtividade sem elevar os custos operacionais.',
    dark: false,
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-red-600 font-mono text-[10px] font-bold tracking-[0.4em] uppercase mb-4">Módulos Operacionais</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white uppercase leading-tight">
              FRAMEWORK DE <span className="text-red-600">SOLUÇÕES</span>
            </h3>
          </div>
          <div className="p-4 border-l border-red-600 bg-red-600/5 text-[10px] font-mono text-gray-400">
            LOAD_AVG: 0.42 / 0.81 / 0.99<br/>
            TASKS: 4 RUNNING, 0 SLEEPING
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((service) => (
            <div 
              key={service.id}
              className="relative p-8 bg-black border border-white/5 transition-all duration-300 group hover:border-red-600/40 hover:-translate-y-2"
            >
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-red-600/0 group-hover:border-red-600/50 transition-all"></div>
              
              <div className="text-red-600 font-mono text-[10px] mb-12 font-bold tracking-tighter">[{service.id}]</div>
              <h4 className="text-xl font-black mb-6 text-white uppercase group-hover:text-red-600 transition-colors">
                {service.title}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 group-hover:text-gray-400 transition-colors">
                {service.description}
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
