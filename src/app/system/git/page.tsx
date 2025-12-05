// src/components/git.tsx
'use client';

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import styles from "../Shop.module.css";

import { gitProducts, Product } from "@/data/gitData";

const GIT: React.FC = memo(() => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.image.src,
      quantity: 1,
      inStock: product.stock === "In Stock",
    });

    toast.success(`${product.name} added to cart`);
  };

  return (
    <section className={styles.shopSection}>
      <div className={styles.header}>
        <h2>Shop</h2>
        <div className={styles.subCategory}>
          <label>Subcategory:</label>
          <span>GIT drugs</span>
        </div>
      </div>

      <div className={styles.grid}>
        {gitProducts.map((product) => (
          <div key={product.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                src={product.image}
                alt={product.name}
                className={styles.image}
                loading="lazy"
              />
              <span className={styles.stockBadge}>{product.stock}</span>
            </div>

            <div className={styles.details}>
              <p className={styles.category}>{product.category}</p>
              <h3 className={styles.name}>{product.name}</h3>
              <p className={styles.price}>
                kes {product.price.toLocaleString()}
              </p>
            </div>

            <div className={styles.actions}>
              <button
                className={styles.addToCart}
                onClick={() => handleAddToCart(product)}
              >
                🛒 Add to Cart
              </button>

              <Link href={`/product/${product.id}`} className={styles.moreInfo}>
                More Info
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default GIT;
