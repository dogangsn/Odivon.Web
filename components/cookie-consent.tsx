'use client';

import Link from 'next/link';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { consentMessages } from '@/lib/consent-messages';
import type { Locale } from '@/lib/messages';
import { site } from '@/lib/site';

const STORAGE_KEY = 'odivon-consent';
const CONSENT_VERSION = 1;
export const OPEN_COOKIE_SETTINGS = 'odivon:cookie-settings';

type Consent = { v: number; analytics: boolean; at: string };

declare global {
  interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }
}

const CONSENT_CHANGED = 'odivon:consent-changed';
const SERVER = 'ssr';

function readRaw(): string | null {
  try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
}

function parseConsent(raw: string | null): Consent | null {
  try {
    const value = JSON.parse(raw ?? 'null') as Consent | null;
    return value && value.v === CONSENT_VERSION ? value : null;
  } catch {
    return null;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener(CONSENT_CHANGED, onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(CONSENT_CHANGED, onChange);
  };
}

function saveConsent(analytics: boolean): Consent {
  const consent = { v: CONSENT_VERSION, analytics, at: new Date().toISOString() };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(consent)); } catch {}
  window.dispatchEvent(new Event(CONSENT_CHANGED));
  return consent;
}

// Google Analytics 4 with Consent Mode v2. Nothing loads until the visitor
// accepts analytics, and nothing loads at all while no measurement ID is set.
function applyAnalytics(granted: boolean) {
  const id = site.gaMeasurementId;
  if (!id) return;
  if (!window.gtag) {
    if (!granted) return;
    window.dataLayer = window.dataLayer ?? [];
    // gtag.js expects the arguments object itself, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.gtag = function gtag() { window.dataLayer!.push(arguments); };
    window.gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' });
    window.gtag('js', new Date());
    window.gtag('config', id, { anonymize_ip: true });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(script);
  }
  window.gtag('consent', 'update', { analytics_storage: granted ? 'granted' : 'denied' });
  if (!granted) {
    // Remove cookies GA already set so a withdrawal takes effect at once.
    document.cookie.split(';').map(c => c.split('=')[0].trim()).filter(name => name.startsWith('_ga')).forEach(name => {
      const host = location.hostname.replace(/^www\./, '');
      document.cookie = `${name}=; Max-Age=0; path=/`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${host}`;
    });
  }
}

export function CookieConsent({ locale }: { locale: Locale }) {
  const t = consentMessages[locale];
  const raw = useSyncExternalStore(subscribe, readRaw, () => SERVER);
  const stored = raw === SERVER ? null : parseConsent(raw);
  const [reopened, setReopened] = useState(false);
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const open = raw !== SERVER && (stored === null || reopened);
  const storedAnalytics = stored?.analytics;

  useEffect(() => {
    if (storedAnalytics !== undefined) applyAnalytics(storedAnalytics);
  }, [storedAnalytics]);

  useEffect(() => {
    const reopen = () => { setAnalytics(parseConsent(readRaw())?.analytics ?? false); setDetails(true); setReopened(true); };
    window.addEventListener(OPEN_COOKIE_SETTINGS, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, reopen);
  }, []);

  function decide(value: boolean) {
    saveConsent(value);
    setAnalytics(value);
    setReopened(false);
    setDetails(false);
  }

  if (!open) return null;
  return <aside className="cookie-banner" aria-labelledby="cookie-title" aria-describedby="cookie-text">
    <div className="cookie-copy">
      <h2 id="cookie-title">{t.title}</h2>
      <p id="cookie-text">{t.text} <Link href="/gizlilik-politikasi#cerezler">{t.policy}</Link></p>
    </div>
    {details && <div className="cookie-options">
      <label className="cookie-option"><input type="checkbox" checked disabled /><span><b>{t.necessary} <small>{t.alwaysOn}</small></b>{t.necessaryText}</span></label>
      <label className="cookie-option"><input type="checkbox" checked={analytics} onChange={event => setAnalytics(event.target.checked)} /><span><b>{t.analytics}</b>{t.analyticsText}</span></label>
    </div>}
    <div className="cookie-actions">
      {details
        ? <button type="button" className="cookie-button" onClick={() => decide(analytics)}>{t.save}</button>
        : <button type="button" className="cookie-button cookie-button-ghost" onClick={() => setDetails(true)}>{t.settings}</button>}
      <button type="button" className="cookie-button" onClick={() => decide(false)}>{t.reject}</button>
      <button type="button" className="cookie-button" onClick={() => decide(true)}>{t.accept}</button>
    </div>
  </aside>;
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS));
}
