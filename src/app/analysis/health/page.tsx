"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, HeartPulse, CheckCircle, Loader2, Info } from "lucide-react";
import Link from "next/link";

const healthQuestions = [
  {
    id: "immunity",
    q: "Bağışıklık sisteminiz ve genel enerjiniz yıl boyunca nasıldır?",
    options: [
      { text: "Sık sık yorgun düşerim, kolay hastalanırım", tags: ["bağışıklık", "enerji eksikliği", "detoks"] },
      { text: "Mevsim geçişlerinde zorlanırım ama genelde iyiyim", tags: ["destekleyici", "dengeleyici"] },
      { text: "Enerjim yüksektir, nadiren hastalanırım", tags: ["koruyucu"] },
    ]
  },
  {
    id: "digestion",
    q: "Sindirim sisteminizle ilgili en çok hangi durumu yaşarsınız?",
    options: [
      { text: "Sık sık şişkinlik ve hazımsızlık", tags: ["sindirim", "iltihap", "detoks"] },
      { text: "Stresli anlarda sindirimim bozulur", tags: ["stres", "bağırsak", "rahatlama"] },
      { text: "Düzenli ve sorunsuz bir sindirimim var", tags: ["denge"] },
    ]
  },
  {
    id: "sleep",
    q: "Uyku kalitenizi nasıl tanımlarsınız?",
    options: [
      { text: "Uykuya dalmakta çok zorlanıyorum, zihnim susmuyor", tags: ["uyku", "stres", "kaygı", "gevşeme"] },
      { text: "Uyuyorum ama sabahları yorgun uyanıyorum", tags: ["enerji eksikliği", "derin uyku"] },
      { text: "Kesintisiz uyur, dinlenmiş uyanırım", tags: ["huzur"] },
    ]
  }
];

export default function HealthAnalysis() {
  const [step, setStep] = useState(0); 
  const [answers, setAnswers] = useState<any[]>([]);
  const [collectedTags, setCollectedTags] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleKvkkAccept = () => setStep(1);

  const handleAnswer = (option: any, qText: string) => {
    const newAnswers = [...answers, { question: qText, answer: option.text }];
    const newTags = [...collectedTags, ...option.tags];
    
    setAnswers(newAnswers);
    setCollectedTags(newTags);

    if (step < healthQuestions.length) {
      setStep(step + 1);
    } else {
      submitToAI(newTags, newAnswers);
    }
  };

  const submitToAI = async (tags: string[], userAnswers: any[]) => {
    setStep(healthQuestions.length + 1);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleType: "Bütünsel Sağlık (Fonksiyonel Tıp Eğilimli)",
          tags: Array.from(new Set(tags)),
          userAnswers
        })
      });

      if (!res.ok) throw new Error("API yanıt vermedi.");
      const data = await res.json();
      setResult(data);
      setStep(healthQuestions.length + 2);
    } catch (err) {
      console.error(err);
      setError("Analiz sırasında bir hata oluştu. Lütfen tekrar deneyin.");
      setStep(healthQuestions.length + 2);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--background)", paddingTop: "6rem", paddingBottom: "4rem" }}>
      <header style={{ position: "fixed", top: 0, left: 0, width: "100%", padding: "1.5rem 4rem", background: "rgba(251, 251, 249, 0.9)", backdropFilter: "blur(10px)", zIndex: 100, borderBottom: "1px solid var(--border)" }}>
        <Link href="/analysis" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--primary-dark)", fontWeight: "bold", textDecoration: "none" }}>
          <ArrowLeft size={20} /> Geri Dön
        </Link>
      </header>

      <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 2rem" }}>
        <AnimatePresence mode="wait">
          
          {step === 0 && (
            <motion.div key="kvkk" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div style={{ backgroundColor: "white", padding: "3rem", borderRadius: "24px", border: "1px solid var(--border)", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", color: "var(--primary-light)" }}>
                  <Info size={32} />
                  <h2 style={{ fontSize: "2rem", color: "var(--primary-dark)" }}>Veri Gizliliği ve Rıza</h2>
                </div>
                <p style={{ color: "var(--accent)", lineHeight: 1.8, marginBottom: "2rem" }}>
                  Aetera Bütünsel Sağlık Analizi, genel wellness durumunuzu anlamak için fonksiyonel tıp anketlerinden ilham alınarak hazırlanmıştır. 
                  Bir doktor teşhisi veya tıbbi tedavi reçetesi değildir. Yalnızca yaşam tarzı destekleri sunar.
                  <br/><br/>
                  Kişisel sağlıkla ilgili bu genel veriler, KVKK kapsamında sadece size özel bir anlık rapor oluşturmak için yapay zekaya (anonimleştirilerek) iletilir. Veritabanlarımızda asla kaydedilmez.
                </p>
                <button 
                  onClick={handleKvkkAccept}
                  style={{ width: "100%", padding: "1.2rem", backgroundColor: "var(--primary-light)", color: "white", border: "none", borderRadius: "12px", fontSize: "1.1rem", fontWeight: "bold", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}
                >
                  <CheckCircle size={20} /> Okudum, Onaylıyorum ve Teste Başla
                </button>
              </div>
            </motion.div>
          )}

          {step > 0 && step <= healthQuestions.length && (
            <motion.div key={`q-${step}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", color: "var(--accent)", fontWeight: "bold" }}>
                <span>SORU {step} / {healthQuestions.length}</span>
                <HeartPulse size={24} color="var(--primary-light)" />
              </div>
              <h2 style={{ fontSize: "2.5rem", color: "var(--primary-dark)", marginBottom: "3rem", lineHeight: 1.2 }}>
                {healthQuestions[step - 1].q}
              </h2>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {healthQuestions[step - 1].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt, healthQuestions[step - 1].q)}
                    style={{
                      padding: "1.5rem 2rem",
                      backgroundColor: "white",
                      border: "2px solid var(--border)",
                      borderRadius: "16px",
                      fontSize: "1.2rem",
                      color: "var(--foreground)",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseOver={(e) => e.currentTarget.style.borderColor = "var(--primary-light)"}
                    onMouseOut={(e) => e.currentTarget.style.borderColor = "var(--border)"}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === healthQuestions.length + 1 && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", padding: "5rem 0" }}>
              <Loader2 size={64} color="var(--primary-light)" style={{ animation: "spin 2s linear infinite", margin: "0 auto 2rem auto" }} />
              <h2 style={{ fontSize: "2rem", color: "var(--primary-dark)", marginBottom: "1rem" }}>Bütünsel Sağlığınız Analiz Ediliyor...</h2>
              <p style={{ color: "var(--accent)", fontSize: "1.2rem" }}>Yapay Zeka (Kurumsal Model) kural tabanlı wellness verilerinizi işleyerek klinik seviyesinde eşleştirmeler yapıyor.</p>
              <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
            </motion.div>
          )}

          {step === healthQuestions.length + 2 && (
            <motion.div key="result" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              {error ? (
                <div style={{ padding: "3rem", backgroundColor: "#fff5f5", color: "#e53e3e", borderRadius: "24px", textAlign: "center" }}>
                  <h2>{error}</h2>
                  <button onClick={() => setStep(1)} style={{ marginTop: "2rem", padding: "1rem 2rem", background: "#e53e3e", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>Tekrar Dene</button>
                </div>
              ) : (
                <div style={{ backgroundColor: "white", padding: "4rem", borderRadius: "32px", border: "1px solid var(--border)", boxShadow: "0 20px 40px rgba(0,0,0,0.05)" }}>
                  <div style={{ display: "inline-block", backgroundColor: "var(--primary-light)", color: "white", padding: "0.5rem 1rem", borderRadius: "20px", fontWeight: "bold", marginBottom: "2rem", fontSize: "0.9rem", letterSpacing: "0.05em" }}>
                    AETERA BİLİMSEL SONUÇ
                  </div>
                  
                  <h1 style={{ fontSize: "2.5rem", color: "var(--primary-dark)", marginBottom: "1.5rem" }}>Fonksiyonel Wellness Raporunuz</h1>
                  <p style={{ fontSize: "1.2rem", color: "var(--foreground)", lineHeight: 1.8, marginBottom: "3rem", paddingBottom: "3rem", borderBottom: "1px solid var(--border)" }}>
                    {result?.analiz_ozeti}
                  </p>

                  <h2 style={{ fontSize: "1.8rem", color: "var(--primary-dark)", marginBottom: "2rem" }}>Sizin İçin Seçilen Formüller</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginBottom: "3rem" }}>
                    {result?.onerilen_urunler?.map((urun: any, i: number) => (
                      <div key={i} style={{ display: "flex", gap: "2rem", padding: "2rem", backgroundColor: "var(--surface)", borderRadius: "24px" }}>
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontSize: "1.5rem", color: "var(--primary-dark)", marginBottom: "1rem" }}>{urun.urun_adi}</h3>
                          <p style={{ color: "var(--accent)", lineHeight: 1.6 }}>{urun.neden_onerildi}</p>
                        </div>
                        <div style={{ alignSelf: "center" }}>
                          <Link href="/shop">
                            <button style={{ padding: "0.8rem 1.5rem", backgroundColor: "var(--primary-light)", color: "white", border: "none", borderRadius: "30px", fontWeight: "bold", cursor: "pointer" }}>
                              İncele
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ backgroundColor: "var(--primary-dark)", color: "white", padding: "3rem", borderRadius: "24px" }}>
                    <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>🌿 Bütünsel Yaşam Önerisi</h2>
                    <p style={{ fontSize: "1.1rem", lineHeight: 1.7, opacity: 0.9 }}>
                      {result?.yasam_tarzi_tavsiyesi}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
