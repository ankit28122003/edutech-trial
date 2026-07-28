import { motion } from 'framer-motion';
import { TrendingUp, Sparkles, Code2 } from 'lucide-react';
import { SUCCESS_STORIES } from '../../data/successStories';

function StoryCard({ story, className, imgClassName, delay = 0, floatDistance = 8 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: [0, -floatDistance, 0] }}
      transition={{
        opacity: { duration: 0.6, delay },
        y: { duration: 4.5, delay, repeat: Infinity, ease: 'easeInOut' },
      }}
      className={className}
    >
      <div className={`overflow-hidden rounded-full border-4 border-white shadow-panel ${imgClassName}`}>
        <img src={story.photo} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="absolute -bottom-4 left-1/2 w-max min-w-[11rem] -translate-x-1/2 rounded-xl border border-ink/[0.06] bg-white px-3.5 py-2.5 shadow-panel">
        {story.metric ? (
          <p className="flex items-center gap-1 text-sm font-semibold text-ink">
            {story.metric}
            <TrendingUp size={13} className="text-success-500" />
          </p>
        ) : (
          <p className="text-xs text-ink-soft">{story.fromRole}</p>
        )}
        <p className="flex items-center gap-1.5 text-xs font-medium text-ink-muted">
          {story.metric ? story.fromRole : <span className="font-semibold text-ink">{story.toRole}</span>}
        </p>
        <p className="mt-1 text-xs font-semibold text-primary-700">{story.company}</p>
      </div>
    </motion.div>
  );
}

const FLOATING_ICONS = [
  { Icon: Code2, className: 'left-2 top-24', delay: 0.2 },
  { Icon: Sparkles, className: 'left-[38%] -top-2', delay: 0.5 },
];

export default function HeroSuccessCollage() {
  return (
    <div className="relative mx-auto hidden h-[520px] w-full max-w-md lg:block">
      {/* Decorative floating icon bubbles */}
      {FLOATING_ICONS.map(({ Icon, className, delay }, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
          transition={{
            opacity: { duration: 0.5, delay },
            y: { duration: 3.5, delay, repeat: Infinity, ease: 'easeInOut' },
          }}
          className={`absolute z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-card ${className}`}
        >
          <Icon size={18} className="text-primary-600" />
        </motion.span>
      ))}

      {/* Soft decorative blobs */}
      <span aria-hidden="true" className="absolute left-0 top-44 h-8 w-16 rounded-full bg-primary-100/60 blur-sm" />
      <span aria-hidden="true" className="absolute right-16 top-52 h-10 w-10 rounded-full bg-primary-100/60 blur-sm" />

      <StoryCard
        story={SUCCESS_STORIES[0]}
        className="absolute left-0 top-16 w-36"
        imgClassName="h-36 w-36"
        delay={0}
      />
      <StoryCard
        story={SUCCESS_STORIES[1]}
        className="absolute right-0 top-0 w-44"
        imgClassName="h-44 w-44"
        delay={0.3}
        floatDistance={10}
      />
      <StoryCard
        story={SUCCESS_STORIES[2]}
        className="absolute bottom-0 left-8 w-44"
        imgClassName="h-44 w-44"
        delay={0.15}
        floatDistance={10}
      />
      <StoryCard
        story={SUCCESS_STORIES[3]}
        className="absolute bottom-16 right-4 w-36"
        imgClassName="h-36 w-36"
        delay={0.45}
      />
    </div>
  );
}