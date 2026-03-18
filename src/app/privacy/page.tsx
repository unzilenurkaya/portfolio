import { Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { translations } from '@/data/translations';
import { Language } from '@/types';

export const metadata: Metadata = {
  title: 'Gizlilik Politikasi / Privacy Policy',
  description:
    'Privacy policy and personal data notice for the Unzile Nur KAYA portfolio website.',
  robots: {
    index: true,
    follow: true,
  },
};

interface PrivacySection {
  title: string;
  paragraphs: string[];
  list?: string[];
  footer?: string;
  contactLabel?: string;
}

interface PrivacyLocaleContent {
  backHome: string;
  lastUpdatedValue: string;
  sections: PrivacySection[];
  footer: string;
}

interface PrivacyContentMap {
  tr: PrivacyLocaleContent;
  en: PrivacyLocaleContent;
}

const privacyContent: PrivacyContentMap = {
  tr: {
    backHome: 'Ana Sayfaya Don',
    lastUpdatedValue: '23 Ocak 2026',
    sections: [
      {
        title: '1. Genel Bilgi',
        paragraphs: [
          'Bu gizlilik politikasi, unzilenurkaya.com web sitesini ("Site") ziyaret ettiginizde kisisel verilerinizin nasil toplandigini, kullanildigini ve korundugunu aciklar.',
          '6698 sayili Kisisel Verilerin Korunmasi Kanunu ("KVKK") ve Avrupa Birligi Genel Veri Koruma Tuzugu ("GDPR") kapsaminda haklarinizi korumayi taahhut ediyoruz.',
        ],
      },
      {
        title: '2. Toplanan Veriler',
        paragraphs: ['Site uzerinden asagidaki veriler toplanabilir:'],
        list: [
          '<strong>Iletisim Formu:</strong> Isim, e-posta adresi ve mesaj icerigi',
          '<strong>Otomatik Veriler:</strong> IP adresi, tarayici turu, ziyaret tarihi ve suresi',
          '<strong>Cerezler:</strong> Site deneyimini iyilestirmek icin kullanilan cerezler',
        ],
      },
      {
        title: '3. Verilerin Kullanim Amaci',
        paragraphs: ['Toplanan veriler asagidaki amaclarla kullanilir:'],
        list: [
          'Iletisim formundaki mesajlariniza yanit vermek',
          'Site performansini analiz etmek ve iyilestirmek',
          'Guvenlik tehditlerine karsi koruma saglamak',
          'Yasal yukumlulukleri yerine getirmek',
        ],
      },
      {
        title: '4. Cerez Politikasi',
        paragraphs: [
          'Site, deneyiminizi iyilestirmek icin cerezler kullanir:',
          'Tarayici ayarlarinizdan cerezleri yonetebilir veya devre disi birakabilirsiniz.',
        ],
        list: [
          '<strong>Zorunlu Cerezler:</strong> Sitenin temel islevleri icin gereklidir',
          '<strong>Analitik Cerezler:</strong> Ziyaretci istatistiklerini toplamak icin kullanilir',
          '<strong>Tercih Cerezleri:</strong> Dil tercihinizi hatirlamak icin kullanilir',
        ],
      },
      {
        title: '5. Veri Guvenligi',
        paragraphs: [
          'Kisisel verilerinizi korumak icin endustri standardi guvenlik onlemleri kullanilmaktadir. Site HTTPS protokolu ile sifrelenmektedir. Ancak internet uzerinden veri iletiminin yuzde yuz guvenli olmadigini unutmayiniz.',
        ],
      },
      {
        title: '6. Ucuncu Taraf Hizmetler',
        paragraphs: ['Site, asagidaki ucuncu taraf hizmetlerini kullanabilir:'],
        list: [
          '<strong>Vercel:</strong> Hosting ve analitik',
          '<strong>Google Analytics:</strong> Ziyaretci istatistikleri (opsiyonel)',
        ],
        footer: 'Bu hizmetlerin kendi gizlilik politikalari bulunmaktadir.',
      },
      {
        title: '7. Haklariniz',
        paragraphs: ['KVKK ve GDPR kapsaminda asagidaki haklara sahipsiniz:'],
        list: [
          'Verilerinizin islenip islenmedigini ogrenme',
          'Verilerinize erisim talep etme',
          'Verilerin duzeltilmesini veya silinmesini isteme',
          'Veri islemeye itiraz etme',
          'Veri tasinabilirligi talep etme',
        ],
      },
      {
        title: '8. Iletisim',
        paragraphs: ['Gizlilik politikamiz hakkinda sorulariniz icin asagidaki kanaldan iletisime gecebilirsiniz:'],
        contactLabel: 'E-posta',
      },
      {
        title: '9. Politika Guncellemeleri',
        paragraphs: [
          'Bu gizlilik politikasi zaman zaman guncellenebilir. Degisiklikler bu sayfada yayinlanacaktir. Onemli degisikliklerde site uzerinden bildirim yapilacaktir.',
        ],
      },
    ],
    footer: 'Bu politikayi kabul etmiyorsaniz, lutfen siteyi kullanmayiniz.',
  },
  en: {
    backHome: 'Back to Home',
    lastUpdatedValue: 'January 23, 2026',
    sections: [
      {
        title: '1. Overview',
        paragraphs: [
          'This privacy policy explains how your personal data is collected, used, and protected when you visit unzilenurkaya.com (the "Site").',
          'We are committed to protecting your rights under the Turkish Personal Data Protection Law ("KVKK") and the General Data Protection Regulation ("GDPR").',
        ],
      },
      {
        title: '2. Data We Collect',
        paragraphs: ['The Site may collect the following data:'],
        list: [
          '<strong>Contact Form:</strong> Name, email address, and message content',
          '<strong>Automatic Data:</strong> IP address, browser type, visit date, and session duration',
          '<strong>Cookies:</strong> Cookies used to improve the site experience',
        ],
      },
      {
        title: '3. Why We Use Your Data',
        paragraphs: ['Collected data may be used for the following purposes:'],
        list: [
          'Responding to messages sent through the contact form',
          'Analyzing and improving site performance',
          'Protecting against security threats',
          'Complying with legal obligations',
        ],
      },
      {
        title: '4. Cookie Policy',
        paragraphs: [
          'The Site uses cookies to improve your experience:',
          'You can manage or disable cookies through your browser settings.',
        ],
        list: [
          '<strong>Required Cookies:</strong> Necessary for the core functionality of the site',
          '<strong>Analytics Cookies:</strong> Used to collect visitor statistics',
          '<strong>Preference Cookies:</strong> Used to remember your language preference',
        ],
      },
      {
        title: '5. Data Security',
        paragraphs: [
          'Industry-standard security measures are used to protect your personal data. The Site is encrypted with HTTPS. However, please remember that no data transmission over the internet is one hundred percent secure.',
        ],
      },
      {
        title: '6. Third-Party Services',
        paragraphs: ['The Site may use the following third-party services:'],
        list: [
          '<strong>Vercel:</strong> Hosting and analytics',
          '<strong>Google Analytics:</strong> Visitor statistics (optional)',
        ],
        footer: 'These services maintain their own privacy policies.',
      },
      {
        title: '7. Your Rights',
        paragraphs: ['Under KVKK and GDPR, you may have the following rights:'],
        list: [
          'Learn whether your data is being processed',
          'Request access to your data',
          'Ask for correction or deletion of your data',
          'Object to data processing',
          'Request data portability',
        ],
      },
      {
        title: '8. Contact',
        paragraphs: ['If you have questions about this privacy policy, you can contact us through:'],
        contactLabel: 'Email',
      },
      {
        title: '9. Policy Updates',
        paragraphs: [
          'This privacy policy may be updated from time to time. Changes will be published on this page. Important updates may also be announced on the site.',
        ],
      },
    ],
    footer: 'If you do not agree with this policy, please do not use the site.',
  },
} as const;

function getLanguageFromCookie(value?: string): Language {
  return value === 'en' ? 'en' : 'tr';
}

export default async function PrivacyPage() {
  const language = getLanguageFromCookie((await cookies()).get('portfolio-language')?.value);
  const dictionary = translations[language];
  const content = privacyContent[language];

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {content.backHome}
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            {dictionary.privacy.title}
          </h1>
          <p className="text-gray-400">
            {dictionary.privacy.lastUpdated}: {content.lastUpdatedValue}
          </p>
        </header>

        <div className="prose prose-invert max-w-none">
          {content.sections.map((section) => (
            <section key={section.title} className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-gray-300 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}

              {section.list && (
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  {section.list.map((item) => (
                    <li key={item} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ul>
              )}

              {section.footer && (
                <p className="text-gray-300 leading-relaxed mt-4">{section.footer}</p>
              )}

              {section.contactLabel && (
                <p className="text-gray-300 mt-4">
                  <strong>{section.contactLabel}:</strong>{' '}
                  <a
                    href="mailto:unzileenurkaya@gmail.com"
                    className="text-primary hover:underline"
                  >
                    unzileenurkaya@gmail.com
                  </a>
                </p>
              )}
            </section>
          ))}
        </div>

        <footer className="mt-16 pt-8 border-t border-white/10">
          <p className="text-gray-500 text-sm text-center">{content.footer}</p>
        </footer>
      </div>
    </main>
  );
}
