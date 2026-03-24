import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, RefreshCw } from 'lucide-react';

// Contact info encoded in hex
const CONTACT_DATA = [
  {
    label: 'Email',
    plain: 'simmi121412@gmail.com',
    hex: '73696d6d69313231343132406d61696c2e636f6d',
    icon: '📧',
    href: (v: string) => `mailto:${v}`
  },
  {
    label: 'LinkedIn',
    plain: 'linkedin.com/in/sneha-choudhary-s1',
    hex: '6c696e6b6564696e2e636f6d2f696e2f736e6568612d63686f7564686172',
    icon: '🔗',
    href: (v: string) => `https://${v}`
  },
  {
    label: 'GitHub',
    plain: 'github.com/snehachoudhary13',
    hex: '6769746875622e636f6d2f736e6568612d63686f7564686172',
    icon: '💻',
    href: (v: string) => `https://${v}`
  }
];


export const HexDecoder = () => {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [revealedContacts, setRevealedContacts] = useState<boolean[]>([false, false, false]);
  const [glitching, setGlitching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const tryDecode = () => {
    const cleaned = input.trim().toLowerCase().replace(/\s+/g, '');
    const matchIdx = CONTACT_DATA.findIndex(c => c.hex === cleaned);
    if (matchIdx >= 0) {
      setStatus('success');
      const updated = [...revealedContacts];
      updated[matchIdx] = true;
      setRevealedContacts(updated);
      setInput('');
    } else {
      setStatus('error');
      setGlitching(true);
      setTimeout(() => { setGlitching(false); setStatus('idle'); }, 1200);
    }
  };

  const allRevealed = revealedContacts.every(Boolean);

  return (
    <section id="hex-decoder" className="py-20 relative z-10 w-full">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-cyber-primary/10 border border-cyber-primary/30 rounded-full px-4 py-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-cyber-primary animate-pulse"></span>
            <span className="font-mono text-xs text-cyber-primary tracking-widest uppercase">CLASSIFIED INTEL</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-mono font-bold text-slate-100 text-glow mb-3">
            Hex Decoder
          </h2>
          <p className="text-slate-400 font-mono text-sm max-w-md mx-auto">
            Decode the hex strings to unlock my contact information. Enter each hex value to reveal.
          </p>
        </motion.div>

        {/* Hex Targets */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          {CONTACT_DATA.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`glass-panel p-5 border transition-all duration-500 ${
                revealedContacts[idx]
                  ? 'border-cyber-accent/60 shadow-glow-accent'
                  : 'border-slate-800'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-2xl">{item.icon}</span>
                  <span className={`font-mono text-sm font-bold tracking-widest uppercase ${
                    revealedContacts[idx] ? 'text-cyber-accent' : 'text-slate-500'
                  }`}>{item.label}</span>
                  {revealedContacts[idx]
                    ? <Unlock className="w-4 h-4 text-cyber-accent" />
                    : <Lock className="w-4 h-4 text-slate-600" />
                  }
                </div>
                <div className="flex-1 font-mono text-sm overflow-x-auto">
                  <AnimatePresence mode="wait">
                    {revealedContacts[idx] ? (
                      <motion.a
                        key="plain"
                        initial={{ opacity: 0, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        href={item.href(item.plain)}
                        target={item.label !== 'Email' ? '_blank' : undefined}
                        rel="noreferrer"
                        className="text-cyber-accent hover:underline break-all"
                      >
                        {item.plain}
                      </motion.a>
                    ) : (
                      <motion.span
                        key="hex"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-slate-500 break-all select-all cursor-copy"
                        title="Copy and paste into the decoder below"
                      >
                        {item.hex}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decoder Input */}
        {!allRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`glass-panel p-6 border transition-all duration-300 ${
              status === 'success' ? 'border-cyber-accent/60' :
              status === 'error' ? 'border-red-500/60' :
              'border-slate-800'
            } ${glitching ? 'animate-pulse' : ''}`}
          >
            <p className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-3">
              {'>> '} Paste hex string and decode
            </p>
            <div className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => { setInput(e.target.value); setStatus('idle'); }}
                onKeyDown={e => e.key === 'Enter' && tryDecode()}
                placeholder="Paste hex string here..."
                className={`flex-1 bg-cyber-bg border rounded px-4 py-3 font-mono text-sm text-slate-200 placeholder-slate-600 focus:outline-none transition-all ${
                  status === 'error'
                    ? 'border-red-500 focus:border-red-400'
                    : 'border-slate-700 focus:border-cyber-primary focus:shadow-glow-primary'
                }`}
              />
              <button
                onClick={tryDecode}
                className="px-6 py-3 bg-cyber-primary/10 border border-cyber-primary text-cyber-primary hover:bg-cyber-primary hover:text-cyber-bg transition-all duration-300 rounded font-mono text-sm font-bold whitespace-nowrap"
              >
                Decode
              </button>
            </div>
            <AnimatePresence>
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 font-mono text-xs text-red-400 flex items-center gap-2"
                >
                  <RefreshCw className="w-3 h-3" /> ACCESS DENIED — Invalid hex sequence. Try again.
                </motion.p>
              )}
              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 font-mono text-xs text-cyber-accent flex items-center gap-2"
                >
                  <Unlock className="w-3 h-3" /> ACCESS GRANTED — Intel unlocked!
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {allRevealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-8 border border-cyber-accent/60 shadow-glow-accent text-center"
          >
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="font-mono text-xl text-cyber-accent mb-2">All Intel Unlocked!</h3>
            <p className="font-mono text-sm text-slate-400">You cracked every cipher. Impressive.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
