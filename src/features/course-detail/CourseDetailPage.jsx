


import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  CheckCircle2,
  CheckCircle,
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
  GraduationCap,
  Trophy,
  Sparkles,
  Play,
  Download,
  CalendarClock,
  Minus,
  Plus,
  Building2,
  MapPin,
  Phone,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
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
import Marquee from '../../components/ui/Marquee';
import CourseCurriculum from './CourseCurriculum';
import CoursePricingCard from './CoursePricingCard';
import CourseContactForm from './CourseContactForm';
import StaggerGroup, { staggerItemVariants } from '../../components/common/StaggerGroup';
import { getCourseBySlug, getCourses } from '../../services/courseService';
import { useCurrency } from '../../context/CurrencyContext';
import { useModal } from '../../context/ModalContext';
import { TESTIMONIALS } from '../../data/testimonials';
import { useCountUp } from '../../hooks/useCountUp';
import { cn } from '../../lib/utils';

/* -------------------------------------------------------------------------- */
/*  Placeholder / fallback content                                            */
/*  Every block below reads from `course.<field>` first and only falls back   */
/*  to this placeholder data when the API doesn't provide it yet — swap in    */
/*  real content from courseService whenever it's ready, no markup changes.   */
/* -------------------------------------------------------------------------- */

const DEFAULT_TRUST_BADGES = [
  { label: 'Trustpilot', rating: '4.6/5', tone: 'text-[#00b67a]' },
  { label: 'Google', rating: '4.8/5', tone: 'text-[#4285F4]' },
];

const DEFAULT_HERO_STAT_BADGES = [
  { label: 'Industry Growth', value: '40%', icon: TrendingUp },
  { label: 'Minimum Salary Offered', value: '$120k+/Year', icon: Award },
];

const DEFAULT_KEY_FEATURES = [
  'Crack certification in 40 days',
  'Practice questions with detailed explanations',
  'Full-length mock exams',
  '35 hours of comprehensive live training',
  // '100% money-back guarantee',
  'Application & eligibility support',
  'PMI-approved professional development units',
  // 'Additional 2-day exam prep bootcamp sessions',
  'Golden Ticket:  Simulated exam questions',
  'Doubt clarification and unlimited revision sessions',
];

const DEFAULT_PROCESS_STEPS = [
  'Enroll in the exam prep program',
  'Complete the hours of live training',
  'Start preparing your application with assistance',
  'Complete module-wise practice questions',
  'Learn strategies and techniques to crack the exam',
  'Attend additional exam-prep sessions',
  'Attempt full-length mock exams',
  'Take the certification examination',
];

const DEFAULT_PLAN_COLUMNS = ['Prime Plan', 'Training + Exam Prep'];
const DEFAULT_PLAN_ROWS = [
  'Live virtual training with expert instructors',
  'PMI-approved PDUs on completion',
  'Training by an authorised instructor',
  'Full-length mock exams',
  'Curated practice question bank',
  'Priority chat support',
  'Application & eligibility support',
  // '180 days of LMS access',
  // '1 year of live class access',
  'Structured exam-pass study plan',
];

const DEFAULT_BATCHES = [
  {
    mode: 'Live Virtual Class',
    dateRange: 'Aug 22 – Sep 13',
    time: 'IST: 07:30 PM – 09:50 PM',
    type: 'Weekday Batch · 15 Sessions',
    shift: 'Evening Batch',
    trainer: 'S. Singh',
    discount: '50% off',
    price: 24999,
    originalPrice: 49998,
  },
  {
    mode: 'Live Virtual Class',
    dateRange: 'Sep 22 – Oct 13',
    time: 'IST: 07:00 AM – 11:30 AM',
    type: 'Weekend Batch · 8 Sessions',
    shift: 'Morning Batch',
    trainer: 'V. Raghavan',
    discount: '50% off',
    price: 24999,
    originalPrice: 49998,
  },
  {
    mode: 'Live Virtual Class',
    dateRange: ' Upcoming Batch',
    // time: 'IST: 06:00 AM – 08:20 AM',
    // type: 'Weekday Batch · 15 Sessions',
    // shift: 'Morning Batch',
    // trainer: 'V. Raghavan',
    discount: '50% off',
    price: 24999,
    originalPrice: 49998,
  },
];

const DEFAULT_CORPORATE_POINTS = [
  'Unleash in-demand skills across the enterprise',
  'Drive increased employee productivity',
  'Align skill development with business objectives',
  'Leverage immersive, hands-on learning',
];

const DEFAULT_REVIEWS = [
  {
    name: 'A. Ongole',
    role: 'Project Analyst',
    rating: 4,
    date: '10 Sep 2024',
    text: "Completed the training recently and passed the exam on the first attempt. My trainer explained everything clearly, kept me on track, and answered every question quickly. The experience felt organized from day one, and I enjoyed learning alongside people from across the world in a shared discussion group.",
  },
  {
    name: 'T. Pasalkar',
    role: 'Senior Project Analyst',
    rating: 4,
    date: '1 Sep 2024',
    text: 'Training and the mock tests were spot on. Thank you!',
  },
];

const DEFAULT_ACHIEVEMENTS = [
  { title: 'Best Skill Learning Institute of the Year', org: 'The Education Excellence Award' },
  { title: 'Edutech Company of the Year', org: 'The Education Awards' },
  { title: 'Institute with the Best Placement', org: 'The Education Awards' },
];

const DEFAULT_ENTERPRISE_LOGOS = [
  '/logos/amex.png',
  '/logos/aws.png',
  '/logos/axelos.jpeg',
  '/logos/google.jpeg',
  '/logos/hcltech.png',
  '/logos/iasssc.png',
  '/logos/icagile.jpeg',
  '/logos/infosys.png',
  '/logos/microsoft.png',
  '/logos/nvidia.png',
  '/logos/pmi.jpeg',
  '/logos/prince2.jpeg',
  '/logos/scaled-agile.jpeg',
  '/logos/scrum-alliance.png',
  '/logos/scrum-org.jpeg',
  '/logos/tcs.jpeg',
  '/logos/tech-mahindra.png',
];

const DEFAULT_ENTERPRISE_POINTS = [
  { icon: TrendingUp, label: 'Immersive learning that blends theory with practical application.' },
  { icon: Download, label: 'Results-driven learning journeys that equip teams with real skills.' },
  { icon: CheckCircle, label: 'Learning pathways tailored to the specific needs of every role.' },
  { icon: ShieldCheck, label: 'Equip your workforce with the skills required to thrive.' },
];

const DEFAULT_CITIES = [
  'Bangalore', 'Hyderabad', 'Mumbai', 'Delhi', 'Pune', 'Chennai', 'Kolkata', 'Gurgaon', 'Noida',
  'Ahmedabad', 'Navi Mumbai', 'Kochi', 'Coimbatore', 'Indore', 'Mysore', 'Faridabad', 'Doha',
  'New York', 'United Kingdom', 'Germany',
];

const DEFAULT_SERVED_STATS = [
  { icon: Users, value: '3,00,000+', label: 'Professionals Trained' },
  { icon: Trophy, value: '100%', label: 'Success Rate' },
  { icon: Globe2, value: '100+', label: 'Countries' },
];

const SUB_NAV = [
  { id: 'key-features', label: 'Key Features' },
  { id: 'course-content', label: 'Course Content' },
  { id: 'pricing', label: 'Enroll Now' },
  { id: 'overview', label: 'Overview' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'faqs', label: 'FAQs' },
];

/* -------------------------------------------------------------------------- */
/*  Small local building blocks                                               */
/* -------------------------------------------------------------------------- */

function StatsBand({ stats }) {
  const statValues = [
    { value: stats.studentsEnrolled, label: 'Students Enrolled' },
    { value: stats.passRate, label: 'Pass Rate' },
    { value: stats.averageRating, label: 'Average Rating' },
  ];

  return (
    <div className="grid grid-cols-3 gap-6 py-8">
      {statValues.map((stat) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="block font-mono text-xl font-bold text-primary-600 sm:text-3xl">
            {stat.value}
          </span>
          <span className="mt-1 block text-xs text-ink-muted sm:text-sm">{stat.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

/** Sticky sub-navigation strip with smooth-scroll anchors + a support phone pill. */
function SubNav({ phone }) {
  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-0 z-30 hidden border-b border-ink/[0.06] bg-white/95 backdrop-blur-md lg:block">
      <Container className="flex items-center justify-between py-3">
        <nav className="flex items-center gap-6 text-sm font-medium text-ink-muted">
          {SUB_NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className="whitespace-nowrap transition-colors hover:text-primary-600"
            >
              {item.label}
            </a>
          ))}
        </nav>
        {phone && (
          <a
            href={`tel:${phone}`}
            className="flex shrink-0 items-center gap-2 rounded-full border border-success-500/30 bg-success-50 px-4 py-1.5 text-xs font-semibold text-success-700"
          >
            <Phone size={13} /> {phone}
          </a>
        )}
      </Container>
    </div>
  );
}

/** Hero portrait with floating achievement badges — decorative, image-agnostic. */
function HeroPortrait({ instructor, statBadges }) {
  return (
    <div className="relative mx-auto hidden max-w-xs sm:max-w-sm lg:block">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -rotate-6 rounded-[2.5rem] bg-gradient-to-br from-primary-100 via-accent-100 to-transparent"
      />
      <img
        src={instructor?.avatar}
        alt=""
        className="relative z-10 mx-auto h-auto w-full max-w-[280px] rounded-[2rem] object-cover"
        loading="lazy"
      />
      {statBadges.map((badge, i) => (
        <div
          key={badge.label}
          className={cn(
            'absolute z-20 flex items-center gap-2 rounded-xl bg-ink px-3 py-2 text-white shadow-panel',
            i === 0 ? '-left-6 top-6' : '-right-4 top-1/2'
          )}
        >
          <badge.icon size={14} className="text-success-400" />
          <div className="leading-tight">
            <p className="text-[10px] text-white/70">{badge.label}</p>
            <p className="text-sm font-bold">{badge.value}</p>
          </div>
        </div>
      ))}
      <div className="absolute -bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink shadow-panel">
        <BadgeCheck size={15} className="text-primary-600" />
        Premier Authorized Training Partner
      </div>
    </div>
  );
}

/** Video intro banner — shows a styled cover until played, then hands off to native controls. */
function VideoIntroBanner({ course }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const videoSrc = course.introVideoUrl || `/videos/${course.slug || 'course'}-intro.mp4`;

  const handlePlay = () => {
    setPlaying(true);
    videoRef.current?.play?.();
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-blue-100 to-blue-800 shadow-card">
      <video
        ref={videoRef}
        controls={playing}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="aspect-video w-full object-cover"
        preload="metadata"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {!playing && (
        <button
          type="button"
          onClick={handlePlay}
          className="absolute inset-0 flex flex-col justify-between p-6 text-left sm:p-8"
        >
          <span className="w-fit rounded-lg bg-white/70 px-3 py-1.5 text-[11px] font-semibold text-ink backdrop-blur-sm">
            Quick Introduction
            <span className="block font-normal text-ink-muted">In a few minutes</span>
          </span>

          <div className="flex items-end justify-between gap-4">
            <h3 className="text-2xl font-bold leading-tight text-blue-800 sm:text-4xl">
              Why Get
              <br />
              {course.category || 'Certified'}?
            </h3>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white shadow-panel transition-transform hover:scale-105 sm:h-16 sm:w-16">
              <Play size={24} fill="currentColor" />
            </span>
          </div>
        </button>
      )}

      {!playing && course.instructor?.avatar && (
        <img
          src={course.instructor.avatar}
          alt=""
          className="pointer-events-none absolute bottom-0 right-2 hidden h-[92%] w-auto object-contain sm:block"
        />
      )}
    </div>
  );
}

/** "Proven path" step flow — a real ordered sequence, so numbering is meaningful here. */
function ProvenPath({ steps }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 p-6 sm:p-8">
      <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li
            key={step}
            className="relative flex items-start gap-3 rounded-xl bg-white/95 p-4 shadow-sm"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
              {i + 1}
            </span>
            <span className="text-xs font-medium leading-snug text-ink">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Feature-comparison table for the two (or more) enrollment plans. */
function PlanComparisonTable({ columns, rows }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-ink/[0.06] bg-white shadow-card">
      <table className="w-full min-w-[520px] border-collapse text-sm">
        <thead>
          <tr>
            <th className="w-1/2 p-4 text-left text-ink-muted" />
            {columns.map((col, i) => (
              <th
                key={col}
                className={cn(
                  'p-4 text-center text-sm font-semibold text-ink',
                  i === columns.length - 1 && 'bg-accent-50'
                )}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={row} className={ri % 2 === 0 ? 'bg-surface-alt/60' : 'bg-white'}>
              <td className="p-4 text-left text-sm text-ink-muted">{row}</td>
              {columns.map((col, ci) => (
                <td
                  key={col}
                  className={cn('p-4 text-center', ci === columns.length - 1 && 'bg-accent-50/60')}
                >
                  <CheckCircle2 size={17} className="mx-auto text-green-600" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** One upcoming batch card with a cosmetic seat-quantity stepper. */
function BatchCard({ batch, format, index }) {
  const [qty, setQty] = useState(1);
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-ink/[0.06] bg-white p-5 shadow-blue-500 shadow-[0_8px_30px_-6px_rgba(59,130,246,0.5)] transition-shadow duration-300 hover:shadow-orange-500 hover:shadow-[0_8px_30px_-6px_rgba(249,115,22,0.5)] sm:flex-row sm:items-center sm:justify-between">
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-300 px-2.5 py-1 text-xs font-semibold text-green-600">
          <Globe2 size={13} /> {batch.mode}
        </span>
        <p className="mt-1.5 text-base font-semibold text-ink">{batch.dateRange}</p>
        <p className="text-xs text-ink-soft">{batch.time}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-muted">
          {index !== 2 && (
            <span className="flex items-center gap-1">
              <CalendarClock size={12} /> {batch.type}
            </span>
          )}
          <span>{batch.shift}</span>
          {index !== 2 && <span>Trainer: {batch.trainer}</span>}
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-full border border-ink/10 px-3 py-1.5">
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="text-ink-muted hover:text-ink"
          aria-label="Decrease seats"
        >
          <Minus size={14} />
        </button>
        <span className="w-5 text-center text-sm font-semibold text-ink">{qty}</span>
        <button
          type="button"
          onClick={() => setQty((q) => q + 1)}
          className="text-ink-muted hover:text-ink"
          aria-label="Increase seats"
        >
          <Plus size={14} />
        </button>
      </div>

      <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-1.5">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-orange-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
            {batch.discount}
          </span>
          <span className="font-mono text-xs text-ink-soft line-through">
            {format(batch.originalPrice, batch.originalPrice)}
          </span>
        </div>
        <p className="font-mono text-lg font-bold text-ink">{format(batch.price, batch.price)}

        </p>


        <Button variant="outline" size="sm" className="bg-orange-500 text-white hover:bg-orange-600" >
          Enroll Now
        </Button>

      </div>
    </div>
  );
}

/** Video-style testimonial card (thumbnail + play affordance), reusing existing testimonial data. */
function VideoTestimonialCard({ testimonial }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-ink/[0.06] bg-white shadow-card">
      <div className="relative aspect-video bg-ink">
        {playing ? (
          <video
            controls
            autoPlay
            className="h-full w-full object-cover"
            src={testimonial.videoUrl || `/videos/testimonials/${testimonial.name?.toLowerCase().replace(/\s+/g, '-')}.mp4`}
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group relative flex h-full w-full items-center justify-center"
          >
            <img
              src={testimonial.avatar}
              alt=""
              className="h-full w-full object-cover opacity-80"
              loading="lazy"
            />
            <span className="absolute flex h-11 w-11 items-center justify-center rounded-full bg-primary-600 text-white shadow-panel transition-transform group-hover:scale-105">
              <Play size={18} fill="currentColor" />
            </span>
          </button>
        )}
      </div>
      <p className="px-3 py-2.5 text-center text-xs font-semibold text-ink">{testimonial.name}</p>
    </div>
  );
}

/** Written review card for the "Course Reviews" section. */
function ReviewCard({ review }) {
  return (
    <div className="border-b border-ink/[0.06] py-6 last:border-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
            {review.name.charAt(0)}
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">{review.name}</p>
            <p className="text-xs text-ink-muted">{review.role}</p>
            <span className="mt-0.5 flex items-center gap-1 text-[11px] font-medium text-success-600">
              <BadgeCheck size={12} /> Verified Learner
            </span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={13}
              className={i < review.rating ? 'text-amber-400' : 'text-ink/10'}
              fill={i < review.rating ? 'currentColor' : 'none'}
            />
          ))}
          <span className="ml-1 text-xs font-semibold text-ink-muted">{review.rating}/5</span>
        </div>
      </div>
      <p className="mt-1 text-sm leading-relaxed text-ink-muted">{review.text}</p>
      <p className="mt-1 text-right text-[11px] text-ink-soft">{review.date}</p>
    </div>
  );
}

/** Certificate preview — displays the actual certificate image. */
function CertificatePreview({ title }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-card sm:p-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 top-10 h-40 w-40 -rotate-12 rounded-3xl bg-accent-100/70 blur-sm"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 bottom-10 h-40 w-40 rotate-12 rounded-3xl bg-primary-100/70 blur-sm"
      />
      <div className="relative mx-auto max-w-2xl">
        <img
          src="/certificate_1727593944.webp"
          alt={`${title} certificate`}
          className="h-auto w-full rounded-xl border border-ink/[0.06] object-contain shadow-panel"
          loading="lazy"
        />
      </div>
    </div>
  );
}

/** Rotating achievement badge for the Distinctions & Achievements strip. */
function AchievementBadge({ achievement }) {
  return (
    <div className="rounded-2xl border border-ink/[0.06] bg-white p-6 text-center shadow-card">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-300 to-orange-500 text-white shadow-sm">
        <Trophy size={26} />
      </div>
      <p className="mt-2 text-sm font-semibold text-ink">{achievement.title}</p>
      <p className="mt-1 text-xs text-ink-muted">{achievement.org}</p>
    </div>
  );
}

/** "Drop a query" lead-capture card — falls back to a self-contained form if
 *  CourseContactForm expects different props than assumed here. */
function LeadForm({ course, compact = false }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex h-full min-h-[220px] flex-col items-center justify-center rounded-2xl bg-white p-6 text-center">
        <CheckCircle2 size={32} className="text-green-600" />
        <p className="mt-3 text-sm font-semibold text-ink">Thanks! We've got your details.</p>
        <p className="mt-1 text-xs text-ink-muted">Our team will reach out shortly.</p>
      </div>
    );
  }

  return (
    <div className={cn('rounded-2xl bg-white', compact ? 'shadow-card' : 'shadow-panel')}>
      {typeof CourseContactForm === 'function' ? (
        <CourseContactForm course={course} onSuccess={() => setSubmitted(true)} />
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="space-y-3"
        >
          <input
            type="text"
            required
            placeholder="Full Name*"
            className="w-full rounded-lg border border-ink/10 px-3.5 py-2.5 text-sm outline-none focus:border-primary-400"
          />
          <input
            type="email"
            required
            placeholder="Email Id*"
            className="w-full rounded-lg border border-ink/10 px-3.5 py-2.5 text-sm outline-none focus:border-primary-400"
          />
          <input
            type="tel"
            required
            placeholder="Phone*"
            className="w-full rounded-lg border border-ink/10 px-3.5 py-2.5 text-sm outline-none focus:border-primary-400"
          />
          <select className="w-full rounded-lg border border-ink/10 px-3.5 py-2.5 text-sm text-ink-muted outline-none focus:border-primary-400">
            <option>Select a purpose</option>
            <option>Individual Training</option>
            <option>Corporate Training</option>
            <option>General Enquiry</option>
          </select>
          <label className="flex items-start gap-2 text-[11px] leading-snug text-ink-muted">
            <input type="checkbox" required className="mt-0.5" />I agree to the Terms & Conditions and
            Privacy Policy.
          </label>
          <Button type="submit" variant="primary" className="w-full justify-center">
            Submit <ArrowRight size={15} />
          </Button>
        </form>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function CourseDetailPage() {
  const { slug } = useParams();
  const { format, currencyCode } = useCurrency();
  const { openContact } = useModal();
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

  const keyFeatures = course.keyFeatures?.length ? course.keyFeatures : DEFAULT_KEY_FEATURES;
  const processSteps = course.provenPath?.length ? course.provenPath : DEFAULT_PROCESS_STEPS;
  const planColumns = course.plans?.columns?.length ? course.plans.columns : DEFAULT_PLAN_COLUMNS;
  const planRows = course.plans?.rows?.length ? course.plans.rows : DEFAULT_PLAN_ROWS;
  const batches = course.batches?.length ? course.batches : DEFAULT_BATCHES;
  const reviews = course.reviews?.length ? course.reviews : DEFAULT_REVIEWS;
  const achievements = course.achievements?.length ? course.achievements : DEFAULT_ACHIEVEMENTS;
  const enterpriseLogos = course.enterpriseLogos?.length ? course.enterpriseLogos : DEFAULT_ENTERPRISE_LOGOS;
  const cities = course.citiesOffered?.length ? course.citiesOffered : DEFAULT_CITIES;
  const servedStats = course.servedStats?.length ? course.servedStats : DEFAULT_SERVED_STATS;
  const heroStatBadges = course.heroStatBadges?.length ? course.heroStatBadges : DEFAULT_HERO_STAT_BADGES;
  const shortName = course.title?.split(' ').slice(0, 2).join(' ') || course.title;

  return (
    <>
      <SEO
        title={course.title}
        description={course.shortDescription}
        image={course.heroImage}
        canonicalPath={`/course/${course.slug}`}
      />

      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <div className="border-b border-ink/[0.06] bg-surface-alt">
        <Container className="grid grid-cols-1 gap-10 py-8 sm:py-12 lg:grid-cols-[1fr_360px] lg:items-start">
          <div>
            <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-ink-soft">
              <Link to="/courses" className="hover:text-ink">
                Courses
              </Link>
              <span>/</span>
              <span className="text-ink-muted">{course.category}</span>
            </nav>

            <Reveal>
              <h1 className="text-xl font-extrabold leading-tight text-ink sm:text-5xl lg:text-5xl">{course.title}</h1>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                {course.moneyBackGuarantee !== false && (
                  <span className="flex items-center gap-1.5 rounded-full bg-success-50 px-3 py-1 text-xs font-semibold text-success-700">
                    {/* <ShieldCheck size={13} /> 100% Money Back Guarantee */}
                  </span>
                )}
                {course.reviewCount && (
                  <span className="flex items-center gap-1.5 text-xs font-medium text-ink-muted">
                    <Users size={13} className="text-primary-500" />
                    {(course.stats?.studentsEnrolled || '300K+')} Learners
                  </span>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="mt-2 space-y-2">
                {keyFeatures.slice(0, 6).map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm leading-relaxed text-ink-muted">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green-600" />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
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
              <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-2 border-blue-600 p-4 rounded-lg hover:borer-2 hover:border-orange-600">
                {DEFAULT_TRUST_BADGES.map((badge) => (
                  <span
                    key={badge.label}
                    className="flex items-center gap-2 rounded-lg border border-ink/[0.06] bg-white px-3 py-3 text-md"
                  >
                    <Star size={20} className={cn(badge.tone)} fill="currentColor" />
                    <span className="font-medium text-ink-muted">{badge.label}</span>
                    <span className="font-semibold text-ink">{badge.rating}</span>
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-3 w-full flex flex-wrap flex-col items-center gap-3">
                <Button variant="primary" size="md" className="w-full  shadow-[0_0_20px_0px] shadow-orange-400" onClick={openContact}>
                  <Download size={12} /> Talk to career expert
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  className="w-full"
                  onClick={() => {
                    const el = document.getElementById('batches');
                    if (el) {
                      const top = el.getBoundingClientRect().top + window.scrollY - 84;
                      window.scrollTo({ top, behavior: 'smooth' });
                    }
                  }}
                >
                  View Schedules
                </Button>
              </div>
              <p className="mt-3 text-xs text-ink-muted">
                Looking for corporate training?{' '}
                <a className="font-semibold text-success-600 underline underline-offset-2" onClick={openContact}>
                  Get a Quote
                </a>
              </p>
            </Reveal>
          </div>

          {/* Right column: course intro poster */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            <div className="relative overflow-hidden rounded-xl border border-ink/[0.06] bg-white">
              <img
                src="/WhatsApp%20Image%202026-08-05%20at%202.32.04%20PM%20(1).jpeg"
                alt={`${course.title} course intro poster`}
                className="h-auto w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </Container>
      </div>

      <SubNav phone={course.supportPhone} />

      {/* ---------------------------------------------------------------- */}
      {/* Highlighted Course Features                                       */}
      {/* ---------------------------------------------------------------- */}
      <Section id="key-features">
        <Reveal>
          <Badge tone="primary">Highlighted Course Features</Badge>
          <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">
            Everything included in your training
          </h2>
        </Reveal>
        <div className="mt-3 grid grid-cols-1 gap-3 rounded-2xl border border-ink/[0.06] bg-surface-alt p-6 sm:grid-cols-2 sm:p-8">
          {keyFeatures.map((point) => (
            <div key={point} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-muted">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green-600" />
              {point}
            </div>
          ))}
        </div>
        <div className="mt-2 text-center">
          <Button href="https://wa.me/918882571026" variant="primary" size="md">
            WhatsApp Now <ArrowRight size={12} />
          </Button>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Video intro + Proven path                                        */}
      {/* ---------------------------------------------------------------- */}
      <Section className="bg-surface-alt">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_260px]">
          <Reveal>
            <VideoIntroBanner course={course} />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-ink/[0.06] bg-white p-6 text-center shadow-card">
              <p className="text-sm font-semibold text-ink">Explore the Complete Course Brochure</p>
              <Button variant="outline" size="md" className="mt-2" onClick={openContact}>
                Download Brochure <Download size={15} />
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="mt-4">
          <Badge tone="accent">Your Learning Journey</Badge>
          <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">
            The Proven Path to {shortName} Success
          </h2>
          <div className="mt-3 overflow-hidden rounded-2xl border border-ink/[0.06] bg-white shadow-card">
            <img
              src="/WhatsApp%20Image%202026-08-05%20at%202.32.05%20PM.jpeg"
              alt="Proven Path to PMP Project Success"
              className="h-auto w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Curriculum                                                        */}
      {/* ---------------------------------------------------------------- */}
      <Section id="course-content">
        <Container className="max-w-4xl px-0">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Badge tone="primary">Course Curriculum</Badge>
              <h2 className="mt-4 text-xl font-semibold text-ink sm:text-3xl">{course.title} Course Content</h2>
              <p className="mt-2 text-sm text-ink-muted">
                {course.curriculum.length} comprehensive modules • {course.duration} of expert-led training
              </p>
            </div>
            <Button variant="primary" size="md" onClick={openContact}>
              Download Syllabus <Download size={15} />
            </Button>
          </div>
          <div className="mt-4">
            <CourseCurriculum curriculum={course.curriculum} />
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Pricing plans + pricing card                                      */}
      {/* ---------------------------------------------------------------- */}
      <Section id="pricing" className="bg-surface-alt">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>

            <Badge tone="accent" onClick={openContact}>Enroll Now</Badge>

            <h2 className=" text-xl font-semibold text-ink sm:text-3xl">Choose the plan that fits you best!</h2>
          </div>
          <span className="flex items-center gap-1 rounded-sm bg-success-600 px-2 py-1 text-xs font-semibold text-white">
            {/* <ShieldCheck size={13} /> 100% Money Back */}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          <PlanComparisonTable columns={planColumns} rows={planRows} />
          <CoursePricingCard course={course} />
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Upcoming batches                                                  */}
      {/* ---------------------------------------------------------------- */}
      <Section id="batches">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs font-medium text-ink-muted">
            <Star size={13} className="text-[#4285F4]" fill="currentColor" /> 4.8/5 · 10,550 Reviews
          </span>
          <span className="flex items-center gap-1.5 text-xs font-medium text-ink-muted">
            <Star size={13} className="text-amber-400" fill="currentColor" /> 4.6/5 · 2,305 Reviews
          </span>
        </div>
        <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
          Upcoming {course.title}  Batches
        </h2>

        <div className="mt-4 space-y-4">
          {batches.slice(0, 2).map((batch, i) => (
            <BatchCard key={i} batch={batch} format={format} index={i} />
          ))}



          {batches.slice(2).map((batch, i) => (
            <BatchCard key={`extra-${i}`} batch={batch} format={format} index={i + 2} />
          ))}
        </div>

        <div className="flex mt-4 flex-col items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-blue-900 to-blue-700 p-6 text-center sm:flex-row sm:text-left">
          <p className="text-base font-semibold text-white">
            Do you want to customize
            <br className="hidden sm:block" /> your batch request?
          </p>
          <Button onClick={openContact} variant="primary" size="md">
            Request a Batch
          </Button>
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline" size="md" className="bg-orange-400" onClick={openContact}>
            View All Batches
          </Button>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Corporate training                                                */}
      {/* ---------------------------------------------------------------- */}
      <Section id="corporate" className="pt-0">
        <div className="rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-success-50 text-success-600">
                <Building2 size={22} />
              </span>
              <div>
                <p className="text-base font-semibold text-ink">Corporate Training</p>
                <p className="text-sm text-ink-muted">Your workforce is your asset — up-skill it with our programs.</p>
              </div>
            </div>
            <a href="/contact">
              <Button variant="outline" size="md">
                Contact Us <ArrowRight size={15} />
              </Button>
            </a>
          </div>
          <div className="mt-3 grid grid-cols-1 gap-3 rounded-xl bg-surface-alt p-5 sm:grid-cols-2">
            {DEFAULT_CORPORATE_POINTS.map((point) => (
              <div key={point} className="flex items-start gap-2.5 text-sm text-ink-muted">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green-600" />
                {point}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Course overview                                                   */}
      {/* ---------------------------------------------------------------- */}
      <Section id="overview" className="bg-surface-alt">
        <Container className="max-w-4xl px-0">
          <Badge tone="primary">Course Overview</Badge>
          <h2 className="mt-4 text-2xl font-semibold text-ink sm:text-3xl">{course.title} Course Overview</h2>
          <div className="mt-6 max-h-72 overflow-y-auto rounded-2xl border border-ink/[0.06] bg-white p-6 text-sm leading-relaxed text-ink-muted sm:p-8">
            <p>{course.longDescription}</p>
            {course.aboutContent?.description && <p className="mt-4">{course.aboutContent.description}</p>}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Certificate                                                       */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container className="max-w-3xl px-0">
          <Badge tone="accent">Your Achievement</Badge>
          <h2 className="mt-4 text-2xl font-semibold text-ink sm:text-3xl">{course.title.split(' ').slice(0, -2).join(' ') || course.title} Certificate</h2>
          <div className="mt-4">
            <CertificatePreview title={course.title} />
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Video testimonials                                                */}
      {/* ---------------------------------------------------------------- */}
      <Section id="testimonials" className="bg-surface-alt">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Badge tone="primary">Testimonials</Badge>
            <h2 className="mt-4 text-2xl font-semibold text-ink sm:text-3xl">
              Hear It From Our Certified Professionals
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink-muted hover:text-ink"
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink-muted hover:text-ink"
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <StaggerGroup className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {TESTIMONIALS.map((testimonial) => (
            <motion.div key={testimonial.name} variants={staggerItemVariants}>
              <VideoTestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </StaggerGroup>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Written course reviews                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section id="reviews">
        <Container className="max-w-3xl px-0">
          <Badge tone="accent">Course Reviews</Badge>
          <h2 className="mt-4 text-2xl font-semibold text-ink sm:text-3xl">What Learners Are Saying</h2>
          <div className="mt-5 rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card sm:p-8">
            {reviews.map((review) => (
              <ReviewCard key={review.name} review={review} />
            ))}
          </div>
          <div className="mt-3 text-center">
            <Button variant="outline" size="md">
              View All Reviews
            </Button>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* FAQs — three themed groups, matching the reference layout         */}
      {/* ---------------------------------------------------------------- */}
      {course.faqs && course.faqs.length > 0 && (
        <Section id="faqs" className="bg-surface-alt">
          <Container className="max-w-3xl px-0">
            <div>
              <Badge tone="primary">Frequently Asked Questions</Badge>
              <h2 className="mt-4 text-2xl font-semibold text-ink sm:text-3xl">
                {course.title} and Certification FAQ's
              </h2>
            </div>
            <div className="mt-5">
              <Accordion items={course.faqs.slice(0, Math.ceil(course.faqs.length / 3))} />
            </div>
            <div className="mt-4">
              <Accordion
                items={course.faqs.slice(
                  Math.ceil(course.faqs.length / 3),
                  Math.ceil((course.faqs.length * 2) / 3)
                )}
              />
            </div>
            <div className="mt-3 text-center">
              {/* <a href="https://edutechskills.com/course/pmp-certification-training#section-faq"> */}
              <Button variant="outline" size="md">
                View All
              </Button>
              {/* </a> */}
            </div>

            {course.faqs.length > 3 && (
              <>
                {/* <h3 className="mt-7 text-xl font-semibold text-ink">
                  {course.title.split(' ').slice(0, -2).join(' ') || course.title} Certification Training:
                  Eligibility, Prerequisites & Exam FAQs
                </h3> */}

                {/* <div className="mt-3 text-center">
                  <a href="https://edutechskills.com/course/pmp-certification-training#section-prerequisites">
                    <Button variant="outline" size="md">
                      View All
                    </Button>
                  </a>
                </div> */}

                <h3 className="mt-4 text-2xl font-semibold text-ink sm:text-3xl mb-4">
                  {/* {course.title.split(' ').slice(0, -2).join(' ') || course.title} Certification Course
                  Additional FAQs */}
                  Who Can Do
                </h3>
                {/* <div className="mt-3">
                  <Accordion items={course.faqs.slice(Math.ceil((course.faqs.length * 2) / 3))} />
                </div> */}
                <ul className='border-2 border-black-600 rounded-lg p-3 list-none'>
                  <h4 className='text-2xl font-semibold text-ink sm:text-3xl'>Ideal For</h4>
                  <li className='m-4 flex items-center gap-3 font-semibold text-md'>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                      <CheckCircle2 size={14} />
                    </span>
                    Mid-Level Project Managers
                  </li>
                  <li className='m-4 flex items-center gap-3 font-bold text-md'>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                      <CheckCircle2 size={14} />
                    </span>
                    Senior Project Managers
                  </li>
                  <li className='m-4 flex items-center gap-3 font-bold text-md'>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                      <CheckCircle2 size={14} />
                    </span>
                    Project Coordinators
                  </li>
                  <li className='m-4 flex items-center gap-3 font-bold text-md'>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                      <CheckCircle2 size={14} />
                    </span>
                    Project Analysts
                  </li>
                  <li className='m-4 flex items-center gap-3 font-bold text-md'>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                      <CheckCircle2 size={14} />
                    </span>
                    Project Leaders
                  </li>
                  <li className='m-4 flex items-center gap-3 font-bold text-md'>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                      <CheckCircle2 size={14} />
                    </span>
                    Product Managers
                  </li>
                  <li className='m-4 flex items-center gap-3 font-bold text-md'>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                      <CheckCircle2 size={14} />
                    </span>
                    Program Managers
                  </li>
                </ul>
              </>
            )}
          </Container>
        </Section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Distinctions & Achievements                                       */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <div className="text-center">
          <Badge tone="accent">Distinctions and Achievements</Badge>
          <h2 className="mx-auto mt-4 max-w-xl text-2xl font-semibold leading-tight text-ink sm:text-3xl">
            Explore the milestones of our journey!
          </h2>
        </div>
        <StaggerGroup className="mx-auto mt-5 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
          {achievements.map((achievement) => (
            <motion.div key={achievement.title} variants={staggerItemVariants}>
              <AchievementBadge achievement={achievement} />
            </motion.div>
          ))}
        </StaggerGroup>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* About / benefits (reuses course.aboutContent if present)          */}
      {/* ---------------------------------------------------------------- */}
      {course.aboutContent && (
        <Section className="bg-surface-alt">
          <Badge tone="primary">About This Certification</Badge>
          <h2 className="mt-4 text-2xl font-semibold text-ink sm:text-3xl">{course.aboutContent.title} - Benefits</h2>
          <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div className="max-h-80 overflow-y-auto rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card sm:p-8">
              <p className="text-sm leading-relaxed text-ink-muted">{course.aboutContent.description}</p>
              <ul className="mt-3 space-y-3">
                {course.aboutContent.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-muted">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-ink/[0.06] bg-white p-8 shadow-panel">
              <h3 className="text-xl font-semibold text-ink">Certification Details</h3>
              <div className="mt-4 space-y-5">
                {course.aboutContent.details.map(({ label, value }) => (
                  <div key={label} className="border-b border-ink/[0.06] pb-4 last:border-0 last:pb-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">{label}</p>
                    <p className="mt-1 text-sm text-ink-muted">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Enterprise training strip                                         */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <div className="flex flex-wrap items-center justify-between gap-4 w-full">
          <div className="max-w-xl">
            <Badge tone="accent">For Teams</Badge>
            <h2 className="mt-4 text-2xl font-semibold text-ink sm:text-3xl">
              Comprehensive Training Solutions for Enterprises
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Tailored programs to empower enterprises with the skills needed for growth and innovation,
              built to boost productivity and improve workforce capabilities.
            </p>
          </div>
          <Button variant="primary" size="md" className="w-full" onClick={openContact}>
            Skill Up Your Team <ArrowRight size={16} />
          </Button>
        </div>

        <div className="mt-4 space-y-6 border-y border-ink/[0.06] py-6">
          <Marquee
            items={enterpriseLogos}
            renderItem={(logo) => (
              <img
                src={logo}
                alt="Enterprise partner logo"
                className="h-7 w-auto max-w-[110px] object-contain"
                loading="lazy"
              />
            )}
          />
          <Marquee
            reverse
            items={enterpriseLogos}
            renderItem={(logo) => (
              <img
                src={logo}
                alt="Enterprise partner logo"
                className="h-7 w-auto max-w-[110px] object-contain"
                loading="lazy"
              />
            )}
          />
        </div>

        <p className="mt-5 text-center text-xs font-semibold uppercase tracking-widest text-ink-soft">
          Curriculum Designed to Fit Your Organization
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DEFAULT_ENTERPRISE_POINTS.map(({ icon: Icon, label }) => (
            <div key={label} className="rounded-xl border border-ink/[0.06] bg-white p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-success-50 text-green-600">
                <Icon size={17} />
              </span>
              <p className="mt-3 text-xs leading-relaxed text-ink-muted">{label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Related courses                                                   */}
      {/* ---------------------------------------------------------------- */}
      {relatedCourses.length > 0 && (
        <Section className="bg-surface-alt">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Badge tone="primary">Related Programs</Badge>
              <h2 className="mt-4 text-2xl font-semibold text-ink sm:text-3xl">People Also Viewed Courses Like</h2>
            </div>
          </div>

          <StaggerGroup className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                          {format(related.priceINR, related.priceUSD)}
                        </p>
                      </div>
                      <Link
                        to={`/course/${related.slug}`}
                        className="rounded-full border border-ink/15 px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                      >
                        Explore Now
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </StaggerGroup>
        </Section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Cities                                                            */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Badge tone="accent">Also Available Near You</Badge>
        <h2 className="mt-4 text-2xl font-semibold text-ink sm:text-3xl">{course.title.split(' ').slice(0, -2).join(' ') || course.title} Training in Other Cities</h2>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {cities.map((city) => (
            <span
              key={city}
              className="flex items-center gap-1.5 rounded-full border border-ink/[0.08] bg-surface-alt px-4 py-1.5 text-xs font-medium text-ink-muted"
            >
              <MapPin size={11} className="text-primary-500" /> {city}
            </span>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Stats + Drop a Query                                              */}
      {/* ---------------------------------------------------------------- */}
      <Section className="pb-12 sm:pb-16">
        <div className="grid grid-cols-1 overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 shadow-panel ">
          <div className="flex w-full flex-col items-center justify-center p-8 text-center sm:p-12 mx-auto ">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">This course has served</h2>
            <div className="mt-5 grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
              {servedStats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex flex-col items-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white">
                    <Icon size={18} />
                  </span>
                  <p className="mt-3 text-2xl font-bold text-white">{value}</p>
                  <p className="text-xs text-white/70">{label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
        <div className="bg-white">
          <p className="mb-4 text-lg font-semibold text-ink">Drop a Query</p>
          <LeadForm course={course} />
        </div>
      </Section>

      {/* Mobile Sticky Bottom CTA Bar */}
      {/* <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-ink/[0.08] bg-white/95 backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-semibold text-ink">{course.title}</p>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-base font-bold text-accent-600">
                {currencyCode === 'INR'
                  ? `₹${course.priceINR.toLocaleString('en-IN')}`
                  : `$${course.priceUSD.toLocaleString('en-US')}`}
              </span>
              <span className="font-mono text-xs text-ink-soft line-through">
                {currencyCode === 'INR'
                  ? `₹${course.originalPriceINR.toLocaleString('en-IN')}`
                  : `$${course.originalPriceUSD.toLocaleString('en-US')}`}
              </span>
            </div>
          </div>
          <Button onClick={() => document.querySelector('[class*="Enroll"]')?.click()} variant="accent" size="md" className="shrink-0">
            Enroll Now
          </Button>
        </div>
      </div> */}
    </>
  );
}