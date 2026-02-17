
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Differentiators from './components/Differentiators';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
      <div className="bg-grid min-h-screen">
        <Header />
        
        <main>
          <Hero />
          <About />
          <Services />
          <Projects />
          <Differentiators />
          <FinalCTA />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;
