import { useScrollEngine } from './hooks/useScrollEngine';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useScrollReveal } from './hooks/useScrollReveal';

import SkipToContent from './components/SkipToContent';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import BackToTop from './components/BackToTop';
import Divider from './components/Divider';

import HeroSection from './sections/HeroSection';
import SpecialsSection from './sections/SpecialsSection';
import PantrySection from './sections/PantrySection';
import RecipeSection from './sections/RecipeSection';
import PortfolioSection from './sections/PortfolioSection';
import ReviewsSection from './sections/ReviewsSection';
import OrderSection from './sections/OrderSection';
import Footer from './sections/Footer';

export default function App() {
  // Initialize smooth scroll engine (Lenis + GSAP)
  useScrollEngine();

  // Track scroll progress for navbar and back-to-top
  const { scrollPercent, isScrolled, showBackToTop } = useScrollProgress();

  // Initialize scroll-reveal animations (IntersectionObserver)
  useScrollReveal();

  return (
    <>
      {/* Skip to Content */}
      <SkipToContent />

      {/* Preloader */}
      <Preloader />

      {/* Scroll Progress Bar */}
      <ScrollProgress percent={scrollPercent} />

      {/* Navigation */}
      <Navbar isScrolled={isScrolled} />

      <main>
        {/* Section 1: The Kitchen (Hero) */}
        <HeroSection />

        {/* Section 2: Today's Specials (Services) */}
        <SpecialsSection />

        {/* Divider: Torn */}
        <Divider type="torn" />

        {/* Section 3: The Pantry (Skills) */}
        <PantrySection />

        {/* Divider: Dotted */}
        <Divider type="dotted" icon="🍕" />

        {/* Section 4: The Recipe (Process) */}
        <RecipeSection />

        {/* Divider: Torn */}
        <Divider type="torn" />

        {/* Section 5: Chef's Specials (Portfolio) */}
        <PortfolioSection />

        {/* Divider: Dotted */}
        <Divider type="dotted" icon="⭐" />

        {/* Section 6: Happy Customers (Testimonials) */}
        <ReviewsSection />

        {/* Divider: Steam */}
        <Divider type="steam" />

        {/* Section 7: Place Your Order (Contact) */}
        <OrderSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to Top */}
      <BackToTop visible={showBackToTop} />
    </>
  );
}
