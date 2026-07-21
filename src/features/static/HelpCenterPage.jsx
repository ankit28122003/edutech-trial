import { useState } from 'react';
import { Search, CreditCard, GraduationCap, ShieldQuestion, Users } from 'lucide-react';
import SEO from '../../components/common/SEO';
import Section from '../../components/ui/Section';
import { Input } from '../../components/ui/FormField';
import StaggerGroup, { staggerItemVariants } from '../../components/common/StaggerGroup';
import { motion } from 'framer-motion';
import PageHero from './PageHero';
import { FAQS } from '../../data/faqs';

const TOPICS = [
  { icon: GraduationCap, title: 'Courses & Certification', desc: 'Enrollment, curriculum, and certification questions.' },
  { icon: CreditCard, title: 'Payments & Refunds', desc: 'Pricing, GST, installments, and refund policy.' },
  { icon: Users, title: 'Account & Access', desc: 'Login issues, account settings, and content access.' },
  { icon: ShieldQuestion, title: 'Something Else', desc: "Can't find it here? Reach out directly." },
];

export default function HelpCenterPage() {
  const [query, setQuery] = useState('');
  const filteredFaqs = FAQS.filter(
    (faq) => faq.question.toLowerCase().includes(query.toLowerCase()) || query === ''
  );

  return (
    <>
      <SEO
        title="Help Center"
        description="Find answers about courses, payments, and your Edutech Skills account."
        canonicalPath="/support"
      />
      <PageHero eyebrow="We're Here to Help" title="How can we help you today?" />

      <Section className="max-w-3xl">
        <div className="relative">
          <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft" />
          <Input
            placeholder="Search for help articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-12 pl-11 text-base"
          />
        </div>

        <StaggerGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {TOPICS.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={staggerItemVariants}
              className="flex gap-4 rounded-xl border border-ink/[0.06] bg-white p-5 shadow-card"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                <Icon size={18} />
              </span>
              <div>
                <p className="font-semibold text-ink">{title}</p>
                <p className="mt-1 text-sm text-ink-muted">{desc}</p>
              </div>
            </motion.div>
          ))}
        </StaggerGroup>

        <div className="mt-14">
          <h2 className="text-xl font-semibold text-ink">Popular Questions</h2>
          <div className="mt-5 space-y-3">
            {filteredFaqs.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-ink/[0.06] bg-white p-5 shadow-card">
                <p className="font-medium text-ink">{faq.question}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{faq.answer}</p>
              </div>
            ))}
            {filteredFaqs.length === 0 && (
              <p className="text-sm text-ink-muted">No results — try a different search term.</p>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
