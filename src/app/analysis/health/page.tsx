"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Loader2, AlertCircle, ShoppingBag, Activity } from "lucide-react";
import { scoreHealthAnalysis } from "@/lib/analysis-engine";
import { products } from "@/lib/products";
import { tagsToElement, saveElementProfile } from "@/lib/element-profile";

// Fonksiyonel Tıp Semptom Anketi (MSQ) — 4 soru, her sistem için 1 temel ölçüm
const QUESTIONS = [
  {
    id: "q1",
    system: "Sindirim Sistemi",
    question: "Son 1 ayda sindirim rahatsızlıkları (şişkinlik, gaz, hazımsızlık, bağırsak düzensizliği) ne sıklıkla yaşıyorsunuz?",
    subtitle: "Yemeklerden sonra yaşadığınız rahatsızlıkları göz önünde bulundurun.",
    options: [
      { label: "Hiç — Sindirimim çok iyi çalışıyor", value: 0, icon: "✅" },
      { label: "Nadiren — Ayda 1-2 kez hafif şikayetler", value: 1, icon: "🟢" },
      { label: "Bazen — Haftada 1-2 kez belirgin şikayetler", value: 2, icon: "🟡" },
      { label: "Sık sık — Neredeyse her gün rahatsızlık", value: 3, icon: "🔴" },
    ],
  },
  {
    id: "q3",
    system: "Bağışıklık Sistemi",
    question: "Bir yıl içinde kaç kez hastalandınız (soğuk algınlığı, grip, enfeksiyon vb.)?",
    subtitle: "Son 12 aylık dönemi değerlendirin.",
    options: [
      { label: "Hiç veya 1 kez — Çok güçlü bağışıklık", value: 0, icon: "🛡️" },
      { label: "2-3 kez — Ortalama sağlık", value: 1, icon: "🟢" },
      { label: "4-6 kez — Bağışıklığım biraz zayıf", value: 2, icon: "🟡" },
      { label: "6'dan fazla — Çok sık hastalanıyorum", value: 3, icon: "⚠️" },
    ],
  },
  {
    id: "q5",
    system: "Enerji & Vitalite",
    question: "Günlük enerji düzeyinizi nasıl tanımlarsınız?",
    subtitle: "Sabah uyanışından akşama kadar genel vitalite hissinizi değerlendirin.",
    options: [
      { label: "Çok iyi — Güne enerjik başlıyor, akşama kadar aktifim", value: 2, icon: "⚡" },
      { label: "İyi — Çoğunlukla enerjik, bazen düşüyor", value: 1, icon: "🔋" },
      { label: "Orta — Öğleden sonra belirgin düşüş yaşıyorum", value: 0, icon: "🔆" },
      { label: "Düşük — Sürekli yorgun ve bitkin hissediyorum", value: -1, icon: "💤" },
    ],
  },
  {
    id: "q7",
    system: "Eklem & Kas Sağlığı",
    question: "Eklem veya kas ağrısı ne kadar sıklıkla yaşıyorsunuz?",
    subtitle: "Sabah tutukluğu, kronik ağrı veya hareket kısıtlılığını da değerlendirin.",
    options: [
      { label: "Hiç — Eklemlerim ve kaslarım çok sağlıklı", value: 0, icon: "💪" },
      { label: "Nadiren — Yoğun egzersiz sonrası hafif ağrı", value: 1, icon: "🟢" },
      { label: "Bazen — Hava değişiminde veya haftada 1-2 kez ağrı", value: 2, icon: "🟡" },
      { label: "Sık sık — Neredeyse her gün eklem veya kas ağrısı", value: 3, icon: "🔴" },
    ],
  },
];

function LoadingScreen() {
  return (
    <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
        <Loader2 size={48} color="#f59e0b" />
      </motion.div>
      <h2 style={{ marginTop: "2rem", color: "white", fontSize: "1.5rem", fontWeight: 300 }}>
        Sağlık Profiliniz Hazırlanıyor...
      </h2>
      <p style={{ color: "rgba(255,255,255,0.5)", marginTop: "0.5rem" }}>Fonksiyonel Tıp algoritması çalışıyor</p>
    </div>
  );
}

function HealthMeter({ label, score, color }: { label: string; score: number; color: string }) {
  const level = score >= 60 ? "Dikkat" : score >= 35 ? "Orta" : "İyi";
  const levelColor = score >= 60 ? "#ef4444" : score >= 35 ? "#f59e0b" : "#22c55e";
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "1.2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
        <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.82rem" }}>{label}</span>
        <span style={{ color: levelColor, fontWeight: 700, fontSize: "0.8rem" }}>{level}</span>
      </div>
      <div style={{ height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "3px" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ height: "100%", background: `linear-gradient(90deg, ${color}aa, ${color})`, borderRadius: "3px" }}
        />
      </div>
    </div>
  );
}

function ResultCard({ result, healthProfile }: { result: any; healthProfile: any }) {
  const riskLabels: Record<string, string> = { low: "Düşük Risk", moderate: "Orta Risk", high: "Yüksek Risk" };
  const riskColors: Record<string, string> = { low: "#22c55e", moderate: "#f59e0b", high: "#ef4444" };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>💚</div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: `${riskColors[healthProfile.riskLevel]}22`, border: `1px solid ${riskColors[healthProfile.riskLevel]}44`, padding: "0.4rem 1.2rem", borderRadius: "30px", marginBottom: "1.5rem", color: riskColors[healthProfile.riskLevel], fontSize: "0.85rem" }}>
          {riskLabels[healthProfile.riskLevel]} — Fonksiyonel Sağlık Puanı
        </div>
        <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "white", marginBottom: "0.8rem" }}>Sağlık Profiliniz</h2>
        {result?.analiz_ozeti && (
          <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: "550px", margin: "0 auto", lineHeight: 1.7 }}>{result.analiz_ozeti}</p>
        )}
      </div>

      {/* Sistem Göstergeleri */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem", marginBottom: "2.5rem" }}>
        <HealthMeter label="Sindirim Sistemi" score={healthProfile.digestiveScore} color="#f59e0b" />
        <HealthMeter label="Bağışıklık Sistemi" score={healthProfile.immuneScore} color="#ef4444" />
        <HealthMeter label="Enerji & Vitalite" score={healthProfile.energyScore} color="#f59e0b" />
        <HealthMeter label="Eklem & Kas Sağlığı" score={healthProfile.jointScore} color="#3b82f6" />
      </div>

      {/* Ürün Önerileri */}
      {result?.onerilen_urunler && (
        <div style={{ marginBottom: "2.5rem" }}>
          <h3 style={{ fontSize: "1.3rem", color: "#c9a44a", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <ShoppingBag size={20} /> Bütünsel Sağlığınız için Öneriler
          </h3>
          <div style={{ display: "grid", gap: "1rem" }}>
            {result.onerilen_urunler.map((item: any, i: number) => {
              const product = products.find(p => p.id === item.urun_id || p.name === item.urun_adi);
              return (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "1.5rem", display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                  {product && (
                    <img src={product.image} alt={product.name} style={{ width: "70px", height: "70px", borderRadius: "12px", objectFit: "cover", flexShrink: 0 }}
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=150&q=80"; }} />
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: "white", marginBottom: "0.4rem" }}>{item.urun_adi}</div>
                    <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "0.8rem" }}>{item.neden_onerildi}</p>
                    {product && (
                      <a href={product.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", background: "rgba(245, 158, 11, 0.15)", border: "1px solid rgba(245, 158, 11, 0.3)", color: "#f59e0b", padding: "0.4rem 0.9rem", borderRadius: "20px", fontSize: "0.8rem", textDecoration: "none", fontWeight: 600 }}>
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

      {result?.yasam_tarzi_tavsiyesi && (
        <div style={{ background: "rgba(139, 69, 19, 0.2)", border: "1px solid rgba(201, 164, 74, 0.2)", borderRadius: "16px", padding: "1.5rem", marginBottom: "2rem" }}>
          <h4 style={{ color: "#c9a44a", marginBottom: "0.8rem", fontSize: "1rem" }}>🌿 Fonksiyonel Tıp Tavsiyesi</h4>
          <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7, fontSize: "0.95rem" }}>{result.yasam_tarzi_tavsiyesi}</p>
        </div>
      )}

      <div style={{ display: "flex", gap: "1rem" }}>
        <Link href="/shop" style={{ flex: 1, textAlign: "center", background: "linear-gradient(135deg, #8b4513 0%, #c96f2a 100%)", color: "white", padding: "1rem 2rem", borderRadius: "30px", textDecoration: "none", fontWeight: 700, fontSize: "1rem" }}>
          Tüm Ürünleri Gör
        </Link>
        <Link href="/analysis" style={{ flex: 1, textAlign: "center", background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)", padding: "1rem 2rem", borderRadius: "30px", textDecoration: "none", fontWeight: 600, fontSize: "1rem", border: "1px solid rgba(255,255,255,0.15)" }}>
          Başka Analiz Yap
        </Link>
      </div>

      <p style={{ marginTop: "2rem", color: "rgba(255,255,255,0.25)", fontSize: "0.75rem", textAlign: "center", lineHeight: 1.5 }}>
        ⚠️ Bu analiz tıbbi teşhis değildir. Ciddi sağlık sorunları için lütfen bir hekime başvurunuz.
      </p>
    </motion.div>
  );
}

export default function HealthAnalysisPage() {
  const [step, setStep] = useState<"kvkk" | "quiz" | "loading" | "result">("kvkk");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<any>(null);
  const [healthProfile, setHealthProfile] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAnswer = async (value: number) => {
    const qId = QUESTIONS[currentQ].id;
    const newAnswers = { ...answers, [qId]: value };
    setAnswers(newAnswers);

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      setStep("loading");
      const profile = scoreHealthAnalysis(newAnswers);
      setHealthProfile(profile);
      // 4 Element profilini hesapla ve kaydet
      const element = tagsToElement(profile.primaryTags, "health");
      saveElementProfile({ element, moduleType: "health", timestamp: Date.now(), primaryTags: profile.primaryTags });
      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            moduleType: `Bütünsel Sağlık Analizi (Risk Düzeyi: ${profile.riskLevel})`,
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
    <div style={{ minHeight: "100vh", backgroundColor: "#1a0d05", color: "white" }}>
      <header style={{ position: "fixed", top: 0, left: 0, width: "100%", padding: "1.2rem 3rem", background: "rgba(26, 13, 5, 0.95)", backdropFilter: "blur(20px)", zIndex: 100, borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/analysis" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}><ArrowLeft size={18} /> Geri</Link>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#f59e0b", fontWeight: 600, fontSize: "0.9rem" }}><Activity size={18} /> Sağlık Analizi</div>
        <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>{step === "quiz" ? `${currentQ + 1}/${QUESTIONS.length}` : ""}</div>
      </header>

      {step === "quiz" && (
        <div style={{ position: "fixed", top: "65px", left: 0, width: "100%", height: "3px", background: "rgba(255,255,255,0.1)", zIndex: 99 }}>
          <motion.div style={{ height: "100%", background: "linear-gradient(90deg, #8b4513, #f59e0b)", borderRadius: "2px" }} animate={{ width: `${((currentQ + 1) / QUESTIONS.length) * 100}%` }} />
        </div>
      )}

      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "7rem 2rem 4rem" }}>
        <AnimatePresence mode="wait">
          {step === "kvkk" && (
            <motion.div key="kvkk" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}>
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>💚</div>
                <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "1rem" }}>Bütünsel Sağlık Analizi</h1>
                <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.7, fontSize: "1.05rem" }}>
                  Fonksiyonel Tıp Semptom Anketi (MSQ) metodolojisiyle sindirim, bağışıklık ve enerji sisteminizi 4 soruda değerlendirin.
                </p>
              </div>
              <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "2rem", marginBottom: "2rem", fontSize: "0.88rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
                <strong style={{ color: "rgba(255,255,255,0.8)", display: "block", marginBottom: "0.5rem" }}>📋 Veri Gizliliği & KVKK Bildirimi</strong>
                Sağlık verileriniz yalnızca bu oturumda işlenmekte, saklanmamakta ve üçüncü taraflarla paylaşılmamaktadır. Bu analiz tıbbi teşhis niteliği taşımaz. Ciddi sağlık sorunları için doktor ile görüşünüz.
              </div>
              <button onClick={() => setStep("quiz")} style={{ width: "100%", padding: "1.2rem", background: "linear-gradient(135deg, #8b4513 0%, #c96f2a 100%)", color: "white", border: "none", borderRadius: "30px", fontSize: "1.1rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                Analize Başla <ArrowRight size={20} />
              </button>
            </motion.div>
          )}

          {step === "quiz" && (
            <motion.div key={`q-${currentQ}`} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.35 }}>
              <div style={{ marginBottom: "2rem" }}>
                <p style={{ color: "#f59e0b", fontSize: "0.78rem", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>{QUESTIONS[currentQ].system}</p>
                <p style={{ color: "#c9a44a", fontSize: "0.85rem", letterSpacing: "0.08em", marginBottom: "1rem" }}>SORU {currentQ + 1} / {QUESTIONS.length}</p>
                <h2 style={{ fontSize: "1.7rem", fontWeight: 700, lineHeight: 1.3, marginBottom: "0.7rem" }}>{QUESTIONS[currentQ].question}</h2>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.88rem" }}>{QUESTIONS[currentQ].subtitle}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {QUESTIONS[currentQ].options.map((opt, idx) => (
                  <motion.button key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.02, background: "rgba(245, 158, 11, 0.12)" }} whileTap={{ scale: 0.98 }}
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

          {step === "result" && healthProfile && (
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
              <ResultCard result={result} healthProfile={healthProfile} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
