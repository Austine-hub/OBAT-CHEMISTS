import { StaticImageData } from "next/image";

// === Local product images ===
// (All imports preserved exactly as your original images)
import pic1 from "@/assets/products/cerave-cleanser.png";
import pic2 from "@/assets/products/ordinary-serum.png";
import pic3 from "@/assets/products/laroche-moisturizer.png";
import pic4 from "@/assets/products/neutrogena-sunscreen.png";
import pic5 from "@/assets/products/tatcha-cream.png";
import pic6 from "@/assets/products/olay-retinol.png";
import pic7 from "@/assets/products/paulas-choice.png";
import pic8 from "@/assets/products/elf-hydrating.png";
import pic9 from "@/assets/products/innisfree-serum.png";
import pic10 from "@/assets/products/drunk-elephant.png";
import pic11 from "@/assets/products/fenty-cleanser.png";
import pic12 from "@/assets/products/aveeno-daily.png";
import pic13 from "@/assets/products/glow-recipe.png";
import pic14 from "@/assets/products/cosrx-snail.png";
import pic15 from "@/assets/products/first-aid-beauty.png";

export type Offer = {
  id: string;
  name: string;
  image: StaticImageData;
  discount: number;
  price: number;
  oldPrice: number;
};

export const offersData: Offer[] = [
  { id: "1", name: "Colgate Total Whitening Toothpaste 120g", image: pic1, discount: 10, price: 650, oldPrice: 720 },
  { id: "2", name: "Sensodyne Repair & Protect Toothpaste 100g", image: pic2, discount: 12, price: 950, oldPrice: 1080 },
  { id: "3", name: "Oral-B Pro-Health Toothbrush (Medium Bristles)", image: pic3, discount: 10, price: 500, oldPrice: 560 },
  { id: "4", name: "Listerine Cool Mint Mouthwash 500ml", image: pic4, discount: 15, price: 1100, oldPrice: 1290 },
  { id: "5", name: "Colgate Plax Fresh Tea Mouthwash 500ml", image: pic5, discount: 10, price: 950, oldPrice: 1050 },
  { id: "6", name: "Crest 3D White Brilliance Toothpaste 116g", image: pic6, discount: 10, price: 1200, oldPrice: 1340 },
  { id: "7", name: "Oral-B Glide Pro-Health Dental Floss 40m", image: pic7, discount: 12, price: 650, oldPrice: 740 },
  { id: "8", name: "Sensodyne Fresh Mint Toothpaste 100g", image: pic8, discount: 10, price: 900, oldPrice: 1000 },
  { id: "9", name: "TheraBreath Fresh Breath Oral Rinse 473ml", image: pic9, discount: 8, price: 1650, oldPrice: 1790 },
  { id: "10", name: "Colgate 360° Total Advanced Toothbrush", image: pic10, discount: 10, price: 700, oldPrice: 780 },
  { id: "11", name: "Oral-B Electric Toothbrush Vitality CrossAction", image: pic11, discount: 12, price: 3800, oldPrice: 4300 },
  { id: "12", name: "Crest Pro-Health Advanced Mouthwash 1L", image: pic12, discount: 10, price: 1450, oldPrice: 1600 },
  { id: "13", name: "Colgate Optic White Renewal Toothpaste 85g", image: pic13, discount: 10, price: 1150, oldPrice: 1280 },
  { id: "14", name: "Tom’s of Maine Fluoride-Free Toothpaste 100g", image: pic14, discount: 12, price: 1050, oldPrice: 1190 },
  { id: "15", name: "GUM Soft-Picks Advanced Dental Picks (60 pack)", image: pic15, discount: 10, price: 850, oldPrice: 940 },
];
