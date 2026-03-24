import { SkillsGrid } from '../components/SkillsGrid';
import { SkillRadar } from '../components/SkillRadar';

export const About = () => {
  return (
    <div className="flex flex-col gap-12 pb-12 animate-in slide-in-from-bottom-[50px] fade-in duration-700">
      <div className="mb-8">
        <h2 className="text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary glitch mb-4" data-text="ABOUT_ME">ABOUT_ME</h2>
        <div className="h-1 w-24 bg-gradient-to-r from-cyber-primary to-transparent mb-8"></div>
        <div className="glass-panel p-6 border-l-4 border-l-cyber-accent">
          <p className="text-lg leading-relaxed text-slate-300 font-sans">
            I'm a passionate developer focused on building immersive, high-performance web applications and secure systems. With a strong foundation in both frontend and backend technologies, I enjoy reverse-engineering complex problems and crafting elegant, efficient solutions in code.
          </p>
        </div>
      </div>
      
      <SkillsGrid />
      
      <div className="mt-8">
        <SkillRadar />
      </div>
    </div>
  );
};
