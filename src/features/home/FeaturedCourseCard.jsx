import { Link } from 'react-router-dom';
import { Users, Clock } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { useCurrency } from '../../context/CurrencyContext';
import { getEnrolledCount, getNextScheduleDate } from '../../lib/utils';

export default function FeaturedCourseCard({ course }) {
  const { format } = useCurrency();
  const enrolledCount = getEnrolledCount(course);
  const nextSchedule = getNextScheduleDate(course);

  return (
    <div className="overflow-hidden rounded-2xl border border-ink/[0.06] bg-white shadow-card transition-shadow hover:shadow-card-hover">
      <Link
        to={`/course/${course.slug}`}
        className="relative flex aspect-[16/10] flex-col items-center justify-center overflow-hidden bg-red-500 px-6 text-center"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4) 0, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.25) 0, transparent 45%)',
          }}
        />
        <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl shadow-panel">
          {course.logo}
        </span>
        <span className="relative mt-4 text-base font-semibold leading-snug text-white">{course.title}</span>
      </Link>

      <div className="p-5">
        <Badge tone="neutral" className="border-0 bg-surface-alt">
          {course.category}
        </Badge>
        <h3 className="mt-3 line-clamp-1 text-lg font-semibold text-ink">{course.title}</h3>

        <div className="mt-3 flex items-center gap-5 text-sm text-ink-muted">
          <span className="flex items-center gap-1.5">
            <Users size={15} className="text-primary-500" />
            {enrolledCount.toLocaleString('en-IN')} Enrolled
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={15} className="text-primary-500" />
            {course.duration}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-ink/[0.06] pt-4">
          <div>
            <p className="text-xs text-ink-soft">
              From <span className="line-through">{format(course.originalPriceINR)}</span>
            </p>
            <p className="font-mono text-xl font-semibold text-ink">{format(course.priceINR)}</p>
          </div>
          <Button to={`/course/${course.slug}`} variant="outline" size="sm">
            Explore Now
          </Button>
        </div>
      </div>

      <div className="bg-primary-50 px-5 py-3 text-center text-xs font-medium text-primary-700">
        Next Schedule - <span className="font-semibold">{nextSchedule}</span>
      </div>
    </div>
  );
}