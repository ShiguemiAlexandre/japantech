
import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Product from './components/Product';
import Press from './components/Press';
import GlobalPresence from './components/GlobalPresence';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  // Deep links (/#produtos, /#projetos...): the browser tries to jump to the anchor while
  // parsing the HTML, but in dev (and whenever React re-creates the tree on the client)
  // the target section doesn't exist yet, so the jump is lost. Re-apply it once mounted.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    let jumpedTo: number | null = null;
    const jump = () => {
      const el = document.getElementById(id);
      if (!el) return;
      // Same 80px offset (fixed header, h-20) used by the header nav links.
      // offsetTop chain ignores the reveal transform (translateY) still applied to sections.
      let top = -80;
      for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) top += n.offsetTop;
      window.scrollTo({ top, behavior: 'instant' as ScrollBehavior });
      jumpedTo = window.scrollY;
    };
    const raf = requestAnimationFrame(jump);
    // Layout above the target keeps moving for a moment (styles/fonts/images loading, the
    // TranslatedText scramble re-wrapping lines). Keep the target pinned while the page
    // settles, but stop as soon as the user interacts or after a few seconds.
    const stop = () => {
      ro.disconnect();
      clearTimeout(timer);
      USER_EVENTS.forEach((e) => window.removeEventListener(e, stop));
    };
    const ro = new ResizeObserver(() => {
      if (jumpedTo !== null && Math.abs(window.scrollY - jumpedTo) < 2) jump();
    });
    ro.observe(document.body);
    const timer = setTimeout(stop, 4000);
    const USER_EVENTS = ['wheel', 'touchstart', 'keydown', 'mousedown'] as const;
    USER_EVENTS.forEach((e) => window.addEventListener(e, stop, { passive: true }));
    return () => {
      cancelAnimationFrame(raf);
      stop();
    };
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
        <div className="bg-grid min-h-screen">
          <Header />
          
          <main>
            <Hero />
            <Services />
            <Projects />
            <Product />
            <Press />
            <GlobalPresence />
            <FinalCTA />
          </main>

          <Footer />
        </div>
      </div>
    </LanguageProvider>
  );
};

export default App;
