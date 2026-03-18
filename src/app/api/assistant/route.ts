import { NextResponse } from 'next/server';

type AssistantAction = 'projects' | 'cv' | 'blog' | 'contact' | 'about' | 'fallback';

const siteContext = `
You are the on-site assistant for Unzile Nur Kaya's portfolio.

Facts about the site:
- The correct full name is "Ünzile Nur KAYA". Always preserve Turkish characters correctly.
- Never write the name as "Unzile", "Unzile Nur", or any ASCII-only variation.
- The owner is not a professional engineer. Do not call her "mühendis", "engineer", or imply she already holds an engineering title.
- The owner is a Management Information Systems student focused on AI engineering, automation, data-driven systems, and software development.
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
If the current language is Turkish, reply in natural Turkish with proper Turkish characters.
If the current language is English, reply in natural English.
Prefer wording like "Yönetim Bilişim Sistemleri öğrencisi", "AI odaklı geliştirici", "AI engineering odağı", "software developer", or "MIS student" where appropriate.
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

function sanitizeReply(reply: string, language: 'tr' | 'en' = 'tr') {
  return reply
    .replace(/\bUnzile\b/g, 'Ünzile')
    .replace(/\bUnzile Nur\b/g, 'Ünzile Nur')
    .replace(/\bUnzile Nur Kaya\b/g, 'Ünzile Nur KAYA')
    .replace(/\bÜnzile Nur Kaya\b/g, 'Ünzile Nur KAYA')
    .replace(/\bmühendis\b/gi, language === 'tr' ? 'geliştirici' : 'developer')
    .replace(/\bengineer\b/gi, language === 'en' ? 'developer' : 'geliştirici');
}

async function requestGemini(prompt: string, apiKey: string) {
  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite';

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
    throw new Error(await response.text());
  }

  const data = await response.json();
  return parseAssistantResponse(extractTextFromCandidate(data));
}

async function requestOpenRouter(prompt: string, apiKey: string) {
  const model = process.env.OPENROUTER_MODEL || 'openai/gpt-oss-120b:free';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unzilenurkaya.vercel.app';

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': siteUrl,
      'X-Title': "Unzile's Portfolio Assistant",
    },
    body: JSON.stringify({
      model,
      temperature: 0.5,
      max_tokens: 220,
      messages: [
        {
          role: 'system',
          content: siteContext,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  return parseAssistantResponse(data.choices?.[0]?.message?.content || '');
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

    const geminiApiKey = process.env.GEMINI_API_KEY;
    const openRouterApiKey = process.env.OPENROUTER_API_KEY;

    if (!geminiApiKey && !openRouterApiKey) {
      return NextResponse.json({
        reply:
          language === 'en'
            ? 'The AI connection is ready. Once a Gemini or OpenRouter API key is added, I can answer more intelligently.'
            : 'AI baglantisi hazir. Gemini veya OpenRouter API key eklendiginde daha akilli cevaplar verebilirim.',
        action: 'fallback',
      });
    }

    const prompt = `
${siteContext}

Current language: ${language === 'en' ? 'English' : 'Turkish'}
Current pathname: ${pathname || '/'}
Current active section: ${activeSection || 'unknown'}
User message: ${message}
`;

    if (geminiApiKey) {
      try {
        const geminiResult = await requestGemini(prompt, geminiApiKey);
        return NextResponse.json({
          ...geminiResult,
          reply: sanitizeReply(geminiResult.reply, language),
        });
      } catch (error) {
        if (!openRouterApiKey) {
          return NextResponse.json(
            {
              reply:
                language === 'en'
                  ? 'The AI assistant could not respond right now, but I can still help you navigate the site.'
                  : 'AI asistani su anda cevap veremedi, ama seni site icinde yonlendirmeye devam edebilirim.',
              action: 'fallback',
              error: error instanceof Error ? error.message : 'Gemini request failed',
            },
            { status: 200 }
          );
        }
      }
    }

    if (openRouterApiKey) {
      try {
        const openRouterResult = await requestOpenRouter(prompt, openRouterApiKey);
        return NextResponse.json({
          ...openRouterResult,
          reply: sanitizeReply(openRouterResult.reply, language),
        });
      } catch (error) {
        return NextResponse.json(
          {
            reply:
              language === 'en'
                ? 'Both AI providers are currently unavailable, but I can still help you navigate the site.'
                : 'Su anda iki AI saglayicisi da cevap veremiyor, ama seni site icinde yonlendirmeye devam edebilirim.',
            action: 'fallback',
            error: error instanceof Error ? error.message : 'OpenRouter request failed',
          },
          { status: 200 }
        );
      }
    }

    return NextResponse.json({
      reply: language === 'en' ? 'Assistant unavailable.' : 'Asistan su anda kullanilamiyor.',
      action: 'fallback',
    });
  } catch {
    return NextResponse.json({
      reply: 'Assistant unavailable.',
      action: 'fallback',
    });
  }
}
