import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 500, suffix: '+', label: 'Videos Edited', sub: 'Across all formats and genres' },
  { value: 120, suffix: '+', label: 'Brands Served', sub: 'From startups to Fortune 500s' },
  { value: 4.8, suffix: 'M+', label: 'Campaign Reach', sub: 'Total impressions delivered', decimal: true },
  { value: 5, suffix: ' Yrs', label: 'Experience', sub: 'Of premium creative delivery' },
];

function Counter({ target, suffix, decimal, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setCount(decimal ? Math.round(current * 10) / 10 : Math.round(current));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-display font-bold gradient-text" style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}>
      {decimal ? count.toFixed(1) : count}{suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="stats" ref={ref} className="py-24 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #2D2A6E 50%, #1E1B4B 100%)' }}>
      {/* Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #6C63FF, transparent)' }}
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #3B82F6, transparent)' }}
        />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12" style={{ background: 'rgba(255,255,255,0.3)' }} />
            <span className="font-mono-custom text-xs uppercase tracking-widest text-white opacity-60" style={{ fontFamily: 'DM Mono, monospace' }}>
              By the Numbers
            </span>
            <div className="h-px w-12" style={{ background: 'rgba(255,255,255,0.3)' }} />
          </div>
          <h2 className="font-display font-bold text-white"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Numbers That<br />Speak Louder
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1 }}
              whileHover={{ y: -6, boxShadow: '0 24px 48px rgba(108,99,255,0.25)' }}
              className="text-center p-8 rounded-3xl transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}
            >
              <Counter target={stat.value} suffix={stat.suffix} decimal={stat.decimal} />
              <div className="font-display font-semibold text-white text-lg mt-2">{stat.label}</div>
              <div className="text-xs mt-2 text-white opacity-40 leading-relaxed">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
