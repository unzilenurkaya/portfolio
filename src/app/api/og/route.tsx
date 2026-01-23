import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get('title') || 'Ünzile Nur KAYA';
  const description = searchParams.get('description') || 'YBS Öğrencisi & Developer';
  const type = searchParams.get('type') || 'default';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle at 25% 25%, rgba(255, 126, 95, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(0, 245, 255, 0.1) 0%, transparent 50%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
            textAlign: 'center',
          }}
        >
          {/* Logo/Name */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '30px',
            }}
          >
            <span
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.02em',
              }}
            >
              ÜNZİLE NUR
            </span>
            <span
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#FF7E5F',
              }}
            >
              .
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: type === 'blog' ? '52px' : '64px',
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
              marginBottom: '20px',
              lineHeight: 1.2,
              maxWidth: '900px',
              textAlign: 'center',
            }}
          >
            {title}
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.7)',
              margin: 0,
              maxWidth: '700px',
              textAlign: 'center',
            }}
          >
            {description}
          </p>

          {/* Tags/Badge */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '40px',
            }}
          >
            {['Python', 'Data Analysis', 'Web Dev'].map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '8px 20px',
                  borderRadius: '20px',
                  background: 'rgba(255, 126, 95, 0.2)',
                  color: '#FF7E5F',
                  fontSize: '16px',
                  fontWeight: 500,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Gradient Line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #FF7E5F, #FEB47B, #00F5FF)',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
