import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Section from '../../components/ui/Section';
import SectionHeading from '../../components/ui/SectionHeading';
import Button from '../../components/ui/Button';
import StaggerGroup, { staggerItemVariants } from '../../components/common/StaggerGroup';
import { DOMAINS } from '../../data/domains';

const MotionLink = motion(Link);

export default function DomainGrid() {
  return (
    <Section className="bg-surface-alt overflow-hidden">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="High-Impact Skills"
          title="Choose From 25+ In-Demand Domains"
          description="Immersive courses in booming fields like Data Science, AI, and Cloud Computing — practical knowledge mapped to what the market is hiring for right now."
        />
        <Button to="/courses" variant="outline" className="shrink-0">
          Browse Catalog
        </Button>
      </div>

      {/* Animated marquee text lines */}
      <div className="relative mt-6 overflow-hidden">
        {/* Line 1 - moving left */}
        <div className="relative mb-2">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface-alt to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-transparent to-surface-alt" />
          <motion.p
            className="flex w-max gap-4 font-mono text-xs font-medium uppercase tracking-[0.15em] text-primary-500/40"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            {Array(8).fill('✦ Explore Our Domains ✦ In-Demand Skills ✦ Expert-Led Training ✦ Career-Focused Programs').map((text, i) => (
              <span key={`l1-${i}`} className="shrink-0">{text}</span>
            ))}
          </motion.p>
        </div>

        {/* Line 2 - moving right */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface-alt to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-transparent to-surface-alt" />
          <motion.p
            className="flex w-max gap-4 font-mono text-xs font-medium uppercase tracking-[0.15em] text-primary-400/30"
            animate={{ x: ['-50%', '0%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            {Array(8).fill('✦ Hands-On Projects ✨ Mentor-Led Learning ✦ Certifications ✦ Real-World Skills').map((text, i) => (
              <span key={`l2-${i}`} className="shrink-0">{text}</span>
            ))}
          </motion.p>
        </div>
      </div>

      <StaggerGroup className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
        {DOMAINS.map((domain) => (
          <MotionLink
            key={domain.id}
            to={`/courses?category=${encodeURIComponent(domain.name)}`}
            variants={staggerItemVariants}
            whileHover={{ y: -4 }}
            className="group flex items-center justify-between gap-3 rounded-xl border border-ink/[0.06] bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-lg">
                {domain.icon}
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink">{domain.name}</span>
                <span className="block font-mono text-xs text-ink-soft">{domain.courseCount} programs</span>
              </span>
            </span>
            <ArrowUpRight
              size={16}
              className="shrink-0 text-ink-soft transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary-600"
            />
          </MotionLink>
        ))}
      </StaggerGroup>
    </Section>
  );
}

