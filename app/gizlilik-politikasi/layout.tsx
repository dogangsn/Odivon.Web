import type { Metadata } from 'next';
import { routeMetadata } from '@/lib/route-metadata';

export const metadata: Metadata = routeMetadata('/gizlilik-politikasi');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
