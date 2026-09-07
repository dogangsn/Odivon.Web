import type { Locale } from './messages';
export type Product = {
 id: string;
 name: string;
 category: Record<Locale,string>;
 description: Record<Locale,string>;
 details: Record<Locale,string>;
 status: 'coming-soon' | 'available';
 demoUrl?: string;
};
// Add verified product content and its demo subdomain here.
export const products: Product[] = [];
