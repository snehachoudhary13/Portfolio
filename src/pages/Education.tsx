import { EducationTimeline } from '../components/Timeline';

export const Education = () => {
  return (
    <div className="flex flex-col gap-8 pb-12 animate-in slide-in-from-bottom-[50px] fade-in duration-700">
      <div className="mb-4">
        <h2 className="text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-warning to-cyber-primary glitch mb-4" data-text="ACADEMIC_RECORD">ACADEMIC_RECORD</h2>
        <div className="h-1 w-24 bg-gradient-to-r from-cyber-warning to-transparent mb-8"></div>
      </div>
      
      <EducationTimeline />
    </div>
  );
};
