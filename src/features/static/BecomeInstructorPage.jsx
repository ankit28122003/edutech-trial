import { CheckCircle2 } from 'lucide-react';
import SEO from '../../components/common/SEO';
import Section from '../../components/ui/Section';
import Button from '../../components/ui/Button';
import Reveal from '../../components/common/Reveal';
import PageHero from './PageHero';

const BENEFITS = [
  'Competitive, transparent revenue share on every cohort you teach',
  'Full curriculum design support from our learning experience team',
  'A built-in learner audience — no marketing required on your end',
  'Flexible scheduling around your existing work commitments',
];

const STEPS = [
  { title: 'Apply', desc: 'Share your expertise, portfolio, and the domain you want to teach.' },
  { title: 'Design Preview', desc: 'Co-design a short curriculum outline with our learning team.' },
  { title: 'Pilot Cohort', desc: 'Run a small pilot cohort with mentor support and learner feedback.' },
  { title: 'Go Live', desc: 'Launch to our full learner audience with marketing and ops support.' },
];

export default function BecomeInstructorPage() {
  return (
    <>
      <SEO
        title="Become an Instructor"
        description="Teach with Edutech Skills and reach thousands of career-focused learners."
        canonicalPath="/become-an-instructor"
      />
      <PageHero
        eyebrow="Partner with Us"
        title="Teach what you know. Reach who needs it."
        description="We handle enrollment, platform, and learner support so you can focus on what you do best — teaching."
      />

      <Section className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <Reveal>
          <h2 className="text-2xl font-semibold text-ink">Why instructors choose us</h2>
          <ul className="mt-6 space-y-4">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted">
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-success-500" />
                {benefit}
              </li>
            ))}
          </ul>
          <Button to="/contact" size="lg" className="mt-8">
            Apply to Teach
          </Button>
        </Reveal>

        <div className="space-y-4">
          {STEPS.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.08}>
              <div className="flex gap-4 rounded-xl border border-ink/[0.06] bg-white p-5 shadow-card">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 font-mono text-xs font-semibold text-primary-700">
                  {index + 1}
                </span>
                <div>
                  <p className="font-semibold text-ink">{step.title}</p>
                  <p className="mt-1 text-sm text-ink-muted">{step.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
