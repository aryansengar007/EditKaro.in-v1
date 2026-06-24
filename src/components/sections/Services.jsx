import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Film, Megaphone, BookOpen, Zap, Target, Layers } from 'lucide-react';
import Card3D from '../ui/Card3D';

const services = [
  {
    icon: <Film size={28} />, title: 'Video Editing', color: '#6C63FF',
    gradient: 'linear-gradient(135deg,rgba(108,99,255,0.13) 0%,rgba(59,130,246,0.07) 100%)',
    border: 'rgba(108,99,255,0.18)',
    desc: 'From raw rushes to cinematic masterpiece. Cuts, colour, sound design and delivery across all formats.',
    features: ['Premiere Pro / DaVinci','Colour grading','4K / Vertical / Wide','Sound design'],
  },
  {
    icon: <Megaphone size={28} />, title: 'Social Media Marketing', color: '#3B82F6',
    gradient: 'linear-gradient(135deg,rgba(59,130,246,0.13) 0%,rgba(167,139,250,0.07) 100%)',
    border: 'rgba(59,130,246,0.18)',
    desc: 'Platform-native content strategy, scheduling, community management and analytics.',
    features: ['Instagram, YouTube, TikTok','Content calendar','Analytics & reporting','Trend tracking'],
  },
  {
    icon: <BookOpen size={28} />, title: 'Brand Storytelling', color: '#A78BFA',
    gradient: 'linear-gradient(135deg,rgba(167,139,250,0.13) 0%,rgba(108,99,255,0.07) 100%)',
    border: 'rgba(167,139,250,0.18)',
    desc: 'Emotional narratives from brand films and founder stories to documentary-style content.',
    features: ['Brand films','Founder stories','Documentary style','Origin narratives'],
  },
  {
    icon: <Zap size={28} />, title: 'Motion Graphics', color: '#6C63FF',
    gradient: 'linear-gradient(135deg,rgba(108,99,255,0.13) 0%,rgba(236,72,153,0.07) 100%)',
    border: 'rgba(108,99,255,0.18)',
    desc: 'Animated logos, kinetic typography, UI animations and full motion-design systems.',
    features: ['After Effects','Lottie animations','Logo animation','Kinetic type'],
  },
  {
    icon: <Target size={28} />, title: 'Ad Campaign Creatives', color: '#3B82F6',
    gradient: 'linear-gradient(135deg,rgba(59,130,246,0.13) 0%,rgba(16,185,129,0.07) 100%)',
    border: 'rgba(59,130,246,0.18)',
    desc: 'High-converting creatives for Meta, Google, YouTube — optimised for ROAS, not just aesthetics.',
    features: ['Meta Ads','YouTube pre-rolls','A/B test variants','ROAS-focused'],
  },
  {
    icon: <Layers size={28} />, title: 'Content Strategy', color: '#A78BFA',
    gradient: 'linear-gradient(135deg,rgba(167,139,250,0.13) 0%,rgba(59,130,246,0.07) 100%)',
    border: 'rgba(167,139,250,0.18)',
    desc: 'Audience research, competitor audits, content pillars and quarterly roadmaps.',
    features: ['Audience research','Competitor analysis','Content pillars','Quarterly roadmaps'],
  },
];

export default function Services() {
  const ref = useRef(null);
  const inV = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" ref={ref} className="py-36 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full pointer-events-none opacity-[0.055]"
        style={{ background: 'radial-gradient(ellipse,#6C63FF,transparent)' }} />

      <div className="max-w-7xl mx-auto">
        {/* label */}
        <motion.div initial={{ opacity:0,y:20 }} animate={inV?{opacity:1,y:0}:{}} transition={{ duration:0.6 }}
          className="flex items-center gap-3 mb-6">
          <div className="h-px w-10" style={{ background:'#6C63FF' }} />
          <span style={{ fontFamily:'DM Mono,monospace',fontSize:11,color:'#6C63FF',letterSpacing:'0.18em',textTransform:'uppercase' }}>Services</span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.h2 initial={{ opacity:0,y:32 }} animate={inV?{opacity:1,y:0}:{}} transition={{ duration:0.8,delay:0.1 }}
            className="font-display font-bold leading-[1.04]"
            style={{ fontSize:'clamp(32px,5vw,56px)',color:'#1E1B4B' }}>
            Everything Your Brand<br /><span className="gradient-text">Needs to Grow</span>
          </motion.h2>
          <motion.p initial={{ opacity:0,y:20 }} animate={inV?{opacity:1,y:0}:{}} transition={{ duration:0.7,delay:0.2 }}
            className="max-w-sm text-sm leading-relaxed" style={{ color:'#1E1B4B',opacity:0.5 }}>
            End-to-end creative services from concept to delivery — one team, full accountability.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity:0,y:40 }} animate={inV?{opacity:1,y:0}:{}}
              transition={{ duration:0.7,delay:0.18+i*0.09 }}>
              <Card3D intensity={9} className="h-full rounded-3xl">
                <motion.div whileHover={{ boxShadow:`0 32px 64px ${s.color}22` }}
                  className="h-full rounded-3xl p-7 group transition-all duration-400 cursor-default"
                  style={{ background:s.gradient,border:`1px solid ${s.border}` }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{ background:`${s.color}1a`,color:s.color }}>
                    {s.icon}
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3" style={{ color:'#1E1B4B' }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color:'#1E1B4B',opacity:0.6 }}>{s.desc}</p>
                  <ul className="space-y-2">
                    {s.features.map((f,j) => (
                      <li key={j} className="flex items-center gap-2.5 text-xs" style={{ color:'#1E1B4B',opacity:0.68 }}>
                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background:s.color }} />{f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
