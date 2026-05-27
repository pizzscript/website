import { useEffect, useRef, useState } from 'react';
import { useLottie } from '../hooks/useLottie';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const lottieRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useLottie(lottieRef, {
    path: '/assets/animations/pizza-glitch-animation.json',
    loop: true,
    autoplay: true,
  });

  useEffect(() => {
    document.body.classList.add('loading');

    const fill = fillRef.current;
    if (fill) {
      setTimeout(() => { fill.style.width = '40%'; }, 800);
      setTimeout(() => { fill.style.width = '75%'; }, 2500);
      setTimeout(() => { fill.style.width = '95%'; }, 4500);
    }

    // Hide preloader after 5 seconds
    const timer = setTimeout(() => {
      if (fill) fill.style.width = '100%';

      setTimeout(() => {
        setFadeOut(true);
        document.body.classList.remove('loading');

        // Refresh ScrollTrigger after preloader stabilizes layout
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          ScrollTrigger.refresh();
        });

        setTimeout(() => {
          setVisible(false);
        }, 500);
      }, 300);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove('loading');
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      id="preloader"
      role="status"
      aria-label="Loading"
      className={fadeOut ? 'fade-out' : ''}
    >
      <div
        ref={lottieRef}
        id="preloader-lottie"
        style={{ width: 280, height: 280 }}
      />
      <div className="preloader-text">PIZZA SCRIPT</div>
      <div className="preloader-bar">
        <div className="preloader-bar-fill" id="preloader-fill" ref={fillRef} />
      </div>
    </div>
  );
}
