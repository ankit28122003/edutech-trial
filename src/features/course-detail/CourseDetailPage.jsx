import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, Clock, BarChart3, Globe2 } from 'lucide-react';
import SEO from '../../components/common/SEO';
import Section from '../../components/ui/Section';
import Container from '../../components/ui/Container';
import Badge from '../../components/ui/Badge';
import Rating from '../../components/ui/Rating';
import Reveal from '../../components/common/Reveal';
import Spinner from '../../components/ui/Spinner';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';
import CourseCurriculum from './CourseCurriculum';
import CoursePricingCard from './CoursePricingCard';
import CourseContactForm from './CourseContactForm';
import { getCourseBySlug } from '../../services/courseService';

export default function CourseDetailPage() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let isMounted = true;
    setStatus('loading');
    getCourseBySlug(slug)
      .then((data) => {
        if (isMounted) {
          setCourse(data);
          setStatus('ready');
        }
      })
      .catch(() => {
        if (isMounted) setStatus('error');
      });
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size={28} className="text-primary-500" />
      </div>
    );
  }

  if (status === 'error' || !course) {
    return (
      <Section>
        <EmptyState
          title="Course not found"
          description="This course may have been removed or the link is incorrect."
          action={
            <Button to="/courses" variant="outline">
              Browse all courses
            </Button>
          }
        />
      </Section>
    );
  }

  return (
    <>
      <SEO
        title={course.title}
        description={course.shortDescription}
        image={course.heroImage}
        canonicalPath={`/course/${course.slug}`}
      />

      <div className="border-b border-ink/[0.06] bg-surface-alt">
        <Container className="grid grid-cols-1 gap-10 py-10 sm:py-14 lg:grid-cols-[1fr_380px] lg:items-start">
          <div>
            <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-ink-soft">
              <Link to="/courses" className="hover:text-ink">
                Courses
              </Link>
              <span>/</span>
              <span className="text-ink-muted">{course.category}</span>
            </nav>

            <Reveal>
              <Badge tone="primary">{course.category}</Badge>
              <h1 className="mt-4 text-3xl font-semibold leading-tight text-ink sm:text-4xl">{course.title}</h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">{course.longDescription}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Rating value={course.rating} reviewCount={course.reviewCount} />
                <span className="flex items-center gap-1.5 font-mono text-xs text-ink-muted">
                  <Clock size={14} className="text-primary-500" /> {course.duration}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-xs text-ink-muted">
                  <BarChart3 size={14} className="text-primary-500" /> {course.level}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-xs text-ink-muted">
                  <Globe2 size={14} className="text-primary-500" /> English
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-6 flex items-center gap-3 rounded-xl border border-ink/[0.06] bg-white p-4">
                <img
                  src={course.instructor.avatar}
                  alt=""
                  className="h-11 w-11 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="text-sm font-semibold text-ink">{course.instructor.name}</p>
                  <p className="text-xs text-ink-muted">{course.instructor.title}</p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:sticky lg:top-24">
            <CourseContactForm courseTitle={course.title} />
          </div>
        </Container>
      </div>

      <Section className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
        <div className="space-y-14">
          <div>
            <h2 className="text-2xl font-semibold text-ink">What You'll Learn</h2>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {course.whatYouWillLearn.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-muted">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success-500" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-ink">Curriculum</h2>
            <p className="mt-2 text-sm text-ink-muted">
              {course.curriculum.length} modules • {course.duration} total
            </p>
            <div className="mt-5">
              <CourseCurriculum curriculum={course.curriculum} />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-ink">Your Mentor</h2>
            <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-ink/[0.06] bg-white p-6 sm:flex-row sm:items-center">
              <img
                src={course.instructor.avatar}
                alt=""
                className="h-16 w-16 shrink-0 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <p className="font-semibold text-ink">{course.instructor.name}</p>
                <p className="text-sm text-primary-600">{course.instructor.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{course.instructor.bio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing card moved to this section */}
        <div>
          <div className="lg:sticky lg:top-24">
            <CoursePricingCard course={course} />
          </div>
        </div>
      </Section>
    </>
  );
}
