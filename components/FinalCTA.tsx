
import React from 'react';

const FinalCTA: React.FC = () => {
  const whatsappUrl = "https://api.whatsapp.com/send?phone=5516996398116&text=Olá%20Japantech!%20Vi%20o%20site%20e%20gostaria%20de%20falar%20com%20um%20especialista%20sobre%20soluções%20de%20automação%20e%20sistemas%20para%20o%20meu%20negócio.";

  return (
    <section className="bg-red-600 py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-8 leading-tight">
          Sua empresa está <br /> pronta para evoluir?
        </h2>
        <p className="text-white text-xl md:text-2xl mb-12 max-w-2xl mx-auto opacity-90">
          Fale com a Japantech e leve inteligência estratégica para o seu negócio.
        </p>
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-black hover:bg-zinc-900 text-white px-12 py-5 rounded-sm font-black text-lg transition-all hover:scale-105 active:scale-95 uppercase tracking-tighter cursor-none"
        >
          Falar com Especialista
        </a>
      </div>

      {/* Decorative Accents */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 translate-x-1/3 translate-y-1/3 rounded-full"></div>
    </section>
  );
};

export default FinalCTA;
