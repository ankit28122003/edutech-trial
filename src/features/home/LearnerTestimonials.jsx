import { useState } from 'react';
import { Play, Star } from 'lucide-react';
import Section from '../../components/ui/Section';
import SectionHeading from '../../components/ui/SectionHeading';
import Reveal from '../../components/common/Reveal';
import { cn } from '../../lib/utils';
import { TESTIMONIALS } from '../../data/testimonials';

// TODO: replace with the real learner testimonial video URL when it's ready —
// this is a public placeholder so the play button has something to actually play.
const TESTIMONIAL_VIDEO_URL = 'https://www.w3schools.com/html/mov_bbb.mp4';
const TESTIMONIAL_VIDEO_POSTER =
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop&crop=faces';

export default function LearnerTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const active = TESTIMONIALS[activeIndex];

  return (
    <Section>
      <SectionHeading align="center" eyebrow="Reviews" title="What Our Learners Have to Say" className="mx-auto" />

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Reveal>
          <div className="flex h-full flex-col justify-center gap-5 rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card">
            <div>
              <p className="text-sm font-semibold text-ink">Trustpilot</p>
              <div className="mt-1 flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} className="fill-accent-500 text-accent-500" strokeWidth={0} />
                ))}
                <span className="ml-1 text-sm font-semibold text-ink">4.7/5</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">Google Reviews</p>
              <div className="mt-1 flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} className="fill-accent-500 text-accent-500" strokeWidth={0} />
                ))}
                <span className="ml-1 text-sm font-semibold text-ink">4.8/5</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <button
            type="button"
            className="group relative block h-full min-h-[220px] w-full overflow-hidden rounded-2xl"
            aria-label="Play learner testimonial video"
          >
            <img
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop&crop=faces"
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-ink/30 transition-colors group-hover:bg-ink/40" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary-600 shadow-panel">
                <Play size={22} fill="currentColor" />
              </span>
            </span>
          </button>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="flex h-full flex-col rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card">
            <div className="flex items-center gap-3">
              <img src={active.avatar} alt="" className="h-11 w-11 rounded-full object-cover" loading="lazy" />
              <div>
                <p className="text-sm font-semibold text-ink">{active.name}</p>
                <p className="text-xs text-ink-muted">{active.role}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} className="fill-accent-500 text-accent-500" strokeWidth={0} />
              ))}
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">&ldquo;{active.quote}&rdquo;</p>

            <div className="mt-5 flex items-center justify-center gap-2">
              {TESTIMONIALS.map((t, index) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show review from ${t.name}`}
                  className={cn(
                    'h-2 rounded-full transition-all',
                    index === activeIndex ? 'w-6 bg-primary-600' : 'w-2 bg-ink/15 hover:bg-ink/25'
                  )}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}