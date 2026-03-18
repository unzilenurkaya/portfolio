import { NextResponse } from 'next/server';

type AssistantAction = 'projects' | 'cv' | 'blog' | 'contact' | 'about' | 'fallback';

const siteContext = `
You are the on-site assistant for Unzile Nur Kaya's portfolio.

Facts about the site:
- The owner focuses on AI engineering, automation, data-driven systems, and software development.
- Main sections on the home page: about, skills, projects, experience, certificates, contact.
- There is a dedicated blog page with AI engineering posts, including OpenClaw, personal assistant systems, and LLM workflow notes.
- There is a CV/resume page.

Navigation actions you may choose:
- projects
- cv
- blog
- contact
- about
- fallback

Return JSON only in this exact shape:
{"reply":"...","action":"projects|cv|blog|contact|about|fallback"}

Keep replies short, warm, and practical.
`;

function extractTextFromCandidate(data: unknown): string {
  if (
    typeof data === 'object' &&
    data !== null &&
    'candidates' in data &&
    Array.isArray((data as { candidates?: unknown[] }).candidates)
  ) {
    const firstCandidate = (data as { candidates: Array<{ content?: { parts?: Array<{ text?: string }> } }> }).candidates[0];
    return firstCandidate?.content?.parts?.map((part) => part.text || '').join('') || '';
  }

  return '';
}

function parseAssistantResponse(raw: string) {
  const cleaned = raw.trim().replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim();

  try {
    const parsed = JSON.parse(cleaned) as { reply?: string; action?: AssistantAction };
    return {
      reply: parsed.reply || 'I can guide you through the site.',
      action: parsed.action || 'fallback',
    };
  } catch {
    return {
      reply: raw || 'I can guide you through the site.',
      action: 'fallback' as AssistantAction,
    };
  }
}

export async function POST(request: Request) {
  try {
    const { message, language, pathname, activeSection } = (await request.json()) as {
      message?: string;
      language?: 'tr' | 'en';
      pathname?: string;
      activeSection?: string;
    };

    if (!message?.trim()) {
      return NextResponse.json({ reply: 'Empty message.', action: 'fallback' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        reply:
          language === 'en'
            ? 'The AI connection is ready. Once a Gemini API key is added, I can answer more intelligently.'
            : 'AI baglantisi hazir. Gemini API key eklendiginde daha akilli cevaplar verebilirim.',
        action: 'fallback',
      });
    }

    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    const prompt = `
${siteContext}

Current language: ${language === 'en' ? 'English' : 'Turkish'}
Current pathname: ${pathname || '/'}
Current active section: ${activeSection || 'unknown'}
User message: ${message}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.5,
            responseMimeType: 'application/json',
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          reply:
            language === 'en'
              ? 'The AI assistant could not respond right now, but I can still help you navigate the site.'
              : 'AI asistani su anda cevap veremedi, ama seni site icinde yonlendirmeye devam edebilirim.',
          action: 'fallback',
          error: errorText,
        },
        { status: 200 }
      );
    }

    const data = await response.json();
    const text = extractTextFromCandidate(data);
    const parsed = parseAssistantResponse(text);

    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({
      reply: 'Assistant unavailable.',
      action: 'fallback',
    });
  }
}
