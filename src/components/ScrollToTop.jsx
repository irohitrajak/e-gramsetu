import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scrolls window to top on every route change
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      // no-op (SSR / older browsers)
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
}
