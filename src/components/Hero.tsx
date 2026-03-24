import { motion } from 'framer-motion';
import { Terminal, Github, Linkedin, Download, ChevronRight, ChevronDown } from 'lucide-react';
import { playHoverSound, playClickSound } from '../utils/sounds';

export const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-primary/30 bg-cyber-primary/10 text-cyber-primary mb-6">
              <Terminal className="w-4 h-4" />
              <span className="text-sm font-mono">SYSTEM.READY</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-4 font-mono">
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary text-glow glitch"
                data-text="Sneha Choudhary"
              >
                Sneha Choudhary
              </span>
            </h1>
            
            <h2 className="text-xl md:text-2xl text-slate-300 font-mono mb-6">
              B.Tech CSE Student | <span className="text-cyber-accent">Cybersecurity Enthusiast</span>
            </h2>
            
            <p className="text-lg text-slate-400 mb-8 max-w-xl leading-relaxed">
              Passionate about exploring cybersecurity concepts like reconnaissance, OSINT, and web security. Focused on creating secure, scalable, and user-friendly systems.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8 text-sm md:text-base">
              <a href="#projects" onMouseEnter={playHoverSound} onClick={playClickSound} className="group relative px-6 py-3 bg-cyber-primary/10 border border-cyber-primary text-cyber-primary hover:bg-cyber-primary hover:text-cyber-bg transition-all duration-300 rounded font-mono font-medium flex items-center gap-2 overflow-hidden shadow-glow-primary">
                <span className="relative z-10 flex items-center gap-2">
                  Enter Dashboard <ChevronRight className="w-4 h-4" />
                </span>
                <div className="absolute inset-0 h-full w-0 bg-cyber-primary transition-all duration-300 ease-out group-hover:w-full"></div>
              </a>
              
              <a href="#projects" onMouseEnter={playHoverSound} onClick={playClickSound} className="px-6 py-3 border border-slate-700 hover:border-cyber-secondary text-slate-300 hover:text-cyber-secondary transition-all duration-300 rounded font-mono font-medium flex items-center gap-2 shadow-none hover:shadow-glow-secondary">
                 View Projects
              </a>
              
              <a href="#" onMouseEnter={playHoverSound} onClick={playClickSound} className="px-6 py-3 border border-slate-700 hover:border-cyber-accent text-slate-300 hover:text-cyber-accent transition-all duration-300 rounded font-mono font-medium flex items-center gap-2 shadow-none hover:shadow-glow-accent">
                <Download className="w-4 h-4" /> Resume
              </a>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="https://github.com/snehachoudhary13" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyber-primary transition-colors duration-300">
                <Github className="w-7 h-7" />
              </a>
              <a href="https://www.linkedin.com/in/sneha-choudhary-s1" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyber-primary transition-colors duration-300">
                <Linkedin className="w-7 h-7" />
              </a>
            </div>
          </motion.div>
          
          {/* Right Graphic */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:flex justify-center items-center relative z-10"
          >
            {/* Cyber UI element representation */}
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 border-2 border-cyber-primary rounded-full animate-[spin_10s_linear_infinite] opacity-20"></div>
              <div className="absolute inset-8 border-2 border-dashed border-cyber-secondary rounded-full animate-[spin_15s_linear_infinite_reverse] opacity-40"></div>
              <div className="absolute inset-16 border border-cyber-accent rounded-full animate-pulse opacity-30"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-40 h-40 bg-cyber-bg/50 backdrop-blur-md border border-cyber-primary shadow-glow-primary rounded-xl flex items-center justify-center overflow-hidden">
                  {/* Scanning line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-cyber-primary shadow-[0_0_10px_#38bdf8] animate-[bounce_3s_infinite]"></div>
                  
                  <div className="text-center font-mono">
                    <div className="text-cyber-primary text-sm mb-2 opacity-70">STATUS:</div>
                    <div className="text-cyber-accent text-xl font-bold animate-pulse">SECURE</div>
                  </div>
                </div>
              </div>
              
              {/* Floating nodes */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-10 w-4 h-4 bg-cyber-accent shadow-glow-accent rounded-full"
              />
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 right-0 w-3 h-3 bg-cyber-primary shadow-glow-primary rounded-full"
              />
              <motion.div 
                animate={{ x: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-1/2 -left-8 w-5 h-5 bg-cyber-secondary shadow-glow-secondary rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-2 text-cyber-primary/70 pointer-events-none"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
           animate={{ y: [0, 8, 0] }}
           transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
           <ChevronDown className="w-5 h-5 drop-shadow-[0_0_5px_rgba(56,189,248,0.5)]" />
        </motion.div>
      </motion.div>
    </section>
  );
};
