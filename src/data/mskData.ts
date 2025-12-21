// src/data/mskData.ts
// -----------------------------------------------------------------------------
// Musculoskeletal (MSK) Product Data
// - Slugs are globally UNIQUE (routing & React keys)
// - IDs are stable string identifiers
// - Data is readonly & immutable
// - Categories are derived from data (single source of truth)
// -----------------------------------------------------------------------------

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface MskProduct {
  /** Stable unique identifier */
  readonly id: string;

  /** Display name */
  readonly name: string;

  /** Globally unique slug */
  readonly slug: string;

  /** Public image path (from /public) */
  readonly image: string;

  /** Pricing (KES) */
  readonly price: number;
  readonly oldPrice?: number;

  /** Product category */
  readonly category: string;

  /** Card summary */
  readonly description: string;

  /** Details page content */
  readonly fullDescription?: string;
  readonly features?: readonly string[];
  readonly howToUse?: string;

  /** Availability */
  readonly inStock: boolean;
}

/* -------------------------------------------------------------------------- */
/* Product Data                                                               */
/* -------------------------------------------------------------------------- */

export const mskProducts = [
  {
    id: "msk-ibuprofen-200",
    name: "Ibuprofen 200 mg",
    slug: "ibuprofen-200",
    image: "/images/ibuprofen.jpg",
    price: 450,
    category: "NSAIDs",
    description: "First-line NSAID for mild to moderate musculoskeletal pain.",
    fullDescription:
      "Ibuprofen is widely used for acute and chronic musculoskeletal pain, osteoarthritis, and inflammatory conditions. Recommended as first-line therapy in many guidelines.",
    features: [
      "Reduces pain and inflammation",
      "Fast onset of action",
      "OTC availability",
    ],
    howToUse: "200–400 mg every 6–8 hours after meals. Max 1,200 mg/day OTC.",
    inStock: true,
  },

  {
    id: "msk-naproxen-250",
    name: "Naproxen 250 mg",
    slug: "naproxen-250",
    image: "/images/naproxen.jpg",
    price: 520,
    category: "NSAIDs",
    description: "Long-acting NSAID for joint and muscle pain.",
    fullDescription:
      "Naproxen provides longer pain control and is commonly used for osteoarthritis, rheumatoid arthritis, and back pain.",
    features: [
      "Longer duration of action",
      "Effective for chronic joint pain",
    ],
    howToUse: "250–500 mg twice daily with food.",
    inStock: true,
  },
] as const satisfies readonly MskProduct[];

/* -------------------------------------------------------------------------- */
/* Derived Types                                                              */
/* -------------------------------------------------------------------------- */

/** Union of all MSK categories (auto-derived) */
export type MskCategory = (typeof mskProducts)[number]["category"];

/* -------------------------------------------------------------------------- */
/* Helpers (tree-shakable & type-safe)                                        */
/* -------------------------------------------------------------------------- */

/** Fast lookup by slug */
export const mskProductBySlug: Readonly<Record<string, MskProduct>> =
  Object.fromEntries(mskProducts.map(p => [p.slug, p]));

/** Unique categories derived from data */
export const mskCategories: readonly MskCategory[] = [
  ...new Set(mskProducts.map(p => p.category)),
];
