import { useEffect, useState } from 'react';
import Section from '../../components/ui/Section';
import SectionHeading from '../../components/ui/SectionHeading';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import StaggerGroup, { staggerItemVariants } from '../../components/common/StaggerGroup';
import { motion } from 'framer-motion';
import FeaturedCourseCard from './FeaturedCourseCard';
import FeaturedCoursesSidebar from './FeaturedCoursesSidebar';
import { DOMAINS } from '../../data/domains';
import { getCourses } from '../../services/courseService';

function CourseCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-ink/[0.06] bg-white">
      <div className="aspect-[16/10] bg-surface-alt" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-3/4 rounded bg-surface-alt" />
        <div className="h-3 w-full rounded bg-surface-alt" />
        <div className="h-3 w-1/2 rounded bg-surface-alt" />
      </div>
    </div>
  );
}

export default function FeaturedCourses() {
  const [activeCategory, setActiveCategory] = useState(DOMAINS[0].name);
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setCourses(null);
    getCourses({ category: activeCategory }).then((data) => {
      if (isMounted) setCourses(data);
    });
    return () => {
      isMounted = false;
    };
  }, [activeCategory]);

  return (
    <Section>
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="Real Project Outcomes"
          title="Featured Programs with Real Project Outcomes"
          description="Browse the same domains shown in the navbar's course menu, right here on the homepage."
        />
        <Button to="/courses" variant="outline" className="shrink-0">
          View More
        </Button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <FeaturedCoursesSidebar activeCategory={activeCategory} onSelect={setActiveCategory} />

        <div>
          {!courses ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <CourseCardSkeleton key={i} />
              ))}
            </div>
          ) : courses.length === 0 ? (
            <EmptyState
              title="More courses coming soon"
              description={`We're adding new programs to ${activeCategory}. Check back shortly.`}
            />
          ) : (
            <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {courses.map((course) => (
                <motion.div key={course.id} variants={staggerItemVariants}>
                  <FeaturedCourseCard course={course} />
                </motion.div>
              ))}
            </StaggerGroup>
          )}
        </div>
      </div>

      <div className="mt-10 text-center">
        <Button to="/courses" variant="primary" size="lg">
          Browse All Courses
        </Button>
      </div>
    </Section>
  );
}