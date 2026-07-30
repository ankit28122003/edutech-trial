// import { ArrowRight, Layers, Target, Route, Wrench } from 'lucide-react';
// import Section from '../../components/ui/Section';
// import Button from '../../components/ui/Button';
// import Marquee from '../../components/ui/Marquee';
// import Reveal from '../../components/common/Reveal';
// import { useContactPopup } from '../../context/ContactPopupContext';
// import { TRUST_LOGOS } from '../../data/trustLogos';

// const FEATURES = [
//   { icon: Layers, text: 'Immersive learning experience that blends theory with practical application.' },
//   { icon: Target, text: 'Results-driven learning journeys to empower your team with the skills for success.' },
//   { icon: Route, text: 'Learning pathways tailored to the specific needs of each role.' },
//   { icon: Wrench, text: 'Equip your workforce with the skills required to thrive in future.' },
// ];

// export default function EnterpriseSolutions() {
//   const { openPopup } = useContactPopup();

//   return (
//     <Section className="bg-ink">
//       <Reveal>
//         <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
//           <div>
//             <h2 className="text-2xl font-semibold text-white sm:text-3xl">
//               Comprehensive Training Solutions for Enterprises
//             </h2>
//             <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">
//               Comprehensive training solutions to empower enterprises with the skills needed for growth and
//               innovation. Tailored programs to boost productivity and improve workforce capabilities.
//             </p>
//           </div>
//           <Button onClick={openPopup} variant="accent" size="lg" className="shrink-0">
//             Start A Free Demo <ArrowRight size={16} />
//           </Button>
//         </div>
//       </Reveal>

//       <div className="mt-10">
//         <Marquee
//           items={TRUST_LOGOS}
//           speed="slow"
//           edgeColor="#0A0E1A"
//           renderItem={(name) => (
//             <span className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80">
//               {name}
//             </span>
//           )}
//         />
//       </div>

//       <p className="mt-12 text-center text-xs font-semibold uppercase tracking-wider text-primary-300">
//         Curriculum Designed to Fit Your Organization
//       </p>

//       <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         {FEATURES.map(({ icon: Icon, text }) => (
//           <div key={text} className="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
//             <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary-500/20 text-primary-300">
//               <Icon size={18} />
//             </span>
//             <p className="mt-3 text-xs leading-relaxed text-white/70">{text}</p>
//           </div>
//         ))}
//       </div>
//     </Section>
//   );
// }


import { motion } from 'framer-motion';
import { ArrowRight, Layers, Target, Route, Wrench } from 'lucide-react';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';
// import { useContactPopup } from '../../context/ContactPopupContext';
import { useModal } from '../../context/ModalContext';

// TODO: drop matching image files into /public/logos/ (same convention as
// CertifyingBodies) to swap these initials-only placeholders for real logos.
const ENTERPRISE_ROW_1 = [
  { name: 'AT&T', src: '/logos/att.png' },
  { name: 'General Mills', src: '/logos/general-mills.png' },
  { name: 'Honeywell', src: '/logos/honeywell.png' },
  { name: 'KPMG', src: '/logos/kpmg.png' },
  { name: 'Alfa', src: '/logos/alfa.png' },
  { name: 'Microsoft', src: '/logos/microsoft.png' },
  { name: 'Standard Chartered', src: '/logos/standard-chartered.png' },
  { name: 'TATA', src: '/logos/tata.png' },
  { name: 'UST Global', src: '/logos/ust-global.png' },
  { name: 'HackerRank', src: '/logos/hackerrank.png' },
];

const ENTERPRISE_ROW_2 = [
  { name: 'Resideo', src: '/logos/resideo.png' },
  { name: 'Availability Services', src: '/logos/availability-services.png' },
  { name: 'Schneider Electric', src: '/logos/schneider-electric.png' },
  { name: 'Thomson Reuters', src: '/logos/thomson-reuters.png' },
  { name: 'VIACOM', src: '/logos/viacom.png' },
  { name: 'WeWork', src: '/logos/wework.png' },
  { name: 'L&T Infotech', src: '/logos/lt-infotech.png' },
  { name: 'MicroFocus', src: '/logos/microfocus.png' },
  { name: 'REGAL', src: '/logos/regal.png' },
];

const FEATURES = [
  { icon: Layers, text: 'Immersive learning experience that blends theory with practical application.' },
  { icon: Target, text: 'Results-driven learning journeys to empower your team with the skills for success.' },
  { icon: Route, text: 'Learning Pathways tailored to the specific needs of each role.' },
  { icon: Wrench, text: 'Equip your workforce with the skills required to thrive in future.' },
];

function EnterpriseLogoCard({ logo }) {
  return (
    <div className="flex h-14 min-w-[9rem] items-center justify-center rounded-xl bg-white px-5 shadow-card">
      <img
        src={logo.src}
        alt={logo.name}
        loading="lazy"
        className="max-h-8 max-w-[120px] object-contain"
        onError={(e) => {
          // Falls back to the company name as text if the logo file hasn't been added yet.
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextSibling.style.display = 'block';
        }}
      />
      <span className="hidden text-sm font-semibold text-ink">{logo.name}</span>
    </div>
  );
}

function LogoMarqueeRow({ logos, direction = 'left' }) {
  const doubled = [...logos, ...logos];
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent sm:w-24" />
      <motion.div
        className="flex w-max items-center gap-6"
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((logo, index) => (
          <EnterpriseLogoCard key={`${direction}-${logo.name}-${index}`} logo={logo} />
        ))}
      </motion.div>
    </div>
  );
}

export default function EnterpriseSolutions() {
  const { openContact } = useModal();

  return (
    <section className="overflow-hidden bg-gradient-to-br from-ink via-primary-900 to-primary-800 py-14 sm:py-16">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              Comprehensive Training Solutions for Enterprises
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70">
              Comprehensive training solutions to empower enterprises with the skills needed for growth and
              innovation. Tailored programs to boost productivity and improve workforce capabilities.
            </p>
          </div>
          <Button onClick={openContact} variant="accent" size="lg" className="shrink-0">
            Start A Free Demo <ArrowRight size={16} />
          </Button>
        </div>

        <div className="my-8 border-t border-dashed border-white/20" />
      </Container>

      <div className="space-y-6">
        <LogoMarqueeRow logos={ENTERPRISE_ROW_1} direction="left" />
        <LogoMarqueeRow logos={ENTERPRISE_ROW_2} direction="right" />
      </div>

      <Container>
        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 border-t border-dashed border-white/20" />
          <span className="shrink-0 rounded-full bg-primary-600 px-4 py-1.5 text-xs font-semibold text-white">
            Curriculum Designed to Fit Your Organization
          </span>
          <div className="h-px flex-1 border-t border-dashed border-white/20" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-start gap-3 rounded-xl bg-white px-4 py-4 shadow-card">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                <Icon size={16} />
              </span>
              <p className="text-sm leading-relaxed text-ink">{text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}