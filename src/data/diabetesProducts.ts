// src/data/diabetesProducts.ts
import type { StaticImageData } from "next/image";

import metforminImg from "@/assets/diabetes/Metformin.png";
import glimepirideImg from "@/assets/diabetes/Glimepiride.png";
import glipizideImg from "@/assets/diabetes/Glipizide.png";
import gliclazideImg from "@/assets/diabetes/Gliclazide.png";
import sitagliptinImg from "@/assets/diabetes/Sitagliptin.png";
import vildagliptinImg from "@/assets/diabetes/Vildagliptin.png";
import empagliflozinImg from "@/assets/diabetes/Empagliflozin.png";
import dapagliflozinImg from "@/assets/diabetes/Dapagliflozin.png";
import insulinGlargineImg from "@/assets/diabetes/Insulinglargine.png";
import insulinAspartImg from "@/assets/diabetes/InsulinAspart.png";
import insulinDetemirImg from "@/assets/diabetes/InsulinDetemir.png";
import pioglitazoneImg from "@/assets/diabetes/Pioglitazone.png";
import acarboseImg from "@/assets/diabetes/Acarbose.png";
import linagliptinImg from "@/assets/diabetes/Linagliptin.png";
import repaglinideImg from "@/assets/diabetes/Repaglinide.png";

export interface Product {
  id: number;
  name: string;
  image: StaticImageData | string;
  price: number;
  category: string;
  stock: string;
}

export const diabetesProducts: Product[] = [
  { id: 1, name: "Metformin (Glucophage)", image: metforminImg, price: 850, category: "Biguanides", stock: "In Stock" },
  { id: 2, name: "Glimepiride (Amaryl)", image: glimepirideImg, price: 970, category: "Sulfonylureas", stock: "In Stock" },
  { id: 3, name: "Glipizide", image: glipizideImg, price: 890, category: "Sulfonylureas", stock: "In Stock" },
  { id: 4, name: "Gliclazide (Diamicron)", image: gliclazideImg, price: 950, category: "Sulfonylureas", stock: "In Stock" },
  { id: 5, name: "Sitagliptin (Januvia)", image: sitagliptinImg, price: 2850, category: "DPP-4 Inhibitors", stock: "In Stock" },
  { id: 6, name: "Vildagliptin (Galvus)", image: vildagliptinImg, price: 2550, category: "DPP-4 Inhibitors", stock: "In Stock" },
  { id: 7, name: "Empagliflozin (Jardiance)", image: empagliflozinImg, price: 3350, category: "SGLT2 Inhibitors", stock: "In Stock" },
  { id: 8, name: "Dapagliflozin (Forxiga)", image: dapagliflozinImg, price: 3280, category: "SGLT2 Inhibitors", stock: "In Stock" },
  { id: 9, name: "Insulin Glargine (Lantus)", image: insulinGlargineImg, price: 4100, category: "Insulin (Basal)", stock: "In Stock" },
  { id: 10, name: "Insulin Aspart (NovoRapid)", image: insulinAspartImg, price: 3900, category: "Insulin (Rapid-Acting)", stock: "In Stock" },
  { id: 11, name: "Insulin Detemir (Levemir)", image: insulinDetemirImg, price: 4200, category: "Insulin (Basal)", stock: "In Stock" },
  { id: 12, name: "Pioglitazone (Actos)", image: pioglitazoneImg, price: 1200, category: "Thiazolidinediones", stock: "In Stock" },
  { id: 13, name: "Acarbose (Glucobay)", image: acarboseImg, price: 950, category: "Alpha-Glucosidase Inhibitors", stock: "In Stock" },
  { id: 14, name: "Linagliptin (Tradjenta)", image: linagliptinImg, price: 2850, category: "DPP-4 Inhibitors", stock: "In Stock" },
  { id: 15, name: "Repaglinide (Prandin)", image: repaglinideImg, price: 1120, category: "Meglitinides", stock: "In Stock" },
];
