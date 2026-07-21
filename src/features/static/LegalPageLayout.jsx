import Section from '../../components/ui/Section';
import PageHero from './PageHero';

export default function LegalPageLayout({ eyebrow, title, updatedDate, sections }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={`Last updated: ${updatedDate}`} />
      <Section className="max-w-3xl">
        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl font-semibold text-ink">{section.heading}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink-muted">
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
