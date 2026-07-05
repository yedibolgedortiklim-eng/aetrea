"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, AlertCircle, ShoppingBag, Leaf } from "lucide-react";
import { scoreSkinAnalysis } from "@/lib/analysis-engine";
import { products } from "@/lib/products";

// ─── 4 SORU — BAUMANN CİLT TİPİ ENVANTERİ ────────────────────────────────────
const QUESTIONS = [
  {
    id: "q1",
    question: "Sabah yüzünüzü yıkadıktan 3-4 saat sonra cildiniz nasıl hissettiriyor?",
    subtitle: "Herhangi bir ürün uygulamadan değerlendirin.",
    options: [
      { label: "Çok sıkı ve çekiyor, hatta pul pul dökülüyor", value: 1, icon: "🌵" },
      { label: "Biraz sıkışık ve gergin hissettiriyor", value: 2, icon: "🍂" },
      { label: "Gayet rahat, normal hissettiriyor", value: 3, icon: "🌿" },
      { label: "T-bölgem (alın, burun, çene) biraz parlamaya başlıyor", value: 4, icon: "💧" },
      { label: "Yüzümün büyük kısmı yağlanıyor ve parlıyor", value: 5, icon: "✨" },
    ],
  },
  {
    id: "q2",
    question: "Yüzünüzü yıkadıktan sonra sıkışma hissi ne kadar sürüyor?",
    subtitle: "Yüz yıkama sonrası nemlendirici kullanmadan.",
    options: [
      { label: "Neredeyse her zaman sıkışık hissediyorum (30 dakikadan fazla)", value: 1, icon: "⏰" },
      { label: "Yaklaşık 30 dakika boyunca sıkışık hissediyorum", value: 2, icon: "🕐" },
      { label: "Çok kısa süre, 10-15 dakika", value: 3, icon: "🕒" },
      { label: "Neredeyse hiç sıkışmıyor, hemen normale dönüyor", value: 4, icon: "😊" },
      { label: "Hiç sıkışma olmuyor, tam tersi yağlanıyor", value: 5, icon: "💦" },
    ],
  },
  {
    id: "q3",
    question: "Yeni bir cilt bakım ürünü denediğinizde ne sıklıkla tahriş (kızarma, yanma, kaşınma) yaşıyorsunuz?",
    subtitle: "Parfümsüz ürünler dahil tüm cilt ürünlerini değerlendirin.",
    options: [
      { label: "Hemen hemen her yeni üründe reaksiyon veriyorum", value: 1, icon: "🚨" },
      { label: "Sık sık (her 2-3 üründen birinde)", value: 2, icon: "⚠️" },
      { label: "Bazen, özellikle kuvvetli bileşenlerden", value: 3, icon: "😐" },
      { label: "Nadiren, sadece çok agresif ürünlerde", value: 4, icon: "😌" },
      { label: "Hiç reaksiyon vermiyorum", value: 5, icon: "✅" },
    ],
  },
  {
    id: "q4",
    question: "Güneşe maruz kaldığınızda cildiniz ne yapar?",
    subtitle: "Koruyucu kullanmadan yaklaşık 30 dakika güneş altında.",
    options: [
      { label: "Hemen yanar, kızarır ve soyulur", value: 1, icon: "🔴" },
      { label: "Önce kızarır, sonra solar", value: 2, icon: "🟠" },
      { label: "Önce hafif kızarır, sonra bronzlaşır", value: 3, icon: "🟡" },
      { label: "Kolayca bronzlaşır, yanmaz", value: 4, icon: "🟤" },
      { label: "Hiç etkilenmez, çok koyu ya da hiç renk almaz", value: 5, icon: "⚫" },
    ],
  },
];

// Analiz Bekleme Ekranı
function LoadingScreen() {
  return (
    <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
        <Loader2 size={48} color="#a8d48a" />
      </motion.div>
      <h2 style={{ marginTop: "2rem", color: "white", fontSize: "1.5rem", fontWeight: 300 }}>
        Yapay Zeka Analizinizi Hazırlıyor...
      </h2>
      <p style={{ color: "rgba(255,255,255,0.5)", marginTop: "0.5rem" }}>Baumann Cilt Profili hesaplanıyor ve ürünler eşleştiriliyor</p>
    </div>
  );
}

// Sonuç Kartı
function ResultCard({ result, skinProfile }: { result: any; skinProfile: any }) {
  const recommended = products.filter(p =>
    skinProfile.primaryTags.some((tag: string) => p.tags.includes(tag))
  ).slice(0, 3);

  const baumannLabels: Record<string, string> = {
    SD: "Kuru & Hassas", SO: "Yağlı & Hassas", SC: "Karma & Hassas",
    RD: "Kuru & Dirençli", RO: "Yağlı & Dirençli", RC: "Karma & Dirençli",
  };

  const profileKey = skinProfile.baumannCode.substring(0, 2);
  const profileLabel = baumannLabels[profileKey] || "Kişisel";

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
      {/* Baumann Profil Başlığı */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🌿</div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(45, 90, 39, 0.3)", border: "1px solid rgba(168, 212, 138, 0.3)", padding: "0.4rem 1.2rem", borderRadius: "30px", marginBottom: "1.5rem", color: "#a8d48a", fontSize: "0.85rem", letterSpacing: "0.1em" }}>
          Baumann Kodu: {skinProfile.baumannCode}
        </div>
        <h2 style={{ fontSize: "2.5rem", fontWeight: 700, color: "white", marginBottom: "0.5rem" }}>
          {profileLabel} Cilt
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: "550px", margin: "0 auto", lineHeight: 1.7 }}>
          {result?.analiz_ozeti || "Analiziniz tamamlandı. Kişiselleştirilmiş ürün önerileriniz aşağıda."}
        </p>
      </div>

      {/* Profil Etiketleri */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2.5rem", justifyContent: "center" }}>
        {skinProfile.primaryTags.map((tag: string) => (
          <span key={tag} style={{ background: "rgba(168, 212, 138, 0.15)", border: "1px solid rgba(168, 212, 138, 0.3)", padding: "0.3rem 0.8rem", borderRadius: "20px", fontSize: "0.8rem", color: "#a8d48a" }}>
            {tag.replace(/-/g, " ")}
          </span>
        ))}
      </div>

      {/* AI Önerileri */}
      {result?.onerilen_urunler && (
        <div style={{ marginBottom: "2.5rem" }}>
          <h3 style={{ fontSize: "1.3rem", color: "#c9a44a", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <ShoppingBag size={20} /> Size Özel Ürün Önerileri
          </h3>
          <div style={{ display: "grid", gap: "1rem" }}>
            {result.onerilen_urunler.map((item: any, i: number) => {
              const product = products.find(p => p.id === item.urun_id || p.name === item.urun_adi);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "1.5rem", display: "flex", gap: "1.5rem", alignItems: "flex-start" }}
                >
                  {product && (
                    <img src={product.image} alt={product.name} style={{ width: "70px", height: "70px", borderRadius: "12px", objectFit: "cover", flexShrink: 0 }}
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=150&q=80"; }} />
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: "white", marginBottom: "0.4rem" }}>{item.urun_adi}</div>
                    <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "0.8rem" }}>{item.neden_onerildi}</p>
                    {product && (
                      <a href={product.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", background: "rgba(168, 212, 138, 0.2)", border: "1px solid rgba(168, 212, 138, 0.3)", color: "#a8d48a", padding: "0.4rem 0.9rem", borderRadius: "20px", fontSize: "0.8rem", textDecoration: "none", fontWeight: 600 }}>
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

      {/* Yaşam Tarzı Tavsiyesi */}
      {result?.yasam_tarzi_tavsiyesi && (
        <div style={{ background: "rgba(45, 90, 39, 0.2)", border: "1px solid rgba(168, 212, 138, 0.2)", borderRadius: "16px", padding: "1.5rem", marginBottom: "2rem" }}>
          <h4 style={{ color: "#a8d48a", marginBottom: "0.8rem", fontSize: "1rem" }}>💡 Uzman Tavsiyesi</h4>
          <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7, fontSize: "0.95rem" }}>{result.yasam_tarzi_tavsiyesi}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <Link href="/shop" style={{ flex: 1, textAlign: "center", background: "linear-gradient(135deg, #2d5a27 0%, #4a7c3f 100%)", color: "white", padding: "1rem 2rem", borderRadius: "30px", textDecoration: "none", fontWeight: 700, fontSize: "1rem" }}>
          Tüm Ürünleri Gör
        </Link>
        <Link href="/analysis" style={{ flex: 1, textAlign: "center", background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)", padding: "1rem 2rem", borderRadius: "30px", textDecoration: "none", fontWeight: 600, fontSize: "1rem", border: "1px solid rgba(255,255,255,0.15)" }}>
          Başka Analiz Yap
        </Link>
      </div>

      {/* Disclaimer */}
      <p style={{ marginTop: "2rem", color: "rgba(255,255,255,0.25)", fontSize: "0.75rem", textAlign: "center", lineHeight: 1.5 }}>
        ⚠️ Bu analiz tıbbi teşhis değildir. Sonuçlar bilgilendirme amaçlıdır. Ciddi cilt rahatsızlıkları için dermatolog ile görüşünüz.
      </p>
    </motion.div>
  );
}

// Ana Bileşen
export default function SkinAnalysisPage() {
  const [step, setStep] = useState<"kvkk" | "quiz" | "loading" | "result" | "error">("kvkk");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<any>(null);
  const [skinProfile, setSkinProfile] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAnswer = async (value: number) => {
    const qId = QUESTIONS[currentQ].id;
    const newAnswers = { ...answers, [qId]: value };
    setAnswers(newAnswers);

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      // Tüm sorular bitti → Algoritma çalıştır
      setStep("loading");
      const profile = scoreSkinAnalysis(newAnswers);
      setSkinProfile(profile);

      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            moduleType: `Cilt Analizi (Baumann Kodu: ${profile.baumannCode})`,
            tags: profile.primaryTags,
            userAnswers: newAnswers,
          }),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "API hatası");
        }

        const data = await res.json();
        setResult(data);
        setStep("result");
      } catch (err: any) {
        console.error("Analiz hatası:", err);
        setErrorMessage(err.message || "Bilinmeyen bir hata oluştu.");
        // Hata durumunda bile kural motorunun sonucunu göster
        setResult(null);
        setStep("result");
      }
    }
  };

  const progress = ((currentQ + (step === "result" ? 1 : 0)) / QUESTIONS.length) * 100;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0d1f16", color: "white" }}>
      {/* Header */}
      <header style={{ position: "fixed", top: 0, left: 0, width: "100%", padding: "1.2rem 3rem", background: "rgba(13, 31, 22, 0.95)", backdropFilter: "blur(20px)", zIndex: 100, borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/analysis" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
          <ArrowLeft size={18} /> Geri
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#a8d48a", fontWeight: 600, fontSize: "0.9rem" }}>
          <Leaf size={18} /> Cilt Analizi
        </div>
        <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>
          {step === "quiz" ? `${currentQ + 1}/${QUESTIONS.length}` : ""}
        </div>
      </header>

      {/* Progress Bar */}
      {step === "quiz" && (
        <div style={{ position: "fixed", top: "65px", left: 0, width: "100%", height: "3px", background: "rgba(255,255,255,0.1)", zIndex: 99 }}>
          <motion.div style={{ height: "100%", background: "linear-gradient(90deg, #2d5a27, #a8d48a)", borderRadius: "2px" }}
            animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
        </div>
      )}

      {/* Content */}
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "7rem 2rem 4rem" }}>
        <AnimatePresence mode="wait">
          {/* KVKK */}
          {step === "kvkk" && (
            <motion.div key="kvkk" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}>
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🌿</div>
                <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "1rem" }}>Akıllı Cilt Analizi</h1>
                <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.7, fontSize: "1.05rem" }}>
                  Baumann Cilt Tipi Envanteri (BSTI) yöntemiyle 4 soruyu cevaplayarak kişisel cilt profilinizi öğrenin.
                </p>
              </div>
              <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "2rem", marginBottom: "2rem", fontSize: "0.88rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
                <strong style={{ color: "rgba(255,255,255,0.8)", display: "block", marginBottom: "0.5rem" }}>📋 Veri Gizliliği & KVKK Bildirimi</strong>
                Verilen cevaplar yalnızca bu oturumda kullanılmakta olup sunucularımızda saklanmamaktadır. Kişisel sağlık verileriniz üçüncü taraflarla paylaşılmaz. Bu analiz tıbbi teşhis niteliği taşımaz; sunulan sonuçlar bilgilendirme amaçlıdır.
              </div>
              <button onClick={() => setStep("quiz")} style={{ width: "100%", padding: "1.2rem", background: "linear-gradient(135deg, #2d5a27 0%, #4a7c3f 100%)", color: "white", border: "none", borderRadius: "30px", fontSize: "1.1rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                Okudum, Analize Başla <ArrowRight size={20} />
              </button>
            </motion.div>
          )}

          {/* Quiz */}
          {step === "quiz" && (
            <motion.div key={`q-${currentQ}`} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.35 }}>
              <div style={{ marginBottom: "2.5rem" }}>
                <p style={{ color: "#a8d48a", fontSize: "0.85rem", letterSpacing: "0.1em", marginBottom: "1rem" }}>SORU {currentQ + 1} / {QUESTIONS.length}</p>
                <h2 style={{ fontSize: "1.75rem", fontWeight: 700, lineHeight: 1.3, marginBottom: "0.7rem" }}>{QUESTIONS[currentQ].question}</h2>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem" }}>{QUESTIONS[currentQ].subtitle}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {QUESTIONS[currentQ].options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.02, background: "rgba(168, 212, 138, 0.12)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(opt.value)}
                    style={{ width: "100%", padding: "1.2rem 1.5rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", color: "white", fontSize: "0.95rem", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "1rem", transition: "all 0.2s" }}
                  >
                    <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{opt.icon}</span>
                    <span style={{ lineHeight: 1.5 }}>{opt.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Loading */}
          {step === "loading" && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <LoadingScreen />
            </motion.div>
          )}

          {/* Result */}
          {step === "result" && skinProfile && (
            <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {errorMessage && (
                <div style={{ background: "rgba(220, 38, 38, 0.1)", border: "1px solid rgba(220, 38, 38, 0.3)", borderRadius: "12px", padding: "1rem 1.5rem", marginBottom: "1.5rem", display: "flex", gap: "0.7rem", alignItems: "flex-start" }}>
                  <AlertCircle size={20} color="#ef4444" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <strong style={{ color: "#ef4444", display: "block", marginBottom: "0.3rem" }}>AI bağlantısı kurulamadı</strong>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", lineHeight: 1.6 }}>{errorMessage}</p>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginTop: "0.4rem" }}>Aşağıda kural motorumuzun hesapladığı profil gösterilmektedir.</p>
                  </div>
                </div>
              )}
              <ResultCard result={result} skinProfile={skinProfile} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
