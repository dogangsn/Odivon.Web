import type { Locale } from './messages';

type Copy = Record<Locale, string>;
export type Product = {
  id: string;
  name: string;
  symbol: 'gym' | 'invoice' | 'apm' | 'integration' | 'farm' | 'spa' | 'beauty' | 'rent' | 'driving' | 'parking' | 'hair' | 'school' | 'api' | 'together' | 'vet' | 'erp';
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
    id: 'odivon-erp', name: 'OdivonERP', symbol: 'erp', status: 'available',  demoUrl: 'https://erp.odivon.com',
    category: { tr: 'Kurumsal platform', en: 'Enterprise platform' }, audience: { tr: 'Birden fazla Odivon ürünü kullanan ekipler için', en: 'For teams using multiple Odivon products' },
    description: { tr: 'Lisanslı Odivon uygulamalarına tek oturumdan ulaşmak için geliştirilen kurumsal ürün portalı.', en: 'An enterprise portal for accessing licensed Odivon applications from one session.' },
    outcome: { tr: 'Şirketinizin kullandığı ürünleri tek giriş noktasında bir araya getirmeyi hedefler.', en: 'Designed to bring your company’s Odivon products into one entry point.' },
    features: { tr: ['Lisanslı modülleri tek panoda görme', 'Ürünler arası tek oturumla geçiş', 'Şirket seçimi ve hesap akışı'], en: ['Licensed modules in one dashboard', 'Single-session product handoff', 'Company selection and account flow'] },
  },
  {
    id: 'odivon-gym', name: 'OdivonGYM', symbol: 'gym', status: 'available', demoUrl: 'https://gym.odivon.com',
    category: { tr: 'Spor & performans', en: 'Fitness & performance' }, audience: { tr: 'Spor salonları, stüdyolar ve antrenörler için', en: 'For gyms, studios and coaches' },
    description: { tr: 'Sporcu gelişimini, antrenman performansını ve kulüp operasyonlarını aynı deneyimde buluşturun.', en: 'Bring athlete progress, training performance and club operations into one experience.' },
    outcome: { tr: 'Sporcularınızın ilerleyişini izlerken kulübünüzün günlük akışını tek yerden yönetin.', en: 'Follow athlete progress while managing your club’s day-to-day flow in one place.' },
    features: { tr: ['Sporcu ve kulüp yönetimi', 'Antrenman ve performans takibi', 'Bireysel ve grup seansları için akışlar'], en: ['Athlete and club management', 'Training and performance tracking', 'Flows for individual and group sessions'] },
  },
  {
    id: 'odivon-fatura-pro', name: 'OdivonFaturaPro', symbol: 'invoice', status: 'available', demoUrl: 'https://faturapro.odivon.com',
    category: { tr: 'Fatura & finans', en: 'Invoicing & finance' }, audience: { tr: 'Fatura ve proforma süreçlerini yöneten işletmeler için', en: 'For businesses managing invoices and pro formas' },
    description: { tr: 'Ülkenizi seçin; fatura ve proformaları hazırlayıp PDF olarak indirin. Müşteri, gider ve raporlarınızı aynı çalışma alanında takip edin.', en: 'Choose your country, create invoices and pro formas, and download PDFs. Keep customers, expenses and reports in one workspace.' },
    outcome: { tr: 'Belge hazırlamadan finansal takibe kadar günlük işlerinizi dağınık araçlar arasında kaybolmadan yönetin.', en: 'Manage daily work from document creation to financial tracking without switching between scattered tools.' },
    features: { tr: ['Ülke seçimiyle fatura ve proforma oluşturma', 'Faturaları PDF olarak indirme', 'Müşteri, gider ve rapor takibi'], en: ['Create invoices and pro formas by country', 'Download invoices as PDFs', 'Track customers, expenses and reports'] },
  },
  {
    id: 'odivon-vet', name: 'OdivonVET', symbol: 'vet', status: 'available', demoUrl: 'https://vet.odivon.com',
    category: { tr: 'Veteriner klinikleri', en: 'Veterinary clinics' }, audience: { tr: 'Veteriner klinikleri ve hekimler için', en: 'For veterinary clinics and clinicians' },
    description: { tr: 'Hasta, aşı, muayene ve randevu kayıtlarını klinik ekibiniz için aynı yerde toplayın.', en: 'Keep patient, vaccination, examination and appointment records in one place.' },
    outcome: { tr: 'Hasta geçmişinden günlük randevuya uzanan klinik akışını daha görünür kılın.', en: 'Make the clinic flow clearer, from patient history to daily appointments.' },
    features: { tr: ['Hasta ve aşı kayıtları', 'Muayene ve laboratuvar takibi', 'Randevu, finans ve stok görünümü'], en: ['Patient and vaccination records', 'Examination and lab tracking', 'Appointment, finance and stock overview'] },
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
    id: 'odivon-pro-beauty', name: 'OdivonProBeauty', symbol: 'beauty', status: 'available', demoUrl: 'https://beauty.odivon.com',
    category: { tr: 'Güzellik merkezi yönetimi', en: 'Beauty center management' }, audience: { tr: 'Güzellik merkezleri, bakım stüdyoları ve çok şubeli ekipler için', en: 'For beauty centers, wellness studios and multi-branch teams' },
    description: { tr: 'Randevudan bakıma, müşteri ilişkisinden kasaya kadar güzellik merkezinizin günlük akışını tek yerde yönetin. Şubelerinizin ritmini kaybetmeden hizmet kalitesine odaklanın.', en: 'Run the daily flow of your beauty center in one place, from appointments and treatments to customer relationships and payments. Keep every branch coordinated while focusing on service.' },
    outcome: { tr: 'Uzman, oda ve cihaz planlamasını netleştirin; paket ve seansları izleyin, müşteri geçmişini ve işletme performansını aynı çalışma alanında görün.', en: 'Coordinate specialists, rooms and devices; follow packages and sessions, customer history and business performance from one workspace.' },
    features: { tr: ['Uzman, oda ve cihaz uygunluğuna göre randevu takvimi', 'Müşteri profilleri ve bakım geçmişi', 'Paketler, kalan seanslar ve hizmet kataloğu', 'Personel, şube ve vardiya yönetimi', 'Kasa, stok ve performans raporları', 'Randevu ve paketleri görüntüleyen müşteri portalı'], en: ['Appointment calendar for specialists, rooms and devices', 'Customer profiles and treatment history', 'Packages, remaining sessions and service catalogue', 'Staff, branch and shift management', 'Payments, inventory and performance reports', 'Customer portal for appointments and packages'] },
  },
  {
    id: 'odivon-rent-a-car', name: 'OdivonRentACar', symbol: 'rent', status: 'available', demoUrl: 'https://rent.odivon.com',
    category: { tr: 'Araç kiralama & filo', en: 'Car rental & fleet' }, audience: { tr: 'Araç kiralama şirketleri ve araç hazırlık / oto yıkama ekipleri için', en: 'For rental companies and vehicle preparation / car wash teams' },
    description: { tr: 'Filo, müsaitlik, rezervasyon ve kiralama süreçlerini tek çalışma alanında birleştirin. Araç teslimi öncesi bakım ve yıkama hazırlığını da müşteri takip görevleriyle görünür kılın.', en: 'Bring fleet availability, bookings and rentals into one workspace. Track pre-handover maintenance and wash preparation with customer follow-up tasks.' },
    outcome: { tr: 'Hangi aracın müsait, kirada veya bakımda olduğunu görün; rezervasyonu kiralamaya dönüştürürken teslim tarihlerini, müşteri kayıtlarını ve finans hareketlerini izleyin.', en: 'See which cars are available, rented or under maintenance; follow handover dates, customer records and financial activity as bookings become rentals.' },
    features: { tr: ['14 günlük araç takvimi ve bakım görünümü', 'Şube ve tarih seçimiyle online araç rezervasyonu', 'Rezervasyonu kiralamaya dönüştürme ve teslim / iade takibi', 'Müşteri kayıtları ve CRM takip görevleri', 'Tahsilat, depozito ve iade hareketlerini izleme', 'Oto yıkama ve araç hazırlığı için takip görevleri'], en: ['14-day vehicle calendar and maintenance view', 'Online car booking by branch and date', 'Convert bookings to rentals and track handover / return dates', 'Customer records and CRM follow-up tasks', 'Track payments, deposits and refunds', 'Follow-up tasks for car wash and vehicle preparation'] },
  },
  {
    id: 'odivon-driving-school', name: 'OdivonDrivingSchool', symbol: 'driving', status: 'development', demoUrl: 'https://driving.odivon.com',
    category: { tr: 'Sürücü kursu yönetimi', en: 'Driving school management' }, audience: { tr: 'Sürücü kursları, eğitmenler ve operasyon ekipleri için', en: 'For driving schools, instructors and operations teams' },
    description: { tr: 'Kursiyer kayıtlarını, eğitmenleri, eğitim araçlarını ve direksiyon derslerini tek operasyon merkezinde yönetin. Günlük planı herkes için daha açık ve düzenli hale getirin.', en: 'Manage student records, instructors, training vehicles and driving lessons from one operations center. Make the daily schedule clearer for the entire team.' },
    outcome: { tr: 'Kursiyer, eğitmen ve aracı aynı zaman çizelgesinde çakışmasız eşleştirin; belge durumlarını, sertifikaları ve araç uygunluğunu ders planına bağlayın.', en: 'Match students, instructors and vehicles without schedule conflicts, while connecting document status, certificates and vehicle availability to lesson planning.' },
    features: { tr: ['Kursiyer kayıtları ve belge kontrolü', 'Eğitmen sertifikaları ve sınıf yetkinlikleri', 'Eğitim filosu, muayene ve sigorta tarihleri', 'Kursiyer, eğitmen ve araç için çakışma kontrollü ders planı', 'Yaklaşan dersler ve operasyon göstergeleri', 'Türkçe ve İngilizce yönetim deneyimi'], en: ['Student records and document checks', 'Instructor certificates and licence-class qualifications', 'Training fleet, inspection and insurance dates', 'Conflict-safe lessons for students, instructors and vehicles', 'Upcoming lessons and operational indicators', 'Turkish and English management experience'] },
  },
  {
    id: 'odivon-park', name: 'OdivonPark', symbol: 'parking', status: 'available', demoUrl: 'https://park.odivon.com',
    category: { tr: 'Akıllı otopark yönetimi', en: 'Smart parking management' }, audience: { tr: 'Otopark işletmeleri, tesis yöneticileri ve saha ekipleri için', en: 'For parking operators, facility managers and field teams' },
    description: { tr: 'Doluluk, araç giriş–çıkışı, ücretlendirme ve tahsilat akışlarını tek kontrol noktasında yönetin. Birden fazla tesisin anlık durumunu güvenli ve ölçülebilir hale getirin.', en: 'Manage occupancy, vehicle entry and exit, pricing and payments from one control point. Make real-time operations across multiple facilities secure and measurable.' },
    outcome: { tr: 'Kapasiteyi ve içerideki araçları anlık görün; plaka veya QR biletle oturum başlatın, tarifeyi hesaplayın ve kasa kapanışına kadar tüm hareketi izleyin.', en: 'See capacity and parked vehicles in real time; start sessions by plate or QR ticket, calculate tariffs and follow every transaction through cash close.' },
    features: { tr: ['Canlı doluluk, giriş ve çıkış takibi', 'Plaka veya QR biletle park oturumu', 'Araç kategorilerine göre esnek tarifeler', 'Nakit ve harici POS tahsilatları ile kasa vardiyası', 'Tesis, alan, şerit ve kapasite yönetimi', 'Edge cihaz eşleştirme ve çevrimdışı olay kuyruğu'], en: ['Live occupancy, entry and exit tracking', 'Parking sessions by plate or QR ticket', 'Flexible tariffs by vehicle category', 'Cash and external POS payments with cashier shifts', 'Facility, zone, lane and capacity management', 'Edge-device pairing and offline event queue'] },
  },
  {
    id: 'odivon-pro-hair', name: 'OdivonPro Hair', symbol: 'hair', status: 'development', demoUrl: 'https://hair.odivon.com',
    category: { tr: 'Kuaför salonları', en: 'Hair salons' }, audience: { tr: 'Kuaför salonları ve ekipleri için', en: 'For hair salons and their teams' },
    description: { tr: 'Randevu, müşteri ve salon operasyonlarını tek akışta buluşturmak için tasarlanan kuaför yönetim sistemi.', en: 'A salon management system designed to bring appointments, clients and daily operations into one flow.' },
    outcome: { tr: 'Hizmet planlamasından kasa ve raporlamaya uzanan salon işlerini daha görünür kılmayı hedefler.', en: 'Designed to make salon work clearer, from service planning to checkout and reporting.' },
    features: { tr: ['Randevu ve online rezervasyon odağı', 'Müşteri, personel ve hizmet yönetimi', 'Kasa, stok ve raporlama planı'], en: ['Appointments and online booking focus', 'Client, staff and service management', 'Checkout, inventory and reporting roadmap'] },
  },
  {
    id: 'odivon-apm', name: 'OdivonAPM', symbol: 'apm', status: 'available', demoUrl: 'https://apm.odivon.com',
    category: { tr: 'Randevu yönetimi', en: 'Appointment management' }, audience: { tr: 'Randevuyla çalışan ekipler için', en: 'For appointment-based teams' },
    description: { tr: 'Randevuları ve günlük takvim akışını tek bir çalışma alanında düzenleyin.', en: 'Organize appointments and daily schedules in one workspace.' },
    outcome: { tr: 'Planlanan randevuları daha net görün ve günlük akışı kolayca takip edin.', en: 'See planned appointments more clearly and keep track of the day.' },
    features: { tr: ['Randevu oluşturma ve yönetimi', 'Günlük takvim görünümü', 'Düzenli planlama akışı'], en: ['Appointment creation and management', 'Daily calendar view', 'Organized scheduling flow'] },
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
    id: 'odivon-samo-int', name: 'OdivonSamoInt', symbol: 'integration', status: 'available', demoUrl: 'https://samo.odivon.com',
    category: { tr: 'Turizm teknolojisi', en: 'Travel technology' }, audience: { tr: 'SAMO kullanan turizm ekipleri için', en: 'For travel teams using SAMO' },
    description: { tr: 'SAMO verilerini müşteri uygulamalarınıza veya B2B rezervasyon akışlarınıza bağlayın.', en: 'Connect SAMO data to customer-facing apps or B2B booking flows.' },
    outcome: { tr: 'Arama, fiyat ve rezervasyon verilerine uygun entegrasyon yoluyla erişin.', en: 'Access search, pricing and booking data through the integration path that fits your workflow.' },
    features: { tr: ['Search API ve XML-Gate seçenekleri', 'Otel arama, fiyat ve rezervasyon akışları', 'B2B referans verisi entegrasyonu'], en: ['Search API and XML-Gate options', 'Hotel search, pricing and booking flows', 'B2B reference-data integration'] },
  },
  {
    id: 'odivon-ikimiz', name: 'Odivon ikimiz', symbol: 'together', status: 'available', demoUrl: 'https://ikimiz.odivon.com',
    category: { tr: 'Yaşam & ilişkiler', en: 'Lifestyle & relationships' }, audience: { tr: 'Birlikte daha çok keşfetmek isteyen çiftler için', en: 'For couples who want to discover more together' },
    description: { tr: 'Ortak eşleşmeler, günlük küçük görevler ve buluşma fikirleriyle rutine yeni bir enerji katın.', en: 'Bring new energy to your routine with shared matches, daily prompts and date ideas.' },
    outcome: { tr: 'Birlikte geçirdiğiniz zamana konuşacak ve deneyecek yeni şeyler ekleyin.', en: 'Find new things to talk about and try together.' },
    features: { tr: ['Secret Match ile ortak seçimler', 'Günlük görevler ve çift testleri', 'Buluşma fikirleri ve ortak istek listesi'], en: ['Shared choices through Secret Match', 'Daily prompts and couple quizzes', 'Date ideas and a shared wish list'] },
  }
];
