// =====================================================
// AETERA ELEMENT PROFİL SİSTEMİ (V4 - Gelişmiş Kozmik Simya)
// Kullanıcının analiz sonucunu 4 Element öğretisiyle eşleştiren
// localStorage tabanlı kişiselleştirme altyapısı
// =====================================================

export type ElementType = "Toprak" | "Su" | "Ates" | "Hava" | null;

export interface ElementProfile {
  element: ElementType;
  moduleType: "skin" | "personality" | "health";
  timestamp: number;
  primaryTags: string[];
}

export interface RitualStep {
  time: "Sabah" | "Gün Ortası" | "Gece";
  activity: string;
  recommendedProduct: string;
}

export interface ElementConfig {
  color: string;
  gradient: string;
  icon: string;
  description: string;
  moodTags: string[];
  mantra: string;
  rituals: RitualStep[];
}

// ─── Analiz etiketlerini 4 Elemente çeviren kural motoru ────────────────────
export function tagsToElement(
  tags: string[],
  moduleType: "skin" | "personality" | "health"
): ElementType {
  if (moduleType === "skin") {
    if (tags.includes("kuru-cilt") || tags.includes("eczama")) return "Su";
    if (tags.includes("yağlı-cilt") || tags.includes("akne")) return "Ates";
    if (tags.includes("hassas-cilt")) return "Hava";
    return "Toprak";
  }
  if (moduleType === "personality") {
    if (tags.includes("stres") || tags.includes("anksiyete")) return "Ates";
    if (tags.includes("uyku-sorunu") || tags.includes("depresif-mod")) return "Su";
    if (tags.includes("odaklanma") || tags.includes("motivasyon")) return "Hava";
    return "Toprak";
  }
  if (moduleType === "health") {
    if (tags.includes("sindirim") || tags.includes("metabolizma")) return "Toprak";
    if (tags.includes("enerji-düşüklüğü") || tags.includes("uykusuzluk")) return "Su";
    if (tags.includes("bağışıklık") || tags.includes("solunum")) return "Hava";
    if (tags.includes("eklem-ağrısı") || tags.includes("anti-inflamatuar")) return "Ates";
    return "Toprak";
  }
  return null;
}

// ─── localStorage Yardımcıları ───────────────────────────────────────────────
const STORAGE_KEY = "aetera_element_profile";

export function saveElementProfile(profile: ElementProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function loadElementProfile(): ElementProfile | null {
  if (typeof window === "undefined") return null;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;
  try {
    return JSON.parse(saved) as ElementProfile;
  } catch {
    return null;
  }
}

export function clearElementProfile(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

// Profil 7 günden eski mi?
export function isProfileExpired(profile: ElementProfile): boolean {
  const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
  return Date.now() - profile.timestamp > SEVEN_DAYS;
}

// ─── 4 Element Konfigürasyonu (Ajan 2 & Ajan 3 Tarafından Tasarlandı) ────────
export const elementConfig: Record<string, ElementConfig> = {
  Toprak: {
    color: "#5c4a2a",
    gradient: "linear-gradient(135deg, #3d2e14 0%, #6b5422 100%)",
    icon: "🌍",
    description: "Köklü, istikrarlı ve besleyici. Maddesel dünyayla ve bedeninizle derin bir bağ kurar.",
    mantra: "Ben güvendeyim, köklerime bağlıyım ve doğanın ritmiyle besleniyorum.",
    moodTags: ["sindirim", "metabolizma", "enerji-düşüklüğü"],
    rituals: [
      { time: "Sabah", activity: "Uyanışta 1 çay kaşığı organik Toz Zencefil'i ılık limonlu suya ekleyerek için.", recommendedProduct: "Zencefil Tozu (Organik)" },
      { time: "Gün Ortası", activity: "Topraklanma hissini artırmak için ayaklarınızı 5 dakika boyunca doğrudan toprağa veya ahşaba basın.", recommendedProduct: "Organik Argan Yağı" },
      { time: "Gece", activity: "Metabolizmayı düzenlemek için yatmadan önce 1 yemek kaşığı seyreltilmiş Ham Elma Sirkesi tüketin.", recommendedProduct: "Elma Sirkesi (Ham, Filtre Edilmemiş)" }
    ]
  },
  Su: {
    color: "#1a4a7a",
    gradient: "linear-gradient(135deg, #0d2a52 0%, #1f5fa0 100%)",
    icon: "💧",
    description: "Akışkan, arındırıcı ve iyileştirici. Duygusal derinliği, sezgiyi ve hücresel nemi temsil eder.",
    mantra: "Ben akıştayım, kendimi arındırıyorum ve değişimin getirdiği şifayı kabul ediyorum.",
    moodTags: ["kuru-cilt", "uyku-sorunu", "hassas-cilt"],
    rituals: [
      { time: "Sabah", activity: "Cilt bariyerinizi neme boğmak için nemli yüzünüze 2-3 damla Jojoba yağı ile dairesel masaj uygulayın.", recommendedProduct: "Jojoba Yağı" },
      { time: "Gün Ortası", activity: "Duygusal gerginliği azaltmak için 1 bardak ılık Papatya Çayı yudumlayarak 5 dakika sessizlikte kalın.", recommendedProduct: "Papatya Çayı (Uyku & Sakinlik)" },
      { time: "Gece", activity: "Derin nemlendirme ve hücre yenilenmesi için yatmadan önce Kuşburnu Çekirdeği Yağı uygulayın.", recommendedProduct: "Kuşburnu Çekirdeği Yağı" }
    ]
  },
  Ates: {
    color: "#8b2500",
    gradient: "linear-gradient(135deg, #5a1400 0%, #a83410 100%)",
    icon: "🔥",
    description: "Dönüştürücü, enerjik ve güçlü. Yaşam ateşini, sindirimi, motivasyonu ve iradeyi temsil eder.",
    mantra: "Ben güçlüyüm, içimdeki tutkuyu dengeliyorum ve engelleri aşma iradesine sahibim.",
    moodTags: ["stres", "anksiyete", "yağlı-cilt", "eklem-ağrısı"],
    rituals: [
      { time: "Sabah", activity: "Okaliptüs ve Lavanta yağlarını koklayarak güne odaklanmış ve sakin bir zihinle başlayın.", recommendedProduct: "Saf Lavanta Uçucu Yağı" },
      { time: "Gün Ortası", activity: "Aşırı sebumu ve stresi azaltmak için yüzünüzü soğuk organik Gül Suyu toniğiyle spreyleyin.", recommendedProduct: "Gül Suyu (Hidratasyon Toniği)" },
      { time: "Gece", activity: "Günün yorgunluğunu ve eklem stresini azaltmak için zerdeçallı ılık süt (altın süt) hazırlayın.", recommendedProduct: "Zerdeçal (Kurkumin) Tozu" }
    ]
  },
  Hava: {
    color: "#2a5a4a",
    gradient: "linear-gradient(135deg, #1a3a2e 0%, #3d8a6e 100%)",
    icon: "🌬️",
    description: "Özgür, berrak ve ilham veren. Zihinsel netliği, yaratıcılığı ve solunum ritmini temsil eder.",
    mantra: "Ben özgürüm, zihnim berrak ve hayatın getirdiği yeni nefesi coşkuyla karşılıyorum.",
    moodTags: ["bağışıklık", "odaklanma", "solunum", "hassas-cilt"],
    rituals: [
      { time: "Sabah", activity: "Biberiye uçucu yağını difüzörde yakarak 3 dakika derin nefes egzersizi yapın. Zihni uyandırın.", recommendedProduct: "Biberiye Uçucu Yağı" },
      { time: "Gün Ortası", activity: "Bağışıklığı desteklemek ve solunum yollarını ferahlatmak için sıcak Okaliptüs buharlı infüzyon yapın.", recommendedProduct: "Okaliptüs Uçucu Yağı" },
      { time: "Gece", activity: "Hücreleri korumak için 1 fincan Ekinezya çayı içerek zihni uykuya hazırlayın.", recommendedProduct: "Ekinezya Çayı (Günaydın Formülü)" }
    ]
  },
};

// ─── Kozmik Uyum Algoritması (Moon Phase ve Saat Bazlı) ──────────────────────
export function getCosmicSynergy(element: ElementType): { title: string; desc: string; affinityModifier: number } {
  if (!element) return { title: "Evrensel Uyum", desc: "Elementlerin dansı dengede devam ediyor.", affinityModifier: 0 };

  const hour = new Date().getHours();
  let timePeriod: "morning" | "afternoon" | "night" = "afternoon";
  if (hour >= 6 && hour < 12) timePeriod = "morning";
  else if (hour >= 18 || hour < 6) timePeriod = "night";

  // Ay döngüsü hesaplama (temsili dinamik hesap)
  const dayOfMonth = new Date().getDate();
  const moonPhase = dayOfMonth % 29.5;
  const isFullMoon = moonPhase > 12.5 && moonPhase < 16.5;

  let title = "";
  let desc = "";
  let affinityModifier = 0;

  if (element === "Toprak") {
    if (timePeriod === "morning") {
      title = "Gündoğumu Köklenmesi";
      desc = "Sabah saatlerinde Toprak elementinin gücü en yüksek seviyededir. Bedeninizi uyandırmak için ideal zaman.";
      affinityModifier = 10;
    } else if (timePeriod === "night") {
      title = "Toprak Ananın Dinlenmesi";
      desc = "Gece saatlerinde sindirim yavaşlar. Hafif bitki çayları ve epidermal onarım yağları ile uyumu koruyun.";
      affinityModifier = 5;
    } else {
      title = "Kozmik Denge";
      desc = "Günün bu saatinde vücudunuz kararlılık arıyor. Ağır yiyeceklerden kaçının.";
      affinityModifier = 0;
    }
  } else if (element === "Su") {
    if (timePeriod === "night") {
      title = "Hücresel Gece Akışı";
      desc = "Su elementi gece saatlerinde yenilenir. Transepidermal nemlendirme uygulamak için en verimli an.";
      affinityModifier = 15;
    } else if (isFullMoon) {
      title = "Dolunay Gel-Git Etkisi";
      desc = "Dolunay döngüsü vücudunuzdaki su dengesini etkiliyor. Bol ılık su ve papatya infüzyonlarıyla sakinliği koruyun.";
      affinityModifier = 12;
    } else {
      title = "Akışkan Uyum";
      desc = "Günlük nem döngünüz stabil. Cildinizi hidrolatlarla taze tutun.";
      affinityModifier = 0;
    }
  } else if (element === "Ates") {
    if (timePeriod === "afternoon") {
      title = "Solar Tepe Isısı";
      desc = "Güneşin en dik olduğu saatlerde içinizdeki ateş zirvede. Aşırı heyecan ve strese karşı serinletici aromaterapi kullanın.";
      affinityModifier = -5; // Aşırı ateşi dengelemek için sakinleştiricileri öne çıkar
    } else if (timePeriod === "night") {
      title = "Yang Ateşinin Yatışması";
      desc = "Gece saatleri zihinsel harareti söndürmek için idealdir. Sakinleştirici bitkilerle uykuyu destekleyin.";
      affinityModifier = 10;
    } else {
      title = "Metabolik Kıvılcım";
      desc = "Zencefil ve zerdeçal gibi termojenik köklerle sindiriminizi canlandırabilirsiniz.";
      affinityModifier = 8;
    }
  } else if (element === "Hava") {
    if (timePeriod === "morning") {
      title = "Zihinsel Sabah Berraklığı";
      desc = "Sabah rüzgarı zihinsel performansınızı tetikliyor. Biberiye yağı koklamak odaklanmanızı 2 katına çıkarabilir.";
      affinityModifier = 15;
    } else if (timePeriod === "night") {
      title = "Sakin Rüzgar Akşamı";
      desc = "Uyumadan önce nefesinizi yavaşlatın. Solunum kanallarını temizleyen aromatik yağlar kullanın.";
      affinityModifier = 10;
    } else {
      title = "Düşünce Akışı";
      desc = "Zihniniz hızlı çalışıyor. Odaklanma yağlarıyla konsantrasyonu artırın.";
      affinityModifier = 5;
    }
  }

  return { title, desc, affinityModifier };
}
