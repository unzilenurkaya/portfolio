import { getRelatedPosts } from '@/lib/mdx';
import BlogCard from './BlogCard';

interface RelatedPostsProps {
    currentSlug: string;
    tags: string[];
}

export default function RelatedPosts({ currentSlug, tags }: RelatedPostsProps) {
    const relatedPosts = getRelatedPosts(currentSlug, tags);

    if (relatedPosts.length === 0) return null;

    return (
        <div className="mt-20 pt-16 border-t border-white/10">
            <h3 className="text-2xl font-serif text-white mb-8 flex items-center gap-3">
                <span className="text-primary">✨</span>
                İlgili Yazılar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                ))}
            </div>
        </div>
    );
}
