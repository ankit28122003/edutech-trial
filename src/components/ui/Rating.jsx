import { Star } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Rating({ value, reviewCount, size = 14, className }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 font-mono text-xs text-ink-muted', className)}>
      <Star size={size} className="fill-accent-500 text-accent-500" strokeWidth={0} />
      <span className="font-semibold text-ink">{value.toFixed(1)}</span>
      {reviewCount != null && <span>({reviewCount.toLocaleString()})</span>}
    </span>
  );
}
