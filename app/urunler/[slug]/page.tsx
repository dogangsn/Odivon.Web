import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/product-detail';
import { productKeywords } from '@/lib/product-seo';
import { products } from '@/lib/products';
import { site } from '@/lib/site';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map(product => ({ slug: product.id }));
}

const find = (slug: string) => products.find(product => product.id === slug);

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const product = find((await params).slug);
  if (!product) return {};
  const keyword = productKeywords[product.id]?.tr ?? product.category.tr;
  const title = `${product.name}: ${keyword} | Odivon`;
  const description = `${product.description.tr} ${product.audience.tr}.`.slice(0, 300);
  const path = `/urunler/${product.id}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: 'website', url: path, title, description, images: ['/og-image.jpg'] },
    twitter: { title, description, images: ['/og-image.jpg'] },
  };
}

export default async function ProductPage({ params }: Params) {
  const product = find((await params).slug);
  if (!product) notFound();
  const path = `${site.url}/urunler/${product.id}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': `${path}#software`,
        name: product.name,
        url: product.demoUrl ?? path,
        mainEntityOfPage: path,
        description: product.description.tr,
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: product.category.tr,
        audience: { '@type': 'BusinessAudience', name: product.audience.tr },
        featureList: product.features.tr.join(', '),
        operatingSystem: 'Web',
        inLanguage: 'tr-TR',
        publisher: { '@id': `${site.url}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Ana sayfa', item: `${site.url}/` },
          { '@type': 'ListItem', position: 2, name: 'Ürünler', item: `${site.url}/urunler` },
          { '@type': 'ListItem', position: 3, name: product.name, item: path },
        ],
      },
    ],
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    <ProductDetail id={product.id} />
  </>;
}
