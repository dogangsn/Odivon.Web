'use client';

import Link from '@/components/plain-link';
import { ArrowRight, ArrowUpRight, Check, Clock3 } from 'lucide-react';
import { usePreferences } from '@/components/site-shell';
import { productIcons } from '@/lib/product-icons';
import { productKeywords } from '@/lib/product-seo';
import { products } from '@/lib/products';
import { site } from '@/lib/site';
import { ui } from '@/lib/ui-messages';

const copy = {
  tr: { why: 'Ne kazandırır?', highlights: 'Öne çıkanlar', demo: 'Demoyu dene', contact: 'Teklif veya bilgi iste', noDemo: 'Bu ürün geliştirme aşamasında. Haber almak için bize yazabilirsin.', live: 'KULLANIMA AÇIK', building: 'GELİŞTİRİLİYOR', pilot: 'PİLOT', related: 'Diğer Odivon ürünleri', all: 'Tüm ürünler', subject: 'hakkında bilgi talebi' },
  en: { why: 'Why it matters', highlights: 'Highlights', demo: 'Try the demo', contact: 'Request a quote or info', noDemo: 'This product is in development. Write to us to hear when it is ready.', live: 'AVAILABLE', building: 'IN DEVELOPMENT', pilot: 'PILOT', related: 'More Odivon products', all: 'All products', subject: 'information request' },
} as const;

export function ProductDetail({ id }: { id: string }) {
  const { locale } = usePreferences();
  const t = copy[locale];
  const u = ui[locale];
  const product = products.find(p => p.id === id)!;
  const Icon = productIcons[product.symbol];
  const keyword = productKeywords[product.id]?.[locale] ?? product.category[locale];
  const status = product.status === 'available' ? t.live : product.status === 'pilot' ? t.pilot : t.building;
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`${product.name} ${t.subject}`)}`;
  const related = products.filter(p => p.id !== id && p.status === 'available').slice(0, 3);

  return <main id="main" className="product-page wrap" data-product={product.symbol}>
    <nav className="portfolio-breadcrumb" aria-label="Breadcrumb"><Link href="/">{u.home}</Link><ArrowRight size={14} /><Link href="/urunler">{u.catalogue}</Link><ArrowRight size={14} /><span aria-current="page">{product.name}</span></nav>
    <section className="product-page-hero">
      <div>
        <span className="portfolio-kicker"><span className="status-dot" />{product.category[locale].toLocaleUpperCase(locale)} / {status}</span>
        <h1>{product.name}</h1>
        <p className="product-page-keyword">{keyword}</p>
        <p className="product-page-audience">{product.audience[locale]}</p>
        <p className="product-page-lead">{product.description[locale]}</p>
        <div className="hero-actions">
          {product.demoUrl
            ? <a className="button" href={product.demoUrl} target="_blank" rel="noopener noreferrer">{t.demo}<ArrowUpRight size={18} /></a>
            : <p className="dialog-pending"><Clock3 size={17} />{t.noDemo}</p>}
          <a className="text-link" href={mailto}>{t.contact}<ArrowRight size={18} /></a>
        </div>
      </div>
      <div className="product-page-mark" aria-hidden="true"><span className="visual-ring visual-ring-one" /><span className="visual-ring visual-ring-two" /><Icon size={88} strokeWidth={1.1} /></div>
    </section>
    <section className="product-page-body">
      <div className="dialog-outcome"><span>{t.why.toLocaleUpperCase(locale)}</span><p>{product.outcome[locale]}</p></div>
      <div>
        <h2>{t.highlights}</h2>
        <ul className="dialog-features">{product.features[locale].map(feature => <li key={feature}><Check size={17} />{feature}</li>)}</ul>
      </div>
    </section>
    <section className="product-page-related" aria-labelledby="related-title">
      <div className="home-products-heading"><h2 id="related-title">{t.related}</h2><Link className="text-link" href="/urunler">{t.all}<ArrowUpRight size={18} /></Link></div>
      <div className="home-product-grid">{related.map(p => <Link key={p.id} className="home-product" href={`/urunler/${p.id}`} data-product={p.symbol}><span className="home-product-number">{p.category[locale]}</span><h3>{p.name}</h3><p>{p.description[locale]}</p><span className="home-product-link">{u.details}<ArrowUpRight size={18} /></span></Link>)}</div>
    </section>
  </main>;
}
