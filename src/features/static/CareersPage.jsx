import { MapPin, Briefcase, ArrowRight } from 'lucide-react';
import SEO from '../../components/common/SEO';
import Section from '../../components/ui/Section';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Reveal from '../../components/common/Reveal';
import PageHero from './PageHero';

const OPEN_ROLES = [
  { title: 'Curriculum Developer — Cloud & DevOps', location: 'Remote (India)', type: 'Full-time' },
  { title: 'Learner Success Advisor', location: 'New Delhi, India', type: 'Full-time' },
  { title: 'Program Mentor — Data Science', location: 'Remote (Global)', type: 'Contract' },
  { title: 'Growth Marketing Manager', location: 'New Brunswick, US', type: 'Full-time' },
];

const PERKS = ['Remote-friendly teams', 'Learning stipend every quarter', 'Flexible PTO', 'Health coverage'];

export default function CareersPage() {
  return (
    <>
      <SEO
        title="Careers"
        description="Join the Edutech Skills team building mentor-led certification programs that get learners hired."
        canonicalPath="/careers"
      />
      <PageHero
        eyebrow="Join Us"
        title="Help learners turn skills into careers"
        description="We're a small, senior team obsessed with outcomes. If you'd rather ship real impact than sit in status meetings, we'd like to talk."
      />

      <Section>
        <div className="flex flex-wrap justify-center gap-3">
          {PERKS.map((perk) => (
            <Badge key={perk} tone="primary" className="px-4 py-2 text-sm">
              {perk}
            </Badge>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {OPEN_ROLES.map((role, index) => (
            <Reveal key={role.title} delay={index * 0.06}>
              <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-ink/[0.06] bg-white p-5 shadow-card sm:flex-row sm:items-center">
                <div>
                  <p className="font-semibold text-ink">{role.title}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-4 text-xs text-ink-muted">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} /> {role.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={13} /> {role.type}
                    </span>
                  </div>
                </div>
                <Button to="/contact" variant="outline" size="sm">
                  Apply <ArrowRight size={14} />
                </Button>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-ink-muted">
          Don't see the right fit?{' '}
          <Button to="/contact" variant="ghost" size="sm" className="px-1 py-0 text-primary-600 hover:text-primary-700">
            Send us your resume anyway
          </Button>
        </p>
      </Section>
    </>
  );
}
