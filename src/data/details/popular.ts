//src/data/details/popular.ts

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

/** ISO currency codes (extendable) */
export type Currency = "KES";

/** Product availability status (derived, never guessed) */
export type ProductStatus = "in-stock" | "low-stock" | "out-of-stock";

/** Product category (controlled vocabulary) */
export type ProductCategory =
  | "health"
  | "hygiene"
  | "baby-care"
  | "household"
  | "personal-care";

/** Core Product model */
export interface Product {
  /** Stable numeric ID (used for routing & indexing) */
  id: number;

  /** Public-facing name */
  name: string;

  /** URL-safe unique slug (recommended for SEO-ready routing) */
  slug: string;

  /** Pricing */
  price: number;
  oldPrice?: number;
  currency: Currency;

  /** Inventory */
  stock: number;

  /** Media */
  image: string; // from /public
  gallery?: readonly string[];

  /** Classification */
  category: ProductCategory;
  badge?: string;

  /** Descriptive content */
  shortDescription: string;
  description: string;
  features?: readonly string[];
  usage?: string;
  warnings?: string;

  /** Social proof */
  rating?: number; // 0–5
  reviewsCount?: number;

  /** Metadata */
  isActive: boolean;
  createdAt: string; // ISO date (audit-safe)
}

/* -------------------------------------------------------------------------- */
/* Internal helpers (NOT exported)                                             */
/* -------------------------------------------------------------------------- */

const nowISO = () => new Date().toISOString();

/* -------------------------------------------------------------------------- */
/* Centralized Products Data (READ-ONLY)                                      */
/* -------------------------------------------------------------------------- */

export const products: readonly Product[] = [
  {
    id: 1,
    name: "Mylan HIV Self Test Kit (1s)",
    slug: "mylan-hiv-self-test-kit-1s",
    price: 50,
    currency: "KES",
    stock: 120,

    image: "/assets/products/product1.jpg",
    gallery: [
      "/assets/products/product1.jpg",
    ],

    category: "health",
    badge: "WHO Approved",

    shortDescription:
      "Reliable and confidential HIV self-testing kit for home use.",
    description:
      "The Mylan HIV Self Test Kit allows individuals to test for HIV in the privacy of their homes. It is easy to use, provides quick results, and meets international quality and safety standards.",

    features: [
      "WHO prequalified",
      "Easy-to-use oral swab",
      "Results in 20 minutes",
      "Confidential and accurate",
    ],

    usage:
      "Follow the instructions provided in the package. Use the oral swab as directed and read results within the specified time window.",

    warnings:
      "A reactive result is not a definitive diagnosis. Seek confirmatory testing at a certified health facility.",

    rating: 4.6,
    reviewsCount: 312,

    isActive: true,
    createdAt: nowISO(),
  },

  {
  id: 2,
  name: "Cosy Toilet Paper 8 Roll – Unwrap (10 × 200 Sheets)",
  slug: "cosy-toilet-paper-8-roll-unwrap",
  price: 200,
  oldPrice: 440,
  currency: "KES",
  stock: 45,

  image: "/assets/products/product2.jpg",
  gallery: ["/assets/products/product2.jpg"],

  category: "household",
  badge: "40% OFF",

  shortDescription:
    "Soft, absorbent toilet paper designed for everyday family use.",
  description:
    "Cosy Toilet Paper offers superior softness and strength with 10 packs of 8 rolls, each containing 200 sheets. Ideal for both home and commercial use.",

  features: [
    "Soft yet durable",
    "High absorbency",
    "Value pack for families",
  ],

  rating: 4.4,
  reviewsCount: 210,

  isActive: true,
  createdAt: nowISO(),
},
{
  id: 3,
  name: "Fay Everyday Baby Wet Wipes (72s + 12s Promo)",
  slug: "fay-everyday-baby-wet-wipes-72s-12s",
  price: 390,
  currency: "KES",
  stock: 80,

  image: "/assets/products/product3.jpg",
  gallery: ["/assets/products/product3.jpg"],

  category: "baby-care",

  shortDescription:
    "Gentle baby wipes suitable for sensitive skin.",
  description:
    "Fay Everyday Baby Wet Wipes are alcohol-free and enriched with moisturizers to gently cleanse and protect your baby’s delicate skin.",

  features: [
    "Alcohol-free",
    "Dermatologically tested",
    "Suitable for newborns",
  ],

  rating: 4.7,
  reviewsCount: 185,

  isActive: true,
  createdAt: nowISO(),
},
{
  id: 4,
  name: "Huggies Dry Comfort Jumbo Size 5 (12–22kg) – 52s",
  slug: "huggies-dry-comfort-size-5-52s",
  price: 1695,
  currency: "KES",
  stock: 30,

  image: "/assets/products/product4.jpg",
  gallery: ["/assets/products/product4.jpg"],

  category: "baby-care",

  shortDescription:
    "High-absorbency diapers for active toddlers.",
  description:
    "Huggies Dry Comfort Size 5 diapers provide up to 12 hours of dryness with leak-lock technology and breathable materials.",

  features: [
    "Up to 12 hours dryness",
    "Leak-lock core",
    "Comfort fit waistband",
  ],

  rating: 4.8,
  reviewsCount: 342,

  isActive: true,
  createdAt: nowISO(),
},
{
  id: 5,
  name: "Fay Facial Decor Art Series Tissues (150s)",
  slug: "fay-facial-decor-art-series-150s",
  price: 205,
  currency: "KES",
  stock: 60,

  image: "/assets/products/product5.jpg",
  gallery: ["/assets/products/product5.jpg"],

  category: "personal-care",

  shortDescription:
    "Premium facial tissues with decorative packaging.",
  description:
    "Fay Facial Decor tissues combine softness and strength, perfect for daily facial care while adding style to your space.",

  features: [
    "Ultra-soft texture",
    "Strong and absorbent",
    "Stylish box design",
  ],

  rating: 4.3,
  reviewsCount: 98,

  isActive: true,
  createdAt: nowISO(),
},
{
  id: 6,
  name: "Majeed Ultra Soft Value Pack Tissues (18s)",
  slug: "majeed-ultra-soft-value-pack-18s",
  price: 227,
  currency: "KES",
  stock: 75,

  image: "/assets/products/product6.jpg",
  gallery: ["/assets/products/product6.jpg"],

  category: "household",

  shortDescription:
    "Economical ultra-soft tissue value pack.",
  description:
    "Majeed Ultra Soft tissues are designed for everyday comfort and durability, offering excellent value for money.",

  features: [
    "Soft touch",
    "Long-lasting value pack",
    "Multipurpose use",
  ],

  rating: 4.2,
  reviewsCount: 76,

  isActive: true,
  createdAt: nowISO(),
},
{
  id: 7,
  name: "Maths Facts Jumbo Size 5 X-Large (15–20kg) – 52s",
  slug: "maths-facts-jumbo-size-5-xl-52s",
  price: 1799,
  currency: "KES",
  stock: 25,

  image: "/assets/products/product7.jpg",
  gallery: ["/assets/products/product7.jpg"],

  category: "baby-care",

  shortDescription:
    "Extra-large diapers designed for comfort and protection.",
  description:
    "Maths Facts Jumbo diapers provide superior absorbency and comfort for growing babies, ensuring dryness throughout the day.",

  features: [
    "Extra-large fit",
    "High absorbency core",
    "Gentle on skin",
  ],

  rating: 4.5,
  reviewsCount: 129,

  isActive: true,
  createdAt: nowISO(),
},
{
  id: 8,
  name: "Dove Baby Lotion Rich Moisture (200ml)",
  slug: "dove-baby-lotion-rich-moisture-200ml",
  price: 785,
  currency: "KES",
  stock: 50,

  image: "/assets/products/product8.jpg",
  gallery: ["/assets/products/product8.jpg"],

  category: "baby-care",

  shortDescription:
    "Moisturizing baby lotion for soft, healthy skin.",
  description:
    "Dove Baby Rich Moisture Lotion gently nourishes baby skin, providing long-lasting hydration and protection.",

  features: [
    "Hypoallergenic",
    "Dermatologist tested",
    "Long-lasting moisture",
  ],

  rating: 4.9,
  reviewsCount: 410,

  isActive: true,
  createdAt: nowISO(),
},
{
  id: 9,
  name: "Ecrinal Baby Junior Cream (450g)",
  slug: "ecrinal-baby-junior-cream-450g",
  price: 1340,
  currency: "KES",
  stock: 15,

  image: "/assets/products/product9.jpg",
  gallery: ["/assets/products/product9.jpg"],

  category: "baby-care",

  shortDescription:
    "Nourishing cream for baby and junior skin care.",
  description:
    "Ecrinal Baby Junior Cream is enriched with essential nutrients to protect and moisturize sensitive skin.",

  features: [
    "Deep nourishment",
    "Gentle formulation",
    "Suitable for daily use",
  ],

  rating: 4.6,
  reviewsCount: 67,

  isActive: true,
  createdAt: nowISO(),
},
{
  id: 10,
  name: "Murasakit Granules (250g)",
  slug: "murasakit-granules-250g",
  price: 2750,
  currency: "KES",
  stock: 10,

  image: "/assets/products/product10.jpg",
  gallery: ["/assets/products/product10.jpg"],

  category: "health",

  shortDescription:
    "Fast-acting granules for digestive relief.",
  description:
    "Murasakit Granules are formulated to provide quick and effective relief from digestive discomfort when used as directed.",

  features: [
    "Fast-acting formula",
    "Clinically trusted",
    "Easy-to-use granules",
  ],

  rating: 4.1,
  reviewsCount: 52,

  isActive: true,
  createdAt: nowISO(),
},


  
];

/* -------------------------------------------------------------------------- */
/* Derived Utilities (Pure & Safe)                                            */
/* -------------------------------------------------------------------------- */

/** Get product by ID */
export const getProductById = (id: number): Product | undefined =>
  products.find((p) => p.id === id);

/** Get product by slug */
export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

/** Get products by category */
export const getProductsByCategory = (
  category: ProductCategory
): readonly Product[] =>
  products.filter((p) => p.category === category && p.isActive);

/** Derive stock status (single source of truth) */
export const getProductStatus = (product: Product): ProductStatus => {
  if (product.stock <= 0) return "out-of-stock";
  if (product.stock <= 10) return "low-stock";
  return "in-stock";
};
