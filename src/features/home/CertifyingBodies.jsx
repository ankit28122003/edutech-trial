import { motion } from 'framer-motion';
import SectionHeading from '../../components/ui/SectionHeading';

const CERT_BODY_LOGOS = [
  { name: 'AXELOS', src: 'https://logo.clearbit.com/axelos.com' },
  { name: 'IASSC', src: 'https://logo.clearbit.com/iassc.org' },
  { name: 'ICAgile', src: 'https://logo.clearbit.com/icagile.com' },
  { name: 'Scaled Agile', src: 'https://logo.clearbit.com/scaledagile.com' },
  { name: 'Scrum.org', src: 'https://logo.clearbit.com/scrum.org' },
  { name: 'Scrum Alliance', src: 'https://logo.clearbit.com/scrumalliance.org' },
  { name: 'PMI', src: 'https://logo.clearbit.com/pmi.org' },
  { name: 'Microsoft', src: 'https://logo.clearbit.com/microsoft.com' },
  { name: 'AWS', src: 'https://logo.clearbit.com/aws.amazon.com' },
  { name: 'PRINCE2', src: 'https://logo.clearbit.com/prince2.com' },
];

export default function CertifyingBodies() {
  return (
    <section className="overflow-hidden bg-white py-14 sm:py-16">
      <div className="mx-auto mb-10 max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Recognized Credentials"
          title="Partnering with World's Leading Governing Bodies"
          description="Earn globally recognized certifications that employers actively seek and respect."
        />
      </div>

      {/* Logo marquee rows */}
      <div className="relative mb-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-transparent to-white" />
        <motion.div
          className="flex w-max items-center gap-8"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          {[...CERT_BODY_LOGOS, ...CERT_BODY_LOGOS, ...CERT_BODY_LOGOS].map((body, index) => (
            <div
              key={`row1-${index}`}
              className="flex h-14 min-w-[9rem] items-center justify-center rounded-xl border border-ink/[0.06] bg-surface-alt px-5 shadow-card"
            >
              <img
                src={body.src}
                alt={body.name}
                className="max-h-8 max-w-[120px] object-contain opacity-60 grayscale"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="hidden text-sm font-semibold text-ink-muted">{body.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 2 - reverse direction */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-transparent to-white" />
        <motion.div
          className="flex w-max items-center gap-8"
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          {[...CERT_BODY_LOGOS, ...CERT_BODY_LOGOS, ...CERT_BODY_LOGOS].map((body, index) => (
            <div
              key={`row2-${index}`}
              className="flex h-14 min-w-[9rem] items-center justify-center rounded-xl border border-ink/[0.06] bg-white px-5 shadow-card"
            >
              <img
                src={body.src}
                alt={body.name}
                className="max-h-8 max-w-[120px] object-contain opacity-60 grayscale"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="hidden text-sm font-semibold text-ink-muted">{body.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

