import { useCountUp } from '../../hooks/useCountUp';

const STATS = [
  { target: 42, suffix: '%', label: 'Average salary hike within 8 months' },
  { target: 480, suffix: '+', label: 'Hiring partners across product and cloud firms' },
  { target: 3, suffix: 'L+', label: 'Learners trained with guided outcomes' },
  { target: 92, suffix: '%', label: 'Cohort completion rate across live programs' },
];

function StatItem({ target, suffix, label }) {
  const { ref, value } = useCountUp(target);
  return (
    <div ref={ref} className="text-center sm:text-left">
      <p className="font-mono text-4xl font-semibold text-white sm:text-5xl">
        {value}
        {suffix}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-white/70">{label}</p>
    </div>
  );
}

export default function StatsBand() {
  return (
    <section className="bg-ink py-14 sm:py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 sm:px-6 lg:grid-cols-4 lg:px-8">
        {STATS.map((stat) => (
          <StatItem key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
