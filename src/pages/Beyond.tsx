import { Achievements, ExtraActivities } from '../components/MoreSections';

export const Beyond = () => {
  return (
    <div className="flex flex-col gap-12 pb-12 animate-in slide-in-from-bottom-[50px] fade-in duration-700">
      <div className="mb-4">
        <h2 className="text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-warning to-cyber-accent glitch mb-4" data-text="DECRYPTING_THE_HUMAN">DECRYPTING_THE_HUMAN</h2>
        <div className="h-1 w-24 bg-gradient-to-r from-cyber-warning to-transparent mb-8"></div>
        <p className="text-slate-300 font-sans max-w-2xl">
          Beyond the code, I am fascinated by the intersection of philosophy, art, and technology. Here are a few interests and achievements outside my primary domain.
        </p>
      </div>

      <div className="space-y-12">
        <Achievements />
        <ExtraActivities />
      </div>
    </div>
  );
};
