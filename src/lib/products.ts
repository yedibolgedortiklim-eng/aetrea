export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  desc: string;
  image: string;
  tags: string[]; // Used by LLM for matching
};

export const products: Product[] = [
  { 
    id: "A1", 
    name: "Saf Lavanta Uçucu Yağı", 
    category: "Aromaterapi", 
    price: "245 ₺", 
    desc: "Fransız Alplerinden elde edilen premium kalite. Sakinleştirici ve rahatlatıcı etkisiyle uyku kalitenizi derinleştirir.",
    image: "https://images.unsplash.com/photo-1611078816997-7e61f22490cc?w=800&auto=format&fit=crop",
    tags: ["uyku", "stres", "gevşeme", "kaygı", "gerginlik"]
  },
  { 
    id: "A2", 
    name: "Organik Kuşburnu Çekirdeği Yağı", 
    category: "Cilt Bakımı", 
    price: "320 ₺", 
    desc: "A Vitamini deposu. Anti-aging etkisiyle cildi yeniler, ince çizgilerin ve lekelerin görünümünü kusursuzca azaltır.",
    image: "https://images.unsplash.com/photo-1615397323136-1e35e3962635?w=800&auto=format&fit=crop",
    tags: ["kuru cilt", "matlık", "kırışıklık", "leke", "bariyer onarıcı", "yaşlanma karşıtı"]
  },
  { 
    id: "A3", 
    name: "Isparta Gül Suyu (Saf Hidrolat)", 
    category: "Cilt Bakımı", 
    price: "150 ₺", 
    desc: "Geleneksel bakır imbiklerde damıtılmış %100 saf gül suyu. Cildin pH dengesini korur, gözenekleri sıkılaştırır.",
    image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=800&auto=format&fit=crop",
    tags: ["hassas cilt", "kızarıklık", "nemsiz", "yatıştırıcı", "gözenek"]
  },
  { 
    id: "B1", 
    name: "Zencefil & Zerdeçal Eliksiri", 
    category: "Sağlık & Bağışıklık", 
    price: "185 ₺", 
    desc: "Kadim Çin Tıbbı formülü. Güçlü bir antioksidan kaynağı olarak hücreleri korur ve bağışıklık sistemini destekler.",
    image: "https://images.unsplash.com/photo-1596647265882-628d09722ea9?w=800&auto=format&fit=crop",
    tags: ["bağışıklık", "enerji eksikliği", "detoks", "iltihap", "sindirim"]
  },
  { 
    id: "B2", 
    name: "Huzur Ritüeli Bitki Çayı", 
    category: "Sağlık & Bağışıklık", 
    price: "120 ₺", 
    desc: "Organik papatya, melisa ve lavanta içeren özel stres karşıtı harman. Günün yorgunluğunu silmek için ideal.",
    image: "https://images.unsplash.com/photo-1576092762791-dd9e2220abd4?w=800&auto=format&fit=crop",
    tags: ["uyku", "stres", "huzur", "rahatlama", "içe dönük"]
  },
  { 
    id: "A4", 
    name: "Nane & Okaliptüs Uçucu Yağı", 
    category: "Aromaterapi", 
    price: "190 ₺", 
    desc: "Zihni anında açan, odaklanmayı artıran ve ortamın enerjisini tazeleyen yoğun ferahlık.",
    image: "https://images.unsplash.com/photo-1582298687702-0e24ec140cfa?w=800&auto=format&fit=crop",
    tags: ["odaklanma", "zihin açıcı", "ferahlık", "yağlı cilt", "sivilce", "enerji"]
  },
];
