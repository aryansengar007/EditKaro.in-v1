import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Play, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import HeroCanvas from '../ui/HeroCanvas';

const stats = [
  { value: '500+', label: 'Videos Edited' },
  { value: '120+', label: 'Brands Served' },
  { value: '4.8M+', label: 'Reach' },
  { value: '5 Yrs', label: 'Experience' },
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity   = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word-by-word 3D reveal
      gsap.from('.hw', {
        yPercent: 110,
        rotateX: -50,
        opacity: 0,
        stagger: 0.07,
        duration: 1.1,
        delay: 0.6,
        ease: 'power4.out',
      });
      gsap.from('.hero-body', {
        y: 28,
        opacity: 0,
        duration: 0.9,
        delay: 1.2,
        ease: 'power3.out',
      });
      gsap.from('.hero-btn', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        delay: 1.4,
        ease: 'power3.out',
      });
      gsap.from('.hero-stat', {
        y: 16,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        delay: 1.6,
        ease: 'power3.out',
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #F8F7FF 0%, #EEE9FF 45%, #E8F0FF 100%)' }}
    >
      {/* ── 3D Canvas background ── */}
      <HeroCanvas />

      {/* ── Frosted radial centre glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(248,247,255,0.82) 0%, rgba(248,247,255,0.3) 70%, transparent 100%)',
          zIndex: 1,
        }}
      />

      {/* ── Content ── */}
      <motion.div
        style={{ y: contentY, opacity, zIndex: 2 }}
        className="relative w-full max-w-6xl mx-auto px-6 flex flex-col items-center pt-28 pb-20"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mb-10 flex items-center gap-2 px-4 py-2 rounded-full glass shadow-lg"
          style={{ border: '1px solid rgba(108,99,255,0.2)' }}
        >
          <Sparkles size={13} style={{ color: '#6C63FF' }} />
          <span className="text-xs font-display font-semibold uppercase tracking-[0.18em]" style={{ color: '#6C63FF' }}>
            Premium Video Agency · Delhi, India
          </span>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#6C63FF' }} />
        </motion.div>

        {/* ── Headline ── */}
        <div
          className="text-center mb-7 select-none"
          style={{ perspective: '700px' }}
        >
          <div className="overflow-hidden leading-none">
            {['Crafting', 'Viral'].map((w, i) => (
              <span
                key={w}
                className={`hw inline-block font-display font-bold ${i === 1 ? 'gradient-text mr-0' : ''}`}
                style={{
                  fontSize: 'clamp(54px, 8.5vw, 118px)',
                  marginRight: i === 0 ? 'clamp(12px,1.5vw,28px)' : 0,
                  display: 'inline-block',
                }}
              >
                {w}
              </span>
            ))}
          </div>
          <div className="overflow-hidden leading-none">
            {['Stories', 'Through', 'Video.'].map((w, i) => (
              <span
                key={w}
                className={`hw inline-block font-display font-bold ${i === 2 ? 'gradient-text' : ''}`}
                style={{
                  fontSize: 'clamp(54px, 8.5vw, 118px)',
                  marginRight: i < 2 ? 'clamp(12px,1.5vw,28px)' : 0,
                  color: i < 2 ? '#1E1B4B' : undefined,
                  display: 'inline-block',
                }}
              >
                {w}
              </span>
            ))}
          </div>
        </div>

        {/* Sub */}
        <p
          className="hero-body text-center max-w-2xl mb-11 leading-relaxed"
          style={{ fontSize: 'clamp(15px, 1.8vw, 19px)', color: '#1E1B4B', opacity: 0.58 }}
        >
          We transform brands through cinematic editing, social media content,
          <br className="hidden md:block" /> and performance-driven storytelling.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <motion.button
            data-hover
            className="hero-btn flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-display font-semibold text-[15px]"
            style={{
              background: 'linear-gradient(135deg,#6C63FF 0%,#3B82F6 100%)',
              boxShadow: '0 8px 32px rgba(108,99,255,0.38)',
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 14px 44px rgba(108,99,255,0.5)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Play size={17} className="fill-white" />
            View Our Work
          </motion.button>

          <motion.button
            data-hover
            className="hero-btn flex items-center gap-2 px-8 py-4 rounded-2xl font-display font-semibold text-[15px] glass border"
            style={{ color: '#1E1B4B', borderColor: 'rgba(108,99,255,0.22)' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Your Project
            <ArrowDown size={15} style={{ rotate: '-90deg' }} />
          </motion.button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="hero-stat glass rounded-2xl py-5 px-4 text-center"
              style={{ border: '1px solid rgba(108,99,255,0.12)', boxShadow: '0 4px 24px rgba(108,99,255,0.08)' }}
              whileHover={{ y: -5, boxShadow: '0 16px 40px rgba(108,99,255,0.18)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            >
              <div className="font-display font-bold gradient-text" style={{ fontSize: 'clamp(22px,3vw,30px)' }}>
                {s.value}
              </div>
              <div className="text-[11px] mt-1 font-body" style={{ color: '#1E1B4B', opacity: 0.48 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-45 hover:opacity-80 transition-opacity"
        style={{ zIndex: 5 }}
      >
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '0.18em', color: '#1E1B4B', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <ArrowDown size={14} style={{ color: '#6C63FF' }} />
      </motion.button>
    </section>
  );
}
