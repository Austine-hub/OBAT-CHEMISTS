// src/data/products.ts
// ============================
// CENTRAL DATA + MODELS + HELPERS (MVC Single Source of Truth)
// Modern, scalable, DRY, robust structure
// ============================

// =========================
// ===== MODELS (M) =======
// =========================

export interface Product {
  id: number;
  name: string;
  price: number; // numeric for calculations
  image: string; // relative path from /public
  description?: string;
  category?: string;
  tags?: string[];
}

// Utility type for fast lookup
export type ProductMap = Record<number, Product>;

// =========================
// ===== DATA SOURCE (D) =====
// =========================

// All product data centralized, images directly from public/assets/products3
export const productsArray: Product[] = [
  { id: 1, name: "Dewyglot Lemon-Grass Essential Oil 15ml", price: 900, image: "/assets/products3/1.jpg", category: "Skincare" },
  { id: 2, name: "SKIN1004 Centella Toning Toner 210ml", price: 1132, image: "/assets/products3/2.jpg", category: "Skincare" },
  { id: 3, name: "Dewyglot Organic Castor Oil", price: 700, image: "/assets/products3/3.jpg", category: "Haircare" },
  { id: 4, name: "Cerave Intensive Moisturizing Lotion 236ml", price: 2850, image: "/assets/products3/4.jpg", category: "Skincare" },
  { id: 5, name: "Lalo Jasmine Strengthening Hair Serum 100ml", price: 2398, image: "/assets/products3/5.jpg", category: "Haircare" },
  { id: 6, name: "Lalo Hydrating UV Defense Sunscreen SPF50 100ml", price: 2300, image: "/assets/products3/6.jpg", category: "Skincare" },
  { id: 7, name: "La Roche Posay Effaclar Duo+M Unipod Patches", price: 2000, image: "/assets/products3/7.jpg", category: "Acne Care" },
  { id: 8, name: "Dercos Densi-Solutions Thickening Shampoo 250ml", price: 3000, image: "/assets/products3/8.jpg", category: "Haircare" },
  { id: 9, name: "Dercos Anti-Dandruff Shampoo Normal/Oily 200ml", price: 3000, image: "/assets/products3/9.jpg", category: "Haircare" },
  { id: 10, name: "Dercos Anti-Dandruff Shampoo Dry Hair 200ml", price: 3000, image: "/assets/products3/10.jpg", category: "Haircare" },
];

// =========================
// ===== LOOKUP MAP ========
// =========================

// O(1) retrieval for product details
export const productsMap: ProductMap = Object.fromEntries(productsArray.map((p) => [p.id, p]));

// =========================
// ===== CONTROLLER HELPERS (C) ========
// =========================

// Fetch product by ID safely
export const getProductById = (id: number): Product | undefined => productsMap[id];

// Format numeric price consistently
export const formatPrice = (amount: number): string =>
  `KES ${amount.toLocaleString("en-KE", { minimumFractionDigits: 2 })}`;

// Parse numeric ID from route params safely
export const parseId = (value: string | string[] | null): number | null => {
  if (!value) return null;
  const id = Number(Array.isArray(value) ? value[0] : value);
  return Number.isFinite(id) ? id : null;
};

// Optional: Get all products in a category
export const getProductsByCategory = (category: string): Product[] =>
  productsArray.filter((p) => p.category === category);

// Optional: Get featured or discounted products
export const getFeaturedProducts = (): Product[] =>
  productsArray.slice(0, 6); // Example: first 6 products
