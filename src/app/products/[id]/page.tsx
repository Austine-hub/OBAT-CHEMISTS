"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./details.module.css";
import { Heart, ShoppingCart, ArrowLeft } from "lucide-react";

// ===== IMPORT CENTRAL MODEL (MVC pattern) =====
import { products } from "@/data/details/ProductGrid"; // <-- your central source of truth

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className={styles.notFound}>
        <p>Product not found.</p>
      </div>
    );
  }

  return (
    <section className={styles.container}>
      {/* Back Button */}
      <button className={styles.backBtn} onClick={() => router.back()}>
        <ArrowLeft size={20} />
        Back
      </button>

      <div className={styles.wrapper}>
        {/* ==== LEFT: PRODUCT IMAGE ==== */}
        <div className={styles.imageBox}>
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className={styles.image}
            priority
          />

          <div className={styles.discountTag}>{product.discount}% OFF</div>
        </div>

        {/* ==== RIGHT: PRODUCT DETAILS ==== */}
        <div className={styles.infoBox}>
          <h1 className={styles.title}>{product.name}</h1>

          <div className={styles.pricing}>
            <span className={styles.oldPrice}>
              KES {product.originalPrice.toFixed(2)}
            </span>
            <span className={styles.price}>
              KES {product.currentPrice.toFixed(2)}
            </span>
          </div>

          <p className={styles.desc}>
            Premium quality product with excellent value. Carefully sourced to
            ensure the best results for your daily needs. Trusted by thousands
            of customers.
          </p>

          {/* ==== ACTION BUTTONS ==== */}
          <div className={styles.actions}>
            <button className={styles.wishlistBtn}>
              <Heart size={20} /> Add to Wishlist
            </button>

            <button className={styles.cartBtn}>
              <ShoppingCart size={20} /> Add to Cart
            </button>
          </div>

          {/* ==== EXTRA INFO ==== */}
          <div className={styles.meta}>
            <p><strong>Category:</strong> Everyday Essentials</p>
            <p><strong>Stock:</strong> In Stock</p>
            <p><strong>Delivery:</strong> 1–2 days</p>
          </div>
        </div>
      </div>
    </section>
  );
}
