import { useRef } from 'react';
import { useHeroCanvas } from '../hooks/useHeroCanvas';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useHeroCanvas(canvasRef, sectionRef);

  return (
    <section id="kitchen" className="hero-scroll-driver" ref={sectionRef}>
      <div className="hero-sticky">
        {/* Scroll Canvas Wrapper */}
        <div className="hero-canvas-wrap">
          <canvas id="hero-canvas" ref={canvasRef} />
        </div>

        {/* Mobile Hero Content Overlay */}
        <div className="hero-mobile-overlay">
          <div className="hero-mobile-content">
            <h1 className="hero-mobile-title">
              <span className="hero-title-line hero-title-pizza">PIZZA</span>
              <span className="hero-title-line hero-title-script">SCRIPT</span>
            </h1>
            <p className="hero-mobile-tagline">
              Hand-crafted websites,
              <br />
              made from scratch.
            </p>
            <div className="hero-mobile-ctas">
              <a href="#specials" className="btn btn-neon hero-mobile-btn">
                🍕 View Menu
              </a>
              <a href="#order" className="btn btn-primary hero-mobile-btn">
                ⚡ Place Order
              </a>
            </div>
          </div>
        </div>

        <div className="hero-scroll-hint" aria-hidden="true">
          <span>Scroll to explore</span>
          <span className="scroll-arrow">↓</span>
        </div>
      </div>
    </section>
  );
}
