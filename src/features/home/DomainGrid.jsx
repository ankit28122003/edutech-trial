// import { ArrowUpRight, ArrowLeft } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import Section from '../../components/ui/Section';
// import SectionHeading from '../../components/ui/SectionHeading';
// import Button from '../../components/ui/Button';
// import StaggerGroup, { staggerItemVariants } from '../../components/common/StaggerGroup';
// import { DOMAINS } from '../../data/domains';

// const MotionLink = motion(Link);

// export default function DomainGrid() {
//   return (
//     <Section className="bg-surface-alt overflow-hidden">
//       <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
//         <SectionHeading
//           eyebrow="High-Impact Skills"
//           title="Choose From 25+ In-Demand Domains"
//           description="Immersive courses in booming fields like Data Science, AI, and Cloud Computing — practical knowledge mapped to what the market is hiring for right now."
//         />
//         <Button to="/courses" variant="outline" className="shrink-0">
//           Browse Catalog
//         </Button>
//       </div>

//       {/* Animated marquee text lines */}
//       <div className="relative mt-6 overflow-hidden">
//         {/* Line 1 - moving left */}
//         <div className="relative mb-2">
//           <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface-alt to-transparent" />
//           <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-transparent to-surface-alt" />
//           <motion.p
//             className="flex w-max gap-4 font-mono text-xs font-medium uppercase tracking-[0.15em] text-primary-500/40"
//             animate={{ x: ['0%', '-50%'] }}
//             transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
//           >
//             {Array(8).fill('✦ Explore Our Domains ✦ In-Demand Skills ✦ Expert-Led Training ✦ Career-Focused Programs').map((text, i) => (
//               <span key={`l1-${i}`} className="shrink-0">{text}</span>
//             ))}
//           </motion.p>
//         </div>

//         {/* Line 2 - moving right */}
//         <div className="relative">
//           <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface-alt to-transparent" />
//           <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-transparent to-surface-alt" />
//           <motion.p
//             className="flex w-max gap-4 font-mono text-xs font-medium uppercase tracking-[0.15em] text-primary-400/30"
//             animate={{ x: ['-50%', '0%'] }}
//             transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
//           >
//             {Array(8).fill('✦ Hands-On Projects ✨ Mentor-Led Learning ✦ Certifications ✦ Real-World Skills').map((text, i) => (
//               <span key={`l2-${i}`} className="shrink-0">{text}</span>
//             ))}
//           </motion.p>
//         </div>
//       </div>

//       <StaggerGroup className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
//         {DOMAINS.map((domain) => (
//           <MotionLink
//             key={domain.id}
//             to={`/courses?category=${encodeURIComponent(domain.name)}`}
//             variants={staggerItemVariants}
//             whileHover={{ y: -4 }}
//             className="group flex items-center justify-between gap-3 rounded-xl border border-ink/[0.06] bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover"
//           >
//             <span className="flex items-center gap-3">
//               <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-lg">
//                 {domain.icon}
//               </span>
//               <span>
//                 <span className="block text-sm font-semibold text-ink">{domain.name}</span>
//                 <span className="block font-mono text-xs text-ink-soft">{domain.courseCount} programs</span>
//               </span>
//             </span>
//             <ArrowUpRight
//               size={16}
//               className="shrink-0 text-ink-soft transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary-600"
//             />
//           </MotionLink>
//         ))}
//       </StaggerGroup>
//     </Section>
//   );
// }




import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Brain,
  Cloud,
  Shield,
  Cog,
  Database,
  BarChart3,
  Briefcase,
  Timer,
  Wrench,
  ArrowUpRight,
} from "lucide-react";

const MotionLink = motion(Link);

const DOMAINS = [
  {
    name: "Artificial Intelligence",
    icon: Brain,
    color: "bg-pink-100 text-pink-600",
  },
  {
    name: "Cloud Computing",
    icon: Cloud,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    name: "IT Service Management",
    icon: Wrench,
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    name: "Cyber Security",
    icon: Shield,
    color: "bg-sky-100 text-sky-600",
  },
  {
    name: "DevOps",
    icon: Cog,
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Project Management",
    icon: Briefcase,
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "Agile Management",
    icon: Timer,
    color: "bg-red-100 text-red-600",
  },
  {
    name: "Data Science",
    icon: Database,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    name: "BI And Visualization",
    icon: BarChart3,
    color: "bg-orange-100 text-orange-600",
  },
];

function DomainCard({ domain }) {
  const Icon = domain.icon;

  return (
    <MotionLink
      to={`/courses?category=${encodeURIComponent(domain.name)}`}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group flex min-w-[340px] items-center justify-between rounded-2xl bg-white px-7 py-5 shadow-lg transition-shadow hover:shadow-xl"
    >
      <div className="flex items-center gap-5">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full ${domain.color}`}
        >
          <Icon size={26} />
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-800">
            {domain.name}
          </h3>

          <p className="mt-1 flex items-center gap-1 text-sm font-medium text-slate-500 group-hover:text-primary-600">
            Explore
            <ArrowUpRight size={15} />
          </p>
        </div>
      </div>
    </MotionLink>
  );
}

function MarqueeRow({ reverse = false }) {
  const cards = [...DOMAINS, ...DOMAINS];

  return (
    <div className="relative overflow-hidden">

      {/* Left Fade */}

      <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-24 bg-gradient-to-r from-[#eef5ff] to-transparent" />

      {/* Right Fade */}

      <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-24 bg-gradient-to-l from-[#eef5ff] to-transparent" />

      <motion.div
        className="flex w-max gap-6"
        animate={{
          x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          duration: 40,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {cards.map((domain, index) => (
          <DomainCard
            key={`${domain.name}-${index}`}
            domain={domain}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function DomainGrid() {
  return (
    <section className="overflow-hidden rounded-[42px] bg-[#eef5ff] py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-4xl text-center">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">
            High-Impact Skills For The Future Of Work
          </p>

          <h2 className="mt-5 text-5xl font-extrabold text-slate-900 lg:text-6xl">
            Choose From 25+ In-Demand Domains
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg italic leading-9 text-slate-600">
            Our immersive courses in booming fields like Data Science,
            Artificial Intelligence and Cloud Computing provide practical,
            industry-ready skills that help you stay ahead in today's
            competitive job market.
          </p>

        </div>

        {/* Top Marquee */}

        <div className="mt-20">
          <MarqueeRow />
        </div>        {/* Bottom Marquee */}

        <div className="mt-6">
          <MarqueeRow reverse />
        </div>

      </div>

      {/* Background Pattern */}

      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle,#1e3a8a 1px,transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
      </div>
    </section>
  );
}