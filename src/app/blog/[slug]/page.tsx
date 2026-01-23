import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPostSlugs, getPostBySlug } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import components from '@/components/blog/MDXComponents';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';
import Image from 'next/image';
import { ArticleSchema } from '@/components/seo/JsonLd';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unzilenurkaya.com';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
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
  const post = getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
      <ArticleSchema
        title={post.title}
        description={post.description}
        url={`${siteUrl}/blog/${post.slug}`}
        image={post.image || `${siteUrl}/api/og?title=${encodeURIComponent(post.title)}&type=blog`}
        datePublished={post.date}
        authorName="Ünzile Nur KAYA"
        authorUrl={siteUrl}
      />
      <article className="max-w-3xl mx-auto px-6">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
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
          Bloga Dön
        </Link>

        {/* Header */}
        <header className="mb-12">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" size="sm">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-6 text-gray-400 text-sm">
            <time dateTime={post.date} className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {formatDate(post.date, 'tr')}
            </time>
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {post.readingTime} dk okuma
            </span>
          </div>
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="mb-12 rounded-2xl overflow-hidden border border-white/10 relative aspect-video">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <MDXRemote source={post.content} components={components} />
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl">
                👩‍💻
              </div>
              <div>
                <p className="text-white font-medium">Ünzile Nur KAYA</p>
                <p className="text-gray-500 text-sm">YBS Öğrencisi & Developer</p>
              </div>
            </div>
            
            {/* Share Links */}
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-sm">Paylaş:</span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://unzilenurkaya.com/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Twitter'da paylaş"
              >
                𝕏
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://unzilenurkaya.com/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-xs"
                aria-label="LinkedIn'de paylaş"
              >
                in
              </a>
            </div>
          </div>
        </footer>
      </article>
    </main>
  );
}
