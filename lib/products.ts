import type { Locale } from './messages';
export type Product = {
 id: string;
 name: string;
 symbol: 'golf' | 'invoice' | 'gym' | 'apm' | 'integration' | 'farm' | 'spa' | 'school' | 'api' | 'b2c' | 'together' | 'vet';
 category: Record<Locale,string>;
 description: Record<Locale,string>;
 details: Record<Locale,string>;
 status: 'coming-soon' | 'available';
 demoUrl?: string;
};
// Names supplied by the founder. Scope, readiness and demo URLs await confirmation.
const catalogue: {id:string;name:string;symbol:Product['symbol']}[] = [
 {id:'odivon-golf',name:'OdivonGolf',symbol:'golf'},
 {id:'odivon-fatura-pro',name:'OdivonFaturaPro',symbol:'invoice', demoUrl:'https://faturapro.odivon.com'},
 {id:'odivon-gym',name:'OdivonGYM',symbol:'gym'},
 {id:'odivon-apm',name:'OdivonAPM',symbol:'apm'},
 {id:'odivon-samo-int',name:'OdivonSamoInt',symbol:'integration'},
 {id:'odivon-farm',name:'OdivonFARM',symbol:'farm'},
 {id:'odivon-spa',name:'OdivonSPA',symbol:'spa'},
 {id:'odivon-school',name:'OdivonSchool',symbol:'school'},
 {id:'odivon-api',name:'OdivonAPI',symbol:'api'},
 {id:'odivon-b2c',name:'OdivonB2C',symbol:'b2c'},
 {id:'odivon-ikimiz',name:'Odivon ikimiz',symbol:'together'},
 {id:'odivon-vet',name:'OdivonVET',symbol:'vet'},
];
export const products: Product[] = catalogue.map(product=>({
 ...product,
 category:{tr:'Odivon ürün ailesi',en:'The Odivon product family'},
 description:{tr:'Ürün kapsamı ve demo bilgileri yakında burada.',en:'Product scope and demo information will be shared here.'},
 details:{tr:`${product.name}, Odivon çatısı altında yer alan ürünlerden biridir.\n\nÖzellikler, kullanım alanları ve demo erişimi bu sayfada paylaşılacak.`,en:`${product.name} is part of the Odivon product family.\n\nFeatures, use cases and demo access will be shared on this page.`},
 status:'coming-soon',
}));
