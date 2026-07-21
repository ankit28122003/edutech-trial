import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { CURRENCIES } from '../../lib/currency';
import { useCurrency } from '../../context/CurrencyContext';
import { cn } from '../../lib/utils';

export default function CurrencySwitcher({ className }) {
  const { currencyCode, setCurrencyCode } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) setIsOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn('relative', className)} ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex h-9 items-center gap-1 rounded-full border border-ink/10 px-3 text-sm font-medium text-ink-muted transition-colors hover:border-ink/25 hover:text-ink"
      >
        <span>{CURRENCIES[currencyCode].symbol}</span>
        <span>{currencyCode}</span>
        <ChevronDown size={14} className={cn('transition-transform', isOpen && 'rotate-180')} />
      </button>
      {isOpen && (
        <ul
          role="listbox"
          className="absolute right-0 z-30 mt-2 w-32 overflow-hidden rounded-xl border border-ink/10 bg-white py-1 shadow-panel"
        >
          {Object.values(CURRENCIES).map((currency) => (
            <li key={currency.code}>
              <button
                type="button"
                role="option"
                aria-selected={currency.code === currencyCode}
                onClick={() => {
                  setCurrencyCode(currency.code);
                  setIsOpen(false);
                }}
                className={cn(
                  'flex w-full items-center gap-2 px-3.5 py-2 text-left text-sm hover:bg-surface-alt',
                  currency.code === currencyCode ? 'font-semibold text-primary-600' : 'text-ink'
                )}
              >
                <span className="w-4">{currency.symbol}</span>
                {currency.code}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
