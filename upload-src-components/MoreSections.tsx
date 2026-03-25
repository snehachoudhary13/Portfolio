import { motion } from 'framer-motion';
import { Award, Trophy, ShieldCheck, Target, BadgeCheck, Loader2 } from 'lucide-react';

export const Certifications = () => {
  type VerifiedCert = {
    title: string;
    issuer: string;
    icon: JSX.Element;
    image?: string | null;
    link?: string;
  };

  const verifiedCerts: VerifiedCert[] = [
    {
      title: "Java (Basic)",
      issuer: "HackerRank",
      icon: <ShieldCheck className="w-8 h-8 text-cyber-primary" />,
      image: null,
      link: "https://www.hackerrank.com/certificates/65188208d0fb",
    },
    {
      title: "Cloud Computing",
      issuer: "NPTEL",
      icon: <ShieldCheck className="w-8 h-8 text-cyber-primary" />,
      image: null,
    },
    {
      title: "Build Generative AI Apps & Solutions with No-Code Tools",
      issuer: "Infosys Springboard",
      icon: <ShieldCheck className="w-8 h-8 text-cyber-primary" />,
      image: "https://iili.io/q6RszDF.png",
      link: "https://freeimage.host/i/q6RszDF",
    },
    {
      title: "Waste Warriors NGO Training",
      issuer: "Waste Warriors",
      icon: <ShieldCheck className="w-8 h-8 text-cyber-accent" />,
      image: "https://jumpshare.com/s/sVA9kVhVVnL9gsjYnlKF/download",
      link: "https://jumpshare.com/s/sVA9kVhVVnL9gsjYnlKF",
    },
  ];

  const inProgressCerts = [
    { 
      title: "CompTIA Security+", 
      desc: "Building foundational cybersecurity knowledge including networking, threats, and risk management.",
      progress: 60
    },
    { 
      title: "Certified Ethical Hacker (CEH)", 
      desc: "Learning ethical hacking techniques, penetration testing, and vulnerability assessment.",
      progress: 35
    }
  ];

  return (
    <section id="certifications" className="py-20 relative z-10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <Award className="w-12 h-12 text-cyber-primary mx-auto mb-4" />
          <h2 className="text-3xl font-mono font-bold text-slate-100 text-glow">Certifications</h2>
        </motion.div>

        {/* Verified Certifications */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <ShieldCheck className="w-6 h-6 text-cyber-primary" />
            <h3 className="text-2xl font-mono text-slate-100">Verified Credentials</h3>
            <div className="h-[1px] bg-gradient-to-r from-cyber-primary/60 to-transparent flex-1 ml-4 hidden sm:block"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {verifiedCerts.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="glass-panel flex flex-col items-center justify-center text-center group cursor-default relative overflow-hidden border-cyber-primary/30 hover:border-cyber-primary bg-cyber-panel transition-all duration-300"
              >
                <div className="shimmer-overlay"></div>
                
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-cyber-primary/10 px-3 py-1.5 rounded border border-cyber-primary/30 shadow-[0_0_10px_rgba(0,212,255,0.2)] animate-breathe z-20">
                  <BadgeCheck className="w-4 h-4 text-cyber-primary" />
                  <span className="text-xs font-mono text-cyber-primary uppercase tracking-wider">Verified</span>
                </div>

                {/* Cert image OR icon */}
                {cert.image ? (
                  <div className="w-full aspect-video overflow-hidden bg-[#030712] relative">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg/80 to-transparent pointer-events-none" />
                  </div>
                ) : (
                  <div className="relative w-28 h-28 flex items-center justify-center mt-8 mb-2">
                    <svg className="absolute inset-0 w-full h-full text-cyber-primary/10 group-hover:text-cyber-primary/30 transition-colors drop-shadow-[0_0_15px_rgba(0,212,255,0.2)]" viewBox="0 0 100 100" fill="currentColor">
                      <polygon points="50 3 93 28 93 72 50 97 7 72 7 28"></polygon>
                    </svg>
                    <div className="relative z-10 w-16 h-16 rounded-full bg-cyber-bg border border-cyber-primary/50 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] transition-shadow">
                      {cert.icon}
                    </div>
                  </div>
                )}

                <div className="p-6 pt-3 w-full">
                  <h3 className="text-base font-mono text-slate-100 mb-3 z-10 leading-snug">{cert.title}</h3>
                  <div className="flex items-center gap-2 mt-auto z-10 bg-black/40 px-4 py-2 rounded-md border border-slate-800 justify-center">
                    <span className="text-xs text-slate-400 font-mono tracking-widest uppercase">Issuer:</span>
                    <span className="text-sm text-cyber-primary font-mono tracking-widest">{cert.issuer}</span>
                  </div>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-cyber-primary hover:text-white transition-colors"
                    >
                      <BadgeCheck className="w-4 h-4" />
                      View credential
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* In Progress Certifications */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <Loader2 className="w-6 h-6 text-[#a855f7] animate-[spin_3s_linear_infinite]" />
            <h3 className="text-2xl font-mono text-slate-100">In Progress</h3>
            <div className="h-[1px] bg-gradient-to-r from-cyber-secondary/60 to-transparent flex-1 ml-4 hidden sm:block"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
             {inProgressCerts.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 + 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass-panel p-8 flex flex-col justify-between group cursor-default relative overflow-hidden border-cyber-secondary/30 hover:border-cyber-secondary/60 hover:shadow-[0_0_20px_rgba(123,47,247,0.3)] transition-all duration-300 bg-cyber-panel"
              >
                {/* Glow Background */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-cyber-secondary/5 rounded-full blur-3xl group-hover:bg-cyber-secondary/15 transition-colors pointer-events-none"></div>
                
                <div className="relative z-10 mb-8">
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <h3 className="text-xl font-mono text-slate-100 group-hover:text-cyber-primary transition-colors">{cert.title}</h3>
                    <div className="flex items-center gap-2 bg-cyber-secondary/10 px-3 py-1.5 rounded border border-cyber-secondary/30 shadow-[0_0_10px_rgba(123,47,247,0.2)] whitespace-nowrap">
                      <div className="w-2.5 h-2.5 rounded-full bg-cyber-secondary relative flex items-center justify-center">
                        <div className="absolute w-full h-full rounded-full bg-cyber-secondary animate-sonar"></div>
                      </div>
                      <span className="text-xs font-mono text-cyber-secondary uppercase tracking-wider">Active</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-400 font-mono leading-relaxed group-hover:text-slate-300 transition-colors">
                    {cert.desc}
                  </p>
                </div>
                
                <div className="relative z-10 w-full mt-auto bg-black/60 p-4 rounded-lg border border-slate-800/80">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">System Scan</span>
                    <span className="text-xs font-mono text-cyber-secondary">{cert.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-[#0a0f18] rounded-full overflow-hidden border border-slate-800 relative">
                    {/* Animated gradient bar with glitch highlight */}
                    <motion.div 
                      className="absolute top-0 left-0 bottom-0 bg-cyber-secondary border-r border-cyan-400 overflow-hidden"
                      initial={{ width: "0%" }}
                      whileInView={{ width: `${cert.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, ease: "easeOut", delay: idx * 0.2 + 0.3 }}
                    >
                      <div className="absolute top-0 left-0 bottom-0 w-full h-full">
                        <div className="w-[80px] h-full bg-white/50 blur-[2px] animate-scanbar shadow-[0_0_15px_#fff]"></div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export const Achievements = () => {
  const achievements = [
    { title: "Top 50", desc: "HackWithVertos 1.0 Hackathon", icon: <Trophy className="w-10 h-10 text-cyber-secondary" />, certImg: "https://iili.io/q6oq5ru.png", certLink: "https://freeimage.host/i/q6oq5ru" },
    { title: "3⭐", desc: "HackerRank (Problem Solving)", icon: <Target className="w-10 h-10 text-cyber-secondary" />, certImg: null, certLink: null },
    { title: "Top 20%", desc: "on TryHackMe", icon: <ShieldCheck className="w-10 h-10 text-cyber-secondary" />, certImg: null, certLink: null },
  ];

  return (
    <section id="achievements" className="py-20 relative z-10 w-full bg-cyber-bg/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-mono font-bold text-slate-100 text-glow">Achievements</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-panel flex flex-col items-center justify-center text-center group cursor-default border-cyber-secondary/30 hover:border-cyber-secondary shadow-none hover:shadow-glow-secondary overflow-hidden"
            >
              {/* Certificate image thumbnail if available */}
              {item.certImg && (
                <a href={item.certLink!} target="_blank" rel="noopener noreferrer" className="w-full block overflow-hidden">
                  <div className="w-full aspect-video overflow-hidden bg-[#030712] relative">
                    <img
                      src={item.certImg}
                      alt={item.desc}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg/70 to-transparent pointer-events-none" />
                    <div className="absolute bottom-2 right-2 font-mono text-[10px] text-cyber-secondary/80 bg-black/60 px-2 py-0.5 rounded">View cert →</div>
                  </div>
                </a>
              )}
              <div className="p-8 flex flex-col items-center w-full">
                <div className="mb-6 bg-cyber-bg p-4 rounded-full border border-slate-800 group-hover:border-cyber-secondary/50 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-4xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-br from-cyber-secondary to-cyber-primary mb-3 text-glow">{item.title}</h3>
                <p className="text-sm text-slate-300 font-mono tracking-wide">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
