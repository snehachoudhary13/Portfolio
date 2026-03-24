import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { ParticleBackground } from './ParticleBackground';
import { MatrixRain } from './MatrixRain';
import { CyberAvatar } from './CyberAvatar';
import { CursorGlow } from './CursorGlow';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative min-h-screen flex bg-cyber-bg text-slate-300 font-sans selection:bg-cyber-primary/30 selection:text-white">
      {/* Global Background Elements */}
      <ParticleBackground />
      <MatrixRain />
      
      {/* Navigation */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex flex-col min-h-screen relative z-10 w-full lg:ml-64 lg:w-[calc(100%-16rem)] transition-all duration-300">
        <main className="flex-1 p-4 md:p-8 pt-20 lg:pt-8 overflow-x-hidden">
          {children}
        </main>
        
        <Footer />
      </div>

      {/* Global Foreground Decorations */}
      <CyberAvatar />
      <CursorGlow />
    </div>
  );
};
