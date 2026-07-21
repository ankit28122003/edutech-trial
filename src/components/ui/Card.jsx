import { cn } from '../../lib/utils';

export default function Card({ children, className, hover = true }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-ink/[0.06] bg-white shadow-card transition-shadow duration-300',
        hover && 'hover:shadow-card-hover',
        className
      )}
    >
      {children}
    </div>
  );
}
