import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Terminal, ChevronRight, Mail } from 'lucide-react';

// ─── Project Data ─────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 'cyberecon',
    title: 'CybeRECON',
    subtitle: '// Interactive Threat Intelligence Platform',
    statusBadges: ['LIVE', 'FULL-STACK'],
    statusColors: ['green', 'secondary'],
    techPills: ['Python', 'Flask', 'REST API', 'Vanilla JS', 'WAF Evasion', 'SSL/TLS', 'AbuseIPDB', 'Cloud Deploy'],
    cardDesc: 'Interactive threat intelligence platform with a live Python/Flask cloud backend. Real-time WAF evasion, SSL grading, DNS mapping, and IP threat analysis — wrapped in a Matrix-style terminal UI.',
    modalTags: ['Live backend', 'Full-Stack', 'WAF Bypass', 'Cybersecurity'],
    modalDesc: 'A full-stack cybersecurity reconnaissance tool with a live Python/Flask cloud backend that dynamically connects to external targets for real-time intelligence gathering. Features a cinematic Matrix-style UI and sophisticated WAF evasion logic — using User-Agent rotation and fake-browser header injection to bypass datacenter-level firewalls and retrieve unadulterated intelligence data.',
    terminal: '$ ./cyberecon --target example.com --stealth',
    imageUrl: 'https://jumpshare.com/s/FaFgLHynj7R7QoIgUOLK/download',
    github: 'https://github.com/snehachoudhary13/CybeRECON',
    live: 'https://snehachoudhary13.github.io/CybeRECON/',
    icon: 'terminal',
  },
  {
    id: 'emailforensics',
    title: 'Email Header Forensic Tool',
    subtitle: '// Email Authentication & Spoofing Detector',
    statusBadges: ['FORENSICS', 'FULL-STACK'],
    statusColors: ['warning', 'secondary'],
    techPills: ['Python', 'Flask', 'Regex', 'ipinfo.io', 'Leaflet.js', 'HTML/CSS/JS', 'Email Security'],
    cardDesc: 'Web-based forensics tool that analyzes raw email headers to detect spoofing, trace transmission hops, verify SPF/DKIM/DMARC, and visualize the email\'s geographic journey on a live interactive map.',
    modalTags: ['Cybersecurity', 'Forensics', 'Python', 'Flask', 'Email Security'],
    modalDesc: 'Email spoofing and phishing are among the most common cyberattack vectors. This tool empowers security analysts to parse and forensically examine email headers — detecting forgery by comparing From/DKIM/Return-Path domains, tracing each Received: hop with IP geolocation, validating SPF/DKIM/DMARC authentication records, and computing a 0–100 trust score — all through a clean web interface.',
    terminal: '$ python app.py --analyze headers.txt',
    features: [
      '🔍 Header Parsing — Extracts From, Reply-To, Return-Path, Message-ID, Subject, Date, Mailer',
      '🛡️ Auth Analysis — SPF, DKIM, DMARC detection via regex',
      '🌍 Hop Trace & Map — Plots live lat/lng coordinates for each Received: hop',
      '🚨 Spoofing Detection — Domain mismatch flagging with reasons',
      '📊 Trust Score — 0–100 email legitimacy score based on auth results',
      '🏠 Private IP Detection — Identifies internal/local network hops',
    ],
    imageUrl: 'https://iili.io/q6A9gp4.png',
    github: 'https://github.com/snehachoudhary13/Email-Header-Forensics',
    live: null,
    icon: 'mail',
  },
];

type BadgeColor = 'green' | 'secondary' | 'warning';

const badgeStyle: Record<BadgeColor, { wrap: string; dot?: string; text: string }> = {
  green:     { wrap: 'bg-green-500/10 border-green-500/30',     dot: 'bg-green-500 shadow-[0_0_8px_#22c55e]', text: 'text-green-400' },
  secondary: { wrap: 'bg-cyber-secondary/10 border-cyber-secondary/30', text: 'text-cyber-secondary' },
  warning:   { wrap: 'bg-cyber-warning/10 border-cyber-warning/30',     text: 'text-cyber-warning' },
};

// ─── Component ────────────────────────────────────────────────────────────────
export const ProjectsBoard = () => {
  const [openProject, setOpenProject] = useState<string | null>(null);
  const activeProject = PROJECTS.find(p => p.id === openProject) ?? null;

  useEffect(() => {
    if (openProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [openProject]);

  return (
    <section id="projects" className="py-20 relative z-10 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-10 w-full"
        >
          <Terminal className="w-6 h-6 text-cyber-primary" />
          <h3 className="text-2xl font-mono text-slate-100">Projects</h3>
          <div className="h-[1px] bg-gradient-to-r from-cyber-primary/60 to-transparent flex-1 ml-4 hidden sm:block" />
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass-panel p-7 group relative overflow-hidden border-cyber-primary/20 hover:border-cyber-primary transition-all duration-300 bg-cyber-panel cursor-pointer flex flex-col"
              onClick={() => setOpenProject(project.id)}
            >
              <div className="shimmer-overlay" />

              {/* Visual Image Block */}
              <div className="w-full aspect-video bg-[#030712] border border-slate-800 rounded-lg overflow-hidden group-hover:border-cyber-primary/50 transition-colors mb-6 shadow-inner relative">
                {'imageUrl' in project && project.imageUrl ? (
                  <img
                    src={(project as { imageUrl: string }).imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.removeAttribute('hidden');
                    }}
                  />
                ) : null}
                {/* Fallback icon */}
                <div className="absolute inset-0 flex items-center justify-center bg-[#030712]"
                  hidden={('imageUrl' in project && !!project.imageUrl) ? true : undefined}>
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxIiBmaWxsPSJyZ2JhKDAsIDIxMiwgMjU1LCAwLjEpIj48L2NpcmNsZT4KPC9zdmc+')] opacity-50" />
                  {project.icon === 'terminal'
                    ? <Terminal className="w-12 h-12 text-cyber-primary/40 group-hover:text-cyber-primary transition-colors duration-500 group-hover:scale-110 relative z-10" />
                    : <Mail className="w-12 h-12 text-cyber-warning/40 group-hover:text-cyber-warning transition-colors duration-500 group-hover:scale-110 relative z-10" />
                  }
                </div>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-cyber-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
              </div>

              {/* Card Content */}
              <div className="flex-1 flex flex-col z-10">
                {/* Title + Badges */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="text-xl font-mono text-slate-100 font-bold group-hover:text-cyber-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.statusBadges.map((badge, i) => {
                      const color = project.statusColors[i] as BadgeColor;
                      const style = badgeStyle[color];
                      return (
                        <span key={badge} className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded border text-[10px] font-mono tracking-widest uppercase ${style.wrap} ${style.text}`}>
                          {style.dot && <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${style.dot}`} />}
                          {badge}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <p className="text-slate-400 font-sans text-sm leading-relaxed mb-5 flex-1">{project.cardDesc}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.techPills.map(tag => (
                    <span key={tag} className="px-2.5 py-0.5 bg-[#0a0f16] border border-slate-700/80 rounded text-xs font-mono text-slate-400 group-hover:border-cyber-primary/30 group-hover:text-cyber-primary/80 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  className="flex items-center gap-2 text-cyber-primary font-mono text-xs tracking-widest uppercase group-hover:text-white transition-colors mt-auto w-fit"
                  onClick={e => { e.stopPropagation(); setOpenProject(project.id); }}
                >
                  View details <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Modal ── */}
        <AnimatePresence>
          {activeProject && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" onClick={() => setOpenProject(null)}>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-[#060a10]/50 backdrop-blur-xl"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', duration: 0.5 }}
                onClick={e => e.stopPropagation()}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-cyber-bg border border-cyber-primary/40 rounded-xl shadow-[0_0_30px_rgba(0,212,255,0.15)] flex flex-col"
              >
                {/* Modal Header */}
                <div className="sticky top-0 z-20 bg-cyber-bg/95 backdrop-blur-sm border-b border-slate-800 p-6 flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-mono font-bold text-slate-100 text-glow">{activeProject.title}</h2>
                    <p className="text-cyber-primary font-mono text-sm mt-1 tracking-widest uppercase">{activeProject.subtitle}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {activeProject.modalTags.map(b => (
                        <span key={b} className="px-2 py-1 bg-cyber-primary/10 border border-cyber-primary/20 text-cyber-primary text-[10px] font-mono tracking-widest uppercase rounded">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => setOpenProject(null)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors group">
                    <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 md:p-8 space-y-8 flex-1">
                  <p className="text-slate-300 font-sans leading-relaxed text-base sm:text-justify border-l-2 border-slate-700 pl-4">
                    {activeProject.modalDesc}
                  </p>

                  {/* Terminal snippet */}
                  <div className="bg-[#030712] border border-slate-800 rounded-lg p-5 font-mono text-xs sm:text-sm overflow-x-auto shadow-inner relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                    <div className="text-slate-500 mb-2 select-none">{activeProject.terminal}</div>
                    <div className="text-green-500/80 mt-2 hover:animate-pulse cursor-default select-none">█</div>
                  </div>

                  {/* Feature list (only for email forensics) */}
                  {activeProject.features && (
                    <div className="space-y-3">
                      <p className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-3">// Key Features</p>
                      {activeProject.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm text-slate-300 font-sans">
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="sticky bottom-0 z-20 bg-cyber-bg/95 backdrop-blur-sm border-t border-slate-800 p-6 flex flex-wrap gap-4 justify-end rounded-b-xl">
                  {activeProject.github && (
                    <a href={activeProject.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-2.5 bg-[#0d1117] hover:bg-slate-800 text-slate-200 rounded font-mono text-sm transition-colors border border-slate-700 shadow-sm">
                      <Github className="w-5 h-5" /> ⌥ GitHub Repo
                    </a>
                  )}
                  {activeProject.live && (
                    <a href={activeProject.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-2.5 bg-cyber-primary/90 hover:bg-cyan-400 text-black font-bold rounded font-mono text-sm transition-all drop-shadow-[0_0_15px_rgba(0,212,255,0.4)] hover:drop-shadow-[0_0_20px_rgba(0,212,255,0.7)] hover:scale-105">
                      <ExternalLink className="w-5 h-5" /> ▶ Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
