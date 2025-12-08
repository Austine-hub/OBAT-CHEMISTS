"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import { Heart, ShoppingCart, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// MVC → import data (Model layer)
import { products, type Product } from "@/data/details/ProductGrid"; 

import styles from "./ProductGrid.module.css";

// Controller abstraction (separation of intent)
const useProductGridController = () => {
  const router = useRouter();

  const goToDetails = useCallback((id: number) => {
    router.push(`/products/${id}`);
  }, [router]);

  const stopEvent = useCallback(
    (e: React.MouseEvent) => e.stopPropagation(),
    []
  );

  return { goToDetails, stopEvent };
};

export default function ProductGrid() {
  const { goToDetails, stopEvent } = useProductGridController();

  return (
    <section className={styles.section} aria-labelledby="pink-rush-title">
      {/* HEADER */}
      <div className={styles.header}>
        <h2 id="pink-rush-title" className={styles.title}>
          The Pink Rush
        </h2>

        <button
          className={styles.viewAll}
          aria-label="View all products"
        >
          View All <ArrowRight size={18} strokeWidth={2} />
        </button>
      </div>

      {/* GRID */}
      <div className={styles.grid}>
        {products.map((product: Product) => (
          <motion.article
            key={product.id}
            role="button"
            tabIndex={0}
            onClick={() => goToDetails(product.id)}
            className={styles.card}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* DISCOUNT BADGE */}
            {!!product.discount && (
              <div className={styles.badge}>
                {product.discount}% Off
              </div>
            )}

            {/* ACTION ICONS */}
            <div className={styles.actions}>
              <button
                className={styles.iconBtn}
                aria-label="Add to wishlist"
                onClick={stopEvent}
              >
                <Heart size={18} strokeWidth={2} />
              </button>

              <button
                className={styles.iconBtn}
                aria-label="Add to cart"
                onClick={stopEvent}
              >
                <ShoppingCart size={18} strokeWidth={2} />
              </button>
            </div>

            {/* IMAGE */}
            <div className={styles.imageWrapper}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className={styles.image}
                sizes="100vw"
                priority={false}
              />
            </div>

            {/* CONTENT */}
            <div className={styles.content}>
              <h3 className={styles.name}>{product.name}</h3>

              <div className={styles.pricing}>
                <span className={styles.oldPrice}>
                  KES {product.originalPrice.toLocaleString()}
                </span>

                <span className={styles.price}>
                  KES {product.currentPrice.toLocaleString()}
                </span>
              </div>

              <button
                className={styles.addToCart}
                onClick={stopEvent}
              >
                + Add To Cart
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
