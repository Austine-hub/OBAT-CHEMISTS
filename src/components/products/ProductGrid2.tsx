"use client";

import React, { useMemo, KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import styles from "./ProductGrid2.module.css";

// ===== MVC - MODEL (imported centralized data) =====
import { productsArray, formatPrice } from "@/data/details/products"; // adjust path if needed
// Product interface assumed exported from data.ts; otherwise adapt types below
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
}

// ===== CONTROLLER HELPERS (pure functions to keep view simple) =====
const navigateToProduct = (router: ReturnType<typeof useRouter>, id: number) =>
  router.push(`/products2/${id}`);

const handleCardKey =
  (router: ReturnType<typeof useRouter>, id: number) =>
  (e: KeyboardEvent<HTMLElement>) => {
    // activate navigation on Enter or Space
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigateToProduct(router, id);
    }
  };

// (Example) small controller stub for add-to-cart/wishlist — replace with real logic
const addToCart = (product: Product) => {
  // TODO: replace with context / store / API call
  console.log("add to cart", product.id);
};

const addToWishlist = (product: Product) => {
  // TODO: replace with context / API call
  console.log("wishlist", product.id);
};

// ===== VIEW =====
export default function ProductGrid2() {
  const router = useRouter();

  // Memoize product list for render efficiency
  const products = useMemo(() => productsArray as Product[], []);

  if (!products || products.length === 0) {
    return (
      <section className={styles.empty} aria-live="polite">
        <h2 className={styles.emptyTitle}>No products available</h2>
        <p className={styles.emptyDesc}>Check back soon for new arrivals.</p>
      </section>
    );
  }

  return (
    <section className={styles.container} aria-labelledby="new-at-obat">
      <div className={styles.header}>
        <h2 id="new-at-obat" className={styles.title}>
          New at OBAT
        </h2>

        <Link href="/products" className={styles.viewAll} aria-label="View all products">
          View all
        </Link>
      </div>

      <div
        className={styles.grid}
        role="list"
        aria-label="New products"
      >
        {products.map((product) => {
          const priceLabel = formatPrice ? formatPrice(product.price) : `KES ${product.price}`;

          return (
            <motion.article
              key={product.id}
              className={styles.card}
              role="listitem"
              tabIndex={0}
              onKeyDown={handleCardKey(router, product.id)}
              onClick={() => navigateToProduct(router, product.id)}
              whileHover={{ translateY: -6 }}
              whileTap={{ scale: 0.995 }}
              layout
              aria-labelledby={`product-title-${product.id}`}
            >
              <div className={styles.media}>
                <Link
                  href={`/products2/${product.id}`}
                  aria-label={`Open details for ${product.name}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={520}
                    height={520}
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
                    loading="lazy"
                    className={styles.image}
                  />
                </Link>

                <div className={styles.overlayControls} aria-hidden="true">
                  <button
                    className={styles.iconBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToWishlist(product);
                    }}
                    aria-label={`Add ${product.name} to wishlist`}
                    title="Add to wishlist"
                  >
                    <Heart size={16} />
                  </button>

                  <button
                    className={styles.iconBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      // quick view placeholder — replace with modal controller
                      router.push(`/products2/${product.id}?quickView=1`);
                    }}
                    aria-label={`Quick view ${product.name}`}
                    title="Quick view"
                  >
                    <Eye size={16} />
                  </button>
                </div>
              </div>

              <div className={styles.content}>
                <h3 id={`product-title-${product.id}`} className={styles.productName}>
                  <Link
                    href={`/products2/${product.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className={styles.productLink}
                  >
                    <span className={styles.productNameInner}>{product.name}</span>
                  </Link>
                </h3>

                <div className={styles.meta}>
                  <p className={styles.price} aria-label={`Price ${priceLabel}`}>
                    {priceLabel}
                  </p>

                  <button
                    className={styles.addBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    + Add
                  </button>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

