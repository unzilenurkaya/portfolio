import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPostSlugs, getPostBySlug } from '@/lib/mdx';
import components from '@/components/blog/MDXComponents';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';
import Image from 'next/image';
import { ArticleSchema } from '@/components/seo/JsonLd';
import ReadingProgressBar from '@/components/blog/ReadingProgressBar';
import TableOfContents from '@/components/blog/TableOfContents';
import BlogMeta from '@/components/blog/BlogMeta';
import BlogNewsletter from '@/components/blog/BlogNewsletter';
import RelatedPosts from '@/components/blog/RelatedPosts';
import { translations } from '@/data/translations';
import { Language } from '@/types';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unzilenurkaya.com';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

function getLanguageFromCookie(value?: string): Language {
  return value === 'en' ? 'en' : 'tr';
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const language = getLanguageFromCookie((await cookies()).get('portfolio-language')?.value);
  const post = getPostBySlug(slug, language);

  if (!post) {
    return {
      title: language === 'en' ? 'Post Not Found' : 'Yazi Bulunamadi',
    };
  }

  const ogImageUrl = `${siteUrl}/api/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.description)}&type=blog`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: 'Ünzile Nur KAYA' }],
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['Ünzile Nur KAYA'],
      tags: post.tags,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const language = getLanguageFromCookie((await cookies()).get('portfolio-language')?.value);
  const dictionary = translations[language];
  const post = getPostBySlug(slug, language);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
      <ReadingProgressBar />
      <ArticleSchema
        title={post.title}
        description={post.description}
        url={`${siteUrl}/blog/${post.slug}`}
        image={post.image || `${siteUrl}/api/og?title=${encodeURIComponent(post.title)}&type=blog`}
        datePublished={post.date}
        authorName="Ünzile Nur KAYA"
        authorUrl={siteUrl}
      />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <article className="lg:col-span-8 lg:col-start-3">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 group text-sm font-medium uppercase tracking-widest"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {dictionary.blog.backToBlog}
          </Link>

          {/* Header */}
          <header className="mb-12">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" size="sm" className="bg-primary/5 border-primary/20 text-primary">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight">
              {post.title}
            </h1>

            <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl mb-10">
              {post.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/80">
                {`Ünzile Nur KAYA`}
              </div>
              <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-400">
                {dictionary.blog.noteBadge}
              </div>
            </div>

            {/* Meta & Share Row */}
            <BlogMeta
              date={post.date}
              readingTime={post.readingTime}
              title={post.title}
              slug={post.slug}
            />
          </header>

          {/* Featured Image */}
          {post.image && (
            <div className="mb-16 rounded-3xl overflow-hidden border border-white/10 relative aspect-[21/9] shadow-2xl">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          )}

          {/* Content Body */}
          <div className="prose prose-invert prose-orange max-w-none prose-headings:font-serif prose-h2:text-3xl prose-h3:text-2xl prose-p:text-gray-300 prose-p:text-lg prose-p:leading-relaxed prose-pre:bg-[#111] prose-pre:border prose-pre:border-white/10 prose-img:rounded-3xl">
            <MDXRemote source={post.content} components={components} />
          </div>

          {/* Article Footer */}
          <footer className="mt-20">
            <BlogNewsletter />
            <RelatedPosts currentSlug={post.slug} tags={post.tags} title={dictionary.blog.relatedPosts} language={language} />
          </footer>
        </article>

        {/* Sidebar - Table of Contents */}
        <aside className="hidden lg:block lg:col-span-2">
          <TableOfContents />
        </aside>
      </div>
    </main>
  );
}
