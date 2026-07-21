import { Search, X } from 'lucide-react';
import { DOMAINS } from '../../data/domains';
import { Input, Select } from '../../components/ui/FormField';
import { cn } from '../../lib/utils';

export default function CourseFilters({ filters, onChange, resultCount }) {
  const { category, search, sort } = filters;

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="course-search" className="sr-only">
          Search courses
        </label>
        <div className="relative">
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft" />
          <Input
            id="course-search"
            type="search"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => onChange({ search: e.target.value })}
            className="pl-10"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft">
          Domain ({resultCount} results)
        </h3>
        <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
          <button
            onClick={() => onChange({ category: '' })}
            className={cn(
              'rounded-full px-3.5 py-2 text-left text-sm transition-colors lg:rounded-lg',
              !category ? 'bg-primary-50 font-semibold text-primary-700' : 'text-ink-muted hover:bg-surface-alt'
            )}
          >
            All Domains
          </button>
          {DOMAINS.map((domain) => (
            <button
              key={domain.id}
              onClick={() => onChange({ category: domain.name })}
              className={cn(
                'flex items-center gap-2 rounded-full px-3.5 py-2 text-left text-sm transition-colors lg:rounded-lg',
                category === domain.name
                  ? 'bg-primary-50 font-semibold text-primary-700'
                  : 'text-ink-muted hover:bg-surface-alt'
              )}
            >
              <span aria-hidden="true">{domain.icon}</span>
              {domain.name}
            </button>
          ))}
        </div>
      </div>

      {category && (
        <button
          onClick={() => onChange({ category: '' })}
          className="inline-flex items-center gap-1 text-xs font-medium text-ink-muted hover:text-ink"
        >
          <X size={13} /> Clear domain filter
        </button>
      )}

      <div className="hidden lg:block">
        <h3 className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft">Sort by</h3>
        <Select value={sort} onChange={(e) => onChange({ sort: e.target.value })}>
          <option value="">Most Relevant</option>
          <option value="rating">Highest Rated</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </Select>
      </div>
    </div>
  );
}
