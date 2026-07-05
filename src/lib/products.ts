// =====================================================
// AETERA ÜRÜN VERİTABANI
// Kaynak: www.aktardepo.com  |  Ajan 3 tarafından oluşturuldu
// Her ürün, AI kural motorunun eşleştireceği 'tags' listesi içerir
// Tags sistemi: analiz modüllerindeki puan etiketleriyle örtüşür
// =====================================================

export interface Product {
  id: string;
  name: string;
  category: "Cilt Bakımı" | "Aromaterapi" | "Sağlık & Bağışıklık" | "Bitkisel Çay" | "Saç Bakımı";
  price: number;
  originalPrice?: number;
  image: string;
  url: string; // aktardepo.com'a giden gerçek link
  shortDescription: string;
  detailedDescription: string;
  // === AI EŞLEŞTİRME ETİKETLERİ ===
  // Cilt analizi etiketleri:
  //   kuru-cilt | yağlı-cilt | karma-cilt | hassas-cilt | dirençli-cilt | akne | eczama | anti-aging | hiperpigmentasyon
  // Kişilik analizi etiketleri:
  //   stres | anksiyete | uyku-sorunu | odaklanma | depresif-mod | dışadönüklük | introvert | öfke | motivasyon
  // Sağlık analizi etiketleri:
  //   sindirim | bağışıklık | eklem-ağrısı | enerji-düşüklüğü | uykusuzluk | detoks | metabolizma | solunum | baş-ağrısı
  tags: string[];
  inStock: boolean;
}

export const products: Product[] = [
  // ─── CİLT BAKIMI ─────────────────────────────────────────────────────────────
  {
    id: "p-001",
    name: "Kuşburnu Çekirdeği Yağı",
    category: "Cilt Bakımı",
    price: 189,
    originalPrice: 249,
    image: "https://www.aktardepo.com/image/cache/catalog/additional_images/uploads/depo/kusburnu-yagi-960x1080.jpg",
    url: "https://www.aktardepo.com/kusburnu-cicegi-yagi",
    shortDescription: "A vitamini zengini, anti-aging etkili yenileyen yağ.",
    detailedDescription: "Kuşburnu çekirdeği yağı yüksek A vitamini (retinol öncüsü) ve omega-3,6 içeriğiyle ince çizgileri azaltır, yaşlanma karşıtı güçlü etki gösterir. Hiperpigmentasyon ve güneş lekelerine karşı bilimsel çalışmalarla desteklenmiştir.",
    tags: ["kuru-cilt", "anti-aging", "hiperpigmentasyon", "karma-cilt", "kışlık-cilt"],
    inStock: true,
  },
  {
    id: "p-002",
    name: "Saf Lavanta Uçucu Yağı",
    category: "Aromaterapi",
    price: 149,
    image: "https://www.aktardepo.com/image/cache/catalog/additional_images/uploads/depo/lavanta-yagi-960x1080.jpg",
    url: "https://www.aktardepo.com/lavanta-ucucu-yagi",
    shortDescription: "Stresi azaltan, uykuyu derinleştiren aromatik yağ.",
    detailedDescription: "Lavandula angustifolia türünden elde edilen bu uçucu yağ, klinik çalışmalarda kortizol seviyesini düşürdüğü gösterilmiştir. Yatmadan önce difüzörde veya yastığa 2-3 damla uygulanır. Melatonin sentezini destekler.",
    tags: ["stres", "anksiyete", "uyku-sorunu", "hassas-cilt", "meditasyon"],
    inStock: true,
  },
  {
    id: "p-003",
    name: "Çay Ağacı Uçucu Yağı",
    category: "Aromaterapi",
    price: 129,
    image: "https://www.aktardepo.com/image/cache/catalog/additional_images/uploads/depo/cay-agaci-yagi-960x1080.jpg",
    url: "https://www.aktardepo.com/cay-agaci-ucucu-yagi",
    shortDescription: "Güçlü antimikrobiyal, akne ve yağlı cilt için ideal.",
    detailedDescription: "Melaleuca alternifolia bitkisinden elde edilen çay ağacı yağı, S. aureus ve P. acnes bakterilerine karşı klinik olarak kanıtlanmış antimikrobiyal etki gösterir. %5 konsantrasyonda benzoil peroksitle karşılaştırılabilir akne azaltma etkisi mevcuttur.",
    tags: ["yağlı-cilt", "akne", "karma-cilt", "dirençli-cilt", "anti-bakteriyel"],
    inStock: true,
  },
  {
    id: "p-004",
    name: "Organik Argan Yağı",
    category: "Cilt Bakımı",
    price: 229,
    originalPrice: 289,
    image: "https://www.aktardepo.com/image/cache/catalog/additional_images/uploads/depo/argan-yagi-960x1080.jpg",
    url: "https://www.aktardepo.com/organik-argan-yagi",
    shortDescription: "Fas'ın altın yağı. Cilt ve saç için derin beslenme.",
    detailedDescription: "Argania spinosa çekirdeğinden soğuk pres yöntemiyle elde edilir. E vitamini ve fenolik asitlerle yüklüdür. Transepidermal su kaybını (TEWL) azaltarak epidermal bariyer fonksiyonunu güçlendirir. Kuru ve olgun ciltler için ideal.",
    tags: ["kuru-cilt", "anti-aging", "hassas-cilt", "saç-bakımı", "olgun-cilt"],
    inStock: true,
  },
  {
    id: "p-005",
    name: "Gül Suyu (Hidratasyon Toniği)",
    category: "Cilt Bakımı",
    price: 99,
    image: "https://www.aktardepo.com/image/cache/catalog/additional_images/uploads/depo/gul-suyu-960x1080.jpg",
    url: "https://www.aktardepo.com/gul-suyu",
    shortDescription: "pH dengeleyici, anti-inflamatuar ve yatıştırıcı tonik.",
    detailedDescription: "Rosa damascena hidrolü pH 4.5-5.5 arasında olup cildin asit mantosunu dengeler. Antiinflamatuar özellikleri ile kızarıklık, rozasea ve güneş yanığı sonrası cildi sakinleştirir. Tüm cilt tipleri için uygundur.",
    tags: ["hassas-cilt", "kuru-cilt", "karma-cilt", "akne", "anksiyete"],
    inStock: true,
  },
  {
    id: "p-006",
    name: "Jojoba Yağı",
    category: "Cilt Bakımı",
    price: 159,
    image: "https://www.aktardepo.com/image/cache/catalog/additional_images/uploads/depo/jojoba-yagi-960x1080.jpg",
    url: "https://www.aktardepo.com/jojoba-yagi",
    shortDescription: "Sebum yapısına en yakın bitkisel nemlendirici.",
    detailedDescription: "Kimyasal yapı olarak bir vaks ester olan jojoba, cildin kendi sebumuna (deri yağına) en yakın bitkisel maddedir. Komedojenik olmadığından hem yağlı hem kuru ciltlerde sebum dengesini sağlar. Akne eğilimli ciltlerde pore tıkanmasına yol açmaz.",
    tags: ["yağlı-cilt", "akne", "karma-cilt", "kuru-cilt", "hassas-cilt"],
    inStock: true,
  },

  // ─── AROMATERAPİ & ZİHİN ─────────────────────────────────────────────────────
  {
    id: "p-007",
    name: "Biberiye Uçucu Yağı",
    category: "Aromaterapi",
    price: 119,
    image: "https://www.aktardepo.com/image/cache/catalog/additional_images/uploads/depo/biberiye-yagi-960x1080.jpg",
    url: "https://www.aktardepo.com/biberiye-ucucu-yagi",
    shortDescription: "Hafızayı ve odaklanmayı güçlendiren bitkisel performans yağı.",
    detailedDescription: "Rosmarinus officinalis L.'den elde edilen biberiye yağı, 1,8-cineole bileşeni sayesinde asetilkolinesteraz enzimini inhibe ederek bilişsel performansı artırır. Oxford Brookes Üniversitesi çalışması, biberiye aromasının bellek testlerinde %75 daha yüksek skor sağladığını göstermiştir.",
    tags: ["odaklanma", "motivasyon", "enerji-düşüklüğü", "yağlı-cilt", "saç-bakımı"],
    inStock: true,
  },
  {
    id: "p-008",
    name: "Bergamot Uçucu Yağı",
    category: "Aromaterapi",
    price: 139,
    image: "https://www.aktardepo.com/image/cache/catalog/additional_images/uploads/depo/bergamot-yagi-960x1080.jpg",
    url: "https://www.aktardepo.com/bergamot-ucucu-yagi",
    shortDescription: "Ruh halini yükselten, anksiyeteyi azaltan narenciye yağı.",
    detailedDescription: "Linalool ve limonin bileşenleri sayesinde GABA reseptörleri üzerinde dolaylı etki göstererek anksiyete semptomlarını azaltır. Klinik çalışmalar, 15 dakikalık bergamot aroma terapi seansının kortizol düzeyini istatistiksel olarak düşürdüğünü doğrulamıştır.",
    tags: ["anksiyete", "stres", "depresif-mod", "odaklanma", "motivasyon"],
    inStock: true,
  },
  {
    id: "p-009",
    name: "Okaliptüs Uçucu Yağı",
    category: "Aromaterapi",
    price: 109,
    image: "https://www.aktardepo.com/image/cache/catalog/additional_images/uploads/depo/okaliptus-yagi-960x1080.jpg",
    url: "https://www.aktardepo.com/okaliptus-ucucu-yagi",
    shortDescription: "Solunum yollarını açan, enerji veren ve dekonjestan yağ.",
    detailedDescription: "Eucalyptus globulus'tan elde edilen bu yağ, yüksek 1,8-cineole içeriğiyle mukus sekresyonunu azaltır ve bronkodilatör etki gösterir. Grip, sinüzit ve kronik yorgunlukta difüzörde ya da buharda kullanılır.",
    tags: ["solunum", "bağışıklık", "enerji-düşüklüğü", "baş-ağrısı", "odaklanma"],
    inStock: true,
  },

  // ─── SAĞLIK & BAĞIŞIKLIK ─────────────────────────────────────────────────────
  {
    id: "p-010",
    name: "Zencefil Tozu (Organik)",
    category: "Sağlık & Bağışıklık",
    price: 89,
    image: "https://www.aktardepo.com/image/cache/catalog/additional_images/uploads/depo/zencefil-tozu-960x1080.jpg",
    url: "https://www.aktardepo.com/zencefil-tozu",
    shortDescription: "Sindirim, eklem ağrısı ve bağışıklık için geleneksel savaşçı.",
    detailedDescription: "Zingiber officinale kökleri kurutularak öğütülmüştür. Gingerol ve shogaol bileşenleri COX-2 enzimini inhibe ederek inflamasyonu ve eklem ağrısını azaltır. Sabah 1 çay kaşığı sıcak suya eklenebilir.",
    tags: ["sindirim", "eklem-ağrısı", "bağışıklık", "metabolizma", "anti-inflamatuar"],
    inStock: true,
  },
  {
    id: "p-011",
    name: "Zerdeçal (Kurkumin) Tozu",
    category: "Sağlık & Bağışıklık",
    price: 99,
    image: "https://www.aktardepo.com/image/cache/catalog/additional_images/uploads/depo/zerdecal-tozu-960x1080.jpg",
    url: "https://www.aktardepo.com/zerdecal-tozu",
    shortDescription: "Binlerce yıllık anti-inflamatuar bitkinin en güçlü hali.",
    detailedDescription: "Curcuma longa'dan elde edilen kurkumin, NF-κB yolağını bloke ederek sistemik inflamasyonu köklü biçimde azaltır. Biyoyararlanımı artırmak için karabiber (piperince) ile birlikte kullanılması önerilir. Karaciğer detoksu, eklem sağlığı ve cilt parlaklığına katkı sağlar.",
    tags: ["eklem-ağrısı", "detoks", "bağışıklık", "anti-inflamatuar", "hiperpigmentasyon"],
    inStock: true,
  },
  {
    id: "p-012",
    name: "Ekinezya Çayı (Günaydın Formülü)",
    category: "Bitkisel Çay",
    price: 79,
    image: "https://www.aktardepo.com/image/cache/catalog/additional_images/uploads/depo/ekinezya-cay-960x1080.jpg",
    url: "https://www.aktardepo.com/ekinezya-cayi",
    shortDescription: "Bağışıklık sistemini aktive eden, kış çayı şampiyonu.",
    detailedDescription: "Echinacea purpurea ve angustifolia karışımından hazırlanan bu çay, T-lenfosit üretimini artırarak doğal öldürücü (NK) hücre aktivitesini yükseltir. Soğuk algınlığı süresini ortalama 1-2 gün kısalttığı 7 farklı klinik çalışmayla doğrulanmıştır.",
    tags: ["bağışıklık", "solunum", "enerji-düşüklüğü", "stres", "detoks"],
    inStock: true,
  },
  {
    id: "p-013",
    name: "Papatya Çayı (Uyku & Sakinlik)",
    category: "Bitkisel Çay",
    price: 69,
    image: "https://www.aktardepo.com/image/cache/catalog/additional_images/uploads/depo/papatya-cay-960x1080.jpg",
    url: "https://www.aktardepo.com/papatya-cayi",
    shortDescription: "Apigenin sayesinde doğal uyku düzenleyici bitkisel çay.",
    detailedDescription: "Matricaria chamomilla çiçeklerinden elde edilen apigenin, GABA-A reseptörlerine bağlanarak sedatif etki gösterir. Uyku kalitesini artıran bileşeni, yapılan çalışmalarda benzodiazepinlere kıyasla bağımlılık riski taşımayan güvenli bir alternatif olarak öne çıkmaktadır.",
    tags: ["uyku-sorunu", "anksiyete", "stres", "hassas-cilt", "sindirim"],
    inStock: true,
  },
  {
    id: "p-014",
    name: "Nane-Limon Sindirim Çayı",
    category: "Bitkisel Çay",
    price: 65,
    image: "https://www.aktardepo.com/image/cache/catalog/additional_images/uploads/depo/nane-limon-cay-960x1080.jpg",
    url: "https://www.aktardepo.com/nane-limon-cayi",
    shortDescription: "Şişkinlik, gaz ve hazımsızlık için önde gelen bitkisel formül.",
    detailedDescription: "Mentha piperita (nane) + Cymbopogon citratus (limon otu) karışımı. Mentol, sinüs ve GI yollarında kasılmayı gevşetir. Gastrointestinal spazmları azaltarak şişkinlik, gaz ve IBS semptomlarını hafifletir.",
    tags: ["sindirim", "metabolizma", "detoks", "baş-ağrısı", "anksiyete"],
    inStock: true,
  },
  {
    id: "p-015",
    name: "Elma Sirkesi (Ham, Filtre Edilmemiş)",
    category: "Sağlık & Bağışıklık",
    price: 119,
    image: "https://www.aktardepo.com/image/cache/catalog/additional_images/uploads/depo/elma-sirkesi-960x1080.jpg",
    url: "https://www.aktardepo.com/elma-sirkesi",
    shortDescription: "Glisemik indeksi düşüren, prebiyotik etkili fermente içecek.",
    detailedDescription: "Asetik asit içeriğiyle insülin duyarlılığını artırır ve yemek sonrası kan şekeri artışını %19-34 oranında azaldığı klinik çalışmalarda gösterilmiştir. Ana mayalı yapısındaki pektinler prebiyotik etki gösterir. Sabah tok karnına 1 yemek kaşığı 300ml suda seyreltilerek içilir.",
    tags: ["metabolizma", "sindirim", "detoks", "bağışıklık", "enerji-düşüklüğü"],
    inStock: true,
  },
  {
    id: "p-016",
    name: "Kekik Yağı (Origanum vulgare)",
    category: "Sağlık & Bağışıklık",
    price: 179,
    image: "https://www.aktardepo.com/image/cache/catalog/additional_images/uploads/depo/kekik-yagi-960x1080.jpg",
    url: "https://www.aktardepo.com/kekik-yagi",
    shortDescription: "Karvakrol oranıyla doğanın en güçlü antibiyotiği.",
    detailedDescription: "Origanum vulgare bitkisinden elde edilen bu yağ, karvakrol ve timol sayesinde geniş spektrumlu antimikrobiyal özellik taşır. Bağışıklık sistemini güçlendiren bu yağ, solunum yolu enfeksiyonlarının önlenmesinde destekleyici olarak kullanılmaktadır.",
    tags: ["bağışıklık", "solunum", "sindirim", "anti-bakteriyel", "akne"],
    inStock: true,
  },
  {
    id: "p-017",
    name: "Hindistan Cevizi Yağı (Soğuk Sıkım)",
    category: "Cilt Bakımı",
    price: 149,
    image: "https://www.aktardepo.com/image/cache/catalog/additional_images/uploads/depo/hindistan-cevizi-yagi-960x1080.jpg",
    url: "https://www.aktardepo.com/hindistan-cevizi-yagi",
    shortDescription: "Laurik asit etkisiyle hem cilt hem saç için çok yönlü yağ.",
    detailedDescription: "Soğuk pres Cocos nucifera yağı %50 laurik asit içerir. Antimikrobiyal etkisiyle demodex gibi dermal mikropları baskılar. Transepidermal su kaybını azaltarak kuru ve egzemalı ciltlerde epiderm bariyerini onarır. Yüz yağı olarak, saç maskesi olarak veya vücut nemlendirici olarak kullanılabilir.",
    tags: ["kuru-cilt", "eczama", "hassas-cilt", "saç-bakımı", "akne"],
    inStock: true,
  },
  {
    id: "p-018",
    name: "Moringa Tozu (Organik)",
    category: "Sağlık & Bağışıklık",
    price: 139,
    image: "https://www.aktardepo.com/image/cache/catalog/additional_images/uploads/depo/moringa-tozu-960x1080.jpg",
    url: "https://www.aktardepo.com/moringa-tozu",
    shortDescription: "9 amino asit içeren 'mucize ağacı' süperfood tozu.",
    detailedDescription: "Moringa oleifera yapraklarından hazırlanan bu süperfood; 9 esansiyel amino asit, C ve E vitamini ve demirle yüklüdür. Enerji metabolizmasını destekler, antioksidan kapasiteyi artırır, kronik yorgunluk sendromunda klinik çalışmalarda umut verici sonuçlar göstermiştir.",
    tags: ["enerji-düşüklüğü", "bağışıklık", "detoks", "motivasyon", "metabolizma"],
    inStock: true,
  },
];
