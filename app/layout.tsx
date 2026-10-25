import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import './portfolio.css';
import './home-impact.css';
import './motion.css';
import './compliance.css';
import { SiteShell } from '@/components/site-shell';
import { pageMeta } from '@/lib/page-meta';
import { site } from '@/lib/site';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const home = pageMeta['/'].tr;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: home.title, template: '%s' },
  description: home.description,
  applicationName: site.name,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'tr_TR',
    alternateLocale: ['en_US'],
    url: '/',
    title: home.title,
    description: home.description,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Odivon' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: home.title,
    description: home.description,
    images: ['/og-image.jpg'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b1020',
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  logo: `${site.url}/favicon.svg`,
  email: site.email,
  contactPoint: [{ '@type': 'ContactPoint', email: site.email, contactType: 'customer support', availableLanguage: ['tr', 'en'] }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-8783404967233490" />
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t;try{t=localStorage.getItem('odivon-theme')}catch(e){}if(t!=='light'&&t!=='dark')t='dark';document.documentElement.dataset.theme=t})()` }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
