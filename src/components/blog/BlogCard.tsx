'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { BlogPostMeta } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import Image from 'next/image';

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
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Link href={`/blog/${post.slug}`} className="block group h-full">
        <div className="glass-card h-full rounded-3xl overflow-hidden border border-white/10 group-hover:border-primary/30 transition-all duration-500 flex flex-col group-hover:shadow-[0_20px_40px_-15px_rgba(255,107,53,0.15)]">
          {/* Image Container */}
          <div className="relative h-56 overflow-hidden">
            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <span className="text-5xl opacity-50 group-hover:scale-125 transition-transform duration-500">
                  📝
                </span>
              </div>
            )}

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

            {/* Tag on Image */}
            {post.tags.length > 0 && (
              <div className="absolute top-4 left-4">
                <Badge variant="outline" size="sm" className="bg-black/20 backdrop-blur-md border-white/20 text-white font-medium">
                  {post.tags[0]}
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col flex-1">
            <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-widest mb-4">
              <time dateTime={post.date}>{formatDate(post.date, language)}</time>
              <span>•</span>
              <span>{post.readingTime} {t('blog.readingTime')}</span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-snug font-serif">
              {post.title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
              {post.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
              <span className="text-sm font-medium text-white group-hover:text-primary transition-colors flex items-center gap-2">
                {t('blog.readMore')}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
