//src/components/products/ProductGrid2.tsx
"use client";

import React, { useMemo, KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import styles from "./ProductGrid2.module.css";
import { useCart } from "@/context/CartContext";
import { productsArray, formatPrice } from "@/data/details/products";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const navigateToProduct = (
  router: ReturnType<typeof useRouter>,
  id: number
) => router.push(`/products2/${id}`);

const handleKeyboardNav =
  (router: ReturnType<typeof useRouter>, id: number) =>
  (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigateToProduct(router, id);
    }
  };

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function ProductGrid2() {
  const router = useRouter();
  const { addToCart } = useCart();

  const products = useMemo(() => productsArray as Product[], []);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: String(product.id),
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      inStock: true,
    });

    toast.success(`${product.name} added to cart`, {
      icon: "🛒",
      duration: 2500,
    });
  };

  if (!products.length) {
    return (
      <section className={styles.empty} aria-live="polite">
        <h2 className={styles.emptyTitle}>No products available</h2>
        <p className={styles.emptyDesc}>
          Please check back later for new arrivals.
        </p>
      </section>
    );
  }

  return (
    <section className={styles.container} aria-labelledby="new-at-obat">
      {/* Header */}
      <header className={styles.header}>
        <h2 id="new-at-obat" className={styles.title}>
          New at OBAT
        </h2>

        <Link href="/products" className={styles.viewAll}>
          View all
        </Link>
      </header>

      {/* Grid */}
      <div className={styles.grid} role="list">
        {products.map((product) => {
          const priceLabel =
            formatPrice?.(product.price) ?? `KES ${product.price}`;

          return (
            <motion.article
              key={product.id}
              className={styles.card}
              role="listitem"
              tabIndex={0}
              layout
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateToProduct(router, product.id)}
              onKeyDown={handleKeyboardNav(router, product.id)}
            >
              {/* Image */}
              <div className={styles.media}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={520}
                  height={520}
                  className={styles.image}
                  sizes="(max-width: 768px) 45vw, 240px"
                  priority={false}
                />

                {/* Overlay actions */}
                <div className={styles.overlay}>
                  <button
                    className={styles.iconBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      toast("Wishlist coming soon ❤️");
                    }}
                    aria-label="Add to wishlist"
                  >
                    <Heart size={16} />
                  </button>

                  <button
                    className={styles.iconBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/products2/${product.id}`);
                    }}
                    aria-label="View product"
                  >
                    <Eye size={16} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className={styles.content}>
                <h3 className={styles.productName}>
                  <Link
                    href={`/products2/${product.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className={styles.productLink}
                  >
                    {product.name}
                  </Link>
                </h3>

                <div className={styles.meta}>
                  <span className={styles.price}>{priceLabel}</span>

                  <div className={styles.actions}>
                    <button
                      className={styles.viewBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/products2/${product.id}`);
                      }}
                    >
                      View
                    </button>

                    <button
                      className={styles.addBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <ShoppingCart size={14} />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
