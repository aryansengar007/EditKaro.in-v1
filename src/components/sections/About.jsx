import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Film, Megaphone, Palette, TrendingUp, Users, Award } from 'lucide-react';
import Card3D from '../ui/Card3D';

const services = [
  { icon: <Film size={22} />,       title: 'Video Editing',           desc: 'Cinematic cuts, colour grading, motion design — every frame tells your story.', color: '#6C63FF' },
  { icon: <Megaphone size={22} />,  title: 'Social Media Marketing',  desc: 'Platform-native strategy for Instagram, YouTube, TikTok & more.',              color: '#3B82F6' },
  { icon: <Palette size={22} />,    title: 'Brand Storytelling',      desc: 'We build emotional narratives that make audiences stop scrolling.',             color: '#A78BFA' },
  { icon: <TrendingUp size={22} />, title: 'Ad Campaign Creatives',   desc: 'Performance-driven creatives built to convert, not just impress.',             color: '#6C63FF' },
  { icon: <Users size={22} />,      title: 'Content Strategy',        desc: 'Data-backed content plans aligned with your growth targets.',                  color: '#3B82F6' },
  { icon: <Award size={22} />,      title: 'Motion Graphics',         desc: 'Animated text, transitions and graphics that bring ideas to life.',            color: '#A78BFA' },
];

const tracks = ['Video Track 1', 'Audio', 'Colour Grade', 'Motion GFX'];
const widths  = [85, 100, 60, 45];
const trackColors = [
  ['#6C63FF88', '#3B82F644'],
  ['#3B82F688', '#A78BFA44'],
  ['#A78BFA88', '#6C63FF44'],
  ['#6C63FF88', '#3B82F644'],
];

export default function About() {
  const ref = useRef(null);
  const inV = useInView(ref, { once: true, margin: '-100px' });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 36 },
    animate: inV ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.75, delay, ease: [0.23, 1, 0.32, 1] },
  });

  return (
    <section id="about" ref={ref} className="relative py-36 px-6 overflow-hidden">
      {/* subtle top accent */}
      <div className="absolute -top-40 right-0 w-[480px] h-[480px] rounded-full pointer-events-none opacity-[0.07]"
        style={{ background: 'radial-gradient(circle,#6C63FF,transparent)', transform: 'translate(25%,0)' }} />

      <div className="max-w-7xl mx-auto">

        {/* ── Label ── */}
        <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-6">
          <div className="h-px w-10" style={{ background: '#6C63FF' }} />
          <span style={{ fontFamily: 'DM Mono,monospace', fontSize: 11, color: '#6C63FF', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            Who We Are
          </span>
        </motion.div>

        {/* ── Two-col layout ── */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-28">

          {/* Left: copy */}
          <div>
            <motion.h2 {...fadeUp(0.08)}
              className="font-display font-bold mb-6 leading-[1.04]"
              style={{ fontSize: 'clamp(34px,5vw,62px)', color: '#1E1B4B' }}>
              We don't just edit videos —<br />
              <span className="gradient-text">we engineer virality.</span>
            </motion.h2>

            <motion.p {...fadeUp(0.18)} className="text-[17px] leading-relaxed mb-5"
              style={{ color: '#1E1B4B', opacity: 0.62 }}>
              Editkaro.in is a premium video editing and social media agency built for brands that want to dominate digital. We blend cinematic craft with data-backed strategy — creating content that doesn't just look beautiful, it performs.
            </motion.p>

            <motion.p {...fadeUp(0.26)} className="text-[15px] leading-relaxed mb-10"
              style={{ color: '#1E1B4B', opacity: 0.45 }}>
              From short-form Reels to full-length documentaries, gaming edits to eCommerce ads — every project gets the same obsessive attention to detail.
            </motion.p>

            <motion.div {...fadeUp(0.34)}>
              <motion.button
                data-hover
                whileHover={{ scale: 1.05, boxShadow: '0 14px 40px rgba(108,99,255,0.4)' }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 rounded-xl text-white font-display font-semibold text-sm"
                style={{ background: 'linear-gradient(135deg,#6C63FF,#3B82F6)', boxShadow: '0 4px 22px rgba(108,99,255,0.3)' }}
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See Our Portfolio →
              </motion.button>
            </motion.div>
          </div>

          {/* Right: 3D editor card */}
          <motion.div {...fadeUp(0.16)}>
            <Card3D intensity={10} className="rounded-3xl">
              <div className="glass-dark rounded-3xl p-8 overflow-hidden relative"
                style={{ border: '1px solid rgba(108,99,255,0.14)', boxShadow: '0 32px 80px rgba(108,99,255,0.12)' }}>
                <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full opacity-15 pointer-events-none"
                  style={{ background: 'radial-gradient(circle,#6C63FF,transparent)' }} />

                {/* Titlebar */}
                <div className="flex items-center gap-2 mb-7">
                  {['#FF5F57','#FFBD2E','#28CA41'].map((c,i) => (
                    <div key={i} className="w-3 h-3 rounded-full" style={{ background: c }} />
                  ))}
                  <span className="ml-3 text-[11px] opacity-35" style={{ fontFamily: 'DM Mono,monospace' }}>
                    editkaro_hero.prproj
                  </span>
                </div>

                {/* Timeline tracks */}
                <div className="space-y-2.5 mb-7">
                  {tracks.map((t, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-[10px] opacity-35 w-20 shrink-0" style={{ fontFamily: 'DM Mono,monospace' }}>{t}</span>
                      <div className="flex-1 h-5 rounded-md overflow-hidden" style={{ background: 'rgba(108,99,255,0.07)' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inV ? { width: `${widths[i]}%` } : {}}
                          transition={{ duration: 1.3, delay: 0.7 + i * 0.12, ease: [0.23,1,0.32,1] }}
                          className="h-full rounded-md"
                          style={{ background: `linear-gradient(90deg,${trackColors[i][0]},${trackColors[i][1]})` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mini stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[['240','Cuts'],['48','FX'],['12','Grades']].map(([v,l],i) => (
                    <div key={i} className="text-center p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.55)' }}>
                      <div className="font-display font-bold text-lg gradient-text">{v}</div>
                      <div className="text-[10px] opacity-45 mt-0.5">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card3D>

            {/* Floating chip */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-5 -left-5 glass px-4 py-2.5 rounded-2xl shadow-xl"
              style={{ border: '1px solid rgba(108,99,255,0.15)', zIndex: 10 }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#28CA41' }} />
                <span className="text-xs font-display font-semibold" style={{ color: '#1E1B4B' }}>Live Project Active</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Services grid ── */}
        <div>
          <motion.h3 {...fadeUp(0.3)} className="text-center font-display font-bold text-3xl md:text-4xl mb-12"
            style={{ color: '#1E1B4B' }}>
            What We Do Best
          </motion.h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inV ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.38 + i * 0.07 }}
              >
                <Card3D intensity={8} className="h-full rounded-2xl">
                  <motion.div
                    whileHover={{ boxShadow: `0 24px 56px ${s.color}26` }}
                    className="glass rounded-2xl p-6 h-full transition-all duration-300 group"
                    style={{ border: `1px solid ${s.color}18` }}
                  >
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${s.color}18`, color: s.color }}>
                      {s.icon}
                    </div>
                    <h4 className="font-display font-semibold text-base mb-2" style={{ color: '#1E1B4B' }}>{s.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: '#1E1B4B', opacity: 0.55 }}>{s.desc}</p>
                  </motion.div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
