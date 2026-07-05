// =====================================================
// AETERA ANALİZ PUANLAMA MOTORU
// Ajan 2 tarafından tasarlandı — Bilimsel metodoloji:
//   - Cilt: Baumann Cilt Tipi Envanteri (BSTI)
//   - Kişilik: Big Five + TIPI-Mini (Gosling, 2003)
//   - Sağlık: Fonksiyonel Tıp Semptom Anketi (MSQ - Medical Symptom Questionnaire)
// =====================================================

export type SkinType = "KU" | "YA" | "KA"; // Kuru | Yağlı | Karma
export type SkinSensitivity = "H" | "D"; // Hassas | Dirençli
export type SkinPigmentation = "P" | "NP"; // Pigmente | Non-pigmente
export type SkinWrinkle = "W" | "NW"; // Wrinkle-prone | Non-wrinkle

export interface SkinProfile {
  type: SkinType;
  sensitivity: SkinSensitivity;
  pigmentation: SkinPigmentation;
  wrinkle: SkinWrinkle;
  baumannCode: string; // örn: "DRPW"
  primaryTags: string[];
}

export interface PersonalityProfile {
  openness: number;        // 0-100
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;     // stres / anksiyete göstergesi
  primaryTags: string[];
  dominantTrait: string;
}

export interface HealthProfile {
  digestiveScore: number;   // 0-100 (0=sağlıklı, 100=ciddi)
  immuneScore: number;
  energyScore: number;
  sleepScore: number;
  jointScore: number;
  primaryTags: string[];
  riskLevel: "low" | "moderate" | "high";
}

// ==========================================================
//  CİLT ANALİZİ — Baumann Cilt Tipi Algoritması
// ==========================================================
// Soru cevaplanışından sayısal vector oluşturulur.
// Her eksen bağımsız değerlendirilir.

export function scoreSkinAnalysis(answers: Record<string, number>): SkinProfile {
  // --- Eksen 1: Nem / Yağ Dengesi ---
  // answers["q1"]: Cildiniz gün sonunda nasıl hissettiriyor?
  //   1=çok sıkı/kuru, 2=biraz sıkı, 3=normal, 4=parlak/yağlı, 5=çok yağlı
  // answers["q2"]: Sabah cilt yıkama sonrası ne kadar süre geçiyor ve yüzünüz sıkışıyor?
  //   1=hemen sıkışıyor, 2=30dk sonra, 3=1 saat sonra, 4=sıkışmıyor, 5=hiç sıkışmıyor
  const oilinessScore = (answers["q1"] || 3) + (answers["q2"] ? 6 - answers["q2"] : 3);
  // oilinessScore: 2-10 arası. Düşük=kuru, yüksek=yağlı
  let type: SkinType;
  if (oilinessScore <= 5) type = "KU";
  else if (oilinessScore >= 8) type = "YA";
  else type = "KA";

  // --- Eksen 2: Hassasiyet / Dirençlilik ---
  // answers["q3"]: Yeni ürün kullandığınızda kızarma, yanma olur mu?
  //   1=her zaman, 2=sık sık, 3=bazen, 4=nadiren, 5=hiç
  // answers["q4"]: Güneşe maruziyette tepki?
  //   1=hemen yanar, 2=soyulur, 3=kızarır sonra solar, 4=bronzlaşır, 5=hiç etkilenmez
  const sensitivityScore = (answers["q3"] || 3) + (answers["q4"] || 3);
  // Düşük puan = hassas
  const sensitivity: SkinSensitivity = sensitivityScore <= 5 ? "H" : "D";

  // --- Eksen 3: Pigmentasyon ---
  // answers["q5"]: Leke veya ton eşitsizliği var mı?
  //   1=çok fazla, 2=orta, 3=biraz, 4=çok az, 5=yok
  const pigmentScore = answers["q5"] || 3;
  const pigmentation: SkinPigmentation = pigmentScore <= 3 ? "P" : "NP";

  // --- Eksen 4: Kırışıklık Eğilimi ---
  // answers["q6"]: Çevresel faktörlere (güneş, sigara, stres) maruz kalıyor musunuz?
  //   1=çok fazla, 2=fazla, 3=orta, 4=az, 5=çok az
  const wrinkleScore = answers["q6"] || 3;
  const wrinkle: SkinWrinkle = wrinkleScore <= 3 ? "W" : "NW";

  // Baumann kodu: S/R (Sensitive/Resistant) + D/O (Dry/Oily) + P/NP + W/NW
  const baumannCode = `${sensitivity === "H" ? "S" : "R"}${type === "KU" ? "D" : type === "YA" ? "O" : "C"}${pigmentation}${wrinkle}`;

  // Tag üretimi
  const primaryTags: string[] = [];
  if (type === "KU") primaryTags.push("kuru-cilt");
  if (type === "YA") primaryTags.push("yağlı-cilt");
  if (type === "KA") primaryTags.push("karma-cilt");
  if (sensitivity === "H") primaryTags.push("hassas-cilt");
  else primaryTags.push("dirençli-cilt");
  if (pigmentation === "P") primaryTags.push("hiperpigmentasyon");
  if (wrinkle === "W") primaryTags.push("anti-aging");
  // Akne riski: yağlı + dirençli kombinasyonu
  if (type === "YA" && sensitivity === "D") primaryTags.push("akne");
  // Egzama riski: kuru + hassas kombinasyonu
  if (type === "KU" && sensitivity === "H") primaryTags.push("eczama");

  return { type, sensitivity, pigmentation, wrinkle, baumannCode, primaryTags };
}

// ==========================================================
//  KİŞİLİK ANALİZİ — Big Five / TIPI Algoritması
// ==========================================================
// Her Big Five boyutu 2 soruyla ölçülür (biri pozitif, biri negatif çapraz)
// Score: 1-5 Likert ölçeği

export function scorePersonalityAnalysis(answers: Record<string, number>): PersonalityProfile {
  // Soruların yönleri (+ = düz, - = ters çevrilmiş)
  // q1: Dışadönüklük (+), q2: Dışadönüklük - negatif (-)
  const extraversion = ((answers["q1"] || 3) + (6 - (answers["q2"] || 3))) / 2 * 20;

  // q3: Uyumluluk (+), q4: Uyumluluk (-)
  const agreeableness = ((answers["q3"] || 3) + (6 - (answers["q4"] || 3))) / 2 * 20;

  // q5: Sorumluluk (+), q6: Sorumluluk (-) — motivasyon, odak
  const conscientiousness = ((answers["q5"] || 3) + (6 - (answers["q6"] || 3))) / 2 * 20;

  // q7: Nevrotizm (+) — stres, anksiyete göstergesi. YÜKSEK = SORUN
  // q8: Nevrotizm (-) — duygusal denge
  const neuroticism = ((answers["q7"] || 3) + (6 - (answers["q8"] || 3))) / 2 * 20;

  // q9: Deneyime Açıklık (+)
  const openness = (answers["q9"] || 3) * 20;

  const primaryTags: string[] = [];

  // Nevrotizm → stres/anksiyete
  if (neuroticism >= 60) primaryTags.push("stres", "anksiyete");
  if (neuroticism >= 80) primaryTags.push("depresif-mod");

  // Extraversion → introvert/dışadönüklük
  if (extraversion <= 40) primaryTags.push("introvert");
  else if (extraversion >= 70) primaryTags.push("dışadönüklük");

  // Conscientiousness → odaklanma / motivasyon
  if (conscientiousness <= 40) primaryTags.push("odaklanma", "motivasyon");

  // Uyku sorunuyla ilişkilendirme: hem nevrotizm yüksek hem özdenetim düşükse
  if (neuroticism >= 60 && conscientiousness <= 50) primaryTags.push("uyku-sorunu");

  // Öfke göstergesi: düşük uyumluluk + yüksek nevrotizm
  if (agreeableness <= 35 && neuroticism >= 65) primaryTags.push("öfke");

  // Dominant trait belirleme
  const scores = { "Dışadönüklük": extraversion, "Uyumluluk": agreeableness, "Sorumluluk": conscientiousness, "Duygusal Denge": 100 - neuroticism, "Açıklık": openness };
  const dominantTrait = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];

  return { openness, conscientiousness, extraversion, agreeableness, neuroticism, primaryTags, dominantTrait };
}

// ==========================================================
//  SAĞLIK ANALİZİ — Fonksiyonel Tıp Semptom Anketi (MSQ)
// ==========================================================
// Her semptom sistemi 0(yok)-3(şiddetli) üzerinden puanlanır
// 4 sistem: Sindirim, Bağışıklık, Enerji, Uyku, Eklem

export function scoreHealthAnalysis(answers: Record<string, number>): HealthProfile {
  // q1-q2: Sindirim sistemi (şişkinlik, düzensizlik)
  const digestiveRaw = ((answers["q1"] || 0) + (answers["q2"] || 0));
  const digestiveScore = Math.min(Math.round(digestiveRaw / 6 * 100), 100);

  // q3-q4: Bağışıklık (sık hastalanma, iyileşme süresi)
  const immuneRaw = ((answers["q3"] || 0) + (answers["q4"] || 0));
  const immuneScore = Math.min(Math.round(immuneRaw / 6 * 100), 100);

  // q5: Enerji seviyesi (ters ölçek: 3=çok iyi = düşük skor)
  const energyRaw = answers["q5"] !== undefined ? 3 - answers["q5"] : 1;
  const energyScore = Math.min(Math.round(energyRaw / 3 * 100), 100);

  // q6: Uyku kalitesi (ters ölçek)
  const sleepRaw = answers["q6"] !== undefined ? 3 - answers["q6"] : 1;
  const sleepScore = Math.min(Math.round(sleepRaw / 3 * 100), 100);

  // q7: Eklem/kas ağrısı
  const jointScore = Math.min(Math.round(((answers["q7"] || 0)) / 3 * 100), 100);

  // Etiket üretimi
  const primaryTags: string[] = [];
  if (digestiveScore >= 40) primaryTags.push("sindirim");
  if (digestiveScore >= 60) primaryTags.push("metabolizma", "detoks");
  if (immuneScore >= 40) primaryTags.push("bağışıklık");
  if (immuneScore >= 70) primaryTags.push("solunum");
  if (energyScore >= 50) primaryTags.push("enerji-düşüklüğü");
  if (sleepScore >= 50) primaryTags.push("uykusuzluk", "uyku-sorunu");
  if (jointScore >= 50) primaryTags.push("eklem-ağrısı", "anti-inflamatuar");

  // Genel risk skoru
  const avgScore = (digestiveScore + immuneScore + energyScore + sleepScore + jointScore) / 5;
  const riskLevel: HealthProfile["riskLevel"] = avgScore >= 60 ? "high" : avgScore >= 35 ? "moderate" : "low";

  return { digestiveScore, immuneScore, energyScore, sleepScore, jointScore, primaryTags, riskLevel };
}
