import SEO from '../../components/common/SEO';
import LegalPageLayout from './LegalPageLayout';

const SECTIONS = [
  {
    heading: '1. Acceptance of Terms',
    paragraphs: [
      'By accessing or enrolling in any Edutech Skills program, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, please do not use our services.',
    ],
  },
  {
    heading: '2. Enrollment & Access',
    paragraphs: [
      'Course access is granted upon successful payment confirmation and is licensed to the individual learner account only. Sharing login credentials or reselling course access is prohibited.',
    ],
  },
  {
    heading: '3. Payments & Currency',
    paragraphs: [
      'Prices are displayed in INR for learners billed in India (inclusive of applicable GST) and in USD or GBP for learners billed outside India. All payments are processed through our secure payment partner, Razorpay.',
    ],
  },
  {
    heading: '4. Refund Policy',
    paragraphs: [
      'You may request a full refund within 7 days of purchase provided you have completed less than 20% of the course content. Refund requests after this window, or after exceeding the completion threshold, are evaluated on a case-by-case basis.',
    ],
  },
  {
    heading: '5. Intellectual Property',
    paragraphs: [
      'All course materials, videos, assessments, and downloadable resources are the intellectual property of Edutech Skills and its instructors, and are provided for personal, non-commercial learning use only.',
    ],
  },
  {
    heading: '6. Limitation of Liability',
    paragraphs: [
      'Edutech Skills provides training and career guidance in good faith but does not guarantee employment, promotion, or specific salary outcomes as a result of completing any program.',
    ],
  },
  {
    heading: '7. Changes to These Terms',
    paragraphs: [
      'We may update these Terms from time to time. Continued use of our services after changes are posted constitutes acceptance of the revised Terms.',
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <SEO
        title="Terms and Conditions"
        description="Terms and conditions governing the use of Edutech Skills programs and services."
        canonicalPath="/terms"
      />
      <LegalPageLayout
        eyebrow="Legal"
        title="Terms and Conditions"
        updatedDate="July 1, 2026"
        sections={SECTIONS}
      />
    </>
  );
}
