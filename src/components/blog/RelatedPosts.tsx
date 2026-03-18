import { getRelatedPosts } from '@/lib/mdx';
import { Language } from '@/types';
import BlogCard from './BlogCard';

interface RelatedPostsProps {
    currentSlug: string;
    tags: string[];
    title: string;
    language?: Language;
}

export default function RelatedPosts({ currentSlug, tags, title, language = 'tr' }: RelatedPostsProps) {
    const relatedPosts = getRelatedPosts(currentSlug, tags, 2, language);

    if (relatedPosts.length === 0) return null;

    return (
        <div className="mt-20 pt-16 border-t border-white/10">
            <h3 className="text-2xl font-serif text-white mb-8 flex items-center gap-3">
                <span className="text-primary">✨</span>
                {title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                ))}
            </div>
        </div>
    );
}
