import SEO from '../../components/common/SEO';
import LegalPageLayout from './LegalPageLayout';

const SECTIONS = [
  {
    heading: '1. Information We Collect',
    paragraphs: [
      'We collect information you provide directly, such as your name, email address, phone number, and payment details, as well as usage data like course progress and login activity.',
    ],
  },
  {
    heading: '2. How We Use Your Information',
    paragraphs: [
      'We use your information to deliver course access, process payments, provide customer support, personalize recommendations, and communicate important updates about your enrollment.',
    ],
  },
  {
    heading: '3. Payment Data',
    paragraphs: [
      'Payments are processed by Razorpay. We do not store your full card or bank details on our servers; Razorpay handles this data in accordance with PCI-DSS standards.',
    ],
  },
  {
    heading: '4. Data Sharing',
    paragraphs: [
      'We do not sell your personal data. We may share limited data with service providers (such as payment processors and email delivery services) strictly to operate our platform.',
    ],
  },
  {
    heading: '5. Cookies',
    paragraphs: [
      'We use cookies and similar technologies to remember your preferences (such as currency selection) and to understand how learners use our site so we can improve it.',
    ],
  },
  {
    heading: '6. Your Rights',
    paragraphs: [
      'You may request access to, correction of, or deletion of your personal data at any time by contacting us at the email address listed on our Contact page.',
    ],
  },
  {
    heading: '7. Data Security',
    paragraphs: [
      'We use industry-standard security practices, including encrypted connections and access controls, to protect your data against unauthorized access.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="How Edutech Skills collects, uses, and protects your personal information."
        canonicalPath="/privacy"
      />
      <LegalPageLayout
        eyebrow="Legal"
        title="Privacy Policy"
        updatedDate="July 1, 2026"
        sections={SECTIONS}
      />
    </>
  );
}
