import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Search, Map, Scissors, RefreshCw, Send } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: <Search size={24} />,
    title: 'Research',
    desc: 'Deep dive into your brand, audience, competitors and goals. We don\'t start editing until we understand your world.',
    color: '#6C63FF',
  },
  {
    num: '02',
    icon: <Map size={24} />,
    title: 'Planning',
    desc: 'Storyboard, shot list, timeline, and content calendar. Every second of your video is intentional.',
    color: '#3B82F6',
  },
  {
    num: '03',
    icon: <Scissors size={24} />,
    title: 'Editing',
    desc: 'Cinematic cuts, color grading, sound design, motion graphics — this is where the magic happens.',
    color: '#A78BFA',
  },
  {
    num: '04',
    icon: <RefreshCw size={24} />,
    title: 'Refinement',
    desc: 'Your feedback loop, perfected. We iterate until every frame feels exactly right.',
    color: '#6C63FF',
  },
  {
    num: '05',
    icon: <Send size={24} />,
    title: 'Delivery',
    desc: 'Final files in every format you need, delivered on time, with full licensing and source files.',
    color: '#3B82F6',
  },
];

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <section id="process" ref={ref} className="py-32 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F8F7FF 0%, #EEEAF8 100%)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-12" style={{ background: '#6C63FF' }} />
          <span className="font-mono-custom text-xs uppercase tracking-widest" style={{ color: '#6C63FF', fontFamily: 'DM Mono, monospace' }}>
            How We Work
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-bold mb-20 max-w-2xl"
          style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: '#1E1B4B', lineHeight: 1.05 }}
        >
          Our Creative<br /><span className="gradient-text">Process</span>
        </motion.h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-7 md:left-1/2 top-0 bottom-0 w-px" style={{ background: '#EEEAF8', transform: 'translateX(-50%)' }}>
            <motion.div
              className="absolute top-0 left-0 w-full"
              style={{ height: lineHeight, background: 'linear-gradient(180deg, #6C63FF, #3B82F6, #A78BFA)' }}
            />
          </div>

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
                  className={`relative flex items-center gap-8 md:gap-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  } md:mb-16`}
                >
                  {/* Content */}
                  <div className={`md:w-[calc(50%-3rem)] ml-16 md:ml-0 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:justify-end' : ''}`}>
                      <span className="font-mono-custom text-xs font-semibold uppercase tracking-widest"
                        style={{ color: step.color, fontFamily: 'DM Mono, monospace' }}>
                        {step.num}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-2xl md:text-3xl mb-3" style={{ color: '#1E1B4B' }}>{step.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#1E1B4B', opacity: 0.6 }}>{step.desc}</p>
                  </div>

                  {/* Center icon */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                    <motion.div
                      whileInView={{ scale: [0.8, 1.1, 1] }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${step.color}22, ${step.color}11)`, border: `2px solid ${step.color}33`, color: step.color, backdropFilter: 'blur(8px)', backgroundColor: 'rgba(248,247,255,0.9)' }}
                    >
                      {step.icon}
                    </motion.div>
                  </div>

                  {/* Right spacer */}
                  <div className="hidden md:block md:w-[calc(50%-3rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
