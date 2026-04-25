import { BLOG_DATA } from '../../[lang]/blog/page';
import type { Language } from './types';

export interface BlogPostMeta {
  id: string;
  slug: string;
  title: { es: string; en: string };
  excerpt: { es: string; en: string };
  category: { es: string; en: string };
  categoryId: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
}

export function getAllBlogPosts(): BlogPostMeta[] {
  return BLOG_DATA.posts as BlogPostMeta[];
}

export function getBlogPostBySlug(slug: string): BlogPostMeta | null {
  const found = (BLOG_DATA.posts as BlogPostMeta[]).find((p) => p.slug === slug);
  return found ?? null;
}

export function pickBlogContent(post: BlogPostMeta, language: Language) {
  return {
    title: post.title[language],
    excerpt: post.excerpt[language],
    category: post.category[language],
  };
}
