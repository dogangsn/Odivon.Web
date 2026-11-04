import type { Metadata } from 'next';
import { products } from '@/lib/products';
import { SITE_URL } from '@/lib/site';

const title = 'Ürünler — Odivon bulut yazılımları';
const description =
  'Kuaför, güzellik ve SPA salonu, spor salonu, veteriner kliniği, rent a car, sürücü kursu, otopark, e-fatura ve ERP için Odivon yazılımlarını inceleyin ve demolarını deneyin.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/urunler' },
  openGraph: {
    type: 'website',
    siteName: 'Odivon',
    locale: 'tr_TR',
    url: '/urunler',
    title,
    description,
    images: [{ url: '/odivon-violet-loop.png', width: 1254, height: 1254, alt: 'Odivon' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/odivon-violet-loop.png'] },
};

// schema.org list of the products, each a web application with its own address.
const productsLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Odivon ürünleri',
  url: `${SITE_URL}/urunler`,
  itemListElement: products.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'SoftwareApplication',
      name: p.name,
      description: p.description.tr,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      inLanguage: 'tr-TR',
      url: p.demoUrl ?? `${SITE_URL}/urunler#${p.id}`,
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  })),
};

export default function ProductsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productsLd).replace(/</g, '\\u003c') }} />
      {children}
    </>
  );
}
