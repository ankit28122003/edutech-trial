import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import SEO from '../../components/common/SEO';
import Section from '../../components/ui/Section';
import Container from '../../components/ui/Container';
import { Select } from '../../components/ui/FormField';
import EmptyState from '../../components/ui/EmptyState';
import StaggerGroup, { staggerItemVariants } from '../../components/common/StaggerGroup';
import { motion, AnimatePresence } from 'framer-motion';
import CourseCard from './CourseCard';
import CourseFilters from './CourseFilters';
import { getCourses } from '../../services/courseService';

function CourseCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-ink/[0.06] bg-white">
      <div className="aspect-[16/10] rounded-t-2xl bg-surface-alt" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-3/4 rounded bg-surface-alt" />
        <div className="h-3 w-full rounded bg-surface-alt" />
        <div className="h-3 w-1/2 rounded bg-surface-alt" />
      </div>
    </div>
  );
}

export default function CourseListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const filters = useMemo(
    () => ({
      category: searchParams.get('category') || '',
      search: searchParams.get('search') || '',
      sort: searchParams.get('sort') || '',
    }),
    [searchParams]
  );

  useEffect(() => {
    let isMounted = true;
    setCourses(null);
    getCourses(filters).then((data) => {
      if (isMounted) setCourses(data);
    });
    return () => {
      isMounted = false;
    };
  }, [filters]);

  function updateFilters(patch) {
    const next = { ...filters, ...patch };
    const params = {};
    if (next.category) params.category = next.category;
    if (next.search) params.search = next.search;
    if (next.sort) params.sort = next.sort;
    setSearchParams(params);
  }

  return (
    <>
      <SEO
        title="Browse All Courses"
        description="Browse mentor-led certification programs across Agile, AI, Cloud, Cyber Security, DevOps and more."
        canonicalPath="/courses"
      />

      <div className="border-b border-ink/[0.06] bg-surface-alt py-10 sm:py-14">
        <Container>
          <span className="font-mono text-xs uppercase tracking-wider text-primary-600">Course Catalog</span>
          <h1 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">
            {filters.category || 'All Courses'}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-ink-muted sm:text-base">
            Mentor-led, project-first programs designed around real hiring signals.
          </p>
        </Container>
      </div>

      <Section className="pt-10 sm:pt-12">
        <div className="flex items-center justify-between gap-4 lg:hidden">
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink"
          >
            <SlidersHorizontal size={15} /> Filters
          </button>
          <Select
            value={filters.sort}
            onChange={(e) => updateFilters({ sort: e.target.value })}
            className="w-auto"
          >
            <option value="">Most Relevant</option>
            <option value="rating">Highest Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </Select>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-10 lg:mt-0 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <CourseFilters filters={filters} onChange={updateFilters} resultCount={courses?.length ?? 0} />
            </div>
          </aside>

          <AnimatePresence>
            {isMobileFiltersOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="fixed inset-0 z-40 bg-ink/40 lg:hidden"
                />
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="fixed inset-y-0 left-0 z-50 w-[85%] max-w-xs overflow-y-auto bg-white p-6 shadow-panel lg:hidden"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-semibold text-ink">Filters</span>
                    <button onClick={() => setIsMobileFiltersOpen(false)} aria-label="Close filters">
                      <X size={18} />
                    </button>
                  </div>
                  <CourseFilters
                    filters={filters}
                    onChange={(patch) => {
                      updateFilters(patch);
                    }}
                    resultCount={courses?.length ?? 0}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <div>
            {!courses ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <CourseCardSkeleton key={i} />
                ))}
              </div>
            ) : courses.length === 0 ? (
              <EmptyState
                title="No courses match your filters"
                description="Try clearing the search term or choosing a different domain."
                action={
                  <button
                    onClick={() => setSearchParams({})}
                    className="text-sm font-semibold text-primary-600 hover:text-primary-700"
                  >
                    Clear all filters
                  </button>
                }
              />
            ) : (
              <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {courses.map((course) => (
                  <motion.div key={course.id} variants={staggerItemVariants}>
                    <CourseCard course={course} />
                  </motion.div>
                ))}
              </StaggerGroup>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
