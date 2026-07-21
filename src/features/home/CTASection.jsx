import { ArrowRight } from 'lucide-react';
import Section from '../../components/ui/Section';
import Button from '../../components/ui/Button';
import Reveal from '../../components/common/Reveal';

export default function CTASection() {
  return (
    <Section className="py-16 sm:py-20">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-center sm:px-16 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary-500/30 blur-3xl"
        />
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Ready to become role-ready in months, not years?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
            Speak with a learning strategist and get a practical roadmap aligned with your current level and next
            career move.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-8">
            <Button to="/contact" variant="white" size="lg">
              Schedule Your Call <ArrowRight size={17} />
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
