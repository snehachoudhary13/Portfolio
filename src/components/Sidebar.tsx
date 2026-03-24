import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, User, GraduationCap, Briefcase, 
  LayoutGrid, Clock, FileText, Compass, Mail,
  Menu, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/about', label: 'About', icon: User },
  { path: '/education', label: 'Education', icon: GraduationCap },
  { path: '/experience', label: 'Experience', icon: Briefcase },
  { path: '/showcase', label: 'Showcase', icon: LayoutGrid },
  { path: '/ongoing', label: 'Ongoing', icon: Clock },
  { path: '/posts', label: 'Posts', icon: FileText },
  { path: '/beyond', label: 'Beyond', icon: Compass },
  { path: '/contact', label: 'Contact', icon: Mail }
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 glass-panel text-cyber-primary text-glow"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-cyber-bg/80 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <motion.aside
        initial={false}
        animate={{ 
          x: isOpen ? 0 : -300,
          opacity: 1
        }}
        className={`fixed left-0 top-0 h-screen w-64 glass-panel border-l-0 border-y-0 border-r-cyber-primary/20 
          z-40 flex flex-col justify-center
          lg:translate-x-0 ${isOpen ? '' : '-translate-x-full transition-transform duration-300'}
        `}
      >
        <nav className="flex flex-col gap-2 p-4 h-full overflow-y-auto custom-scrollbar justify-center">
          <div className="mb-8 px-4 text-center">
            <h2 className="text-2xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary glitch text-glow" data-text="PORTFOLIO">PORTFOLIO</h2>
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-cyber-primary to-transparent mt-2 opacity-50"></div>
          </div>

          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path;
            
            return (
              <NavLink
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 relative overflow-hidden group
                  ${isActive ? 'bg-cyber-primary/10 text-cyber-primary shadow-[inset_0_0_10px_rgba(0,212,255,0.2)]' : 'text-slate-400 hover:text-cyber-accent hover:bg-white/5'}
                `}
              >
                {/* Active Indicator Line */}
                {isActive && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute left-0 top-0 w-1 h-full bg-cyber-primary shadow-glow-primary"
                  />
                )}
                
                <Icon size={20} className={`transition-all duration-300 ${isActive ? 'drop-shadow-[0_0_8px_rgba(0,212,255,0.5)]' : 'group-hover:drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]'}`} />
                <span className={`font-mono tracking-wider ${isActive ? 'font-semibold text-glow' : 'group-hover:text-glow-accent'}`}>{label}</span>
                
                {/* Hover scanline effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-scanbar z-0 pointer-events-none"></div>
              </NavLink>
            );
          })}
        </nav>
      </motion.aside>
    </>
  );
};
