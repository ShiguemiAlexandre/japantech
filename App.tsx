
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Press from './components/Press';
import GlobalPresence from './components/GlobalPresence';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
        <div className="bg-grid min-h-screen">
          <Header />
          
          <main>
            <Hero />
            <Services />
            <Projects />
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
