import type { Locale } from './messages';

type PageMeta = { title: string; description: string };

// Titles and descriptions per route and language. Turkish is rendered into the
// static HTML; the site shell swaps to English when the visitor picks it.
export const pageMeta: Record<string, Record<Locale, PageMeta>> = {
  '/': {
    tr: {
      title: 'Odivon — İşletmeler için bulut yazılım ürünleri',
      description: 'Odivon; kuaför, spor salonu, veteriner, rent a car, sürücü kursu, otopark, e-fatura ve ERP gibi alanlarda işletmelerin kullanıma hazır bulut yazılımlarını geliştirir.',
    },
    en: {
      title: 'Odivon — Cloud software products for businesses',
      description: 'Odivon builds ready-to-use cloud software for hair salons, gyms, veterinary clinics, car rental, driving schools, parking, invoicing and ERP.',
    },
  },
  '/urunler': {
    tr: {
      title: 'Ürünler — Odivon bulut yazılımları',
      description: 'Kuaför, güzellik ve SPA salonu, spor salonu, veteriner kliniği, rent a car, sürücü kursu, otopark, e-fatura ve ERP için Odivon yazılımlarını inceleyin ve demolarını deneyin.',
    },
    en: {
      title: 'Products — Odivon cloud software',
      description: 'OdivonERP, OdivonGYM, OdivonFaturaPro, OdivonVET and more. Explore the Odivon product family and try the live applications.',
    },
  },
  '/gizlilik-politikasi': {
    tr: {
      title: 'Gizlilik Politikası ve KVKK Aydınlatma Metni — Odivon',
      description: 'Odivon web sitesinde hangi kişisel verilerin, hangi amaçla işlendiğini, çerezleri ve KVKK kapsamındaki haklarınızı öğrenin.',
    },
    en: {
      title: 'Privacy Policy — Odivon',
      description: 'Learn which personal data the Odivon website processes, why, how cookies are used and what your rights are.',
    },
  },
  '/kullanim-sartlari': {
    tr: {
      title: 'Kullanım Şartları — Odivon',
      description: 'Odivon web sitesini ve ürün demolarını kullanırken geçerli olan koşullar.',
    },
    en: {
      title: 'Terms of Use — Odivon',
      description: 'The terms that apply when you use the Odivon website and product demos.',
    },
  },
};

export const notFoundMeta: Record<Locale, PageMeta> = {
  tr: { title: 'Sayfa bulunamadı — Odivon', description: 'Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.' },
  en: { title: 'Page not found — Odivon', description: 'The page you are looking for may have moved or never existed.' },
};

// Title and description for any route, including product pages.
export function metaFor(path: string, locale: Locale, catalogue: { id: string; name: string; description: Record<Locale, string>; category: Record<Locale, string> }[], keywords: Record<string, Record<Locale, string>>): PageMeta {
  if (pageMeta[path]) return pageMeta[path][locale];
  const product = path.startsWith('/urunler/') ? catalogue.find(p => p.id === path.slice('/urunler/'.length)) : undefined;
  if (!product) return notFoundMeta[locale];
  return { title: `${product.name}: ${keywords[product.id]?.[locale] ?? product.category[locale]} | Odivon`, description: product.description[locale] };
}
