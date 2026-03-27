
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import TranslatedText from './TranslatedText';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [uptime, setUptime] = useState('00:00:00');
  const whatsappUrl = "https://api.whatsapp.com/send?phone=5516996398116&text=Olá%20Japantech!%20Gostaria%20de%20falar%20com%20um%20especialista%20sobre%20soluções%20para%20minha%20empresa.";
  const instagramUrl = "https://www.instagram.com/japantech_solutions/";

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const diff = Date.now() - start;
      const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
      const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
      const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
      setUptime(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('projetos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Side Status Indicators - Left */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-12 text-[10px] font-mono text-red-600/40 uppercase tracking-[0.3em] vertical-text">
        <div className="flex items-center gap-4">
          <span className="animate-pulse"><TranslatedText text={t.hero.system_online} duration={1000} /></span>
          <div className="w-[1px] h-20 bg-red-600/20"></div>
        </div>
        <div className="flex items-center gap-4">
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
            <TranslatedText text={`${t.hero.social}: @japantech_solutions`} duration={1200} />
          </a>
          <div className="w-[1px] h-20 bg-red-600/20"></div>
        </div>
        <div className="flex items-center gap-4">
          <span><TranslatedText text={`${t.hero.uptime}: ${uptime}`} duration={1000} /></span>
          <div className="w-[1px] h-20 bg-red-600/20"></div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8 text-left">
          <div className="inline-flex items-center gap-3 px-3 py-1 mb-6 border-l-2 border-red-600 bg-red-600/5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-red-600 animate-pulse"></span>
            <span className="text-red-500 text-[10px] font-mono font-bold tracking-widest uppercase">
              <TranslatedText text={t.hero.protocol} duration={800} />
            </span>
          </div>
          
          <h1 className="text-5xl md:text-[6.5rem] font-black mb-8 leading-[0.9] tracking-tighter uppercase">
            <TranslatedText text={t.hero.title_part1} duration={1000} delay={0} /> <span className="text-white"><TranslatedText text={t.hero.title_part2} duration={1000} delay={500} /></span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-white"><TranslatedText text={t.hero.title_part3} duration={1000} delay={1000} /></span> <br />
            <TranslatedText text={t.hero.title_part4} duration={1000} delay={1500} />
          </h1>
          
          <p className="text-gray-400 max-w-xl text-lg mb-10 font-light border-l border-white/10 pl-6">
            <TranslatedText text={t.hero.subtitle} duration={1500} delay={2000} />
          </p>

          <div className="flex flex-wrap gap-6">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-red-600 text-white px-10 py-5 font-black text-sm uppercase tracking-tighter transition-all hover:pr-14 flex items-center justify-center"
            >
              <span className="relative z-10">{t.header.contact}</span>
              <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left opacity-10"></div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-0 group-hover:opacity-100 transition-all">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            
            <a 
              href="#projetos"
              onClick={handleScrollToProjects}
              className="flex items-center gap-6 px-6 border border-white/10 group hover:border-red-600/50 transition-colors"
            >
              <div className="text-[10px] font-mono leading-none">
                <div className="text-gray-500 uppercase mb-1">
                  <TranslatedText text={t.hero.scroll} duration={800} />
                </div>
                <div className="text-white font-bold">
                  <TranslatedText text={t.projects.title_highlight} duration={800} delay={200} />
                </div>
              </div>
              <div className="w-10 h-10 flex items-center justify-center border border-white/10 group-hover:bg-white/5 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5 7.5M12 21V3" />
                </svg>
              </div>
            </a>
          </div>
        </div>

        {/* Floating Tech Component - Right */}
        <div className="lg:col-span-4 hidden lg:block relative">
          <div className="relative z-10 p-8 border border-red-600/20 bg-black/40 backdrop-blur-xl animate-float-status">
            <div className="flex justify-between items-start mb-8">
              <div className="font-jp text-4xl text-white/10 select-none">伊藤</div>
              <div className="text-red-600 font-mono text-[10px] tracking-tighter animate-pulse">CORE ●</div>
            </div>
            <div className="space-y-4 font-mono text-[10px]">
              <div className="flex justify-between text-gray-500">
                <span><TranslatedText text={t.hero.business_intel} duration={1000} /></span>
                <span className="text-white"><TranslatedText text={t.hero.active} duration={800} /></span>
              </div>
              <div className="h-1 bg-white/5 overflow-hidden">
                <div className="h-full bg-red-600 w-full animate-pulse"></div>
              </div>
              <div className="flex justify-between text-gray-500">
                <span><TranslatedText text={t.hero.data_flow} duration={1000} /></span>
                <span className="text-white"><TranslatedText text={t.hero.streaming} duration={800} /></span>
              </div>
              <div className="h-1 bg-white/5 overflow-hidden">
                <div className="h-full bg-red-600 w-4/5"></div>
              </div>
            </div>
          </div>
          {/* Decorative Ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-red-600/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-t border-red-600/5 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
        <div className="w-[1px] h-12 bg-gradient-to-b from-red-600 to-transparent"></div>
        <span className="text-[9px] font-mono uppercase tracking-[0.4em] vertical-text">{t.hero.scroll}</span>
      </div>
    </section>
  );
};

export default Hero;
