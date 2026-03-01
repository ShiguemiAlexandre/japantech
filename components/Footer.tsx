
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import TranslatedText from './TranslatedText';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const whatsappUrl = "https://api.whatsapp.com/send?phone=5516996398116&text=Olá%20Japantech!%20Gostaria%20de%20mais%20informações%20sobre%20seus%20serviços.";
  const instagramUrl = "https://www.instagram.com/japantech_solutions/";
  const email = "japantechsolutions@gmail.com";

  return (
    <footer className="bg-black py-10 border-t border-white/5 relative overflow-hidden">
      {/* Subtle watermark with animation */}
      <div className="absolute right-0 bottom-0 opacity-[0.03] select-none pointer-events-none animate-watermark">
        <span className="font-jp text-[15rem] md:text-[20rem] leading-none font-black text-white">伊藤</span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-red-600 rounded-sm flex flex-col items-center justify-center p-0.5">
                <span className="text-black font-jp text-[7px] font-black leading-none">伊</span>
                <span className="text-black font-jp text-[7px] font-black leading-none">藤</span>
              </div>
              <span className="text-xl font-bold tracking-tighter uppercase">
                JAPAN<span className="text-red-600">TECH</span>
              </span>
            </div>
            <p className="text-gray-500 max-w-md leading-relaxed text-sm">
              <TranslatedText text={t.footer.description} duration={1000} />
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase mb-4 text-xs tracking-widest">
              <TranslatedText text={t.footer.nav_title} duration={800} />
            </h4>
            <ul className="space-y-2 text-gray-500 text-xs">
              <li><a href="#about" className="hover:text-red-500 transition-colors"><TranslatedText text={t.header.about} duration={800} delay={100} /></a></li>
              <li><a href="#services" className="hover:text-red-500 transition-colors"><TranslatedText text={t.header.services} duration={800} delay={200} /></a></li>
              <li><a href="#projetos" className="hover:text-red-500 transition-colors"><TranslatedText text={t.header.projects} duration={800} delay={300} /></a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase mb-4 text-xs tracking-widest">
              <TranslatedText text={t.footer.contact_title} duration={800} delay={200} />
            </h4>
            <ul className="space-y-2 text-gray-500 text-xs">
              <li><a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a></li>
              <li><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">+55 (16) 99639-8116</a></li>
              <li><TranslatedText text={t.header.location} duration={800} delay={400} /></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-[10px] uppercase tracking-widest">
            © {currentYear} <TranslatedText text={t.footer.rights} duration={1000} delay={500} />
          </p>
          <div className="flex items-center space-x-6 text-gray-600">
            <div className="flex flex-col items-center justify-center w-5 h-5 bg-red-600/20 p-0.5 rounded-xs mr-2 opacity-50 grayscale hover:grayscale-0 transition-all group">
               <span className="font-jp text-red-600 text-[5px] font-black group-hover:scale-110 transition-transform">伊</span>
               <span className="font-jp text-red-600 text-[5px] font-black group-hover:scale-110 transition-transform">藤</span>
            </div>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-[10px]">WhatsApp</a>
            <a href={`mailto:${email}`} className="hover:text-white transition-colors text-[10px]">Email</a>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-[10px]">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
