import type { Locale } from './messages';
export type Product = { name: string; category: Record<Locale,string>; description: Record<Locale,string>; url: string };
// Product names stay consistent; descriptions and categories are localized.
export const products: Product[] = [];
