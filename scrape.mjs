import https from 'https';
import fs from 'fs';

https.get('https://www.aktardepo.com/sitemap.xml', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const regex = /<loc>(https:\/\/www\.aktardepo\.com\/[a-zA-Z0-9-?=&_]+)<\/loc>.*?<image:loc>([^<]+)<\/image:loc>(?:.*?<image:title>([^<]+)<\/image:title>)?/g;
    
    let match;
    const products = [];
    let idCounter = 1;
    
    while ((match = regex.exec(data)) !== null) {
      const url = match[1];
      const image = match[2];
      const title = match[3] || "";
      
      const lowerTitle = title.toLowerCase();
      
      // Filter for relevant herbal/apothecary products
      if (lowerTitle.includes("yağı") || lowerTitle.includes("suyu") || lowerTitle.includes("kremi") || lowerTitle.includes("çayı") || lowerTitle.includes("özü") || lowerTitle.includes("sirkesi") || lowerTitle.includes("macunu")) {
        
        // Skip un-related items
        if (lowerTitle.includes("kumaş boyası")) continue;

        let category = "Sağlık & Bağışıklık";
        let tags = ["bağışıklık", "genel sağlık"];
        let description = `${title} - Aktardepo güvencesiyle %100 doğal.`;

        if (lowerTitle.includes("yağı") || lowerTitle.includes("suyu")) {
           category = "Cilt Bakımı";
           tags = ["cilt bakımı", "nemlendirici"];
           if (lowerTitle.includes("lavanta") || lowerTitle.includes("gül") || lowerTitle.includes("papatya")) {
             category = "Aromaterapi";
             tags.push("rahatlama", "stres", "uyku");
           }
           if (lowerTitle.includes("kuşburnu") || lowerTitle.includes("kayısı") || lowerTitle.includes("badem")) {
             tags.push("kuru cilt", "anti-aging");
           }
           if (lowerTitle.includes("çay ağacı") || lowerTitle.includes("biberiye") || lowerTitle.includes("nane")) {
             tags.push("yağlı cilt", "akne", "odaklanma");
           }
        }
        if (lowerTitle.includes("çayı") || lowerTitle.includes("sirkesi") || lowerTitle.includes("macunu")) {
           category = "Sağlık & Bağışıklık";
           tags = ["sindirim", "detoks", "metabolizma", "bağışıklık"];
           if (lowerTitle.includes("zencefil") || lowerTitle.includes("zerdeçal")) {
             tags.push("eklem", "enerji");
           }
        }

        products.push({
          id: idCounter++,
          name: title,
          category: category,
          price: Math.floor(Math.random() * 200) + 99, // Dummy price as sitemap doesn't have it
          image: image,
          description: description,
          tags: tags
        });
        
        if (products.length >= 30) break;
      }
    }

    const fileContent = `export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  tags: string[]; // AI'ın eşleştirme yapacağı anahtar kelimeler
}

export const products: Product[] = ${JSON.stringify(products, null, 2)};
`;

    fs.writeFileSync('src/lib/products.ts', fileContent);
    console.log("Successfully scraped 30 products and saved to src/lib/products.ts");
  });
}).on('error', (e) => {
  console.error(e);
});
