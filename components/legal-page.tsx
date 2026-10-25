'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { usePreferences } from '@/components/site-shell';
import type { LegalDoc } from '@/lib/legal-content';
import type { Locale } from '@/lib/messages';
import { ui } from '@/lib/ui-messages';

export function LegalPage({ doc }: { doc: Record<Locale, LegalDoc> }) {
  const { locale } = usePreferences();
  const d = doc[locale];
  return <main id="main" className="legal-page wrap">
    <div className="portfolio-breadcrumb"><Link href="/">{ui[locale].home}</Link><ArrowRight size={14} /><span>{d.title}</span></div>
    <header className="legal-hero">
      <span className="section-label">{d.eyebrow}</span>
      <h1>{d.title}</h1>
      <p>{d.intro}</p>
      <small>{d.updated}</small>
    </header>
    <div className="legal-layout">
      <nav className="legal-toc" aria-label={locale === 'tr' ? 'İçindekiler' : 'Contents'}>
        <ol>{d.sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ol>
      </nav>
      <article className="legal-body">
        {d.sections.map(section => <section key={section.id} id={section.id}>
          <h2>{section.title}</h2>
          {section.blocks.map((block, i) => typeof block === 'string'
            ? <p key={i}>{block}</p>
            : <ul key={i}>{block.map(item => <li key={item}>{item}</li>)}</ul>)}
        </section>)}
      </article>
    </div>
  </main>;
}
