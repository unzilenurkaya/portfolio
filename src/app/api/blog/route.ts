import { NextResponse } from 'next/server';
import { getAllPosts, getAllTags } from '@/lib/mdx';

export async function GET() {
  try {
    const posts = getAllPosts();
    const tags = getAllTags();

    return NextResponse.json({ posts, tags });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ posts: [], tags: [] });
  }
}
