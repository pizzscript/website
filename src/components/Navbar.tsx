import { useRef, useState, useEffect, useCallback } from 'react';
import { useLottie } from '../hooks/useLottie';

interface NavbarProps {
  isScrolled: boolean;
}

const NAV_LINKS = [
  { href: '#specials', label: 'Modules', section: 'specials' },
  { href: '#pantry', label: 'Mainframe', section: 'pantry' },
  { href: '#recipe', label: 'Deployment', section: 'recipe' },
  { href: '#chef-specials', label: 'Case Studies', section: 'chef-specials' },
  { href: '#reviews', label: 'User Logs', section: 'reviews' },
];

const MOBILE_LINKS = [
  { href: '#specials', label: 'Modules' },
  { href: '#pantry', label: 'Mainframe' },
  { href: '#recipe', label: 'Deployment' },
  { href: '#chef-specials', label: 'Portfolio' },
  { href: '#reviews', label: 'Client Logs' },
];

export default function Navbar({ isScrolled }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navLottieRef = useRef<HTMLDivElement>(null);

  const lottieInstance = useLottie(navLottieRef, {
    path: '/assets/animations/pizza-glitch-animation.json',
    loop: true,
    autoplay: true,
  });

  // Active section highlighting via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll('main .section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [mobileOpen]);

  // Toggle body class for mobile menu
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
    return () => document.body.classList.remove('mobile-menu-open');
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          setMobileOpen(false);
          const lenis = (window as unknown as Record<string, unknown>).lenis as
            | { scrollTo: (target: Element) => void }
            | undefined;
          if (lenis) {
            lenis.scrollTo(target);
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    },
    []
  );

  const handleLottieHover = useCallback(() => {
    if (lottieInstance.current) {
      lottieInstance.current.stop();
      lottieInstance.current.play();
    }
  }, [lottieInstance]);

  const handleLottieLeave = useCallback(() => {
    if (lottieInstance.current) {
      lottieInstance.current.stop();
    }
  }, [lottieInstance]);

  return (
    <header
      className={`navbar${isScrolled ? ' scrolled' : ''}`}
      id="navbar"
      role="banner"
    >
      <div className="navbar-inner">
        <a
          href="#kitchen"
          className="navbar-logo"
          aria-label="Pizza Script — Back to top"
          onClick={(e) => handleNavClick(e, '#kitchen')}
        >
          <div
            ref={navLottieRef}
            id="nav-lottie"
            className="logo-lottie"
            style={{ width: 56, height: 56 }}
            onMouseEnter={handleLottieHover}
            onMouseLeave={handleLottieLeave}
          />
          <span className="logo-text">Pizza Script</span>
        </a>

        <nav
          className="navbar-links"
          role="navigation"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.section}
              href={link.href}
              className={`navbar-link${activeSection === link.section ? ' active' : ''}`}
              data-section={link.section}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#order"
            className="btn btn-neon navbar-cta"
            aria-label="Go to the contact form to hire me"
            onClick={(e) => handleNavClick(e, '#order')}
          >
            ⚡ Initialize
          </a>
        </nav>

        <button
          className="hamburger"
          id="hamburger"
          aria-label="Toggle mobile navigation menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className="mobile-menu"
        id="mobile-menu"
        role="navigation"
        aria-label="Mobile navigation"
      >
        {MOBILE_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="mobile-menu-link"
            onClick={(e) => handleNavClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#order"
          className="btn btn-primary"
          onClick={(e) => handleNavClick(e, '#order')}
        >
          ⚡ Initialize
        </a>
      </div>
    </header>
  );
}
