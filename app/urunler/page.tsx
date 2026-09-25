'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, Clock3, Receipt, Dumbbell, CalendarDays, Workflow, Sprout, Waves, GraduationCap, Braces, Heart, PawPrint, PanelsTopLeft, X } from 'lucide-react';
import { usePreferences } from '@/components/site-shell';
import { products, type Product } from '@/lib/products';
import { ui } from '@/lib/ui-messages';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog';

const icons = { invoice: Receipt, gym: Dumbbell, apm: CalendarDays, integration: Workflow, farm: Sprout, spa: Waves, school: GraduationCap, api: Braces, together: Heart, vet: PawPrint, erp: PanelsTopLeft };
type Filter = 'all' | 'available' | 'upcoming';

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { locale } = usePreferences();
  const u = ui[locale];
  const Icon = icons[product.symbol];
  const available = product.status === 'available';
  const statusText = available ? u.live : product.status === 'pilot' ? (locale === 'tr' ? 'PİLOT' : 'PILOT') : u.preview;
  return <article id={product.id} className="product-showcase" data-product={product.symbol}>
    <div className="showcase-top">
      <span className="showcase-index">{String(index + 1).padStart(2, '0')} / ODIVON</span>
      <span className={available ? 'showcase-status is-live' : 'showcase-status is-building'}><span />{statusText}</span>
    </div>
    <div className="showcase-visual" aria-hidden="true">
      <span className="visual-ring visual-ring-one" /><span className="visual-ring visual-ring-two" />
      <Icon size={58} strokeWidth={1.15} />
      <span className="visual-code">{product.symbol.toUpperCase()}</span>
    </div>
    <div className="showcase-copy">
      <span className="showcase-category">{product.category[locale]}</span>
      <h2>{product.name}</h2>
      <strong>{product.audience[locale]}</strong>
      <p>{product.description[locale]}</p>
      <div className="showcase-features">{product.features[locale].slice(0, 2).map(feature => <span key={feature}>{feature}</span>)}</div>
      <div className="showcase-actions">
        <Dialog>
          <DialogTrigger className="showcase-detail">{u.details}<ArrowRight size={17} /></DialogTrigger>
          <DialogContent className="product-dialog" showCloseButton={false}>
            <DialogClose className="dialog-close" aria-label={u.close}><X size={20} /></DialogClose>
            <div className="dialog-mark"><Icon size={32} strokeWidth={1.4} /></div>
            <span className="showcase-category">{product.category[locale]} <span className="dialog-separator">/</span> {statusText}</span>
            <DialogTitle className="product-dialog-title">{product.name}</DialogTitle>
            <p className="dialog-audience">{product.audience[locale]}</p>
            <p className="dialog-description">{product.description[locale]}</p>
            <div className="dialog-outcome"><span>{locale === 'tr' ? 'NE KAZANDIRIR?' : 'WHY IT MATTERS'}</span><p>{product.outcome[locale]}</p></div>
            <div className="dialog-feature-title">{locale === 'tr' ? 'Öne çıkanlar' : 'Highlights'}</div>
            <ul className="dialog-features">{product.features[locale].map(feature => <li key={feature}><Check size={17} />{feature}</li>)}</ul>
            {product.demoUrl ? <a className="button dialog-cta" href={product.demoUrl} target="_blank" rel="noopener noreferrer">{u.demo}<ArrowUpRight size={18} /></a> : <p className="dialog-pending"><Clock3 size={17} />{product.status === 'pilot' ? (locale === 'tr' ? 'Pilot portal için herkese açık demo henüz yok.' : 'A public demo is not yet available for this pilot portal.') : (locale === 'tr' ? 'Bu ürün geliştirme aşamasında. Demo henüz açık değil.' : 'This product is in development. A demo is not available yet.')}</p>}
          </DialogContent>
        </Dialog>
        {product.demoUrl && <a className="showcase-demo" href={product.demoUrl} target="_blank" rel="noopener noreferrer">{u.demo}<ArrowUpRight size={17} /></a>}
      </div>
    </div>
  </article>;
}

export default function ProductsPage() {
  const { locale } = usePreferences();
  const u = ui[locale];
  const [filter, setFilter] = useState<Filter>('all');
  const liveCount = products.filter(product => product.status === 'available').length;
  const visible = products.filter(product => filter === 'all' || (filter === 'upcoming' ? product.status !== 'available' : product.status === 'available'));
  const labels = locale === 'tr'
    ? { all: 'Tümü', available: 'Kullanıma açık', upcoming: 'Yapım / pilot', eyebrow: 'ÇÖZÜM PORTFÖYÜ', intro: 'İşini bilen ürünler. Gerçek ihtiyaçlar için.', lead: 'Her ürün farklı bir probleme odaklanır. Sana uygun olanı keşfet, ayrıntılarını incele ve çalışan uygulamayı doğrudan deneyimle.', live: 'ürün erişime açık', note: 'Her ürün kendi alanında çalışır. Geliştirme aşamasındakileri açıkça belirtiyoruz.', section: 'Alanına uygun çözümü bul.', sectionText: 'Operasyon, eğitim, finans ve günlük yaşam: Odivon ürün ailesini keşfet.', ctaTitle: 'Sadece anlatmıyoruz. Deneyimlemene açıyoruz.', ctaText: 'Kullanıma açık ürünlerin bağlantılarından uygulamaya doğrudan geçebilirsin.' }
    : { all: 'All', available: 'Available', upcoming: 'Building / pilot', eyebrow: 'SOLUTION PORTFOLIO', intro: 'Purpose-built products. Real-world needs.', lead: 'Each product focuses on a different problem. Find the one that fits, explore the details and try the live application.', live: 'products available', note: 'Every product runs in its own space. Products in development are clearly marked.', section: 'Find the right fit.', sectionText: 'Operations, education, finance and everyday life: explore the Odivon product family.', ctaTitle: 'More than a promise. An experience.', ctaText: 'Open any available product directly from its link.' };
  return <main id="main" className="portfolio-page">
    <section className="portfolio-hero wrap">
      <div className="portfolio-breadcrumb"><Link href="/">{u.home}</Link><ArrowRight size={14}/><span>{u.catalogue}</span></div>
      <div className="portfolio-hero-grid">
        <div><span className="portfolio-kicker"><span className="status-dot"/>{labels.eyebrow}</span><h1>{labels.intro}</h1></div>
        <div className="portfolio-hero-aside"><p>{labels.lead}</p><div className="portfolio-count"><strong>{String(liveCount).padStart(2,'0')}</strong><span>{labels.live}<br/><small>{labels.note}</small></span></div></div>
      </div>
      <div className="portfolio-hero-lines" aria-hidden="true"><span/><span/><span/></div>
    </section>
    <section id="catalogue-list" className="portfolio-content wrap" aria-label={u.catalogue}>
      <div className="portfolio-heading"><div><span className="section-label">01 / {u.catalogue.toLocaleUpperCase(locale)}</span><h2>{labels.section}</h2><p>{labels.sectionText}</p></div><fieldset className="portfolio-filters" aria-label={locale === 'tr' ? 'Ürün durumuna göre filtrele' : 'Filter products by status'}>{(['all','available','upcoming'] as const).map(key => <button key={key} type="button" className={filter === key ? 'active' : ''} aria-pressed={filter === key} onClick={() => setFilter(key)}>{labels[key]}<span>{key === 'all' ? products.length : key === 'available' ? liveCount : products.length - liveCount}</span></button>)}</fieldset></div>
      <div className="portfolio-grid">{visible.map(product => <ProductCard key={product.id} product={product} index={products.indexOf(product)} />)}</div>
    </section>
    <section className="portfolio-end"><div className="wrap portfolio-end-inner"><span className="section-label">ODIVON / {locale === 'tr' ? 'GERÇEK ÜRÜNLER' : 'REAL PRODUCTS'}</span><h2>{labels.ctaTitle}</h2><p>{labels.ctaText}</p><a href="#catalogue-list">{locale === 'tr' ? 'Ürünlere dön' : 'Back to products'}<ArrowUpRight size={18}/></a></div></section>
  </main>;
}
