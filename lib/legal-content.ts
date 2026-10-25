import type { Locale } from './messages';
import { site } from './site';

// A block is a paragraph (string) or a bullet list (string[]).
export type LegalBlock = string | readonly string[];
export type LegalSection = { id: string; title: string; blocks: readonly LegalBlock[] };
export type LegalDoc = { eyebrow: string; title: string; intro: string; updated: string; sections: readonly LegalSection[] };

const c = site.company;
const updated = { tr: `Son güncelleme: ${site.legalUpdated}`, en: `Last updated: ${site.legalUpdated}` };

export const privacy: Record<Locale, LegalDoc> = {
  tr: {
    eyebrow: 'YASAL / GİZLİLİK',
    title: 'Gizlilik Politikası ve KVKK Aydınlatma Metni',
    intro: 'Bu metin, odivon.com web sitesini ziyaret ettiğinde hangi kişisel verilerin işlendiğini, neden işlendiğini ve 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamındaki haklarını açıklar.',
    updated: updated.tr,
    sections: [
      { id: 'veri-sorumlusu', title: '1. Veri sorumlusu', blocks: [
        `Veri sorumlusu ${c.legalName} (“Odivon”) olup adresi ${c.address}, MERSİS numarası ${c.mersis}, vergi bilgileri ${c.taxOffice} şeklindedir.`,
        `Gizlilikle ilgili tüm sorular için ${c.kvkkEmail} adresine yazabilirsin.`,
      ] },
      { id: 'islenen-veriler', title: '2. İşlenen kişisel veriler', blocks: [
        'Bu site üyelik veya form içermez. İşlenen veriler şunlarla sınırlıdır:',
        [
          'İşlem güvenliği verileri: IP adresi, tarayıcı ve cihaz bilgisi, ziyaret zamanı. Bu kayıtlar barındırma sağlayıcısının sunucularında teknik olarak oluşur.',
          'İletişim verileri: bize e-posta gönderirsen ad, e-posta adresi ve mesaj içeriği.',
          'Tercih verileri: dil, görünüm ve çerez seçimin. Bunlar yalnızca senin tarayıcında saklanır.',
          'Analitik veriler: yalnızca izin verirsen, ziyaret edilen sayfalar, ziyaret süresi, yaklaşık konum (ülke/şehir) ve cihaz türü gibi anonimleştirilmiş kullanım istatistikleri.',
        ],
      ] },
      { id: 'amaclar', title: '3. İşleme amaçları ve hukuki sebepler', blocks: [
        [
          'Sitenin güvenli ve kesintisiz çalışması: KVKK m. 5/2-f, meşru menfaat.',
          'Sorularına ve iş birliği taleplerine yanıt vermek: KVKK m. 5/2-c, sözleşmenin kurulması ve m. 5/2-f, meşru menfaat.',
          'Hukuki yükümlülükleri yerine getirmek: KVKK m. 5/2-ç.',
          'Sitenin nasıl kullanıldığını ölçüp geliştirmek (analitik): KVKK m. 5/1, açık rıza. Rızanı istediğin an geri alabilirsin.',
        ],
      ] },
      { id: 'cerezler', title: '4. Çerezler ve benzeri teknolojiler', blocks: [
        'Zorunlu tercihler (her zaman açık): odivon-language, odivon-theme ve odivon-consent anahtarları tarayıcının yerel depolamasında tutulur. Sunucuya gönderilmez, sen silene kadar kalır.',
        'Analitik çerezler (yalnızca izinle): Google Analytics 4 kullanılırsa _ga ve _ga_<ID> çerezleri en fazla 2 yıl saklanır. İzin vermediğin sürece Google Analytics betiği hiç yüklenmez.',
        'Seçimini sayfanın altındaki “Çerez tercihleri” bağlantısından istediğin an değiştirebilirsin. Rızanı geri aldığında analitik çerezler silinir.',
      ] },
      { id: 'aktarim', title: '5. Verilerin aktarılması', blocks: [
        'Kişisel verilerin satılmaz. Yalnızca hizmeti sunmak için gereken ölçüde aşağıdaki taraflarla paylaşılabilir:',
        [
          'Barındırma sağlayıcısı (ör. Vercel Inc., ABD): sitenin sunulması ve güvenlik kayıtları.',
          'E-posta hizmet sağlayıcısı: gönderdiğin e-postaların iletilmesi ve saklanması.',
          'Google Ireland Ltd. / Google LLC: yalnızca analitiğe izin verirsen kullanım istatistikleri.',
          'Yetkili kamu kurum ve kuruluşları: yasal zorunluluk bulunduğunda.',
        ],
        'Bu sağlayıcıların sunucuları yurt dışında bulunabilir. Yurt dışına aktarım KVKK m. 9 kapsamında standart sözleşmeler veya açık rızan ile yapılır.',
      ] },
      { id: 'saklama', title: '6. Saklama süresi', blocks: [
        'Veriler işleme amacının gerektirdiği süre ve ilgili mevzuattaki zamanaşımı süreleri boyunca saklanır, ardından silinir, yok edilir veya anonim hale getirilir. E-posta yazışmaları en fazla 3 yıl, analitik veriler en fazla 14 ay saklanır.',
      ] },
      { id: 'haklar', title: '7. KVKK kapsamındaki hakların', blocks: [
        'KVKK m. 11 uyarınca; verilerinin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işleme amacını öğrenme, aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmişse düzeltilmesini, silinmesini veya yok edilmesini isteme, bu işlemlerin aktarıldığı kişilere bildirilmesini isteme, otomatik analiz sonucu aleyhine bir sonuca itiraz etme ve kanuna aykırı işleme nedeniyle zarara uğrarsan zararın giderilmesini talep etme haklarına sahipsin.',
        `Başvurunu kimliğini doğrulayan bilgilerle ${c.kvkkEmail} adresine veya ${c.address} adresine yazılı olarak iletebilirsin. Başvurular en geç 30 gün içinde ücretsiz olarak yanıtlanır.`,
      ] },
      { id: 'urun-uygulamalari', title: '8. Ürün uygulamaları ve dış bağlantılar', blocks: [
        'Bu politika yalnızca odivon.com tanıtım sitesini kapsar. Ürün demoları (ör. erp.odivon.com) kendi uygulamalarıdır ve hesap oluşturduğunda o uygulamanın gizlilik koşulları geçerli olur.',
      ] },
      { id: 'degisiklikler', title: '9. Değişiklikler', blocks: [
        'Bu metni gerektiğinde güncelleyebiliriz. Güncel sürüm her zaman bu sayfada, son güncelleme tarihiyle birlikte yayımlanır.',
      ] },
    ],
  },
  en: {
    eyebrow: 'LEGAL / PRIVACY',
    title: 'Privacy Policy',
    intro: 'This policy explains which personal data is processed when you visit the odivon.com website, why it is processed and what rights you have under the Turkish Personal Data Protection Law No. 6698 (KVKK) and, where applicable, the GDPR.',
    updated: updated.en,
    sections: [
      { id: 'veri-sorumlusu', title: '1. Data controller', blocks: [
        `The data controller is ${c.legalName} (“Odivon”), ${c.address}, MERSIS ${c.mersis}, tax details ${c.taxOffice}.`,
        `Send any privacy question to ${c.kvkkEmail}.`,
      ] },
      { id: 'islenen-veriler', title: '2. Personal data we process', blocks: [
        'This site has no accounts or forms. We only process:',
        [
          'Security data: IP address, browser and device details and time of visit, logged technically by our hosting provider.',
          'Contact data: your name, email address and message if you email us.',
          'Preference data: your language, appearance and cookie choice, stored only in your browser.',
          'Analytics data: only with your consent, anonymised usage statistics such as pages viewed, visit duration, approximate location (country/city) and device type.',
        ],
      ] },
      { id: 'amaclar', title: '3. Purposes and legal bases', blocks: [
        [
          'Running the site securely: legitimate interest (KVKK art. 5/2-f, GDPR art. 6(1)(f)).',
          'Answering your questions and partnership requests: steps prior to a contract and legitimate interest.',
          'Meeting legal obligations: legal obligation.',
          'Measuring and improving the site (analytics): your consent, which you can withdraw at any time.',
        ],
      ] },
      { id: 'cerezler', title: '4. Cookies and similar technologies', blocks: [
        'Essential preferences (always on): odivon-language, odivon-theme and odivon-consent are kept in your browser’s local storage. They are never sent to a server and stay until you delete them.',
        'Analytics cookies (consent only): if Google Analytics 4 is enabled, _ga and _ga_<ID> cookies are kept for up to 2 years. The Google Analytics script is not loaded at all until you consent.',
        'Change your choice at any time from “Cookie preferences” at the bottom of every page. Withdrawing consent deletes the analytics cookies.',
      ] },
      { id: 'aktarim', title: '5. Sharing your data', blocks: [
        'We never sell personal data. It may be shared only as far as needed to run the service with:',
        [
          'Our hosting provider (e.g. Vercel Inc., USA): serving the site and security logs.',
          'Our email provider: delivering and storing your emails.',
          'Google Ireland Ltd. / Google LLC: usage statistics, only if you consent to analytics.',
          'Competent public authorities: where the law requires it.',
        ],
        'These providers may store data outside Türkiye. Such transfers rely on standard contractual clauses or your explicit consent.',
      ] },
      { id: 'saklama', title: '6. Retention', blocks: [
        'Data is kept only as long as its purpose and the applicable limitation periods require, then deleted, destroyed or anonymised. Emails are kept for up to 3 years and analytics data for up to 14 months.',
      ] },
      { id: 'haklar', title: '7. Your rights', blocks: [
        'You may ask whether your data is processed, request information and a copy, learn the purpose and recipients, ask for correction, deletion or destruction and for recipients to be notified, object to an adverse result of automated analysis and claim compensation for unlawful processing.',
        `Send your request with information that verifies your identity to ${c.kvkkEmail} or in writing to ${c.address}. We answer free of charge within 30 days.`,
      ] },
      { id: 'urun-uygulamalari', title: '8. Product applications and external links', blocks: [
        'This policy covers only the odivon.com marketing website. Product demos (e.g. erp.odivon.com) are separate applications; their own privacy terms apply when you create an account there.',
      ] },
      { id: 'degisiklikler', title: '9. Changes', blocks: [
        'We may update this policy when needed. The current version is always published on this page with its last updated date.',
      ] },
    ],
  },
};

export const terms: Record<Locale, LegalDoc> = {
  tr: {
    eyebrow: 'YASAL / KULLANIM',
    title: 'Kullanım Şartları',
    intro: `Bu şartlar, ${c.legalName} (“Odivon”) tarafından işletilen odivon.com web sitesinin kullanımına ilişkindir. Siteyi kullanarak bu şartları kabul etmiş olursun.`,
    updated: updated.tr,
    sections: [
      { id: 'hizmet', title: '1. Sitenin amacı', blocks: [
        'odivon.com, Odivon ürün ailesini tanıtan bilgilendirme amaçlı bir web sitesidir. Ürünlerin satışı, lisanslanması ve kullanımı ayrıca yapılan sözleşmelere ve ilgili uygulamanın kendi koşullarına tabidir.',
      ] },
      { id: 'demolar', title: '2. Ürün demoları', blocks: [
        'Kullanıma açık olarak işaretlenen ürünlerin bağlantıları ayrı uygulamalara yönlendirir. Demolar tanıtım amacıyla “olduğu gibi” sunulur; demo ortamına girilen verilerin kalıcılığı garanti edilmez ve gerçek, hassas kişisel veri girilmemelidir.',
        '“Geliştiriliyor” veya “Pilot” olarak işaretlenen ürünlerin kapsamı, özellikleri ve yayın tarihi değişebilir.',
      ] },
      { id: 'fikri-mulkiyet', title: '3. Fikri mülkiyet', blocks: [
        'Sitedeki metinler, görseller, logolar, “Odivon” adı ve ürün adları Odivon’a veya lisans verenlerine aittir. Yazılı izin olmadan kopyalanamaz, çoğaltılamaz, değiştirilemez veya ticari amaçla kullanılamaz.',
      ] },
      { id: 'kullanim-kurallari', title: '4. Kullanım kuralları', blocks: [
        'Siteyi kullanırken şunları yapmamayı kabul edersin:',
        [
          'Siteye veya bağlı sistemlere yetkisiz erişim denemek, güvenlik açıklarını istismar etmek.',
          'Siteyi otomatik araçlarla aşırı yükleyecek şekilde taramak veya hizmeti engellemek.',
          'Kötü amaçlı yazılım yaymak veya yürürlükteki mevzuata aykırı herhangi bir faaliyette bulunmak.',
        ],
      ] },
      { id: 'sorumluluk', title: '5. Sorumluluğun sınırlandırılması', blocks: [
        'Sitedeki bilgiler özenle hazırlanır ancak eksiksiz veya güncel olduğu garanti edilmez ve bağlayıcı teklif niteliği taşımaz. Yürürlükteki mevzuatın izin verdiği ölçüde Odivon, sitenin kullanımından veya kullanılamamasından doğan dolaylı zararlardan sorumlu değildir.',
      ] },
      { id: 'dis-baglantilar', title: '6. Dış bağlantılar', blocks: [
        'Site, üçüncü taraf sitelere bağlantılar içerebilir. Bu sitelerin içeriğinden ve gizlilik uygulamalarından ilgili site sahipleri sorumludur.',
      ] },
      { id: 'gizlilik', title: '7. Gizlilik', blocks: [
        'Kişisel verilerin Gizlilik Politikası ve KVKK Aydınlatma Metni’ne uygun olarak işlenir.',
      ] },
      { id: 'degisiklikler', title: '8. Değişiklikler', blocks: [
        'Odivon bu şartları önceden bildirimde bulunmaksızın güncelleyebilir. Güncel sürüm bu sayfada yayımlandığı anda yürürlüğe girer.',
      ] },
      { id: 'hukuk', title: '9. Uygulanacak hukuk ve yetki', blocks: [
        'Bu şartlar Türkiye Cumhuriyeti hukukuna tabidir. Uyuşmazlıklarda [şehir] mahkemeleri ve icra daireleri yetkilidir. Tüketici sıfatıyla hareket eden kullanıcıların tüketici hakem heyetlerine ve tüketici mahkemelerine başvuru hakları saklıdır.',
      ] },
      { id: 'iletisim', title: '10. İletişim', blocks: [
        `${c.legalName}, ${c.address}. E-posta: ${site.email}`,
      ] },
    ],
  },
  en: {
    eyebrow: 'LEGAL / TERMS',
    title: 'Terms of Use',
    intro: `These terms govern the use of the odivon.com website operated by ${c.legalName} (“Odivon”). By using the site you accept them. The Turkish version prevails in case of conflict.`,
    updated: updated.en,
    sections: [
      { id: 'hizmet', title: '1. Purpose of the site', blocks: [
        'odivon.com is an informational website that presents the Odivon product family. Sales, licensing and use of the products are governed by separate agreements and each application’s own terms.',
      ] },
      { id: 'demolar', title: '2. Product demos', blocks: [
        'Links for products marked available open separate applications. Demos are provided “as is” for evaluation; data entered in a demo may not be kept, and you should not enter real or sensitive personal data.',
        'Scope, features and release dates of products marked in development or pilot may change.',
      ] },
      { id: 'fikri-mulkiyet', title: '3. Intellectual property', blocks: [
        'Texts, images, logos, the Odivon name and product names belong to Odivon or its licensors and may not be copied, reproduced, modified or used commercially without written permission.',
      ] },
      { id: 'kullanim-kurallari', title: '4. Acceptable use', blocks: [
        'When using the site you agree not to:',
        [
          'Attempt unauthorised access to the site or connected systems or exploit vulnerabilities.',
          'Crawl the site in a way that overloads it or otherwise disrupt the service.',
          'Distribute malware or engage in any unlawful activity.',
        ],
      ] },
      { id: 'sorumluluk', title: '5. Limitation of liability', blocks: [
        'Information on the site is prepared with care but is not guaranteed to be complete or current and is not a binding offer. To the extent permitted by law, Odivon is not liable for indirect damages arising from the use of, or inability to use, the site.',
      ] },
      { id: 'dis-baglantilar', title: '6. External links', blocks: [
        'The site may link to third-party sites. Their owners are responsible for their content and privacy practices.',
      ] },
      { id: 'gizlilik', title: '7. Privacy', blocks: [
        'Your personal data is processed according to our Privacy Policy.',
      ] },
      { id: 'degisiklikler', title: '8. Changes', blocks: [
        'Odivon may update these terms without notice. The current version takes effect when published on this page.',
      ] },
      { id: 'hukuk', title: '9. Governing law and jurisdiction', blocks: [
        'These terms are governed by the laws of the Republic of Türkiye. The courts and enforcement offices of [city] have jurisdiction. Consumers keep their rights to apply to consumer arbitration committees and consumer courts.',
      ] },
      { id: 'iletisim', title: '10. Contact', blocks: [
        `${c.legalName}, ${c.address}. Email: ${site.email}`,
      ] },
    ],
  },
};
