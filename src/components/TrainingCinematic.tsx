import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Lock, Unlock, ShieldCheck, Star, Zap, Medal } from 'lucide-react';

// ─────────────────────── SOUND ───────────────────────────────────────────────
const audioCx = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null;
const playDing = () => {
  if (!audioCx) return;
  const osc = audioCx.createOscillator();
  const gain = audioCx.createGain();
  osc.connect(gain); gain.connect(audioCx.destination);
  osc.type = 'sine'; osc.frequency.setValueAtTime(880, audioCx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1200, audioCx.currentTime + 0.15);
  gain.gain.setValueAtTime(0.3, audioCx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCx.currentTime + 0.6);
  osc.start(); osc.stop(audioCx.currentTime + 0.6);
};

// ─────────────────────── DATA ────────────────────────────────────────────────
const MISSIONS = [
  {
    id: 'nginx',
    title: 'NGINX Deployment',
    dir: 'left' as const,
    icon: '🌐',
    badge: 'NGINX Deployed!',
    xp: 150,
    color: '#38bdf8',
    desc: 'Deployed NGINX inside a Docker container with reverse proxy, GZIP compression, and virtual host configuration. Verified HTTP via internal curl tests.',
    tools: ['Docker', 'NGINX', 'Linux Networking'],
  },
  {
    id: 'firewall',
    title: 'Firewall Configuration',
    dir: 'right' as const,
    icon: '🔥',
    badge: 'Firewall Secured!',
    xp: 200,
    color: '#818cf8',
    desc: 'Applied UFW with a default DENY policy. Whitelisted SSH port 22 and HTTP port 80. Confirmed rule enforcement with nmap port scans.',
    tools: ['UFW', 'iptables', 'nmap'],
  },
  {
    id: 'users',
    title: 'User & Process Management',
    dir: 'left' as const,
    icon: '👤',
    badge: 'Access Granted!',
    xp: 175,
    color: '#a78bfa',
    desc: 'Created system users with least-privilege sudo access. Managed processes via ps, htop, kill, nice. Automated tasks with cron jobs.',
    tools: ['Bash', 'cron', 'htop', 'sudoers'],
  },
  {
    id: 'network',
    title: 'Networking Fundamentals',
    dir: 'right' as const,
    icon: '🔗',
    badge: 'Network Traced!',
    xp: 225,
    color: '#2dd4bf',
    desc: 'Configured static IPs, studied OSI model hands-on. Performed packet sniffing with Wireshark. Used traceroute and mtr for route analysis.',
    tools: ['Wireshark', 'netstat', 'traceroute', 'DNS'],
  },
];

const TOTAL_XP = MISSIONS.reduce((s, m) => s + m.xp, 0);

// ─────────────────────── ACHIEVEMENT TOAST ───────────────────────────────────
interface Toast { id: string; text: string; xp: number; color: string }

const AchievementToast = ({ toast, onDone }: { toast: Toast; onDone: () => void }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <motion.div
      initial={{ x: 120, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 120, opacity: 0 }}
      transition={{ type: 'spring', damping: 18 }}
      className="flex items-center gap-3 bg-[#0d1117] border rounded-lg px-5 py-3 shadow-2xl"
      style={{ borderColor: toast.color, boxShadow: `0 0 20px ${toast.color}40` }}
    >
      <Star className="w-5 h-5 shrink-0" style={{ color: toast.color }} />
      <div>
        <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Achievement Unlocked</p>
        <p className="text-sm font-mono font-bold text-white">{toast.text}</p>
      </div>
    </motion.div>
  );
};

// ─────────────────────── XP BAR ──────────────────────────────────────────────
const XPBar = ({ earned, total, levelUp }: { earned: number; total: number; levelUp: boolean }) => {
  const pct = Math.min((earned / total) * 100, 100);
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">Field Operative XP</span>
        <span className="font-mono text-xs text-cyber-primary">{earned} / {total} XP</span>
      </div>
      <div className="h-4 bg-slate-800 rounded-full overflow-hidden relative">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg,#818cf8,#38bdf8,#2dd4bf)', boxShadow: '0 0 12px #38bdf840' }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        {/* scanline shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite] pointer-events-none" />
      </div>
      <AnimatePresence>
        {levelUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-3 flex items-center justify-center gap-3"
          >
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="font-mono text-lg font-bold text-yellow-400 tracking-widest drop-shadow-[0_0_10px_#facc15]">
              ⬆ LEVEL UP!
            </span>
            <Zap className="w-5 h-5 text-yellow-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─────────────────────── MISSION CARD ────────────────────────────────────────
const MissionCard = ({
  mission, index, onUnlock,
}: {
  mission: typeof MISSIONS[0]; index: number; onUnlock: (m: typeof MISSIONS[0]) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [unlocked, setUnlocked] = useState(false);
  const [flashing, setFlashing] = useState(false);
  const notified = useRef(false);

  useEffect(() => {
    if (inView && !unlocked && !notified.current) {
      notified.current = true;
      const t = setTimeout(() => {
        setFlashing(true);
        setTimeout(() => {
          setFlashing(false);
          setUnlocked(true);
          onUnlock(mission);
        }, 500);
      }, index * 300 + 600);
      return () => clearTimeout(t);
    }
  }, [inView]);

  const fromX = mission.dir === 'left' ? -80 : 80;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromX, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
      className="relative"
    >
      {/* White flash on unlock */}
      <AnimatePresence>
        {flashing && (
          <motion.div
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 rounded-xl z-30 pointer-events-none"
            style={{ background: mission.color, mixBlendMode: 'screen' }}
          />
        )}
      </AnimatePresence>

      <div
        className="glass-panel p-6 overflow-hidden relative transition-all duration-500"
        style={unlocked
          ? { borderColor: `${mission.color}60`, boxShadow: `0 0 20px ${mission.color}20` }
          : { borderColor: '#1e293b' }
        }
      >
        {/* Header row */}
        <div className="flex items-center gap-3 mb-4">
          <div className="text-2xl">{mission.icon}</div>
          <h3 className="font-mono text-lg font-bold text-slate-100 flex-1">{mission.title}</h3>
          <motion.div animate={unlocked ? { rotate: [0, -20, 15, 0], scale: [1, 1.4, 1] } : {}} transition={{ duration: 0.5 }}>
            {unlocked
              ? <Unlock className="w-5 h-5" style={{ color: mission.color }} />
              : <Lock className="w-5 h-5 text-slate-600" />
            }
          </motion.div>
        </div>

        {/* Blurred / revealed content */}
        <motion.div
          animate={{ filter: unlocked ? 'blur(0px)' : 'blur(5px)', opacity: unlocked ? 1 : 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm text-slate-300 leading-relaxed mb-4">{mission.desc}</p>
          <div className="flex flex-wrap gap-2">
            {mission.tools.map(t => (
              <span key={t}
                className="text-[11px] font-mono px-2 py-0.5 rounded border"
                style={{ borderColor: `${mission.color}50`, color: mission.color, background: `${mission.color}10` }}
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Locked overlay */}
        <AnimatePresence>
          {!unlocked && (
            <motion.div exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center rounded-xl bg-slate-900/30 pointer-events-none">
              <div className="text-center">
                <Lock className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-xs font-mono text-slate-600 tracking-widest">CLASSIFIED</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mission objective checker */}
        {unlocked && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 mt-4 border-t border-slate-800 pt-3"
          >
            <ShieldCheck className="w-4 h-4" style={{ color: mission.color }} />
            <span className="text-[11px] font-mono tracking-widest uppercase" style={{ color: mission.color }}>
              OBJECTIVE COMPLETE
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// ─────────────────────── RANK BADGE ──────────────────────────────────────────
const RankBadge = ({ show }: { show: boolean }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="mt-16 flex flex-col items-center gap-4 text-center"
      >
        <motion.div
          animate={{ boxShadow: ['0 0 20px #38bdf840', '0 0 60px #38bdf880', '0 0 20px #38bdf840'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-32 h-32 rounded-full bg-cyber-bg border-4 border-cyber-primary flex items-center justify-center"
        >
          <Medal className="w-14 h-14 text-cyber-primary" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <p className="text-[10px] font-mono text-slate-500 tracking-[0.4em] uppercase mb-1">Rank Achieved</p>
          <h3 className="text-2xl md:text-3xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary text-glow">
            Linux Administrator
          </h3>
          <p className="text-sm font-mono text-slate-400 mt-1 tracking-widest">CERTIFIED FIELD OPERATIVE · LPU 2025</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex gap-1 mt-2"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2 + i * 0.1 }}
            >
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_6px_#facc15]" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// ─────────────────────── MAIN EXPORT ─────────────────────────────────────────
export const TrainingTimeline = () => {
  const [declassified, setDeclassified] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [earnedXP, setEarnedXP] = useState(0);
  const [levelUp, setLevelUp] = useState(false);
  const [rankShown, setRankShown] = useState(false);
  const unlockedCount = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Trigger mission declassification
  useEffect(() => {
    if (inView && !declassified) {
      const t = setTimeout(() => setDeclassified(true), 800);
      return () => clearTimeout(t);
    }
  }, [inView, declassified]);

  const handleUnlock = useCallback((mission: typeof MISSIONS[0]) => {
    playDing();
    setToasts(prev => [...prev, { id: mission.id, text: mission.badge, xp: mission.xp, color: mission.color }]);
    setEarnedXP(prev => {
      const next = prev + mission.xp;
      if (next >= TOTAL_XP) {
        setTimeout(() => setLevelUp(true), 600);
        setTimeout(() => setRankShown(true), 1800);
      }
      return next;
    });
    unlockedCount.current++;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <section ref={sectionRef} id="training" className="py-20 relative z-10 w-full bg-cyber-bg/50 overflow-hidden">

      {/* ── MISSION BRIEFING OVERLAY ─────────────────────────────── */}
      <AnimatePresence>
        {!declassified && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-50 bg-[#020609]/90 backdrop-blur-sm flex flex-col items-center justify-center gap-6 pointer-events-none"
          >
            <motion.div
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="border-4 border-red-500/70 px-8 py-4 rotate-[-2deg]"
              style={{ boxShadow: '0 0 40px rgba(239,68,68,0.3)' }}
            >
              <p className="font-mono text-3xl font-black text-red-500/80 tracking-[0.3em]">TOP SECRET</p>
            </motion.div>
            <p className="font-mono text-slate-400 text-sm tracking-widest animate-pulse">DECLASSIFYING...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── ACHIEVEMENT TOASTS ────────────────────────────────────── */}
      <div className="fixed top-24 right-4 z-[200] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map(t => (
            <AchievementToast key={t.id} toast={t} onDone={() => removeToast(t.id)} />
          ))}
        </AnimatePresence>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── SECTION HEADING ─── cinematic drop */}
        <motion.div
          initial={{ opacity: 0, y: -60, filter: 'blur(12px)' }}
          animate={declassified ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-3xl md:text-4xl font-mono font-bold text-slate-100 text-glow glitch" data-text="Activity Timeline">
              Activity Timeline
            </h2>
            <div className="h-px bg-cyber-secondary/30 flex-1" />
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={declassified ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="font-mono text-[10px] font-bold tracking-[0.3em] border border-green-500/60 text-green-400 px-3 py-1 rounded-full bg-green-500/10"
            >
              ✓ TRAINING COMPLETE
            </motion.span>
          </div>
          <p className="text-slate-400 font-mono text-sm uppercase tracking-widest pl-2 border-l-2 border-cyber-secondary">
            Summer Training · Lovely Professional University · June–July 2025
          </p>
        </motion.div>

        {/* ── XP BAR ─────────────────────────────────────────────── */}
        <XPBar earned={earnedXP} total={TOTAL_XP} levelUp={levelUp} />

        {/* ── MISSION CARDS ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MISSIONS.map((m, i) => (
            <MissionCard key={m.id} mission={m} index={i} onUnlock={handleUnlock} />
          ))}
        </div>

        {/* ── RANK BADGE ───────────────────────────────────────────── */}
        <RankBadge show={rankShown} />
      </div>
    </section>
  );
};
