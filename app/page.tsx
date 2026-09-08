'use client';

import { ArrowUpRight, ArrowDown, ArrowRight, Focus, Layers3, MoveUpRight } from 'lucide-react';
import { usePreferences } from '@/components/site-shell';
import { messages } from '@/lib/messages';
import { ui } from '@/lib/ui-messages';
export default function Home() {
 const {locale}=usePreferences();const t=messages[locale],u=ui[locale];
 return <main id="main">
 <section className="hero wrap"><div className="hero-art" aria-hidden="true"><img src="/odivon-violet-loop.png" alt=""/><span className="art-coordinate">O / ∞</span><span className="art-caption">{t.orbit}<br/><b>{t.infinite}</b></span></div><div className="hero-copy"><div className="eyebrow"><span className="status-dot"/>{t.eyebrow}</div><h1>{t.hero[0]}<br/>{t.hero[1]}<br/><em>{t.hero[2]}</em><span className="headline-star" aria-hidden="true">✳</span></h1><p>{t.intro}</p><div className="hero-actions"><a className="button" href="/urunler">{t.explore}<ArrowUpRight size={20}/></a><a className="text-link" href="#odivon">{t.meet}<ArrowRight size={18}/></a></div></div><a className="scroll-link" href="#odivon"><ArrowDown size={16}/>{t.scroll}</a></section>
 <div className="ticker" aria-hidden="true">{t.strip.map(s=><span key={s}>{s}<i>✳</i></span>)}</div>
 <section id="odivon" className="about wrap"><div className="section-label">{t.aboutLabel}</div><div className="about-content"><h2>{t.aboutTitle[0]}<br/><span>{t.aboutTitle[1]}</span></h2><div className="about-bottom"><span className="about-symbol" aria-hidden="true">↗</span><div><p>{t.aboutText}</p><strong>{t.aboutNote}</strong></div></div></div></section>
 <section className="catalogue-callout wrap"><div><span className="section-label">{t.productLabel}</span><h2>{u.catalogueLink}</h2></div><a className="button" href="/urunler">{u.allProducts}<ArrowUpRight size={20}/></a></section>
 <section id="yaklasim" className="approach wrap"><div className="section-label">{t.approachLabel}</div><h2>{t.approachTitle[0]}<br/><span>{t.approachTitle[1]}</span></h2><div className="principles">{t.principles.map(([title,text],i)=><article key={i}><div className="principle-top">{[<Focus key="focus"/>,<Layers3 key="layers"/>,<MoveUpRight key="move"/>][i]}<span>0{i+1}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div></section>
 <section className="closing"><div className="wrap"><div className="eyebrow">{t.closing}</div><div className="closing-main"><h2>{t.closingTitle[0]}<br/><span>{t.closingTitle[1]}</span></h2><a href="/urunler" className="circle-link" aria-label={t.explore}><ArrowUpRight strokeWidth={1} aria-hidden="true"/></a></div></div></section>
 </main>;
}

