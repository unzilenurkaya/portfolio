'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { getAllPosts, getAllTags } from '@/lib/mdx';
import BlogCard from '@/components/blog/BlogCard';
import { useState, useEffect } from 'react';
import type { BlogPostMeta } from '@/lib/mdx';

export default function BlogPage() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Client-side data fetching workaround for static exports
    const fetchData = async () => {
      try {
        const res = await fetch('/api/blog');
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts);
          setTags(data.tags);
        }
      } catch {
        // Fallback: empty state
        setPosts([]);
        setTags([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredPosts = selectedTag
    ? posts.filter((post) =>
        post.tags.map((t) => t.toLowerCase()).includes(selectedTag.toLowerCase())
      )
    : posts;

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-4">
            {t('blog.title')}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {t('blog.subtitle')}
          </p>
        </motion.div>

        {/* Tags Filter */}
        {tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedTag === null
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
              }`}
            >
              {t('projects.filters.all')}
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedTag === tag
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                }`}
              >
                {tag}
              </button>
            ))}
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Posts Grid */}
        {!isLoading && filteredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
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
        {!isLoading && filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">📝</div>
            <p className="text-gray-400 text-lg">{t('blog.noPosts')}</p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
