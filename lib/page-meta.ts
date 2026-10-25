import type { Locale } from './messages';

type PageMeta = { title: string; description: string };

// Titles and descriptions per route and language. Turkish is rendered into the
// static HTML; the site shell swaps to English when the visitor picks it.
export const pageMeta: Record<string, Record<Locale, PageMeta>> = {
  '/': {
    tr: {
      title: 'Odivon — Yazılımın tek bir dünyası yok',
      description: 'Odivon; finans, eğitim, işletme yönetimi ve yaşam alanlarında kullanıma açık dijital ürünler geliştirir. Ürünleri keşfet, demoları dene.',
    },
    en: {
      title: 'Odivon — Software has more than one world',
      description: 'Odivon builds digital products for finance, education, business operations and everyday life. Explore the products and try the live demos.',
    },
  },
  '/urunler': {
    tr: {
      title: 'Ürünler — Odivon',
      description: 'OdivonERP, OdivonGYM, OdivonFaturaPro, OdivonVET ve daha fazlası. Odivon ürün ailesini keşfet ve çalışan uygulamaları doğrudan dene.',
    },
    en: {
      title: 'Products — Odivon',
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
