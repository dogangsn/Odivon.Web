from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, PageBreak,
    Table, TableStyle, KeepTogether, HRFlowable, Flowable
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.pdfgen.canvas import Canvas
from pathlib import Path
from datetime import date
import os


ROOT = Path(r"C:\Users\dogan\Documents\Private\Project\Odivon.Web")
OUT = ROOT / "output" / "pdf"
TMP = ROOT / "tmp" / "pdfs"
OUT.mkdir(parents=True, exist_ok=True)
TMP.mkdir(parents=True, exist_ok=True)
PDF_PATH = OUT / "Odivon_SaaS_Urun_Stratejisi_2026.pdf"

FONT_REG = r"C:\Windows\Fonts\arial.ttf"
FONT_BOLD = r"C:\Windows\Fonts\arialbd.ttf"
FONT_ITALIC = r"C:\Windows\Fonts\ariali.ttf"
pdfmetrics.registerFont(TTFont("Odivon", FONT_REG))
pdfmetrics.registerFont(TTFont("Odivon-Bold", FONT_BOLD))
pdfmetrics.registerFont(TTFont("Odivon-Italic", FONT_ITALIC))

NAVY = colors.HexColor("#08152B")
BLUE = colors.HexColor("#2563EB")
CYAN = colors.HexColor("#22D3EE")
PURPLE = colors.HexColor("#8B5CF6")
INK = colors.HexColor("#162033")
MUTED = colors.HexColor("#5D687A")
LIGHT = colors.HexColor("#F3F7FC")
LINE = colors.HexColor("#D9E2EF")
GREEN = colors.HexColor("#0E9F6E")
AMBER = colors.HexColor("#D97706")
RED = colors.HexColor("#DC2626")


def esc(s):
    return str(s).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="BodyTR", fontName="Odivon", fontSize=9.2, leading=13.5,
                          textColor=INK, spaceAfter=5))
styles.add(ParagraphStyle(name="SmallTR", fontName="Odivon", fontSize=7.6, leading=10.2,
                          textColor=MUTED))
styles.add(ParagraphStyle(name="TinyTR", fontName="Odivon", fontSize=6.8, leading=8.8,
                          textColor=INK))
styles.add(ParagraphStyle(name="TitleTR", fontName="Odivon-Bold", fontSize=28, leading=34,
                          textColor=colors.white, alignment=TA_LEFT))
styles.add(ParagraphStyle(name="SubtitleTR", fontName="Odivon", fontSize=12, leading=18,
                          textColor=colors.HexColor("#C6D7F3")))
styles.add(ParagraphStyle(name="H1TR", fontName="Odivon-Bold", fontSize=18, leading=23,
                          textColor=NAVY, spaceBefore=6, spaceAfter=10, keepWithNext=True))
styles.add(ParagraphStyle(name="H2TR", fontName="Odivon-Bold", fontSize=13, leading=17,
                          textColor=BLUE, spaceBefore=9, spaceAfter=6, keepWithNext=True))
styles.add(ParagraphStyle(name="H3TR", fontName="Odivon-Bold", fontSize=10.5, leading=14,
                          textColor=NAVY, spaceBefore=6, spaceAfter=4, keepWithNext=True))
styles.add(ParagraphStyle(name="CardTitle", fontName="Odivon-Bold", fontSize=11.5, leading=14,
                          textColor=colors.white))
styles.add(ParagraphStyle(name="CardBody", fontName="Odivon", fontSize=8.1, leading=11,
                          textColor=INK))
styles.add(ParagraphStyle(name="TableHead", fontName="Odivon-Bold", fontSize=7.4, leading=9,
                          textColor=colors.white, alignment=TA_LEFT))
styles.add(ParagraphStyle(name="TableCell", fontName="Odivon", fontSize=7, leading=9,
                          textColor=INK))
styles.add(ParagraphStyle(name="TableCellBold", fontName="Odivon-Bold", fontSize=7.2, leading=9,
                          textColor=NAVY))
styles.add(ParagraphStyle(name="Callout", fontName="Odivon", fontSize=10, leading=14,
                          textColor=NAVY))


class OdivonDocTemplate(BaseDocTemplate):
    def __init__(self, filename, **kw):
        super().__init__(filename, **kw)
        frame = Frame(17*mm, 17*mm, A4[0]-34*mm, A4[1]-33*mm, id="normal",
                      leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
        self.addPageTemplates([PageTemplate(id="content", frames=frame, onPage=self._page)])

    def _page(self, canvas, doc):
        if doc.page == 1:
            return
        canvas.saveState()
        canvas.setStrokeColor(LINE)
        canvas.setLineWidth(0.5)
        canvas.line(17*mm, 12*mm, A4[0]-17*mm, 12*mm)
        canvas.setFont("Odivon", 7.5)
        canvas.setFillColor(MUTED)
        canvas.drawString(17*mm, 7.3*mm, "ODIVON | SaaS Ürün Stratejisi")
        canvas.drawRightString(A4[0]-17*mm, 7.3*mm, f"{doc.page}")
        canvas.restoreState()

    def afterFlowable(self, flowable):
        if isinstance(flowable, Paragraph):
            style = flowable.style.name
            if style in ("H1TR", "H2TR"):
                level = 0 if style == "H1TR" else 1
                text = flowable.getPlainText()
                key = f"h{level}-{self.seq.nextf('heading')}"
                self.canv.bookmarkPage(key)
                self.canv.addOutlineEntry(text, key, level=level, closed=False)
                self.notify("TOCEntry", (level, text, self.page, key))


class CoverFlowable(Flowable):
    def __init__(self):
        super().__init__()
        self.width = A4[0] - 34*mm
        self.height = A4[1] - 33*mm

    def draw(self):
        c = self.canv
        c.saveState()
        c.setFillColor(NAVY)
        c.rect(-17*mm, -17*mm, A4[0], A4[1], fill=1, stroke=0)
        c.setFillColor(colors.HexColor("#102B55"))
        c.circle(A4[0]-20*mm, A4[1]-35*mm, 62*mm, fill=1, stroke=0)
        c.setFillColor(BLUE)
        c.circle(A4[0]-5*mm, A4[1]-5*mm, 28*mm, fill=1, stroke=0)
        c.setFillColor(PURPLE)
        c.circle(12*mm, 5*mm, 35*mm, fill=1, stroke=0)
        c.setStrokeColor(CYAN)
        c.setLineWidth(2)
        c.line(0, A4[1]-84*mm, A4[0]-50*mm, A4[1]-84*mm)
        c.setFont("Odivon-Bold", 19)
        c.setFillColor(colors.white)
        c.drawString(0, A4[1]-35*mm, "ODIVON")
        c.setFont("Odivon", 8)
        c.setFillColor(CYAN)
        c.drawString(0, A4[1]-42*mm, "BUILDING THE OPERATING LAYER FOR MODERN BUSINESS")
        c.setFont("Odivon-Bold", 29)
        c.setFillColor(colors.white)
        c.drawString(0, A4[1]-103*mm, "SaaS Ürün Stratejisi")
        c.setFont("Odivon-Bold", 19)
        c.setFillColor(colors.HexColor("#BFD6FF"))
        c.drawString(0, A4[1]-116*mm, "Global Fırsatlar ve Ürün Yol Haritası")
        c.setFont("Odivon", 10.5)
        c.setFillColor(colors.HexColor("#D5E2F6"))
        text = c.beginText(0, A4[1]-139*mm)
        text.setLeading(16)
        for line in [
            "Odivon için önerilen 100+ SaaS ürününün konsolide analizi",
            "Dikey ürün aileleri, MVP kapsamları, satış modeli ve teknik mimari",
            "Türkiye, Avrupa ve küresel büyüme perspektifi"
        ]:
            text.textLine(line)
        c.drawText(text)
        c.setFillColor(colors.HexColor("#0E2345"))
        c.roundRect(0, 32*mm, 106*mm, 24*mm, 4*mm, fill=1, stroke=0)
        c.setFillColor(colors.white)
        c.setFont("Odivon-Bold", 9)
        c.drawString(7*mm, 46*mm, "STRATEJİ RAPORU")
        c.setFont("Odivon", 8.5)
        c.setFillColor(colors.HexColor("#BDD0EC"))
        c.drawString(7*mm, 38*mm, "22 Ekim 2026 • İstanbul")
        c.restoreState()


def P(text, style="BodyTR"):
    return Paragraph(esc(text), styles[style])


def rich(text, style="BodyTR"):
    return Paragraph(text, styles[style])


def heading(text, level=1):
    return Paragraph(esc(text), styles["H1TR" if level == 1 else "H2TR"])


def bullet_list(items, style="BodyTR"):
    rows = []
    for item in items:
        rows.append(Paragraph("<font color='#2563EB'>●</font> " + esc(item), styles[style]))
    return rows


def callout(title, body, color=BLUE):
    data = [[Paragraph(esc(title), styles["H3TR"])], [Paragraph(esc(body), styles["Callout"])]]
    t = Table(data, colWidths=[171*mm], hAlign="LEFT")
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), colors.HexColor("#EEF5FF")),
        ("BOX", (0,0), (-1,-1), 0.8, color),
        ("LINEBEFORE", (0,0), (0,-1), 4, color),
        ("LEFTPADDING", (0,0), (-1,-1), 10),
        ("RIGHTPADDING", (0,0), (-1,-1), 10),
        ("TOPPADDING", (0,0), (-1,-1), 7),
        ("BOTTOMPADDING", (0,0), (-1,-1), 7),
    ]))
    return t


def product_table(products):
    data = [[P("Ürün", "TableHead"), P("Hedef müşteri ve temel değer", "TableHead"),
             P("MVP kapsamı", "TableHead"), P("P/Z", "TableHead")]]
    for p in products:
        data.append([
            P(p[0], "TableCellBold"),
            P(f"{p[1]} — {p[2]}", "TableCell"),
            P(p[3], "TableCell"),
            P(f"{p[4]} / {p[5]}", "TableCell")
        ])
    t = Table(data, colWidths=[31*mm, 55*mm, 69*mm, 16*mm], repeatRows=1, hAlign="LEFT")
    commands = [
        ("BACKGROUND", (0,0), (-1,0), NAVY),
        ("VALIGN", (0,0), (-1,-1), "TOP"),
        ("GRID", (0,0), (-1,-1), 0.35, LINE),
        ("LEFTPADDING", (0,0), (-1,-1), 5),
        ("RIGHTPADDING", (0,0), (-1,-1), 5),
        ("TOPPADDING", (0,0), (-1,-1), 5),
        ("BOTTOMPADDING", (0,0), (-1,-1), 5),
    ]
    for i in range(1, len(data)):
        commands.append(("BACKGROUND", (0,i), (-1,i), colors.white if i % 2 else LIGHT))
    t.setStyle(TableStyle(commands))
    return t


catalog = {
"Mevzuat, ihracat ve uyumluluk ürünleri": [
    ("OdivonCarbon", "AB ihracatçıları", "CBAM emisyon verisini ve raporlamasını yönetir.", "Tesis, ürün, tedarikçi, sevkiyat, emisyon hesabı, rapor.", "Çok yüksek", "Orta"),
    ("OdivonAIGovernance", "AI kullanan şirketler", "Yapay zekâ envanteri, risk ve denetim kanıtı sağlar.", "Model envanteri, risk sınıfı, politika, olay ve onay akışı.", "Çok yüksek", "Orta"),
    ("OdivonTrace", "Üretici ve ihracatçılar", "Ürün pasaportu ve tedarik zinciri izlenebilirliği sunar.", "QR pasaport, malzeme ağacı, sertifika, parti ve tedarikçi.", "Çok yüksek", "Yüksek"),
    ("OdivonSecureChain", "Kurumsal şirketler", "NIS2/DORA tedarikçi güvenlik süreçlerini yönetir.", "Anket, kanıt kasası, risk puanı, iyileştirme, rapor.", "Yüksek", "Orta"),
    ("OdivonCyberReady", "Yazılım ve donanım üreticileri", "Cyber Resilience Act hazırlığı sağlar.", "SBOM, açık yönetimi, destek süresi, olay ve kanıt paketi.", "Çok yüksek", "Orta"),
    ("OdivonBatteryPass", "Batarya üreticileri", "Batarya dijital pasaportu ve yaşam döngüsü kaydı tutar.", "Kimlik, malzeme, karbon, sağlık, bakım, geri dönüşüm.", "Çok yüksek", "Yüksek"),
    ("OdivonPackage", "Marka ve ambalaj üreticileri", "Ambalaj bileşimi ve PPWR/EPR yükümlülüklerini yönetir.", "Bileşen ağacı, madde, geri dönüşüm, etiket, beyan.", "Çok yüksek", "Orta"),
    ("OdivonMedReg", "Medikal cihaz firmaları", "MDR/IVDR ve EUDAMED operasyonunu düzenler.", "UDI, cihaz, aktör, sertifika, PMS ve teknik dosya.", "Çok yüksek", "Yüksek"),
    ("OdivonBuildPass", "Yapı malzemesi üreticileri", "Yapı ürünü dijital pasaportu ve CE dosyası sağlar.", "DoPC, test, teknik doküman, QR, ürün varyantı.", "Yüksek", "Orta-yüksek"),
    ("OdivonTaxFlow", "Uluslararası şirketler", "Çok ülkeli e-fatura ve dijital vergi raporlaması sunar.", "UBL/XML, ülke profili, doğrulama, arşiv, API.", "Çok yüksek", "Yüksek"),
    ("OdivonAccess", "E-ticaret ve hizmet şirketleri", "Dijital erişilebilirlik çalışmalarını sürekli yönetir.", "Tarama, manuel kontrol, görev, kanıt ve beyan.", "Yüksek", "Orta"),
    ("OdivonToyPass", "Oyuncak üreticileri", "Güvenlik dokümanı ve dijital ürün pasaportu sunar.", "Kimyasal belge, test, uyarı, parti, QR pasaport.", "Yüksek", "Orta"),
    ("OdivonChemSafe", "Kimya üreticileri", "Formül, güvenlik bilgi formu ve etiket yönetimi sağlar.", "Madde, reçete, SDS, piktogram, dil, revizyon.", "Çok yüksek", "Orta-yüksek"),
    ("OdivonEmission", "Sanayi tesisleri", "Enerji, su, hammadde, atık ve emisyon raporlar.", "Sayaç verisi, limit, ölçüm, rapor, kanıt.", "Yüksek", "Orta"),
    ("OdivonF-Gas", "Klima ve soğutma firmaları", "F-gaz kayıtlarıyla bakım operasyonunu birleştirir.", "Cihaz, gaz, kaçak, sertifika, servis ve rapor.", "Çok yüksek", "Düşük-orta"),
    ("OdivonRenovation", "Enerji danışmanları", "Bina yenileme pasaportu ve tasarruf senaryosu üretir.", "Bina profili, adımlar, maliyet, enerji ve finansman.", "Yüksek", "Orta"),
    ("OdivonMachineCE", "Makine üreticileri", "CE teknik dosyasını ve uygunluk sürecini yönetir.", "Risk, standart, test, çizim, beyan, revizyon.", "Çok yüksek", "Orta"),
    ("OdivonProductSafe", "Üretici ve ithalatçılar", "GPSR ürün güvenliği kayıtlarını merkezileştirir.", "Risk, test, sorumlu kişi, uyarı, olay ve geri çağırma.", "Çok yüksek", "Orta"),
    ("OdivonConnectedData", "Bağlantılı ürün üreticileri", "Kullanıcı veri erişimi ve paylaşım izinlerini yönetir.", "Cihaz, sahiplik, izin, API, dışa aktarım, log.", "Çok yüksek", "Orta-yüksek"),
    ("OdivonPayFair", "100+ çalışanlı şirketler", "Ücret şeffaflığı ve fark analizini kolaylaştırır.", "İş değeri, bant, fark analizi, talep ve rapor.", "Çok yüksek", "Düşük-orta"),
    ("OdivonAMLDesk", "Finans, emlak ve muhasebe", "KYC/AML müşteri kabul ve risk süreçlerini yönetir.", "Kimlik, faydalanıcı, risk, tarama, inceleme, kanıt.", "Çok yüksek", "Orta"),
    ("OdivonPrivacyOps", "KOBİ ve hukuk danışmanları", "KVKK/GDPR günlük operasyonunu düzenler.", "Envanter, başvuru, ihlal, saklama, tedarikçi.", "Yüksek", "Orta"),
    ("OdivonExportControl", "Teknoloji ve makine ihracatçıları", "Yaptırım ve ihracat kontrol kanıtını toplar.", "Taraf, ülke, ürün sınıfı, lisans, onay, log.", "Yüksek", "Orta"),
    ("OdivonImport", "İthalatçı ve gümrükçüler", "Ürün bazlı ithalat uygunluk belgelerini takip eder.", "GTİP, belge, CE, tedarikçi, sevkiyat kontrolü.", "Yüksek", "Orta"),
],
"Üretim, kalite ve ürün yaşam döngüsü": [
    ("OdivonQMS", "Fabrika ve laboratuvarlar", "Kalite süreçlerini ve ISO kanıtlarını yönetir.", "CAPA, uygunsuzluk, denetim, kalibrasyon, doküman.", "Yüksek", "Orta"),
    ("OdivonRecall", "Üretici ve perakendeciler", "Problemli ürünleri parti ve müşteriye kadar izler.", "Parti, dağıtım, bildirim, geri toplama, imha.", "Yüksek", "Orta"),
    ("OdivonWarranty", "Üretici ve distribütörler", "Garanti ve satış sonrası hizmeti yönetir.", "Seri no, servis, parça, değişim, bayi ödemesi.", "Yüksek", "Orta"),
    ("OdivonRepairNet", "Üretici ve servis ağları", "Çok markalı tamir ve yedek parça ekosistemi kurar.", "Ürün, teşhis, teklif, servis, parça, garanti.", "Çok yüksek", "Orta"),
    ("OdivonDigitalManual", "Makine ve cihaz üreticileri", "QR tabanlı çok dilli dijital kılavuz sunar.", "Model, dil, revizyon, video, güvenlik, arşiv.", "Yüksek", "Düşük"),
    ("OdivonProductLiability", "Üreticiler", "Ürün sorumluluğu olay ve kanıt dosyası oluşturur.", "Ürün, olay, kusur, doküman, taraf, aksiyon.", "Yüksek", "Düşük-orta"),
    ("OdivonMicroMES", "KOBİ üreticiler", "Sade iş emri ve üretim yürütme sistemi sağlar.", "İş emri, operasyon, adet, fire, duruş, kalite.", "Çok yüksek", "Orta"),
    ("OdivonMachineTwin", "Fabrikalar", "Makine verisini performans ve bakım görünümüne çevirir.", "Varlık, durum, alarm, enerji, bakım, kıyaslama.", "Çok yüksek", "Yüksek"),
    ("OdivonLab", "Test laboratuvarları", "Numuneden rapora sade LIMS sunar.", "Numune, barkod, test, cihaz, sonuç, rapor.", "Yüksek", "Orta"),
    ("OdivonDentalLab", "Diş laboratuvarları", "Klinikten üretime vaka ve teslim sürecini yönetir.", "Vaka, dosya, materyal, aşama, onay, kurye.", "Yüksek", "Düşük-orta"),
    ("OdivonSupplierHub", "Üretici ve zincir firmalar", "Tedarikçi kabulü ve belge yenilemesini kolaylaştırır.", "Başvuru, belge, onay, puan, aksiyon, portal.", "Çok yüksek", "Düşük-orta"),
    ("OdivonSkillMatrix", "Üretim ve hizmet şirketleri", "Yetkinliği görev ve pozisyonlarla eşleştirir.", "Rol, beceri, eğitim, belge, boşluk, yenileme.", "Yüksek", "Düşük"),
    ("OdivonContainer", "Kasa, tüp ve palet filoları", "Tekrar kullanılabilir varlık dolaşımını izler.", "Varlık, teslim, depozito, iade, hasar, bakiye.", "Yüksek", "Düşük-orta"),
],
"Saha hizmetleri, enerji ve tesis operasyonları": [
    ("OdivonFieldOps", "Teknik servis firmaları", "Saha ekiplerini, bakımı ve servis kanıtını yönetir.", "Plan, rota, görev, form, parça, imza, rapor.", "Yüksek", "Orta"),
    ("OdivonFireSafe", "Yangın güvenliği firmaları", "Ekipman ve periyodik kontrol geçmişini tutar.", "Bina, cihaz, kontrol, uygunsuzluk, sertifika.", "Çok yüksek", "Düşük-orta"),
    ("OdivonLiftCare", "Asansör bakım firmaları", "Bakım, arıza ve bina yöneticisi iletişimini yönetir.", "Asansör, bakım, çağrı, parça, sözleşme, portal.", "Yüksek", "Düşük-orta"),
    ("OdivonSolarOps", "Güneş enerjisi firmaları", "Tekliften bakım ve üretim takibine operasyon sağlar.", "Keşif, teklif, kurulum, garanti, bakım, portal.", "Çok yüksek", "Orta"),
    ("OdivonWater", "Fabrika, otel ve tesisler", "Su tüketimi, izin ve tasarruf hedeflerini yönetir.", "Sayaç girişi, tüketim, analiz, izin, rapor.", "Yüksek", "Düşük-orta"),
    ("OdivonWasteFlow", "Atık yönetim firmaları", "Atığı oluşumdan geri dönüşüme kadar izler.", "Atık kodu, tartım, taşıyıcı, teslim, kanıt.", "Yüksek", "Orta"),
    ("OdivonColdChain", "Gıda ve ilaç lojistiği", "Soğuk zincir olay ve kalite kayıtlarını yönetir.", "Sevkiyat, sıcaklık dosyası, limit, olay, kanıt.", "Çok yüksek", "Orta"),
    ("OdivonPestControl", "İlaçlama şirketleri", "Tuzak, ziyaret ve denetim raporlarını düzenler.", "Tesis, nokta, ziyaret, ilaç, trend, rapor.", "Yüksek", "Düşük"),
    ("OdivonCleaning", "Temizlik firmaları", "Tekrarlayan işleri ve saha kalitesini yönetir.", "Adres, plan, çalışan, liste, fotoğraf, onay.", "Yüksek", "Düşük"),
    ("OdivonPermit", "Fabrika ve şantiyeler", "Riskli işlerin dijital izin ve onay sürecini kurar.", "İzin türü, risk, önlem, onay, kapatma, log.", "Çok yüksek", "Düşük-orta"),
    ("OdivonContractorPass", "Büyük tesisler", "Taşeron ve çalışan uygunluğunu kontrol eder.", "Firma, çalışan, belge, eğitim, giriş, risk.", "Yüksek", "Düşük-orta"),
    ("OdivonVenueSafe", "Stadyum ve etkinlik alanları", "Etkinlik öncesi güvenlik ve operasyon kontrolü sağlar.", "Alan, görev, kontrol, olay, ekip, rapor.", "Yüksek", "Düşük-orta"),
    ("OdivonChargeFleet", "Elektrikli araç filoları", "Araçların zaman ve maliyete göre şarj planını yönetir.", "Araç, plan, tarife, istasyon, maliyet, rapor.", "Çok yüksek", "Orta"),
    ("OdivonEnergyCommunity", "Site ve enerji kooperatifleri", "Ortak üretim ve enerji paylaşımını yönetir.", "Üye, üretim, tüketim, paylaştırma, mutabakat.", "Yüksek", "Orta"),
],
"Lojistik, ticaret, denizcilik ve mobil operasyon": [
    ("OdivonCargoDocs", "Nakliyeci ve lojistikçiler", "Elektronik taşıma belgelerini merkezileştirir.", "Sevkiyat, e-CMR, QR erişim, imza, belge API.", "Çok yüksek", "Orta"),
    ("OdivonADR", "Tehlikeli madde taşıyıcıları", "ADR belge, sürücü ve araç uygunluğu sağlar.", "UN sınıfı, araç, sürücü, evrak, acil durum.", "Çok yüksek", "Orta"),
    ("OdivonTradeDocs", "İhracatçılar", "İhracat ve akreditif belgelerini tutarlı hale getirir.", "Fatura, çeki, menşe, akreditif, kontrol, paylaşım.", "Çok yüksek", "Düşük-orta"),
    ("OdivonClaims", "Nakliye ve sigorta firmaları", "Hasar ihbarından tazminat ve rücuya dosya yönetir.", "İhbar, kanıt, eksper, rezerv, ödeme, rücu.", "Yüksek", "Düşük-orta"),
    ("OdivonMaritime", "Gemi sahipleri", "Yakıt, emisyon ve sefer uyumluluğunu yönetir.", "Gemi, sefer, liman, yakıt, emisyon, rapor.", "Çok yüksek", "Yüksek"),
    ("OdivonCrew", "Denizcilik şirketleri", "Mürettebat planı ve belge sürelerini yönetir.", "Personel, gemi, sertifika, kontrat, seyahat, bordro.", "Yüksek", "Orta"),
    ("OdivonMarina", "Marina ve yat işletmeleri", "Bağlama, sayaç, bakım ve sözleşme yönetimi sağlar.", "Tekne, yer, sözleşme, hizmet, sayaç, portal.", "Yüksek", "Düşük-orta"),
    ("OdivonDroneOps", "Ticari drone işletmeleri", "Filo, pilot, uçuş ve izin operasyonunu düzenler.", "Drone, pilot, görev, risk, izin, bakım, kayıt.", "Yüksek", "Orta"),
    ("OdivonSelfStorage", "Depolama işletmeleri", "Birim, sözleşme, doluluk ve tahsilatı yönetir.", "Alan, müşteri, sözleşme, fatura, erişim kaydı.", "Yüksek", "Düşük"),
],
"Gıda, perakende ve tüketici hizmetleri": [
    ("OdivonFoodSafe", "Gıda üreticisi ve zincirler", "HACCP, hijyen ve parti izlenebilirliğini yönetir.", "Plan, sıcaklık girişi, temizlik, alerjen, geri çağırma.", "Yüksek", "Orta"),
    ("OdivonFoodLabel", "Gıda üreticileri", "Reçeteden çok dilli doğru etiket üretir.", "Reçete, besin değeri, alerjen, beyan, revizyon.", "Çok yüksek", "Düşük-orta"),
    ("OdivonWholesale", "Üretici ve toptancılar", "Bayilerin dijital katalogdan sipariş vermesini sağlar.", "Bayi, fiyat, katalog, sipariş, bakiye, kampanya.", "Çok yüksek", "Orta"),
    ("OdivonReturns", "E-ticaret firmaları", "İade ve değişim sürecini müşteriye görünür kılar.", "Başvuru, neden, fotoğraf, onay, kargo, ödeme.", "Yüksek", "Düşük"),
    ("OdivonMarketplaceTrust", "Pazaryerleri", "Satıcı kabulü ve ürün güvenliği kontrolü sunar.", "Satıcı, belge, ürün, risk, ilan, şikâyet.", "Yüksek", "Orta"),
    ("OdivonFranchise", "Zincir işletmeler", "Şube standartları ve denetimini merkezileştirir.", "Şube, denetim, görev, eğitim, sözleşme, KPI.", "Yüksek", "Düşük-orta"),
    ("OdivonFeedback", "Hizmet işletmeleri", "Memnuniyeti toplar ve olumsuz yanıtı göreve çevirir.", "Anket, NPS, şube, bildirim, görev, rapor.", "Yüksek", "Çok düşük"),
    ("OdivonEvent", "Organizasyon firmaları", "Tekliften etkinlik gününe tüm planı yönetir.", "Müşteri, paket, sözleşme, görev, tedarikçi, ödeme.", "Yüksek", "Düşük"),
    ("OdivonSubscription", "Abonelikle çalışan işletmeler", "Paket, yenileme ve tahsilat görünürlüğü sağlar.", "Plan, müşteri, dönem, yenileme, uyarı, rapor.", "Yüksek", "Düşük"),
],
"Genel KOBİ iş akışı ve profesyonel hizmetler": [
    ("OdivonFlow", "Tüm KOBİ'ler", "Form, kontrol listesi ve onay süreçlerini dijitalleştirir.", "Form kurucu, görev, onay, dosya, PDF, rapor.", "Çok yüksek", "Düşük"),
    ("OdivonTeklif", "Hizmet ve ürün satan KOBİ'ler", "Teklif hazırlama ve satışa dönüşüm takibi sağlar.", "Şablon, katalog, PDF, bağlantı, kabul, revizyon.", "Çok yüksek", "Düşük"),
    ("OdivonClient", "Ajans, danışman ve muhasebeciler", "Markalı müşteri portalı ve güvenli dosya alanı sunar.", "Portal, mesaj, dosya, görev, teklif, rapor.", "Çok yüksek", "Düşük"),
    ("OdivonDesk", "Destek ekipleri", "Müşteri taleplerini tek kuyrukta yönetir.", "Talep, kategori, atama, SLA, portal, bilgi bankası.", "Yüksek", "Düşük"),
    ("OdivonStaff", "KOBİ insan kaynakları", "İzin, vardiya ve personel taleplerini yönetir.", "Çalışan, izin, vardiya, masraf, belge, duyuru.", "Çok yüksek", "Düşük"),
    ("OdivonDocs", "Tüm işletmeler", "Belge, lisans ve sözleşme sürelerini hatırlatır.", "Belge, tarih, sorumlu, bildirim, yenileme, rapor.", "Yüksek", "Çok düşük"),
    ("OdivonRecruit", "KOBİ ve İK danışmanları", "Adayı ilandan teklife kadar takip eder.", "İlan, aday, aşama, görüşme, not, teklif.", "Yüksek", "Düşük"),
    ("OdivonTraining", "Şirket ve eğitim sağlayıcıları", "Eğitim, sınav ve sertifika takibi sağlar.", "İçerik, atama, sınav, ilerleme, sertifika.", "Yüksek", "Düşük"),
    ("OdivonAgency", "Dijital ajanslar", "İçerik, revizyon ve müşteri onayını düzenler.", "Takvim, dosya, yorum, onay, kota, rapor.", "Yüksek", "Düşük"),
    ("OdivonLegal", "Avukatlık büroları", "Dosya, duruşma, belge ve müvekkil portalı sağlar.", "Dosya, taraf, takvim, görev, belge, tahsilat.", "Yüksek", "Düşük-orta"),
    ("OdivonAudit", "İç denetim ekipleri", "Bulgu ve düzeltici faaliyetlerin kapanışını izler.", "Plan, kontrol, bulgu, aksiyon, kanıt, rapor.", "Yüksek", "Düşük"),
    ("OdivonApproval", "Tüm işletmeler", "Satın alma, masraf ve yönetim onaylarını hızlandırır.", "Talep, kural, çoklu onay, yorum, bildirim, log.", "Çok yüksek", "Düşük"),
    ("OdivonContract", "Kurumsal ve KOBİ", "Sözleşme yükümlülüğü ve yenileme tarihlerini takip eder.", "Sözleşme, taraf, madde, görev, tarih, uyarı.", "Çok yüksek", "Düşük"),
    ("OdivonTender", "B2B satış ekipleri", "İhale fırsatından teklif teslimine süreci yönetir.", "Fırsat, şartname, belge, görev, onay, sonuç.", "Yüksek", "Düşük-orta"),
    ("OdivonGrant", "Teşvik danışmanları", "Fon başvurusu ve müşteri belgelerini yönetir.", "Program, uygunluk, belge, görev, bütçe, rapor.", "Yüksek", "Düşük"),
    ("OdivonIncident", "Kurumsal şirketler", "İş, güvenlik ve operasyon olaylarını yönetir.", "İhbar, sınıf, ekip, aksiyon, kök neden, rapor.", "Yüksek", "Düşük-orta"),
    ("OdivonCredential", "Eğitim ve İK kuruluşları", "Doğrulanabilir dijital sertifika sunar.", "Sertifika, QR, süre, iptal, doğrulama, API.", "Yüksek", "Düşük-orta"),
    ("OdivonIdentityBridge", "Kimlik doğrulayan işletmeler", "Dijital kimlik ve belge doğrulama katmanı sağlar.", "Kimlik, belge, izin, imza, doğrulama, log.", "Çok yüksek", "Orta"),
    ("OdivonAgeGate", "Yaş sınırlı platformlar", "Kimlik açıklamadan yaş eşiği doğrular.", "İstek, kanıt, eşik, onay, kayıt, API.", "Yüksek", "Orta"),
    ("OdivonCloudExit", "SaaS sağlayıcıları", "Makine okunabilir veri aktarımı ve silme kanıtı sağlar.", "Dışa aktarım, şema, aktarım, silme, log.", "Yüksek", "Orta"),
],
"Sağlık, bakım, çocuk ve eğitim dikeyleri": [
    ("OdivonDiet", "Diyetisyenler", "Danışan, program ve ilerleme takibini birleştirir.", "Anamnez, ölçüm, plan, tarif, paket, portal.", "Çok yüksek", "Düşük"),
    ("OdivonKids", "Kreş ve anaokulları", "Kurum ile veli arasında günlük güvenli iletişim kurar.", "Çocuk, veli, günlük akış, gelişim, ödeme, portal.", "Çok yüksek", "Düşük-orta"),
    ("OdivonTherapy", "Psikolog ve danışmanlar", "Seans, not, form ve paket yönetimi sağlar.", "Danışan, randevu, seans, ölçek, onam, ödeme.", "Çok yüksek", "Düşük-orta"),
    ("OdivonPhysio", "Fizyoterapistler", "Tedavi hedefi, seans ve ev egzersizi takibi yapar.", "Değerlendirme, hedef, seans, egzersiz, ilerleme.", "Yüksek", "Düşük"),
    ("OdivonSpeech", "Konuşma terapistleri", "Terapi hedefi ve veli ev çalışmalarını yönetir.", "Hedef, seans, medya, ödev, veli, rapor.", "Yüksek", "Düşük"),
    ("OdivonRehab", "Özel eğitim merkezleri", "Çok disiplinli bireysel eğitim planı sunar.", "Öğrenci, uzman, hedef, seans, gelişim, veli.", "Çok yüksek", "Orta"),
    ("OdivonMother", "Gebe ve emzirme danışmanları", "Eğitim, görüşme ve anne-bebek takibini düzenler.", "Profil, hafta, eğitim, kontrol listesi, günlük.", "Yüksek", "Düşük"),
    ("OdivonClinic", "Küçük klinikler", "Hafif hasta, randevu ve klinik belge yönetimi sağlar.", "Hasta, randevu, not, dosya, onam, tahsilat.", "Çok yüksek", "Orta"),
    ("OdivonDental", "Diş klinikleri", "Tedavi planı ve tahsilatı hasta portalına bağlar.", "Diş şeması, plan, randevu, taksit, dosya.", "Çok yüksek", "Orta"),
    ("OdivonCare", "Evde bakım ve yaşlı bakım", "Bakım planı, ziyaret ve aile iletişimini yönetir.", "Danışan, bakım görevi, ziyaret, not, aile, fatura.", "Yüksek", "Orta"),
    ("OdivonWellness", "Yaşam koçları ve wellness", "Program, hedef ve danışan bağlılığını yönetir.", "Profil, hedef, program, günlük, paket, portal.", "Yüksek", "Düşük"),
    ("OdivonPodiatry", "Ayak sağlığı merkezleri", "Seans, bakım planı ve fotoğraflı takip sağlar.", "Danışan, değerlendirme, plan, seans, fotoğraf.", "Yüksek", "Düşük"),
    ("OdivonOccupational", "OSGB ve işyeri hekimleri", "Çalışan sağlık ve muayene süreçlerini yönetir.", "Çalışan, muayene, belge, periyot, uyarı, rapor.", "Yüksek", "Orta-yüksek"),
    ("OdivonChildDevelopment", "Çocuk gelişim uzmanları", "Gözlem, hedef ve veli geri bildirimini düzenler.", "Çocuk, gözlem, hedef, etkinlik, ilerleme, portal.", "Yüksek", "Düşük"),
    ("OdivonHealthBridge", "Sağlık yazılımı üreticileri", "Sağlık verisi birlikte çalışabilirlik katmanı sağlar.", "FHIR, özet, reçete, laboratuvar, izin, log.", "Çok yüksek", "Yüksek"),
    ("OdivonClinicalSite", "Klinik araştırma merkezleri", "Protokol ve merkez operasyonunu yönetir.", "Çalışma, ziyaret, belge, sapma, görev, ödeme.", "Çok yüksek", "Yüksek"),
],
"Niş fakat kalıcı dikeyler": [
    ("OdivonFuneral", "Cenaze ve mezarlık işletmeleri", "Parsel, hizmet ve aile iletişimini yönetir.", "Mezar, hak sahibi, organizasyon, ödeme, portal.", "Orta-yüksek", "Düşük"),
    ("OdivonLaundry", "Endüstriyel çamaşırhaneler", "Tekstil dolaşımı, kayıp ve müşteri maliyetini izler.", "Tekstil, toplama, yıkama, hasar, teslim, rota.", "Yüksek", "Düşük-orta"),
    ("OdivonPestControl", "İlaçlama firmaları", "Periyodik hizmet ve denetim raporlarını ürünleştirir.", "Tesis, nokta, ziyaret, gözlem, trend, rapor.", "Yüksek", "Düşük"),
    ("OdivonMarina", "Marina ve yat limanları", "Bağlama, hizmet ve müşteri sözleşmelerini yönetir.", "Tekne, yer, sayaç girişi, hizmet, sözleşme.", "Yüksek", "Düşük-orta"),
    ("OdivonAgency", "Ajanslar", "Müşteri onayı ve revizyon döngüsünü hızlandırır.", "İçerik, takvim, revizyon, onay, rapor.", "Yüksek", "Düşük"),
],
}


deep_dives = [
    {
        "name":"OdivonDiet", "tag":"Hızlı MVP • Yüksek talep • Sağlık dikeyi",
        "promise":"Diyetisyenin danışan kabulünden beslenme planına, paket takibinden ilerleme raporuna kadar bütün günlük işini tek ekranda toplar.",
        "buyer":"Bağımsız diyetisyen, beslenme kliniği, spor merkezi içindeki diyetisyen, kurumsal wellness sağlayıcısı.",
        "pain":"Excel, PDF, WhatsApp ve takvim arasında dağılan danışan bilgileri; plan revizyonlarının kaybolması; paket ve seans haklarının takip edilememesi.",
        "mvp":"Danışan ve anamnez, manuel ölçümler, gelişim grafiği, beslenme planı şablonları, tarifler, randevu, paket/seans, ödeme durumu, danışan portalı ve PDF çıktısı.",
        "model":"Uzman başına abonelik + aktif danışan kotası. Klinik paketinde çoklu uzman, şube ve marka özelleştirmesi.",
        "edge":"OdivonAPM ile randevu; OdivonFaturaPro ile tahsilat/fatura; OdivonFlow ile anamnez ve haftalık değerlendirme formları.",
    },
    {
        "name":"OdivonKids", "tag":"Kalıcı abonelik • Veli deneyimi • Kurumsal büyüme",
        "promise":"Kreşin günlük operasyonunu düzenlerken velinin çocuğunun günüyle ilgili güvenli ve düzenli bilgi almasını sağlar.",
        "buyer":"Kreş, anaokulu, gündüz bakımevi, oyun grubu ve çok şubeli erken çocukluk eğitim markası.",
        "pain":"Günlük beslenme, uyku ve etkinlik bilgisinin dağınık iletilmesi; izin/onamların kaybolması; aidat, sınıf ve öğretmen planının ayrı dosyalarda tutulması.",
        "mvp":"Çocuk/veli profili, yetkili teslim alan kişiler, sınıf, günlük akış, yemek/uyku notu, gelişim gözlemi, duyuru, fotoğraf izni, ücret/taksit ve veli portalı.",
        "model":"Aktif çocuk sayısına göre aylık abonelik. Veli uygulaması, çoklu şube ve markalı portal üst paketlerde.",
        "edge":"Kullanımı kolay günlük rapor, minimum veri toplama, fotoğraf izinleri ve farklı uzmanların yetkili çalışması.",
    },
    {
        "name":"OdivonFlow", "tag":"En kolay çekirdek ürün • Tüm sektörlere satılabilir",
        "promise":"Kâğıt, Excel ve mesajlarla yürüyen form, kontrol listesi ve onay süreçlerini kod yazmadan dijitalleştirir.",
        "buyer":"10-250 çalışanlı işletmeler, zincir mağazalar, danışmanlar ve Odivon ürün müşterileri.",
        "pain":"Talep ve denetim kayıtlarının kaybolması; kimin onaylayacağının belirsiz olması; takip ve kanıt eksikliği.",
        "mvp":"Form kurucu, koşullu alanlar, görev/son tarih, tek veya çok adımlı onay, dosya/fotoğraf, PDF, bildirim ve temel gösterge paneli.",
        "model":"Kullanıcı veya aylık form gönderimi bazlı. Sektörel şablon paketleri ek gelir yaratır.",
        "edge":"Odivon ürünlerinin tamamında ortak form/onay motoru olarak kullanılır; geliştirme yatırımı portföye yayılır.",
    },
    {
        "name":"OdivonClient", "tag":"Düşük teknik risk • Hızlı satış",
        "promise":"Profesyonel hizmet firmalarının müşterileriyle belge, görev, rapor ve mesajları markalı tek bir portalda paylaşmasını sağlar.",
        "buyer":"Muhasebeciler, ajanslar, danışmanlar, yazılım firmaları, hukuk ve insan kaynakları büroları.",
        "pain":"E-posta ve mesajlarda kaybolan dosyalar; müşterinin işin hangi aşamada olduğunu görememesi; tekrarlayan durum soruları.",
        "mvp":"Müşteri çalışma alanı, belge talebi, görev, durum, mesaj, duyuru, teklif/sözleşme, rapor paylaşımı ve marka/alan adı ayarı.",
        "model":"Firma + aktif müşteri sayısı. Beyaz etiket ve özel alan adı üst paketlerde.",
        "edge":"OdivonDocs ve OdivonDesk ile birleştiğinde hizmet şirketleri için güçlü bir işletim katmanı olur.",
    },
    {
        "name":"OdivonCarbon", "tag":"İhracat odaklı • Yüksek ödeme isteği",
        "promise":"AB’ye ihracat yapan üreticinin CBAM verisini tedarikçilerden toplar, hesaplar ve denetime hazır raporlar.",
        "buyer":"Demir-çelik, alüminyum, çimento, gübre ve ilgili ithalat/ihracat danışmanları.",
        "pain":"Dağınık tedarikçi verisi, farklı hesaplama yöntemleri, eksik kanıt ve rapor dönemlerinde yoğun manuel çalışma.",
        "mvp":"Firma/tesis/ürün, tedarikçi portalı, emisyon girişi, hesaplama şablonları, sevkiyat, belge kasası ve rapor.",
        "model":"Firma aboneliği + tesis/tedarikçi/sevkiyat kotası. Danışmanlar için çok müşterili paket.",
        "edge":"OdivonTrace ve OdivonEmission ile aynı veri modelini kullanarak çapraz satış üretir.",
    },
    {
        "name":"OdivonAIGovernance", "tag":"Küresel SaaS • RegTech",
        "promise":"Şirketin kullandığı AI sistemlerini, risklerini, tedarikçilerini ve insan gözetimini kanıtlarıyla yönetir.",
        "buyer":"AI kullanan KOBİ/kurumsal şirketler, danışmanlık ve denetim firmaları.",
        "pain":"Hangi departmanın hangi AI aracına hangi veriyi gönderdiğinin bilinmemesi; politika ve risk kanıtlarının denetim öncesi üretilememesi.",
        "mvp":"AI envanteri, kullanım amacı, risk sınıfı, tedarikçi, değerlendirme, politika, eğitim, olay ve denetim paketi.",
        "model":"Organizasyon + AI sistemi sayısı. Danışman paneli ve gelişmiş raporlar üst paket.",
        "edge":"OdivonFlow onayları ve OdivonTraining eğitimleriyle güçlü ortak çekirdek.",
    },
    {
        "name":"OdivonCyberReady", "tag":"Zorunluluk kaynaklı talep • Teknik B2B",
        "promise":"Dijital ürün üreticisinin ürün güvenliği, açık yönetimi ve olay bildirim sürecini denetime hazır hale getirir.",
        "buyer":"SaaS, mobil uygulama, IoT, endüstriyel yazılım ve elektronik ürün üreticileri.",
        "pain":"SBOM, açık, destek süresi ve güvenlik olaylarının farklı sistemlerde tutulması; ürün bazında kanıt üretilememesi.",
        "mvp":"Ürün/sürüm, bileşen/SBOM, açık, risk, destek süresi, yama, olay, bildirim zamanlayıcısı ve rapor.",
        "model":"Ürün veya aktif sürüm sayısına göre abonelik; kurumsal API ve SSO ek paket.",
        "edge":"Önce Odivon ürünlerinde kullanılarak gerçek referans ve süreç olgunluğu kazanır.",
    },
    {
        "name":"OdivonMachineCE", "tag":"Türkiye sanayisine uygun • Orta zorluk",
        "promise":"Makine üreticisinin risk değerlendirmesi, standartları, testleri, dijital kılavuzu ve uygunluk beyanını tek teknik dosyada toplar.",
        "buyer":"Makine, otomasyon hattı, kaldırma ekipmanı ve üretim ekipmanı imalatçıları.",
        "pain":"Teknik dosya sürümlerinin dağılması; eski standart kullanımı; müşteri veya denetçi talebinde güncel belgenin bulunamaması.",
        "mvp":"Ürün/model, risk tablosu, standart, kontrol tedbiri, test, çizim/dosya, onay, beyan ve revizyon.",
        "model":"Firma + aktif makine ailesi. Danışmanlık firmaları için çok müşterili sürüm.",
        "edge":"DigitalManual, ProductSafe ve CyberReady modülleriyle OdivonProductOS ailesinin başlangıcı olur.",
    },
    {
        "name":"OdivonCargoDocs", "tag":"İhracat ve lojistik • Avrupa açılımı",
        "promise":"Taşıma bilgisi ve belgelerini sevkiyat bazında tek güvenli dosyada toplar; taraflar ve denetim makamları için kontrollü paylaşım sağlar.",
        "buyer":"Karayolu nakliyecisi, lojistik şirketi, freight forwarder ve ihracatçı.",
        "pain":"Belge tekrarları, farklı taraflardaki tutarsız bilgi, imza ve teslim kanıtının kaybolması.",
        "mvp":"Sevkiyat, taraflar, araç/sürücü, e-CMR benzeri belge, QR erişim, imza, teslim kanıtı, revizyon ve dışa aktarım.",
        "model":"Firma aboneliği + aylık sevkiyat sayısı. Taşıyıcı ağı ve API üst paketlerde.",
        "edge":"TradeDocs, ADR ve Claims modülleriyle tek OdivonTrade platformuna büyür.",
    },
    {
        "name":"OdivonFoodLabel", "tag":"Cihazsız • Net müşteri faydası",
        "promise":"Gıda reçetesinden doğru içerik sıralaması, alerjen, besin değeri ve çok dilli ürün etiketi üretir.",
        "buyer":"Küçük/orta gıda üreticisi, özel markalı üretici, ihracatçı ve mevzuat danışmanı.",
        "pain":"Formül değişince eski etiketin kullanılması; alerjen ve dil hataları; tasarımcıya manuel veri aktarımı.",
        "mvp":"Hammadde, reçete, besin değeri, alerjen, beyan, dil, etiket metni, versiyon ve onay.",
        "model":"Firma + aktif ürün/SKU sayısı. Ülke/dil paketleri ayrı ücretlenebilir.",
        "edge":"FoodSafe, Package ve Trace ile aynı ürün ve reçete verisini paylaşır.",
    },
    {
        "name":"OdivonPayFair", "tag":"Yalnızca yazılım • Hızlı kurumsal değer",
        "promise":"Şirketlerin eşit işe eşit ücret analizini, ücret bantlarını ve çalışan bilgi taleplerini yönetir.",
        "buyer":"100+ çalışanlı işletmeler, İK danışmanları ve ücret araştırma firmaları.",
        "pain":"Pozisyonların karşılaştırılamaması; farkların sebeplerinin belgelenmemesi; rapor hazırlığının manuel olması.",
        "mvp":"Pozisyon, seviye, iş değeri, ücret/yan hak içe aktarma, fark analizi, açıklama, senaryo ve rapor.",
        "model":"Çalışan sayısına göre yıllık abonelik; danışmanlar için portföy paketi.",
        "edge":"Bordro ürünü olmadan çalışır; CSV ile başlar, daha sonra HRIS entegrasyonu eklenir.",
    },
    {
        "name":"OdivonFireSafe", "tag":"Basit MVP • Yüksek müşteri bağlılığı",
        "promise":"Yangın güvenliği firmasının her bina ve ekipman için kontrol, uygunsuzluk ve sertifika geçmişini tutar.",
        "buyer":"Yangın tüpü, alarm, sprinkler ve acil aydınlatma servisleri.",
        "pain":"Periyodik kontrol tarihlerinin kaçması; sahadan eksik kanıt; müşteriye profesyonel rapor verilememesi.",
        "mvp":"Müşteri/bina, ekipman, kontrol listesi, uygunsuzluk, fotoğraf, teklif, sertifika ve sonraki bakım.",
        "model":"Teknisyen + yönetilen ekipman kotası. Müşteri portalı ve markalı rapor üst paket.",
        "edge":"Özel cihaz gerekmez; telefon tarayıcısı ve isteğe bağlı QR etiketi yeterlidir.",
    },
    {
        "name":"OdivonStaff", "tag":"Geniş KOBİ pazarı • Düşük zorluk",
        "promise":"Bordroya girmeden izin, vardiya, masraf, avans, belge ve çalışan taleplerini sade biçimde yönetir.",
        "buyer":"10-250 çalışanlı hizmet, perakende, üretim ve çok şubeli işletmeler.",
        "pain":"İzin ve vardiyanın mesaj/Excel ile yönetilmesi; bakiyelerin ve onayların tartışmalı hale gelmesi.",
        "mvp":"Çalışan, ekip, izin türü/bakiye, talep/onay, vardiya, masraf, belge ve duyuru.",
        "model":"Aktif çalışan başına abonelik. Çoklu şube ve özel politikalar üst paket.",
        "edge":"OdivonFlow motoru üzerinde hızlı geliştirilebilir; tüm dikey ürünlere personel modülü olur.",
    },
    {
        "name":"OdivonProductSafe", "tag":"E-ticaret ve ihracat • Belge tabanlı",
        "promise":"Tüketici ürününün güvenlik belgelerini, sorumlu tarafını, şikâyetlerini ve düzeltici faaliyetlerini merkezi hale getirir.",
        "buyer":"AB’ye satış yapan üretici, ithalatçı, marka ve pazaryeri satıcısı.",
        "pain":"Her ürün için doğru test, uyarı ve sorumlu kişi bilgisini satış kanallarında güncel tutamama.",
        "mvp":"Ürün/SKU, ekonomik işletmeci, risk, test, talimat, şikâyet, olay, aksiyon ve dosya paketi.",
        "model":"Firma + aktif SKU sayısı; ajans/danışman paneli ayrı paket.",
        "edge":"Trace, Recall, MarketplaceTrust ve DigitalManual ile ortak ürün veri çekirdeği kullanır.",
    },
    {
        "name":"OdivonTherapy", "tag":"Sağlık dikeyi • Düşük teknik zorluk",
        "promise":"Psikolog ve danışmanın randevu, seans, form, onam ve paket süreçlerini mahremiyet odaklı tek sistemde toplar.",
        "buyer":"Bağımsız psikolog, aile danışmanı, terapi merkezi ve psikolojik danışmanlık ofisi.",
        "pain":"Hassas notların genel amaçlı uygulamalarda tutulması; paket/seans, form ve randevunun farklı yerlerde olması.",
        "mvp":"Danışan, randevu, seans notu, ölçek/form, onam, paket, ödeme durumu ve kontrollü portal.",
        "model":"Uzman başına abonelik + aktif danışan. Merkez paketi çoklu uzman ve yönetici raporu sunar.",
        "edge":"Notların danışan portalından ayrı tutulması, ayrıntılı erişim kayıtları ve minimum veri yaklaşımı.",
    },
    {
        "name":"OdivonMicroMES", "tag":"Üretim KOBİ'leri • Yüksek kalıcılık",
        "promise":"Küçük üreticinin iş emri, üretim adedi, fire, duruş ve kalite kayıtlarını ağır ERP projesi olmadan dijitalleştirir.",
        "buyer":"Metal, plastik, mobilya, tekstil ve siparişe göre üretim yapan KOBİ'ler.",
        "pain":"Üretim durumunun vardiya sonunda öğrenilmesi; gerçek fire ve duruş nedeninin görülememesi.",
        "mvp":"Ürün/rota, iş emri, operatör ekranı, adet, fire, duruş, kalite kontrol ve temel rapor.",
        "model":"Tesis + aktif kullanıcı/makine kaydı. OdivonERP üretim modülü olarak da lisanslanabilir.",
        "edge":"İlk sürüm tamamen manuel/tablet girişiyle çalışır; cihaz entegrasyonu zorunlu değildir.",
    },
]


sources = [
    ("EU AI Act uygulama takvimi", "https://ai-act-service-desk.ec.europa.eu/en/ai-act/eu-ai-act-implementation-timeline"),
    ("NIS2 Directive", "https://digital-strategy.ec.europa.eu/en/policies/nis2-directive"),
    ("CBAM", "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en"),
    ("Digital Product Passport", "https://single-market-economy.ec.europa.eu/single-market/digital-product-passport_en"),
    ("EUDR", "https://environment.ec.europa.eu/topics/forests/deforestation/regulation-deforestation-free-products_en"),
    ("Cyber Resilience Act", "https://digital-strategy.ec.europa.eu/en/policies/cra-summary"),
    ("Packaging and Packaging Waste Regulation", "https://environment.ec.europa.eu/topics/waste-and-recycling/packaging-waste_en"),
    ("EUDAMED", "https://health.ec.europa.eu/medical-devices-eudamed/overview_en"),
    ("Machinery Regulation", "https://single-market-economy.ec.europa.eu/sectors/mechanical-engineering/machinery_en"),
    ("EU Data Act", "https://digital-strategy.ec.europa.eu/en/factpages/data-act-explained"),
    ("General Product Safety Regulation", "https://commission.europa.eu/topics/business-and-industry/product-safety_en"),
    ("Pay Transparency", "https://commission.europa.eu/news-and-media/news/new-eu-rules-pay-transparency-explained-2026-06-05_en"),
    ("eFTI Regulation", "https://transport.ec.europa.eu/transport-themes/logistics-and-multimodal-transport/efti-regulation_en"),
    ("FuelEU Maritime", "https://transport.ec.europa.eu/transport-modes/maritime/decarbonising-maritime-transport-fueleu-maritime_en"),
    ("F-gas legislation", "https://climate.ec.europa.eu/areas-action/fluorinated-greenhouse-gases/f-gas-legislation_en"),
    ("European Health Data Space", "https://health.ec.europa.eu/ehealth-digital-health-and-care/european-health-data-space-regulation-ehds_en"),
    ("European Digital Identity", "https://digital-strategy.ec.europa.eu/en/policies/eudi-regulation"),
    ("GDPR health data", "https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/legal-grounds-processing-data_en"),
    ("GDPR child safeguards", "https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/legal-grounds-processing-data/are-there-any-specific-safeguards-data-about-children_en"),
    ("Eurostat digitalisation 2026", "https://ec.europa.eu/eurostat/en/web/interactive-publications/digitalisation-2026"),
]


def priority_matrix():
    rows = [
        ["Ürün", "Neden şimdi?", "MVP hızı", "Satış", "Önerilen rol"],
        ["OdivonDiet", "Bağımsız uzman pazarı, açık iş akışı", "Çok hızlı", "Hızlı", "İlk sağlık dikeyi"],
        ["OdivonKids", "Veli deneyimi ve kurum bağlılığı", "Hızlı", "Hızlı", "Ana büyüme ürünü"],
        ["OdivonFlow", "Tüm portföyde tekrar kullanılabilir", "Çok hızlı", "Hızlı", "Ortak çekirdek"],
        ["OdivonClient", "Hizmet KOBİ'lerine geniş satış", "Çok hızlı", "Hızlı", "Yatay SaaS"],
        ["OdivonStaff", "Her işletmede ortak ihtiyaç", "Hızlı", "Hızlı", "Çapraz satış"],
        ["OdivonFoodLabel", "Cihazsız, net çıktı ve yüksek hata maliyeti", "Hızlı", "Orta", "İhracat dikeyi"],
        ["OdivonMachineCE", "Makine üreticisi için zorunlu belge", "Orta", "Orta", "Sanayi ürünü"],
        ["OdivonCarbon", "İhracat zorunluluğu ve yüksek ödeme isteği", "Orta", "Orta", "RegTech amiral"],
        ["OdivonCyberReady", "Yeni ürün güvenliği yükümlülükleri", "Orta", "Orta", "Küresel B2B"],
        ["OdivonCargoDocs", "Lojistikte dijital belge dönüşümü", "Orta", "Orta", "Trade platformu"],
    ]
    pdata = [[P(x, "TableHead") for x in rows[0]]]
    for r in rows[1:]: pdata.append([P(x, "TableCell") for x in r])
    t = Table(pdata, colWidths=[31*mm, 65*mm, 23*mm, 20*mm, 32*mm], repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), NAVY), ("GRID", (0,0), (-1,-1), 0.4, LINE),
        ("VALIGN", (0,0), (-1,-1), "TOP"), ("LEFTPADDING", (0,0), (-1,-1), 5),
        ("RIGHTPADDING", (0,0), (-1,-1), 5), ("TOPPADDING", (0,0), (-1,-1), 5),
        ("BOTTOMPADDING", (0,0), (-1,-1), 5),
        ("BACKGROUND", (0,1), (-1,-1), colors.white),
    ]))
    return t


def deep_card(d):
    title = Table([[Paragraph(esc(d["name"]), styles["CardTitle"]),
                    Paragraph(esc(d["tag"]), ParagraphStyle(name="Tag", parent=styles["SmallTR"],
                              fontName="Odivon-Bold", textColor=CYAN, alignment=2))]],
                  colWidths=[70*mm, 101*mm])
    title.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), NAVY), ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ("LEFTPADDING", (0,0), (-1,-1), 9), ("RIGHTPADDING", (0,0), (-1,-1), 9),
        ("TOPPADDING", (0,0), (-1,-1), 8), ("BOTTOMPADDING", (0,0), (-1,-1), 8),
    ]))
    fields = [
        ("Ürün vaadi", d["promise"]), ("Alıcı", d["buyer"]), ("Çözdüğü sorun", d["pain"]),
        ("MVP", d["mvp"]), ("Gelir modeli", d["model"]), ("Odivon avantajı", d["edge"]),
    ]
    rows = []
    for label, val in fields:
        rows.append([P(label, "TableCellBold"), P(val, "TableCell")])
    body = Table(rows, colWidths=[31*mm, 140*mm])
    body.setStyle(TableStyle([
        ("GRID", (0,0), (-1,-1), 0.35, LINE), ("VALIGN", (0,0), (-1,-1), "TOP"),
        ("BACKGROUND", (0,0), (0,-1), LIGHT), ("LEFTPADDING", (0,0), (-1,-1), 7),
        ("RIGHTPADDING", (0,0), (-1,-1), 7), ("TOPPADDING", (0,0), (-1,-1), 5),
        ("BOTTOMPADDING", (0,0), (-1,-1), 5),
    ]))
    return KeepTogether([title, body, Spacer(1, 6*mm)])


story = [CoverFlowable(), PageBreak()]

story += [heading("Yönetici özeti"),
          P("Bu rapor, Odivon için bugüne kadar geliştirilen SaaS ürün fikirlerini tek bir stratejik çerçevede birleştirir. Katalog; mevzuat ve ihracat teknolojilerinden üretim, saha operasyonu, KOBİ iş akışları, sağlık, çocuk ve bakım dikeylerine kadar uzanır. Amaç yalnızca fikir listesi oluşturmak değil, aynı çekirdeği paylaşan ürün aileleriyle sürdürülebilir bir portföy kurmaktır."),
          callout("Ana öneri", "Odivon aynı anda çok sayıda bağımsız kod tabanı geliştirmemeli. Kimlik, organizasyon, rol, randevu, form, belge, görev, bildirim, ödeme durumu, portal ve raporlama bileşenleri ortak Odivon Platform Core üzerinde kurulmalı; dikey ürünler bu çekirdeğin yapılandırılmış sürümleri olmalıdır."),
          Spacer(1, 4*mm),
          priority_matrix(), Spacer(1, 5*mm),
          P("Kısa vadede cihaz entegrasyonu gerektirmeyen OdivonDiet, OdivonKids, OdivonFlow, OdivonClient ve OdivonStaff daha hızlı doğrulanabilir. Orta vadede OdivonFoodLabel, OdivonMachineCE ve OdivonCargoDocs daha yüksek müşteri başı gelir sağlar. Uzun vadede OdivonCarbon, OdivonAIGovernance, OdivonCyberReady ve OdivonTrace uluslararası RegTech markasına dönüşebilir.")]

story += [PageBreak(), heading("İçindekiler")]
toc = TableOfContents()
toc.levelStyles = [
    ParagraphStyle(name="TOC0", fontName="Odivon-Bold", fontSize=10, leading=14,
                   leftIndent=0, textColor=NAVY, spaceBefore=5),
    ParagraphStyle(name="TOC1", fontName="Odivon", fontSize=8.5, leading=12,
                   leftIndent=12, textColor=MUTED),
]
story += [toc, PageBreak()]

story += [heading("1. Odivon ürün stratejisinin temeli"),
          P("Odivon'un mevcut portföyü ERP, spor salonu, fatura, veteriner, tarım, SPA, güzellik, araç kiralama, sürücü kursu, otopark, saç salonu, randevu yönetimi, okul ve API gibi güçlü dikeyleri kapsıyor. Yeni ürünlerde amaç aynı ihtiyacın farklı isimlerle tekrarını üretmek değil; ortak altyapıdan beslenen yeni müşteri grupları ve daha yüksek gelirli problemler açmaktır."),
          heading("1.1 Seçim kriterleri", 2)]
story += bullet_list([
    "Müşterinin günlük operasyonuna dokunması ve düzenli kullanım üretmesi.",
    "Kayıt, belge, görev veya müşteri geçmişi biriktirerek değiştirme maliyeti oluşturması.",
    "İlk sürümün özel cihaz olmadan web ve mobil tarayıcı üzerinden çalışabilmesi.",
    "OdivonMainAPI, Firebase ve çok kiracılı mimariyle geliştirilebilmesi.",
    "OdivonAPM, OdivonFaturaPro, OdivonFlow ve ortak portal bileşenleriyle çapraz satış üretmesi.",
    "Yerel pazarda başlayıp çok dil ve çok ülke yapısıyla büyüyebilmesi."
])
story += [heading("1.2 Potansiyel ve zorluk ölçeği", 2),
          P("Tablolardaki P/Z sütunu sırasıyla satış potansiyelini ve göreli geliştirme zorluğunu gösterir. 'Çok yüksek' potansiyel; geniş müşteri kitlesi, zorunluluk kaynaklı talep, yüksek müşteri bağlılığı veya uluslararası ölçek ihtimalinden en az ikisini ifade eder. Zorluk değerlendirmesi ise entegrasyon, uzmanlık, veri hassasiyeti ve iş akışı karmaşıklığına göre yapılmıştır."),
          callout("Pazar göstergesi", "Eurostat'ın 2026 yayımlarına göre AB işletmelerinin %53'ü 2025 yılında ücretli bulut hizmeti kullandı. İşletmelerin %99'unun mikro veya küçük olması, kurulum ve eğitim yükü düşük SaaS ürünleri için geniş bir hedef kitle bulunduğunu destekliyor.", GREEN)]

story += [PageBreak(), heading("2. Konsolide ürün kataloğu")]
total = sum(len(v) for v in catalog.values())
story += [P(f"Aşağıdaki katalog toplam {total} ürün önerisini tekrarları ayıklanmış biçimde sınıflandırır. Her ürün için hedef müşteri, temel değer, ilk sürüm kapsamı, satış potansiyeli ve geliştirme zorluğu özetlenmiştir.")]
for section, products in catalog.items():
    story.append(heading(section, 2))
    for start in range(0, len(products), 12):
        story += [product_table(products[start:start+12]), Spacer(1, 4*mm)]

story += [PageBreak(), heading("3. Öncelikli ürünler için ayrıntılı planlar"),
          P("Bu bölüm, ticari fırsatı ve Odivon altyapısıyla uyumu en yüksek görülen ürünlerin ilk sürümünü somutlaştırır. Kapsamlar doğrulama odaklıdır; gelişmiş entegrasyonlar müşteri talebi kanıtlandıktan sonra eklenmelidir.")]
for d in deep_dives:
    story.append(deep_card(d))

story += [PageBreak(), heading("4. Sağlık, çocuk ve bakım ürün ailesi"),
          P("OdivonDiet, OdivonKids, OdivonTherapy, OdivonPhysio, OdivonSpeech, OdivonRehab, OdivonMother, OdivonClinic, OdivonDental ve OdivonChildDevelopment ayrı markalar olarak konumlandırılabilir. Teknik olarak aynı Care Core çekirdeğini paylaşmaları geliştirme hızını ve ürün tutarlılığını artırır."),
          heading("4.1 Ortak Care Core", 2)]
story += bullet_list([
    "Organizasyon, şube, kullanıcı, uzman ve rol yönetimi",
    "Danışan, hasta, çocuk ve veli profilleri",
    "Randevu, seans, paket ve ödeme durumu",
    "Yapılandırılabilir form, anamnez, gözlem ve onamlar",
    "Hedef, program, ilerleme ve dönemsel raporlar",
    "Danışan veya veli portalı, güvenli mesaj ve belge paylaşımı",
    "Bildirim şablonları, görevler ve işlem geçmişi",
    "Rol bazlı alan görünürlüğü ve hassas not ayrımı"
])
story += [heading("4.2 Sağlık ve çocuk verisi ilkeleri", 2),
          P("Sağlık verileri özel nitelikli kişisel veri olarak daha sıkı koşullara tabidir. Çocuk verilerinde veli/vasinin yetkisi, açık ve anlaşılır bilgilendirme, fotoğraf/medya onamı ve minimum veri toplama yaklaşımı temel tasarım gereksinimi olmalıdır. Ürünler tıbbi teşhis veya tedavi kararı vermemeli; uzman tarafından girilen ve onaylanan süreci yönetmelidir."),
          callout("Varsayılan güvenlik", "Hassas alan şifreleme, rol bazlı erişim, kayıt görüntüleme geçmişi, açık rıza/işleme dayanağı, veri dışa aktarma ve silme akışları, yedekleme, oturum güvenliği ve dosya erişim politikaları ilk sürümün parçası olmalıdır.", PURPLE)]

story += [PageBreak(), heading("5. Önerilen platform mimarisi"),
          P("Portföy, her ürün için ayrı kullanıcı, bildirim ve raporlama sistemi geliştirmek yerine ortak servislerden oluşmalıdır."),
          heading("5.1 Odivon Platform Core", 2)]

arch_rows = [
    ["Katman", "Ortak servisler", "Kullanan ürün aileleri"],
    ["Kimlik ve tenant", "Firebase Auth, organizasyon, şube, rol, davet", "Tüm ürünler"],
    ["İş akışı", "Form, görev, onay, SLA, yorum, bildirim", "Flow, RegTech, Care, saha"],
    ["Belge ve kanıt", "Dosya, versiyon, süre, erişim, denetim kaydı", "Docs, QMS, RegTech, sağlık"],
    ["Ticari", "Paket, abonelik, kota, ödeme durumu, fatura bağlantısı", "Tüm ücretli ürünler"],
    ["Portal", "Müşteri, veli, danışan, bayi, tedarikçi alanı", "Client, Kids, Diet, Wholesale"],
    ["Raporlama", "PDF, dışa aktarma, gösterge paneli, zamanlanmış rapor", "Tüm ürünler"],
    ["Entegrasyon", "OdivonMainAPI, webhook, CSV, e-posta", "İhtiyaca göre"],
]
adata = [[P(x, "TableHead") for x in arch_rows[0]]]
for r in arch_rows[1:]: adata.append([P(x, "TableCell") for x in r])
at = Table(adata, colWidths=[34*mm, 79*mm, 58*mm], repeatRows=1)
at.setStyle(TableStyle([
    ("BACKGROUND", (0,0), (-1,0), NAVY), ("GRID", (0,0), (-1,-1), 0.4, LINE),
    ("VALIGN", (0,0), (-1,-1), "TOP"), ("LEFTPADDING", (0,0), (-1,-1), 6),
    ("RIGHTPADDING", (0,0), (-1,-1), 6), ("TOPPADDING", (0,0), (-1,-1), 6),
    ("BOTTOMPADDING", (0,0), (-1,-1), 6),
]))
story += [at, Spacer(1, 5*mm), heading("5.2 Teknik yaklaşım", 2)]
story += bullet_list([
    "Ön yüz: mevcut Odivon tasarım sistemiyle çok dilli ve mobil uyumlu Angular/React uygulamalar.",
    "API: OdivonMainAPI üzerinde tenant, yetki, kota ve audit middleware katmanları.",
    "Veri: Firebase/Firestore koleksiyonlarında tenant sınırı, güvenlik kuralları ve hassas alan ayrımı.",
    "Dosya: erişim süresi olan bağlantılar, dosya sınıfı ve saklama politikası.",
    "Ürünleştirme: özellik bayraklarıyla aynı çekirdekten farklı plan ve dikeylerin açılması.",
    "Başlangıç entegrasyonları: CSV içe/dışa aktarma, e-posta ve webhook; ağır entegrasyonlar talep sonrası."
])

story += [PageBreak(), heading("6. Gelir modeli ve paketleme"),
          P("Odivon ürünlerinde tek fiyat yapısı kullanılmamalı. Müşterinin değer aldığı birim ürün ailesine göre değişmelidir."),
          heading("6.1 Önerilen ücretlendirme birimleri", 2)]
pricing = [
    ["Ürün ailesi", "Ana ücret birimi", "Üst paket tetikleyicisi"],
    ["Care", "Uzman + aktif danışan/çocuk", "Çoklu şube, markalı portal, gelişmiş rapor"],
    ["KOBİ Flow", "Aktif kullanıcı veya aylık işlem", "Gelişmiş onay, dış kullanıcı, API"],
    ["RegTech", "Organizasyon + tesis/ürün/tedarikçi", "Danışman paneli, SSO, özel rapor"],
    ["Üretim", "Tesis + aktif kullanıcı", "Çoklu tesis, kalite, API"],
    ["Lojistik", "Firma + aylık sevkiyat", "Taşıyıcı ağı, e-imza, API"],
    ["Saha servis", "Teknisyen + yönetilen varlık", "Müşteri portalı, rota, SLA"],
]
pr = [[P(x, "TableHead") for x in pricing[0]]]
for r in pricing[1:]: pr.append([P(x, "TableCell") for x in r])
pt = Table(pr, colWidths=[38*mm, 57*mm, 76*mm], repeatRows=1)
pt.setStyle(TableStyle([
    ("BACKGROUND", (0,0), (-1,0), NAVY), ("GRID", (0,0), (-1,-1), 0.4, LINE),
    ("VALIGN", (0,0), (-1,-1), "TOP"), ("LEFTPADDING", (0,0), (-1,-1), 6),
    ("RIGHTPADDING", (0,0), (-1,-1), 6), ("TOPPADDING", (0,0), (-1,-1), 6),
    ("BOTTOMPADDING", (0,0), (-1,-1), 6),
]))
story += [pt, Spacer(1, 5*mm),
          P("Ücretsiz plan yerine süreli deneme veya örnek verili demo çalışma alanı daha uygundur. Ücretsiz plan uzun süre destek maliyeti yaratabilir. Satışta kurulum ücreti; veri içe aktarma, şablon kurulumu, eğitim ve marka özelleştirmesini kapsayabilir.")]

story += [PageBreak(), heading("7. Uygulama yol haritası"),
          heading("Aşama 1 - Ortak çekirdek ve hızlı doğrulama", 2)]
story += bullet_list([
    "Odivon Platform Core: tenant, rol, form, görev, bildirim, dosya, portal ve rapor.",
    "OdivonFlow: çekirdeğin ilk satılabilir ürünü.",
    "OdivonDiet: danışan ve program şablonuyla ilk sağlık dikeyi.",
    "OdivonKids: veli portalı ve günlük akışla ikinci dikey.",
    "Her ürün için demo veri, tur, teklif sayfası ve kullanım analitiği."
])
story += [heading("Aşama 2 - Çapraz satış ürünleri", 2)]
story += bullet_list([
    "OdivonClient, OdivonDocs ve OdivonStaff'ı ortak çekirdek üzerinde açmak.",
    "Diet çekirdeğinden Therapy, Physio, Speech ve ChildDevelopment sürümlerini üretmek.",
    "Kids çekirdeğini çoklu şube ve Rehab ihtiyaçlarıyla genişletmek.",
    "OdivonFaturaPro ve OdivonAPM ile ortak müşteri/ödeme/randevu geçişi sağlamak."
])
story += [heading("Aşama 3 - Yüksek gelirli B2B", 2)]
story += bullet_list([
    "OdivonFoodLabel veya OdivonMachineCE ile ihracatçı KOBİ segmentine girmek.",
    "OdivonCarbon, CyberReady veya CargoDocs için alan uzmanı ve pilot müşteriyle çalışmak.",
    "Ürün ailelerini Türkiye dışına çıkaracak İngilizce/Almanca satış ve destek içeriği hazırlamak."
])
story += [callout("Portföy kuralı", "Yeni bir ürün ancak ortak çekirdeğin en az %60'ını tekrar kullanabiliyorsa veya mevcut ürün müşterilerine açık bir çapraz satış fırsatı yaratıyorsa geliştirme sırasına alınmalıdır.", AMBER)]

story += [PageBreak(), heading("8. Sonuç ve önerilen başlangıç"),
          P("Odivon için en düşük teknik riskli ve en yüksek öğrenme değerine sahip başlangıç OdivonFlow + OdivonDiet + OdivonKids üçlüsüdür. Flow ortak süreç motorunu kurar; Diet bağımsız profesyonel pazarını, Kids ise kurumsal abonelik ve veli portalı modelini doğrular."),
          P("Bu üç ürün oturduktan sonra aynı çekirdekle Therapy, Physio, Speech, ChildDevelopment, Client, Docs ve Staff hızlı biçimde çıkarılabilir. Böylece Odivon kısa vadede satılabilir dikey SaaS'lar üretirken uzun vadede Carbon, CyberReady, MachineCE ve Trace gibi yüksek gelirli uluslararası ürünlere yatırım yapabilecek ortak altyapı ve nakit akışı oluşturur."),
          callout("Birinci ürün seçimi", "Hız ve düşük risk için OdivonDiet; müşteri bağlılığı ve daha yüksek kurum geliri için OdivonKids; bütün portföyün altyapı değerini artırmak için OdivonFlow.", GREEN)]

story += [PageBreak(), heading("9. Kaynaklar ve düzenleyici dayanaklar"),
          P("Rapor içindeki mevzuat tarihleri ve pazar yönleri aşağıdaki resmî kurum sayfalarına dayanır. Ürün geliştirmeye başlanırken ilgili ülkenin güncel ulusal uygulaması ayrıca doğrulanmalıdır.")]
src_rows = [[P("Kaynak", "TableHead"), P("Bağlantı", "TableHead")]]
for name, url in sources:
    src_rows.append([P(name, "TableCellBold"), Paragraph(f"<link href='{url}' color='#2563EB'>{esc(url)}</link>", styles["TinyTR"])])
st = Table(src_rows, colWidths=[51*mm, 120*mm], repeatRows=1)
st.setStyle(TableStyle([
    ("BACKGROUND", (0,0), (-1,0), NAVY), ("GRID", (0,0), (-1,-1), 0.35, LINE),
    ("VALIGN", (0,0), (-1,-1), "TOP"), ("LEFTPADDING", (0,0), (-1,-1), 5),
    ("RIGHTPADDING", (0,0), (-1,-1), 5), ("TOPPADDING", (0,0), (-1,-1), 5),
    ("BOTTOMPADDING", (0,0), (-1,-1), 5),
]))
story.append(st)


doc = OdivonDocTemplate(str(PDF_PATH), pagesize=A4, rightMargin=17*mm, leftMargin=17*mm,
                        topMargin=17*mm, bottomMargin=16*mm,
                        title="Odivon SaaS Ürün Stratejisi 2026",
                        author="Odivon")
doc.multiBuild(story)
print(PDF_PATH)
