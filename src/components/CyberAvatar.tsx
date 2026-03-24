import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Cpu, TerminalSquare, MessageSquare, Play } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/sounds';

export const CyberAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("System online. How can I assist?");
  const [showMessage, setShowMessage] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouring, setIsTouring] = useState(false);

  useEffect(() => {
    // Hide initial message after 5 seconds
    const timer = setTimeout(() => setShowMessage(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleJump = (id: string, newMsg: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMessage(newMsg);
      setShowMessage(true);
      setIsOpen(false);
      setTimeout(() => setShowMessage(false), 4000);
    }
  };

  const runTour = async () => {
    if (isTouring) return;
    setIsTouring(true);
    setIsOpen(false);
    
    // Step 1: Landing
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPosition({ x: -window.innerWidth / 2 + 100, y: -window.innerHeight + 300 });
    setMessage("Welcome to my Cyber Intelligence Dashboard! Loading system overview...");
    setShowMessage(true);
    await new Promise(r => setTimeout(r, 3500));
    
    // Step 2: Resume / Action Buttons
    setPosition({ x: -window.innerWidth + 350, y: -window.innerHeight + 300 });
    setMessage("Over here you can view my GitHub, LinkedIn or download my Resume! ↙️");
    await new Promise(r => setTimeout(r, 4000));
    
    // Step 3: Skills
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
    setPosition({ x: -250, y: -window.innerHeight / 2 + 100 });
    setMessage("Scanning Capabilities... Here are my core technical skills and programming languages! 🛠️");
    await new Promise(r => setTimeout(r, 4500));

    // Step 4: Projects
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    setPosition({ x: -window.innerWidth / 2 + 100, y: -200 });
    setMessage("These are my Security Modules & Projects. This is the core of my practical experience. 🔍");
    await new Promise(r => setTimeout(r, 5000));

    // Step 5: Training
    document.getElementById('training')?.scrollIntoView({ behavior: 'smooth' });
    setPosition({ x: -300, y: -window.innerHeight / 2 });
    setMessage("Here is my Summer Training Activity Timeline! 📅");
    await new Promise(r => setTimeout(r, 4000));

    // Step 6: Certifications
    document.getElementById('certifications')?.scrollIntoView({ behavior: 'smooth' });
    setPosition({ x: -window.innerWidth / 2, y: -300 });
    setMessage("And these are my Verified Skills and Certifications! 🏆");
    await new Promise(r => setTimeout(r, 4000));

    // Step 7: Achievements
    document.getElementById('achievements')?.scrollIntoView({ behavior: 'smooth' });
    setPosition({ x: -100, y: -window.innerHeight / 2 + 50 });
    setMessage("Check out my System Milestones and hacking achievements! 🛡️");
    await new Promise(r => setTimeout(r, 4500));

    // Step 8: Extra Activities
    document.getElementById('activities')?.scrollIntoView({ behavior: 'smooth' });
    setPosition({ x: -window.innerWidth / 2 + 50, y: -150 });
    setMessage("Beyond the terminal, here is my Community Field Work! 🌍");
    await new Promise(r => setTimeout(r, 4500));

    // Step 9: Education
    document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' });
    setPosition({ x: -200, y: -300 });
    setMessage("And lastly, my Academic Timeline at Lovely Professional University! 🎓");
    await new Promise(r => setTimeout(r, 4000));

    // Return to base
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPosition({ x: 0, y: 0 });
    setMessage("End of tour! Remember, you can manually drag me anywhere on the screen if you need an assistant.");
    await new Promise(r => setTimeout(r, 5000));
    
    setShowMessage(false);
    setIsTouring(false);
  };

  const navOptions = [
    { label: "Go to Projects", id: "projects", icon: <TerminalSquare className="w-4 h-4" />, msg: "Accessing Security Modules..." },
    { label: "View Capabilities", id: "skills", icon: <Cpu className="w-4 h-4" />, msg: "Scanning System Capabilities..." },
  ];

  return (
    <motion.div
      drag={!isTouring}
      dragMomentum={false}
      className={`fixed bottom-10 right-10 z-[100] flex flex-col items-end ${!isTouring ? 'cursor-move' : 'cursor-default'}`}
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: position.x, y: position.y, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70, damping: 20, delay: 0.1 }}
      onDragEnd={() => {
          // Keep track of manual dragging so it doesn't snap back entirely unless intended
          // However, framer motion handles visual offset automatically with drag.
          // By updating position state here if needed, or simply let drag handle the local delta.
      }}
    >
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="mb-4 mr-4 bg-cyber-bg/95 border border-cyber-primary shadow-glow-primary px-4 py-3 rounded-xl rounded-br-none text-cyber-primary font-mono text-[13px] max-w-[240px] leading-relaxed backdrop-blur-md relative pointer-events-none"
          >
            {message}
            <div className="absolute -bottom-2 right-0 w-4 h-4 bg-cyber-bg border-r border-b border-cyber-primary transform translate-y-[2px] -translate-x-1 skew-x-[-45deg] z-[-1]"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <AnimatePresence>
          {isOpen && !isTouring && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="absolute bottom-full right-full mb-4 mr-[-2rem] w-52 bg-cyber-bg/95 border border-cyber-accent shadow-glow-accent rounded-xl overflow-hidden backdrop-blur-md z-10"
            >
              <div className="p-3 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <span className="text-cyber-accent font-mono text-[10px] uppercase font-bold tracking-widest flex items-center gap-2">
                  <MessageSquare className="w-3 h-3" /> ASSISTANT_MENU
                </span>
                <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="p-2 space-y-1">
                <button
                  onClick={(e) => { playClickSound(); e.stopPropagation(); runTour(); }}
                  onMouseEnter={playHoverSound}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left text-[11px] font-bold font-mono tracking-wide text-cyber-bg bg-cyber-accent hover:bg-cyber-accent/80 rounded transition-colors group"
                >
                  <Play className="w-4 h-4" /> Start Full Tour
                </button>
                <div className="h-px bg-slate-800 my-1 mx-2"></div>
                {navOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={(e) => { playClickSound(); e.stopPropagation(); handleJump(opt.id, opt.msg); }}
                    onMouseEnter={playHoverSound}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left text-[11px] font-mono tracking-wide text-slate-300 hover:bg-cyber-accent/20 hover:text-cyber-accent rounded transition-colors group"
                  >
                    <span className="text-slate-500 group-hover:text-cyber-accent transition-colors">{opt.icon}</span> 
                    {opt.label}
                  </button>
                ))}
                <div className="h-px bg-slate-800 my-1 mx-2"></div>
                <button
                  onClick={(e) => { playClickSound(); e.stopPropagation(); setIsOpen(false); setShowMessage(false); }}
                  onMouseEnter={playHoverSound}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left text-[11px] font-mono tracking-wide text-slate-500 hover:bg-red-500/20 hover:text-red-400 rounded transition-colors group"
                >
                  <span className="text-slate-600 group-hover:text-red-400 transition-colors"><X className="w-4 h-4" /></span> 
                  Hide Assistant
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => { playClickSound(); if (!isTouring) setIsOpen(!isOpen) }}
          onMouseEnter={playHoverSound}
          className={`relative w-16 h-16 rounded-full bg-cyber-bg border-2 border-cyber-primary flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.3)] ${!isTouring ? 'cursor-pointer' : 'cursor-default'} group`}
        >
          {/* Orbital animated rings */}
          <div className="absolute inset-[-4px] border border-cyber-secondary/50 rounded-full animate-[spin_4s_linear_infinite] opacity-50 block"></div>
          <div className="absolute inset-[-8px] border border-dashed border-cyber-accent/50 rounded-full animate-[spin_6s_linear_infinite_reverse] opacity-30 block group-hover:opacity-100 group-hover:border-cyber-accent transition-all duration-300"></div>
          
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-cyber-primary/20 to-cyber-secondary/20 blur-sm"></div>
          <Bot className={`w-8 h-8 text-cyber-primary relative z-10 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)] transition-transform duration-300 ${isOpen || isTouring ? 'scale-110' : ''}`} />
          
          {/* Active indicator */}
          <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-cyber-accent shadow-[0_0_8px_#2dd4bf] animate-pulse"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};
