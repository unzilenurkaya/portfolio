'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { BlogPostMeta } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

interface BlogCardProps {
  post: BlogPostMeta;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { t, language } = useLanguage();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/blog/${post.slug}`} className="block group">
        <div className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all duration-300">
          {/* Image */}
          {post.image ? (
            <div className="relative h-48 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            </div>
          ) : (
            <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <span className="text-6xl opacity-50 group-hover:scale-110 transition-transform duration-300">
                📝
              </span>
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {post.description}
            </p>

            {/* Meta */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <time dateTime={post.date}>{formatDate(post.date, language)}</time>
              <span className="flex items-center gap-1">
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
                {post.readingTime} {t('blog.readingTime')}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
