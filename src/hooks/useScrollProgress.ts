import { useEffect, useState, useCallback } from 'react';
import { throttle, getScrollPercent } from '../utils/helpers';

/**
 * Tracks scroll progress percentage and navbar scroll state.
 * Returns scrollPercent (0-100), isScrolled (past 100px), showBackToTop.
 */
export function useScrollProgress() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 100);
    setShowBackToTop(scrollY > window.innerHeight);

    const percent = getScrollPercent() * 100;
    setScrollPercent(percent);
  }, []);

  useEffect(() => {
    const throttledScroll = throttle(handleScroll, 16);
    window.addEventListener('scroll', throttledScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [handleScroll]);

  return { scrollPercent, isScrolled, showBackToTop };
}
