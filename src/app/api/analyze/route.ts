import { GoogleGenAI, Type, Schema } from "@google/genai";
import { NextResponse } from "next/server";
import { products } from "@/lib/products";

// Initialize the SDK. It automatically picks up GEMINI_API_KEY from environment.
const ai = new GoogleGenAI({});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { moduleType, tags, userAnswers } = body;

    // Define the response schema strictly as requested by the user
    const responseSchema: Schema = {
      type: Type.OBJECT,
      properties: {
        analiz_ozeti: {
          type: Type.STRING,
          description: "Kullanıcının durumunun kısa, bilimsel ve empatik bir özeti.",
        },
        onerilen_urunler: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              urun_id: { type: Type.STRING },
              urun_adi: { type: Type.STRING },
              neden_onerildi: { type: Type.STRING, description: "Bu ürünün kullanıcının profiline nasıl doğrudan iyi geleceğinin bilimsel açıklaması." },
            },
            required: ["urun_id", "urun_adi", "neden_onerildi"],
          },
        },
        yasam_tarzi_tavsiyesi: {
          type: Type.STRING,
          description: "Ürünler dışında, kullanıcının profiline uygun 1 adet pratik ve bilimsel yaşam tarzı önerisi.",
        },
      },
      required: ["analiz_ozeti", "onerilen_urunler", "yasam_tarzi_tavsiyesi"],
    };

    const prompt = `
# ROL VE GÖREV
Sen, klinik psikoloji, dermatoloji ve bütünsel beslenme/wellness konularında uzmanlaşmış kıdemli bir yapay zeka danışmanısın. Görevin, sana sağlanan Kullanıcı Analiz Raporu'nu incelemek ve Mağaza Ürün Listesi içerisinden bu kullanıcıya en uygun, bilimsel olarak tutarlı ürün kombinasyonunu (Maksimum 3 ürün) seçerek kişiselleştirilmiş bir tavsiye raporu oluşturmaktır.

# GİRDİ VERİLERİ

## 1. KULLANICI ANALİZ RAPORU:
- Analiz Modülü: ${moduleType}
- Kurallı Motor Etiketleri (Tags): ${tags.join(", ")}
- Detaylı Soru/Cevaplar: ${JSON.stringify(userAnswers)}

## 2. ERİŞİLEBİLİR MAĞAZA ÜRÜN LİSTESİ (JSON):
${JSON.stringify(products.map(p => ({ id: p.id, ad: p.name, kategori: p.category, etiketler: p.tags })))}

# KISITLAR VE KURALLAR
1. TIBBİ TEŞHİS KOYMA: Kesinlikle "Şu hastalığınız var" veya "Bu ürün şu hastalığı tedavi eder" deme. "Destekler", "Bariyeri güçlendirir", "İyi bir eşlikçidir" gibi wellness dilini kullan.
2. BİLİMSEL TUTARLILIK: Seçtiğin ürünlerin bileşenleri ile kullanıcının durumu birbiriyle çelişmemeli.
3. MAĞAZA DIŞINA ÇIKMA: Sadece sana verilen listedeki ürün ID'lerini önerebilirsin. Dışarıdan marka veya ürün uydurma.
4. TON: Empatik, bilimsel, net, manipülasyondan uzak ve güven verici bir ton kullan.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const resultText = response.text;
    
    if (!resultText) {
       console.error("Empty response from AI");
       throw new Error("Empty response from AI");
    }
    
    console.log("AI Yanıtı Başarıyla Alındı.");
    return NextResponse.json(JSON.parse(resultText));
  } catch (error: any) {
    console.error("Yapay Zeka API Hatası:", error);
    
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Vercel üzerinde GEMINI_API_KEY eksik! Lütfen Vercel panelinden Environment Variables kısmına API anahtarınızı ekleyin." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Analiz sırasında bir hata oluştu. Lütfen tekrar deneyin.", details: error.message },
      { status: 500 }
    );
  }
}
