// src/data/details/ProductGrid.ts


export type Currency = "KES";

export type ProductCategory =
  | "health"
  | "hygiene"
  | "household"
  | "personal-care"
  | "baby-care";

export interface Product {
  /* Identity */
  readonly id: number;
  readonly name: string;

  /* Commerce */
  readonly price: number;
  readonly oldPrice?: number;
  readonly currency: Currency;

  /* Inventory */
  readonly stock: number;

  /* Media */
  readonly image: string;
  readonly gallery?: readonly string[];

  /* Classification */
  readonly category: ProductCategory;
  readonly badge?: string;

  /* Content */
  readonly description: string;
  readonly features?: readonly string[];

  /* Social Proof */
  readonly rating?: number;       // 0–5
  readonly reviewsCount?: number; // non-negative integer

  /* Governance */
  readonly isActive: boolean;
  readonly createdAt: string; // ISO 8601
}

/* -------------------------------------------------------------------------- */
/* Internal Guards (Non-exported)                                             */
/* -------------------------------------------------------------------------- */

const nowISO = (): string => new Date().toISOString();

const assertPositive = (value: number): number =>
  value < 0 ? 0 : value;

/* -------------------------------------------------------------------------- */
/* Product Catalog (Immutable)                                                */
/* -------------------------------------------------------------------------- */

export const products: readonly Product[] = Object.freeze([
  {
    id: 1,
    name: "Cosy Toilet Paper Embossed 10 Rolls (200 Sheets)",
    price: 300,
    oldPrice: 545,
    currency: "KES",

    stock: 120,

    image: "/assets/products2/1.jpg",
    gallery: [
      "/assets/products2/1.jpg",
      "/assets/products2/1-alt.jpg",
    ],

    category: "household",
    badge: "Best Seller",

    description:
      "Premium embossed toilet paper offering softness, strength, and hygiene for everyday household use.",

    features: [
      "200 sheets per roll",
      "Soft embossed texture",
      "Strong & absorbent",
      "Suitable for all households",
    ],

    rating: 4.7,
    reviewsCount: 412,

    isActive: true,
    createdAt: nowISO(),
  },

  {
  id: 2,
  name: "Uncover Aloe Invisible Sunscreen 80ml",
  price: 2880,
  oldPrice: 3200,
  currency: "KES",

  stock: 45,

  image: "/assets/products2/2.jpg",

  category: "personal-care",
  badge: "Dermatologist Approved",

  description:
    "Lightweight, invisible aloe-based sunscreen offering broad-spectrum protection without white cast.",

  features: [
    "SPF protection",
    "Invisible finish",
    "Aloe-infused",
    "Suitable for sensitive skin",
  ],

  rating: 4.6,
  reviewsCount: 198,

  isActive: true,
  createdAt: nowISO(),
},
{
  id: 3,
  name: "Acnes Treatment Set",
  price: 1456,
  oldPrice: 1819,
  currency: "KES",

  stock: 30,

  image: "/assets/products2/3.jpg",

  category: "personal-care",
  badge: "Value Pack",

  description:
    "Complete acne treatment kit designed to cleanse, treat, and prevent breakouts.",

  features: [
    "Complete acne care routine",
    "Targets pimples & blackheads",
    "Dermatologically tested",
  ],

  rating: 4.4,
  reviewsCount: 143,

  isActive: true,
  createdAt: nowISO(),
},
{
  id: 4,
  name: "Acnes C10 15ml",
  price: 2338,
  oldPrice: 2700,
  currency: "KES",

  stock: 25,

  image: "/assets/products2/4.jpg",

  category: "personal-care",

  description:
    "Vitamin C serum formulated to reduce acne marks and brighten skin tone.",

  features: [
    "10% Vitamin C",
    "Brightens skin",
    "Reduces acne marks",
  ],

  rating: 4.5,
  reviewsCount: 96,

  isActive: true,
  createdAt: nowISO(),
},
{
  id: 5,
  name: "Melano CC Rich Moisturizing Cream",
  price: 1751,
  oldPrice: 2901,
  currency: "KES",

  stock: 40,

  image: "/assets/products2/5.jpg",

  category: "personal-care",
  badge: "Top Rated",

  description:
    "Rich moisturizing cream with Vitamin C to improve skin radiance and texture.",

  features: [
    "Vitamin C enriched",
    "Deep hydration",
    "Improves skin tone",
  ],

  rating: 4.8,
  reviewsCount: 322,

  isActive: true,
  createdAt: nowISO(),
},
{
  id: 6,
  name: "Melano CC Rich Moisturising Cream 100G",
  price: 1775,
  oldPrice: 2536,
  currency: "KES",

  stock: 35,

  image: "/assets/products2/6.jpg",

  category: "personal-care",

  description:
    "Large-size Vitamin C moisturizing cream for long-lasting hydration and skin clarity.",

  features: [
    "Large 100g size",
    "Brightening effect",
    "Daily use formula",
  ],

  rating: 4.7,
  reviewsCount: 211,

  isActive: true,
  createdAt: nowISO(),
},
{
  id: 7,
  name: "Melano CC Skin Spot Essence 20ml",
  price: 1302,
  oldPrice: 1860,
  currency: "KES",

  stock: 28,

  image: "/assets/products2/7.jpg",

  category: "personal-care",
  badge: "Editor's Pick",

  description:
    "Concentrated Vitamin C essence targeting dark spots and uneven skin tone.",

  features: [
    "Spot correction",
    "High potency Vitamin C",
    "Fast-absorbing",
  ],

  rating: 4.6,
  reviewsCount: 167,

  isActive: true,
  createdAt: nowISO(),
},
{
  id: 8,
  name: "Nice & Lovely Baby Range Value Pack",
  price: 1820,
  oldPrice: 2600,
  currency: "KES",

  stock: 50,

  image: "/assets/products2/8.jpg",

  category: "baby-care",
  badge: "Family Favorite",

  description:
    "Gentle baby care value pack formulated to protect and nourish delicate skin.",

  features: [
    "Gentle on baby skin",
    "Dermatologically tested",
    "Value pack",
  ],

  rating: 4.9,
  reviewsCount: 402,

  isActive: true,
  createdAt: nowISO(),
},
{
  id: 9,
  name: "Garnier Bye Acne & Dark Spots Kit",
  price: 3042,
  oldPrice: 4345,
  currency: "KES",

  stock: 22,

  image: "/assets/products2/9.jpg",

  category: "personal-care",

  description:
    "Complete Garnier kit formulated to fight acne and fade dark spots effectively.",

  features: [
    "Acne-fighting ingredients",
    "Dark spot correction",
    "Complete routine",
  ],

  rating: 4.5,
  reviewsCount: 188,

  isActive: true,
  createdAt: nowISO(),
},
{
  id: 10,
  name: "Garnier Even & Matte Vitamin C Booster Serum 30ml",
  price: 1400,
  oldPrice: 1750,
  currency: "KES",

  stock: 60,

  image: "/assets/products2/10.jpg",

  category: "personal-care",
  badge: "New Arrival",

  description:
    "Vitamin C booster serum designed to brighten skin and reduce excess oil.",

  features: [
    "Vitamin C booster",
    "Matte finish",
    "Brightening effect",
  ],

  rating: 4.6,
  reviewsCount: 256,

  isActive: true,
  createdAt: nowISO(),
},

]);

/* -------------------------------------------------------------------------- */
/* Query Utilities (Pure & Defensive)                                         */
/* -------------------------------------------------------------------------- */

/**
 * Get product by numeric ID
 * Safe: returns undefined if not found or inactive
 */
export const getProductById = (
  id: number
): Product | undefined =>
  products.find(
    (p) => p.id === id && p.isActive
  );

/**
 * Category-based related products
 * Used for PDP recommendations
 */
export const getProductsByCategory = (
  category: ProductCategory
): readonly Product[] =>
  products.filter(
    (p) => p.category === category && p.isActive
  );

/**
 * Compute discount percentage dynamically
 * (Never trust stored discounts — Amazon/Shopify rule)
 */
export const getDiscountPercent = (
  product: Product
): number => {
  if (!product.oldPrice) return 0;
  if (product.oldPrice <= product.price) return 0;

  return Math.round(
    ((product.oldPrice - product.price) /
      product.oldPrice) *
      100
  );
};

/**
 * Currency-safe formatter
 * Centralized to avoid UI duplication
 */
export const formatCurrency = (
  value: number,
  currency: Currency
): string =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(assertPositive(value));

/* -------------------------------------------------------------------------- */
/* Inventory Helpers                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Stock availability (single source of truth)
 */
export const isInStock = (product: Product): boolean =>
  product.stock > 0;

/**
 * Low stock signal (used for urgency UI)
 */
export const isLowStock = (
  product: Product,
  threshold = 10
): boolean =>
  product.stock > 0 && product.stock <= threshold;
