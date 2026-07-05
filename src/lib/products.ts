export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  tags: string[]; // AI'ın eşleştirme yapacağı anahtar kelimeler
}

export const products: Product[] = [];
