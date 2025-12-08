"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Heart, ShoppingCart, ArrowLeft } from "lucide-react";

import styles from "./DetailsPage.module.css";

// ===== MODEL (Central Data Source) =====
import { products } from "@/data/details/popular";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Product Not Found</h2>
        <button onClick={() => router.back()} className={styles.backBtn}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <section className={styles.container}>
      {/* Back Navigation */}
      <button className={styles.backButton} onClick={() => router.back()}>
        <ArrowLeft size={20} /> Back
      </button>

      <div className={styles.wrapper}>
        {/* =====================================================================================
            LEFT: IMAGE GALLERY (Modern Amazon/Jumia Style)
        ===================================================================================== */}
        <div className={styles.left}>
          <div className={styles.imageBox}>
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              className={styles.mainImage}
              priority
            />
          </div>

          {/* Thumbnail gallery */}
          <div className={styles.thumbnailRow}>
            {[product.image, product.image, product.image].map((img, index) => (
              <button key={index} className={styles.thumbnailItem}>
                <Image
                  src={img}
                  alt={`Preview ${index}`}
                  width={80}
                  height={80}
                />
              </button>
            ))}
          </div>
        </div>

        {/* =====================================================================================
            RIGHT: PRODUCT DETAILS
        ===================================================================================== */}
        <div className={styles.right}>
          <h1 className={styles.title}>{product.name}</h1>

          {/* Pricing */}
          <div className={styles.priceBlock}>
            <span className={styles.currentPrice}>KES {product.price}</span>
            {product.oldPrice && (
              <span className={styles.oldPrice}>KES {product.oldPrice}</span>
            )}
          </div>

          {/* Stock • SKU • Category */}
          <div className={styles.meta}>
            <p><strong>Availability:</strong> In Stock</p>
            <p><strong>SKU:</strong> PROD-{product.id}</p>
            <p><strong>Category:</strong> Popular Products</p>
          </div>

          {/* Short Description */}
          <p className={styles.description}>
            High-quality product sourced from trusted suppliers. Designed for
            reliability and everyday use. Loved by thousands of customers across
            major ecommerce platforms.
          </p>

          {/* Buttons */}
          <div className={styles.actionRow}>
            <button className={styles.addToCart}>
              <ShoppingCart size={18} /> Add to Cart
            </button>

            <button className={styles.wishlistBtn}>
              <Heart size={18} /> Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================================
          RECOMMENDED PRODUCTS SECTION
      ===================================================================================== */}
      <section className={styles.recommended}>
        <h2>You May Also Like</h2>

        <div className={styles.recommendGrid}>
          {products.slice(0, 4).map((item) => (
            <article
              key={item.id}
              className={styles.recommendCard}
              onClick={() => router.push(`/popular-products/${item.id}`)}
            >
              <Image
                src={item.image}
                alt={item.name}
                width={180}
                height={180}
                className={styles.recommendImage}
              />
              <p className={styles.recommendName}>{item.name}</p>
              <p className={styles.recommendPrice}>KES {item.price}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
};

export default ProductDetailsPage;
