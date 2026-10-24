# Odivon 10 Uygulama Programı

Bu program, on ürünü birbirinden kopuk on kod tabanı olarak değil, ortak Odivon platformu üzerinde bağımsız satılabilir uygulamalar olarak başlatır.

## Portföy ve öncelik

| Dalga | Ürünler | Amaç |
| --- | --- | --- |
| 1 — Hızlı gelir | OdivonF-Gas, OdivonFireSafe, OdivonFoodLabel | Net operasyon acısı, kısa demo ve yerel satış döngüsü |
| 2 — Yüksek sözleşme değeri | OdivonMachineCE, OdivonProductSafe, OdivonPayFair | Uyum bütçesi, güçlü farklılaşma ve daha yüksek yıllık gelir |
| 3 — Ölçek ve dikey büyüme | OdivonCargoDocs, OdivonKids, OdivonDiet, OdivonCyberReady | Geniş kullanıcı tabanı ve uluslararası büyüme |

Tüm ürünler aynı anda temel aşamada başlamıştır. Dalgalar ürünleri durdurmaz; müşteri keşfi ve geliştirme kapasitesinin hangi üründe yoğunlaşacağını belirler.

## 12 haftalık başlangıç planı

- **1-2. haftalar:** Her ürün için 5 müşteri görüşmesi, mevcut süreç haritası, ödeme isteği ve pilot adayı kaydı.
- **3-4. haftalar:** İlk iki modülün tıklanabilir akışı, veri sözlüğü, rol/yetki matrisi ve fiyat hipotezi.
- **5-8. haftalar:** Dalga 1 ürünlerinde çalışan MVP; diğer ürünlerde doğrulanmış prototip ve bekleme listesi.
- **9-10. haftalar:** Firebase Auth, tenant izolasyonu, audit kayıtları, MainAPI uçları ve örnek veri.
- **11-12. haftalar:** 3-5 pilot müşteri, onboarding, kullanım ölçümü, teklif şablonu ve canlıya geçiş kararı.

## Ortak teknik sınırlar

- **Frontend:** Angular 22 standalone uygulamalar, sinyaller, erişilebilir ortak Odivon arayüzü.
- **Backend:** `OdivonMainApi` içinde ürün başına modül ve `/v1/{product}` namespace'i.
- **Kimlik:** Firebase Auth; kullanıcı profili ve modül erişimi MainAPI tarafından doğrulanır.
- **Veri:** `tenants/{tenantId}/{productCollection}` yolu; tenant dışı sorguya izin verilmez.
- **Kanıt:** Her kritik oluşturma, değişiklik, onay ve dışa aktarma işlemi audit kaydı üretir.
- **Dağıtım:** Uygulama başına ayrı build ve subdomain; ortak kütüphaneler tek sürüm düzeninde tutulur.

## Ürün kapıları

Bir ürün MVP geliştirmesine geçmek için en az 10 doğrulanmış görüşme, 3 pilot niyeti ve müşterilerin ortak kullandığı birincil iş akışına sahip olmalıdır. Canlıya geçiş için tenant izolasyonu, rol/yetki, yedekleme, audit, hata izleme, KVKK/GDPR veri haritası ve onboarding tamamlanmalıdır.

## Ticari ölçümler

- İlk görüşmeden demoya dönüşüm oranı
- Demodan pilot anlaşmasına dönüşüm oranı
- Pilotun ilk değer süresi
- Haftalık aktif kurum ve kritik işlem sayısı
- Kullanıcı başına destek talebi
- Aylık tekrar eden gelir ve müşteri kaybı

## Oluşturulan başlangıç kapsamı

`C:\Users\dogan\Documents\Private\Project\OdivonSuite` altında on Angular uygulaması, ortak ürün manifestosu, MainAPI istemcisi, tenant bağlamı ve ortak ürün paneli oluşturuldu. Odivon.Web kataloğuna on ürün geliştirme statüsünde eklendi. Canlı demo bağlantıları DNS ve gerçek yayın tamamlanınca açılacak.
