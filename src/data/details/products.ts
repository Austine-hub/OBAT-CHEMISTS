// data.ts
// CENTRAL DATA + MODELS + HELPERS (MVC Single Source of Truth)
// Modern, scalable, DRY, robust structure.

// =========================
// ===== MODELS (M) =======
// =========================

export interface Product {
  id: number;
  name: string;
  price: number; // numeric for calculations
  image: string;
  description?: string;
  category?: string;
  tags?: string[];
}

// Utility type for API-like responses
export type ProductMap = Record<number, Product>;


// ===============================
// ===== UTILITY FUNCTIONS ======
// ===============================

// Generate placeholder product images
const makeImg = (label: string, color: string = "4CAF50") =>
  `https://via.placeholder.com/300x300/${color}/ffffff?text=${encodeURIComponent(
    label
  )}`;


// ==============================
// ===== DATA SOURCE (D) ========
// ==============================
// All product data in ONE place (DRY)

export const productsArray: Product[] = [
  {
    id: 1,
    name: "Dewyglot's Lemon-Grass Essential oil 15ml",
    price: 900,
    image: makeImg("Lemon", "4CAF50"),
    category: "Skincare",
  },
  {
    id: 2,
    name: "SKIN1004 Centella Toning Toner 210ml",
    price: 1132,
    image: makeImg("Toner", "FFA726"),
    category: "Skincare",
  },
  {
    id: 3,
    name: "Dewyglot's Organic Castor Oil",
    price: 700,
    image: makeImg("Castor", "8B4513"),
    category: "Haircare",
  },
  {
    id: 4,
    name: "Cerave Intensive Moisturizing Lotion 236ml",
    price: 2850,
    image: makeImg("Cerave", "2196F3"),
    category: "Skincare",
  },
  {
    id: 5,
    name: "Lalo Amba-Jasmine Strengthening Hair Serum 100ml",
    price: 2398,
    image: makeImg("Serum", "1565C0"),
    category: "Haircare",
  },
  {
    id: 6,
    name: "Lalo Hydrating UV Defense Sunscreen SPF50 100ml",
    price: 2300,
    image: makeImg("SPF50", "FFD54F"),
    category: "Skincare",
  },
  {
    id: 7,
    name: "La Roche Posay Effaclar Duo+M Unipod Patches",
    price: 2000,
    image: makeImg("Patches", "64B5F6"),
    category: "Acne Care",
  },
  {
    id: 8,
    name: "Dercos Densi-Solutions Thickening Shampoo 250ml",
    price: 3000,
    image: makeImg("Dercos", "FFE082"),
    category: "Haircare",
  },
  {
    id: 9,
    name: "Dercos Anti-Dandruff Shampoo Normal/Oily Hair 200ml",
    price: 3000,
    image: makeImg("Anti-D", "81C784"),
    category: "Haircare",
  },
  {
    id: 10,
    name: "Dercos Anti-Dandruff Shampoo - Dry Hair 200ml",
    price: 3000,
    image: makeImg("Dry", "66BB6A"),
    category: "Haircare",
  },
];


// Convert array into an optimized lookup map (O(1) retrieval)
export const productsMap: ProductMap = Object.fromEntries(
  productsArray.map((p) => [p.id, p])
);


// ====================================
// ===== CONTROLLER HELPERS (C) ========
// ====================================

// Get product by ID
export const getProductById = (id: number): Product | undefined =>
  productsMap[id];

// Format price consistently across the app
export const formatPrice = (amount: number): string =>
  `KES ${amount.toLocaleString("en-KE", { minimumFractionDigits: 2 })}`;

// Safely parse numeric ID from route params
export const parseId = (value: string | string[] | null): number | null => {
  if (!value) return null;
  const id = Number(Array.isArray(value) ? value[0] : value);
  return Number.isFinite(id) ? id : null;
};
