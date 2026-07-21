import { useEffect, useState } from 'react';
import Section from '../../components/ui/Section';
import SectionHeading from '../../components/ui/SectionHeading';
import Button from '../../components/ui/Button';
import StaggerGroup, { staggerItemVariants } from '../../components/common/StaggerGroup';
import { motion } from 'framer-motion';
import CourseCard from '../courses/CourseCard';
import { getFeaturedCourses } from '../../services/courseService';

function CourseCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-ink/[0.06] bg-white p-0">
      <div className="aspect-[16/10] rounded-t-2xl bg-surface-alt" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-3/4 rounded bg-surface-alt" />
        <div className="h-3 w-full rounded bg-surface-alt" />
        <div className="h-3 w-1/2 rounded bg-surface-alt" />
      </div>
    </div>
  );
}

export default function FeaturedCourses() {
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getFeaturedCourses(9).then((data) => {
      if (isMounted) setCourses(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Section>
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="Real Project Outcomes"
          title="Featured Programs with Real Project Outcomes"
          description="Each cohort blends live classes, guided labs, and capstones reviewed by mentors who work on scalable systems every day."
        />
        <Button to="/courses" variant="outline" className="shrink-0">
          View More
        </Button>
      </div>

      {!courses ? (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <StaggerGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <motion.div key={course.id} variants={staggerItemVariants}>
              <CourseCard course={course} />
            </motion.div>
          ))}
        </StaggerGroup>
      )}

      <div className="mt-10 text-center">
        <Button to="/courses" variant="primary" size="lg">
          Browse 39+ Expert-Led Courses
        </Button>
      </div>
    </Section>
  );
}
