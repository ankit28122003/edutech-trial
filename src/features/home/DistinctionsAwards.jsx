import { useState } from 'react';
import { Award } from 'lucide-react';
import Section from '../../components/ui/Section';
import SectionHeading from '../../components/ui/SectionHeading';
import { cn } from '../../lib/utils';

const AWARDS = [
  {
    title: 'Best Skill Learning Institute of the Year',
    issuer: 'The Education Excellence Award by Brands Impact',
    badge: '/badges/badge1.jpeg',
  },
  {
    title: 'Edutech Company of the Year',
    issuer: 'The Education Awards by The Corporate Titan',
    badge: '/badges/badge2.jpeg',
  },
  {
    title: 'Institute with the Best Placement',
    issuer: 'The Education Awards by Mantra',
    badge: '/badges/badge3.jpeg',
  },
];

export default function DistinctionsAwards() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Section className="bg-surface-alt">
      <SectionHeading
        align="center"
        eyebrow="Recognition"
        title="Distinctions and Achievements"
        description="Explore the milestones of our journey!"
        className="mx-auto"
      />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {AWARDS.map((award, index) => (
          <div
            key={award.title}
            className={cn(
              'flex flex-col items-center rounded-2xl border bg-primary-700 p-6 text-center shadow-card transition-shadow',
              index === activeIndex ? 'border-primary-200 shadow-card-hover' : 'border-ink/[0.06]'
            )}
          >
            <div className="flex h-16 w-16 items-center justify-center">
              <img
                src={award.badge}
                alt={award.title}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
            <p className="mt-4 text-sm font-semibold text-white">{award.title}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">{award.issuer}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {AWARDS.map((award, index) => (
          <button
            key={award.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Highlight award ${index + 1}`}
            className={cn(
              'h-2 rounded-full transition-all',
              index === activeIndex ? 'w-6 bg-primary-600' : 'w-2 bg-ink/15 hover:bg-ink/25'
            )}
          />
        ))}
      </div>
    </Section>
  );
}