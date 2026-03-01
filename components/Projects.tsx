
import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import TranslatedText from './TranslatedText';

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const PROJECTS: Project[] = [
    {
      id: '01',
      title: t.projects.items.pmc.title,
      category: t.projects.items.pmc.category,
      description: t.projects.items.pmc.description,
      imageUrl: 'https://img.freepik.com/premium-photo/fortune-telling-tarot-cards-astrology-fortune-telling_687292-7657.jpg',
      url: 'https://www.ciganasoraya.com',
      previewUrl: 'https://www.ciganasoraya.com'
    },
    {
      id: '02',
      title: t.projects.items.tanganika.title,
      category: t.projects.items.tanganika.category,
      description: t.projects.items.tanganika.description,
      imageUrl: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9af?auto=format&fit=crop&q=80&w=800', 
      url: 'https://storage.googleapis.com/tanganika/index.html',
      previewUrl: 'https://storage.googleapis.com/tanganika/index.html'
    },
    {
      id: '03',
      title: t.projects.items.legal_insight.title,
      category: t.projects.items.legal_insight.category,
      description: t.projects.items.legal_insight.description,
      imageUrl: '', 
      previewUrl: '' 
    },
    {
      id: '04',
      title: t.projects.items.hidrau.title,
      category: t.projects.items.hidrau.category,
      description: t.projects.items.hidrau.description,
      imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800',
      url: 'https://storage.googleapis.com/hidraucomp/index.html',
      previewUrl: 'https://storage.googleapis.com/hidraucomp/index.html'
    }
  ];

  // Update active project when language changes or on init
  useEffect(() => {
    console.log('Projects: useEffect triggered. t changed or init.');
    if (!activeProject) {
      console.log('Projects: No active project, setting default:', PROJECTS[0]);
      setActiveProject(PROJECTS[0]);
    } else {
      // Find the currently active project in the new translated array
      const updatedProject = PROJECTS.find(p => p.id === activeProject.id);
      console.log('Projects: Updating active project:', updatedProject);
      if (updatedProject) {
        setActiveProject(updatedProject);
      }
    }
  }, [t]);

  const handleProjectChange = (project: Project) => {
    console.log('Projects: handleProjectChange', project);
    setActiveProject(project);
    setIsLoading(true);
  };

  console.log('Projects: Rendering. activeProject:', activeProject);

  if (!activeProject) {
      console.log('Projects: activeProject is null, returning null');
      return null;
  }

  return (
    <section id="projetos" className="py-24 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-900/10 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-[1px] bg-red-600"></div>
            <span className="text-xs font-mono text-red-600 uppercase tracking-widest">
              <TranslatedText text={t.projects.label} duration={1000} />
            </span>
          </div>
          <h3 className="text-5xl md:text-7xl font-black text-white uppercase leading-none mb-8">
            <TranslatedText text={t.projects.title} duration={1200} /> <span className="text-red-600">/</span> <TranslatedText text={t.projects.title_highlight} duration={1200} delay={200} />
          </h3>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 h-full">
          {/* Project List */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {PROJECTS.map((project, index) => (
              <div
                key={project.id}
                onClick={() => handleProjectChange(project)}
                className={`group text-left p-6 border transition-all duration-300 relative overflow-hidden cursor-pointer ${
                  activeProject.id === project.id 
                    ? 'border-red-600 bg-zinc-900' 
                    : 'border-white/10 hover:border-white/30 bg-black'
                }`}
              >
                <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${
                  activeProject.id === project.id ? 'bg-red-600' : 'bg-transparent group-hover:bg-red-600/50'
                }`} />
                
                <div className="flex justify-between items-start mb-2">
                  <span className={`font-mono text-xs transition-colors ${
                    activeProject.id === project.id ? 'text-red-500' : 'text-gray-500'
                  }`}>
                    [{project.id}]
                  </span>
                  {activeProject.id === project.id && (
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  )}
                </div>
                
                <h4 className={`text-xl font-bold uppercase mb-2 transition-colors ${
                  activeProject.id === project.id ? 'text-white' : 'text-gray-400 group-hover:text-white'
                }`}>
                  <TranslatedText text={project.title} duration={1000} delay={index * 100} />
                </h4>
                
                <p className="text-xs text-gray-500 font-mono uppercase tracking-tight mb-2">
                  {project.category}
                </p>

                <AnimatePresence>
                  {activeProject.id === project.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-400 text-sm leading-relaxed mb-4 mt-2">
                        <TranslatedText text={project.description} duration={1500} delay={200} />
                      </p>

                      {project.id === '03' && (
                        <div className="mb-4 p-4 border border-red-900/50 bg-black rounded-sm">
                           <div className="flex items-center gap-3 mb-2">
                              <div className="w-4 h-4 text-red-600 animate-pulse">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                              </div>
                              <h3 className="text-sm font-black text-red-600 uppercase tracking-widest">{t.projects.secret.title}</h3>
                           </div>
                           <p className="text-red-500 font-mono text-[10px] mb-2">{t.projects.secret.access_denied}</p>
                           <div className="flex justify-between text-[9px] font-mono text-red-700 border-t border-red-900/30 pt-2">
                              <span>{t.projects.secret.encryption}</span>
                              <span>{t.projects.secret.status}</span>
                           </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 mt-4">
                        <span className="px-2 py-1 border border-white/10 text-[10px] font-mono text-gray-500 uppercase">
                          STATUS: {project.id === '01' ? t.projects.status_beta : t.projects.status_live}
                        </span>
                        
                        {project.url && (
                          <a 
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 px-4 py-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold uppercase tracking-widest transition-colors rounded-sm ml-auto"
                          >
                            {t.projects.access_project}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="h-full flex flex-col border border-white/10 bg-zinc-900/50 backdrop-blur-sm rounded-lg overflow-hidden"
              >
                {/* Browser Chrome */}
                <div className="h-8 bg-zinc-950 border-b border-white/10 flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                  </div>
                  <div className="flex-1 text-center">
                    <div className="inline-block px-3 py-0.5 rounded-md bg-black/50 text-[10px] font-mono text-gray-500 truncate max-w-[200px]">
                      {activeProject.url || activeProject.previewUrl || 'local://system.internal'}
                    </div>
                  </div>
                </div>

                {/* Preview Content */}
                <div className="flex-1 relative bg-black min-h-[400px] lg:min-h-[500px]">
                  {activeProject.id === '03' ? (
                    <div className="w-full h-full relative flex items-center justify-center bg-zinc-950 overflow-hidden">
                      {/* Secret/Classified Background */}
                      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                      <div className="absolute inset-0 bg-grid opacity-10" />
                      
                      {/* Animated Rings */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                         <div className="w-96 h-96 border border-red-900/50 rounded-full animate-[spin_20s_linear_infinite]" />
                         <div className="absolute w-64 h-64 border border-red-900/50 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                         <div className="absolute w-48 h-48 border border-red-500/20 rounded-full animate-pulse" />
                      </div>

                      {/* Fake Terminal Code Background */}
                      <div className="absolute inset-0 p-8 opacity-10 font-mono text-[10px] text-red-500 overflow-hidden pointer-events-none select-none">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div key={i} className="whitespace-nowrap animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
                            {`> ACCESS_LOG: ENCRYPTED_DATA_PACKET_${Math.random().toString(36).substring(7).toUpperCase()} // SECURE_CHANNEL`}
                          </div>
                        ))}
                      </div>

                      {/* Central Lock UI */}
                      <div className="relative z-10 flex flex-col items-center gap-6 p-12 border border-red-900/50 bg-black/80 backdrop-blur-md rounded-lg max-w-md text-center">
                        <div className="w-16 h-16 rounded-full bg-red-900/20 flex items-center justify-center border border-red-500/30 animate-pulse">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                          </svg>
                        </div>
                        
                        <div>
                          <h3 className="text-2xl font-black text-white uppercase tracking-widest mb-2">
                            SYSTEM LOCKED
                          </h3>
                          <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-red-600 to-transparent mb-4 opacity-50"></div>
                          <p className="text-gray-400 text-sm font-mono leading-relaxed">
                            {t.projects.secret.description}
                          </p>
                        </div>

                        <div className="px-4 py-2 border border-red-600/30 bg-red-900/10 rounded text-[10px] font-mono text-red-400 uppercase tracking-widest">
                          {t.projects.secret.access_denied}
                        </div>
                      </div>
                    </div>
                  ) : activeProject.previewUrl ? (
                    <div className="w-full h-full relative group">
                      {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 z-10">
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                            <span className="text-[10px] font-mono text-gray-500 animate-pulse">{t.projects.loading}</span>
                          </div>
                        </div>
                      )}
                      <iframe
                        src={activeProject.previewUrl}
                        title={`Preview of ${activeProject.title}`}
                        className={`w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                        sandbox="allow-scripts allow-same-origin"
                        onLoad={() => setIsLoading(false)}
                      />
                      {/* Overlay for interaction hint */}
                      <div className={`absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-0 transition-opacity pointer-events-none ${isLoading ? 'hidden' : ''}`}>
                        <span className="text-white font-mono text-xs bg-black px-2 py-1">{t.projects.interactive_preview}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full relative">
                      <img 
                        src={activeProject.imageUrl} 
                        alt={activeProject.title}
                        className="w-full h-full object-cover opacity-60"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    </div>
                  )}

                  {/* Project Info Overlay - Removed to allow interaction */}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;