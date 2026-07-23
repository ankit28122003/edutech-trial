import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, ChevronDown, GraduationCap } from 'lucide-react';
import { NAV_LINKS } from '../../lib/constants';
import { cn } from '../../lib/utils';
import CurrencySwitcher from './CurrencySwitcher';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';
import Button from '../ui/Button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const closeTimeoutRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Clear any pending close timer on unmount so it never fires after the component is gone.
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  function openMegaMenu() {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsMegaOpen(true);
  }

  // Close only after a short delay — if the mouse re-enters the button or the
  // panel within that window (e.g. while crossing the gap between them),
  // openMegaMenu() cancels this timer and the menu stays open.
  function scheduleMegaMenuClose() {
    closeTimeoutRef.current = setTimeout(() => {
      setIsMegaOpen(false);
    }, 300);
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-colors duration-300',
        isScrolled || isMegaOpen ? 'border-ink/[0.06] bg-white/90 backdrop-blur-md' : 'border-transparent bg-white'
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Edutech Skills home">
          <img src="/edutech-logo-redesign (1).svg" alt="Edutech Skills" className="h-16 w-auto" />
          {/* <span className="font-display text-lg font-semibold tracking-tight text-ink">Edutech Skills</span> */}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {/* <button
            type="button"
            onMouseEnter={openMegaMenu}
            onMouseLeave={scheduleMegaMenuClose}
            onClick={() => (isMegaOpen ? setIsMegaOpen(false) : openMegaMenu())}
            className={cn(
              'flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors',
              isMegaOpen ? 'bg-surface-alt text-ink' : 'text-ink-muted hover:bg-surface-alt hover:text-ink'
            )}
          >
            All Courses
            <ChevronDown size={14} className={cn('transition-transform', isMegaOpen && 'rotate-180')} />
          </button> */}
          {NAV_LINKS.filter((l) => l.label !== 'Home').map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  isActive ? 'text-ink' : 'text-ink-muted hover:bg-surface-alt hover:text-ink'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          {/* <span className="rounded-full px-4 py-2 text-sm font-medium text-ink-soft">
            Practice Test <span className="ml-1 rounded-full bg-accent-50 px-2 py-0.5 text-[10px] font-semibold text-accent-600">Soon</span>
          </span> */}
        </nav>

        <div className="flex items-center gap-2">
          <CurrencySwitcher className="hidden sm:block" />
          <Button to="/contact" variant="ghost" size="sm" className="hidden lg:inline-flex">
            Contact
          </Button>
          <Button to="/login" variant="outline" size="sm" className="hidden sm:inline-flex">
            Login
          </Button>
          {/* <Button to="/contact" variant="accent" size="sm" className="hidden md:inline-flex">
            Enroll Now
          </Button> */}
          <button
            type="button"
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-surface-alt lg:hidden"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      <MegaMenu
        isOpen={isMegaOpen}
        onClose={() => setIsMegaOpen(false)}
        onMouseEnter={openMegaMenu}
        onMouseLeave={scheduleMegaMenuClose}
      />
      <MobileMenu isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
    </header>
  );
}