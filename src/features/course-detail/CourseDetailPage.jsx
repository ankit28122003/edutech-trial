import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  CheckCircle2,
  Clock,
  BarChart3,
  Globe2,
  Award,
  BookOpen,
  Users,
  Headphones,
  ShieldCheck,
  Star,
  TrendingUp,
  Target,
  Zap,
  ArrowRight,
  Quote,
} from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../../components/common/SEO';
import Section from '../../components/ui/Section';
import Container from '../../components/ui/Container';
import Badge from '../../components/ui/Badge';
import Rating from '../../components/ui/Rating';
import Reveal from '../../components/common/Reveal';
import Spinner from '../../components/ui/Spinner';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';
import Accordion from '../../components/ui/Accordion';
import CourseCurriculum from './CourseCurriculum';
import CoursePricingCard from './CoursePricingCard';
import CourseContactForm from './CourseContactForm';
import StaggerGroup, { staggerItemVariants } from '../../components/common/StaggerGroup';
import { getCourseBySlug, getCourses } from '../../services/courseService';
import { TESTIMONIALS } from '../../data/testimonials';
import { cn } from '../../lib/utils';

export default function CourseDetailPage() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);
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

  // Load related courses (same category, exclude current course)
  useEffect(() => {
    if (!course) return;
    let isMounted = true;
    getCourses({ category: course.category }).then((data) => {
      if (isMounted) {
        setRelatedCourses(data.filter((c) => c.id !== course.id).slice(0, 3));
      }
    });
    return () => {
      isMounted = false;
    };
  }, [course]);

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

      {/* Hero Section — Left: Info | Right: Leadership Image (replaces form) */}
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

          {/* Leadership Image replacing the form in hero */}
          <div className="overflow-hidden rounded-2xl lg:sticky lg:top-24">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"
              alt="Professional leading a team"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="bg-gradient-to-t from-ink/80 via-ink/20 to-transparent p-6 -mt-20 relative z-10">
              <p className="text-lg font-semibold text-white">Lead with Confidence</p>
              <p className="text-sm text-white/80">Expert mentorship — real outcomes</p>
            </div>
          </div>
        </Container>
      </div>

      {/* Section 2 — Content (Left) | Pricing Card (Right, sticky) */}
      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_420px]">
          {/* Left column: What You'll Learn → (Contact Form Commented) → Curriculum → Mentor */}
          <div className="space-y-14">
            {/* What You'll Learn */}
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

            {/* Contact Form — COMMENTED OUT for future use */}
            {/*
            <div>
              <CourseContactForm courseTitle={course.title} />
            </div>
            */}

            {/* Curriculum */}
            <div>
              <h2 className="text-2xl font-semibold text-ink">Curriculum</h2>
              <p className="mt-2 text-sm text-ink-muted">
                {course.curriculum.length} modules • {course.duration} total
              </p>
              <div className="mt-5">
                <CourseCurriculum curriculum={course.curriculum} />
              </div>
            </div>

            {/* Mentor */}
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

          {/* Right column: Pricing Card — sticky, persists throughout the section */}
          <div className="lg:sticky lg:top-24 self-start">
            <CoursePricingCard course={course} />
          </div>
        </div>
      </Section>

      {/* Section 3 — Key Highlights / Exam Benefits Bar */}
      <div className="bg-accent-50 border-y border-accent-200">
        <Container>
          <div className="grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
            {[
              { icon: Award, label: 'Exam Pass Guarantee', desc: '95% success rate' },
              { icon: Clock, label: `${course.duration} Content`, desc: 'Structured curriculum' },
              { icon: BookOpen, label: 'Instructor-Led', desc: 'Live + recorded sessions' },
              { icon: ShieldCheck, label: '7-Day Refund', desc: 'Full money-back guarantee' },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-100 text-accent-600">
                  <Icon size={20} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{label}</p>
                  <p className="text-xs text-ink-muted">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Section 4 — About PMP Certification / Overview */}
      <Section className="bg-surface-alt">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <div>
              <Badge tone="accent">About This Certification</Badge>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                Why Get PMP® Certified?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                The Project Management Professional (PMP) certification is the gold standard in project management. 
                Recognized across industries worldwide, it validates your ability to lead projects, manage teams, 
                and deliver results in any methodology — predictive, agile, or hybrid.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Globally recognized across 200+ countries',
                  '35+ contact hours of project management education',
                  'Covers PMBOK Guide 7th Edition & Agile Practice Guide',
                  '180-question exam with 230 minutes duration',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-muted">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-ink/[0.06] bg-white p-8 shadow-panel">
              <h3 className="text-xl font-semibold text-ink">PMP Exam Details</h3>
              <div className="mt-6 space-y-5">
                {[
                  { label: 'Exam Format', value: 'Multiple choice, multiple response, matching, hotspot, & limited fill-in-the-blank' },
                  { label: 'Number of Questions', value: '180 Questions' },
                  { label: 'Exam Duration', value: '230 Minutes' },
                  { label: 'Eligibility', value: 'Secondary degree + 36 months of PM experience (or 60 months without degree)' },
                  { label: 'Cost', value: '$405 for PMI members / $555 for non-members' },
                ].map(({ label, value }) => (
                  <div key={label} className="border-b border-ink/[0.06] pb-4 last:border-0 last:pb-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">{label}</p>
                    <p className="mt-1 text-sm text-ink-muted">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Section 5 — Why Choose Edutech for PMP */}
      <Section>
        <div className="text-center">
          <Badge tone="primary">Why Edutech Skills</Badge>
          <h2 className="mx-auto mt-4 max-w-xl text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            Why Professionals Choose Us for PMP
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">
            We don't just teach the PMP exam — we build confident, certified project managers who lead with impact.
          </p>
        </div>

        <StaggerGroup className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Users,
              title: 'Expert PMP Instructors',
              desc: 'Learn from certified PMP professionals with 15+ years of real-world project management experience across industries.',
            },
            {
              icon: Target,
              title: '96% Pass Rate',
              desc: 'Our structured approach, mock exams, and personalized feedback ensure you pass the PMP exam on your first attempt.',
            },
            {
              icon: BookOpen,
              title: 'Comprehensive Curriculum',
              desc: 'Covers People, Process, and Business Environment domains with real-world case studies and exam-focused practice.',
            },
            {
              icon: Zap,
              title: 'Flexible Learning',
              desc: 'Self-paced modules combined with live weekend sessions — learn at your own rhythm without disrupting your work.',
            },
            {
              icon: Headphones,
              title: 'Dedicated Support',
              desc: 'Get your questions answered within 24 hours by our expert instructors and support team throughout the program.',
            },
            {
              icon: TrendingUp,
              title: 'Career Acceleration',
              desc: 'PMP certification holders earn 33% higher salaries on average. We help you leverage your certification for career growth.',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={staggerItemVariants}
              className="rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <Icon size={20} />
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{desc}</p>
            </motion.div>
          ))}
        </StaggerGroup>
      </Section>

      {/* Section 6 — Testimonials */}
      <Section className="bg-surface-alt">
        <div className="text-center">
          <Badge tone="accent">What Our Learners Say</Badge>
          <h2 className="mx-auto mt-4 max-w-xl text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            Trusted by Thousands of Certified Professionals
          </h2>
        </div>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <motion.figure
              key={testimonial.name}
              variants={staggerItemVariants}
              className="flex h-full flex-col rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card"
            >
              <Quote size={22} className="text-primary-200" fill="currentColor" strokeWidth={0} />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-ink/[0.06] pt-4">
                <img
                  src={testimonial.avatar}
                  alt=""
                  loading="lazy"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-ink">{testimonial.name}</p>
                  <p className="text-xs text-ink-muted">{testimonial.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </StaggerGroup>
      </Section>

      {/* Section 7 — Related Courses */}
      {relatedCourses.length > 0 && (
        <Section>
          <div className="text-center">
            <Badge tone="primary">Related Programs</Badge>
            <h2 className="mx-auto mt-4 max-w-xl text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Explore More {course.category} Courses
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">
              Continue your learning journey with these related programs in the same domain.
            </p>
          </div>

          <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedCourses.map((related) => (
              <motion.div key={related.id} variants={staggerItemVariants}>
                <div className="group overflow-hidden rounded-2xl border border-ink/[0.06] bg-white shadow-card transition-shadow hover:shadow-card-hover">
                  <Link
                    to={`/course/${related.slug}`}
                    className="relative flex aspect-[16/10] flex-col items-center justify-center overflow-hidden bg-primary-500 px-6 text-center"
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4) 0, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.25) 0, transparent 45%)',
                      }}
                    />
                    <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl shadow-panel">
                      {related.logo}
                    </span>
                    <span className="relative mt-3 text-sm font-semibold leading-snug text-white line-clamp-2">
                      {related.title}
                    </span>
                  </Link>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-sm text-ink-muted">
                      <Rating value={related.rating} reviewCount={related.reviewCount} size={13} />
                      <span className="flex items-center gap-1 font-mono text-xs text-ink-soft">
                        <Clock size={12} /> {related.duration}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-ink/[0.06] pt-4">
                      <div>
                        <p className="text-xs text-ink-soft">From</p>
                        <p className="font-mono text-lg font-semibold text-ink">
                          {course.priceINR > 40000
                            ? `₹${(related.priceINR / 1000).toFixed(0)}K`
                            : `₹${related.priceINR.toLocaleString('en-IN')}`}
                        </p>
                      </div>
                      <Link
                        to={`/course/${related.slug}`}
                        className="rounded-full border border-ink/15 px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                      >
                        View Program
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </StaggerGroup>

          <Reveal className="mt-10 text-center">
            <Button to="/courses" variant="outline" size="lg">
              Browse All Courses <ArrowRight size={17} />
            </Button>
          </Reveal>
        </Section>
      )}

      {/* Section 8 — Course-Specific FAQ */}
      <Section className="bg-surface-alt">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <Badge tone="accent">Frequently Asked Questions</Badge>
            <h2 className="mx-auto mt-4 max-w-xl text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Everything You Need to Know About PMP
            </h2>
          </div>

          <div className="mt-10">
            <Accordion
              items={[
                {
                  question: 'What is the PMP certification and why is it valuable?',
                  answer: 'The Project Management Professional (PMP) certification is the most globally recognized credential for project managers. It demonstrates your ability to lead projects across predictive, agile, and hybrid approaches. PMP-certified professionals earn 33% higher salaries on average and are preferred by employers across all industries.',
                },
                {
                  question: 'Am I eligible for the PMP certification?',
                  answer: 'You need a secondary degree (high school diploma, associate degree) with 60 months of project management experience, OR a four-year degree with 36 months of project management experience, OR a GAC-accredited bachelor\'s or master\'s degree with 24 months of experience. In all cases, you also need 35 hours of project management education (which our program covers).',
                },
                {
                  question: 'What is included in this PMP training program?',
                  answer: 'Our program includes 35+ hours of instructor-led training covering all three PMP domains (People, Process, Business Environment), PMBOK Guide 7th Edition materials, Agile Practice Guide, 5 full-length mock exams, 500+ practice questions, exam application assistance, and a dedicated mentor.',
                },
                {
                  question: 'How is the training delivered — online or in-person?',
                  answer: 'The program is delivered through a blend of self-paced online modules and live instructor-led weekend sessions. You get lifetime access to course materials, recorded session archives, and 24/7 doubt-clearing support.',
                },
                {
                  question: 'What is the PMP exam format?',
                  answer: 'The PMP exam consists of 180 questions to be completed in 230 minutes. Question types include multiple choice, multiple responses, matching, hotspot, and limited fill-in-the-blank. The exam covers People (42%), Process (50%), and Business Environment (8%) domains.',
                },
                {
                  question: 'What happens if I don\'t pass the PMP exam on the first attempt?',
                  answer: 'We offer comprehensive support including re-attempt strategy sessions, additional mock exams, and one-on-one mentoring to help you identify weak areas and improve. Our 96% first-attempt pass rate means the vast majority of our learners pass on their first try.',
                },
                {
                  question: 'Does Edutech Skills provide PMP exam application assistance?',
                  answer: 'Yes, our team provides step-by-step guidance through the PMI application process, including helping you document your project management experience, reviewing your application before submission, and answering any PMI audit-related questions.',
                },
                {
                  question: 'Can I get a refund if I\'m not satisfied?',
                  answer: 'Yes, we offer a 7-day full refund guarantee. If you\'ve completed less than 20% of the course content within 7 days of purchase, you can request a complete refund with no questions asked.',
                },
              ]}
            />
          </div>
        </div>
      </Section>

      {/* Section 9 — Final CTA Banner */}
      <Section className="py-12 sm:py-16">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-center sm:px-16 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary-500/30 blur-3xl"
          />
          <Reveal>
            <Badge tone="accent" className="border-accent-500/30 bg-accent-500/10 text-accent-300">
              Limited Enrollment
            </Badge>
            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Ready to Become PMP Certified?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
              Join thousands of professionals who have transformed their careers with our PMP certification training. 
              Enroll today and take the first step toward becoming a globally recognized project management professional.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button as="a" href="#pricing" variant="white" size="lg">
                Enroll Now <ArrowRight size={17} />
              </Button>
              <Button to="/contact" variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                Talk to an Advisor
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

