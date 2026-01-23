import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
  published: boolean;
  image?: string;
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
export function getAllPosts(): BlogPostMeta[] {
  const slugs = getAllPostSlugs();
  
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts.map(({ content, ...meta }) => meta);
}

// Get a single blog post by slug
export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title || 'Untitled',
    description: data.description || '',
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    tags: data.tags || [],
    readingTime: `${Math.ceil(stats.minutes)}`,
    published: data.published !== false,
    image: data.image,
    content,
  };
}

// Get posts by tag
export function getPostsByTag(tag: string): BlogPostMeta[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => 
    post.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

// Get all unique tags
export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tagsSet = new Set<string>();
  
  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag));
  });
  
  return Array.from(tagsSet).sort();
}
