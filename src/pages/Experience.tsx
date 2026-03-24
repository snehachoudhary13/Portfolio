import { TrainingTimeline as TrainingCinematic } from '../components/TrainingCinematic';

export const Experience = () => {
  return (
    <div className="flex flex-col gap-8 pb-12 animate-in slide-in-from-bottom-[50px] fade-in duration-700">
      <div className="mb-4">
        <h2 className="text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-accent to-cyber-secondary glitch mb-4" data-text="FIELD_EXPERIENCE">FIELD_EXPERIENCE</h2>
        <div className="h-1 w-24 bg-gradient-to-r from-cyber-accent to-transparent mb-8"></div>
      </div>
      
      <TrainingCinematic />
    </div>
  );
};
