// src/data/VitaminData.ts
// MASSIVELY REVAMPED TO SERVE AS THE SOURCE OF TRUTH FOR VITAMINS.TSX

// NOTE: Uses standard string paths for image imports, compatible with most setups.
import type { StaticImageData } from "next/image";

/* ============================
   📦 IMAGE IMPORTS (Simulating your assets folder)
   ============================ */

// Replace these with actual image imports in your project's structure


import image1 from "../assets/vitamins/vitamin_d.png";
import image2 from "../assets/vitamins/vitamin_c.png";
import image3 from "../assets/vitamins/omega3.png";
import image4 from "../assets/vitamins/multivitamin.png";
import image5 from "../assets/vitamins/zinc.png";
import image6 from "../assets/vitamins/magnesium.png";
import image7 from "../assets/vitamins/probiotics.png";
import image8 from "../assets/vitamins/collagen.png";
import image9 from "../assets/vitamins/calcium.png";
import image10 from "../assets/vitamins/iron.png";
import image11 from "../assets/vitamins/vitamin_b12.png";
import image12 from "../assets/vitamins/turmeric.png";
import image13 from "../assets/vitamins/melatonin.png";
import image14 from "../assets/vitamins/glucosamine.png";

// ------------------------------------------------------------
// 📦 Type Definitions for Vitamins/Supplements
// ------------------------------------------------------------

export type HealthCategory =
  | "Immune Support"
  | "Bone & Joint"
  | "Digestive Health"
  | "Energy & Metabolism"
  | "Heart & Brain Health"
  | "Sleep & Mood"
  | "Beauty & Skin"
  | "Herbal Supplements";

export type SupplementForm =
  | "Capsule"
  | "Tablet"
  | "Softgel"
  | "Liquid"
  | "Powder"
  | "Gummy";

export type HealthGoal =
  | "General Wellness"
  | "Energy Boost"
  | "Sleep Quality"
  | "Stress Relief"
  | "Muscle Recovery"
  | "Weight Management"
  | "Focus & Memory"
  | "Bone & Joint"   // ← ADD THIS
  | "Immune Support" // ← ALSO needed for product 101 & others
  | "Beauty & Skin"  // ← Used in Zinc + Vitamin C products
  | "Digestive Health" // ← Used in probiotics
  | "Heart & Brain Health"; // ← Used in Omega-3


export type ProductTag =
  | "Bestseller"
  | "New Arrival"
  | "Vegan"
  | "Non-GMO"
  | "Gluten-Free"
  | "High Potency"
  | "Organic"
  | "Sustainably Sourced"
  | "Herbal"; // ← ADD THIS


export interface ProductVariant {
  id: string;
  packSize: string; // e.g., "60 Count", "120 Count"
  price: number;
  oldPrice?: number;
  inStock: boolean;
  stockCount: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface ReviewResponse {
  id: string;
  userName: string;
  date: string;
  comment: string;
  isOfficial: boolean;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpful: number;
  healthGoal?: HealthGoal;
  ageRange?: string;
  responses?: ReviewResponse[];
}

// 🎯 Main Product Interface - Adapted from the Beauty template
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: HealthCategory; // Now using HealthCategory
  slug: string;
  image: string | StaticImageData; // ✅ Compatible with Next.js or string paths
  images: (string | StaticImageData)[];
  packSize: string; // Replaced 'size' with 'packSize'
  price: number; // ✅ Matches price usage in Vitamins.tsx
  originalPrice?: number; // Renamed oldPrice to originalPrice (to match Vitamins.tsx)
  discount?: string; // e.g., "15% Off"
  currency: string;
  rating: number;
  reviewCount: number;
  description: string;
  fullDescription: string; // Renamed shortDescription to fullDescription
  keyIngredients: string[]; // Key selling points (e.g., Vitamin D3, Turmeric)
  benefits: string[];
  suggestedUse: string[]; // Renamed howToUse to suggestedUse
  form: SupplementForm; // New field
  healthGoals: HealthGoal[];
  specifications: Record<string, string>; // e.g., { 'Strength': '500mg', 'Form': 'Capsule' }
  variants?: ProductVariant[]; // Keep variants structure
  inStock: boolean;
  stockCount: number; // Renamed stock to stockCount
  isFeatured?: boolean;
  isTrending: boolean; // Renamed isNew to isTrending (to match Vitamins.tsx)
  tags?: ProductTag[];
  warnings?: string[];
  faq?: FAQ[];
  relatedProducts?: string[];
  createdAt?: string;
}

// ============================================================
// 📦 Mock Vitamin Products (14 items)
// ============================================================

export const productsData: Product[] = [
  {
    id: "prod_101",
    name: "Vitamin D3 K2 Complex",
    brand: "HealthCore",
    category: "Immune Support",
    slug: "healthcore-d3-k2-complex",
    image: image1,
    images: [image1],
    packSize: "120 Softgels",
    price: 1350,
    originalPrice: 1590,
    discount: "15% Off",
    currency: "KES",
    rating: 4.8,
    reviewCount: 3456,
    description: "High-potency blend for maximum bone density and cardiovascular health.",
    fullDescription: "Supports calcium absorption for strong bones and teeth, and helps maintain a healthy immune system. Contains 5000 IU of D3 and 100mcg of K2 for synergy.",
    keyIngredients: ["Vitamin D3 (5000 IU)", "Vitamin K2 (MK-7)"],
    benefits: ["Supports calcium metabolism", "Boosts immune defense", "Promotes cardiovascular health"],
    suggestedUse: ["Take 1 softgel daily with a meal containing fat."],
    form: "Softgel",
    healthGoals: ["General Wellness", "Bone & Joint", "Immune Support"],
    specifications: {
      Strength: "5000 IU D3 + 100mcg K2",
      Form: "Softgel",
      "Servings Per Container": "120",
      Purity: "Third-party tested",
    },
    inStock: true,
    stockCount: 150,
    isFeatured: true,
    isTrending: true,
    tags: ["Bestseller", "High Potency", "Non-GMO"],
    createdAt: "2024-08-01T00:00:00Z",
  },
  {
    id: "prod_102",
    name: "Timed-Release Vitamin C 1000mg",
    brand: "ImmunePro",
    category: "Immune Support",
    slug: "immunepro-time-release-vitamin-c",
    image: image2,
    images: [image2],
    packSize: "100 Tablets",
    price: 890,
    originalPrice: 990,
    currency: "KES",
    rating: 4.7,
    reviewCount: 2120,
    description: "Sustained release formula for all-day immune and antioxidant support.",
    fullDescription: "Our innovative formula slowly releases Vitamin C throughout the day, ensuring continuous antioxidant protection and optimal collagen synthesis.",
    keyIngredients: ["Ascorbic Acid (1000mg)", "Rose Hips"],
    benefits: ["All-day antioxidant protection", "Supports skin health and collagen", "Reduces free radical damage"],
    suggestedUse: ["Take 1 tablet daily, preferably with a meal."],
    form: "Tablet",
    healthGoals: ["General Wellness", "Immune Support", "Beauty & Skin"],
    specifications: {
      Strength: "1000 mg",
      Form: "Timed-Release Tablet",
      "Servings Per Container": "100",
      Formula: "Vegan-Friendly",
    },
    inStock: true,
    stockCount: 88,
    isTrending: true,
    tags: ["Vegan", "Gluten-Free"],
    createdAt: "2024-07-20T00:00:00Z",
  },
  {
    id: "prod_103",
    name: "Triple Strength Omega-3 Fish Oil",
    brand: "OceanLife",
    category: "Heart & Brain Health",
    slug: "oceanlife-triple-strength-omega3",
    image: image3,
    images: [image3],
    packSize: "90 Softgels",
    price: 1890,
    originalPrice: 2190,
    discount: "14% Off",
    currency: "KES",
    rating: 4.9,
    reviewCount: 4110,
    description: "Molecularly distilled fish oil providing 900mg total EPA/DHA per serving.",
    fullDescription: "Sustainably sourced from deep-sea fish, this concentrated formula supports healthy cholesterol, sharp cognitive function, and joint flexibility. Guaranteed heavy metal-free.",
    keyIngredients: ["EPA (500mg)", "DHA (400mg)"],
    benefits: ["Supports cardiovascular function", "Enhances brain health and mood", "Eases joint stiffness"],
    suggestedUse: ["Take 1 softgel 1 to 2 times daily with food."],
    form: "Softgel",
    healthGoals: ["General Wellness", "Heart & Brain Health", "Bone & Joint"],
    specifications: {
      Strength: "900 mg Total Omega-3",
      EPA: "500 mg",
      DHA: "400 mg",
      Source: "Sustainably Sourced Fish",
    },
    inStock: true,
    stockCount: 65,
    isFeatured: true,
    isTrending: true,
    tags: ["Bestseller", "High Potency", "Sustainably Sourced"],
    createdAt: "2024-06-15T00:00:00Z",
  },
  {
    id: "prod_104",
    name: "Daily Women's Multivitamin",
    brand: "VitaBloom",
    category: "Energy & Metabolism",
    slug: "vitabloom-womens-daily-multivitamin",
    image: image4,
    images: [image4],
    packSize: "60 Tablets",
    price: 1100,
    currency: "KES",
    rating: 4.6,
    reviewCount: 1550,
    description: "Targeted support with Iron, Folic Acid, and B Vitamins for women's health.",
    fullDescription: "A complete spectrum of vitamins and minerals formulated to support energy levels, hormonal balance, and bone health in women of all ages.",
    keyIngredients: ["Iron", "B-Vitamins", "Calcium"],
    benefits: ["Supports hormonal balance", "Reduces tiredness and fatigue", "Boosts metabolism"],
    suggestedUse: ["Take 1 tablet daily with a meal."],
    form: "Tablet",
    healthGoals: ["General Wellness", "Energy Boost"],
    specifications: {
      Formula: "Women's Health",
      Iron: "18 mg",
      B12: "10 mcg",
    },
    inStock: true,
    stockCount: 120,
    isTrending: false,
    tags: ["Gluten-Free", "Non-GMO"],
    createdAt: "2024-05-01T00:00:00Z",
  },
  {
    id: "prod_105",
    name: "Zinc Picolinate 50mg",
    brand: "ImmunePro",
    category: "Immune Support",
    slug: "immunepro-zinc-picolinate-50mg",
    image: image5,
    images: [image5],
    packSize: "60 Capsules",
    price: 750,
    originalPrice: 850,
    currency: "KES",
    rating: 4.5,
    reviewCount: 980,
    description: "Highly bioavailable form of Zinc essential for immune and skin health.",
    fullDescription: "Zinc Picolinate is absorbed more efficiently than other forms, supporting immune system function, protein synthesis, and antioxidant processes.",
    keyIngredients: ["Zinc Picolinate (50mg)"],
    benefits: ["Fast and efficient absorption", "Supports immune cell function", "Promotes healthy skin and wound healing"],
    suggestedUse: ["Take 1 capsule daily with food."],
    form: "Capsule",
    healthGoals: ["Immune Support", "Beauty & Skin"],
    specifications: {
      Strength: "50 mg",
      Form: "Capsule",
      "Chelated Form": "Picolinate",
    },
    inStock: true,
    stockCount: 75,
    isTrending: false,
    tags: ["High Potency", "Vegan"],
    createdAt: "2024-04-10T00:00:00Z",
  },
  {
    id: "prod_106",
    name: "Magnesium Glycinate 400mg",
    brand: "CalmState",
    category: "Sleep & Mood",
    slug: "calmstate-magnesium-glycinate",
    image: image6,
    images: [image6],
    packSize: "180 Capsules",
    price: 1690,
    originalPrice: 1950,
    discount: "13% Off",
    currency: "KES",
    rating: 4.8,
    reviewCount: 3870,
    description: "Gentle, non-laxative magnesium for muscle relaxation and stress relief.",
    fullDescription: "Magnesium Glycinate is known for its superior absorption and calming properties. It supports restful sleep, reduces muscle cramps, and helps alleviate nervous tension.",
    keyIngredients: ["Magnesium Glycinate (400mg)"],
    benefits: ["Promotes deep, restful sleep", "Relieves muscle tension and cramps", "Supports nervous system function"],
    suggestedUse: ["Take 2 capsules daily, 30 minutes before bedtime."],
    form: "Capsule",
    healthGoals: ["Sleep Quality", "Stress Relief", "Muscle Recovery"],
    specifications: {
      Strength: "400 mg",
      Form: "Capsule",
      Absorption: "High Bioavailability",
    },
    inStock: true,
    stockCount: 40,
    isTrending: true,
    tags: ["Bestseller", "Non-GMO"],
    warnings: ["May cause drowsiness."],
    createdAt: "2024-03-01T00:00:00Z",
  },
  {
    id: "prod_107",
    name: "Probiotic 50 Billion CFU",
    brand: "GutFlow",
    category: "Digestive Health",
    slug: "gutflow-probiotic-50-billion",
    image: image7,
    images: [image7],
    packSize: "30 Vegetable Capsules",
    price: 2200,
    originalPrice: 2500,
    discount: "12% Off",
    currency: "KES",
    rating: 4.7,
    reviewCount: 1120,
    description: "10 strain blend to restore balance and support a healthy gut microbiome.",
    fullDescription: "A high-potency, multi-strain probiotic formula designed to support intestinal health, nutrient absorption, and immune function. Needs refrigeration for maximum potency.",
    keyIngredients: ["Lactobacillus blend", "Bifidobacterium blend"],
    benefits: ["Restores gut flora balance", "Aids digestion and reduces bloating", "Supports immune system"],
    suggestedUse: ["Take 1 capsule daily on an empty stomach."],
    form: "Capsule",
    healthGoals: ["Digestive Health", "Immune Support"],
    specifications: {
      Strength: "50 Billion CFU",
      Strains: "10 Active Strains",
      Storage: "Refrigeration Required",
    },
    inStock: true,
    stockCount: 35,
    isFeatured: true,
    isTrending: true,
    tags: ["Vegan", "High Potency"],
    createdAt: "2024-02-15T00:00:00Z",
  },
  {
    id: "prod_108",
    name: "Hydrolyzed Marine Collagen Powder",
    brand: "GlowEssence",
    category: "Beauty & Skin",
    slug: "glowessence-marine-collagen-powder",
    image: image8,
    images: [image8],
    packSize: "300g Powder",
    price: 3500,
    originalPrice: 4000,
    discount: "13% Off",
    currency: "KES",
    rating: 4.9,
    reviewCount: 5120,
    description: "Premium Type I & III collagen peptides for youthful skin, hair, and nails.",
    fullDescription: "Sustainably sourced from wild-caught fish, our marine collagen is highly soluble and tasteless, easily mixing into coffee or smoothies to boost your body's natural collagen production.",
    keyIngredients: ["Hydrolyzed Marine Collagen Peptides", "Vitamin C"],
    benefits: ["Improves skin elasticity and hydration", "Strengthens hair and nails", "Supports joint comfort"],
    suggestedUse: ["Mix 1 scoop daily into 8 oz of liquid."],
    form: "Powder",
    healthGoals: ["Beauty & Skin", "Bone & Joint"],
    specifications: {
      Type: "Type I & III",
      Source: "Wild-Caught Fish",
      Flavor: "Unflavored",
    },
    inStock: true,
    stockCount: 95,
    isFeatured: true,
    isTrending: true,
    tags: ["Bestseller", "Sustainably Sourced"],
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "prod_109",
    name: "B-Complex Ultra Formula",
    brand: "EnergyPlus",
    category: "Energy & Metabolism",
    slug: "energyplus-bcomplex-ultra",
    image: image9,
    images: [image9],
    packSize: "90 Vegetarian Capsules",
    price: 1250,
    originalPrice: 1450,
    discount: "14% Off",
    currency: "KES",
    rating: 4.6,
    reviewCount: 1400,
    description: "Complete B vitamin complex with methyl-B12 for maximum energy and nerve support.",
    fullDescription: "All eight essential B vitamins in their co-enzymated, bioavailable forms to support cellular energy production, brain function, and a healthy nervous system. Vegan-friendly.",
    keyIngredients: ["Methylcobalamin (B12)", "Folate (B9)", "Thiamine (B1)"],
    benefits: ["Increases natural energy levels", "Supports nerve health and mood", "Aids in stress management"],
    suggestedUse: ["Take 1 capsule in the morning with food."],
    form: "Capsule",
    healthGoals: ["Energy Boost", "Stress Relief", "Focus & Memory"],
    specifications: {
      Formula: "Co-Enzymated",
      Form: "Vegetarian Capsule",
      B12_Type: "Methylcobalamin",
    },
    inStock: true,
    stockCount: 110,
    isTrending: true,
    tags: ["Vegan", "Non-GMO"],
    createdAt: "2023-11-20T00:00:00Z",
  },
  {
    id: "prod_110",
    name: "Gentle Iron 25mg",
    brand: "NutraEssentials",
    category: "Energy & Metabolism",
    slug: "nutraessentials-gentle-iron",
    image: image10,
    images: [image10],
    packSize: "90 Vegetarian Capsules",
    price: 990,
    currency: "KES",
    rating: 4.4,
    reviewCount: 780,
    description: "Highly tolerated iron bisglycinate that is gentle on the stomach.",
    fullDescription: "A non-constipating form of iron (Ferrous Bisglycinate) to support red blood cell formation and fight fatigue without the common side effects of standard iron supplements.",
    keyIngredients: ["Iron Bisglycinate (25mg)"],
    benefits: ["Supports healthy red blood cells", "Fights fatigue and low energy", "Gentle on the digestive system"],
    suggestedUse: ["Take 1 capsule daily with food, or as directed by a healthcare provider."],
    form: "Capsule",
    healthGoals: ["Energy Boost"],
    specifications: {
      Strength: "25 mg",
      Form: "Capsule",
      Tolerance: "Gentle on stomach",
    },
    inStock: true,
    stockCount: 55,
    isTrending: false,
    tags: ["Gluten-Free", "Vegan"],
    createdAt: "2023-09-01T00:00:00Z",
  },
  {
    id: "prod_111",
    name: "Ashwagandha KSM-66 600mg",
    brand: "AdaptogenLabs",
    category: "Herbal Supplements",
    slug: "adaptogenlabs-ashwagandha-ksm66",
    image: image11,
    images: [image11],
    packSize: "60 Vegan Capsules",
    price: 1490,
    originalPrice: 1750,
    discount: "15% Off",
    currency: "KES",
    rating: 4.8,
    reviewCount: 2900,
    description: "Clinically studied KSM-66 extract for stress and cognitive support.",
    fullDescription: "A powerful adaptogen that helps the body manage stress, promotes balance, and improves cognitive functions like memory and focus. High concentration of active compounds (withanolides).",
    keyIngredients: ["Ashwagandha Root Extract (KSM-66)"],
    benefits: ["Reduces cortisol and stress", "Promotes calmness and relaxation", "Supports cognitive performance"],
    suggestedUse: ["Take 1 capsule twice daily with meals."],
    form: "Capsule",
    healthGoals: ["Stress Relief", "Sleep Quality", "Focus & Memory"],
    specifications: {
      Strength: "600 mg",
      Extract: "KSM-66 (High concentration)",
      Form: "Vegan Capsule",
    },
    inStock: true,
    stockCount: 30,
    isFeatured: true,
    isTrending: true,
    tags: ["Bestseller", "Herbal", "Organic"],
    createdAt: "2023-07-01T00:00:00Z",
  },
  {
    id: "prod_112",
    name: "Turmeric Curcumin Complex",
    brand: "FlexJoint",
    category: "Bone & Joint",
    slug: "flexjoint-turmeric-curcumin",
    image: image12,
    images: [image12],
    packSize: "120 Vegetarian Capsules",
    price: 1550,
    originalPrice: 1790,
    discount: "13% Off",
    currency: "KES",
    rating: 4.7,
    reviewCount: 1650,
    description: "Enhanced absorption formula for joint comfort and inflammatory support.",
    fullDescription: "Contains a high dose of Curcuminoids combined with Black Pepper extract (Piperine) to maximize absorption, providing potent antioxidant and anti-inflammatory benefits.",
    keyIngredients: ["Curcuminoids", "Black Pepper Extract (Piperine)"],
    benefits: ["Supports joint mobility and comfort", "Powerful anti-inflammatory action", "Antioxidant protection"],
    suggestedUse: ["Take 2 capsules daily with food."],
    form: "Capsule",
    healthGoals: ["Bone & Joint", "General Wellness"],
    specifications: {
      Strength: "1000 mg",
      Enhancement: "With Piperine",
      Form: "Vegetarian Capsule",
    },
    inStock: true,
    stockCount: 60,
    isTrending: true,
    tags: ["High Potency", "Vegan"],
    createdAt: "2023-05-10T00:00:00Z",
  },
  {
    id: "prod_113",
    name: "Melatonin 5mg Gummies",
    brand: "SleepAid",
    category: "Sleep & Mood",
    slug: "sleepaid-melatonin-gummies",
    image: image13,
    images: [image13],
    packSize: "60 Gummies",
    price: 1050,
    currency: "KES",
    rating: 4.5,
    reviewCount: 950,
    description: "Delicious berry-flavored gummies to help you fall asleep faster.",
    fullDescription: "Melatonin is a hormone naturally produced by the body that regulates sleep-wake cycles. These easy-to-take gummies help reset your clock and promote a calm, deep sleep.",
    keyIngredients: ["Melatonin (5mg)"],
    benefits: ["Reduces time to fall asleep", "Supports healthy sleep cycles", "Non-habit forming"],
    suggestedUse: ["Take 1-2 gummies 30 minutes before bedtime."],
    form: "Gummy",
    healthGoals: ["Sleep Quality"],
    specifications: {
      Strength: "5 mg",
      Form: "Gummy",
      Flavor: "Natural Berry",
    },
    inStock: true,
    stockCount: 25,
    isTrending: false,
    tags: ["New Arrival", "Gluten-Free"],
    warnings: ["Do not operate heavy machinery after consumption."],
    createdAt: "2024-09-15T00:00:00Z",
  },
  {
    id: "prod_114",
    name: "Glucosamine Chondroitin MSM",
    brand: "FlexJoint",
    category: "Bone & Joint",
    slug: "flexjoint-glucosamine-msm",
    image: image14,
    images: [image14],
    packSize: "180 Tablets",
    price: 2400,
    originalPrice: 2800,
    discount: "14% Off",
    currency: "KES",
    rating: 4.6,
    reviewCount: 1800,
    description: "The ultimate joint formula for flexibility and connective tissue support.",
    fullDescription: "A powerful combination that helps maintain the structural integrity of joints, cartilage, and connective tissues, promoting long-term joint health and mobility.",
    keyIngredients: ["Glucosamine Sulfate", "Chondroitin Sulfate", "MSM"],
    benefits: ["Supports cartilage repair", "Lubricates joints for better mobility", "Reduces discomfort"],
    suggestedUse: ["Take 3 tablets daily with food."],
    form: "Tablet",
    healthGoals: ["Bone & Joint"],
    specifications: {
      Strength: "1500mg Glucosamine",
      "Per Serving": "3 Tablets",
    },
    inStock: true,
    stockCount: 70,
    isFeatured: true,
    isTrending: true,
    tags: ["Bestseller", "High Potency"],
    createdAt: "2023-03-20T00:00:00Z",
  },
];

// ============================================================
// ⚙️ Business Logic / Controller Utilities (Adapted)
// ============================================================

/**
 * Formats a number price into KES currency string.
 * This function is explicitly used in Vitamins.tsx.
 * @param price The product price as a number.
 * @returns Formatted currency string.
 */
export const formatPrice = (price: number): string =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(price)
    .replace("KES", "KSH"); // Ensuring KSH output as per your component

/**
 * Gets a product by its ID.
 */
export const getProductById = (id: string): Product | undefined =>
  productsData.find((p) => p.id === id);

/**
 * Gets all products.
 */
export const getAllProducts = (): Product[] => [...productsData];


/**
 * Gets products marked as trending.
 */
export const getTrendingProducts = (): Product[] =>
  productsData.filter((p) => p.isTrending);

/**
 * Sorts products based on a specified key.
 */
export const sortProducts = (
  key: "price-asc" | "price-desc" | "alphabetical" | "trending"
): Product[] => {
  const sorted = [...productsData];
  switch (key) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "alphabetical":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "trending":
        return sorted.filter((p) => p.isTrending);
    default:
      return sorted;
  }
};

// Renamed and adjusted the export to match your component's expected import structure:
export const products = getAllProducts();

export default {
    products,
    getProductById,
    getAllProducts,
    getTrendingProducts,
    sortProducts,
    formatPrice
    // ... other utility functions can be added here
};