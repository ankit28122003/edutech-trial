import { ChevronRight } from 'lucide-react';
import { DOMAINS } from '../../data/domains';
import { cn } from '../../lib/utils';

// Uses the exact same DOMAINS list as the navbar's mega menu, so the categories
// shown here always stay in sync with "All Courses" in the navbar.
export default function FeaturedCoursesSidebar({ activeCategory, onSelect }) {
  return (
    <div className="rounded-2xl border border-ink/[0.06] bg-white p-3 shadow-card">
      <ul className="space-y-1">
        {DOMAINS.map((domain) => {
          const isActive = domain.name === activeCategory;
          return (
            <li key={domain.id}>
              <button
                type="button"
                onClick={() => onSelect(domain.name)}
                className={cn(
                  'flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-sm font-semibold transition-colors',
                  isActive
                    ? 'bg-orange-400 text-white shadow-card'
                    : 'text-ink-muted hover:bg-surface-alt hover:text-ink'
                )}
              >
                {domain.name}
                <ChevronRight size={16} className={isActive ? 'text-white' : 'text-ink-soft'} />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}