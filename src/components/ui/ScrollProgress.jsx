import { useScroll, motion, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[99997]"
      aria-hidden="true"
      role="presentation"
    >
      <div className="w-full h-full" style={{ background: 'linear-gradient(90deg, #6C63FF, #3B82F6, #A78BFA)' }} />
    </motion.div>
  );
}
