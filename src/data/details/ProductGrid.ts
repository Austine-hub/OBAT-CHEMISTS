// src/data/products.ts
// ===============================================================
// 🧠 Centralized Product Model Layer
// Single source of truth for beauty/health products
// ===============================================================

// ---- Product Model ----
export interface Product {
  id: number;
  name: string;
  image: string;          // path from public/assets/products/
  discount: number;       // percentage discount (0–100)
  originalPrice: number;  // original price in KES
  currentPrice: number;   // discounted price in KES
}

// ---- Data Source (Single Source of Truth) ----
export const products: readonly Product[] = [
  {
    id: 1,
    name: "Cosy Toilet Paper Emb. Unwrap 10s 200 Sheets White",
    image: "/assets/products2/1.jpg",
    discount: 45,
    originalPrice: 545,
    currentPrice: 300,
  },
  {
    id: 2,
    name: "Uncover Aloe Invisible Sunscreen 80ml",
    image: "/assets/products2/2.jpg",
    discount: 10,
    originalPrice: 3200,
    currentPrice: 2880,
  },
  {
    id: 3,
    name: "Acnes Treatment Set",
    image: "/assets/products2/3.jpg",
    discount: 20,
    originalPrice: 1819,
    currentPrice: 1456,
  },
  {
    id: 4,
    name: "Acnes C10 15ml",
    image: "/assets/products2/4.jpg",
    discount: 12,
    originalPrice: 2700,
    currentPrice: 2338,
  },
  {
    id: 5,
    name: "Melano CC Rich Moisturizing Cream",
    image: "/assets/products2/5.jpg",
    discount: 40,
    originalPrice: 2901,
    currentPrice: 1751,
  },
  {
    id: 6,
    name: "Melano CC Rich Moisturising Cream 100G",
    image: "/assets/products2/6.jpg",
    discount: 30,
    originalPrice: 2536,
    currentPrice: 1775,
  },
  {
    id: 7,
    name: "Melano CC Skin Spot Essence 20ml",
    image: "/assets/products2/7.jpg",
    discount: 30,
    originalPrice: 1860,
    currentPrice: 1302,
  },
  {
    id: 8,
    name: "Nice & Lovely Baby Range Value Pack",
    image: "/assets/products2/8.jpg",
    discount: 30,
    originalPrice: 2600,
    currentPrice: 1820,
  },
  {
    id: 9,
    name: "Garnier Bye Acne & Dark Spots Kit",
    image: "/assets/products2/9.jpg",
    discount: 30,
    originalPrice: 4345,
    currentPrice: 3042,
  },
  {
    id: 10,
    name: "Garnier Even & Matte Vitamin C Booster Serum 30ml",
    image: "/assets/products2/10.jpg",
    discount: 20,
    originalPrice: 1750,
    currentPrice: 1400,
  },
] as const;

// ---- Utilities / Helpers ----

// Find a single product by ID
export const getProductById = (id: number): Product | undefined =>
  products.find((product) => product.id === id);

// Get all discounted products
export const getDiscountedProducts = (): Product[] =>
  products.filter((product) => product.discount > 0);

// Format price in KES
export const formatKES = (value: number): string =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  }).format(value);

// Calculate discount percentage dynamically (in case you want to recompute)
export const calculateDiscount = (original: number, current: number): number =>
  Math.round(((original - current) / original) * 100);

// Map products to include formatted prices and dynamic discount
export const getProductsWithFormattedPrices = (): (Product & {
  formattedOriginalPrice: string;
  formattedCurrentPrice: string;
  calculatedDiscount: number;
})[] =>
  products.map((p) => ({
    ...p,
    formattedOriginalPrice: formatKES(p.originalPrice),
    formattedCurrentPrice: formatKES(p.currentPrice),
    calculatedDiscount: calculateDiscount(p.originalPrice, p.currentPrice),
  }));

// Future-ready: categories, search, filters, and API mapping can be added here
