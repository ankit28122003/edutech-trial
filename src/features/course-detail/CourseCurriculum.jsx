import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function CourseCurriculum({ curriculum }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-y divide-ink/[0.08] rounded-2xl border border-ink/[0.08] bg-white">
      {curriculum.map((module, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={module.module}>
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-50 font-mono text-xs font-semibold text-primary-700">
                  {index + 1}
                </span>
                <span className="font-medium text-ink">{module.module}</span>
              </span>
              <ChevronDown
                size={18}
                className={cn('shrink-0 text-ink-muted transition-transform duration-300', isOpen && 'rotate-180 text-primary-600')}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <ul className="space-y-2 px-5 pb-5 pl-[3.25rem] sm:px-6 sm:pl-[3.75rem]">
                    {module.topics.map((topic) => (
                      <li key={topic} className="flex items-center gap-2.5 text-sm text-ink-muted">
                        <CheckCircle2 size={14} className="shrink-0 text-success-500" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
