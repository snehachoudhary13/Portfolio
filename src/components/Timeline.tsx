import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

// ─── DATA ──────────────────────────────────────────────────────────────────

const CONTAINERS = [
  {
    id: 'nginx',
    cmd: '$ sudo docker run -d -p 80:80 nginx',
    label: 'NGINX Deployment',
    icon: '🌐',
    shortDesc: 'Deployed NGINX inside a Docker container, exposed on port 80.',
    detail: 'Configured reverse proxy, enabled GZIP compression and virtual host setup. Tested HTTP responses with curl inside the container network.',
    tools: ['Docker', 'NGINX', 'Linux Networking'],
    status: 'RUNNING',
  },
  {
    id: 'firewall',
    cmd: '$ sudo ufw enable && ufw allow 22/tcp',
    label: 'Firewall Configuration',
    icon: '🔥',
    shortDesc: 'Hardened the system using UFW — allowed only SSH, blocked all else.',
    detail: 'Set default DENY policy. Whitelisted SSH port 22, HTTP port 80. Verified rules with `ufw status verbose`. Simulated port scan to confirm blocking.',
    tools: ['UFW', 'iptables', 'nmap'],
    status: 'SECURED',
  },
  {
    id: 'users',
    cmd: '$ sudo useradd -m analyst && usermod -aG sudo analyst',
    label: 'Process & User Management',
    icon: '👤',
    shortDesc: 'Created system users, managed sudo privileges and process monitoring.',
    detail: 'Used `ps aux`, `htop`, `kill`, `nice`, and `cron` to manage processes. Applied principle of least privilege for lab user accounts.',
    tools: ['Bash', 'cron', 'htop', 'sudoers'],
    status: 'ACTIVE',
  },
  {
    id: 'network',
    cmd: '$ ip a && traceroute 8.8.8.8',
    label: 'Networking Fundamentals',
    icon: '🔗',
    shortDesc: 'Analyzed network interfaces, routing and DNS configurations.',
    detail: 'Explored OSI layers hands-on. Configured static IPs, used Wireshark for packet sniffing, traced routes with traceroute and mtr.',
    tools: ['Wireshark', 'netstat', 'traceroute', 'DNS'],
    status: 'TRACED',
  },
];

const CHECKPOINTS = [
  { label: 'Orientation', pct: 5 },
  { label: 'Linux Basics', pct: 20 },
  { label: 'Docker & NGINX', pct: 40 },
  { label: 'Firewall & Security', pct: 60 },
  { label: 'Networking', pct: 78 },
  { label: 'Project Submission', pct: 95 },
];

// ─── TERMINAL CARD ──────────────────────────────────────────────────────────

const TerminalCard = ({ container, index }: { container: typeof CONTAINERS[0]; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const [typed, setTyped] = useState('');
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  // Typewriter effect for the cmd
  useEffect(() => {
    if (!inView) return;
    const delay = index * 400;
    let timeout: ReturnType<typeof setTimeout>;
    timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setTyped(container.cmd.slice(0, i + 1));
        i++;
        if (i >= container.cmd.length) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 300);
        }
      }, 28);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [inView, container.cmd, index]);

  const statusColor = container.status === 'RUNNING' ? 'text-green-400' :
    container.status === 'SECURED' ? 'text-cyber-primary' :
    container.status === 'ACTIVE' ? 'text-cyber-secondary' : 'text-cyber-accent';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="glass-panel overflow-hidden"
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900/60 border-b border-slate-800">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
        </div>
        <span className="text-[10px] font-mono text-slate-500 ml-2 tracking-widest">container@lpu:~</span>
        <div className="ml-auto flex items-center gap-2">
          <span className={`text-[10px] font-mono font-bold tracking-wider ${statusColor}`}>
            ● {container.status}
          </span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 font-mono text-sm bg-[#060a0f]">
        <div className="text-green-400 mb-1">
          {typed}
          {!done && <span className="animate-pulse text-green-300 ml-0.5">█</span>}
        </div>
        {done && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-cyber-primary/80 text-xs mt-1 mb-3">
              Initializing {container.icon} <span className="text-slate-300">{container.label}</span>...
            </div>
            <div className="text-[11px] text-slate-400 mb-3">{container.shortDesc}</div>

            <button
              onClick={() => setExpanded(!expanded)}
              className="text-[10px] font-mono text-cyber-accent border border-cyber-accent/30 px-3 py-1 rounded hover:bg-cyber-accent/10 transition-colors flex items-center gap-2"
            >
              {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              {expanded ? 'STOP CONTAINER' : 'SPIN UP CONTAINER'}
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden mt-3 space-y-3 border-t border-slate-800 pt-3"
                >
                  {/* Boot lines */}
                  {['[  OK  ] Starting service...', '[  OK  ] Mounting filesystems...', '[  OK  ] Container ready.'].map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="text-[10px] text-green-400/70 font-mono"
                    >
                      {line}
                    </motion.div>
                  ))}
                  <div className="text-xs text-slate-300 leading-relaxed">{container.detail}</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {container.tools.map(t => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded border border-cyber-secondary/40 text-cyber-secondary bg-cyber-secondary/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// ─── PROGRESS BAR ───────────────────────────────────────────────────────────

const TrainingProgressBar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="mb-14">
      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-2 uppercase tracking-widest">
        <span>June 2025</span>
        <span>July 2025</span>
      </div>
      <div className="relative h-2 bg-slate-800 rounded-full overflow-visible">
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #818cf8, #38bdf8, #2dd4bf)' }}
          initial={{ width: 0 }}
          animate={inView ? { width: '95%' } : {}}
          transition={{ duration: 1.8, ease: 'easeOut' }}
        />

        {/* Checkpoints */}
        {CHECKPOINTS.map((cp, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
            style={{ left: `${cp.pct}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5 + i * 0.25, duration: 0.3 }}
          >
            <div className="w-3 h-3 rounded-full border-2 border-cyber-primary bg-cyber-bg shadow-[0_0_8px_#38bdf8] z-10 relative"></div>
            <span className="absolute top-4 text-[9px] font-mono text-slate-400 whitespace-nowrap -translate-x-1/2" style={{ left: '50%' }}>
              {cp.label}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="mt-7 text-right">
        <span className="text-[10px] font-mono text-cyber-secondary tracking-widest">► 8 WEEKS TRAINING COMPLETED</span>
      </div>
    </div>
  );
};

// ─── MAIN EXPORT ────────────────────────────────────────────────────────────

export const TrainingTimeline = () => {
  return (
    <section id="training" className="py-20 relative z-10 w-full bg-cyber-bg/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-3xl md:text-4xl font-mono font-bold text-slate-100 text-glow glitch" data-text="Activity Timeline">
              Activity Timeline
            </h2>
            <div className="h-px bg-cyber-secondary/30 flex-1"></div>
          </div>
          <p className="text-slate-400 font-mono text-sm uppercase tracking-widest pl-2 border-l-2 border-cyber-secondary">
            Summer Training · Lovely Professional University
          </p>
        </motion.div>

        {/* Progress Bar */}
        <TrainingProgressBar />

        {/* Terminal Container Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CONTAINERS.map((c, i) => (
            <TerminalCard key={c.id} container={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};



export const EducationTimeline = () => {
    return (
      <section id="education" className="py-20 relative z-10 w-full">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-3xl md:text-4xl font-mono font-bold text-slate-100 text-glow">
                Academic Timeline
              </h2>
              <div className="h-px bg-cyber-primary/30 flex-1"></div>
            </div>
            <p className="text-slate-400 font-mono text-sm uppercase tracking-widest pl-2 border-l-2 border-cyber-primary">
              Education Records
            </p>
          </motion.div>
  
          <div className="relative pl-8 md:pl-0">
            <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-slate-800"></div>
            <div className="hidden md:block absolute left-1/2 -ml-[1px] top-0 bottom-0 w-0.5 bg-slate-800"></div>
  
            {/* Item 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative flex flex-col md:flex-row justify-center md:items-center mb-12 group"
            >
              <div className="hidden md:block w-1/2 pr-8 text-right">
                <div className="glass-panel p-6 border-slate-800 group-hover:border-cyber-primary/50 transition-colors inline-block text-left">
                    <h4 className="text-slate-200 font-mono text-lg font-bold">Lovely Professional University</h4>
                    <p className="text-cyber-primary font-mono text-sm mt-1">B.Tech Computer Science</p>
                </div>
              </div>
              
              <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-cyber-bg border-2 border-cyber-primary flex items-center justify-center z-10 shadow-glow-primary mt-1 md:mt-0">
                 <BookOpen className="w-4 h-4 text-cyber-primary" />
              </div>
  
              <div className="md:hidden mb-2 pt-1">
                <div className="glass-panel p-4 border-slate-800 group-hover:border-cyber-primary/50 transition-colors inline-block w-full">
                    <h4 className="text-slate-200 font-mono text-lg font-bold">Lovely Professional University</h4>
                    <p className="text-cyber-primary font-mono text-sm">B.Tech CSE</p>
                </div>
              </div>
              
              <div className="md:w-1/2 md:pl-8 flex items-center mt-2 md:mt-0">
                 <span className="text-slate-400 font-mono shadow-[0_0_15px_rgba(56,189,248,0.05)] px-4 py-2 border border-slate-800 rounded-full text-sm">2023 - Present</span>
              </div>
            </motion.div>

            {/* Item 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative flex flex-col md:flex-row justify-center md:items-center mb-12 group"
            >
              <div className="hidden md:flex w-1/2 pr-8 justify-end items-center">
                <span className="text-slate-400 font-mono px-4 py-2 border border-slate-800 rounded-full text-sm">Intermediate</span>
              </div>
              
              <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center z-10 mt-1.5 md:mt-0 group-hover:border-cyber-primary group-hover:bg-cyber-bg transition-colors"></div>
  
              <div className="md:hidden mb-2 pt-2 flex items-center">
                <span className="text-slate-400 font-mono px-4 py-1.5 border border-slate-800 rounded-full text-sm">Intermediate</span>
              </div>
              
              <div className="md:w-1/2 md:pl-8 mt-2 md:mt-0">
                 <div className="p-4 border border-slate-800/50 bg-slate-900/30 rounded-lg group-hover:border-slate-700 transition-colors inline-block w-full md:w-auto">
                    <h4 className="text-slate-300 font-mono">Tripta Public School</h4>
                 </div>
              </div>
            </motion.div>

            {/* Item 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative flex flex-col md:flex-row justify-center md:items-center group"
            >
              <div className="hidden md:flex w-1/2 pr-8 text-right justify-end">
                <div className="p-4 border border-slate-800/50 bg-slate-900/30 rounded-lg group-hover:border-slate-700 transition-colors inline-block">
                    <h4 className="text-slate-300 font-mono">Tripta Public School</h4>
                 </div>
              </div>
              
              <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center z-10 mt-1 md:mt-0 group-hover:border-cyber-primary group-hover:bg-cyber-bg transition-colors"></div>
  
              <div className="md:hidden mb-2 pt-1">
                 <div className="p-4 border border-slate-800/50 bg-slate-900/30 rounded-lg group-hover:border-slate-700 transition-colors inline-block w-full">
                    <h4 className="text-slate-300 font-mono">Tripta Public School</h4>
                 </div>
              </div>
              
              <div className="md:w-1/2 md:pl-8 flex items-center mt-2 md:mt-0">
                 <span className="text-slate-400 font-mono px-4 py-2 border border-slate-800 rounded-full text-sm">Matriculation</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    );
  };
