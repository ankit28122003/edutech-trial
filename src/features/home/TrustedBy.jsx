import Marquee from '../../components/ui/Marquee';
import { TRUST_LOGOS } from '../../data/trustLogos';

export default function TrustedBy() {
  return (
    <section className="overflow-hidden bg-white py-14 sm:py-16">
      <div className="mx-auto mb-8 max-w-7xl px-5 sm:px-6 lg:px-8">
        <p className="text-center font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
          Trusted by Professionals From
        </p>
      </div>
      <Marquee
        items={TRUST_LOGOS}
        speed="slow"
        renderItem={(name) => (
          <span className="inline-flex items-center rounded-xl border border-ink/[0.06] bg-surface-alt px-8 py-4 text-lg font-bold text-ink-muted shadow-card">
            {name}
          </span>
        )}
      />
    </section>
  );
}

