import React from 'react';
import { motion } from 'motion/react';
import { ScanBarcode, ShoppingCart, TriangleAlert, Users, ArrowUpRight, BadgeCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import TranslatedText from './TranslatedText';

const PRODUCT_URL = 'https://erp.japantech.com.br';
const FEATURE_ICONS = [ScanBarcode, ShoppingCart, TriangleAlert, Users];

/**
 * In-house product showcase (jAPPa ERP).
 * Kept separate from the client portfolio (Projects) on purpose: this is a
 * Japantech-owned product. The preview is a static tablet mockup instead of an
 * iframe — the real app is behind a login, and a third-party iframe would add
 * another slow-loading resource to the page.
 */
const Product: React.FC = () => {
  const { t } = useLanguage();
  const p = t.product;

  return (
    <section id="produtos" className="relative py-24 overflow-hidden bg-zinc-950 border-t border-red-600/40">
      {/* Kanji watermark */}
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
        <span className="font-jp text-[14rem] md:text-[22rem] leading-none font-black text-white">伊藤</span>
      </div>
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-red-900/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section heading */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-[1px] bg-red-600"></div>
            <span className="text-xs font-mono text-red-600 uppercase tracking-widest">
              <TranslatedText text={p.label} duration={1000} />
            </span>
          </div>
          <h3 className="text-5xl md:text-7xl font-black text-white uppercase leading-none mb-6">
            <TranslatedText text={p.title} duration={1200} /> <span className="text-red-600">/</span> <TranslatedText text={p.title_highlight} duration={1200} delay={200} />
          </h3>
          <p className="text-gray-400 max-w-xl">
            <TranslatedText text={p.description} duration={1200} delay={300} />
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-12 gap-0 border border-red-600/60 bg-black relative"
        >
          {/* Corner accents */}
          <div className="absolute -top-px -left-px w-6 h-6 border-t-2 border-l-2 border-red-600" />
          <div className="absolute -bottom-px -right-px w-6 h-6 border-b-2 border-r-2 border-red-600" />

          {/* Info */}
          <div className="lg:col-span-6 p-8 md:p-12 flex flex-col">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-600 text-white text-[10px] font-bold font-mono uppercase tracking-widest">
                <BadgeCheck className="w-3.5 h-3.5" />
                {p.badge}
              </span>
              <span className="px-2 py-1 border border-white/10 text-[10px] font-mono text-gray-500 uppercase">
                {p.status}
              </span>
            </div>

            <h4 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none mb-2">
              {p.name}
            </h4>
            <p className="text-xs text-red-500 font-mono uppercase tracking-widest mb-6">{p.category}</p>

            <p className="text-xl text-white/90 font-light leading-snug mb-4">
              <TranslatedText text={p.tagline} duration={1200} />
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              <TranslatedText text={p.summary} duration={1500} delay={200} />
            </p>

            <ul className="grid sm:grid-cols-2 gap-4 mb-10">
              {p.features.map((f, i) => {
                const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
                return (
                  <li key={i} className="p-4 border border-white/10 bg-zinc-900/60 hover:border-red-600/50 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-red-600" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">{f.title}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                  </li>
                );
              })}
            </ul>

            <div className="mt-auto flex flex-wrap items-center gap-4">
              <a
                href={PRODUCT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest transition-colors rounded-sm"
              >
                {p.cta}
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <span className="text-[10px] font-mono text-gray-600">{p.domain}</span>
            </div>
          </div>

          {/* Static tablet mockup (no iframe) */}
          <div className="lg:col-span-6 relative bg-zinc-900/80 border-t lg:border-t-0 lg:border-l border-white/10 flex items-center justify-center p-8 md:p-12 overflow-hidden" aria-hidden="true">
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="relative w-full max-w-md rounded-2xl border-4 border-zinc-800 bg-black shadow-2xl shadow-red-900/20">
              <div className="h-7 bg-zinc-950 border-b border-white/10 flex items-center justify-between px-4 rounded-t-xl">
                <span className="font-jp text-xs text-red-600">伊藤</span>
                <span className="text-[9px] font-mono text-gray-500">{p.name.toUpperCase()}</span>
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-3 p-3 border border-red-600/60 bg-zinc-950">
                  <ScanBarcode className="w-5 h-5 text-red-600 shrink-0" />
                  <span className="font-mono text-sm text-white tracking-widest">7891234567895</span>
                  <span className="ml-auto w-0.5 h-4 bg-red-600 animate-pulse" />
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-900 border border-white/5">
                  <div>
                    <p className="text-xs font-bold text-white uppercase">{p.features[0].title}</p>
                    <p className="text-[10px] font-mono text-gray-500">−1 UN</p>
                  </div>
                  <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-bold uppercase">OK</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[{ v: '12', l: p.features[1].title }, { v: '3', l: p.features[2].title }, { v: '4', l: p.features[3].title }].map((k, i) => (
                    <div key={i} className="p-3 bg-zinc-900 border border-white/5">
                      <p className={`text-2xl font-black ${i === 1 ? 'text-red-600' : 'text-white'}`}>{k.v}</p>
                      <p className="text-[8px] font-mono text-gray-500 uppercase leading-tight mt-1">{k.l}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {[80, 55, 30].map((w, i) => (
                    <div key={i} className="h-2 bg-zinc-900">
                      <div className={`h-2 ${i === 2 ? 'bg-red-600' : 'bg-zinc-700'}`} style={{ width: `${w}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Product;
