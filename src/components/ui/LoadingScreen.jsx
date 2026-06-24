import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => { setDone(true); setTimeout(onComplete, 900); }, 200);
          return 100;
        }
        return prev + Math.random() * 18 + 4;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100000] flex flex-col items-center justify-center"
          style={{ background: '#F8F7FF' }}
        >
          {/* Animated blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30"
              style={{ background: 'radial-gradient(circle, #6C63FF 0%, transparent 70%)' }}
            />
            <motion.div
              animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)' }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-10">
            {/* Logo mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl"
                style={{ background: 'linear-gradient(135deg, #6C63FF 0%, #3B82F6 100%)' }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M8 8L24 16L8 24V8Z" fill="white" />
                  <circle cx="24" cy="16" r="3" fill="rgba(255,255,255,0.4)" />
                </svg>
              </div>
              <div className="font-display font-bold text-2xl" style={{ color: '#1E1B4B' }}>
                Editkaro<span style={{ color: '#6C63FF' }}>.in</span>
              </div>
            </motion.div>

            {/* Progress */}
            <div className="flex flex-col items-center gap-4 w-64">
              <div className="w-full h-0.5 rounded-full overflow-hidden" style={{ background: '#EEEAF8' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #6C63FF, #3B82F6, #A78BFA)', width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <div className="font-mono-custom text-xs" style={{ color: '#6C63FF', fontFamily: 'DM Mono, monospace' }}>
                {Math.min(Math.round(progress), 100)}% — Loading Experience
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
