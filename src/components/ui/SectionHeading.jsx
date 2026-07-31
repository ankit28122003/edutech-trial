import { cn } from '../../lib/utils';
import Reveal from '../common/Reveal';

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  titleClassName,
}) {
  const isCenter = align === 'center';
  return (
    <div className={cn('max-w-2xl', isCenter && 'mx-auto text-center', className)}>
      {eyebrow && (
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-gradient-to-r from-primary-50 to-accent-50 px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-primary-700">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" aria-hidden="true" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2
          className={cn(
            'mt-4 text-3xl font-semibold leading-[1.1] text-ink sm:text-4xl lg:text-[2.75rem]',
            titleClassName
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.14}>
          <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
