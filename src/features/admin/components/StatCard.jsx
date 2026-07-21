import { cn } from '../../../lib/utils';

export default function StatCard({ icon: Icon, label, value, tone = 'primary' }) {
  const tones = {
    primary: 'bg-primary-50 text-primary-600',
    accent: 'bg-accent-50 text-accent-600',
    success: 'bg-success-50 text-success-500',
  };
  return (
    <div className="rounded-2xl border border-ink/[0.06] bg-white p-5 shadow-card">
      <span className={cn('flex h-10 w-10 items-center justify-center rounded-lg', tones[tone])}>
        <Icon size={18} />
      </span>
      <p className="mt-4 font-mono text-2xl font-semibold text-ink">{value}</p>
      <p className="mt-1 text-sm text-ink-muted">{label}</p>
    </div>
  );
}
