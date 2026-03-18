import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, honeypot } = body;

    // Honeypot check for spam
    if (honeypot) {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
    }

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Check if RESEND_API_KEY is configured
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn('RESEND_API_KEY not configured. Email not sent.');
      // Return success for development without actual email sending
      return NextResponse.json({ 
        success: true, 
        message: 'Message received (email sending not configured)' 
      });
    }

    // Initialize Resend with API key
    const resend = new Resend(apiKey);
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['unzileenurkaya@gmail.com'],
      replyTo: email,
      subject: `[Portfolio] ${safeSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FF6B35;">Yeni Mesaj - Portfolio</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Gonderen:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Konu:</strong> ${safeSubject}</p>
          </div>
          <div style="padding: 20px; border: 1px solid #eee; border-radius: 8px;">
            <h3 style="margin-top: 0;">Mesaj:</h3>
            <p style="white-space: pre-wrap;">${safeMessage}</p>
          </div>
          <p style="color: #888; font-size: 12px; margin-top: 20px;">
            Bu mesaj unzilenurkaya.vercel.app portfolio sitesinden gonderildi.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
