import SEO from '../../components/common/SEO';
import Section from '../../components/ui/Section';
import Accordion from '../../components/ui/Accordion';
import Reveal from '../../components/common/Reveal';
import PageHero from './PageHero';
import { FAQS } from '../../data/faqs';

export default function FAQPage() {
  return (
    <>
      <SEO
        title="Frequently Asked Questions"
        description="Answers to common questions about Edutech Skills programs, certifications, payments and refunds."
        canonicalPath="/faq"
      />
      <PageHero eyebrow="Support" title="Frequently Asked Questions" />

      <Section className="max-w-3xl">
        <Reveal>
          <Accordion items={FAQS} />
        </Reveal>
      </Section>
    </>
  );
}
