
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const whatsappUrl = "https://api.whatsapp.com/send?phone=5516996398116&text=Olá%20Japantech!%20Gostaria%20de%20falar%20com%20um%20especialista.";
  const instagramUrl = "https://www.instagram.com/japantech_solutions/";
  const email = "japantechsolutions@gmail.com";

  // Impede o scroll do body quando o menu está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: t.header.about, href: '#about' },
    { name: t.header.services, href: '#services' },
    { name: t.header.projects, href: '#projetos' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    setIsMenuOpen(false);

    if (element) {
      setTimeout(() => {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 300); // Pequeno delay para esperar o fechamento do menu
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-black/95 border-b border-white/10 h-20">
      <div className="container mx-auto px-6 h-full flex items-center justify-between relative z-[120]">
        {/* Logo */}
        <a 
          href="#" 
          className="flex items-center space-x-2 group" 
          onClick={(e) => { 
            e.preventDefault(); 
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
            setIsMenuOpen(false);
          }}
        >
          <div className="w-8 h-8 bg-red-600 rounded-sm flex flex-col items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 p-0.5">
            <span className="text-black font-jp text-[9px] font-black leading-none">伊</span>
            <span className="text-black font-jp text-[9px] font-black leading-none">藤</span>
          </div>
          <span className="text-xl font-bold tracking-tighter uppercase text-white">
            JAPAN<span className="text-red-600">TECH</span>
          </span>
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-[11px] font-bold tracking-[0.15em]">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleLinkClick(e, link.href)}
              className="hover:text-red-500 transition-colors uppercase py-2 text-white"
            >
              {link.name}
            </a>
          ))}
          
          <div className="flex items-center gap-4 border-l border-white/10 pl-6 ml-2">
            <button
              onClick={toggleLanguage}
              className="text-white hover:text-red-600 transition-colors font-mono text-[10px] uppercase"
              title="Switch Language"
            >
              {language === 'pt' ? 'EN' : 'PT'}
            </button>
            <a 
              href={instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-red-600 transition-colors"
              title="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a 
              href={`mailto:${email}`}
              className="text-white hover:text-red-600 transition-colors"
              title="Email"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>

          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-sm font-bold transition-all hover:scale-105 active:scale-95 uppercase text-[10px]"
          >
            {t.header.contact}
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2 w-10 h-10 flex flex-col items-end justify-center space-y-1.5 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Alternar Menu"
        >
          <span className={`block h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'w-6 translate-y-2 rotate-45' : 'w-6'}`}></span>
          <span className={`block h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'w-4'}`}></span>
          <span className={`block h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'w-6 -translate-y-2 -rotate-45' : 'w-5'}`}></span>
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div 
        className={`fixed inset-0 bg-zinc-950 z-[110] md:hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="flex flex-col h-full px-6 pt-32 pb-10 justify-between">
          <nav className="flex flex-col space-y-6">
            {navLinks.map((link, idx) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-xl font-black tracking-widest uppercase text-white border-b border-white/5 pb-4 transition-all duration-300 ${
                  isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <span className="text-red-600 mr-4 font-mono text-sm">0{idx + 1}</span>
                {link.name}
              </a>
            ))}
            <button
              onClick={toggleLanguage}
              className={`text-xl font-black tracking-widest uppercase text-white border-b border-white/5 pb-4 text-left transition-all duration-300 ${
                isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: `${navLinks.length * 100}ms` }}
            >
              <span className="text-red-600 mr-4 font-mono text-sm">0{navLinks.length + 1}</span>
              {language === 'pt' ? 'English' : 'Português'}
            </button>
          </nav>
          
          <div className={`space-y-8 transition-all duration-500 delay-400 ${
            isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full bg-red-600 text-white py-5 rounded-sm font-black uppercase text-center text-sm tracking-widest shadow-xl shadow-red-600/10 active:scale-[0.98]"
            >
              {t.header.contact}
            </a>
            
            <div className="flex justify-between items-center text-gray-500 text-[9px] uppercase tracking-[0.2em] font-bold">
              <div className="flex gap-4">
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-white transition-colors">Instagram</a>
                <a href={`mailto:${email}`} className="text-red-600 hover:text-white transition-colors">Email</a>
              </div>
              <div className="flex space-x-4">
                <span className="text-gray-600">{t.header.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
