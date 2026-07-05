"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Loader2, AlertCircle, ShoppingBag, Sparkles } from "lucide-react";
import { scorePersonalityAnalysis } from "@/lib/analysis-engine";
import { products } from "@/lib/products";
import { tagsToElement, saveElementProfile, elementConfig } from "@/lib/element-profile";

// Big Five soru seti — TIPI-Mini'den uyarlandı (her soru için 5-noktalı Likert ölçeği)
const QUESTIONS = [
  {
    id: "q7",
    trait: "Nevrotizm / Duygusal Denge",
    question: "Son 2 haftada ne sıklıkla kendinizi gergin, endişeli veya bunalmış hissettiniz?",
    subtitle: "Bu ölçek klinik değerlendirme için kullanılır. Dürüst yanıtlar en iyi sonucu verir.",
    options: [
      { label: "Hemen hemen hiç — Sakin ve dengeli hissediyorum", value: 1, icon: "😌" },
      { label: "Nadiren — Çoğunlukla iyi hissediyorum", value: 2, icon: "🙂" },
      { label: "Bazen — İnişli çıkışlı dönemler oluyor", value: 3, icon: "😐" },
      { label: "Sık sık — Stres ve endişe günlük yaşamıma giriyor", value: 4, icon: "😟" },
      { label: "Neredeyse her zaman — Sürekli gergin hissediyorum", value: 5, icon: "😰" },
    ],
  },
  {
    id: "q8",
    trait: "Duygusal Denge (Ters Madde)",
    question: "Olumsuz bir olay yaşandığında kendinizi ne kadar çabuk toparlıyorsunuz?",
    subtitle: "Psikolojik esneklik (resilience) düzeyinizi ölçer.",
    options: [
      { label: "Çok yavaş — Olaylar üzerimde uzun süreli iz bırakıyor", value: 1, icon: "🐌" },
      { label: "Yavaş — Sakinleşmem biraz zaman alıyor", value: 2, icon: "🌧️" },
      { label: "Orta — Birkaç saat içinde normale dönüyorum", value: 3, icon: "⛅" },
      { label: "Hızlı — Genellikle aynı gün kendimi toparlıyorum", value: 4, icon: "🌤️" },
      { label: "Çok hızlı — Zorluklara karşı çok dirençliyim", value: 5, icon: "☀️" },
    ],
  },
  {
    id: "q1",
    trait: "Dışadönüklük",
    question: "Sosyal etkileşimler sizi nasıl etkiliyor?",
    subtitle: "Ekstroversiyon-introversion spektrumunu ölçer.",
    options: [
      { label: "Yoruyor — Yalnız kalmak beni yeniliyor", value: 1, icon: "🏠" },
      { label: "Genelde yalnızlığı tercih ediyorum ama bazen kalabalık hoş geliyor", value: 2, icon: "📚" },
      { label: "Duruma göre değişiyor, ikisi de iyi geliyor", value: 3, icon: "⚖️" },
      { label: "Çoğunlukla enerji veriyor, sosyal ortamlarda açılıyorum", value: 4, icon: "🎉" },
      { label: "Her zaman enerji veriyor, ne kadar çok insan o kadar iyi", value: 5, icon: "🎭" },
    ],
  },
  {
    id: "q5",
    trait: "Sorumluluk / Odaklanma",
    question: "Bir görev veya proje üzerinde çalışırken ne kadar odaklanabiliyorsunuz?",
    subtitle: "Öz-düzenleme ve konsantrasyon kapasitesini ölçer.",
    options: [
      { label: "Çok zorlanıyorum — Dikkat dağınıklığı büyük sorun", value: 1, icon: "🌀" },
      { label: "Bazen zorlanıyorum, sık sık aklım dağılıyor", value: 2, icon: "💭" },
      { label: "Genelde iyi, zaman zaman konsantre olamıyorum", value: 3, icon: "🎯" },
      { label: "İyi odaklanabiliyorum, çoğu işi verimli tamamlıyorum", value: 4, icon: "✅" },
      { label: "Çok iyi — Uzun süre odaklanabildiğim bir güçlü yönüm", value: 5, icon: "🏹" },
    ],
  },
];

function LoadingScreen() {
  return (
    <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
        <Loader2 size={48} color="#c084fc" />
      </motion.div>
      <h2 style={{ marginTop: "2rem", color: "white", fontSize: "1.5rem", fontWeight: 300 }}>
        Kişilik Profiliniz Oluşturuluyor...
      </h2>
      <p style={{ color: "rgba(255,255,255,0.5)", marginTop: "0.5rem" }}>Big Five algoritması çalışıyor ve ürünler eşleştiriliyor</p>
    </div>
  );
}

function ResultCard({ result, personalityProfile }: { result: any; personalityProfile: any }) {
  const traitLabels: Record<string, { label: string; icon: string }> = {
    "Dışadönüklük": { label: "Dışadönüklük", icon: "🎭" },
    "Uyumluluk": { label: "Uyumluluk", icon: "🤝" },
    "Sorumluluk": { label: "Sorumluluk", icon: "🎯" },
    "Duygusal Denge": { label: "Duygusal Denge", icon: "⚖️" },
    "Açıklık": { label: "Deneyime Açıklık", icon: "🌟" },
  };

  const neurScore = personalityProfile.neuroticism;
  const stressLabel = neurScore >= 70 ? "Yüksek Stres" : neurScore >= 45 ? "Orta Düzey Stres" : "Düşük Stres";
  const stressColor = neurScore >= 70 ? "#ef4444" : neurScore >= 45 ? "#f59e0b" : "#22c55e";

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
      {/* Profil Başlığı */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✨</div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(123, 63, 140, 0.3)", border: "1px solid rgba(192, 132, 252, 0.3)", padding: "0.4rem 1.2rem", borderRadius: "30px", marginBottom: "1.5rem", color: "#c084fc", fontSize: "0.85rem" }}>
          Baskın Özellik: {personalityProfile.dominantTrait}
        </div>
        <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "white", marginBottom: "0.5rem" }}>
          Kişilik Profiliniz
        </h2>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: `${stressColor}22`, border: `1px solid ${stressColor}44`, padding: "0.3rem 0.8rem", borderRadius: "20px", color: stressColor, fontSize: "0.85rem" }}>
          {stressLabel}
        </div>
      </div>

      {/* Big Five Radar Görsel */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem", marginBottom: "2.5rem" }}>
        {[
          { name: "Dışadönüklük", score: personalityProfile.extraversion },
          { name: "Uyumluluk", score: personalityProfile.agreeableness },
          { name: "Sorumluluk", score: personalityProfile.conscientiousness },
          { name: "Duygusal Denge", score: 100 - personalityProfile.neuroticism },
          { name: "Açıklık", score: personalityProfile.openness },
        ].map(trait => (
          <div key={trait.name} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "1.2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.82rem" }}>{trait.name}</span>
              <span style={{ color: "#c084fc", fontWeight: 700, fontSize: "0.85rem" }}>{Math.round(trait.score)}</span>
            </div>
            <div style={{ height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "3px" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${trait.score}%` }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ height: "100%", background: "linear-gradient(90deg, #7b3f8c, #c084fc)", borderRadius: "3px" }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* AI Özeti */}
      {result?.analiz_ozeti && (
        <div style={{ background: "rgba(123, 63, 140, 0.15)", border: "1px solid rgba(192, 132, 252, 0.2)", borderRadius: "16px", padding: "1.5rem", marginBottom: "2rem" }}>
          <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.8, fontSize: "0.95rem" }}>{result.analiz_ozeti}</p>
        </div>
      )}

      {/* Ürün Önerileri */}
      {result?.onerilen_urunler && (
        <div style={{ marginBottom: "2.5rem" }}>
          <h3 style={{ fontSize: "1.3rem", color: "#c9a44a", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <ShoppingBag size={20} /> Ruhsal Dengeniz için Öneriler
          </h3>
          <div style={{ display: "grid", gap: "1rem" }}>
            {result.onerilen_urunler.map((item: any, i: number) => {
              const product = products.find(p => p.id === item.urun_id || p.name === item.urun_adi);
              return (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "1.5rem", display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                  {product && (
                    <img src={product.image} alt={product.name} style={{ width: "70px", height: "70px", borderRadius: "12px", objectFit: "cover", flexShrink: 0 }}
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=150&q=80"; }} />
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: "white", marginBottom: "0.4rem" }}>{item.urun_adi}</div>
                    <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "0.8rem" }}>{item.neden_onerildi}</p>
                    {product && (
                      <a href={product.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", background: "rgba(192, 132, 252, 0.15)", border: "1px solid rgba(192, 132, 252, 0.3)", color: "#c084fc", padding: "0.4rem 0.9rem", borderRadius: "20px", fontSize: "0.8rem", textDecoration: "none", fontWeight: 600 }}>
                        {product.price} ₺ — Satın Al →
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Yaşam Tarzı */}
      {result?.yasam_tarzi_tavsiyesi && (
        <div style={{ background: "rgba(123, 63, 140, 0.15)", border: "1px solid rgba(192, 132, 252, 0.2)", borderRadius: "16px", padding: "1.5rem", marginBottom: "2rem" }}>
          <h4 style={{ color: "#c084fc", marginBottom: "0.8rem", fontSize: "1rem" }}>💜 Uzman Tavsiyesi</h4>
          <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7, fontSize: "0.95rem" }}>{result.yasam_tarzi_tavsiyesi}</p>
        </div>
      )}

      {/* 4 Element Uyum Kartı */}
      {(() => {
        const element = tagsToElement(personalityProfile.primaryTags, "personality");
        const config = element ? elementConfig[element] : null;
        if (!config || !element) return null;

        return (
          <div style={{
            background: config.gradient,
            border: `1px solid ${config.color}88`,
            borderRadius: "24px",
            padding: "2rem",
            marginBottom: "2.5rem",
            textAlign: "center",
            boxShadow: "0 15px 35px rgba(0,0,0,0.3)"
          }}>
            <span style={{ fontSize: "3.5rem", display: "block", marginBottom: "0.5rem" }}>{config.icon}</span>
            <p style={{ color: "#c9a44a", fontSize: "0.8rem", letterSpacing: "0.2em", marginBottom: "0.4rem" }}>DOMİNANT ELEMENTİNİZ</p>
            <h3 style={{ fontSize: "1.8rem", fontWeight: 700, color: "white", marginBottom: "0.5rem" }}>{element} Elementi</h3>
            <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.2rem" }}>
              {config.description}
            </p>
            <div style={{ fontStyle: "italic", color: "rgba(255,255,255,0.7)", fontSize: "0.85rem" }}>
              "{config.mantra}"
            </div>
          </div>
        );
      })()}

      <div style={{ display: "flex", gap: "1rem" }}>
        <Link href="/shop" style={{ flex: 1, textAlign: "center", background: "linear-gradient(135deg, #7b3f8c 0%, #a855c7 100%)", color: "white", padding: "1rem 2rem", borderRadius: "30px", textDecoration: "none", fontWeight: 700, fontSize: "1rem" }}>
          Kişisel Şifa Eczaneme Git →
        </Link>
        <Link href="/analysis" style={{ flex: 1, textAlign: "center", background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)", padding: "1rem 2rem", borderRadius: "30px", textDecoration: "none", fontWeight: 600, fontSize: "1rem", border: "1px solid rgba(255,255,255,0.15)" }}>
          Başka Analiz Yap
        </Link>
      </div>
    </motion.div>
  );
}

export default function PersonalityAnalysisPage() {
  const [step, setStep] = useState<"kvkk" | "quiz" | "loading" | "result">("kvkk");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<any>(null);
  const [personalityProfile, setPersonalityProfile] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAnswer = async (value: number) => {
    const qId = QUESTIONS[currentQ].id;
    const newAnswers = { ...answers, [qId]: value };
    setAnswers(newAnswers);

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      setStep("loading");
      const profile = scorePersonalityAnalysis(newAnswers);
      setPersonalityProfile(profile);
      // 4 Element profilini hesapla ve kaydet
      const element = tagsToElement(profile.primaryTags, "personality");
      saveElementProfile({ element, moduleType: "personality", timestamp: Date.now(), primaryTags: profile.primaryTags });
      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            moduleType: `Kişilik Analizi (Big Five — Baskın: ${profile.dominantTrait})`,
            tags: profile.primaryTags,
            userAnswers: newAnswers,
          }),
        });
        if (!res.ok) { const e = await res.json(); throw new Error(e.error || "Hata"); }
        setResult(await res.json());
      } catch (err: any) {
        setErrorMessage(err.message);
        setResult(null);
      }
      setStep("result");
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#1a0d2e", color: "white" }}>
      <header style={{ position: "fixed", top: 0, left: 0, width: "100%", padding: "1.2rem 3rem", background: "rgba(26, 13, 46, 0.95)", backdropFilter: "blur(20px)", zIndex: 100, borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/analysis" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}><ArrowLeft size={18} /> Geri</Link>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#c084fc", fontWeight: 600, fontSize: "0.9rem" }}><Sparkles size={18} /> Kişilik Analizi</div>
        <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>{step === "quiz" ? `${currentQ + 1}/${QUESTIONS.length}` : ""}</div>
      </header>

      {step === "quiz" && (
        <div style={{ position: "fixed", top: "65px", left: 0, width: "100%", height: "3px", background: "rgba(255,255,255,0.1)", zIndex: 99 }}>
          <motion.div style={{ height: "100%", background: "linear-gradient(90deg, #7b3f8c, #c084fc)", borderRadius: "2px" }} animate={{ width: `${((currentQ + 1) / QUESTIONS.length) * 100}%` }} />
        </div>
      )}

      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "7rem 2rem 4rem" }}>
        <AnimatePresence mode="wait">
          {step === "kvkk" && (
            <motion.div key="kvkk" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}>
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✨</div>
                <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "1rem" }}>Kişilik & Ruh Analizi</h1>
                <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.7, fontSize: "1.05rem" }}>
                  Big Five kişilik modeline dayanan bu analiz, stres seviyenizi, kişilik yapınızı ve ruh halinize uygun botanik formüllerinizi belirler.
                </p>
              </div>
              <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "2rem", marginBottom: "2rem", fontSize: "0.88rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
                <strong style={{ color: "rgba(255,255,255,0.8)", display: "block", marginBottom: "0.5rem" }}>📋 Veri Gizliliği & KVKK Bildirimi</strong>
                Psikolojik profil verileriniz yalnızca bu oturumda işlenmekte olup saklanmamaktadır. Bu test tanı koyma amacı taşımaz. Sonuçlar ürün eşleştirme için kullanılmaktadır.
              </div>
              <button onClick={() => setStep("quiz")} style={{ width: "100%", padding: "1.2rem", background: "linear-gradient(135deg, #7b3f8c 0%, #a855c7 100%)", color: "white", border: "none", borderRadius: "30px", fontSize: "1.1rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                Analize Başla <ArrowRight size={20} />
              </button>
            </motion.div>
          )}

          {step === "quiz" && (
            <motion.div key={`q-${currentQ}`} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.35 }}>
              <div style={{ marginBottom: "2rem" }}>
                <p style={{ color: "#c084fc", fontSize: "0.78rem", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>{QUESTIONS[currentQ].trait}</p>
                <p style={{ color: "#c9a44a", fontSize: "0.85rem", letterSpacing: "0.08em", marginBottom: "1rem" }}>SORU {currentQ + 1} / {QUESTIONS.length}</p>
                <h2 style={{ fontSize: "1.7rem", fontWeight: 700, lineHeight: 1.3, marginBottom: "0.7rem" }}>{QUESTIONS[currentQ].question}</h2>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.88rem" }}>{QUESTIONS[currentQ].subtitle}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {QUESTIONS[currentQ].options.map((opt, idx) => (
                  <motion.button key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.02, background: "rgba(192, 132, 252, 0.12)" }} whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(opt.value)}
                    style={{ width: "100%", padding: "1.2rem 1.5rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", color: "white", fontSize: "0.95rem", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "1rem", transition: "all 0.2s" }}>
                    <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{opt.icon}</span>
                    <span style={{ lineHeight: 1.5 }}>{opt.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "loading" && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><LoadingScreen /></motion.div>
          )}

          {step === "result" && personalityProfile && (
            <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {errorMessage && (
                <div style={{ background: "rgba(220, 38, 38, 0.1)", border: "1px solid rgba(220, 38, 38, 0.3)", borderRadius: "12px", padding: "1rem 1.5rem", marginBottom: "1.5rem", display: "flex", gap: "0.7rem", alignItems: "flex-start" }}>
                  <AlertCircle size={20} color="#ef4444" style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: "#ef4444", display: "block", marginBottom: "0.3rem" }}>AI bağlantısı kurulamadı</strong>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>{errorMessage}</p>
                  </div>
                </div>
              )}
              <ResultCard result={result} personalityProfile={personalityProfile} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
