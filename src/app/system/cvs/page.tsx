// src/components/cvs.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../Shop.module.css";

import { cvsProducts } from "@/data/cvsProducts";
import type { Product } from "@/data/cvsProducts";

const CVS: React.FC = () => {
  const [selectedSubCategory, setSelectedSubCategory] = useState("Hypertension");

  // Unique subcategories
  const subCategories = Array.from(new Set(cvsProducts.map((p) => p.subCategory)));

  // Filtered product list
  const filteredProducts = cvsProducts.filter(
    (p: Product) => p.subCategory === selectedSubCategory
  );

  return (
    <section className={styles.shopSection}>
      {/* Header */}
      <header className={styles.header}>
        <h2 className={styles.title}>Cardiovascular & Heart Drugs</h2>

        <div className={styles.subCategorySelect}>
          <label htmlFor="subcategory">Select Subcategory:</label>
          <select
            id="subcategory"
            className={styles.dropdown}
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
          >
            {subCategories.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Product Grid */}
      <div className={styles.grid}>
        {filteredProducts.map((product) => (
          <article key={product.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                src={product.image}
                alt={product.name}
                className={styles.image}
                loading="lazy"
                width={300}
                height={300}
              />
              <span className={styles.stockBadge}>{product.stock}</span>
            </div>

            <div className={styles.details}>
              <p className={styles.category}>{product.subCategory}</p>
              <h3 className={styles.name}>{product.name}</h3>
              <p className={styles.price}>KES {product.price.toLocaleString()}</p>
            </div>

            <div className={styles.actions}>
              <button className={styles.addToCart}>Add to Cart</button>

              <Link href={`/product/${product.id}`} className={styles.moreInfo}>
                More Info
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CVS;
