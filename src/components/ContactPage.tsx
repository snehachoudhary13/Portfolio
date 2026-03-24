import { motion } from 'framer-motion';
import { Mail, ExternalLink, MessageCircle } from 'lucide-react';
import { SiLeetcode, SiGithub, SiGmail, SiInstagram } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa';

const contacts = [
  {
    label: 'Email',
    value: 'simmi121412@gmail.com',
    sub: 'Drop me a message anytime',
    href: 'mailto:simmi121412@gmail.com',
    Icon: SiGmail,
    color: '#EA4335',
    glow: 'rgba(234,67,53,0.3)',
    hoverBorder: 'group-hover:border-[#EA4335]/50'
  },
  {
    label: 'LinkedIn',
    value: 'sneha-choudhary-s1',
    sub: 'Connect professionally',
    href: 'https://www.linkedin.com/in/sneha-choudhary-s1/',
    Icon: FaLinkedinIn,
    color: '#0A66C2',
    glow: 'rgba(10,102,194,0.3)',
    hoverBorder: 'group-hover:border-[#0A66C2]/50'
  },
  {
    label: 'GitHub',
    value: 'snehachoudhary13',
    sub: 'Browse my source code',
    href: 'https://github.com/snehachoudhary13',
    Icon: SiGithub,
    color: '#ffffff',
    glow: 'rgba(255,255,255,0.15)',
    hoverBorder: 'group-hover:border-white/40'
  },
  {
    label: 'LeetCode',
    value: 'sneha-choudhary',
    sub: '350+ problems solved',
    href: 'https://leetcode.com',
    Icon: SiLeetcode,
    color: '#FFA116',
    glow: 'rgba(255,161,22,0.3)',
    hoverBorder: 'group-hover:border-[#FFA116]/50'
  },
  {
    label: 'Instagram',
    value: '@sneha_choudhary',
    sub: 'My creative side',
    href: 'https://instagram.com',
    Icon: SiInstagram,
    color: '#E1306C',
    glow: 'rgba(225,48,108,0.3)',
    hoverBorder: 'group-hover:border-[#E1306C]/50'
  }
];

export const ContactPage = () => {
  return (
    <section id="contact" className="py-20 relative z-10 w-full">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageCircle className="w-8 h-8 text-cyber-primary" />
            <h2 className="text-3xl md:text-4xl font-mono font-bold text-slate-100 text-glow">
              Let's Connect
            </h2>
          </div>
          <p className="text-slate-400 font-mono text-sm max-w-md mx-auto">
            Open to collaborations, opportunities, and conversations. Pick your preferred channel below.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((c, idx) => (
            <motion.a
              href={c.href}
              target={c.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              key={idx}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -6, scale: 1.03 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`glass-panel p-8 flex flex-col items-center text-center gap-5 group border border-slate-800 cursor-pointer transition-all duration-300 ${c.hoverBorder}`}
              style={{
                '--glow': c.glow,
              } as React.CSSProperties}
            >
              {/* Big Icon */}
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:scale-110"
                style={{ background: `${c.color}15`, border: `1.5px solid ${c.color}30` }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle, ${c.glow} 0%, transparent 70%)` }}
                />
                <c.Icon style={{ color: c.color, fontSize: '3rem', width: '3rem', height: '3rem' }} />
              </div>

              {/* Label */}
              <div>
                <p className="text-xs font-mono tracking-widest uppercase text-slate-500 mb-1">{c.label}</p>
                <p className="font-mono text-base font-semibold text-white group-hover:text-cyber-primary transition-colors break-all">
                  {c.value}
                </p>
                <p className="text-xs text-slate-500 mt-1 font-sans">{c.sub}</p>
              </div>

              {/* Arrow indicator */}
              <div
                className="mt-auto flex items-center gap-1 text-xs font-mono opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                style={{ color: c.color }}
              >
                <ExternalLink size={12} /> Open
              </div>
            </motion.a>
          ))}
        </div>

        {/* Big Email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-slate-400 font-mono mb-4">Prefer email? Send directly:</p>
          <a
            href="mailto:simmi121412@gmail.com"
            className="inline-flex items-center gap-3 px-10 py-5 bg-cyber-primary/10 border border-cyber-primary text-cyber-primary font-mono font-bold rounded-xl hover:bg-cyber-primary hover:text-black transition-all duration-300 shadow-glow-primary text-lg tracking-wider group"
          >
            <Mail size={22} className="group-hover:scale-110 transition-transform" />
            simmi121412@gmail.com
          </a>
        </motion.div>
      </div>
    </section>
  );
};
