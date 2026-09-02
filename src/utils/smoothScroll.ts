import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initSmoothScroll(): () => void {
  const isTouch = typeof window !== 'undefined' && (
    window.matchMedia('(pointer: coarse)').matches ||
    window.innerWidth <= 768
  );

  if (isTouch) {
    const handleNativeScroll = () => {
      ScrollTrigger.update();
    };
    window.addEventListener('scroll', handleNativeScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleNativeScroll);
    };
  }

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  const updateTicker = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(updateTicker);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(updateTicker);
    lenis.destroy();
  };
}

