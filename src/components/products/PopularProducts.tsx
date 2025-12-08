"use client";

import React, { memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Heart, Eye } from "lucide-react";
import styles from "./PopularProducts.module.css";

// MVC: Model imported from central data source
import { products } from "@/data/details/popular";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: string;
  onOpen: (id: number) => void;
}

/** Product Card (View Component) */
const ProductCard: React.FC<ProductCardProps> = memo(
  ({ id, name, price, oldPrice, image, badge, onOpen }) => {
    const stop = (e: React.MouseEvent) => e.stopPropagation();

    return (
      <article className={styles.card} onClick={() => onOpen(id)}>
        {badge && <span className={styles.badge}>{badge}</span>}

        <div className={styles.actions}>
          <button aria-label="Add to wishlist" className={styles.iconBtn} onClick={stop}>
            <Heart size={18} strokeWidth={2} />
          </button>

          <button aria-label="Quick view" className={styles.iconBtn} onClick={stop}>
            <Eye size={18} strokeWidth={2} />
          </button>
        </div>

        <div className={styles.imageWrapper}>
          <Image
            src={image}
            alt={name}
            width={300}
            height={300}
            loading="lazy"
            className={styles.image}
          />
        </div>

        <div className={styles.info}>
          <h3>{name}</h3>

          <div className={styles.priceRow}>
            <span className={styles.current}>KES {price.toFixed(2)}</span>
            {oldPrice && <span className={styles.old}>KES {oldPrice.toFixed(2)}</span>}
          </div>

          <button className={styles.addBtn} onClick={stop}>
            + Add To Cart
          </button>
        </div>
      </article>
    );
  }
);
ProductCard.displayName = "ProductCard";

/** Controller + Page View */
const PopularProducts: React.FC = () => {
  const router = useRouter();

  const openProduct = useCallback(
    (id: number) => {
      router.push(`/popular-products/${id}`);
    },
    [router]
  );

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>Popular Products</h2>
        <a href="/view-all" className={styles.viewAll}>
          View All
        </a>
      </header>

      <div className={styles.grid}>
        {products.map((p) => (
          <ProductCard key={p.id} {...p} onOpen={openProduct} />
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;
