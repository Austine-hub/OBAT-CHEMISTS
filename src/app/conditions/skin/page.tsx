// src/conditions/DM.tsx
"use client";

import React, { memo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

import styles from "./DM.module.css";

// MODEL
import { diabetesProducts } from "@/data/diabetesProducts";

const DM: React.FC = memo(() => {
  const handleAddToCart = useCallback((productName: string) => {
    toast.success(`${productName} added to cart`, {
      style: {
        background: "#0a7c36",
        color: "white",
      },
      icon: "🛒",
    });
  }, []);

  return (
    <section className={styles.shopSection} aria-labelledby="dm-heading">
      <header className={styles.header}>
        <h2 id="dm-heading" className={styles.title}>
          Diabetes Care Essentials
        </h2>
        <p className={styles.subtitle}>
          Explore trusted and clinically recommended medicines for diabetes control.
        </p>
      </header>

      <div className={styles.grid}>
        {diabetesProducts.map((product) => (
          <article key={product.id} className={styles.card}>
            {/* PRODUCT IMAGE AREA */}
            <div className={styles.imageWrapper}>
              <Image
                src={product.image}
                alt={product.name}
                className={styles.image}
                width={350}
                height={350}
                priority={product.id < 3} // improves LCP for top items
              />
              <span className={styles.stockBadge}>{product.stock}</span>
            </div>

            {/* DETAILS */}
            <div className={styles.details}>
              <p className={styles.category}>{product.category}</p>
              <h3 className={styles.name}>{product.name}</h3>
              <p className={styles.price}>
                KES {product.price.toLocaleString()}
              </p>
            </div>

            {/* CTA BUTTONS */}
            <div className={styles.actions}>
              <button
                className={styles.addToCart}
                onClick={() => handleAddToCart(product.name)}
                aria-label={`Add ${product.name} to cart`}
              >
                Add to Cart
              </button>

              <Link
                href={`/diabetes-product/${product.id}`}
                className={styles.moreInfo}
                aria-label={`View details for ${product.name}`}
              >
                More Info
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
});

DM.displayName = "DM";

export default DM;
