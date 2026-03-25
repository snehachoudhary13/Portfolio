import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SKILL_SPOTS = [
  { id: 0, x: 14, y: 22, category: 'Programming', skills: ['C', 'C++', 'Python'], color: '#00d4ff' },
  { id: 1, x: 38, y: 58, category: 'Tools & Platforms', skills: ['Git', 'GitHub', 'VS Code', 'Kali Linux'], color: '#818cf8' },
  { id: 2, x: 60, y: 26, category: 'Core Concepts', skills: ['DSA', 'OOPS', 'DBMS', 'OS', 'Networks'], color: '#2dd4bf' },
  { id: 3, x: 78, y: 65, category: 'Cybersecurity', skills: ['Nmap', 'Wireshark', 'Metasploit', 'OSINT'], color: '#f59e0b' },
  { id: 4, x: 25, y: 78, category: 'Soft Skills', skills: ['Adaptability', 'Team Player', 'Discipline', 'Leadership'], color: '#e879f9' },
];

// Gun-scope / sniper reticle SVG component
const SniperReticle = ({ color, active, blinking }: { color: string; active: boolean; blinking: boolean }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ filter: `drop-shadow(0 0 ${active ? '10px' : '5px'} ${color})` }}>
    {/* Outer circle */}
    <circle cx="20" cy="20" r="18" stroke={color} strokeWidth={active ? 1.5 : 1} opacity={blinking ? 1 : 0.7} />
    {/* Inner dot */}
    <circle cx="20" cy="20" r="4" fill={color} opacity={blinking ? 1 : 0.6} />
    {/* Cross hairs */}
    <line x1="20" y1="2" x2="20" y2="14" stroke={color} strokeWidth="1.5" />
    <line x1="20" y1="26" x2="20" y2="38" stroke={color} strokeWidth="1.5" />
    <line x1="2" y1="20" x2="14" y2="20" stroke={color} strokeWidth="1.5" />
    <line x1="26" y1="20" x2="38" y2="20" stroke={color} strokeWidth="1.5" />
    {/* Inner ring */}
    <circle cx="20" cy="20" r="10" stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity={0.7} />
    {/* Corner tick marks */}
    {active && (
      <>
        <line x1="6" y1="6" x2="10" y2="6" stroke={color} strokeWidth="1.5" />
        <line x1="6" y1="6" x2="6" y2="10" stroke={color} strokeWidth="1.5" />
        <line x1="34" y1="6" x2="30" y2="6" stroke={color} strokeWidth="1.5" />
        <line x1="34" y1="6" x2="34" y2="10" stroke={color} strokeWidth="1.5" />
        <line x1="6" y1="34" x2="10" y2="34" stroke={color} strokeWidth="1.5" />
        <line x1="6" y1="34" x2="6" y2="30" stroke={color} strokeWidth="1.5" />
        <line x1="34" y1="34" x2="30" y2="34" stroke={color} strokeWidth="1.5" />
        <line x1="34" y1="34" x2="34" y2="30" stroke={color} strokeWidth="1.5" />
      </>
    )}
  </svg>
);

export const SkillsGrid = () => {
  const [activeSpot, setActiveSpot] = useState<number | null>(null);
  const [cameraAngle, setCameraAngle] = useState(0);
  const [spotlight, setSpotlight] = useState<{ x: number; y: number; color: string } | null>(null);
  const [blinkStates, setBlinkStates] = useState<boolean[]>(SKILL_SPOTS.map(() => true));
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Randomly blink the dots
  useEffect(() => {
    tickRef.current = setInterval(() => {
      setBlinkStates(prev => prev.map((_, i) => (i === activeSpot ? true : Math.random() > 0.3)));
    }, 600);
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, [activeSpot]);

  const handleSpotClick = (spot: typeof SKILL_SPOTS[0]) => {
    if (activeSpot === spot.id) {
      setActiveSpot(null);
      setSpotlight(null);
      setCameraAngle(0);
      return;
    }
    const targetAngle = ((spot.x - 50) / 50) * 30;
    setCameraAngle(targetAngle);
    setActiveSpot(spot.id);
    setSpotlight({ x: spot.x, y: spot.y, color: spot.color });
  };

  const activeSkill = SKILL_SPOTS.find(s => s.id === activeSpot);

  return (
    <section id="skills" className="py-20 relative z-10 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-xs text-red-400 tracking-widest uppercase">CCTV Surveillance Active</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-mono font-bold text-slate-100 text-glow glitch mb-2" data-text="Skills">Skills</h2>
          <p className="text-slate-500 font-mono text-sm">Target the red dots to reveal classified skill data</p>
        </motion.div>

        {/* Main container - camera + dark arena side by side on large screens */}
        <div className="relative">
          
          {/* ── CCTV Camera — blends into the wall corner ── */}
          <div className="absolute -top-4 right-2 z-30 pointer-events-none select-none"
            style={{ width: '260px' }}>
            {/* Wall plate / mount */}
            <div className="absolute top-0 right-0 w-full h-full"
              style={{
                background: 'linear-gradient(135deg, #060a12 40%, #0f172a 75%, transparent 100%)',
                borderRadius: '0 0 0 18px',
                opacity: 0.92,
                boxShadow: 'inset 0 0 30px rgba(0,0,0,0.55)',
                mixBlendMode: 'screen'
              }} />
            {/* Camera image rotates to track clicked spot */}
            <motion.div
              animate={{ rotate: cameraAngle }}
              transition={{ type: 'spring', stiffness: 50, damping: 14 }}
              style={{ transformOrigin: '210px 42px' }}
            >
              <img
                src="/cctv_camera.png"
                alt="CCTV Camera"
                className="w-full object-contain"
                style={{
                  filter: 'drop-shadow(0 0 25px rgba(255,0,80,0.35)) drop-shadow(0 0 30px rgba(0,212,255,0.25)) brightness(0.95)',
                  mixBlendMode: 'screen',
                  maxHeight: '200px',
                }}
              />
            </motion.div>
            {/* Scan beam from camera lens */}
            <motion.div
              className="absolute pointer-events-none"
              style={{ top: '64px', right: '210px', width: '240px', height: '2px',
                background: 'linear-gradient(to left, rgba(255,64,122,0.45), transparent)',
                transformOrigin: 'right center' }}
              animate={{ rotate: [-15 + cameraAngle, 15 + cameraAngle, -15 + cameraAngle] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* ── Dark surveillance arena ── */}
          <div
            className="relative w-full overflow-hidden rounded-xl border border-slate-800/60"
            style={{
              minHeight: '620px',
              background: 'radial-gradient(ellipse at 80% 0%, #050b16 0%, #02060d 55%, #010305 100%)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.03), inset 0 0 120px rgba(255,0,80,0.08)',
            }}
          >
            {/* Scanlines overlay */}
            <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.06]"
              style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.8) 2px, rgba(0,0,0,0.8) 4px)' }} />

            {/* Noise texture */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")' }} />

            {/* CCTV header bar */}
            <div className="absolute top-3 left-4 font-mono text-xs z-30 flex items-center gap-3 text-red-500/60">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                REC ●
              </span>
              <span className="text-slate-600">CAM-01</span>
              <span className="text-slate-700">{new Date().toLocaleTimeString()}</span>
            </div>
            {/* Corner bracket decorations */}
            {[
              'top-2 left-2 border-t border-l',
              'top-2 right-2 border-t border-r',
              'bottom-2 left-2 border-b border-l',
              'bottom-2 right-2 border-b border-r',
            ].map((cls, i) => (
              <div key={i} className={`absolute w-5 h-5 border-slate-700/60 ${cls}`} />
            ))}

            {/* Spotlight radial glow following clicked dot */}
            <AnimatePresence>
              {spotlight && (
                <motion.div
                  key="spotlight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute pointer-events-none z-10"
                  style={{
                    left: `${spotlight.x}%`, top: `${spotlight.y}%`,
                    transform: 'translate(-50%, -50%)',
                    width: '380px', height: '380px',
                    background: `radial-gradient(circle, ${spotlight.color}20 0%, ${spotlight.color}08 40%, transparent 70%)`,
                    boxShadow: `0 0 80px ${spotlight.color}20`,
                  }}
                />
              )}
            </AnimatePresence>

            {/* Sniper reticle dots */}
            {SKILL_SPOTS.map((spot) => (
              <motion.button
                key={spot.id}
                className="absolute z-20 cursor-crosshair group"
                style={{ left: `${spot.x}%`, top: `${spot.y}%`, transform: 'translate(-50%, -50%)' }}
                onClick={() => handleSpotClick(spot)}
                whileHover={{ scale: 1.25 }}
              >
                {/* Outer pulsing ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: spot.id * 0.3 }}
                  style={{ border: `2px solid ${activeSpot === spot.id ? spot.color : '#ef4444'}`, borderRadius: '50%',
                    width: '40px', height: '40px', top: '0', left: '0' }}
                />
                <motion.div
                  animate={{ opacity: blinkStates[spot.id] ? 1 : 0.15 }}
                  transition={{ duration: 0.2 }}
                >
                  <SniperReticle
                    color={activeSpot === spot.id ? spot.color : '#ef4444'}
                    active={activeSpot === spot.id}
                    blinking={blinkStates[spot.id]}
                  />
                </motion.div>
                {/* Hover label */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 font-mono text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-slate-300 bg-black/80 border border-slate-700/50 px-2 py-0.5 rounded pointer-events-none">
                  {spot.category}
                </div>
              </motion.button>
            ))}

            {/* Skill reveal card */}
            <AnimatePresence>
              {activeSpot !== null && activeSkill && (
                <motion.div
                  key={activeSpot}
                  initial={{ opacity: 0, scale: 0.7, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.8, filter: 'blur(8px)' }}
                  transition={{ type: 'spring', stiffness: 250, damping: 22 }}
                  className="absolute z-30 glass-panel p-6"
                  style={{
                    left: `${Math.min(Math.max(activeSkill.x, 18), 65)}%`,
                    top: `${Math.min(Math.max(activeSkill.y + 14, 10), 62)}%`,
                    transform: 'translate(-50%, 0)',
                    borderColor: `${activeSkill.color}50`,
                    minWidth: '200px',
                    boxShadow: `0 0 40px ${activeSkill.color}25, inset 0 0 20px ${activeSkill.color}05`,
                  }}
                >
                  {/* Header with target lock indicator */}
                  <div className="font-mono text-[10px] mb-3 flex items-center gap-2 uppercase tracking-widest" style={{ color: activeSkill.color }}>
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: activeSkill.color }} />
                    TARGET LOCKED · {activeSkill.category}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeSkill.skills.map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, y: 8, scale: 0.85 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: i * 0.07 }}
                        className="px-3 py-1.5 rounded-sm font-mono text-sm border"
                        style={{ borderColor: `${activeSkill.color}50`, color: activeSkill.color, background: `${activeSkill.color}12` }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Idle hint */}
            {activeSpot === null && (
              <div className="absolute inset-0 flex items-end justify-center pb-6 pointer-events-none z-10">
                <motion.p
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                  className="font-mono text-[11px] text-slate-700 tracking-widest uppercase"
                >
                  ▶ Acquire target — Click the red reticles to reveal skills
                </motion.p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
