import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Terminal, ChevronRight } from 'lucide-react';

export const ProjectsBoard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lock scroll when modal is open
  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  const techPills = ['Python', 'Flask', 'REST API', 'Vanilla JS', 'WAF Evasion', 'SSL/TLS', 'AbuseIPDB', 'Cloud Deploy'];

  return (
    <section id="projects" className="py-20 relative z-10 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-10 w-full"
        >
          <Terminal className="w-6 h-6 text-cyber-primary" />
          <h3 className="text-2xl font-mono text-slate-100">Projects</h3>
          <div className="h-[1px] bg-gradient-to-r from-cyber-primary/60 to-transparent flex-1 ml-4 hidden sm:block"></div>
        </motion.div>

        {/* CyberRECON Project Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.01 }}
          className="glass-panel p-8 group relative overflow-hidden border-cyber-primary/30 hover:border-cyber-primary transition-all duration-300 bg-cyber-panel max-w-4xl mx-auto cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="shimmer-overlay"></div>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 z-10">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <h3 className="text-3xl font-mono text-slate-100 font-bold group-hover:text-cyber-primary transition-colors">CybeRECON</h3>
                <div className="flex gap-2">
                  <span className="flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded border border-green-500/30">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                    <span className="text-[10px] font-mono text-green-400 uppercase tracking-widest">LIVE</span>
                  </span>
                  <span className="flex items-center gap-2 bg-cyber-secondary/10 px-3 py-1 rounded border border-cyber-secondary/30">
                    <span className="text-[10px] font-mono text-cyber-secondary uppercase tracking-widest">FULL-STACK</span>
                  </span>
                </div>
              </div>

              <p className="text-slate-300 font-sans leading-relaxed mb-6">
                Interactive threat intelligence platform with a live Python/Flask cloud backend. Real-time WAF evasion, SSL grading, DNS mapping, and IP threat analysis — wrapped in a Matrix-style terminal UI.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {techPills.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-[#0a0f16] border border-slate-700/80 rounded text-xs font-mono text-slate-400 group-hover:border-cyber-primary/30 group-hover:text-cyber-primary/80 transition-colors shadow">
                    {tag}
                  </span>
                ))}
              </div>

              <button className="flex items-center gap-2 text-cyber-primary font-mono text-sm tracking-widest uppercase group-hover:text-white transition-colors relative z-20" onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}>
                View details <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            {/* Project Image/Visual Placeholder */}
            <div className="w-full md:w-1/3 aspect-video bg-[#030712] border border-slate-800 rounded-lg flex items-center justify-center relative overflow-hidden group-hover:border-cyber-primary/50 transition-colors z-10 shadow-inner">
               <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxIiBmaWxsPSJyZ2JhKDAsIDIxMiwgMjU1LCAwLjEpIj48L2NpcmNsZT4KPC9zdmc+')] opacity-50"></div>
               <Terminal className="w-12 h-12 text-cyber-primary/40 group-hover:text-cyber-primary transition-colors duration-500 group-hover:scale-110" />
               <div className="absolute bottom-0 left-0 w-full h-[2px] bg-cyber-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"></div>
            </div>
          </div>
        </motion.div>

        {/* Modal Popup */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" onClick={() => setIsModalOpen(false)}>
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-[#060a10]/50 backdrop-blur-xl"
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-cyber-bg border border-cyber-primary/40 rounded-xl shadow-[0_0_30px_rgba(0,212,255,0.15)] flex flex-col"
              >
                {/* Modal Header */}
                <div className="sticky top-0 z-20 bg-cyber-bg/95 backdrop-blur-sm border-b border-slate-800 p-6 flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-mono font-bold text-slate-100 text-glow">CybeRECON</h2>
                    <p className="text-cyber-primary font-mono text-sm mt-1 tracking-widest uppercase">// Interactive Threat Intelligence Platform</p>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {['Live backend', 'Full-Stack', 'WAF Bypass', 'Cybersecurity'].map(b => (
                        <span key={b} className="px-2 py-1 bg-cyber-primary/10 border border-cyber-primary/20 text-cyber-primary text-[10px] font-mono tracking-widest uppercase rounded">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors group">
                    <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 md:p-8 space-y-10 flex-1">
                  <p className="text-slate-300 font-sans leading-relaxed text-lg sm:text-justify border-l-2 border-slate-700 pl-4">
                    A full-stack cybersecurity reconnaissance tool with a live Python/Flask cloud backend that dynamically connects to external targets for real-time intelligence gathering. Features a cinematic Matrix-style UI and sophisticated WAF evasion logic — using User-Agent rotation and fake-browser header injection to bypass datacenter-level firewalls and retrieve unadulterated intelligence data.
                  </p>

                  {/* Fake Terminal Preview */}
                  <div className="bg-[#030712] border border-slate-800 rounded-lg p-5 font-mono text-xs sm:text-sm overflow-x-auto shadow-inner relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
                    <div className="text-slate-500 mb-2 select-none">$ ./cyberecon --target example.com --stealth</div>
                    <div className="text-green-500/80 mt-2 hover:animate-pulse cursor-default select-none">█</div>
                  </div>


                </div>

                {/* Modal Footer */}
                <div className="sticky bottom-0 z-20 bg-cyber-bg/95 backdrop-blur-sm border-t border-slate-800 p-6 flex flex-wrap gap-4 justify-end rounded-b-xl">
                  <a href="https://github.com/snehachoudhary13/CybeRECON" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-2.5 bg-[#0d1117] hover:bg-slate-800 text-slate-200 rounded font-mono text-sm transition-colors border border-slate-700 shadow-sm">
                    <Github className="w-5 h-5" /> ⌥ GitHub Repo
                  </a>
                  <a href="https://snehachoudhary13.github.io/CybeRECON/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-2.5 bg-cyber-primary/90 hover:bg-cyan-400 text-black font-bold rounded font-mono text-sm transition-all drop-shadow-[0_0_15px_rgba(0,212,255,0.4)] hover:drop-shadow-[0_0_20px_rgba(0,212,255,0.7)] hover:scale-105">
                    <ExternalLink className="w-5 h-5" /> ▶ Live Demo
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
