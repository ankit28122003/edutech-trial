import Section from '../../components/ui/Section';
import SectionHeading from '../../components/ui/SectionHeading';
import Reveal from '../../components/common/Reveal';

const STEPS = [
  {
    number: '01',
    title: 'Learn',
    desc: 'Start with guided frameworks, practical architecture patterns, and mentor walkthroughs.',
  },
  {
    number: '02',
    title: 'Practice',
    desc: 'Apply concepts in weekly labs with feedback loops and implementation checklists.',
  },
  {
    number: '03',
    title: 'Build',
    desc: 'Develop portfolio projects that prove your readiness for production responsibilities.',
  },
];

export default function HowItWorks() {
  return (
    <Section>
      <SectionHeading
        eyebrow="The Workflow"
        title="How Edutech Works"
        description="A structured, high-touch workflow that takes you from skill-gap diagnosis to hiring-ready execution without guesswork."
      />

      <div className="relative mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent sm:block"
        />
        {STEPS.map((step, index) => (
          <Reveal key={step.number} delay={index * 0.12}>
            <div className="relative">
              <span className="font-mono text-xs font-semibold text-primary-500">Step {step.number}</span>
              <h3 className="mt-3 text-xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-muted">{step.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
