import { motion } from 'framer-motion';
import SectionHeading from '../../components/ui/SectionHeading';
import { CERTIFYING_BODIES } from '../../data/trustLogos';
import { cn } from '../../lib/utils';

export default function CertifyingBodies() {
  return (
    <section className="w-full overflow-hidden bg-white py-14 sm:py-16">
      <div className="mx-auto mb-10 max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Recognized Credentials"
          title="Leap Ahead with Career-Boosting Certifications"
          description="Earn globally recognized certifications that employers actively seek and respect."
        />
      </div>

      {/* Row 1 — left-to-right moving */}
      <div className="relative mb-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-transparent to-white" />
        <motion.div
          className="flex w-max items-center gap-6"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
        >
          {[...CERTIFYING_BODIES, ...CERTIFYING_BODIES, ...CERTIFYING_BODIES].map((name, index) => (
            <span
              key={`row1-${index}`}
              className="inline-flex shrink-0 items-center gap-3 rounded-2xl border border-ink/[0.06] bg-surface-alt px-8 py-5 shadow-card"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-sm font-bold text-primary-700">
                {name.charAt(0)}
              </span>
              <span className="whitespace-nowrap text-base font-semibold text-ink">{name}</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Row 2 — right-to-left moving */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-transparent to-white" />
        <motion.div
          className="flex w-max items-center gap-6"
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
        >
          {[...CERTIFYING_BODIES, ...CERTIFYING_BODIES, ...CERTIFYING_BODIES].map((name, index) => (
            <span
              key={`row2-${index}`}
              className="inline-flex shrink-0 items-center gap-3 rounded-2xl border border-ink/[0.06] bg-white px-8 py-5 shadow-card"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-sm font-bold text-primary-700">
                {name.charAt(0)}
              </span>
              <span className="whitespace-nowrap text-base font-semibold text-ink">{name}</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

