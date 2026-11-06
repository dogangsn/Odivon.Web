import type { Metadata } from 'next';
import { pageMeta } from './page-meta';

// Per-route title, description, canonical URL and social preview text.
export function routeMetadata(path: string): Metadata {
  const { title, description } = pageMeta[path].tr;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { url: path, title, description, images: ['/og-image.jpg'] },
    twitter: { title, description, images: ['/og-image.jpg'] },
  };
}
