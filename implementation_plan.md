# 🎯 PORTFOLIO EXECUTION ROADMAP
## AI Coding Agent İçin Eksiksiz Uygulama Planı

---

# 📋 PROJE BİLGİLERİ

| Bilgi | Değer |
|-------|-------|
| **Ad Soyad** | Ünzile Nur KAYA |
| **Unvan** | YBS Öğrencisi & Developer |
| **Email** | unzileenurkaya@gmail.com |
| **GitHub** | github.com/unzilenurkaya |
| **LinkedIn** | linkedin.com/in/unzilenurkaya |
| **Telefon** | ❌ Gizli (gösterilmeyecek) |

---

# 🎨 TASARIM SPESİFİKASYONLARI

## Tema: Nexus Grid + Fluid Cursor + Bento Layout

## Renk Paleti
```css
--background: #0a0a0a
--primary: #FF7E5F (Coral)
--secondary: #FEB47B (Peach)
--accent-cyan: #00F5FF
--accent-lime: #32CD32
--card-bg: rgba(255,255,255,0.03)
--card-border: rgba(255,255,255,0.08)
```

## Tipografi
- Headings: Playfair Display (700)
- Body: Inter (400/500)
- Code: Geist Mono

## Efektler
- Fluid Cursor: Parçacık efekti
- Neon Rings: Fotoğraf etrafında
- Glassmorphism: Navbar, kartlar
- Bento Grid: Farklı boyutlu kutucuklar

---

# 📊 İÇERİK VERİLERİ

## Eğitim
1. Bandırma 17 Eylül Üni. - YBS (2022-2026)
2. Anadolu Üni. - Bilgisayar Prog. (2022-Devam)

## Stajlar
1. Uyu Sleep Capsule - Software Developer (Ağu-Ara 2024)
2. KMA Yazılım - Front-End Developer (Tem-Ağu 2024)
3. Çelebi Bandırma Limanı - IT Stajyeri (Tem-Ağu 2025)

## Yetenekler
| Core | Seviye |
|------|--------|
| Python | %80 |
| SQL | %75 |
| Pandas/Excel | %80 |
| Otomasyon | %75 |

| Supporting | Seviye |
|------------|--------|
| React | %65 |
| HTML/CSS | %70 |
| JavaScript | %65 |

| Familiar | Seviye |
|----------|--------|
| SAP ABAP | %40 |
| C# | %55 |
| Git | %60 |
| Power BI | %45 |

## Projeler
1. 📅 Puantaj Takip Otomasyonu (Python, Pandas)
2. 🏨 Otel İptal Tahmini AI (XGBoost, Streamlit)
3. 🐕 Sokak Hayvanları IoT (Arduino)
4. 💼 Sponsorluk Yönetim Sistemi

---

# ⚙️ TEKNİK YIĞIN

- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Animation: Framer Motion
- Blog: MDX (next-mdx-remote)
- Contact: EmailJS
- Validation: Zod
- Deploy: Vercel

---

# 📁 DOSYA YAPISI

```
next-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── not-found.tsx
│   │   ├── cv/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Timeline.tsx
│   │   │   ├── Certificates.tsx
│   │   │   └── Contact.tsx
│   │   ├── blog/
│   │   │   ├── BlogCard.tsx
│   │   │   └── MDXComponents.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Badge.tsx
│   │       ├── Input.tsx
│   │       ├── SkillBar.tsx
│   │       ├── FluidCursor.tsx
│   │       ├── LanguageToggle.tsx
│   │       ├── ScrollToTop.tsx
│   │       ├── LoadingScreen.tsx
│   │       ├── SkipToContent.tsx
│   │       ├── CookieBanner.tsx
│   │       └── Toast.tsx
│   ├── context/
│   │   └── LanguageContext.tsx
│   ├── data/
│   │   ├── translations.ts
│   │   ├── skills.ts
│   │   ├── projects.ts
│   │   ├── experience.ts
│   │   ├── certificates.ts
│   │   └── social.ts
│   ├── lib/
│   │   ├── mdx.ts
│   │   ├── emailjs.ts
│   │   ├── validations.ts
│   │   └── utils.ts
│   └── types/
│       └── index.ts
├── content/blog/
├── public/
│   ├── cv.pdf
│   └── images/
├── .env.local
├── vercel.json
└── next.config.ts
```

---

# 📋 FAZ DETAYLARI

## FAZ 1: ALTYAPI ✅ TAMAMLANDI

---

## FAZ 2: DİL + UI (2-3 saat)

**Amaç:** TR/EN dil sistemi + UI bileşenleri

**Görevler:**
1. LanguageContext.tsx oluştur
2. translations.ts oluştur (tüm metinler TR/EN)
3. LanguageToggle.tsx oluştur
4. Button.tsx (gradient, hover glow)
5. Card.tsx (glassmorphism)
6. Badge.tsx (gradient bg)
7. Input.tsx (focus glow)
8. ScrollToTop.tsx
9. next-themes kur, dark mode default

**Test:** TR/EN toggle çalışıyor, localStorage kaydediyor

**Bağımlılık:** FAZ 1

---

## FAZ 3: ANA BÖLÜMLER (3-4 saat)

**Amaç:** Skills, Projects, Timeline, About

**Görevler:**
1. skills.ts data dosyası (3 kategori)
2. projects.ts data dosyası (4 proje, PSR format)
3. experience.ts data dosyası
4. Skills.tsx (Bento Grid)
5. Projects.tsx (filtre + hover)
6. ProjectModal.tsx (dynamic import)
7. Timeline.tsx (dikey, neon çizgi)
8. About.tsx
9. Hero.tsx güncelle (neon rings)
10. SkillBar.tsx (animasyonlu progress)

**Test:** Tüm bölümler render, filtre çalışıyor, modal açılıyor

**Bağımlılık:** FAZ 2

---

## FAZ 4: SERTİFİKALAR (1 saat)

**Amaç:** Başarılar/sertifikalar bölümü

**Görevler:**
1. certificates.ts data dosyası
2. Certificates.tsx
3. Lightbox görünümü

**Bağımlılık:** FAZ 3

---

## FAZ 5: LAYOUT & UX (3-4 saat)

**Amaç:** Navbar, Footer, 404, Loading

**Görevler:**
1. Navbar.tsx güncelle (glassmorphism, scroll efekti)
2. MobileMenu.tsx (hamburger, slide-in)
3. Footer.tsx (sosyal linkler)
4. not-found.tsx (uzay temalı)
5. LoadingScreen.tsx (logo reveal)
6. SkipToContent.tsx
7. ErrorBoundary.tsx

**A11y:** Skip to Content, focus indicators, ARIA labels

**Bağımlılık:** FAZ 4

---

## FAZ 6: İLETİŞİM (2-3 saat)

**Amaç:** EmailJS form

**Görevler:**
1. .env.local (EMAILJS keys)
2. emailjs.ts config
3. validations.ts (Zod schema)
4. Contact.tsx
5. Toast.tsx (success/error)
6. Honeypot spam koruması

**Paketler:** @emailjs/browser, zod

**Bağımlılık:** FAZ 5

---

## FAZ 7: BLOG + CV (3-4 saat)

**Amaç:** MDX blog + online CV

**Görevler:**
1. MDX paketleri kur
2. mdx.ts utility
3. content/blog/ klasörü
4. blog/page.tsx (liste)
5. blog/[slug]/page.tsx (detay)
6. BlogCard.tsx
7. MDXComponents.tsx
8. cv/page.tsx
9. print.css
10. PDF indirme butonu

**Paketler:** next-mdx-remote, gray-matter, reading-time

**Bağımlılık:** FAZ 6

---

## FAZ 8: SEO (2-3 saat)

**Amaç:** Arama motoru optimizasyonu

**Görevler:**
1. layout.tsx metadata güncelle
2. Dynamic title/description
3. Canonical URLs
4. Hreflang (TR/EN)
5. OG Image generator
6. sitemap.ts
7. robots.ts
8. Person schema (About)
9. Article schema (Blog)

**Bağımlılık:** FAZ 7

---

## FAZ 9: LEGAL (1-2 saat)

**Amaç:** KVKK/GDPR uyumu

**Görevler:**
1. privacy/page.tsx
2. CookieBanner.tsx
3. consent.ts (localStorage)

**Bağımlılık:** FAZ 8

---

## FAZ 10: PERFORMANS (2-3 saat)

**Amaç:** Lighthouse 95+

**Görevler:**
1. Font optimization (next/font)
2. Image compression
3. Bundle analysis
4. Code splitting audit
5. Prefetch critical pages

**Hedef:** First Load JS < 200KB, LCP < 2.5s

**Bağımlılık:** FAZ 9

---

## FAZ 11: GÜVENLİK (1 saat)

**Amaç:** Security headers

**Görevler:**
1. vercel.json oluştur
2. Security headers ekle (CSP, XSS, etc.)

**Bağımlılık:** FAZ 10

---

## FAZ 12: DEPLOY (2 saat)

**Amaç:** Yayına alma

**Görevler:**
1. Favicon seti oluştur
2. Cross-browser test
3. Mobile test
4. Vercel deploy
5. Analytics kur
6. Search Console submit

**Bağımlılık:** FAZ 11

---

# 🎯 KALİTE HEDEFLERİ

- Lighthouse Performance: 95+
- Lighthouse Accessibility: 100
- Lighthouse Best Practices: 100
- Lighthouse SEO: 100
- LCP: < 2.5s
- CLS: < 0.1

---

# ⏱️ TOPLAM: 18-20 SAAT
