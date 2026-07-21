import Section from '../../components/ui/Section';
import SectionHeading from '../../components/ui/SectionHeading';
import Marquee from '../../components/ui/Marquee';
import { CERTIFYING_BODIES } from '../../data/trustLogos';

export default function CertifyingBodies() {
  return (
    <Section className="py-14 sm:py-16">
      <SectionHeading
        align="center"
        eyebrow="Recognized Credentials"
        title="Leap Ahead with Career-Boosting Certifications"
      />
      <div className="mt-10">
        <Marquee
          items={CERTIFYING_BODIES}
          speed="slow"
          renderItem={(name) => (
            <span className="rounded-xl border border-ink/[0.06] bg-white px-6 py-3 text-sm font-semibold text-ink-muted shadow-card">
              {name}
            </span>
          )}
        />
      </div>
    </Section>
  );
}
