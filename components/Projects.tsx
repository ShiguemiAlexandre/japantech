
import React from 'react';
import { Project } from '../types';

const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'Legal Insight AI',
    category: 'IA Jurídica & Controle',
    description: 'Inteligência Artificial de alta precisão que lê, analisa e resume processos complexos em segundos. Desenvolvida para o Controlador Jurídico, a solução realiza estimativas inteligentes de das críticas e prazos, eliminando riscos operacionais e garantindo visibilidade total sobre o fluxo processual do escritório.',
    imageUrl: 'https://img.freepik.com/premium-photo/internet-law-concept-with-3d-rendering-ai-robot-with-law-scale_493806-4180.jpg'
  },
  {
    id: '02',
    title: 'PMC Cartomancia',
    category: 'Gestão & Escala (Beta)',
    description: 'Plataforma estratégica para centralização de atendimentos. Atualmente em fase de expansão, com módulos de agendamento automatizado e integração de pagamentos em desenvolvimento para transformar a operação em um fluxo 100% autônomo.',
    imageUrl: 'https://img.freepik.com/premium-photo/fortune-telling-tarot-cards-astrology-fortune-telling_687292-7657.jpg',
    url: 'https://www.ciganasoraya.com'
  },
  {
    id: '03',
    title: 'Hidrau Comp',
    category: 'Autoridade Industrial',
    description: 'Presença digital de alta performance para o setor industrial. Projetada para transformar visitantes em orçamentos reais, fortalecendo a credibilidade da marca e facilitando a captação de grandes contas B2B.',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800'
  }
];

const Projects: React.FC = () => {
  return (
    <section id="projetos" className="py-24 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="mb-20 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-[1px] bg-red-600"></div>
              <span className="text-xs font-mono text-red-600 uppercase tracking-widest">Portfólio Estratégico</span>
            </div>
            <h3 className="text-5xl md:text-7xl font-black text-white uppercase leading-none">
              LAB <span className="text-red-600">/</span> PROJETOS
            </h3>
          </div>
          <div className="font-mono text-[10px] text-gray-500 space-y-1">
            <p>// TOTAL_PROJECTS: 03</p>
            <p>// STATUS: ALL_LIVE</p>
            <p>// REGION: GLOBAL_SOUTH</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {PROJECTS.map((project) => (
            <div key={project.id} className="group relative bg-black p-8 transition-all duration-500 hover:bg-zinc-950 overflow-hidden min-h-[500px] flex flex-col">
              {/* Image Reveal on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover grayscale scale-110 group-hover:scale-100 transition-transform duration-1000"
                />
              </div>

              {/* Tech Log Overlay - Hidden until hover */}
              <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-red-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none text-right">
                <p>STATUS: {project.id === '02' ? 'IN_DEVELOPMENT' : 'OPTIMIZED'}</p>
                <p>TARGET: RESULTS</p>
                <p>BUSINESS_READY={project.id === '02' ? 'PARTIAL' : 'TRUE'}</p>
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-12">
                  <span className="text-red-600 font-mono text-xs mb-2 block">[{project.id}]</span>
                  <h4 className="text-3xl font-black text-white uppercase group-hover:text-red-600 transition-colors mb-4 leading-none">
                    {project.title}
                  </h4>
                  <div className="inline-block border border-red-600/30 px-2 py-1">
                    <span className="text-[9px] font-mono text-red-500 uppercase tracking-tighter">
                      {project.category}
                    </span>
                  </div>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-auto group-hover:text-gray-300 transition-colors">
                  {project.description}
                </p>

                <div className="mt-8 pt-8 border-t border-white/5">
                  {project.id === '01' ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-zinc-500 text-[9px] font-mono uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        <span>Protocolo de Sigilo Ativo</span>
                      </div>
                      <span className="text-white/20 font-mono text-[9px]">2025.08</span>
                    </div>
                  ) : project.url ? (
                    <a 
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full group/btn"
                    >
                      <span className="text-white text-[10px] font-black uppercase tracking-widest group-hover/btn:text-red-600 transition-colors">
                        {project.id === '02' ? 'Acessar Versão Beta' : 'Acessar Sistema'}
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-red-600 translate-x-0 group-hover/btn:translate-x-2 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </a>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-zinc-500 text-[9px] font-mono uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 bg-red-600/50 rounded-full"></span>
                        <span>Case de Sucesso Industrial</span>
                      </div>
                      <span className="text-white/20 font-mono text-[9px]">SOLUÇÃO_B2B</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
