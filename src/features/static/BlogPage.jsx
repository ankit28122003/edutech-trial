import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/common/SEO';
import Section from '../../components/ui/Section';
import Badge from '../../components/ui/Badge';
import StaggerGroup, { staggerItemVariants } from '../../components/common/StaggerGroup';
import PageHero from './PageHero';
import { getBlogPosts } from '../../services/blogService';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function BlogPage() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    getBlogPosts().then(setPosts);
  }, []);

  return (
    <>
      <SEO
        title="Blog"
        description="Career guidance, certification comparisons, and hiring insights from Edutech Skills mentors."
        canonicalPath="/blog"
      />
      <PageHero
        eyebrow="Insights"
        title="Career guidance from people who hire"
        description="Practical, no-fluff articles on certifications, career transitions, and what actually gets you interviews."
      />

      <Section>
        {!posts ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse space-y-3">
                <div className="aspect-[16/10] rounded-2xl bg-surface-alt" />
                <div className="h-4 w-3/4 rounded bg-surface-alt" />
                <div className="h-3 w-1/2 rounded bg-surface-alt" />
              </div>
            ))}
          </div>
        ) : (
          <StaggerGroup className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <motion.article key={post.slug} variants={staggerItemVariants}>
                <Link to={`/blog/${post.slug}`} className="group block">
                  <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-surface-alt">
                    <img
                      src={post.coverImage}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4">
                    <Badge tone="primary">{post.category}</Badge>
                    <h2 className="mt-3 text-lg font-semibold leading-snug text-ink group-hover:text-primary-700">
                      {post.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">{post.excerpt}</p>
                    <p className="mt-3 font-mono text-xs text-ink-soft">
                      {formatDate(post.date)} • {post.readTime}
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </StaggerGroup>
        )}
      </Section>
    </>
  );
}
