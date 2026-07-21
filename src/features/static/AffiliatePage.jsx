import { Percent, Link2, Wallet } from 'lucide-react';
import SEO from '../../components/common/SEO';
import Section from '../../components/ui/Section';
import Button from '../../components/ui/Button';
import StaggerGroup, { staggerItemVariants } from '../../components/common/StaggerGroup';
import { motion } from 'framer-motion';
import PageHero from './PageHero';

const STEPS = [
  { icon: Link2, title: 'Get your link', desc: 'Sign up and get a unique referral link for any course or the whole catalog.' },
  { icon: Percent, title: 'Share & earn', desc: 'Earn a commission on every enrollment that completes through your link.' },
  { icon: Wallet, title: 'Get paid monthly', desc: 'Commissions are paid out monthly once you cross the minimum payout threshold.' },
];

export default function AffiliatePage() {
  return (
    <>
      <SEO
        title="Affiliate Program"
        description="Earn commissions by referring learners to Edutech Skills certification programs."
        canonicalPath="/affiliate"
      />
      <PageHero
        eyebrow="Partner with Us"
        title="Earn by recommending programs you believe in"
        description="Creators, mentors, and communities can earn recurring commission by referring learners to Edutech Skills."
      />

      <Section>
        <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={staggerItemVariants}
              className="rounded-2xl border border-ink/[0.06] bg-white p-6 text-center shadow-card"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <Icon size={22} />
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{desc}</p>
            </motion.div>
          ))}
        </StaggerGroup>

        <div className="mt-12 text-center">
          <Button to="/contact" size="lg">
            Join the Affiliate Program
          </Button>
        </div>
      </Section>
    </>
  );
}
