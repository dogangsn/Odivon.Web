// Site-wide settings used by metadata, robots.txt, sitemap.xml, llms.txt,
// analytics and the legal pages. Values marked TODO must be confirmed by the
// site owner before launch.

export const site = {
  name: 'Odivon',
  // Canonical origin without a trailing slash. TODO: confirm apex vs www.
  url: 'https://odivon.com',
  email: 'info@odivon.com',
  // Shown on the contact section, footer, legal pages and structured data.
  phone: '+90 532 486 17 98',
  phoneHref: 'tel:+905324861798',
  address: {
    street: 'Gülveren Mah. 3743 Sk. No:13 Daire 10',
    district: 'Kepez',
    city: 'Antalya',
    country: 'TR',
    full: 'Gülveren Mah. 3743 Sk. No:13 Daire 10 Kepez/Antalya',
  },
  // Google Analytics 4 measurement ID (G-XXXXXXXXXX). Empty disables analytics.
  // TODO: add the real ID from Google Analytics > Admin > Data streams.
  gaMeasurementId: '',
  // Sectors the products serve; used in structured data and llms.txt.
  sectors: ['Kuaför ve güzellik salonu yazılımı', 'SPA yönetim yazılımı', 'Spor salonu yazılımı', 'Veteriner klinik yazılımı', 'Rent a car yazılımı', 'Sürücü kursu yazılımı', 'Otopark yönetim yazılımı', 'Ön muhasebe ve fatura yazılımı', 'ERP', 'Çiftlik ve hayvancılık yönetimi', 'Randevu yönetimi', 'Eğitim ve sınav hazırlık platformu', 'F-Gaz uyumluluk yazılımı', 'Gıda etiket yönetimi', 'Yangın güvenliği bakım takibi'],
  // Official profiles (LinkedIn, Instagram, X, YouTube...). TODO: add real URLs.
  sameAs: [] as string[],
  // <lastmod> in sitemap.xml. Update it when page content changes.
  contentUpdated: '2026-11-06',
  // Date shown on the legal pages. Update it whenever the texts change.
  legalUpdated: '2026-10-25',
  // TODO: replace with the registered company details (KVKK data controller).
  company: {
    legalName: '[Şirket unvanı]',
    address: 'Gülveren Mah. 3743 Sk. No:13 Daire 10 Kepez/Antalya',
    mersis: '[MERSİS no]',
    taxOffice: '[Vergi dairesi / no]',
    kvkkEmail: 'info@odivon.com',
  },
} as const;

// Pages listed in sitemap.xml. Keep this in sync with app/ routes.
export const sitePages: readonly { path: string; priority: number; changefreq: string }[] = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/urunler', priority: 0.9, changefreq: 'weekly' },
  { path: '/gizlilik-politikasi', priority: 0.3, changefreq: 'yearly' },
  { path: '/kullanim-sartlari', priority: 0.3, changefreq: 'yearly' },
];
export const SITE_URL = site.url;
