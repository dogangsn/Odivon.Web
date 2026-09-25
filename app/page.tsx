'use client';

import Link from 'next/link';
import { ArrowUpRight, ArrowDown, ArrowRight, Focus, Layers3, MoveUpRight, Mail } from 'lucide-react';
import { usePreferences } from '@/components/site-shell';
import { messages } from '@/lib/messages';
import { ui } from '@/lib/ui-messages';
import { products } from '@/lib/products';

const featuredIds = ['odivon-fatura-pro', 'odivon-farm', 'odivon-school'];
const orbitIds = ['odivon-gym', 'odivon-farm', 'odivon-ikimiz'];

export default function Home() {
  const { locale } = usePreferences();
  const t = messages[locale];
  const u = ui[locale];
  const selected = featuredIds.map(id => products.find(product => product.id === id)!);
  const orbitProducts = orbitIds.map(id => products.find(product => product.id === id)!);
  const liveCount = products.filter(product => product.status === 'available').length;

  return <main id="main">
    <section className="hero wrap">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-copy">
        <div className="eyebrow"><span className="status-dot" />{t.eyebrow}</div>
        <h1>{t.hero[0]}<br />{t.hero[1]}<br /><em>{t.hero[2]}</em></h1>
        <p>{t.intro}</p>
        <div className="hero-actions">
          <Link className="button" href="/urunler">{t.explore}<ArrowUpRight size={20} /></Link>
          <a className="text-link" href="#odivon">{t.meet}<ArrowRight size={18} /></a>
        </div>
        <div className="hero-proof"><strong>{String(liveCount).padStart(2, '0')}</strong><span>{t.liveProof}<small>{t.proofNote}</small></span></div>
      </div>
      <div className="hero-art">
        <div className="hero-art-frame" aria-hidden="true"><img src="/odivon-violet-loop.png" alt="" /></div>
        <span className="hero-art-label" aria-hidden="true">ODIVON / PRODUCT UNIVERSE</span>
        {orbitProducts.map((product, index) => <Link key={product.id} href={`/urunler#${product.id}`} className={`orbit-product orbit-product-${index + 1}`}>
          <span className="orbit-product-dot" /><span><b>{product.name}</b><small>{product.category[locale]}</small></span><ArrowUpRight size={15} />
        </Link>)}
      </div>
      <a className="scroll-link" href="#odivon"><ArrowDown size={16} />{t.scroll}</a>
    </section>
    <div className="ticker" aria-label={t.tickerLabel}>{t.strip.map(s => <span key={s}>{s}<i>✳</i></span>)}</div>
    <section id="odivon" className="about wrap">
      <div className="section-label">{t.aboutLabel}</div>
      <div className="about-content">
        <h2>{t.aboutTitle[0]}<br /><span>{t.aboutTitle[1]}</span></h2>
        <div className="about-bottom"><span className="about-symbol" aria-hidden="true">↗</span><div><p>{t.aboutText}</p><strong>{t.aboutNote}</strong></div></div>
      </div>
    </section>
    <section className="home-products wrap">
      <div className="home-products-heading"><div><span className="section-label">{t.productLabel}</span><h2>{u.catalogueLink}</h2><p>{t.productIntro}</p></div><Link className="text-link" href="/urunler">{u.allProducts}<ArrowUpRight size={19} /></Link></div>
      <div className="home-product-grid">{selected.map((product, index) => <Link className="home-product" href={`/urunler#${product.id}`} key={product.id} data-product={product.symbol}><span className="home-product-number">0{index + 1} / {product.category[locale]}</span><h3>{product.name}</h3><p>{product.description[locale]}</p><span className="home-product-link">{u.details}<ArrowUpRight size={18} /></span></Link>)}</div>
    </section>
    <section id="yaklasim" className="approach wrap">
      <div className="section-label">{t.approachLabel}</div>
      <h2>{t.approachTitle[0]}<br /><span>{t.approachTitle[1]}</span></h2>
      <div className="principles">{t.principles.map(([title, body], i) => <article key={title}><div className="principle-top">{[<Focus key="focus" />, <Layers3 key="layers" />, <MoveUpRight key="move" />][i]}<span>0{i + 1}</span></div><h3>{title}</h3><p>{body}</p></article>)}</div>
    </section>
    <section id="iletisim" className="contact-section">
      <div className="wrap contact-inner">
        <div className="contact-copy"><div className="contact-eyebrow"><Mail size={17} />{t.contactLabel}</div><h2>{t.contactTitle[0]}<br /><span>{t.contactTitle[1]}</span></h2><p>{t.contactText}</p></div>
        <a className="contact-card" href="mailto:info@odivon.com"><span>{t.contactEmailLabel}</span><strong>info@odivon.com</strong><span className="contact-card-foot">{t.contactAction}<ArrowUpRight size={24} /></span></a>
      </div>
    </section>
  </main>;
}
