
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white text-black">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-xs font-bold tracking-[0.2em] text-red-600 uppercase mb-4">A Japantech</h2>
            <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight uppercase">
              Foco em agilidade e <br /> <span className="text-red-600">software de alto impacto</span>
            </h3>
            <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
              <p>
                A Japantech nasceu para preencher a lacuna entre a necessidade de software e a demora do mercado tradicional. Somos especialistas em entregas rápidas de alta complexidade.
              </p>
              <p>
                Construímos soluções ponta a ponta: desde landing pages de alta conversão até softwares de gestão empresarial com checkout direto e automações de fluxos via Inteligência Artificial.
              </p>
              
              <div className="flex items-start space-x-6 py-4">
                <blockquote className="border-l-4 border-red-600 pl-6 italic font-bold text-black flex-1">
                  "Agilidade não é pressa, é eficiência. Desenvolvemos ferramentas que trabalham por você."
                </blockquote>
                {/* Red Seal (Hanko) - With hanko animation */}
                <div className="flex-shrink-0 flex flex-col items-center justify-center w-12 h-12 bg-red-600 p-1 border-2 border-red-700 shadow-sm animate-hanko">
                  <span className="font-jp text-white text-[14px] leading-tight font-black">伊</span>
                  <span className="font-jp text-white text-[14px] leading-tight font-black">藤</span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gray-100 rounded-sm overflow-hidden border border-black/5 group">
              <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=800" 
                alt="Agilidade e Software Corporativo" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-black text-white p-6 rounded-sm">
                <div className="text-3xl font-black text-red-600 mb-1">TECH</div>
                <div className="text-sm font-bold uppercase tracking-widest">Performance Máxima</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
