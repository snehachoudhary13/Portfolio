import { motion } from 'framer-motion';

const ongoingProjects = [
  {
    title: "Quantum Cipher Engine",
    description: "Developing a post-quantum cryptography library tailored for embedded systems.",
    progress: 65,
    status: "IMPLEMENTATION",
    tags: ["Rust", "Cryptography", "Assembly"]
  },
  {
    title: "Neural Threat Detector",
    description: "Training a custom transformer model to detect Zero-Day vulnerabilities in raw network traffic.",
    progress: 30,
    status: "DATA_GATHERING",
    tags: ["PyTorch", "Python", "PCAP"]
  },
  {
    title: "HyperVisor V2",
    description: "A lightweight type-2 hypervisor for secure sandbox analyzing of malware streams.",
    progress: 85,
    status: "TESTING",
    tags: ["C++", "OS Internals", "Security"]
  }
];

export const Ongoing = () => {
  return (
    <div className="flex flex-col gap-8 pb-12 animate-in slide-in-from-bottom-[50px] fade-in duration-700">
      <div className="mb-4">
        <h2 className="text-4xl font-mono font-bold text-cyber-accent glitch mb-4" data-text="ACTIVE_OPERATIONS">ACTIVE_OPERATIONS</h2>
        <div className="h-1 w-24 bg-gradient-to-r from-cyber-accent to-transparent mb-8"></div>
        <p className="text-slate-300">Tracking progress on current initiatives and in-development tools.</p>
      </div>

      <div className="grid gap-6">
        {ongoingProjects.map((project, index) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            key={project.title} 
            className="glass-panel p-6 border-l-2 border-cyber-accent group"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
              <h3 className="text-xl font-bold font-mono text-white group-hover:text-cyber-accent transition-colors">{project.title}</h3>
              <div className="flex items-center gap-2 text-xs font-mono px-3 py-1 bg-cyber-primary/10 text-cyber-primary border border-cyber-primary/30 rounded-full shadow-[0_0_10px_rgba(0,212,255,0.2)]">
                <div className="w-2 h-2 rounded-full bg-cyber-primary animate-pulse"></div>
                {project.status}
              </div>
            </div>
            
            <p className="text-slate-400 text-sm mb-6">{project.description}</p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map(tag => (
                <span key={tag} className="text-xs text-cyber-secondary border border-cyber-secondary/30 px-2 py-0.5 rounded bg-cyber-secondary/5 font-mono">
                  {tag}
                </span>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>COMPLETION</span>
                <span>{project.progress}%</span>
              </div>
              <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden border border-cyber-border">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1, type: 'spring' }}
                  className="h-full bg-gradient-to-r from-cyber-primary via-cyber-accent to-cyber-secondary relative"
                >
                  <div className="absolute top-0 right-0 bottom-0 w-8 bg-white/30 blur-[2px] -translate-x-full animate-scanbar"></div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
