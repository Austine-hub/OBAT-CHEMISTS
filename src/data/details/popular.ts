// /data/data.ts
// Global product model + central data source (MVC Model)
// -----------------------------------------------------

// You may also extend this in future (category, description, rating, tags etc.)
export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: string;
}

// Centralized products data (used by grid + details)
export const products: Product[] = [
  {
    id: 1,
    name: "Mylan HIV Self Test Kit 1s",
    price: 50.0,
    image: "/product1.jpg",
  },
  {
    id: 2,
    name: "Cosy Toilet Paper 8roll, Unwrap 10x 200 Sheets White",
    price: 200.0,
    oldPrice: 440.0,
    image: "/product2.jpg",
    badge: "40% off",
  },
  {
    id: 3,
    name: "Fay Everyday Baby Wet Wipes 72s + 12s Promo Bundle",
    price: 390.0,
    image: "/product3.jpg",
  },
  {
    id: 4,
    name: "Huggies Dry Comfort Jumbo Size 5 (12-22kg) 52s",
    price: 1695.0,
    image: "/product4.jpg",
  },
  {
    id: 5,
    name: "Fay Facial Decor Art Series 150s",
    price: 205.0,
    image: "/product5.jpg",
  },
  {
    id: 6,
    name: "Majeed Ultra Soft Value Pack 18s",
    price: 227.0,
    image: "/product6.jpg",
  },
  {
    id: 7,
    name: "Maths Facts Jumbo Size 5 X Large (15-20kg) 52s",
    price: 1799.0,
    image: "/product7.jpg",
  },
  {
    id: 8,
    name: "Dove Baby Lotion Rich Moisture 200ml",
    price: 785.0,
    image: "/product8.jpg",
  },
  {
    id: 9,
    name: "Ecrinal 9 Baby Junior Cream 450g",
    price: 1340.0,
    image: "/product9.jpg",
  },
  {
    id: 10,
    name: "Murasakit Granules 250g",
    price: 2750.0,
    image: "/product10.jpg",
  },
];

// Helper to get a single product by id (optional clean helper API)
export const getProductById = (id: number) =>
  products.find((p) => p.id === id);
