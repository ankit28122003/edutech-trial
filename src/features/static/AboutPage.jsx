import { Target, Users2, Sparkles } from 'lucide-react';
import SEO from '../../components/common/SEO';
import Section from '../../components/ui/Section';
import StaggerGroup, { staggerItemVariants } from '../../components/common/StaggerGroup';
import { motion } from 'framer-motion';
import PageHero from './PageHero';
import { TEAM } from '../../data/team';
import CTASection from '../home/CTASection';

const VALUES = [
  {
    icon: Target,
    title: 'Outcome over Certificates',
    desc: 'We measure success by hiring signals and role-readiness, not by seat time or slide count.',
  },
  {
    icon: Users2,
    title: 'Practitioners, Not Presenters',
    desc: 'Every mentor works in the field they teach — no outsourced scripts, no recycled slide decks.',
  },
  {
    icon: Sparkles,
    title: 'Relentless Curriculum Refresh',
    desc: 'Programs are revised every cohort against real job postings and hiring manager feedback.',
  },
];

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Edutech Skills' mission to make career-boosting certifications accessible through mentor-led, project-first learning."
        canonicalPath="/about"
      />
      <PageHero
        eyebrow="Our Story"
        title="Learning built around real hiring outcomes"
        description="We started Edutech Skills because too many certification programs optimized for exam pass rates, not job readiness. Every program here is designed backward from what hiring managers actually screen for."
      />

      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop"
            alt="Mentors reviewing a learner's project during a live session"
            className="aspect-[4/3] w-full rounded-2xl object-cover"
            loading="lazy"
          />
          <div>
            <h2 className="text-2xl font-semibold text-ink sm:text-3xl">Why we exist</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Edutech Skills was founded to close the gap between "completed a course" and "ready to do the job."
              We work backward from job descriptions, hiring-manager interviews, and real production incidents to
              design every capstone project.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Today, our mentor network spans product companies, consultancies, and cloud-native startups —
              professionals who teach the exact playbooks they use at work.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-surface-alt">
        <h2 className="text-center text-2xl font-semibold text-ink sm:text-3xl">What we stand for</h2>
        <StaggerGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {VALUES.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={staggerItemVariants}
              className="rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <Icon size={20} />
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{desc}</p>
            </motion.div>
          ))}
        </StaggerGroup>
      </Section>

      <Section>
        <h2 className="text-center text-2xl font-semibold text-ink sm:text-3xl">Leadership & Faculty</h2>
        <StaggerGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <motion.div key={member.name} variants={staggerItemVariants} className="text-center">
              <img
                src={member.avatar}
                alt={member.name}
                className="mx-auto h-24 w-24 rounded-full object-cover"
                loading="lazy"
              />
              <p className="mt-4 text-sm font-semibold text-ink">{member.name}</p>
              <p className="text-xs text-primary-600">{member.role}</p>
              <p className="mt-2 text-xs leading-relaxed text-ink-muted">{member.bio}</p>
            </motion.div>
          ))}
        </StaggerGroup>
      </Section>

      <CTASection />
    </>
  );
}
