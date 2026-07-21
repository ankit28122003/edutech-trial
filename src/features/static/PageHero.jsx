import Container from '../../components/ui/Container';
import Reveal from '../../components/common/Reveal';

export default function PageHero({ eyebrow, title, description }) {
  return (
    <div className="border-b border-ink/[0.06] bg-surface-alt py-14 sm:py-20">
      <Container className="max-w-3xl text-center">
        {eyebrow && (
          <Reveal>
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-primary-600">
              {eyebrow}
            </span>
          </Reveal>
        )}
        <Reveal delay={0.08}>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-5xl">{title}</h1>
        </Reveal>
        {description && (
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-muted">{description}</p>
          </Reveal>
        )}
      </Container>
    </div>
  );
}
