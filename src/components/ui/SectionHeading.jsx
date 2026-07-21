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
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-primary-700">
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
