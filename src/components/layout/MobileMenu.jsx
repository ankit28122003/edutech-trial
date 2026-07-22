import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { NAV_LINKS } from '../../lib/constants';
import { DOMAINS } from '../../data/domains';
import CurrencySwitcher from './CurrencySwitcher';

export default function MobileMenu({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const prevPathRef = useRef(location.pathname);

  // Navigate and close the menu in one synchronous action.
  function handleNavigate(to) {
    onClose();
    // Use setTimeout to let the close state propagate first, then navigate.
    setTimeout(() => navigate(to), 50);
  }

  // When the route changes externally (e.g. browser back/forward), close the menu.
  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;
      onClose();
    }
    // Update ref on every render so the next comparison works.
    prevPathRef.current = location.pathname;
  });

  // Stop Lenis / body scroll while menu is open, and allow Escape to close.
  useEffect(() => {
    if (!isOpen) return;

    window.dispatchEvent(new CustomEvent('lenis-stop'));
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.dispatchEvent(new CustomEvent('lenis-start'));
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm lg:hidden"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-50 w-[86%] max-w-sm overflow-y-auto bg-white p-6 shadow-panel lg:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-semibold">Menu</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-surface-alt"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="mt-6 space-y-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleNavigate(link.to)}
                  className="block w-full rounded-lg px-3 py-3 text-left text-base font-medium text-ink hover:bg-surface-alt"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="mt-6 border-t border-ink/10 pt-6">
              <p className="mb-3 font-mono text-xs uppercase tracking-wider text-ink-soft">Domains</p>
              <div className="grid grid-cols-2 gap-2">
                {DOMAINS.map((domain) => (
                  <button
                    key={domain.id}
                    type="button"
                    onClick={() => handleNavigate(`/courses?category=${encodeURIComponent(domain.name)}`)}
                    className="rounded-lg border border-ink/[0.06] px-3 py-2.5 text-left text-sm text-ink-muted hover:border-primary-200 hover:text-ink"
                  >
                    {domain.icon} {domain.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-6">
              <CurrencySwitcher />
              <button
                type="button"
                onClick={() => handleNavigate('/contact')}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink transition-all duration-200 hover:border-ink/30 hover:bg-surface-alt focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Contact
              </button>
            </div>

            <button
              type="button"
              onClick={() => handleNavigate('/login')}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Login
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

