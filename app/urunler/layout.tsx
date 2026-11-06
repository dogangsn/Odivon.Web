import type { Metadata } from 'next';
import { products } from '@/lib/products';
import { routeMetadata } from '@/lib/route-metadata';
import { site } from '@/lib/site';

export const metadata: Metadata = routeMetadata('/urunler');

// schema.org list of the products, each a web application with its own address.
const productsLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Odivon ürünleri',
  url: `${site.url}/urunler`,
  itemListElement: products.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'SoftwareApplication',
      name: p.name,
      description: p.description.tr,
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: p.category.tr,
      audience: { '@type': 'BusinessAudience', name: p.audience.tr },
      featureList: p.features.tr.join(', '),
      operatingSystem: 'Web',
      inLanguage: 'tr-TR',
      url: p.demoUrl ?? `${site.url}/urunler#${p.id}`,
      publisher: { '@id': `${site.url}/#organization` },
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
