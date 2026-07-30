import { ArrowRight, Layers, Target, Route, Wrench } from 'lucide-react';
import Section from '../../components/ui/Section';
import Button from '../../components/ui/Button';
import Marquee from '../../components/ui/Marquee';
import Reveal from '../../components/common/Reveal';
import { useContactPopup } from '../../context/ContactPopupContext';
import { TRUST_LOGOS } from '../../data/trustLogos';

const FEATURES = [
  { icon: Layers, text: 'Immersive learning experience that blends theory with practical application.' },
  { icon: Target, text: 'Results-driven learning journeys to empower your team with the skills for success.' },
  { icon: Route, text: 'Learning pathways tailored to the specific needs of each role.' },
  { icon: Wrench, text: 'Equip your workforce with the skills required to thrive in future.' },
];

export default function EnterpriseSolutions() {
  const { openPopup } = useContactPopup();

  return (
    <Section className="bg-ink">
      <Reveal>
        <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              Comprehensive Training Solutions for Enterprises
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">
              Comprehensive training solutions to empower enterprises with the skills needed for growth and
              innovation. Tailored programs to boost productivity and improve workforce capabilities.
            </p>
          </div>
          <Button onClick={openPopup} variant="accent" size="lg" className="shrink-0">
            Start A Free Demo <ArrowRight size={16} />
          </Button>
        </div>
      </Reveal>

      <div className="mt-10">
        <Marquee
          items={TRUST_LOGOS}
          speed="slow"
          edgeColor="#0A0E1A"
          renderItem={(name) => (
            <span className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80">
              {name}
            </span>
          )}
        />
      </div>

      <p className="mt-12 text-center text-xs font-semibold uppercase tracking-wider text-primary-300">
        Curriculum Designed to Fit Your Organization
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ icon: Icon, text }) => (
          <div key={text} className="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
            <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary-500/20 text-primary-300">
              <Icon size={18} />
            </span>
            <p className="mt-3 text-xs leading-relaxed text-white/70">{text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}