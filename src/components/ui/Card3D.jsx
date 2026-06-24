import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

/**
 * CSS-only 3D tilt card — no Three.js overhead.
 * Feels 3D via perspective + rotateX/Y transforms.
 */
export default function Card3D({ children, className = '', style = {}, intensity = 12 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), springConfig);
  const glareX = useTransform(x, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(y, [-0.5, 0.5], ['0%', '100%']);

  const onMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 800,
        ...style,
      }}
      className={`relative ${className}`}
    >
      {children}
      {/* Glare overlay */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]) =>
              `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.18) 0%, transparent 65%)`
          ),
          zIndex: 10,
        }}
      />
    </motion.div>
  );
}
