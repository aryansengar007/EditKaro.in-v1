import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Founder, GlowUp Skincare',
    rating: 5,
    text: 'Editkaro completely transformed our content game. Our Instagram Reels went from 2K to 180K average views within 3 months. The quality of editing is just insane — every video feels like a brand film.',
    avatar: 'PS',
    color: '#6C63FF',
    metric: '90× reach increase',
  },
  {
    name: 'Rahul Verma',
    role: 'Head of Marketing, TechPro Solutions',
    rating: 5,
    text: 'We needed explainer videos and ad creatives fast. Editkaro delivered 8 assets in 5 days — all production quality. Our Google Ads CTR jumped by 40% immediately. Worth every rupee.',
    avatar: 'RV',
    color: '#3B82F6',
    metric: '+40% ad CTR',
  },
  {
    name: 'Arjun Nair',
    role: 'YouTube Creator, 2.4M Subscribers',
    rating: 5,
    text: 'I was spending 20 hours a week editing. Editkaro took over and the quality actually got better. My watch time is up 35%, and I have my life back. Best investment I\'ve made as a creator.',
    avatar: 'AN',
    color: '#A78BFA',
    metric: '+35% watch time',
  },
  {
    name: 'Sneha Kulkarni',
    role: 'Director, Nomad Travels',
    rating: 5,
    text: 'Our travel documentary needed to feel like a Netflix production on a startup budget. Editkaro nailed it — the color grading alone made me emotional. Our film got shortlisted at two festivals.',
    avatar: 'SK',
    color: '#6C63FF',
    metric: '2 festival shortlists',
  },
  {
    name: 'Dev Malhotra',
    role: 'Esports Manager, Team Apex',
    rating: 5,
    text: 'The gaming highlight edits are fire. The team understands gaming culture — the transitions, the music sync, the pacing — it\'s all perfect. Our clips consistently hit 500K+ on YouTube.',
    avatar: 'DM',
    color: '#3B82F6',
    metric: '500K+ per clip',
  },
];

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} className="fill-current" style={{ color: '#F59E0B' }} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent(c => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const go = (dir) => {
    setDirection(dir);
    setCurrent(c => (c + dir + testimonials.length) % testimonials.length);
  };

  const t = testimonials[current];

  return (
    <section id="testimonials" ref={ref} className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(ellipse, #6C63FF, transparent)' }} />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-12" style={{ background: '#6C63FF' }} />
          <span className="font-mono-custom text-xs uppercase tracking-widest" style={{ color: '#6C63FF', fontFamily: 'DM Mono, monospace' }}>
            Client Love
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-bold mb-16"
          style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: '#1E1B4B', lineHeight: 1.05 }}
        >
          What Our Clients<br /><span className="gradient-text">Say</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 items-center">
            {/* Left: all avatars */}
            <div className="flex lg:flex-col gap-3">
              {testimonials.map((t, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 text-left"
                  style={{
                    background: current === i ? `${testimonials[i].color}18` : 'rgba(255,255,255,0.5)',
                    border: `1px solid ${current === i ? testimonials[i].color + '44' : 'transparent'}`,
                  }}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-display font-bold shrink-0"
                    style={{ background: `linear-gradient(135deg, ${testimonials[i].color}, ${testimonials[i].color}99)` }}>
                    {t.avatar}
                  </div>
                  <div className="hidden lg:block min-w-0">
                    <div className="font-display font-semibold text-xs truncate" style={{ color: '#1E1B4B' }}>{t.name}</div>
                    <div className="text-[10px] opacity-50 truncate">{t.role}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Right: testimonial card */}
            <div className="relative overflow-hidden rounded-3xl" style={{ minHeight: '320px' }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * 40 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="glass rounded-3xl p-8 md:p-10 h-full"
                  style={{ border: `1px solid ${t.color}22` }}
                >
                  <Quote size={32} className="mb-6 opacity-30" style={{ color: t.color }} />
                  <p className="text-lg md:text-xl leading-relaxed mb-8 font-body"
                    style={{ color: '#1E1B4B', opacity: 0.85 }}>
                    "{t.text}"
                  </p>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-display font-bold"
                        style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}99)` }}>
                        {t.avatar}
                      </div>
                      <div>
                        <div className="font-display font-bold text-base" style={{ color: '#1E1B4B' }}>{t.name}</div>
                        <div className="text-xs opacity-50 mt-0.5">{t.role}</div>
                        <Stars count={t.rating} />
                      </div>
                    </div>
                    <div className="px-4 py-2 rounded-xl font-display font-bold text-sm"
                      style={{ background: `${t.color}18`, color: t.color }}>
                      {t.metric}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 mt-6 justify-end">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={() => go(-1)}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center"
              style={{ border: '1px solid rgba(108,99,255,0.2)', color: '#6C63FF' }}>
              <ChevronLeft size={16} />
            </motion.button>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className="rounded-full transition-all duration-300"
                  style={{ width: current === i ? 24 : 6, height: 6, background: current === i ? '#6C63FF' : '#EEEAF8' }} />
              ))}
            </div>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={() => go(1)}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center"
              style={{ border: '1px solid rgba(108,99,255,0.2)', color: '#6C63FF' }}>
              <ChevronRight size={16} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
