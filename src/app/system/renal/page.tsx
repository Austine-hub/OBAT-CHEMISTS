// File: src/components/renal.tsx

"use client";

import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext"; // adjust path if your context lives elsewhere
import styles from "../Shop.module.css";

import { Product, PRODUCTS } from "@/data/RenalData";

const Renal: React.FC = memo(() => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: String(product.id), // convert number -> string if cart expects string id
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      inStock: product.stock.toLowerCase().includes("in"),
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <section className={styles.shopSection}>
      <div className={styles.header}>
        <h2>Shop</h2>
        <div className={styles.subCategory}>
          <label>Subcategory:</label>
          <span>Renal/Urinary System</span>
        </div>
      </div>

      <div className={styles.grid}>
        {PRODUCTS.map((product) => (
          <article key={product.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              {/* Next/Image handles optimization. product.image can be imported StaticImageData or string */}
              <Image
                src={product.image as any}
                alt={product.name}
                fill={false}
                width={240}
                height={160}
                loading="lazy"
                className={styles.image}
                priority={false}
              />
              <span className={styles.stockBadge}>{product.stock}</span>
            </div>

            <div className={styles.details}>
              <p className={styles.category}>{product.category}</p>
              <h3 className={styles.name}>{product.name}</h3>
              <p className={styles.price}>KES {product.price.toLocaleString()}</p>
            </div>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.addToCart}
                onClick={() => handleAddToCart(product)}
              >
                🛒 Add to Cart
              </button>

              <Link href={`/product/${product.id}`} className={styles.moreInfo}>
                More Info
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
});

export default Renal;
