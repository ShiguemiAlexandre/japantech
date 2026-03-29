import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import TranslatedText from './TranslatedText';
import { ExternalLink, Quote } from 'lucide-react';

const Press: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="press" className="relative py-24 overflow-hidden border-y border-white/5 bg-black">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Side: Editorial Style Quote */}
          <div className="w-full md:w-2/3">
            <div className="mb-8">
              <span className="text-red-500 font-mono text-xs tracking-[0.3em] uppercase block mb-4">
                <TranslatedText text={t.press.label} />
              </span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none mb-6">
                <TranslatedText text={t.press.title} /> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
                  <TranslatedText text={t.press.title_highlight} />
                </span>
              </h2>
              <p className="text-gray-400 max-w-xl text-lg">
                <TranslatedText text={t.press.description} />
              </p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative p-8 md:p-12 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm group"
            >
              <Quote className="absolute -top-6 -left-6 w-12 h-12 text-red-500/20" />
              
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-12 bg-red-500" />
                <span className="font-serif italic text-2xl tracking-tight text-white/90">Forbes Uruguay</span>
              </div>

              <blockquote className="text-2xl md:text-3xl font-light leading-snug text-white mb-8">
                "<TranslatedText text={t.press.forbes_quote} />"
              </blockquote>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                    <span className="text-red-500 font-bold text-xs">FC</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white uppercase tracking-wider">Flyclean</p>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Global Partner</p>
                  </div>
                </div>

                <a 
                  href="https://www.forbesuruguay.com/negocios/se-inspiro-shows-drones-creo-empresa-limpieza-altura-ahora-expande-latam-europa-inversion-us-2-millones-n88205"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-red-500 hover:text-red-400 transition-colors group/link"
                >
                  <TranslatedText text={t.press.read_more} />
                  <ExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Visual Element */}
          <div className="w-full md:w-1/3 relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 relative group">
              <img 
                src="https://storage.googleapis.com/www.japantech.com.br/public/drone_flycleaner.jpg" 
                alt="Flyclean Drone Innovation" 
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>

            {/* Floating Badge */}
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 2, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-6 -right-6 w-32 h-32 bg-red-600 rounded-full flex flex-col items-center justify-center text-center p-4 shadow-2xl shadow-red-600/20 border border-white/20 z-10"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 leading-tight">Featured In</span>
              <span className="text-xl font-serif italic font-bold text-white">Forbes</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Press;
