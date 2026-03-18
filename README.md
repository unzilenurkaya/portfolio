# Next Portfolio

Kisisel portfolyo ve blog sitesi. Proje Next.js App Router yapisi ile gelistirilmis, blog icerikleri ise `content/blog` altindaki MDX dosyalarindan uretilir.

## Ozellikler

- Ana sayfada portfolyo bolumleri
- MDX tabanli blog yapisi
- `sitemap` ve `robots` uretimi
- Open Graph API route
- Resend uzerinden calisan iletisim formu

## Teknoloji Yigini

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint 9
- MDX tabanli icerik yapisi

## Proje Yapisi

```text
src/
  app/
    page.tsx
    blog/
    cv/
    privacy/
    api/
  components/
  data/
  lib/
content/
  blog/
public/
```

## Gelistirme

Gelistirme sunucusunu baslatmak icin:

```bash
npm install
npm run dev
```

Tarayicida [http://localhost:3000](http://localhost:3000) adresini acabilirsiniz.

## Scriptler

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Ortam Degiskenleri

Projeyi calistirmadan once `.env.example` dosyasini referans alarak kendi `.env.local` dosyanizi olusturun.

Kullanilan degiskenler:

- `NEXT_PUBLIC_SITE_URL`: sitemap, robots ve SEO metadata icin temel site adresi
- `RESEND_API_KEY`: iletisim formundaki e-posta gonderimi icin gerekli anahtar
- `GOOGLE_SITE_VERIFICATION`: opsiyonel Search Console dogrulamasi
- `NEXT_PUBLIC_GA_ID`: opsiyonel Google Analytics kimligi

Not: `RESEND_API_KEY` tanimli degilse iletisim API'si gelistirme kolayligi icin yine basarili doner, ancak gercek e-posta gonderimi yapilmaz.

## Icerik Yonetimi

- Blog yazilari `content/blog/*.mdx` altinda tutulur
- Portfolyo icerikleri `src/data/*` dosyalarindan beslenir

## Deploy

Bu proje Vercel uzerinde deploy edilmeye uygundur. Uretim ortami icin en azindan su degiskenlerin tanimli oldugundan emin olun:

- `NEXT_PUBLIC_SITE_URL`
- `RESEND_API_KEY`
