import { motion } from 'framer-motion';
import { Code2, Wrench, BrainCircuit, Activity } from 'lucide-react';

const skillCategories = [
  {
    title: "Programming",
    icon: <Code2 className="w-5 h-5 text-cyber-primary" />,
    skills: ["C", "C++", "Python"],
    color: "cyber-primary"
  },
  {
    title: "Tools & Platforms",
    icon: <Wrench className="w-5 h-5 text-cyber-accent" />,
    skills: ["Git", "GitHub", "VS Code", "Kali Linux"],
    color: "cyber-accent"
  },
  {
    title: "Core Concepts",
    icon: <BrainCircuit className="w-5 h-5 text-cyber-primary" />,
    skills: ["DSA", "OOPS", "DBMS", "Operating Systems", "Computer Networks"],
    color: "cyber-primary"
  },
  {
    title: "Soft Skills",
    icon: <Activity className="w-5 h-5 text-cyber-secondary" />,
    skills: ["Adaptability", "Team Player", "Discipline"],
    color: "cyber-secondary"
  }
];

export const SkillsGrid = () => {
  return (
    <section id="skills" className="py-20 relative z-10 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-cyber-primary/30 flex-1"></div>
            <h2 className="text-3xl md:text-4xl font-mono font-bold text-slate-100 text-glow glitch" data-text="System Capabilities">
              System Capabilities
            </h2>
            <div className="h-px bg-cyber-primary/30 flex-1"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-panel p-6 cursor-crosshair group relative overflow-hidden"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6 border-b border-cyber-bg pb-4">
                  {category.icon}
                  <h3 className="text-xl font-mono text-slate-200">
                    {category.title}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-3 py-1 bg-cyber-bg border border-slate-800 rounded text-sm font-mono text-slate-400 group-hover:border-cyber-primary/40 group-hover:text-cyber-primary group-hover:shadow-[0_0_8px_rgba(56,189,248,0.2)] transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Cyber decor nodes */}
              <div className="absolute top-4 right-4 flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-cyber-primary group-hover:shadow-glow-primary transition-all duration-300 delay-100"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-cyber-secondary group-hover:shadow-glow-secondary transition-all duration-300 delay-200"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-cyber-primary group-hover:w-full transition-all duration-500 ease-out"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
