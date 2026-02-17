
import React from 'react';

const DIFFERENTIATORS = [
  "Soluções sob medida",
  "Foco em resultado real",
  "Visualização clara de dados",
  "Tecnologia aplicada ao negócio",
  "Atendimento estratégico"
];

const Differentiators: React.FC = () => {
  return (
    <section id="diferenciais" className="py-24 bg-zinc-900 border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-1 gap-4">
              {DIFFERENTIATORS.map((diff, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-4 p-6 bg-black border border-white/5 rounded-sm hover:border-red-600/50 transition-colors group"
                >
                  <div className="w-6 h-6 rounded-full border-2 border-red-600 flex items-center justify-center flex-shrink-0 group-hover:bg-red-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3 text-red-600 group-hover:text-black">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <span className="text-lg font-bold text-gray-200 uppercase tracking-tight">{diff}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <h2 className="text-xs font-bold tracking-[0.2em] text-red-600 uppercase mb-4">Por que nos escolher?</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white uppercase leading-tight mb-8">
              DIFERENCIAL <br /> <span className="text-red-600">COMPETITIVO</span>
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Não entregamos apenas código. Entregamos soluções que resolvem problemas reais e geram ROI direto para o seu negócio.
            </p>
            <div className="p-8 border border-red-600/20 bg-red-600/5 rounded-sm">
              <p className="text-white font-medium italic">
                "O mercado mudou. Hoje, quem não utiliza dados para decidir está deixando dinheiro na mesa. A Japantech é a ponte entre sua operação e a inteligência de mercado."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Differentiators;
