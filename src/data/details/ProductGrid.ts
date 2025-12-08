// src/data/products.ts

// ---- Product Model ----
export interface Product {
  id: number;
  name: string;
  image: string;
  discount: number;
  originalPrice: number;
  currentPrice: number;
}

// ---- Data Source (Single Source of Truth) ----
export const products: Product[] = [
  {
    id: 1,
    name: "Cosy Toilet Paper Emb. Unwrap 10s 200 Sheets White",
    image: "/products/toilet-paper.jpg",
    discount: 45,
    originalPrice: 545,
    currentPrice: 300,
  },
  {
    id: 2,
    name: "Uncover Aloe Invisible Sunscreen 80ml",
    image: "/products/sunscreen.jpg",
    discount: 10,
    originalPrice: 3200,
    currentPrice: 2880,
  },
  {
    id: 3,
    name: "Acnes Treatment Set",
    image: "/products/acnes-set.jpg",
    discount: 20,
    originalPrice: 1819,
    currentPrice: 1456,
  },
  {
    id: 4,
    name: "Acnes C10 15ml",
    image: "/products/acnes-c10.jpg",
    discount: 12,
    originalPrice: 2700,
    currentPrice: 2338,
  },
  {
    id: 5,
    name: "Melano CC Rich Moisturizing Cream",
    image: "/products/melano-cream.jpg",
    discount: 40,
    originalPrice: 2901,
    currentPrice: 1751,
  },
  {
    id: 6,
    name: "Melano CC Rich Moisturising Cream 100G",
    image: "/products/melano-100g.jpg",
    discount: 30,
    originalPrice: 2536,
    currentPrice: 1775,
  },
  {
    id: 7,
    name: "Melano CC Skin Spot Essence 20ml",
    image: "/products/melano-essence.jpg",
    discount: 30,
    originalPrice: 1860,
    currentPrice: 1302,
  },
  {
    id: 8,
    name: "Nice & Lovely Baby Range Value Pack",
    image: "/products/baby-pack.jpg",
    discount: 30,
    originalPrice: 2600,
    currentPrice: 1820,
  },
  {
    id: 9,
    name: "Garnier Bye Acne & Dark Spots Kit",
    image: "/products/garnier-kit.jpg",
    discount: 30,
    originalPrice: 4345,
    currentPrice: 3042,
  },
  {
    id: 10,
    name: "Garnier Even & Matte Vitamin C Booster serum 30ml",
    image: "/products/garnier-serum.jpg",
    discount: 20,
    originalPrice: 1750,
    currentPrice: 1400,
  },
];


// ---- Model Helpers (optional, recommended) ----

// Find a single product
export const getProductById = (id: number): Product | undefined =>
  products.find((product) => product.id === id);

// Get discounted products
export const getDiscountedProducts = (): Product[] =>
  products.filter((product) => product.discount > 0);

// Future extensibility (e.g. categories, filters, search, API mapping)
