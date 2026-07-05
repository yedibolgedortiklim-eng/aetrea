"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, Beaker, Leaf, Loader2 } from "lucide-react";
import Link from "next/link";

const questions = [
  {
    id: "q1",
    question: "Sabah uyandığınızda cildiniz genellikle nasıl hisseder?",
    subtitle: "Geleneksel Çin Tıbbı'na göre cildin sabahki durumu, vücudunuzun gece boyunca suyu ve enerjiyi nasıl işlediğini gösterir.",
    options: [
      { id: "a", label: "Gergin ve nemsiz (Yin Eksikliği)", icon: "🏜️", scores: { yin: 1, dampHeat: 0, liverQi: 0 } },
      { id: "b", label: "T bölgesinde yağlı, parlayan (Nemli-Sıcak)", icon: "💧", scores: { yin: 0, dampHeat: 1, liverQi: 0 } },
      { id: "c", label: "Kızarık ve hassas (Isı Fazlalığı)", icon: "🔥", scores: { yin: 0, dampHeat: 0.5, liverQi: 0.5 } },
      { id: "d", label: "Dengeli ve rahat (Uyumlu Qi)", icon: "🌿", scores: { yin: 0, dampHeat: 0, liverQi: 0 } }
    ]
  },
  {
    id: "q2",
    question: "Genel enerji (Qi) seviyenizi nasıl tanımlarsınız?",
    subtitle: "Enerji seviyeniz, kullanılacak adaptogen ve uçucu yağların yoğunluğunu belirler.",
    options: [
      { id: "a", label: "Sürekli yorgun, tükenmiş", icon: "🔋", scores: { yin: 1, dampHeat: 0, liverQi: 0 } },
      { id: "b", label: "Gün içinde dalgalı, akşama doğru düşen", icon: "📉", scores: { yin: 0, dampHeat: 0, liverQi: 0.5 } },
      { id: "c", label: "Hareketli ama gergin/stresli", icon: "⚡", scores: { yin: 0, dampHeat: 0, liverQi: 1 } },
      { id: "d", label: "Sakin, odaklanmış ve dengeli", icon: "✨", scores: { yin: 0, dampHeat: 0, liverQi: 0 } }
    ]
  },
  {
    id: "q3",
    question: "Duygusal durumunuz cildinizi nasıl etkiliyor?",
    subtitle: "Zihin ve beden bir bütündür. Stres hormonları cilt bariyerini doğrudan etkiler.",
    options: [
      { id: "a", label: "Stres anında sivilcelenme/kızarma artıyor", icon: "🌪️", scores: { yin: 0, dampHeat: 0.5, liverQi: 1 } },
      { id: "b", label: "Uykusuzluk ve üzüntüyle cildim matlaşıyor", icon: "🌙", scores: { yin: 1, dampHeat: 0, liverQi: 0 } },
      { id: "c", label: "Duygusal dalgalanmalarım cildime pek yansımıyor", icon: "🌤️", scores: { yin: 0, dampHeat: 0, liverQi: 0 } }
    ]
  },
  {
    id: "q4",
    question: "Şu an en çok neye ihtiyacınız olduğunu hissediyorsunuz?",
    subtitle: "İçgüdüleriniz genellikle bedenin asıl ihtiyacını fısıldar.",
    options: [
      { id: "a", label: "Derin bir arınma ve detoks", icon: "🌊", scores: { yin: 0, dampHeat: 1, liverQi: 0 } },
      { id: "b", label: "Köklenme, sakinleşme ve uyku", icon: "🟤", scores: { yin: 0, dampHeat: 0, liverQi: 1 } },
      { id: "c", label: "Canlanma, parlaklık ve nem", icon: "☀️", scores: { yin: 1, dampHeat: 0, liverQi: 0 } }
    ]
  }
];

const profiles = {
  yinDeficiency: {
    title: "Yin Eksikliği (Kuruluk ve Matlık)",
    desc: "Analizlerimize göre vücudunuzda serinletici ve nemlendirici enerji olan 'Yin' eksikliği belirtileri var. Bu durum cildinizde kuruluk, gerginlik ve matlığa sebep oluyor.",
    products: [
      { name: "Organik Kuşburnu Çekirdeği Yağı", reason: "Hücre yenilenmesini tetikler, derinlemesine Yin (nem) sağlar." },
      { name: "Isparta Gül Suyu", reason: "Cildin hararetini alır, pH dengesini korur ve kızarıklığı yatıştırır." }
    ],
    routine: {
      am: "Sabah yüzünüzü sadece Gül Suyu ile canlandırın. Kuşburnu yağından 2 damla uygulayın.",
      pm: "Akşam yoğun Kuşburnu yağı masajı ile cildinizin bariyerini onararak uykuya geçin."
    }
  },
  dampHeat: {
    title: "Nem-Sıcak Birikimi (Yağlanma ve Hassasiyet)",
    desc: "Analizlerimize göre vücudunuzda 'Nem ve Sıcak' birikimi mevcut. Bu durum ciltte fazla sebum üretimine, parlamaya ve sivilcelenmeye (ısı) yol açar.",
    products: [
      { name: "Zencefil & Zerdeçal Eliksiri", reason: "İçsel toksinleri (Dampness) arındırır ve antioksidan koruma sağlar." },
      { name: "Nane & Okaliptüs Uçucu Yağı", reason: "Cildi ferahlatır (Isıyı alır), gözenekleri arındırır ve sebumu dengeler." }
    ],
    routine: {
      am: "Sabah yüzünüzü arındırıcı bir temizleyici ile yıkayın. Güne Zencefil Eliksiri içerek başlayın.",
      pm: "Akşam Nane & Okaliptüs yağını buhurdanlıkta kullanarak odanın havasını ve nefesinizi temizleyin."
    }
  },
  liverQi: {
    title: "Karaciğer Qi Durgunluğu (Stres ve Gerginlik)",
    desc: "Analizlerimize göre enerjinizde (Qi) strese bağlı durgunluk var. Bu durum sinir sisteminizi geriyor ve stres hormonları cildinizi doğrudan yoruyor.",
    products: [
      { name: "Saf Lavanta Uçucu Yağı", reason: "Sinir sistemini yatıştırır, Karaciğer Qi'sini (enerjisini) dengeler ve gevşetir." },
      { name: "Huzur Ritüeli Bitki Çayı", reason: "İçsel stresi azaltır, derin ve onarıcı bir uyku çekmenizi sağlar." }
    ],
    routine: {
      am: "Güne sakin bir başlangıç yapın. Cildinize nazik davranın.",
      pm: "Yatmadan 1 saat önce Huzur Ritüeli çayınızı için. Yastığınıza 1 damla Lavanta yağı damlatın."
    }
  }
};

export default function PremiumAnalysisPage() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [scores, setScores] = useState({ yin: 0, dampHeat: 0, liverQi: 0 });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resultProfile, setResultProfile] = useState<keyof typeof profiles | null>(null);

  const handleStart = () => setCurrentStep(0);

  const handleAnswer = (optionScores: { yin: number, dampHeat: number, liverQi: number }) => {
    setScores(prev => ({
      yin: prev.yin + optionScores.yin,
      dampHeat: prev.dampHeat + optionScores.dampHeat,
      liverQi: prev.liverQi + optionScores.liverQi
    }));
    
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 400);
    } else {
      setTimeout(() => startAnalysis(), 400);
    }
  };

  const startAnalysis = () => {
    setCurrentStep(-1);
    setIsAnalyzing(true);
    
    setTimeout(() => {
      // Determine highest score
      let highest = "yin";
      if (scores.dampHeat > scores.yin && scores.dampHeat > scores.liverQi) highest = "dampHeat";
      if (scores.liverQi > scores.yin && scores.liverQi > scores.dampHeat) highest = "liverQi";
      
      setResultProfile(highest as keyof typeof profiles);
      setIsAnalyzing(false);
    }, 4500);
  };

  const progress = (currentStep / questions.length) * 100;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--background)", color: "var(--foreground)", position: "relative", overflow: "hidden" }}>
      <header style={{ position: "absolute", top: 0, left: 0, width: "100%", padding: "2rem 4rem", zIndex: 100, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--primary-dark)", fontWeight: "bold", textDecoration: "none" }}>
          <ArrowLeft size={20} /> Ana Sayfa
        </Link>
        <div style={{ fontWeight: "bold", letterSpacing: "0.2em", color: "var(--primary)", fontSize: "1.2rem" }}>AETERA KLİNİK</div>
      </header>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: "0 2rem" }}>
        <AnimatePresence mode="wait">
          
          {/* INTRO STEP */}
          {currentStep === -1 && !isAnalyzing && !resultProfile && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              style={{ textAlign: "center", maxWidth: "700px" }}
            >
              <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "center" }}>
                <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "var(--surface-hover)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--secondary)" }}>
                  <Sparkles size={32} color="var(--primary)" />
                </div>
              </div>
              <h1 style={{ fontSize: "3.5rem", color: "var(--primary-dark)", marginBottom: "1.5rem", lineHeight: 1.2 }}>
                Size Özel Formülünüzü Keşfedin
              </h1>
              <p style={{ fontSize: "1.2rem", color: "var(--accent)", marginBottom: "3rem", lineHeight: 1.6 }}>
                Modern dermatoloji ve Kadim Çin Tıbbı prensiplerini harmanlayan bilimsel algoritmamızla, bedensel ve ruhsal ihtiyaçlarınıza en uygun bitkisel profili çıkarıyoruz.
              </p>
              <button 
                onClick={handleStart}
                style={{
                  padding: "1.2rem 3rem",
                  backgroundColor: "var(--primary)",
                  color: "white",
                  border: "none",
                  borderRadius: "40px",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "0 10px 30px rgba(40, 81, 65, 0.3)",
                  transition: "transform 0.3s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Analize Başla
              </button>
            </motion.div>
          )}

          {/* QUIZ STEPS */}
          {currentStep >= 0 && !isAnalyzing && !resultProfile && (
            <motion.div
              key={`q-${currentStep}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
              style={{ width: "100%", maxWidth: "800px" }}
            >
              <div style={{ width: "100%", height: "4px", backgroundColor: "var(--surface-hover)", borderRadius: "2px", marginBottom: "4rem", overflow: "hidden" }}>
                <motion.div 
                  initial={{ width: `${((currentStep) / questions.length) * 100}%` }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                  style={{ height: "100%", backgroundColor: "var(--secondary)" }}
                />
              </div>

              <span style={{ color: "var(--secondary-dark)", fontWeight: "bold", letterSpacing: "0.1em", fontSize: "0.9rem", textTransform: "uppercase" }}>
                Soru {currentStep + 1} / {questions.length}
              </span>
              
              <h2 style={{ fontSize: "2.5rem", color: "var(--primary-dark)", marginTop: "1rem", marginBottom: "0.5rem" }}>
                {questions[currentStep].question}
              </h2>
              <p style={{ color: "var(--accent)", fontSize: "1.1rem", marginBottom: "3rem", opacity: 0.8 }}>
                {questions[currentStep].subtitle}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {questions[currentStep].options.map((option) => (
                  <motion.button
                    key={option.id}
                    whileHover={{ scale: 1.02, backgroundColor: "var(--surface-hover)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(option.scores)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.5rem",
                      padding: "1.5rem 2rem",
                      backgroundColor: "white",
                      border: "1px solid var(--border)",
                      borderRadius: "16px",
                      cursor: "pointer",
                      textAlign: "left",
                      fontSize: "1.1rem",
                      color: "var(--foreground)",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.02)",
                      transition: "border-color 0.3s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--secondary)"}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
                  >
                    <span style={{ fontSize: "1.8rem" }}>{option.icon}</span>
                    <span style={{ fontWeight: 500 }}>{option.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ANALYZING LOADER */}
          {isAnalyzing && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                style={{ marginBottom: "2rem", color: "var(--secondary)" }}
              >
                <Loader2 size={64} />
              </motion.div>
              <h2 style={{ fontSize: "2rem", color: "var(--primary-dark)", marginBottom: "1rem" }}>Profiliniz Hesaplanıyor...</h2>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                style={{ color: "var(--accent)", fontSize: "1.1rem" }}
              >
                Kadim TCM prensipleri taranıyor...
              </motion.div>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
                style={{ color: "var(--accent)", fontSize: "1.1rem", marginTop: "0.5rem" }}
              >
                Aktif şifa bileşenleri eşleştiriliyor...
              </motion.div>
            </motion.div>
          )}

          {/* RESULTS PAGE */}
          {resultProfile && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ width: "100%", maxWidth: "900px", padding: "4rem 0" }}
            >
              <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                <div style={{ color: "var(--secondary)", fontWeight: "bold", letterSpacing: "0.2em", marginBottom: "1rem" }}>AETERA BİLİMSEL SONUÇ</div>
                <h1 style={{ fontSize: "3rem", color: "var(--primary-dark)" }}>{profiles[resultProfile].title}</h1>
                <p style={{ color: "var(--accent)", fontSize: "1.2rem", marginTop: "1rem" }}>{profiles[resultProfile].desc}</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", marginBottom: "4rem" }}>
                <div style={{ backgroundColor: "white", padding: "3rem", borderRadius: "24px", boxShadow: "0 10px 40px rgba(0,0,0,0.05)", borderTop: "4px solid var(--primary)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                    <Beaker color="var(--primary)" size={28} />
                    <h3 style={{ fontSize: "1.5rem", color: "var(--foreground)" }}>Önerilen Aktif Özler</h3>
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {profiles[resultProfile].products.map((p, idx) => (
                      <li key={idx} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                        <span style={{ color: "var(--secondary)" }}>✦</span>
                        <div>
                          <strong style={{ display: "block", color: "var(--primary-dark)", marginBottom: "0.3rem" }}>{p.name}</strong>
                          <span style={{ color: "var(--accent)", fontSize: "0.95rem" }}>{p.reason}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ backgroundColor: "white", padding: "3rem", borderRadius: "24px", boxShadow: "0 10px 40px rgba(0,0,0,0.05)", borderTop: "4px solid var(--secondary)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                    <Leaf color="var(--secondary-dark)" size={28} />
                    <h3 style={{ fontSize: "1.5rem", color: "var(--foreground)" }}>Kadim Şifa Rutini</h3>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                    <div>
                      <strong style={{ display: "block", color: "var(--primary-dark)", marginBottom: "0.5rem" }}>Sabah: Koruma</strong>
                      <span style={{ color: "var(--accent)", lineHeight: 1.5 }}>{profiles[resultProfile].routine.am}</span>
                    </div>
                    <div>
                      <strong style={{ display: "block", color: "var(--primary-dark)", marginBottom: "0.5rem" }}>Akşam: Onarım</strong>
                      <span style={{ color: "var(--accent)", lineHeight: 1.5 }}>{profiles[resultProfile].routine.pm}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: "0.9rem", color: "var(--accent)", marginBottom: "2rem" }}>* Bu öneriler bilimsel dermatoloji ve kadim tıp kaynaklarından derlenmiştir.</p>
                <Link href="/shop" style={{
                  display: "inline-block",
                  padding: "1.2rem 3rem",
                  backgroundColor: "var(--primary)",
                  color: "white",
                  borderRadius: "40px",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  textDecoration: "none",
                  boxShadow: "0 10px 30px rgba(40, 81, 65, 0.3)"
                }}>
                  Önerilen Ürünleri Mağazada Gör
                </Link>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
