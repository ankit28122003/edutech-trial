import { Quote } from 'lucide-react';
import Section from '../../components/ui/Section';
import SectionHeading from '../../components/ui/SectionHeading';
import StaggerGroup, { staggerItemVariants } from '../../components/common/StaggerGroup';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../../data/testimonials';

export default function Testimonials() {
  return (
    <Section className="bg-white">
      <SectionHeading
        eyebrow="Testimonials"
        title="Real proof from people who finished the course."
        description="Highlights the real value of the learning path."
      />

      <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => (
          <motion.figure
            key={testimonial.name}
            variants={staggerItemVariants}
            className="flex h-full flex-col rounded-2xl border border-ink/[0.06] bg-primary-700 p-6 shadow-card"
          >
            <Quote size={22} className="text-white" fill="currentColor" strokeWidth={0} />
            <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-white">
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
                <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                <p className="text-xs text-white">{testimonial.role}</p>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </StaggerGroup>
    </Section>
  );
}
