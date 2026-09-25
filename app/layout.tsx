import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import './portfolio.css';
import './home-impact.css';
import { SiteShell } from '@/components/site-shell';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Odivon — Yazılımın tek bir dünyası yok',
  description: 'Odivon; finans, eğitim, işletme yönetimi ve yaşam alanlarında kullanıma açık dijital ürünler geliştirir.',
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: `(function(){var t;try{t=localStorage.getItem('odivon-theme')}catch(e){}if(t!=='light'&&t!=='dark')t='dark';document.documentElement.dataset.theme=t})()` }}/></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
