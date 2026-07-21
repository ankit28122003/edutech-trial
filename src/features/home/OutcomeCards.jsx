import { Target, TrendingUp, Handshake } from 'lucide-react';
import Section from '../../components/ui/Section';
import SectionHeading from '../../components/ui/SectionHeading';
import StaggerGroup, { staggerItemVariants } from '../../components/common/StaggerGroup';
import { motion } from 'framer-motion';

const OUTCOMES = [
  {
    icon: Target,
    title: 'Interview Readiness Engine',
    desc: 'Practice architecture conversations, incident response framing, and stakeholder communication through mock loops run by active practitioners.',
  },
  {
    icon: TrendingUp,
    title: 'Portfolio Evidence Stack',
    desc: 'Build production-grade artifacts including deployment pipelines, observability dashboards, and security playbooks that recruiters can verify.',
  },
  {
    icon: Handshake,
    title: 'Career Conversion Support',
    desc: 'From targeting and storytelling to outreach and negotiation, advisors help you convert momentum into interviews and offers.',
  },
];

export default function OutcomeCards() {
  return (
    <Section className="bg-surface-alt">
      <SectionHeading
        align="center"
        eyebrow="Outcomes, Not Just Certificates"
        title="Career Outcomes Designed for Real Hiring Signals"
        description='Every pathway combines technical skill, execution proof, and communication confidence so your profile moves from "course completed" to "ready to own production problems."'
        className="mx-auto"
      />
      <StaggerGroup className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
        {OUTCOMES.map(({ icon: Icon, title, desc }) => (
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
  );
}
