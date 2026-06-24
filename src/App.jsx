import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import LoadingScreen from './components/ui/LoadingScreen';
import CustomCursor from './components/ui/CustomCursor';
import ScrollProgress from './components/ui/ScrollProgress';
import Navbar from './components/ui/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Portfolio from './components/sections/Portfolio';
import Services from './components/sections/Services';
import Process from './components/sections/Process';
import Testimonials from './components/sections/Testimonials';
import Stats from './components/sections/Stats';
import { CTA, Footer } from './components/sections/CTAFooter';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  // Lenis smooth scroll — initialised once after load
  useEffect(() => {
    if (!loaded) return;
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [loaded]);

  return (
    <div className="grain" style={{ background: '#F8F7FF' }}>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {/* Cursor & progress always mounted so refs exist */}
      <CustomCursor />
      <ScrollProgress />

      {loaded && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Portfolio />
            <Services />
            <Process />
            <Testimonials />
            <Stats />
            <CTA />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
