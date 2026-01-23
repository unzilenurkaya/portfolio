import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası',
  description: 'Ünzile Nur KAYA Portfolio sitesi gizlilik politikası ve kişisel verilerin korunması hakkında bilgilendirme.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  const lastUpdated = '23 Ocak 2026';
  
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        {/* Back Link */}
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
          Ana Sayfaya Dön
        </Link>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Gizlilik Politikası
          </h1>
          <p className="text-gray-400">
            Son güncelleme: {lastUpdated}
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">1. Genel Bilgi</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Bu gizlilik politikası, unzilenurkaya.com web sitesini (&quot;Site&quot;) ziyaret ettiğinizde 
              kişisel verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklamaktadır.
            </p>
            <p className="text-gray-300 leading-relaxed">
              6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) ve Avrupa Birliği Genel Veri 
              Koruma Tüzüğü (&quot;GDPR&quot;) kapsamında haklarınızı korumayı taahhüt ediyoruz.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">2. Toplanan Veriler</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Site üzerinden aşağıdaki veriler toplanabilir:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong>İletişim Formu:</strong> İsim, e-posta adresi ve mesaj içeriği</li>
              <li><strong>Otomatik Veriler:</strong> IP adresi, tarayıcı türü, ziyaret tarihi ve süresi</li>
              <li><strong>Çerezler:</strong> Site deneyimini iyileştirmek için kullanılan çerezler</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">3. Verilerin Kullanım Amacı</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Toplanan veriler aşağıdaki amaçlarla kullanılır:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>İletişim formundaki mesajlarınıza yanıt vermek</li>
              <li>Site performansını analiz etmek ve iyileştirmek</li>
              <li>Güvenlik tehditlerine karşı koruma sağlamak</li>
              <li>Yasal yükümlülükleri yerine getirmek</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">4. Çerez Politikası</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Site, deneyiminizi iyileştirmek için çerezler kullanır:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong>Zorunlu Çerezler:</strong> Sitenin temel işlevleri için gereklidir</li>
              <li><strong>Analitik Çerezler:</strong> Ziyaretçi istatistiklerini toplamak için kullanılır</li>
              <li><strong>Tercih Çerezleri:</strong> Dil tercihinizi hatırlamak için kullanılır</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              Tarayıcı ayarlarınızdan çerezleri yönetebilir veya devre dışı bırakabilirsiniz.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">5. Veri Güvenliği</h2>
            <p className="text-gray-300 leading-relaxed">
              Kişisel verilerinizi korumak için endüstri standardı güvenlik önlemleri kullanılmaktadır. 
              Site HTTPS protokolü ile şifrelenmektedir. Ancak, internet üzerinden veri iletiminin 
              %100 güvenli olmadığını unutmayınız.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">6. Üçüncü Taraf Hizmetler</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Site, aşağıdaki üçüncü taraf hizmetlerini kullanabilir:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong>Vercel:</strong> Hosting ve analitik</li>
              <li><strong>Google Analytics:</strong> Ziyaretçi istatistikleri (opsiyonel)</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              Bu hizmetlerin kendi gizlilik politikaları bulunmaktadır.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">7. Haklarınız</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              KVKK ve GDPR kapsamında aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>Verilerinize erişim talep etme</li>
              <li>Verilerin düzeltilmesini veya silinmesini isteme</li>
              <li>Veri işlemeye itiraz etme</li>
              <li>Veri taşınabilirliği talep etme</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">8. İletişim</h2>
            <p className="text-gray-300 leading-relaxed">
              Gizlilik politikamız hakkında sorularınız için aşağıdaki kanallardan iletişime geçebilirsiniz:
            </p>
            <p className="text-gray-300 mt-4">
              <strong>E-posta:</strong>{' '}
              <a 
                href="mailto:unzileenurkaya@gmail.com" 
                className="text-primary hover:underline"
              >
                unzileenurkaya@gmail.com
              </a>
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">9. Politika Güncellemeleri</h2>
            <p className="text-gray-300 leading-relaxed">
              Bu gizlilik politikası zaman zaman güncellenebilir. Değişiklikler bu sayfada yayınlanacaktır. 
              Önemli değişikliklerde site üzerinden bildirim yapılacaktır.
            </p>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/10">
          <p className="text-gray-500 text-sm text-center">
            Bu politikayı kabul etmiyorsanız, lütfen siteyi kullanmayınız.
          </p>
        </footer>
      </div>
    </main>
  );
}
