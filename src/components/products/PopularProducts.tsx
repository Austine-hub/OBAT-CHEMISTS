//src/components/products/PopularProducts.tsx

"use client";

import React, { memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

import styles from "./PopularProducts.module.css";
import { products } from "@/data/details/popular";
import { useCart } from "@/context/CartContext";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: string;
}

interface ProductCardProps extends Product {
  onView: (id: number) => void;
  onAddToCart: (product: Product) => void;
}

/* -------------------------------------------------------------------------- */
/* Product Card                                                               */
/* -------------------------------------------------------------------------- */

const ProductCard: React.FC<ProductCardProps> = memo(
  ({ id, name, price, oldPrice, image, badge, onView, onAddToCart }) => {
    const stop = (e: React.MouseEvent) => e.stopPropagation();

    return (
      <article
        className={styles.card}
        role="button"
        tabIndex={0}
        onClick={() => onView(id)}
        onKeyDown={(e) => e.key === "Enter" && onView(id)}
      >
        {badge && <span className={styles.badge}>{badge}</span>}

        {/* Floating actions */}
        <div className={styles.actions}>
          <button
            aria-label="Add to wishlist"
            className={styles.iconBtn}
            onClick={stop}
          >
            <Heart size={16} />
          </button>

          <button
            aria-label="View product details"
            className={styles.iconBtn}
            onClick={(e) => {
              stop(e);
              onView(id);
            }}
          >
            <Eye size={16} />
          </button>
        </div>

        {/* Image */}
        <div className={styles.imageWrapper}>
          <Image
            src={image}
            alt={name}
            width={240}
            height={240}
            loading="lazy"
            className={styles.image}
          />
        </div>

        {/* Info */}
        <div className={styles.info}>
          <h3 className={styles.title}>{name}</h3>

          <div className={styles.priceRow}>
            <span className={styles.current}>KES {price.toFixed(2)}</span>
            {oldPrice && (
              <span className={styles.old}>KES {oldPrice.toFixed(2)}</span>
            )}
          </div>

          <div className={styles.ctaRow}>
            <button
              className={styles.viewBtn}
              onClick={(e) => {
                stop(e);
                onView(id);
              }}
            >
              View
            </button>

            <button
              className={styles.addBtn}
              onClick={(e) => {
                stop(e);
                onAddToCart({ id, name, price, oldPrice, image, badge });
              }}
            >
              <ShoppingCart size={16} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </article>
    );
  }
);

ProductCard.displayName = "ProductCard";

/* -------------------------------------------------------------------------- */
/* Popular Products Section                                                   */
/* -------------------------------------------------------------------------- */

const PopularProducts: React.FC = () => {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleView = useCallback(
    (id: number) => {
      router.push(`/popular-products/${id}`);
    },
    [router]
  );

  const handleAddToCart = useCallback(
    (product: Product) => {
      addToCart({
        id: String(product.id),
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        originalPrice: product.oldPrice,
        badge: product.badge,
      });

      toast.success(`${product.name} added to cart`, {
        duration: 2500,
        icon: "🛒",
      });
    },
    [addToCart]
  );

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>New Arrivals at OBAT</h2>
        <button
          className={styles.viewAll}
          onClick={() => router.push("/more/new")}
        >
          View All
        </button>
      </header>

      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onView={handleView}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;
