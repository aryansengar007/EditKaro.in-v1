import { useEffect, useRef } from 'react';

/**
 * Zero-lag cursor — uses raw RAF + CSS transform (no React state in hot path).
 * A tiny ring follows the dot with a light spring via lerp.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only on pointer devices
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100, my = -100;   // mouse
    let rx = -100, ry = -100;   // ring (lerped)
    let scale = 1;               // ring scale target
    let raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onOver = (e) => {
      const el = e.target;
      if (
        el.tagName === 'BUTTON' ||
        el.tagName === 'A' ||
        el.closest('button') ||
        el.closest('a') ||
        el.closest('[data-hover]')
      ) {
        scale = 2.2;
        ring.style.background = 'rgba(108,99,255,0.12)';
      }
    };

    const onOut = () => {
      scale = 1;
      ring.style.background = 'transparent';
    };

    const loop = () => {
      // Dot: instant
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;

      // Ring: lerp (0.18 = very snappy, no perceptible lag)
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px) scale(${scale})`;

      raf = requestAnimationFrame(loop);
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, true);
    document.addEventListener('mouseout', onOut, true);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver, true);
      document.removeEventListener('mouseout', onOut, true);
    };
  }, []);

  return (
    <>
      {/* Crisp dot — instant */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: '50%',
          background: '#6C63FF',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
        }}
      />
      {/* Soft ring — light lag */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 36, height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(108,99,255,0.55)',
          background: 'transparent',
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform',
          transition: 'background 0.2s, scale 0.25s',
        }}
      />
    </>
  );
}
