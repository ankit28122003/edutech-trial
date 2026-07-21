import Section from '../../components/ui/Section';
import SectionHeading from '../../components/ui/SectionHeading';
import StaggerGroup, { staggerItemVariants } from '../../components/common/StaggerGroup';
import { motion } from 'framer-motion';
import { LEARNER_STORIES } from '../../data/testimonials';

export default function LearnerStories() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Real Career Transitions"
        title="Learner Stories from Real Career Transitions"
      />

      <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {LEARNER_STORIES.map((story) => (
          <motion.div key={story.name} variants={staggerItemVariants} className="group relative overflow-hidden rounded-2xl">
            <img
              src={story.avatar}
              alt=""
              loading="lazy"
              className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-sm leading-relaxed text-white/90">&ldquo;{story.quote}&rdquo;</p>
              <p className="mt-3 text-sm font-semibold text-white">{story.name}</p>
              <p className="text-xs text-white/70">{story.role}</p>
            </div>
          </motion.div>
        ))}
      </StaggerGroup>
    </Section>
  );
}
