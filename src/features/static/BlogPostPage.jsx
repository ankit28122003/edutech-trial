import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import Section from '../../components/ui/Section';
import Container from '../../components/ui/Container';
import Badge from '../../components/ui/Badge';
import Reveal from '../../components/common/Reveal';
import Spinner from '../../components/ui/Spinner';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';
import { getBlogPostBySlug } from '../../services/blogService';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let isMounted = true;
    setStatus('loading');
    getBlogPostBySlug(slug)
      .then((data) => {
        if (isMounted) {
          setPost(data);
          setStatus('ready');
        }
      })
      .catch(() => isMounted && setStatus('error'));
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size={28} className="text-primary-500" />
      </div>
    );
  }

  if (status === 'error' || !post) {
    return (
      <Section>
        <EmptyState
          title="Post not found"
          action={
            <Button to="/blog" variant="outline">
              Back to blog
            </Button>
          }
        />
      </Section>
    );
  }

  return (
    <>
      <SEO title={post.title} description={post.excerpt} image={post.coverImage} canonicalPath={`/blog/${post.slug}`} />

      <div className="border-b border-ink/[0.06] bg-surface-alt py-12 sm:py-16">
        <Container className="max-w-3xl">
          <Reveal>
            <Link to="/blog" className="text-xs font-medium text-primary-600 hover:text-primary-700">
              ← Back to blog
            </Link>
            <Badge tone="primary" className="mt-4">
              {post.category}
            </Badge>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">{post.title}</h1>
            <p className="mt-4 font-mono text-xs text-ink-soft">
              By {post.author} • {formatDate(post.date)} • {post.readTime}
            </p>
          </Reveal>
        </Container>
      </div>

      <Section className="max-w-3xl">
        <Reveal>
          <img src={post.coverImage} alt="" className="aspect-[16/9] w-full rounded-2xl object-cover" loading="eager" />
        </Reveal>

        <div className="prose-content mt-10 space-y-5 text-base leading-relaxed text-ink-muted">
          <p className="text-lg text-ink">{post.excerpt}</p>
          <p>
            This is a preview article generated for the frontend demo. When the content backend is connected, this
            section will render the full article body stored in MongoDB, including headings, code blocks, and
            embedded media, using the same layout shown here.
          </p>
          <p>
            In the meantime, our advisors are happy to walk through this topic directly — reach out through the
            contact page and mention this article for a tailored answer.
          </p>
        </div>

        <div className="mt-10 flex items-center gap-4 rounded-2xl border border-ink/[0.06] bg-white p-5 shadow-card">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-50 font-semibold text-primary-700">
            {post.author.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">{post.author}</p>
            <p className="text-xs text-ink-muted">Mentor & Program Author, Edutech Skills</p>
          </div>
        </div>
      </Section>
    </>
  );
}
