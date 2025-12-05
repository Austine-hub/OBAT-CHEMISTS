// src/data/cvsProducts.ts
import { StaticImageData } from "next/image";

// ===============================
// ✅ Type Definition
// ===============================
export interface Product {
  id: number;
  name: string;
  image: string | StaticImageData;
  price: number;
  category: string;
  stock: string;
  subCategory: string;
}

// ===============================
// ✅ Static Image Imports
// ===============================
import amlodipineImg from "../assets/products/BloodPressure/Amlodipine.png";
import atenololImg from "../assets/products/BloodPressure/Atenolol.png";
import bisoprololImg from "../assets/products/BloodPressure/Bisoprolol.png";
import candesartanImg from "../assets/products/BloodPressure/Candesartan.png";
import chlorthalidoneImg from "../assets/products/BloodPressure/Chlorthalidone.png";
import enalaprilImg from "../assets/products/BloodPressure/Enalapril.png";
import furosemideImg from "../assets/products/BloodPressure/Furosemide.png";
import hydrochlorothiazideImg from "../assets/products/BloodPressure/Hydrochlorothiazide.png";
import losartanImg from "../assets/products/BloodPressure/Losartan.png";
import nifedipineImg from "../assets/products/BloodPressure/Nifedipine.png";
import spironolactoneImg from "../assets/products/BloodPressure/Spironolactone.png";
import telmisartanImg from "../assets/products/BloodPressure/Telmisartan.png";
import valsartanImg from "../assets/products/BloodPressure/Valsartan.png";

// ===============================
// ✅ Product Data
// ===============================
export const cvsProducts: Product[] = [
  // Hypertension
  { id: 1, name: "Amlodipine", image: amlodipineImg, price: 2395, category: "Cardiovascular", subCategory: "Hypertension", stock: "In Stock" },
  { id: 2, name: "Atenolol", image: atenololImg, price: 2747, category: "Cardiovascular", subCategory: "Hypertension", stock: "In Stock" },
  { id: 3, name: "Bisoprolol", image: bisoprololImg, price: 1714, category: "Cardiovascular", subCategory: "Hypertension", stock: "In Stock" },
  { id: 4, name: "Candesartan", image: candesartanImg, price: 1420, category: "Cardiovascular", subCategory:"Hypertension", stock: "In Stock" },
  { id: 5, name: "Furosemide", image: furosemideImg, price: 1200, category: "Cardiovascular", subCategory: "Hypertension", stock: "In Stock" },
  { id: 6, name: "Spironolactone", image: spironolactoneImg, price: 1350, category: "Cardiovascular", subCategory: "Hypertension", stock: "In Stock" },
  { id: 7, name: "Enalapril", image: enalaprilImg, price: 1520, category: "Cardiovascular", subCategory: "Hypertension", stock: "In Stock" },
  { id: 8, name: "Telmisartan", image: telmisartanImg, price: 1380, category: "Cardiovascular", subCategory: "Hypertension", stock: "In Stock" },
  { id: 9, name: "Valsartan", image: valsartanImg, price: 1420, category: "Cardiovascular", subCategory: "Hypertension", stock: "In Stock" },
  { id: 10, name: "Losartan", image: losartanImg, price: 1470, category: "Cardiovascular", subCategory: "Hypertension", stock: "In Stock" },
  { id: 11, name: "Chlorthalidone", image: chlorthalidoneImg, price: 1320, category: "Cardiovascular", subCategory: "Hypertension", stock: "In Stock" },
  { id: 12, name: "Hydrochlorothiazide", image: hydrochlorothiazideImg, price: 1410, category: "Cardiovascular", subCategory: "Hypertension", stock: "In Stock" },
  { id: 13, name: "Nifedipine", image: nifedipineImg, price: 1450, category: "Cardiovascular", subCategory: "Hypertension", stock: "In Stock" },

  // CHF
  { id: 14, name: "Candesartan", image: candesartanImg, price: 1420, category: "Cardiovascular", subCategory: "Congestive Heart Failure", stock: "In Stock" },
  { id: 15, name: "Furosemide", image: furosemideImg, price: 1200, category: "Cardiovascular", subCategory: "Congestive Heart Failure", stock: "In Stock" },
  { id: 16, name: "Spironolactone", image: spironolactoneImg, price: 1350, category: "Cardiovascular", subCategory: "Congestive Heart Failure", stock: "In Stock" },

  // CAD
  { id: 17, name: "Enalapril", image: enalaprilImg, price: 1520, category: "Cardiovascular", subCategory: "Coronary Artery Disease", stock: "In Stock" },
  { id: 18, name: "Telmisartan", image: telmisartanImg, price: 1380, category: "Cardiovascular", subCategory: "Coronary Artery Disease", stock: "In Stock" },
  { id: 19, name: "Valsartan", image: valsartanImg, price: 1420, category: "Cardiovascular", subCategory: "Coronary Artery Disease", stock: "In Stock" },

  // DVT
  { id: 20, name: "Losartan", image: losartanImg, price: 1470, category: "Cardiovascular", subCategory: "DVT", stock: "In Stock" },
  { id: 21, name: "Chlorthalidone", image: chlorthalidoneImg, price: 1320, category: "Cardiovascular", subCategory: "DVT", stock: "In Stock" },

  // Other
  { id: 22, name: "Hydrochlorothiazide", image: hydrochlorothiazideImg, price: 1410, category: "Cardiovascular", subCategory: "Other Cardiac Conditions", stock: "In Stock" },
  { id: 23, name: "Nifedipine", image: nifedipineImg, price: 1450, category: "Cardiovascular", subCategory: "Other Cardiac Conditions", stock: "In Stock" },
];
