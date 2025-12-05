"use client";

import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Diabetes.module.css";

// === Type Definition ===
export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  stock: string;
}

// === Product List ===
const products: Product[] = [
  { id: 1, name: "Metformin (Glucophage)", image: "/diabetes/Metformin.png", price: 850, category: "Biguanides", stock: "In Stock" },
  { id: 2, name: "Glimepiride (Amaryl)", image: "/diabetes/Glimepiride.png", price: 970, category: "Sulfonylureas", stock: "In Stock" },
  { id: 3, name: "Glipizide", image: "/diabetes/Glipizide.png", price: 890, category: "Sulfonylureas", stock: "In Stock" },
  { id: 4, name: "Gliclazide (Diamicron)", image: "/diabetes/Gliclazide.png", price: 950, category: "Sulfonylureas", stock: "In Stock" },
  { id: 5, name: "Sitagliptin (Januvia)", image: "/diabetes/Sitagliptin.png", price: 2850, category: "DPP-4 Inhibitors", stock: "In Stock" },
  { id: 6, name: "Vildagliptin (Galvus)", image: "/diabetes/Vildagliptin.png", price: 2550, category: "DPP-4 Inhibitors", stock: "In Stock" },
  { id: 7, name: "Empagliflozin (Jardiance)", image: "/diabetes/Empagliflozin.png", price: 3350, category: "SGLT2 Inhibitors", stock: "In Stock" },
  { id: 8, name: "Dapagliflozin (Forxiga)", image: "/diabetes/Dapagliflozin.png", price: 3280, category: "SGLT2 Inhibitors", stock: "In Stock" },
  { id: 9, name: "Insulin Glargine (Lantus)", image: "/diabetes/Insulinglargine.png", price: 4100, category: "Insulin (Basal)", stock: "In Stock" },
  { id: 10, name: "Insulin Aspart (NovoRapid)", image: "/diabetes/InsulinAspart.png", price: 3900, category: "Insulin (Rapid-Acting)", stock: "In Stock" },
  { id: 11, name: "Insulin Detemir (Levemir)", image: "/diabetes/InsulinDetemir.png", price: 4200, category: "Insulin (Basal)", stock: "In Stock" },
  { id: 12, name: "Pioglitazone (Actos)", image: "/diabetes/Pioglitazone.png", price: 1200, category: "Thiazolidinediones", stock: "In Stock" },
  { id: 13, name: "Acarbose (Glucobay)", image: "/diabetes/Acarbose.png", price: 950, category: "Alpha-Glucosidase Inhibitors", stock: "In Stock" },
  { id: 14, name: "Linagliptin (Tradjenta)", image: "/diabetes/Linagliptin.png", price: 2850, category: "DPP-4 Inhibitors", stock: "In Stock" },
  { id: 15, name: "Repaglinide (Prandin)", image: "/diabetes/Repaglinide.png", price: 1120, category: "Meglitinides", stock: "In Stock" },
];

const DM: React.FC = () => {
  return (
    <section className={styles.shopSection} aria-labelledby="shop-heading">
      <header className={styles.header}>
        <h2 id="shop-heading" className={styles.title}>
          Diabetes Care Essentials
        </h2>
        <p className={styles.subtitle}>
          Explore the most prescribed and trusted medicines for diabetes management
        </p>
      </header>

      <div className={styles.grid} role="list">
        {products.map((product) => (
          <article key={product.id} className={styles.card} role="listitem">
            
            {/* Product Image */}
            <div className={styles.imageWrapper}>
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                className={styles.image}
                loading="lazy"
                priority={false}
              />

              <span className={styles.stockBadge} aria-label={product.stock}>
                {product.stock}
              </span>
            </div>

            {/* Product Details */}
            <div className={styles.details}>
              <p className={styles.category}>{product.category}</p>

              <h3 className={styles.name}>{product.name}</h3>

              <p className={styles.price}>
                KES {product.price.toLocaleString()}
              </p>
            </div>

            {/* Buttons */}
            <div className={styles.actions}>
              <button
                className={styles.addToCart}
                aria-label={`Add ${product.name} to cart`}
              >
                Add to Cart
              </button>

              <Link
                href={`/diabetes-product/${product.id}`}
                className={styles.moreInfo}
                aria-label={`More info about ${product.name}`}
              >
                More Info
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default memo(DM);
