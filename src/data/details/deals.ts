// ============================
// DATA MODEL (Single Source of Truth)
// ============================

export interface Deal {
  id: string;
  img: string;
  name: string;
  mrp: number;
  price: number;
  discount: number;
}

// ============================
// DEALS DATA (Model)
// ============================
export const deals: Deal[] = [
  { id: "1", img: "/api/placeholder/120/120", name: "Depura Vitamin D3 60k Sugar Free Oral...", mrp: 167.70, price: 84.01, discount: 22 },
  { id: "2", img: "/api/placeholder/120/120", name: "Softovac Sf Constipation Powder...", mrp: 492.00, price: 329.64, discount: 33 },
  { id: "3", img: "/api/placeholder/120/120", name: "Diataal-D Multivitamin | Vit. D & Ala | Sustaine...", mrp: 328.18, price: 200.44, discount: 47 },
  { id: "4", img: "/api/placeholder/120/120", name: "Lactacyd Feminine Ph 5.2 Bottle Of 100ml...", mrp: 329.00, price: 276.36, discount: 16 },
  { id: "5", img: "/api/placeholder/120/120", name: "Celevida Nutrition Drink For Diabetes Care &...", mrp: 787.00, price: 787.00, discount: 0 },
  { id: "6", img: "/api/placeholder/120/120", name: "Vantej Long Lasting Protection Mint Flavo...", mrp: 200.00, price: 200.00, discount: 0 },
  { id: "7", img: "/api/placeholder/120/120", name: "Enterogermine Suspension 10...", mrp: 748.20, price: 559.65, discount: 25 },
  { id: "8", img: "/api/placeholder/120/120", name: "Depura Vitamin D3 60k Sugar Free Oral...", mrp: 167.70, price: 84.01, discount: 22 },
  { id: "9", img: "/api/placeholder/120/120", name: "Softovac Sf Constipation Powder...", mrp: 492.00, price: 329.64, discount: 33 },
  { id: "10", img: "/api/placeholder/120/120", name: "Diataal-D Multivitamin | Vit. D & Ala | Sustaine...", mrp: 328.18, price: 200.44, discount: 47 },
  { id: "11", img: "/api/placeholder/120/120", name: "Lactacyd Feminine Ph 5.2 Bottle Of 100ml...", mrp: 329.00, price: 276.36, discount: 16 },
  { id: "12", img: "/api/placeholder/120/120", name: "Celevida Nutrition Drink For Diabetes Care &...", mrp: 787.00, price: 787.00, discount: 0 },
  { id: "13", img: "/api/placeholder/120/120", name: "Vantej Long Lasting Protection Mint Flavo...", mrp: 200.00, price: 200.00, discount: 0 },
  { id: "14", img: "/api/placeholder/120/120", name: "Enterogermine Suspension 10...", mrp: 748.20, price: 559.65, discount: 25 },
];


// ============================
// CONTROLLER-LIKE UTILS
// ============================

export const getDealById = (id: string): Deal | undefined =>
  deals.find((deal) => deal.id === id);
