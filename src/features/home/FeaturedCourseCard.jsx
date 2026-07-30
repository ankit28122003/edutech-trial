import { Link } from 'react-router-dom';
import { Users, Clock } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { useCurrency } from '../../context/CurrencyContext';
import { getEnrolledCount, getNextScheduleDate } from '../../lib/utils';

const COURSE_BG_GRADIENTS = [
  'from-blue-600 to-indigo-700',
  // 'from-emerald-600 to-teal-700',
  // 'from-violet-600 to-purple-700',
  // 'from-amber-600 to-orange-700',
  // 'from-rose-600 to-pink-700',
  // 'from-cyan-600 to-blue-700',
];

export default function FeaturedCourseCard({ course, index = 0 }) {
  const { format } = useCurrency();
  const enrolledCount = getEnrolledCount(course);
  const nextSchedule = getNextScheduleDate(course);
  const bgGradient = COURSE_BG_GRADIENTS[index % COURSE_BG_GRADIENTS.length];

  return (
    <div className="overflow-hidden rounded-2xl border border-ink/[0.06] bg-white shadow-card transition-shadow hover:shadow-card-hover">
      <Link
        to={`/course/${course.slug}`}
        className={`relative flex aspect-[16/10] flex-col items-center justify-center overflow-hidden bg-gradient-to-br ${bgGradient} px-6 text-center`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 0, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.2) 0, transparent 45%)',
          }}
        />
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-3xl shadow-panel">
          {course.logo}
        </span>
        <h3 className="relative mt-3 line-clamp-2 text-sm font-semibold leading-snug text-white">
          {course.title}
        </h3>
      </Link>

      <div className="p-4">
        <Badge tone="neutral" className="border-0 bg-surface-alt">
          {course.category}
        </Badge>

        <div className="mt-3 flex items-center gap-4 text-xs text-ink-muted">
          <span className="flex items-center gap-1.5">
            <Users size={14} className="text-primary-500" />
            {enrolledCount.toLocaleString('en-IN')} Enrolled
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-primary-500" />
            {course.duration}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-ink/[0.06] pt-3">
          <div>
            <p className="text-[10px] text-ink-soft">
              From <span className="line-through">{format(course.originalPriceINR, course.originalPriceUSD)}</span>
            </p>
            <p className="font-mono text-lg font-semibold text-ink">{format(course.priceINR, course.priceUSD)}</p>
          </div>
          <Button to={`/course/${course.slug}`} variant="outline" size="sm">
            Explore Now
          </Button>
        </div>
      </div>

      <div className="bg-primary-50 px-4 py-2.5 text-center text-[11px] font-medium text-primary-700">
        Next Schedule - <span className="font-semibold">{nextSchedule}</span>
      </div>
    </div>
  );
}
