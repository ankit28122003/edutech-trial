import { cn } from '../../lib/utils';

const TONES = {
  primary: 'bg-primary-50 text-primary-700 border-primary-100',
  accent: 'bg-accent-50 text-accent-700 border-accent-100',
  neutral: 'bg-surface-alt text-ink-muted border-ink/10',
  success: 'bg-success-50 text-success-500 border-success-500/20',
};

export default function Badge({ children, tone = 'neutral', className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium',
        TONES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
