'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import { usePathname } from 'next/navigation';
import { Globe2, Sun, Moon, ChevronDown, ArrowUpRight } from 'lucide-react';
import { messages, type Locale } from '@/lib/messages';
import { ui } from '@/lib/ui-messages';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu';

type Theme = 'light' | 'dark';
const Preferences = createContext({locale:'tr' as Locale, theme:'dark' as Theme});
export const usePreferences = () => useContext(Preferences);
export function SiteShell({children}:{children:ReactNode}) {
 const [locale,setLocale]=useState<Locale>('tr');
 const [theme,setTheme]=useState<Theme>('dark');
 const pathname=usePathname();
 const t=messages[locale], u=ui[locale];
 useEffect(()=>{try {const l=localStorage.getItem('odivon-language');if(l==='tr'||l==='en')setLocale(l);}catch{} setTheme(document.documentElement.dataset.theme==='light'?'light':'dark');},[]);
 useEffect(()=>{document.documentElement.lang=locale;document.title=pathname==='/urunler'?`${t.products} — Odivon`:t.title;document.querySelector('meta[name="description"]')?.setAttribute('content',pathname==='/urunler'?u.catalogueText:t.description);},[locale,pathname,t,u]);
 function chooseLocale(v:unknown){if(v!=='tr'&&v!=='en')return;setLocale(v);try{localStorage.setItem('odivon-language',v);}catch{}}
 function chooseTheme(v:unknown){if(v!=='light'&&v!=='dark')return;setTheme(v);document.documentElement.dataset.theme=v;try{localStorage.setItem('odivon-theme',v);}catch{}}
 const brand=<a href="/" className="brand" aria-label={t.home}><span className="brand-symbol" aria-hidden="true"/>odivon<span className="brand-dot" aria-hidden="true">.</span></a>;
 return <Preferences.Provider value={{locale,theme}}>
 <a className="skip-link" href="#main">{t.skip}</a>
 <header className="header wrap">{brand}<nav aria-label={t.nav}><a href="/" aria-current={pathname==='/'?'page':undefined}>{u.home}</a><a href="/urunler" aria-current={pathname==='/urunler'?'page':undefined}>{t.products}</a><a href="/#odivon">{t.about}</a></nav><div className="preference-controls">
 <DropdownMenu><DropdownMenuTrigger className="theme-trigger preference-trigger" aria-label={`${u.theme}: ${u[theme]}`}><span className="theme-icon" key={theme}>{theme==='dark'?<Moon size={18}/>:<Sun size={18}/>}</span></DropdownMenuTrigger><DropdownMenuContent className="preference-menu" align="end" sideOffset={12}><div className="menu-heading">{u.theme}</div><DropdownMenuRadioGroup value={theme} onValueChange={chooseTheme}><DropdownMenuRadioItem className="preference-option" value="light"><Sun size={18}/>{u.light}</DropdownMenuRadioItem><DropdownMenuRadioItem className="preference-option" value="dark"><Moon size={18}/>{u.dark}</DropdownMenuRadioItem></DropdownMenuRadioGroup></DropdownMenuContent></DropdownMenu>
 <DropdownMenu><DropdownMenuTrigger className="language-trigger preference-trigger" aria-label={`${u.language}: ${locale==='tr'?'Türkçe':'English'}`}><Globe2 className="globe-icon" size={17}/><span key={locale} className="language-name">{locale==='tr'?'Türkçe':'English'}</span><ChevronDown className="menu-chevron" size={14}/></DropdownMenuTrigger><DropdownMenuContent className="preference-menu language-menu" align="end" sideOffset={12}><div className="menu-heading">{u.language}<span>{u.choose}</span></div><DropdownMenuRadioGroup value={locale} onValueChange={chooseLocale}><DropdownMenuRadioItem value="tr" className="preference-option" lang="tr"><span className="locale-code">TR</span><span>Türkçe<small>Turkish</small></span></DropdownMenuRadioItem><DropdownMenuRadioItem value="en" className="preference-option" lang="en"><span className="locale-code">EN</span><span>English<small>İngilizce</small></span></DropdownMenuRadioItem></DropdownMenuRadioGroup></DropdownMenuContent></DropdownMenu>
 </div></header>
 <div className="page-transition" key={`${pathname}-${locale}`}>{children}</div>
 <footer className="wrap"><div className="footer-top">{brand}<p>{t.footer}</p><a href="#main">{t.top}<ArrowUpRight size={17}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Odivon</span><span>{u.productFooter}</span></div></footer>
 </Preferences.Provider>;
}

