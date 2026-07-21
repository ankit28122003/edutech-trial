import { Quote } from 'lucide-react';
import Section from '../../components/ui/Section';
import SectionHeading from '../../components/ui/SectionHeading';
import StaggerGroup, { staggerItemVariants } from '../../components/common/StaggerGroup';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../../data/testimonials';

export default function Testimonials() {
  return (
    <Section className="bg-surface-alt">
      <SectionHeading
        eyebrow="Expert Faculty"
        title="Mentors and Operators Behind the Curriculum"
        description="Practitioners who design programs, review capstones, and guide learners through real-world delivery."
      />

      <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => (
          <motion.figure
            key={testimonial.name}
            variants={staggerItemVariants}
            className="flex h-full flex-col rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card"
          >
            <Quote size={22} className="text-primary-200" fill="currentColor" strokeWidth={0} />
            <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-ink/[0.06] pt-4">
              <img
                src={testimonial.avatar}
                alt=""
                loading="lazy"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-ink">{testimonial.name}</p>
                <p className="text-xs text-ink-muted">{testimonial.role}</p>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </StaggerGroup>
    </Section>
  );
}
