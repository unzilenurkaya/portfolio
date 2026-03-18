import { NextResponse } from 'next/server';
import { getAllPosts, getAllTags } from '@/lib/mdx';
import { Language } from '@/types';

function getLanguage(input: string | null): Language {
  return input === 'en' ? 'en' : 'tr';
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = getLanguage(searchParams.get('lang'));
    const posts = getAllPosts(language);
    const tags = getAllTags(language);

    return NextResponse.json({ posts, tags });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ posts: [], tags: [] });
  }
}
