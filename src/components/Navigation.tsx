import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Menu, X } from 'lucide-react';
import { playHoverSound, playClickSound } from '../utils/sounds';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Capabilities', path: '/capabilities' },
  { name: 'Modules', path: '/modules' },
  { name: 'Activity', path: '/activity' },
  { name: 'Verification', path: '/verification' },
  { name: 'Academic Timeline', path: '/education' },
  { name: 'Contact', path: '/contact' },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-cyber-bg/90 backdrop-blur-md border-b border-cyber-primary/20 shadow-glow-primary' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer group" onMouseEnter={playHoverSound} onClick={() => { playClickSound(); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
            <Shield className="w-8 h-8 text-cyber-primary group-hover:text-cyber-accent transition-colors" />
            <span className="text-xl font-mono font-bold text-slate-100 text-glow">SOC_SYS_</span>
          </Link>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onMouseEnter={playHoverSound}
                    onClick={() => { playClickSound(); window.scrollTo({top: 0, behavior: 'smooth'}); }}
                    className={`relative px-3 py-2 font-mono text-sm tracking-widest uppercase transition-colors duration-200 group ${isActive ? 'text-cyber-primary' : 'text-slate-400 hover:text-cyber-primary'}`}
                  >
                    {item.name}
                    {/* Underline scan animation */}
                    <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-cyber-primary transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                    <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-cyber-primary/50 shadow-[0_0_8px_#00d4ff] transition-transform duration-300 origin-left delay-75 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onMouseEnter={playHoverSound}
              onClick={() => { playClickSound(); setMobileMenuOpen(!mobileMenuOpen); }}
              className="text-cyber-primary hover:text-cyber-accent focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-cyber-bg border-b border-cyber-primary/20"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onMouseEnter={playHoverSound}
                  onClick={() => { playClickSound(); setMobileMenuOpen(false); window.scrollTo({top: 0, behavior: 'smooth'}); }}
                  className={`relative block px-3 py-2 rounded-md font-mono text-base uppercase group w-fit ${isActive ? 'text-cyber-primary' : 'text-slate-400 hover:text-cyber-primary'}`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-cyber-primary transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </nav>
  );
};
