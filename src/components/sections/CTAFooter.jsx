import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MessageSquare, ArrowRight } from 'lucide-react';

// SVG social icons (lucide-react doesn't export brand icons)
const IgIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
const YtIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/></svg>;
const TwIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const LiIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;

export function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="cta" ref={ref} className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, #6C63FF, transparent)' }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-px w-12" style={{ background: '#6C63FF' }} />
          <span className="font-mono-custom text-xs uppercase tracking-widest" style={{ color: '#6C63FF', fontFamily: 'DM Mono, monospace' }}>
            Let's Work Together
          </span>
          <div className="h-px w-12" style={{ background: '#6C63FF' }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-bold mb-6"
          style={{ fontSize: 'clamp(36px, 6vw, 72px)', color: '#1E1B4B', lineHeight: 1.0 }}
        >
          Ready to Make<br />
          <span className="gradient-text">Something Viral?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg leading-relaxed mb-12 max-w-2xl mx-auto"
          style={{ color: '#1E1B4B', opacity: 0.6 }}
        >
          Whether you need a single Reel or a full content strategy, we're ready to bring your vision to life. Let's start with a free 30-minute discovery call.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.a
            href="mailto:hello@editkaro.in"
            whileHover={{ scale: 1.04, boxShadow: '0 16px 50px rgba(108,99,255,0.45)' }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-display font-semibold text-base"
            style={{ background: 'linear-gradient(135deg, #6C63FF 0%, #3B82F6 100%)', boxShadow: '0 6px 30px rgba(108,99,255,0.35)' }}
          >
            <Mail size={18} />
            hello@editkaro.in
            <ArrowRight size={16} />
          </motion.a>
          <motion.a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl font-display font-semibold text-base glass border"
            style={{ color: '#1E1B4B', borderColor: 'rgba(108,99,255,0.2)' }}
          >
            <MessageSquare size={18} style={{ color: '#25D366' }} />
            WhatsApp Us
          </motion.a>
        </motion.div>

        {/* Glass contact card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass rounded-3xl p-8 max-w-lg mx-auto"
          style={{ border: '1px solid rgba(108,99,255,0.15)' }}
        >
          <div className="grid grid-cols-2 gap-6 text-center">
            {[
              { label: 'Response Time', value: '< 2 Hours' },
              { label: 'First Draft', value: '3–5 Days' },
              { label: 'Revisions', value: 'Unlimited' },
              { label: 'Support', value: '24/7' },
            ].map((item, i) => (
              <div key={i}>
                <div className="font-display font-bold text-xl gradient-text">{item.value}</div>
                <div className="text-xs opacity-50 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#cta' },
  ];

  const socials = [
    { icon: <IgIcon />, href: '#', label: 'Instagram' },
    { icon: <YtIcon />, href: '#', label: 'YouTube' },
    { icon: <TwIcon />, href: '#', label: 'Twitter / X' },
    { icon: <LiIcon />, href: '#', label: 'LinkedIn' },
  ];

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden px-6 pt-16 pb-8"
      style={{ background: '#1E1B4B' }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '28px 28px' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #6C63FF, #3B82F6)' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M5 5L13 9L5 13V5Z" fill="white" />
                </svg>
              </div>
              <span className="font-display font-bold text-xl text-white">
                Editkaro<span style={{ color: '#6C63FF' }}>.in</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Premium video editing & social media marketing agency. We craft viral stories for brands that want to dominate digital.
            </p>
            <div className="flex gap-3">
              {socials.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  aria-label={s.label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(108,99,255,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-semibold text-sm text-white mb-5 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm hover-underline transition-colors"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                    onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.9)'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-sm text-white mb-5 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              {[
                { label: 'hello@editkaro.in', href: 'mailto:hello@editkaro.in' },
                { label: '+91 99999 99999', href: 'tel:+919999999999' },
                { label: 'New Delhi, India', href: '#' },
              ].map((item, i) => (
                <li key={i}>
                  <a href={item.href}
                    className="text-sm hover-underline transition-colors"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                    onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.9)'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            © {new Date().getFullYear()} Editkaro.in. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Crafted with obsession · Delhi, India
          </p>
        </div>
      </div>
    </footer>
  );
}
