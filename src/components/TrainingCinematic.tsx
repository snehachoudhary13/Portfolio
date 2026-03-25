import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Lock, Medal, ShieldCheck, Star, Unlock } from 'lucide-react';

const getAudioCx = () => {
  if (typeof window === 'undefined') return null;
  const win = window as any;
  if (!win._audioCx) {
    const Ctor = win.AudioContext || win.webkitAudioContext;
    if (Ctor) win._audioCx = new Ctor();
  }
  return win._audioCx || null;
};

const playDing = () => {
  const audioCx = getAudioCx();
  if (!audioCx) return;
  const osc = audioCx.createOscillator();
  const gain = audioCx.createGain();
  osc.connect(gain);
  gain.connect(audioCx.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, audioCx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1200, audioCx.currentTime + 0.15);
  gain.gain.setValueAtTime(0.3, audioCx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCx.currentTime + 0.6);
  osc.start();
  osc.stop(audioCx.currentTime + 0.6);
};

const MISSIONS = [
  {
    id: 'nginx',
    title: 'NGINX Deployment',
    dir: 'left' as const,
    badge: 'NGINX Deployed',
    color: '#38bdf8',
    desc: 'Deployed NGINX inside Docker with reverse proxy, GZIP compression, and virtual host configuration.',
    tools: ['Docker', 'NGINX', 'Linux Networking'],
  },
  {
    id: 'firewall',
    title: 'Firewall Configuration',
    dir: 'right' as const,
    badge: 'Firewall Secured',
    color: '#818cf8',
    desc: 'Applied UFW with a default deny policy and verified access rules with scan validation.',
    tools: ['UFW', 'iptables', 'nmap'],
  },
  {
    id: 'users',
    title: 'User and Process Management',
    dir: 'left' as const,
    badge: 'Access Granted',
    color: '#a78bfa',
    desc: 'Created least-privilege users, managed services, and automated recurring tasks with cron.',
    tools: ['Bash', 'cron', 'htop', 'sudoers'],
  },
  {
    id: 'network',
    title: 'Networking Fundamentals',
    dir: 'right' as const,
    badge: 'Network Traced',
    color: '#2dd4bf',
    desc: 'Worked through packet capture, DNS analysis, route tracing, and static network configuration.',
    tools: ['Wireshark', 'netstat', 'traceroute', 'DNS'],
  },
];

const TRAINING_CERTIFICATE = {
  title: 'Linux Training Certificate',
  image:
    'https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/73737ed0-0c87-44c6-99a3-73fa8778ebad.png',
};

interface Toast {
  id: string;
  text: string;
  color: string;
}

const AchievementToast = ({ toast, onDone }: { toast: Toast; onDone: () => void }) => {
  useEffect(() => {
    const timeoutId = setTimeout(onDone, 3000);
    return () => clearTimeout(timeoutId);
  }, [onDone]);

  return (
    <motion.div
      initial={{ x: 120, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 120, opacity: 0 }}
      transition={{ type: 'spring', damping: 18 }}
      className="flex items-center gap-3 rounded-lg border bg-[#0d1117] px-5 py-3 shadow-2xl"
      style={{ borderColor: toast.color, boxShadow: `0 0 20px ${toast.color}40` }}
    >
      <Star className="h-5 w-5 shrink-0" style={{ color: toast.color }} />
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
          Achievement Unlocked
        </p>
        <p className="text-sm font-mono font-bold text-white">{toast.text}</p>
      </div>
    </motion.div>
  );
};

const MissionCard = ({
  mission,
  index,
  onUnlock,
  activeMission,
  onSelect,
}: {
  mission: (typeof MISSIONS)[number];
  index: number;
  onUnlock: (mission: (typeof MISSIONS)[number]) => void;
  activeMission: string | null;
  onSelect: (missionId: string | null) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [unlocked, setUnlocked] = useState(true);
  const [flashing, setFlashing] = useState(false);
  const notified = useRef(false);
  const isActive = activeMission === mission.id;
  const isDimmed = activeMission !== null && activeMission !== mission.id;

  useEffect(() => {
    if (inView && !unlocked && !notified.current) {
      notified.current = true;
      const timeoutId = setTimeout(() => {
        setFlashing(true);
        setTimeout(() => {
          setFlashing(false);
          setUnlocked(true);
          onUnlock(mission);
        }, 500);
      }, index * 300 + 600);
      return () => clearTimeout(timeoutId);
    }
  }, [inView, unlocked, mission, onUnlock, index]);

  const fromX = mission.dir === 'left' ? -80 : 80;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromX, filter: 'blur(8px)' }}
      animate={
        inView
          ? {
              opacity: isDimmed ? 0.32 : 1,
              x: 0,
              filter: isDimmed ? 'blur(6px)' : 'blur(0px)',
              scale: isActive ? 1.03 : 1,
            }
          : {}
      }
      transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
      onClick={() => {
        if (unlocked) {
          onSelect(isActive ? null : mission.id);
        }
      }}
      className="relative"
      style={{ zIndex: isActive ? 20 : 10 }}
    >
      <AnimatePresence>
        {flashing && (
          <motion.div
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none absolute inset-0 z-30 rounded-xl"
            style={{ background: mission.color, mixBlendMode: 'screen' }}
          />
        )}
      </AnimatePresence>

      <div
        className="glass-panel relative overflow-hidden p-6 transition-all duration-500"
        style={
          unlocked
            ? {
                borderColor: isActive ? `${mission.color}90` : `${mission.color}60`,
                boxShadow: isActive
                  ? `0 0 40px ${mission.color}35`
                  : `0 0 20px ${mission.color}20`,
              }
            : { borderColor: '#1e293b' }
        }
      >
        <div className="mb-4 flex items-center gap-3">
          <div
            className="rounded border px-2 py-1 text-[10px] font-mono uppercase tracking-[0.2em]"
            style={{
              borderColor: `${mission.color}50`,
              color: mission.color,
              background: `${mission.color}10`,
            }}
          >
            Mission
          </div>
          <h3 className="flex-1 font-mono text-lg font-bold text-slate-100">{mission.title}</h3>
          <motion.div
            animate={unlocked ? { rotate: [0, -20, 15, 0], scale: [1, 1.4, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            {unlocked ? (
              <Unlock className="h-5 w-5" style={{ color: mission.color }} />
            ) : (
              <Lock className="h-5 w-5 text-slate-600" />
            )}
          </motion.div>
        </div>

        <motion.div
          animate={{ filter: unlocked ? 'blur(0px)' : 'blur(5px)', opacity: unlocked ? 1 : 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 text-sm leading-relaxed text-slate-300">{mission.desc}</p>
          <div className="flex flex-wrap gap-2">
            {mission.tools.map((tool) => (
              <span
                key={tool}
                className="rounded border px-2 py-0.5 text-[11px] font-mono"
                style={{
                  borderColor: `${mission.color}50`,
                  color: mission.color,
                  background: `${mission.color}10`,
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {!unlocked && (
            <motion.div
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center rounded-xl bg-slate-900/30"
            >
              <div className="text-center">
                <Lock className="mx-auto mb-2 h-8 w-8 text-slate-600" />
                <p className="text-xs font-mono tracking-widest text-slate-600">CLASSIFIED</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {unlocked && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 flex items-center gap-2 border-t border-slate-800 pt-3"
          >
            <ShieldCheck className="h-4 w-4" style={{ color: mission.color }} />
            <span
              className="text-[11px] font-mono uppercase tracking-widest"
              style={{ color: mission.color }}
            >
              Objective Complete
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

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
          className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-cyber-primary bg-cyber-bg"
        >
          <Medal className="h-14 w-14 text-cyber-primary" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <p className="mb-1 text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500">
            Rank Achieved
          </p>
          <h3 className="text-2xl font-mono font-bold text-transparent text-glow bg-gradient-to-r from-cyber-primary to-cyber-secondary bg-clip-text md:text-3xl">
            Linux Administrator
          </h3>
          <p className="mt-1 text-sm font-mono tracking-widest text-slate-400">
            Summer Training - LPU 2025
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-2 flex gap-1"
        >
          {[...Array(5)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2 + index * 0.1 }}
            >
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 drop-shadow-[0_0_6px_#facc15]" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export const TrainingTimeline = () => {
  const [activeMission, setActiveMission] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [rankShown, setRankShown] = useState(true);
  const unlockedCount = useRef(0);

  const handleUnlock = (mission: (typeof MISSIONS)[number]) => {
    playDing();
    setToasts((prev) => [...prev, { id: mission.id, text: mission.badge, color: mission.color }]);
    unlockedCount.current += 1;
    if (unlockedCount.current >= MISSIONS.length) {
      setTimeout(() => setRankShown(true), 800);
    }
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <section id="training" className="relative z-10 w-full overflow-hidden bg-cyber-bg/50 py-20">
      <div className="fixed right-4 top-24 z-[200] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <AchievementToast key={toast.id} toast={toast} onDone={() => removeToast(toast.id)} />
          ))}
        </AnimatePresence>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -60, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="mb-12"
        >
          <div className="mb-2 flex items-center gap-4">
            <h2
              className="glitch text-3xl font-mono font-bold text-slate-100 text-glow md:text-4xl"
              data-text="Activity Timeline"
            >
              Activity Timeline
            </h2>
            <div className="h-px flex-1 bg-cyber-secondary/30" />
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="rounded-full border border-green-500/60 bg-green-500/10 px-3 py-1 text-[10px] font-mono font-bold tracking-[0.3em] text-green-400"
            >
              TRAINING COMPLETE
            </motion.span>
          </div>
          <p className="border-l-2 border-cyber-secondary pl-2 text-sm font-mono uppercase tracking-widest text-slate-400">
            Summer Training - Lovely Professional University - June to July 2025
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {MISSIONS.map((mission, index) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              index={index}
              onUnlock={handleUnlock}
              activeMission={activeMission}
              onSelect={setActiveMission}
            />
          ))}
        </div>

        <RankBadge show={rankShown} />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="mx-auto mt-24 max-w-3xl"
        >
          <div className="glass-panel relative overflow-hidden rounded-2xl border border-cyber-primary/20 bg-cyber-panel/80 p-5 sm:p-6">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(129,140,248,0.08),transparent_35%)]" />
            <div className="relative z-10 mb-4 text-center">
              <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-cyber-primary/80">
                Final Record
              </p>
              <h3 className="mt-2 text-xl font-mono font-bold text-slate-100 sm:text-2xl">
                {TRAINING_CERTIFICATE.title}
              </h3>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0], x: [0, 4, 0], rotate: [0, 0.8, -0.6, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10"
            >
              <div className="overflow-hidden rounded-xl border border-slate-700/70 bg-[#040912] shadow-[0_0_45px_rgba(56,189,248,0.14)]">
                <img
                  src={TRAINING_CERTIFICATE.image}
                  alt={TRAINING_CERTIFICATE.title}
                  className="h-auto w-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
