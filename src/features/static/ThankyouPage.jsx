import { Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import SEO from '../../components/common/SEO';
import Button from '../../components/ui/Button';

export default function ThankyouPage() {
  return (
    <>
      <SEO
        title="Thank You"
        description="Thank you for reaching out to Edutech Skills. We'll get back to you shortly."
        canonicalPath="/thankyou"
      />

      <div className="flex min-h-[70vh] items-center justify-center px-5 py-20">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-success-50">
            <CheckCircle size={48} className="text-success-500" />
          </div>

          <h1 className="mt-6 text-3xl font-semibold text-ink sm:text-4xl">
            Thank You!
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            Your submission has been received successfully. Our learning advisor
            will reach out to you within <strong>1 business day</strong>.
          </p>

          <div className="mt-4 rounded-xl border border-ink/[0.06] bg-surface-alt p-4 text-sm text-ink-muted">
            <p>In the meantime, feel free to explore our course catalog.</p>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button to="/courses" variant="primary" size="lg">
              Browse Courses
            </Button>
            <Button to="/" variant="outline" size="lg">
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

