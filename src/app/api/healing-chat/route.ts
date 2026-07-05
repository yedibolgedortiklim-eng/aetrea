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
Sen Aetera Şifa Ekolü'nün kadim "Ruh ve Beden Uyum Asistanı" (Alchemical Spiritual Guide) ve Olumlama Uzmanısın.
Görevin, kullanıcının şu anki ruh halini iyileştirmek, ona derin, şefkatli ve bilimsel temelli olumlamalar (affirmation) sunmak ve ruh-beden uyumunu sağlamaktır.

Kullanıcı Bilgileri:
- Şu anki Ruh Hali: ${moodLabels[mood] || "Bilinmiyor"}
- Dominant Elementi: ${element || "Henüz Belirlenmedi"}

KURALLAR:
1. ŞİİRSEL VE YATIŞTIRICI TON: Yanıtların kısa, öz, şiirsel, rahatlatıcı ve bilgece olmalıdır. Uzun, sıkıcı paragraflar yazma.
2. OLUMLAMA (AFFIRMATION): Kullanıcının durumuna göre ona güçlü, tekrarlayabileceği 1 adet Türkçe olumlama cümlesi hediye et (örn: "Nefes alıyorum ve zihnimdeki fırtınanın yatışmasına izin veriyorum").
3. BÜTÜNSEL BAKIŞ: Kadim Çin Tıbbı, Ayurveda ve element teorisine atıfta bulunarak onun element dengesini kurmasına yardım et.
4. TIBBİ HADDİ AŞMAMA: Tıbbi teşhis koyma.
5. SOHBETİN SONUNDA / İLERLEYEN AŞAMALARDA: Eğer kullanıcı rahatlamışsa veya ürün tavsiyesi isterse, ona durumuna en uygun bitkiyi veya yağı (örn: Lavanta, Biberiye, Papatya Çayı) naifçe öner.

Lütfen doğrudan kullanıcıya hitap et, samimi ve empatik ol. Sen bir robottan ziyade mistik bir şifa rehberisin.
`;

    // Geçmiş mesajları Gemini formatına çevir
    const contents = messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 500,
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
      { error: "Sohbet sırasında bir hata oluştu.", details: error.message },
      { status: 500 }
    );
  }
}
