import { motion } from 'framer-motion';
import { ChevronRight, Calendar } from 'lucide-react';

const posts = [
  {
    title: "Reverse Engineering the Matrix: A Guide to Binary Analysis",
    date: "2026-02-15",
    description: "An in-depth writeup on disassembling unknown binaries and identifying obfuscated cyber threats.",
    readTime: "8 min read"
  },
  {
    title: "Building Zero-Trust Architecture from Scratch",
    date: "2026-01-22",
    description: "How to implement absolute zero-trust policies inside modern microservice architectures.",
    readTime: "12 min read"
  },
  {
    title: "The Subtle Art of Kernel Hooking",
    date: "2025-11-30",
    description: "Exploring ring-0 execution patterns and writing safe, undetectable hooks for telemetry.",
    readTime: "15 min read"
  }
];

export const Posts = () => {
  return (
    <div className="flex flex-col gap-8 pb-12 animate-in slide-in-from-bottom-[50px] fade-in duration-700">
      <div className="mb-4">
        <h2 className="text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-secondary to-cyber-primary glitch mb-4" data-text="TRANSMISSIONS">TRANSMISSIONS</h2>
        <div className="h-1 w-24 bg-gradient-to-r from-cyber-secondary to-transparent mb-8"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            key={post.title} 
            className="glass-panel p-6 flex flex-col group cursor-pointer"
          >
            <div className="shimmer-overlay"></div>
            
            <div className="flex items-center gap-2 text-cyber-primary/70 font-mono text-xs mb-3">
              <Calendar size={12} />
              <span>{post.date}</span>
              <span className="mx-1">•</span>
              <span>{post.readTime}</span>
            </div>
            
            <h3 className="text-lg font-bold font-mono text-white group-hover:text-cyber-primary transition-colors mb-3">
              {post.title}
            </h3>
            
            <p className="text-slate-400 text-sm flex-grow mb-6">
              {post.description}
            </p>
            
            <div className="mt-auto">
              <span className="inline-flex items-center gap-1 text-sm font-mono text-cyber-secondary group-hover:text-cyber-accent transition-colors">
                READ_FILE <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
