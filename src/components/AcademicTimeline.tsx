import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award, MapPin } from 'lucide-react';

const educationData = [
  {
    degree: "B.Tech — Computer Science and Engineering",
    institution: "Lovely Professional University",
    location: "Phagwara, Punjab",
    years: "2023 – Present",
    grade: "8.52 / 10 CGPA",
    highlights: ["Cybersecurity Club", "Hackathon Finalist", "DSA & Networks"]
  },
  {
    degree: "Intermediate (12th)",
    institution: "Tripta Public School",
    location: "India",
    years: "2021 – 2023",
    grade: "Class XII",
    highlights: ["Science Stream", "Student Council Member"]
  },
  {
    degree: "Matriculation (10th)",
    institution: "Tripta Public School",
    location: "India",
    years: "– 2021",
    grade: "Class X",
    highlights: ["Academic Honours"]
  }
];

export const AcademicTimeline = () => {
  return (
    <section id="education" className="py-20 relative z-10 w-full">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-2">
            <GraduationCap className="w-8 h-8 text-cyber-warning" />
            <h2 className="text-3xl md:text-4xl font-mono font-bold text-slate-100 text-glow glitch" data-text="Academic Timeline">
              Academic Timeline
            </h2>
            <div className="h-px bg-cyber-warning/30 flex-1" />
          </div>
          <p className="text-slate-400 font-mono text-sm uppercase tracking-widest pl-12">
            Education Records
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative border-l-2 border-cyber-warning/30 ml-4 md:ml-6 space-y-12">
          {educationData.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative pl-10 md:pl-14"
            >
              {/* Node */}
              <div className="absolute -left-[22px] top-2 w-11 h-11 bg-cyber-bg border-2 border-cyber-warning rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.4)] z-10">
                <GraduationCap size={20} className="text-cyber-warning" />
              </div>

              {/* Card */}
              <div className="glass-panel p-6 border-l-4 border-l-cyber-warning group hover:-translate-y-1 transition-transform duration-300">
                <h3 className="text-xl md:text-2xl font-bold font-mono text-white mb-3 group-hover:text-cyber-warning transition-colors">
                  {edu.degree}
                </h3>

                <div className="flex flex-col sm:flex-row gap-4 text-sm font-mono text-slate-400 mb-4 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Award size={15} className="text-cyber-primary" />
                    <span className="text-cyber-primary font-semibold">{edu.institution}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={15} className="text-slate-500" />
                    {edu.location}
                  </div>
                  <div className="flex items-center gap-2 ml-auto">
                    <Calendar size={15} className="text-cyber-secondary" />
                    {edu.years}
                  </div>
                  <div className="px-3 py-1 bg-cyber-warning/15 border border-cyber-warning/40 text-cyber-warning rounded text-xs font-bold tracking-wider">
                    {edu.grade}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {edu.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono px-3 py-1 rounded border border-cyber-warning/20 bg-cyber-warning/5 text-slate-400 group-hover:border-cyber-warning/50 group-hover:text-cyber-warning transition-all"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
