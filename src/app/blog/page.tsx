'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import BlogCard from '@/components/blog/BlogCard';
import { useState, useEffect } from 'react';
import type { BlogPostMeta } from '@/lib/mdx';
import Badge from '@/components/ui/Badge';
import BlogNewsletter from '@/components/blog/BlogNewsletter';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export default function BlogPage() {
  const { t, language } = useLanguage();
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/blog');
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts);
          setTags(data.tags);
        }
      } catch {
        setPosts([]);
        setTags([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  const filteredPosts = selectedTag
    ? posts.filter((post) =>
      post.tags.map((t) => t.toLowerCase()).includes(selectedTag.toLowerCase())
    )
    : otherPosts;

  const displayPosts = selectedTag ? filteredPosts : otherPosts;

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <section className="mb-20 text-center lg:text-left grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="primary" className="mb-4 uppercase tracking-widest px-4 py-1">
              Blog
            </Badge>
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">
              {t('blog.title')}
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed">
              {t('blog.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative aspect-video rounded-3xl overflow-hidden border border-white/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center text-8xl">
              ✍️
            </div>
          </motion.div>
        </section>

        {/* Featured Post Card */}
        {!isLoading && featuredPost && !selectedTag && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-24"
          >
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <div className="glass-card rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-primary/30 transition-all duration-500 overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0 lg:h-[450px]">
                <div className="relative h-64 lg:h-full overflow-hidden">
                  {featuredPost.image ? (
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-8xl">
                      🚀
                    </div>
                  )}
                  <div className="absolute top-6 left-6">
                    <Badge variant="primary" className="shadow-2xl">
                      🔥 {t('blog.featured')}
                    </Badge>
                  </div>
                </div>

                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium uppercase tracking-widest text-primary">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-3xl md:text-4xl font-serif text-white mb-6 group-hover:text-primary transition-colors leading-snug">
                    {featuredPost.title}
                  </h2>

                  <p className="text-gray-400 text-lg mb-8 line-clamp-3 leading-relaxed">
                    {featuredPost.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <time>{formatDate(featuredPost.date, language)}</time>
                      <span>•</span>
                      <span>{featuredPost.readingTime} {t('blog.readingTime')}</span>
                    </div>
                    <span className="text-white font-medium flex items-center gap-2 group-hover:gap-4 transition-all">
                      {t('blog.readMore')} →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.section>
        )}

        {/* Filters & Grid Container */}
        <section>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <h2 className="text-2xl font-serif text-white">
              {selectedTag ? `${t('projects.filters.all')} / ${selectedTag}` : t('blog.relatedPosts')}
            </h2>

            {/* Tags Filter */}
            <div className="flex flex-wrap justify-center md:justify-end gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${selectedTag === null
                    ? 'bg-primary text-black shadow-lg shadow-primary/20'
                    : 'bg-white/5 text-white/50 hover:bg-white/10 border border-white/10'
                  }`}
              >
                {t('projects.filters.all')}
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${selectedTag === tag
                      ? 'bg-primary text-black shadow-lg shadow-primary/20'
                      : 'bg-white/5 text-white/50 hover:bg-white/10 border border-white/10'
                    }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Posts Grid */}
          {!isLoading && displayPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && displayPosts.length === 0 && (
            <div className="text-center py-20 glass-card rounded-3xl border border-white/10">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-400 text-lg">{t('blog.noPosts')}</p>
            </div>
          )}
        </section>

        {/* Newsletter Section at the bottom */}
        <section className="mt-32">
          <BlogNewsletter />
        </section>
      </div>
    </main>
  );
}
