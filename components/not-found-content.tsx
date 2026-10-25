'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { usePreferences } from '@/components/site-shell';
import { site } from '@/lib/site';

const copy = {
  tr: { label: 'HATA 404', title: 'Bu sayfa başka bir dünyada.', text: 'Aradığın sayfa taşınmış, adı değişmiş ya da hiç var olmamış olabilir. Ana sayfadan veya ürünlerden devam edebilirsin.', home: 'Ana sayfaya dön', products: 'Ürünleri keşfet', report: 'Kırık bir bağlantı mı buldun? Bize yaz' },
  en: { label: 'ERROR 404', title: 'This page lives in another world.', text: 'The page you are looking for may have moved, been renamed or never existed. Continue from the home page or the products.', home: 'Back to home', products: 'Explore products', report: 'Found a broken link? Tell us' },
} as const;

export function NotFoundContent() {
  const { locale } = usePreferences();
  const t = copy[locale];
  return <main id="main" className="not-found wrap">
    <span className="not-found-code" aria-hidden="true">404</span>
    <span className="section-label">{t.label}</span>
    <h1>{t.title}</h1>
    <p>{t.text}</p>
    <div className="hero-actions">
      <Link className="button" href="/">{t.home}<ArrowRight size={18} /></Link>
      <Link className="text-link" href="/urunler">{t.products}<ArrowUpRight size={18} /></Link>
    </div>
    <a className="not-found-report" href={`mailto:${site.email}?subject=${encodeURIComponent('Kırık bağlantı / Broken link')}`}>{t.report}</a>
  </main>;
}
