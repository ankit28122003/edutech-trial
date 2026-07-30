// import { motion } from 'framer-motion';
// import { ArrowRight, Zap, Brain, Star } from 'lucide-react';
// import Container from '../../components/ui/Container';
// import Button from '../../components/ui/Button';
// import Marquee from '../../components/ui/Marquee';
// import { TRUST_LOGOS } from '../../data/trustLogos';

// const FEATURE_CHIPS = [
//   {
//     icon: Zap,
//     title: 'Live Mentorship',
//     desc: 'Weekly office hours with principal engineers and hiring managers.',
//   },
//   {
//     icon: Brain,
//     title: 'Project Intelligence',
//     desc: 'Structured capstones mapped to real production workflows.',
//   },
// ];

// export default function Hero() {
//   return (
//     <section className="relative overflow-hidden bg-surface pt-14 pb-8 sm:pt-20">
//       {/* Ambient background gradient — quiet, not a full-bleed neon glow */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -top-32 right-[-10%] h-[480px] w-[480px] rounded-full bg-primary-100/60 blur-3xl"
//       />
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -bottom-24 left-[-8%] h-[380px] w-[380px] rounded-full bg-accent-100/50 blur-3xl"
//       />

//       <Container className="relative">
//         <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
//           <div>
//             <motion.span
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-3.5 py-1.5 font-mono text-xs font-medium text-ink-muted shadow-card"
//             >
//               <Star size={12} className="fill-accent-500 text-accent-500" strokeWidth={0} />
//               Rated 4.8/5 by 12,500+ learners
//             </motion.span>

//             <motion.h1
//               initial={{ opacity: 0, y: 18 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.08 }}
//               className="mt-5 text-4xl font-semibold leading-[1.06] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]"
//             >
//               Learn in-demand skills for{' '}
//               <span className="relative whitespace-nowrap text-primary-600">
//                 tomorrow's jobs
//                 <svg
//                   aria-hidden="true"
//                   viewBox="0 0 300 12"
//                   className="absolute -bottom-1 left-0 w-full text-accent-400"
//                   preserveAspectRatio="none"
//                 >
//                   <path d="M2 9C60 2 240 2 298 9" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
//                 </svg>
//               </span>
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0, y: 18 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.16 }}
//               className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg"
//             >
//               Experience learning that delivers results. We're disrupting how you learn new-age technologies and
//               helping you get job-ready, fast — with mentor-led cohorts and capstones tied to real hiring signals.
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, y: 18 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.24 }}
//               className="mt-8 flex flex-wrap items-center gap-3"
//             >
//               <Button to="/courses" variant="primary" size="lg">
//                 Explore Programs <ArrowRight size={17} />
//               </Button>
//               <Button to="/contact" variant="outline" size="lg">
//                 Book a Career Audit
//               </Button>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 18 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.32 }}
//               className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2"
//             >
//               {FEATURE_CHIPS.map(({ icon: Icon, title, desc }) => (
//                 <div key={title} className="flex gap-3 rounded-xl border border-ink/[0.06] bg-white p-4 shadow-card">
//                   <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
//                     <Icon size={16} />
//                   </span>
//                   <div>
//                     <p className="text-sm font-semibold text-ink">{title}</p>
//                     <p className="mt-0.5 text-xs leading-relaxed text-ink-muted">{desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </motion.div>
//           </div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.96 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
//             className="relative"
//           >
//             <div className="overflow-hidden rounded-[1.75rem] border border-ink/[0.06] shadow-panel">
//               <img
//                 src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop"
//                 alt="Mentor guiding learners through a live project session"
//                 className="h-[420px] w-full object-cover sm:h-[480px]"
//                 loading="eager"
//                 width={1200}
//                 height={800}
//               />
//             </div>

//             <motion.div
//               initial={{ opacity: 0, y: 12 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.6 }}
//               className="absolute -left-6 bottom-6 hidden w-52 rounded-2xl border border-ink/[0.06] bg-white p-4 shadow-panel sm:block"
//             >
//               <p className="font-mono text-2xl font-semibold text-ink">4,500+</p>
//               <p className="text-xs text-ink-muted">companies hiring our alumni globally</p>
//             </motion.div>
//           </motion.div>
//         </div>

//         <div className="mt-16 border-t border-ink/[0.06] pt-8">
//           <p className="mb-5 text-center font-mono text-xs uppercase tracking-wider text-ink-soft sm:text-left">
//             Trusted by learners now working at
//           </p>
//           <Marquee
//             items={TRUST_LOGOS}
//             renderItem={(name) => (
//               <span className="px-4 text-lg font-semibold tracking-tight text-ink-soft/70 grayscale">{name}</span>
//             )}
//           />
//         </div>
//       </Container>
//     </section>
//   );
// }



import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';

const HERO_STATS = [
  { value: '100%', label: 'Success rate' },
  { value: '3,00,000+', label: 'Careers advanced' },
  { value: '45%', label: 'Average Hike' },
  { value: '300+', label: 'Hiring Partners' },
];

function StatCard({ value, label, className }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border-2 border-double border-transparent bg-white px-4 py-3 shadow-card ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(white, white), linear-gradient(114.56deg, #059669 0%, rgba(5,150,105,0.2) 31.72%, rgba(5,150,105,0.2) 79.84%, #059669 97.59%)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
      }}
    >
      <div className="text-left">
        <p className="text-xl font-bold text-ink">{value}</p>
        <p className="mt-0.5 text-sm text-ink-muted">{label}</p>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-14 pb-8 sm:pt-20 sm:pb-12">
      <Container className="relative">
        <div className="flex flex-col items-center text-center">
          {/* Trusted badge */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
            Your Trusted Global Learning Partner
          </motion.span>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-6 text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl"
          >
            Shape your Tomorrow by Building a Skill Today
          </motion.h1>

          {/* Underline SVG */}
          <motion.svg
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            viewBox="0 0 400 12"
            className="mt-1 w-80 sm:w-96"
            preserveAspectRatio="none"
          >
            <path
              d="M2 10C80 2 320 2 398 10"
              stroke="#059669"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />
            <path
              d="M2 10C80 2 320 2 398 10"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </motion.svg>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-2 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg"
          >
            Learn from industry experts through guided training sessions.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-6"
          >
            <Button to="/courses" variant="primary" size="lg">
              Explore Courses
              <ArrowRight size={18} />
            </Button>
          </motion.div>

          {/* Main Poster Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-8 w-full max-w-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop"
              alt="Students learning in a collaborative environment"
              className="w-full rounded-2xl object-cover shadow-panel"
              loading="eager"
              width={1200}
              height={700}
            />

            {/* Floating Stat Cards - Desktop */}
            <div className="hidden md:block">
              <StatCard
                value="100%"
                label="Success rate"
                className="absolute -left-8 top-16 min-w-[9rem]"
              />
              <StatCard
                value="3,00,000+"
                label="Careers advanced"
                className="absolute -left-6 bottom-8 min-w-[10rem]"
              />
              <StatCard
                value="45%"
                label="Average Hike"
                className="absolute -right-6 top-20 min-w-[9rem]"
              />
              <StatCard
                value="300+"
                label="Hiring Partners"
                className="absolute -right-8 bottom-12 min-w-[9rem]"
              />
            </div>
          </motion.div>

          {/* Floating Stat Cards - Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-6 grid w-full grid-cols-2 gap-3 md:hidden"
          >
            {HERO_STATS.map((stat) => (
              <StatCard key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
