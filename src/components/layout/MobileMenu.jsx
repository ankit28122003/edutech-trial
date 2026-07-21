import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { NAV_LINKS } from '../../lib/constants';
import { DOMAINS } from '../../data/domains';
import CurrencySwitcher from './CurrencySwitcher';
import Button from '../ui/Button';

export default function MobileMenu({ isOpen, onClose }) {
  const location = useLocation();

  // Belt-and-suspenders fix: whenever the route changes, force the menu closed,
  // regardless of whether the click handler that triggered navigation also fired onClose.
  useEffect(() => {
    if (isOpen) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Lock body scroll while the menu is open, and always allow Escape to close it.
  useEffect(() => {
    if (!isOpen) return undefined;
    document.body.style.overflow = 'hidden';
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
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
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={onClose}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-surface-alt"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/courses"
                onClick={onClose}
                className="block rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-surface-alt"
              >
                All Courses
              </Link>
            </nav>

            <div className="mt-6 border-t border-ink/10 pt-6">
              <p className="mb-3 font-mono text-xs uppercase tracking-wider text-ink-soft">Domains</p>
              <div className="grid grid-cols-2 gap-2">
                {DOMAINS.map((domain) => (
                  <Link
                    key={domain.id}
                    to={`/courses?category=${encodeURIComponent(domain.name)}`}
                    onClick={onClose}
                    className="rounded-lg border border-ink/[0.06] px-3 py-2.5 text-sm text-ink-muted hover:border-primary-200 hover:text-ink"
                  >
                    {domain.icon} {domain.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-6">
              <CurrencySwitcher />
              <Button to="/contact" size="sm" variant="outline" onClick={onClose}>
                Contact
              </Button>
            </div>

            <Button to="/login" onClick={onClose} className="mt-4 w-full">
              Login
            </Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}