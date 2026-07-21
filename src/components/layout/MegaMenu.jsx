import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { DOMAINS } from '../../data/domains';
import { COURSES } from '../../data/courses';
import { cn } from '../../lib/utils';

export default function MegaMenu({ isOpen, onClose }) {
  const [activeDomain, setActiveDomain] = useState(DOMAINS[0].name);
  const activeCourses = COURSES.filter((c) => c.category === activeDomain).slice(0, 3);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          onMouseLeave={onClose}
          className="absolute left-0 right-0 top-full z-40 border-b border-ink/[0.06] bg-white shadow-panel"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-12 gap-8 px-6 py-8 lg:px-8">
            <div className="col-span-4 border-r border-ink/[0.06] pr-8">
              <p className="mb-3 font-mono text-xs uppercase tracking-wider text-ink-soft">
                {DOMAINS.length} categories
              </p>
              <ul className="space-y-1">
                {DOMAINS.map((domain) => (
                  <li key={domain.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveDomain(domain.name)}
                      onClick={() => setActiveDomain(domain.name)}
                      className={cn(
                        'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors',
                        activeDomain === domain.name
                          ? 'bg-primary-50 font-semibold text-primary-700'
                          : 'text-ink-muted hover:bg-surface-alt hover:text-ink'
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        <span aria-hidden="true">{domain.icon}</span>
                        {domain.name}
                      </span>
                      <span className="font-mono text-xs text-ink-soft">{domain.courseCount}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <Link
                to="/courses"
                onClick={onClose}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700"
              >
                Browse all domains <ArrowRight size={14} />
              </Link>
            </div>

            <div className="col-span-8">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-semibold text-ink">{activeDomain}</h3>
                <Link
                  to={`/courses?category=${encodeURIComponent(activeDomain)}`}
                  onClick={onClose}
                  className="text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  View all
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {activeCourses.length === 0 && (
                  <p className="col-span-3 text-sm text-ink-muted">More courses coming soon in this domain.</p>
                )}
                {activeCourses.map((course) => (
                  <Link
                    key={course.id}
                    to={`/course/${course.slug}`}
                    onClick={onClose}
                    className="group rounded-xl border border-ink/[0.06] p-4 transition-colors hover:border-primary-200 hover:bg-primary-50/40"
                  >
                    <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-surface-alt text-lg">
                      {course.logo}
                    </span>
                    <p className="text-sm font-semibold leading-snug text-ink group-hover:text-primary-700">
                      {course.title}
                    </p>
                    <p className="mt-1 font-mono text-xs text-ink-soft">{course.duration}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
