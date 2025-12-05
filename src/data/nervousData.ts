// src/data/nervousData.ts

import pic1 from "../assets/products/sertraline.png";
import pic2 from "../assets/products/alprazolam.png";
import pic3 from "../assets/products/gabapentin.png";
import pic4 from "../assets/products/duloxetine.png";
import pic5 from "../assets/products/olanzapine.png";
import pic6 from "../assets/products/levetiracetam.png";
import pic7 from "../assets/products/donepezil.png";
import pic8 from "../assets/products/fluoxetine.png";

export interface Product {
  id: number;
  name: string;
  image: any;
  price: number;
  category: string;
  stock: string;
}

export const nervousProducts: Product[] = [
  {
    id: 1,
    name: "Sertraline (Zoloft)",
    image: pic1,
    price: 1820,
    category: "Antidepressant (SSRI)",
    stock: "In Stock",
  },
  {
    id: 2,
    name: "Alprazolam (Xanax)",
    image: pic2,
    price: 960,
    category: "Anxiolytic (Benzodiazepine)",
    stock: "In Stock",
  },
  {
    id: 3,
    name: "Gabapentin (Neurontin)",
    image: pic3,
    price: 2100,
    category: "Anticonvulsant / Neuropathic Pain",
    stock: "In Stock",
  },
  {
    id: 4,
    name: "Duloxetine (Cymbalta)",
    image: pic4,
    price: 2350,
    category: "Antidepressant / Nerve Pain",
    stock: "In Stock",
  },
  {
    id: 5,
    name: "Olanzapine (Zyprexa)",
    image: pic5,
    price: 2640,
    category: "Antipsychotic (Schizophrenia, Bipolar)",
    stock: "In Stock",
  },
  {
    id: 6,
    name: "Levetiracetam (Keppra)",
    image: pic6,
    price: 1980,
    category: "Antiepileptic",
    stock: "In Stock",
  },
  {
    id: 7,
    name: "Donepezil (Aricept)",
    image: pic7,
    price: 2890,
    category: "Cognitive Enhancer (Alzheimer’s)",
    stock: "In Stock",
  },
  {
    id: 8,
    name: "Fluoxetine (Prozac)",
    image: pic8,
    price: 1750,
    category: "Antidepressant (SSRI)",
    stock: "In Stock",
  },
];
