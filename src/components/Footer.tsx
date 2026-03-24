export const Footer = () => {
  const currentYear = 2026;

  return (
    <footer className="w-full py-8 mt-20 border-t border-cyber-primary/20 relative z-10 glass-panel border-x-0 border-b-0 rounded-none bg-black/40">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <div className="w-2 h-2 rounded-full bg-cyber-primary shadow-glow-primary animate-pulse"></div>
          <p className="text-slate-400 font-mono text-sm">
            SYSTEM ONLINE
          </p>
        </div>
        
        <p className="text-slate-300 font-mono text-center text-sm md:text-base">
          © {currentYear} Sneha Choudhary. All Rights Reserved.
        </p>

        <div className="mt-4 md:mt-0 opacity-50 text-cyber-primary text-xs font-mono select-none pointer-events-none">
          SECURE_CONNECTION_ESTABLISHED // PORT: 443
        </div>
      </div>
    </footer>
  );
};
