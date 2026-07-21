import { useEffect } from 'react';

function setMetaTag(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Sets document title + meta description/OG tags per page.
 * Deliberately dependency-free (no react-helmet) to keep the bundle lean;
 * swap for react-helmet-async later if per-route SSR is introduced.
 */
export default function SEO({ title, description, image, canonicalPath }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Edutech Skills` : 'Edutech Skills';
    document.title = fullTitle;

    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    if (image) setMetaTag('property', 'og:image', image);

    if (canonicalPath) {
      let link = document.head.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', `https://www.edutechskills.example${canonicalPath}`);
    }
  }, [title, description, image, canonicalPath]);

  return null;
}
