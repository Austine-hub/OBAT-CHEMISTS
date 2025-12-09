// ========================================
// DATA MODEL — Single Source of Truth (MODEL)
// ========================================

export interface Deal {
  id: string;
  img: string; // local image path from /public
  name: string;
  mrp: number; // USD-like unit OR raw reference value
  price: number;
  discount: number;
}

// ========================================
// GLOBAL CONSTANTS & UTILITIES
// ========================================

// Realistic pharmacy pricing tends to fall 150–2,000 KES.
// We scale incoming numbers into this local realistic range.
export const PRICE_SCALE_FACTOR = 120; 
export const MIN_REAL_PRICE = 150;
export const MAX_REAL_PRICE = 2500;

// Kenyan Currency Formatter
export const formatKSH = (value: number): string =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  }).format(value);

// Safely scale a value into Kenyan pricing range
export const scaleToKSH = (value: number): number => {
  if (Number.isNaN(value) || value <= 0) return MIN_REAL_PRICE;

  const scaled = Math.round(value * PRICE_SCALE_FACTOR);
  return Math.min(Math.max(scaled, MIN_REAL_PRICE), MAX_REAL_PRICE);
};

// Safe formatting
export const safeFormatKSH = (value: number): string =>
  formatKSH(scaleToKSH(value));

// ========================================
// RAW DEALS DATA (MODEL)
// ========================================

export const deals: Deal[] = [
  { id: "1", img: "/assets/deals/1.png", name: "Depura Vitamin D3 60k Sugar Free Oral...", mrp: 167.70, price: 84.01, discount: 22 },
  { id: "2", img: "/assets/deals/2.png", name: "Softovac Sf Constipation Powder...", mrp: 492.00, price: 329.64, discount: 33 },
  { id: "3", img: "/assets/deals/3.png", name: "Diataal-D Multivitamin | Vit. D & Ala | Sustaine...", mrp: 328.18, price: 200.44, discount: 47 },
  { id: "4", img: "/assets/deals/4.png", name: "Lactacyd Feminine Ph 5.2 Bottle Of 100ml...", mrp: 329.00, price: 276.36, discount: 16 },
  { id: "5", img: "/assets/deals/5.png", name: "Celevida Nutrition Drink For Diabetes Care &...", mrp: 787.00, price: 787.00, discount: 0 },
  { id: "6", img: "/assets/deals/6.png", name: "Vantej Long Lasting Protection Mint Flavo...", mrp: 200.00, price: 200.00, discount: 0 },
  { id: "7", img: "/assets/deals/7.png", name: "Enterogermine Suspension 10...", mrp: 748.20, price: 559.65, discount: 25 },

  { id: "8", img: "/assets/deals/8.jpg", name: "Shelcal-500 Calcium + Vitamin D3 Tablets", mrp: 3.20, price: 2.10, discount: 34 },
  { id: "9", img: "/assets/deals/9.png", name: "Isabgol Fibre Husk for Digestive Wellness", mrp: 5.80, price: 3.99, discount: 31 },
  { id: "10", img: "/assets/deals/10.jpg", name: "Revital H Multivitamin for Men (10 Tablets)", mrp: 4.20, price: 2.70, discount: 36 },
  { id: "11", img: "/assets/deals/11.jpg", name: "Himalaya Intimate Wash for Women — 100ml", mrp: 3.90, price: 3.20, discount: 18 },

  { id: "12", img: "/assets/deals/12.jpg", name: "Ensure Diabetes Care Vanilla Nutrition Powder", mrp: 9.90, price: 9.90, discount: 0 },
  { id: "13", img: "/assets/deals/13.jpg", name: "Sensodyne Rapid Relief Toothpaste — 75g", mrp: 2.70, price: 2.70, discount: 0 },
  { id: "14", img: "/assets/deals/14.jpg", name: "ORS Hydration Electrolyte Sachets (Pack of 10)", mrp: 6.10, price: 4.60, discount: 25 },
];

// ========================================
// CONTROLLER UTILITIES (MVC)
// ========================================

// Fetch deal safely
export const getDealById = (id: string): Deal | undefined =>
  deals.find((deal) => deal.id === id);

// Return enriched KSH object (Amazon-style)
export const getDealInKSH = (id: string) => {
  const deal = getDealById(id);
  if (!deal) return undefined;

  return {
    ...deal,
    mrpKSH: scaleToKSH(deal.mrp),
    priceKSH: scaleToKSH(deal.price),
    mrpFormatted: safeFormatKSH(deal.mrp),
    priceFormatted: safeFormatKSH(deal.price),
  };
};

// Convert all deals to KSH
export const getAllDealsInKSH = () =>
  deals.map((d) => ({
    ...d,
    mrpKSH: scaleToKSH(d.mrp),
    priceKSH: scaleToKSH(d.price),
    mrpFormatted: safeFormatKSH(d.mrp),
    priceFormatted: safeFormatKSH(d.price),
  }));
