import { BLOG_POSTS } from '../data/blogPosts';

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getBlogPosts() {
  await delay();
  return BLOG_POSTS;
}

export async function getBlogPostBySlug(slug) {
  await delay();
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) throw new Error('Post not found');
  return post;
}
