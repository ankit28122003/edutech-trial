import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Star, DollarSign, ArrowRight } from 'lucide-react';
import SEO from '../../../components/common/SEO';
import StatCard from '../components/StatCard';
import { getCourses } from '../../../services/courseService';

export default function DashboardPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses().then(setCourses);
  }, []);

  const avgRating = courses.length
    ? (courses.reduce((sum, c) => sum + c.rating, 0) / courses.length).toFixed(1)
    : '—';

  return (
    <>
      <SEO title="Admin Dashboard" description="Edutech Skills admin overview." />
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-ink">Dashboard</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Overview of your course catalog. Connect the backend to see live enrollment and revenue data here.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={BookOpen} label="Total Courses" value={courses.length} />
        <StatCard icon={Users} label="Total Learners" value="—" tone="accent" />
        <StatCard icon={Star} label="Avg. Course Rating" value={avgRating} tone="success" />
        <StatCard icon={DollarSign} label="Revenue (30d)" value="—" />
      </div>

      <div className="mt-8 rounded-2xl border border-ink/[0.06] bg-white p-5 shadow-card sm:p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">Recently Added Courses</h2>
          <Link to="/admin/courses" className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700">
            Manage all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="mt-4 divide-y divide-ink/[0.06]">
          {courses.slice(0, 5).map((course) => (
            <div key={course.id} className="flex items-center justify-between gap-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-alt text-base">
                  {course.logo}
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">{course.title}</p>
                  <p className="text-xs text-ink-soft">{course.category}</p>
                </div>
              </div>
              <span className="font-mono text-sm text-ink-muted">₹{course.priceINR.toLocaleString('en-IN')}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-primary-200 bg-primary-50/50 p-6">
        <p className="text-sm font-semibold text-primary-800">Backend integration note</p>
        <p className="mt-1 text-sm leading-relaxed text-primary-800/80">
          This dashboard currently reads from in-memory mock data via <code className="rounded bg-white/60 px-1">services/courseService.js</code>.
          Once the Express + MongoDB API is live, swap the function bodies in that file for real API calls — the
          components on this page will not need any changes.
        </p>
      </div>
    </>
  );
}
