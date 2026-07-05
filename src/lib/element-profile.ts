// =====================================================
// AETERA ELEMENT PROFİL SİSTEMİ
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

export interface ElementConfig {
  color: string;
  gradient: string;
  icon: string;
  description: string;
  moodTags: string[];
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

// ─── 4 Element Konfigürasyonu ─────────────────────────────────────────────────
export const elementConfig: Record<string, ElementConfig> = {
  Toprak: {
    color: "#5c4a2a",
    gradient: "linear-gradient(135deg, #3d2e14 0%, #6b5422 100%)",
    icon: "🌍",
    description: "Köklü, istikrarlı ve besleyici",
    moodTags: ["sindirim", "metabolizma", "enerji-düşüklüğü"],
  },
  Su: {
    color: "#1a4a7a",
    gradient: "linear-gradient(135deg, #0d2a52 0%, #1f5fa0 100%)",
    icon: "💧",
    description: "Akışkan, arındırıcı ve iyileştirici",
    moodTags: ["kuru-cilt", "uyku-sorunu", "hassas-cilt"],
  },
  Ates: {
    color: "#8b2500",
    gradient: "linear-gradient(135deg, #5a1400 0%, #a83410 100%)",
    icon: "🔥",
    description: "Dönüştürücü, enerjik ve güçlü",
    moodTags: ["stres", "anksiyete", "yağlı-cilt", "eklem-ağrısı"],
  },
  Hava: {
    color: "#2a5a4a",
    gradient: "linear-gradient(135deg, #1a3a2e 0%, #3d8a6e 100%)",
    icon: "🌬️",
    description: "Özgür, berrak ve ilham veren",
    moodTags: ["bağışıklık", "odaklanma", "solunum", "hassas-cilt"],
  },
};
