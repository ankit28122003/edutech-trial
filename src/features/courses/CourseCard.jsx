import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Rating from '../../components/ui/Rating';
import { useCurrency } from '../../context/CurrencyContext';

export default function CourseCard({ course }) {
  const { format } = useCurrency();

  return (
    <Card className="group flex h-full flex-col overflow-hidden">
      <Link to={`/course/${course.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-surface-alt">
        <img
          src={course.heroImage}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-ink shadow-card">
          {course.category}
        </span>
        {course.trending && (
          <span className="absolute right-3 top-3 rounded-full bg-accent-500 px-2.5 py-1 text-xs font-semibold text-white shadow-card">
            Trending
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link to={`/course/${course.slug}`}>
          <h3 className="text-base font-semibold leading-snug text-ink transition-colors group-hover:text-primary-700">
            {course.title}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">{course.shortDescription}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <Badge tone="neutral" className="border-0 bg-surface-alt">
            {course.format}
          </Badge>
          {course.duration && (
            <span className="flex items-center gap-1 font-mono text-xs text-ink-soft">
              <Clock size={12} /> {course.duration}
            </span>
          )}
          <Rating value={course.rating} />
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-ink/[0.06] pt-4">
          <div>
            <p className="text-[11px] font-medium text-success-500">Sale ends soon! 50% OFF</p>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-lg font-semibold text-ink">{format(course.priceINR)}</span>
              <span className="font-mono text-xs text-ink-soft line-through">{format(course.originalPriceINR)}</span>
            </div>
          </div>
          <Link
            to={`/course/${course.slug}`}
            className="rounded-full border border-ink/15 px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
          >
            View
          </Link>
        </div>
      </div>
    </Card>
  );
}
