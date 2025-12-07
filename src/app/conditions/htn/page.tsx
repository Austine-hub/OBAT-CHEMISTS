// ============================================================
// 💊 /conditions/htn/page.tsx — Hypertension Products View
// Next.js 16 App Router / Modernized & Optimized
// ============================================================

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./PharmacyProducts.module.css"; // adjust path as needed
import { htnProducts, type Product, formatPrice } from "@/data/HTNData";

// ============================================================
// 🧩 Hypertension Component
// ============================================================
const Hypertension: React.FC = () => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [cart, setCart] = useState<Set<number>>(new Set());

  // Toggle favorite status
  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  };

  // Add product to cart
  const addToCart = (id: number) => {
    setCart((prev) => new Set(prev).add(id));
  };

  // Render stars dynamically
  const renderStars = (rating: number) => (
    <div className={styles.rating} aria-label={`Rating: ${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? styles.starFilled : styles.starEmpty}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );

  // ==========================================================
  // Render
  // ==========================================================
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Hypertension Products</h1>
        <p>Quality medications at affordable prices</p>
      </header>

      <section className={styles.grid}>
        {htnProducts.map((product: Product) => (
          <article key={product.id} className={styles.card}>
            {product.badge && (
              <span className={`${styles.badge} ${styles[product.badge.toLowerCase()]}`}>
                {product.badge}
              </span>
            )}

            {/* Favorite Button */}
            <button
              className={`${styles.favoriteBtn} ${
                favorites.has(product.id) ? styles.favorited : ""
              }`}
              onClick={() => toggleFavorite(product.id)}
              aria-label={
                favorites.has(product.id)
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>

            {/* Product Image */}
            <div className={styles.imageWrapper}>
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className={styles.productImage}
                priority={false}
              />
            </div>

            {/* Product Content */}
            <div className={styles.content}>
              <h2 className={styles.productName}>{product.name}</h2>
              {renderStars(product.rating)}

              <div className={styles.priceWrapper}>
                <span className={styles.currentPrice}>
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className={styles.originalPrice}>
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className={styles.actions}>
                <button
                  className={styles.addToCartBtn}
                  onClick={() => addToCart(product.id)}
                  disabled={cart.has(product.id)}
                  aria-label={`Add ${product.name} to cart`}
                >
                  {cart.has(product.id) ? (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Added
                    </>
                  ) : (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                      Add to Cart
                    </>
                  )}
                </button>

                {/* View Details */}
                <Link
                  href={`/htn-product/${product.id}`}
                  className={styles.detailsBtn}
                  aria-label={`View details for ${product.name}`}
                >
                  View Details
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

// ============================================================
// ✅ Page Export
// ============================================================
export default function Page() {
  return <Hypertension />;
}
