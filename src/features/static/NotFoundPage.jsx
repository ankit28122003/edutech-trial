import { Compass } from 'lucide-react';
import SEO from '../../components/common/SEO';
import Section from '../../components/ui/Section';
import Button from '../../components/ui/Button';
import Reveal from '../../components/common/Reveal';

export default function NotFoundPage() {
  return (
    <>
      <SEO title="Page Not Found" description="The page you're looking for doesn't exist." />
      <Section className="flex flex-col items-center py-28 text-center">
        <Reveal>
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
            <Compass size={28} />
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 font-mono text-sm text-ink-soft">Error 404</p>
          <h1 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">We couldn't find that page</h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
            The page you're looking for may have moved or no longer exists. Let's get you back on track.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/">Go to Homepage</Button>
            <Button to="/courses" variant="outline">
              Browse Courses
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
