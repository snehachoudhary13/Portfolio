import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, ChevronRight } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';

const socialLinks = [
  { name: 'GitHub', icon: Github, url: 'https://github.com/snehachoudhary13', color: 'hover:text-white', border: 'group-hover:border-white/50' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/sneha-choudhary-s1/', color: 'hover:text-[#0077b5]', border: 'group-hover:border-[#0077b5]/50' },
  { name: 'LeetCode', icon: SiLeetcode, url: 'https://leetcode.com', color: 'hover:text-[#ffa116]', border: 'group-hover:border-[#ffa116]/50' },
  { name: 'Twitter / X', icon: Twitter, url: 'https://twitter.com', color: 'hover:text-white', border: 'group-hover:border-white/50' }
];

export const Contact = () => {
  return (
    <div className="flex flex-col gap-8 pb-12 animate-in slide-in-from-bottom-[50px] fade-in duration-700 max-w-4xl mx-auto items-center text-center mt-10 md:mt-20">
      
      <div className="relative mb-8">
        <div className="absolute -inset-4 bg-cyber-primary/20 blur-2xl rounded-full z-0 pointer-events-none mix-blend-screen opacity-50"></div>
        <h2 className="text-5xl md:text-6xl font-mono font-bold text-white relative z-10 text-glow">Let's Connect</h2>
        <p className="text-cyber-primary font-mono mt-4 relative z-10 tracking-widest text-sm">INITIATE_HANDSHAKE_PROTOCOL</p>
      </div>

      <p className="text-slate-300 text-lg md:text-xl max-w-2xl mb-8 relative z-10">
        I'm currently open to new opportunities, collaborations, and freelance projects. Whether you have a question or just want to say hi, my inbox is always open.
      </p>

      {/* Social Links Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-12 relative z-10">
        {socialLinks.map((link, i) => {
          const Icon = link.icon;
          return (
            <motion.a 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className={`glass-panel p-6 flex flex-col items-center justify-center gap-3 group transition-all duration-300 ${link.border}`}
            >
              <Icon size={32} className={`text-slate-400 transition-colors duration-300 ${link.color}`} />
              <span className="font-mono text-sm text-slate-300">{link.name}</span>
            </motion.a>
          );
        })}
      </div>

      {/* Direct Email CTA */}
      <motion.a 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        href="mailto:simmi121412@gmail.com"
        className="relative z-10 inline-flex items-center gap-3 px-8 py-4 bg-cyber-primary/10 border border-cyber-primary/50 rounded-lg text-cyber-primary font-mono font-bold hover:bg-cyber-primary hover:text-black hover:shadow-glow-primary transition-all duration-300 group overflow-hidden"
      >
        <Mail size={20} className="relative z-10" />
        <span className="relative z-10 tracking-wider">ESTABLISH_CONNECTION</span>
        <ChevronRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform" />
        
        {/* Hover slice animation */}
        <div className="absolute inset-0 bg-cyber-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>
      </motion.a>

    </div>
  );
};
