import { ProjectsBoard } from '../components/ProjectsBoard';

export const Showcase = () => {
  return (
    <div className="flex flex-col gap-8 pb-12 animate-in zoom-in-95 fade-in duration-700">
      <div className="mb-4">
        <h2 className="text-4xl font-mono font-bold text-cyber-primary glitch mb-4" data-text="PROJECT_DATABASE">PROJECT_DATABASE</h2>
        <div className="h-1 w-24 bg-gradient-to-r from-cyber-primary to-transparent mb-8"></div>
      </div>
      
      <ProjectsBoard />
    </div>
  );
};
