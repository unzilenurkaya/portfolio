import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { Language } from '@/types';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

interface LocalizedString {
  tr?: string;
  en?: string;
}

type LocalizedStringOrArray =
  | string
  | string[]
  | LocalizedString
  | {
      tr?: string[];
      en?: string[];
    };

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
  published: boolean;
  image?: string;
  series?: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

// Get all blog post slugs
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace('.mdx', ''));
}

// Get all blog posts metadata (for listing)
export function getAllPosts(language: Language = 'tr'): BlogPostMeta[] {
  const slugs = getAllPostSlugs();

  const posts = slugs
    .map((slug) => getPostBySlug(slug, language))
    .filter((post): post is BlogPost => post !== null && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts.map(({ ...meta }) => meta);
}

// Get a single blog post by slug
export function getPostBySlug(slug: string, language: Language = 'tr'): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const localizedContent = getLocalizedContent(content, language);
  const stats = readingTime(localizedContent);

  return {
    slug,
    title: getLocalizedString(data.title, language) || 'Untitled',
    description: getLocalizedString(data.description, language) || '',
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    tags: getLocalizedArray(data.tags, language),
    readingTime: `${Math.ceil(stats.minutes)}`,
    published: data.published !== false,
    image: data.image,
    series: data.series,
    content: localizedContent,
  };
}

// Get posts by tag
export function getPostsByTag(tag: string, language: Language = 'tr'): BlogPostMeta[] {
  const allPosts = getAllPosts(language);
  return allPosts.filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

// Get all unique tags
export function getAllTags(language: Language = 'tr'): string[] {
  const allPosts = getAllPosts(language);
  const tagsSet = new Set<string>();

  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}

// Get related posts by tags
export function getRelatedPosts(currentSlug: string, tags: string[], limit = 2, language: Language = 'tr'): BlogPostMeta[] {
  const allPosts = getAllPosts(language);

  return allPosts
    .filter((post) => post.slug !== currentSlug) // Exclude current post
    .map((post) => {
      // Calculate how many tags match
      const matchCount = post.tags.filter((tag) =>
        tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
      ).length;
      return { ...post, matchCount };
    })
    .filter((post) => post.matchCount > 0) // Only posts with at least one matching tag
    .sort((a, b) => b.matchCount - a.matchCount) // Sort by most matching tags
    .slice(0, limit)
    .map((post) => {
      const { matchCount, ...rest } = post;
      void matchCount;
      return rest;
    });
}

function getLocalizedString(value: LocalizedStringOrArray | undefined, language: Language): string {
  if (typeof value === 'string') {
    return value;
  }

  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const localized = value as LocalizedString;
    return localized[language] || localized.tr || localized.en || '';
  }

  return '';
}

function getLocalizedArray(value: LocalizedStringOrArray | undefined, language: Language): string[] {
  if (Array.isArray(value)) {
    return value;
  }

  if (value && typeof value === 'object') {
    const localized = value as { tr?: string[]; en?: string[] };
    return localized[language] || localized.tr || localized.en || [];
  }

  return [];
}

function getLocalizedContent(content: string, language: Language): string {
  const [trContent, enContent] = content.split('\n<!--en-->\n');
  const trimmedTr = trContent.trim();
  const trimmedEn = enContent?.trim();

  if (language === 'en' && trimmedEn) {
    return trimmedEn;
  }

  return trimmedTr;
}
