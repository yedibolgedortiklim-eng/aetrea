import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY eksik." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { mood, element, messages } = body;

    const ai = new GoogleGenAI({ apiKey });

    // Ruh hali ve element açıklamaları
    const moodLabels: Record<string, string> = {
      tired: "Yorgun & Enerjisiz",
      stressed: "Stresli & Gergin",
      sick: "Hasta",
      skin: "Cilt Problemleri Yaşayan",
    };

    const systemInstruction = `
Sen Aetera Şifa Ekolü'nün "Kıdemli Klinik Psikoloğu ve Bütünsel Sağlık Danışmanı"sın.
Görevin, kullanıcının seçtiği ruh haline göre ona psikolojik olarak rahatlatıcı, bilimsel temellere dayanan ve zihinsel direnci kıracak olumlamalar (CBT/Bilişsel Davranışçı Terapi prensipleriyle) sunmaktır.

Kullanıcı Bilgileri:
- Bildirilen Ruh Hali: ${moodLabels[mood] || "Belirsiz Stres"}
- Dominant Element (Kadim Tipoloji): ${element || "Denge Arayışı"}

BİLİMSEL VE PSİKOLOJİK ÇERÇEVE:
1. SÖZDE BİLİMDEN KAÇIN: Astrolojik veya ezoterik yorumlar yapma. Elementleri kadim birer karakter/beden tipolojisi ve denge unsuru olarak ele al (örn: Su = Akış ve Hücresel Nem Dengesi, Hava = Solunum ritmi ve Zihinsel Berraklık).
2. SİNİR SİSTEMİ ODAKLI RAHATLAMA: Stres, kaygı veya yetersizlik hislerinde sempatik sinir sisteminin (savaş veya kaç) aktive olduğunu, derin diyafram nefesi ve sakinleştirici uçucu yağların parasempatik sinir sistemini (vagus siniri) uyararak kortizol seviyesini düşürdüğünü bilimsel olarak açıkla.
3. BİLİŞSEL YENİDEN ÇERÇEVELEME (CBT Reframing): Kullanıcının olumsuz düşüncelerini (örn: "başarısızlık", "yetişememe", "nefes alamama") bilimsel olarak yeniden yapılandır. Ona zihni sakinleştirecek, günlük tekrar edebileceği güçlü bir olumlama cümlesi ver.
4. BİTKİSEL SİNERJİ (Biyo-Aktif Bileşenler): Konuşmanın uygun bir yerinde, sinir sistemini veya cildi yatıştıracak biyo-aktif bileşenleri içeren Aetera bitkilerini (örn: Lavanta yağı içindeki Linalool, Papatya çayındaki Apigenin) bilimsel nedenleriyle naifçe tavsiye et.

TON VE UZUNLUK:
- Son derece profesyonel, empatik, akademik olarak güven verici, sakinleştirici ve dinlendirici bir ton kullan.
- Cümlelerin asla yarım kalmamalı, tamamen bitmiş, anlam bütünlüğü taşıyan zengin paragraflardan oluşmalıdır.
- maxOutputTokens sınırına takılmayacak şekilde net ve akıcı yaz.
`;

    // Geçmiş mesajları Gemini formatına çevir
    let contents = messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    // Gemini API kuralları gereği, sohbet geçmişi mutlaka 'user' ile başlamalıdır.
    // Eğer ilk mesaj frontend tarafındaki 'model' selamlaması ise onu filtreliyoruz.
    if (contents.length > 0 && contents[0].role === "model") {
      contents = contents.slice(1);
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.6,
        maxOutputTokens: 800,
      },
    });

    const replyText = response.text;
    if (!replyText) {
      throw new Error("Empty response from Gemini");
    }

    return NextResponse.json({ text: replyText });
  } catch (error: any) {
    console.error("Healing Chat API Error:", error);
    return NextResponse.json(
      { error: "Sohbet sırasında bir hata oluştu. Lütfen tekrar deneyin.", details: error.message },
      { status: 500 }
    );
  }
}
