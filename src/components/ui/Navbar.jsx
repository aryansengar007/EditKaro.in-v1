import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#cta' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-0 left-0 right-0 z-[9999] px-6 py-4"
      >
        <div className={`max-w-7xl mx-auto flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-500 ${
          scrolled
            ? 'glass shadow-xl shadow-indigo-100/40'
            : 'bg-transparent'
        }`}>
          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2.5 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
              style={{ background: 'linear-gradient(135deg, #6C63FF 0%, #3B82F6 100%)' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 4L12 8L4 12V4Z" fill="white" />
              </svg>
            </div>
            <span className="font-display font-bold text-lg" style={{ color: '#1E1B4B' }}>
              Editkaro<span style={{ color: '#6C63FF' }}>.in</span>
            </span>
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="relative font-body text-sm font-medium hover-underline transition-colors"
                style={{ color: '#1E1B4B', opacity: 0.7 }}
                onMouseEnter={e => e.target.style.opacity = 1}
                onMouseLeave={e => e.target.style.opacity = 0.7}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <motion.button
              onClick={() => scrollTo('#cta')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2.5 rounded-xl text-sm font-display font-semibold text-white shadow-lg"
              style={{ background: 'linear-gradient(135deg, #6C63FF 0%, #3B82F6 100%)', boxShadow: '0 4px 20px rgba(108,99,255,0.35)' }}
            >
              Start Project
            </motion.button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: '#1E1B4B' }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-4 right-4 z-[9998] rounded-2xl glass shadow-2xl p-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-left font-display font-semibold text-lg py-2 border-b"
                  style={{ color: '#1E1B4B', borderColor: '#EEEAF8' }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => scrollTo('#cta')}
                className="mt-2 w-full py-3 rounded-xl text-white font-display font-semibold"
                style={{ background: 'linear-gradient(135deg, #6C63FF, #3B82F6)' }}
              >
                Start Project
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
