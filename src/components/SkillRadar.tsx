import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SIZE = 320;
const CENTER = SIZE / 2;
const LEVELS = 5;
const SKILLS = [
  { label: 'Web Security', value: 78 },
  { label: 'Network', value: 70 },
  { label: 'Forensics', value: 55 },
  { label: 'Cryptography', value: 65 },
  { label: 'Penetration Testing', value: 72 },
  { label: 'Scripting', value: 80 },
];

const polarToCartesian = (angle: number, radius: number) => {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
};

const buildPath = (values: number[], maxRadius: number) => {
  const totalAxes = values.length;
  return values
    .map((val, i) => {
      const angle = (360 / totalAxes) * i;
      const r = (val / 100) * maxRadius;
      const { x, y } = polarToCartesian(angle, r);
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ') + ' Z';
};

const buildGridPath = (level: number, maxRadius: number, count: number) => {
  const r = (level / LEVELS) * maxRadius;
  return Array.from({ length: count }, (_, i) => {
    const angle = (360 / count) * i;
    const { x, y } = polarToCartesian(angle, r);
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(' ') + ' Z';
};

export const SkillRadar = () => {
  const [animated, setAnimated] = useState(false);
  const maxRadius = CENTER - 50;
  const count = SKILLS.length;

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const displayValues = animated ? SKILLS.map(s => s.value) : SKILLS.map(() => 0);

  return (
    <section className="py-20 relative z-10 w-full bg-cyber-bg/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          onViewportEnter={() => setAnimated(true)}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-cyber-secondary/30 flex-1"></div>
            <h2 className="text-3xl md:text-4xl font-mono font-bold text-slate-100 text-glow whitespace-nowrap">
              Threat Intel Profile
            </h2>
            <div className="h-px bg-cyber-secondary/30 flex-1"></div>
          </div>
          <p className="text-center text-slate-400 font-mono text-sm uppercase tracking-widest">
            Skill Radar Analysis
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 items-center justify-center">
          {/* Radar SVG */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="glass-panel p-6 shrink-0"
          >
            <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
              {/* Grid levels */}
              {Array.from({ length: LEVELS }, (_, lvl) => (
                <path
                  key={lvl}
                  d={buildGridPath(lvl + 1, maxRadius, count)}
                  fill="none"
                  stroke="rgba(56,189,248,0.15)"
                  strokeWidth={1}
                />
              ))}

              {/* Axis lines */}
              {SKILLS.map((_, i) => {
                const angle = (360 / count) * i;
                const end = polarToCartesian(angle, maxRadius);
                return (
                  <line
                    key={i}
                    x1={CENTER}
                    y1={CENTER}
                    x2={end.x}
                    y2={end.y}
                    stroke="rgba(56,189,248,0.2)"
                    strokeWidth={1}
                  />
                );
              })}

              {/* Animated Skill shape */}
              <motion.path
                d={buildPath(displayValues, maxRadius)}
                fill="rgba(56,189,248,0.12)"
                stroke="#38bdf8"
                strokeWidth={2}
                strokeLinejoin="round"
                filter="url(#glow)"
                initial={{ opacity: 0, scale: 0 }}
                animate={animated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
              />

              {/* Glow filter */}
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Skill dot + label */}
              {SKILLS.map((skill, i) => {
                const angle = (360 / count) * i;
                const end = polarToCartesian(angle, maxRadius);
                const labelPos = polarToCartesian(angle, maxRadius + 28);
                const anchor = labelPos.x < CENTER - 5 ? 'end' : labelPos.x > CENTER + 5 ? 'start' : 'middle';
                return (
                  <g key={i}>
                    <motion.circle
                      cx={end.x}
                      cy={end.y}
                      r={4}
                      fill="#38bdf8"
                      filter="url(#glow)"
                      initial={{ scale: 0 }}
                      animate={animated ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                      style={{ transformOrigin: `${end.x}px ${end.y}px` }}
                    />
                    <text
                      x={labelPos.x}
                      y={labelPos.y}
                      textAnchor={anchor}
                      dominantBaseline="middle"
                      fill="#94a3b8"
                      fontSize={10}
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {skill.label}
                    </text>
                  </g>
                );
              })}

              {/* Center dot */}
              <circle cx={CENTER} cy={CENTER} r={3} fill="#818cf8" filter="url(#glow)" />
            </svg>
          </motion.div>

          {/* Skill bars legend */}
          <div className="w-full max-w-sm space-y-5">
            {SKILLS.map((skill, i) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-mono text-sm text-slate-300">{skill.label}</span>
                  <span className="font-mono text-xs text-cyber-primary">{skill.value}%</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #38bdf8, #818cf8)' }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
