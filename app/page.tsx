'use client';
import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDown, ArrowRight, Globe2, Focus, Layers3, MoveUpRight } from 'lucide-react';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { messages, type Locale } from '@/lib/messages';
import { products } from '@/lib/products';

export default function Home() {
 const [locale,setLocale] = useState<Locale>('tr');
 const t = messages[locale];
 useEffect(()=>{try { const saved=localStorage.getItem('odivon-language'); if(saved==='tr'||saved==='en') setLocale(saved); } catch {}},[]);
 useEffect(()=>{document.documentElement.lang=locale; document.title=t.title; document.querySelector('meta[name="description"]')?.setAttribute('content',t.description);},[locale,t]);
 function changeLanguage(value:string){if(value!=='tr'&&value!=='en')return;setLocale(value);try{localStorage.setItem('odivon-language',value);}catch{}}
 const brand=<a href="#" className="brand" aria-label={t.home}><span className="brand-symbol" aria-hidden="true"/>odivon<span className="brand-dot">®</span></a>;
 return <>
 <a className="skip-link" href="#main">{t.skip}</a>
 <header className="header wrap">{brand}<nav aria-label={t.nav}><a href="#urunler">{t.products}</a><a href="#odivon">{t.about}</a><a href="#yaklasim">{t.approach}</a></nav><div className="language"><Globe2 size={16} aria-hidden="true"/><NativeSelect aria-label={t.lang} value={locale} onChange={e=>changeLanguage(e.target.value)}><NativeSelectOption value="tr" lang="tr">Türkçe</NativeSelectOption><NativeSelectOption value="en" lang="en">English</NativeSelectOption></NativeSelect></div></header>
 <main id="main">
 <section className="hero wrap"><div className="hero-art" aria-hidden="true"><img src="/odivon-violet-loop.png" alt=""/><span className="art-coordinate">O / ∞</span><span className="art-caption">{t.orbit}<br/><b>{t.infinite}</b></span></div><div className="hero-copy"><div className="eyebrow"><span className="status-dot"/>{t.eyebrow}</div><h1>{t.hero[0]}<br/>{t.hero[1]}<br/><em>{t.hero[2]}</em><span className="headline-star" aria-hidden="true">✳</span></h1><p>{t.intro}</p><div className="hero-actions"><a className="button" href="#urunler">{t.explore}<ArrowUpRight size={20}/></a><a className="text-link" href="#odivon">{t.meet}<ArrowRight size={18}/></a></div></div><a className="scroll-link" href="#odivon"><ArrowDown size={16}/>{t.scroll}</a></section>
 <div className="ticker" aria-hidden="true">{t.strip.map(s=><span key={s}>{s}<i>✳</i></span>)}</div>
 <section id="odivon" className="about wrap"><div className="section-label">{t.aboutLabel}</div><div className="about-content"><h2>{t.aboutTitle[0]}<br/><span>{t.aboutTitle[1]}</span></h2><div className="about-bottom"><span className="about-symbol" aria-hidden="true">↗</span><div><p>{t.aboutText}</p><strong>{t.aboutNote}</strong></div></div></div></section>
 <section id="urunler" className="products-section wrap"><div className="section-label">{t.productLabel}</div><div className="section-heading"><h2>{t.productTitle[0]}<br/><span>{t.productTitle[1]}</span></h2><p>{t.productText}</p></div>{products.length ? <div className="product-grid">{products.map(p=><a className="product-card" key={p.name} href={p.url}><span>{p.category[locale]}</span><h3>{p.name}</h3><p>{p.description[locale]}</p><span className="text-link">{t.visit}<ArrowUpRight size={20}/></span></a>)}</div>:<div className="coming-soon"><div className="coming-copy"><span className="pill"><span className="status-dot"/>{t.soon}</span><h3>{t.soonTitle}</h3><p>{t.soonText}</p></div><div className="coming-visual" aria-hidden="true"><span className="huge-zero">0<span>1</span></span><span className="visual-bottom">ODIVON / NEXT<ArrowUpRight/></span></div></div>}</section>
 <section id="yaklasim" className="approach wrap"><div className="section-label">{t.approachLabel}</div><h2>{t.approachTitle[0]}<br/><span>{t.approachTitle[1]}</span></h2><div className="principles">{t.principles.map(([title,text],i)=><article key={i}><div className="principle-top">{[<Focus key="focus"/>,<Layers3 key="layers"/>,<MoveUpRight key="move"/>][i]}<span>0{i+1}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div></section>
 <section className="closing"><div className="wrap"><div className="eyebrow">{t.closing}</div><div className="closing-main"><h2>{t.closingTitle[0]}<br/><span>{t.closingTitle[1]}</span></h2><a href="#urunler" className="circle-link" aria-label={t.explore}><ArrowUpRight strokeWidth={1} aria-hidden="true"/></a></div></div></section>
 </main><footer className="wrap"><div className="footer-top">{brand}<p>{t.footer}</p><a href="#">{t.top}<ArrowUpRight size={17}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Odivon</span><span>IDEAS INTO POSSIBILITIES.</span></div></footer>
 </>;
}
