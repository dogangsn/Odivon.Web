import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import './portfolio.css';
import './home-impact.css';
import './motion.css';
import { SiteShell } from '@/components/site-shell';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

import { SITE_URL } from '@/lib/site';

const title = 'Odivon — İşletmeler için bulut yazılım ürünleri';
const description =
  'Odivon; kuaför, spor salonu, veteriner, rent a car, sürücü kursu, otopark, e-fatura ve ERP gibi alanlarda işletmelerin kullanıma hazır bulut yazılımlarını geliştirir.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  applicationName: 'Odivon',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'Odivon',
    locale: 'tr_TR',
    url: '/',
    title,
    description,
    images: [{ url: '/odivon-violet-loop.png', width: 1254, height: 1254, alt: 'Odivon' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/odivon-violet-loop.png'] },
};

const organizationLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Odivon',
      url: SITE_URL,
      logo: `${SITE_URL}/odivon-violet-loop.png`,
      email: 'info@odivon.com',
      contactPoint: [{ '@type': 'ContactPoint', email: 'info@odivon.com', contactType: 'customer support', availableLanguage: ['Turkish', 'English'] }],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'Odivon',
      url: SITE_URL,
      inLanguage: ['tr-TR', 'en'],
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ],
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd).replace(/</g, '\\u003c') }} />
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t;try{t=localStorage.getItem('odivon-theme')}catch(e){}if(t!=='light'&&t!=='dark')t='dark';document.documentElement.dataset.theme=t})()` }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
