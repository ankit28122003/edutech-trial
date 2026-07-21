import { cn } from '../../lib/utils';

/**
 * Infinite horizontal scroller built with a CSS keyframe animation (see
 * tailwind.config.js `marquee` keyframes) rather than JS, so it never drops
 * frames and respects prefers-reduced-motion automatically via the global rule.
 */
export default function Marquee({ items, renderItem, reverse = false, className, speed = 'normal' }) {
  const duration = speed === 'slow' ? '48s' : speed === 'fast' ? '20s' : '32s';
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
      <div
        className={cn('flex w-max items-center gap-12', reverse ? 'animate-marquee-reverse' : 'animate-marquee')}
        style={{ animationDuration: duration }}
      >
        {[...items, ...items].map((item, index) => (
          <div key={index} className="flex shrink-0 items-center">
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}
