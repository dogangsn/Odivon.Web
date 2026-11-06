import type { Locale } from './messages';

// Search phrases people type when looking for each kind of product. Used in
// the product page title and H1 subtitle. Products without an entry fall back
// to their category.
export const productKeywords: Record<string, Record<Locale, string>> = {
  'odivon-erp': { tr: 'Kurumsal ERP ve ürün portalı', en: 'Enterprise ERP and product portal' },
  'odivon-gym': { tr: 'Spor salonu programı ve üye takip yazılımı', en: 'Gym management and member tracking software' },
  'odivon-fatura-pro': { tr: 'Online fatura ve proforma programı', en: 'Online invoice and pro forma generator' },
  'odivon-vet': { tr: 'Veteriner klinik programı', en: 'Veterinary clinic software' },
  'odivon-farm': { tr: 'Koyun keçi sürü yönetim programı', en: 'Sheep and goat herd management software' },
  'odivon-spa': { tr: 'SPA ve masaj salonu yönetim programı', en: 'Spa and wellness management software' },
  'odivon-pro-beauty': { tr: 'Güzellik merkezi programı ve randevu yazılımı', en: 'Beauty center management and booking software' },
  'odivon-rent-a-car': { tr: 'Rent a car programı ve filo yönetim yazılımı', en: 'Car rental and fleet management software' },
  'odivon-driving-school': { tr: 'Sürücü kursu programı', en: 'Driving school management software' },
  'odivon-park': { tr: 'Otopark yönetim programı', en: 'Parking management software' },
  'odivon-pro-hair': { tr: 'Kuaför programı ve salon yönetim yazılımı', en: 'Hair salon management software' },
  'odivon-apm': { tr: 'Online randevu yönetim programı', en: 'Online appointment management software' },
  'odivon-school': { tr: 'LGS, YKS ve KPSS online test platformu', en: 'Online exam practice platform' },
  'odivon-api': { tr: 'Sağlık, ekonomi ve konum API kataloğu', en: 'Health, economy and location API catalogue' },
  'odivon-samo-int': { tr: 'SAMO entegrasyonu ve B2B rezervasyon', en: 'SAMO integration and B2B booking' },
  'odivon-fgas': { tr: 'F-Gaz uyumluluk ve sızıntı kontrol yazılımı', en: 'F-gas compliance and leak check software' },
  'odivon-food-label': { tr: 'Gıda etiketi ve alerjen yönetim yazılımı', en: 'Food label and allergen management software' },
  'odivon-fire-safe': { tr: 'Yangın söndürücü bakım takip programı', en: 'Fire extinguisher maintenance tracking software' },
  'odivon-kids': { tr: 'Kreş ve anaokulu yönetim programı', en: 'Nursery and preschool management software' },
  'odivon-diet': { tr: 'Diyetisyen programı ve danışan takibi', en: 'Dietitian software and client tracking' },
};
