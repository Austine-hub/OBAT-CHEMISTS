"use client";

// ===============================================================
// src/app/category/hygiene/page.tsx
// Optimized • Modern • DRY • Strict • Robust
// ===============================================================

import React, { useRef, useState, useEffect, memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import styles from "./Hygiene.module.css";

// Data + Types
import {
  OffersDataUtils,
  type ProductListing,
} from "@/data/hygieneData";

const HygienePage: React.FC = memo(() => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const router = useRouter();
  const { addToCart } = useCart();

  // ===========================================================
  // Fetch products (strict)
  // ===========================================================
  const products: ProductListing[] = OffersDataUtils.getListingProducts() ?? [];

  // ===========================================================
  // Scroll logic (debounced + robust)
  // ===========================================================
  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollAmount = el.clientWidth * 0.8;

    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // ===========================================================
  // Navigation → /dropdowns/hygiene/[slug]
  // ===========================================================
  const handleViewDetails = (productId: string | number) => {
    if (!productId) return;
    const url = `/dropdowns/hygiene/${productId}`;
    router.push(url);
  };

  // ===========================================================
  // Add to Cart
  // ===========================================================
  const handleAddToCart = (product: ProductListing) => {
    if (!product) return;

    addToCart({
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    toast.success(`${product.name} added to cart 🛒`, { duration: 1800 });
  };

  // ===========================================================
  // JSX
  // ===========================================================
  return (
    <section className={styles.offersSection}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <h2 className={styles.title}>Campus Essentials</h2>

          <div className={styles.navButtons}>
            <button
              className={`${styles.navBtn} ${!canScrollLeft ? styles.disabled : ""}`}
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              className={`${styles.navBtn} ${!canScrollRight ? styles.disabled : ""}`}
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </header>

        {/* Product List */}
        <div
          className={styles.productsWrapper}
          ref={scrollRef}
          onScroll={checkScroll}
        >
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <article
                key={product.id}
                className={styles.productCard}
                role="article"
              >
                {/* Trending */}
                {product.isTrending && (
                  <span className={styles.trendingBadge}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" fill="currentColor" />
                    </svg>
                    Trending
                  </span>
                )}

                {/* Image */}
                <div
                  className={styles.imageWrapper}
                  onClick={() => handleViewDetails(product.id)}
                  role="button"
                >
                  {typeof product.image === "string" ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className={styles.productImage}
                      loading="lazy"
                    />
                  ) : (
                    <Image
                      src={product.image}
                      alt={product.name}
                      className={styles.productImage}
                      priority={false}
                    />
                  )}
                </div>

                {/* Product Info */}
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productDesc}>{product.description}</p>
                  <p className={styles.brandName}>{product.brand}</p>
                  <p className={styles.price}>KES {product.price.toFixed(2)}</p>
                </div>

                {/* Footer */}
                <footer className={styles.cardFooter}>
                  <button
                    className={styles.addBtn}
                    onClick={() => handleAddToCart(product)}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <ShoppingCart size={18} strokeWidth={1.8} />
                    <span>Add</span>
                  </button>

                  <button
                    className={styles.detailsBtn}
                    onClick={() => handleViewDetails(product.id)}
                    aria-label={`View details for ${product.name}`}
                  >
                    View Details
                  </button>
                </footer>
              </article>
            ))}
          </div>
        </div>

        {/* View All */}
        <button className={styles.viewAll} onClick={() => router.push("/dropdowns/hygiene")}>
          View All Campus Essentials
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12h14M12 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
});

HygienePage.displayName = "HygienePage";
export default HygienePage;
