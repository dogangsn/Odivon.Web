import type { Metadata } from 'next';
import { NotFoundContent } from '@/components/not-found-content';
import { notFoundMeta } from '@/lib/page-meta';

export const metadata: Metadata = {
  title: notFoundMeta.tr.title,
  description: notFoundMeta.tr.description,
  robots: { index: false, follow: true },
  alternates: { canonical: null },
  openGraph: { url: null, title: notFoundMeta.tr.title, description: notFoundMeta.tr.description },
};

export default function NotFound() {
  return <NotFoundContent />;
}
