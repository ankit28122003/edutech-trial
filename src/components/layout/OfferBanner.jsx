import { useState } from 'react';
import { X, Gift } from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import { cn } from '../../lib/utils';

export default function OfferBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const { openContact } = useModal();

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'relative flex items-center justify-center gap-3 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 px-5 py-2.5 text-sm text-white transition-all duration-300'
      )}
    >
      <Gift size={16} className="shrink-0 text-yellow-300" />
      <p className="text-center text-xs font-medium sm:text-sm">
        <span className="font-semibold">🎉 Limited Time Offer:</span> Enroll in any program and get{' '}
        <span className="font-bold text-yellow-300">up to 50% OFF</span> — Offer ends soon!
      </p>
      <button
        type="button"
        onClick={openContact}
        className="shrink-0 rounded-full bg-white/20 px-4 py-1 text-xs font-semibold text-white transition-colors hover:bg-white/30"
      >
        Grab Now
      </button>
      <button
        type="button"
        onClick={() => setIsVisible(false)}
        aria-label="Dismiss offer"
        className="shrink-0 rounded-full p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
      >
        <X size={14} />
      </button>
    </div>
  );
}

