import type { Locale } from './messages';

type Copy = Record<Locale, string>;
export type Product = {
  id: string;
  name: string;
  symbol: 'invoice' | 'gym' | 'apm' | 'integration' | 'farm' | 'spa' | 'school' | 'api' | 'together' | 'vet' | 'erp';
  category: Copy;
  audience: Copy;
  description: Copy;
  outcome: Copy;
  features: Record<Locale, readonly string[]>;
  status: 'available' | 'development' | 'pilot';
  demoUrl?: string;
};

// Product copy is based on the public product pages and the implemented ERP portal.
export const products: Product[] = [
  {
    id: 'odivon-fatura-pro', name: 'OdivonFaturaPro', symbol: 'invoice', status: 'available', demoUrl: 'https://faturapro.odivon.com',
    category: { tr: 'Finans', en: 'Finance' }, audience: { tr: 'Fatura hazırlayan işletmeler için', en: 'For businesses preparing invoices' },
    description: { tr: 'Fatura ve proformalarınızı, işlem yaptığınız ülkeyi seçerek tek bir akışta hazırlayın.', en: 'Prepare invoices and pro formas in one flow, starting with the country you do business in.' },
    outcome: { tr: 'Ülkeye göre değişen belge süreçlerini daha anlaşılır bir başlangıç noktasında toplayın.', en: 'Bring country-specific document workflows into a clearer starting point.' },
    features: { tr: ['Ülke seçimiyle başlayan belge akışı', 'Dijital fatura ve proforma hazırlama', 'Türkçe ve İngilizce arayüz'], en: ['Country-first document flow', 'Digital invoices and pro formas', 'Turkish and English interface'] },
  },
  {
    id: 'odivon-gym', name: 'OdivonGYM', symbol: 'gym', status: 'available', demoUrl: 'https://gym.odivon.com',
    category: { tr: 'Spor & performans', en: 'Fitness & performance' }, audience: { tr: 'Spor salonları, stüdyolar ve antrenörler için', en: 'For gyms, studios and coaches' },
    description: { tr: 'Sporcu gelişimini, antrenman performansını ve kulüp operasyonlarını aynı deneyimde buluşturun.', en: 'Bring athlete progress, training performance and club operations into one experience.' },
    outcome: { tr: 'Sporcularınızın ilerleyişini izlerken kulübünüzün günlük akışını tek yerden yönetin.', en: 'Follow athlete progress while managing your club’s day-to-day flow in one place.' },
    features: { tr: ['Sporcu ve kulüp yönetimi', 'Antrenman ve performans takibi', 'Bireysel ve grup seansları için akışlar'], en: ['Athlete and club management', 'Training and performance tracking', 'Flows for individual and group sessions'] },
  },
  {
    id: 'odivon-samo-int', name: 'OdivonSamoInt', symbol: 'integration', status: 'available', demoUrl: 'https://samo.odivon.com',
    category: { tr: 'Turizm teknolojisi', en: 'Travel technology' }, audience: { tr: 'SAMO kullanan turizm ekipleri için', en: 'For travel teams using SAMO' },
    description: { tr: 'SAMO verilerini müşteri uygulamalarınıza veya B2B rezervasyon akışlarınıza bağlayın.', en: 'Connect SAMO data to customer-facing apps or B2B booking flows.' },
    outcome: { tr: 'Arama, fiyat ve rezervasyon verilerine uygun entegrasyon yoluyla erişin.', en: 'Access search, pricing and booking data through the integration path that fits your workflow.' },
    features: { tr: ['Search API ve XML-Gate seçenekleri', 'Otel arama, fiyat ve rezervasyon akışları', 'B2B referans verisi entegrasyonu'], en: ['Search API and XML-Gate options', 'Hotel search, pricing and booking flows', 'B2B reference-data integration'] },
  },
  {
    id: 'odivon-farm', name: 'OdivonFARM', symbol: 'farm', status: 'available', demoUrl: 'https://farm.odivon.com',
    category: { tr: 'Tarım & hayvancılık', en: 'Agriculture & livestock' }, audience: { tr: 'Koyun ve keçi yetiştiricileri için', en: 'For sheep and goat farms' },
    description: { tr: 'Sürü kayıtlarını, RFID sayımını, sağlık ve maliyet verilerini tek ekranda takip edin.', en: 'Track herd records, RFID counts, health and costs from one screen.' },
    outcome: { tr: 'Sahadaki kayıtlarla işletme kararları arasındaki mesafeyi kısaltın.', en: 'Bring field records closer to everyday farm decisions.' },
    features: { tr: ['RFID küpe ve canlı sayım', 'Ağırlık, döl verimi ve sağlık takibi', 'Rasyon ve maliyet görünümü'], en: ['RFID tags and live counts', 'Weight, breeding and health tracking', 'Feed and cost overview'] },
  },
  {
    id: 'odivon-spa', name: 'OdivonSPA', symbol: 'spa', status: 'available', demoUrl: 'https://spa.odivon.com',
    category: { tr: 'Hizmet işletmeleri', en: 'Service businesses' }, audience: { tr: 'SPA ve bakım işletmeleri için', en: 'For spas and wellness businesses' },
    description: { tr: 'Randevuları, müşterileri, seansları ve finansal hareketleri ortak bir çalışma alanında yönetin.', en: 'Manage appointments, clients, sessions and finances in one workspace.' },
    outcome: { tr: 'Ekibinizin günlük operasyonunu parçalı araçlar yerine tek akışta görün.', en: 'Give your team one clear view of the daily operation.' },
    features: { tr: ['Randevu planlama', 'Müşteri ve seans kayıtları', 'Finansal hareket görünümü'], en: ['Appointment scheduling', 'Client and session records', 'Financial activity overview'] },
  },
  {
    id: 'odivon-school', name: 'OdivonSchool', symbol: 'school', status: 'available', demoUrl: 'https://school.odivon.com',
    category: { tr: 'Eğitim', en: 'Education' }, audience: { tr: 'İlkokul, LGS, YKS ve KPSS öğrencileri için', en: 'For primary, LGS, YKS and KPSS learners' },
    description: { tr: 'Sınava uygun testler, öğretici çözümler ve gelişim takibiyle çalışmayı daha hedefli hale getirin.', en: 'Study with exam-specific tests, explanatory solutions and progress tracking.' },
    outcome: { tr: 'Sadece doğru cevabı değil, eksik kaldığınız konuyu da görün.', en: 'See more than the right answer: understand where you need to improve.' },
    features: { tr: ['Sınava ve seviyeye göre testler', 'Adım adım çözüm açıklamaları', 'Başarı ve eksik konu analizi'], en: ['Tests by exam and level', 'Step-by-step explanations', 'Performance and gap analysis'] },
  },
  {
    id: 'odivon-api', name: 'OdivonAPI', symbol: 'api', status: 'available', demoUrl: 'https://api.odivon.com',
    category: { tr: 'Geliştirici araçları', en: 'Developer tools' }, audience: { tr: 'Uygulama geliştiren ekipler için', en: 'For application teams' },
    description: { tr: 'Sağlık, ekonomi ve konum verilerine yönelik API’leri tek katalogda keşfedin.', en: 'Explore APIs for health, economy and location data in one catalogue.' },
    outcome: { tr: 'İhtiyacınız olan veri servisini daha hızlı bulun ve ürününüze bağlayın.', en: 'Find the data service you need and connect it to your product faster.' },
    features: { tr: ['Kategorilere ayrılmış API kataloğu', 'Hastane, eczane, banka ve istasyon verileri', 'Servis bazında kapsam ve erişim bilgileri'], en: ['Categorised API catalogue', 'Hospital, pharmacy, bank and station data', 'Scope and access information per service'] },
  },
  {
    id: 'odivon-ikimiz', name: 'Odivon ikimiz', symbol: 'together', status: 'available', demoUrl: 'https://ikimiz.odivon.com',
    category: { tr: 'Yaşam & ilişkiler', en: 'Lifestyle & relationships' }, audience: { tr: 'Birlikte daha çok keşfetmek isteyen çiftler için', en: 'For couples who want to discover more together' },
    description: { tr: 'Ortak eşleşmeler, günlük küçük görevler ve buluşma fikirleriyle rutine yeni bir enerji katın.', en: 'Bring new energy to your routine with shared matches, daily prompts and date ideas.' },
    outcome: { tr: 'Birlikte geçirdiğiniz zamana konuşacak ve deneyecek yeni şeyler ekleyin.', en: 'Find new things to talk about and try together.' },
    features: { tr: ['Secret Match ile ortak seçimler', 'Günlük görevler ve çift testleri', 'Buluşma fikirleri ve ortak istek listesi'], en: ['Shared choices through Secret Match', 'Daily prompts and couple quizzes', 'Date ideas and a shared wish list'] },
  },
  {
    id: 'odivon-vet', name: 'OdivonVET', symbol: 'vet', status: 'available', demoUrl: 'https://vet.odivon.com',
    category: { tr: 'Veteriner klinikleri', en: 'Veterinary clinics' }, audience: { tr: 'Veteriner klinikleri ve hekimler için', en: 'For veterinary clinics and clinicians' },
    description: { tr: 'Hasta, aşı, muayene ve randevu kayıtlarını klinik ekibiniz için aynı yerde toplayın.', en: 'Keep patient, vaccination, examination and appointment records in one place.' },
    outcome: { tr: 'Hasta geçmişinden günlük randevuya uzanan klinik akışını daha görünür kılın.', en: 'Make the clinic flow clearer, from patient history to daily appointments.' },
    features: { tr: ['Hasta ve aşı kayıtları', 'Muayene ve laboratuvar takibi', 'Randevu, finans ve stok görünümü'], en: ['Patient and vaccination records', 'Examination and lab tracking', 'Appointment, finance and stock overview'] },
  },
  {
    id: 'odivon-erp', name: 'OdivonERP', symbol: 'erp', status: 'pilot',
    category: { tr: 'Kurumsal platform', en: 'Enterprise platform' }, audience: { tr: 'Birden fazla Odivon ürünü kullanan ekipler için', en: 'For teams using multiple Odivon products' },
    description: { tr: 'Lisanslı Odivon uygulamalarına tek oturumdan ulaşmak için geliştirilen kurumsal ürün portalı.', en: 'An enterprise portal for accessing licensed Odivon applications from one session.' },
    outcome: { tr: 'Şirketinizin kullandığı ürünleri tek giriş noktasında bir araya getirmeyi hedefler.', en: 'Designed to bring your company’s Odivon products into one entry point.' },
    features: { tr: ['Lisanslı modülleri tek panoda görme', 'Ürünler arası tek oturumla geçiş', 'Şirket seçimi ve hesap akışı'], en: ['Licensed modules in one dashboard', 'Single-session product handoff', 'Company selection and account flow'] },
  },
  {
    id: 'odivon-apm', name: 'OdivonAPM', symbol: 'apm', status: 'development',
    category: { tr: 'Randevu yönetimi', en: 'Appointment management' }, audience: { tr: 'Randevuyla çalışan ekipler için', en: 'For appointment-based teams' },
    description: { tr: 'Randevu planlamasını ve günlük takvim akışını daha düzenli yönetmek için geliştiriliyor.', en: 'In development to make appointment planning and daily schedules easier to manage.' },
    outcome: { tr: 'Randevu sürecini sadeleştiren bir çalışma alanı oluşturmayı hedefliyor.', en: 'Aims to create a simpler workspace for appointment workflows.' },
    features: { tr: ['Randevu yönetimi odağı', 'Geliştirme aşamasında', 'Demo henüz paylaşılmadı'], en: ['Focused on appointment management', 'Currently in development', 'Demo not yet available'] },
  },
];
