//src/app/popular-products/[id]/page.tsx

"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";
import toast from "react-hot-toast";

import { useCart } from "@/context/CartContext";
import {
  products,
  getProductStatus,
  Product,
} from "@/data/details/popular";

import styles from "./DetailsPage.module.css";

/* -------------------------------------------------------------------------- */
/* Wishlist persistence                                                       */
/* -------------------------------------------------------------------------- */
const WISHLIST_KEY = "wishlist_v1";

const getWishlist = (): number[] => {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
  } catch {
    return [];
  }
};

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { addToCart } = useCart();

  const product = useMemo<Product | undefined>(
    () => products.find((p) => p.id === Number(id) && p.isActive),
    [id]
  );

  const relatedProducts = useMemo(
    () =>
      product
        ? products.filter(
            (p) =>
              p.category === product.category &&
              p.id !== product.id &&
              p.isActive
          )
        : [],
    [product]
  );

  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Product not found</h2>
        <button onClick={() => router.back()} className={styles.backBtn}>
          Go back
        </button>
      </div>
    );
  }

  const status = getProductStatus(product);
  const inStock = status === "in-stock" || status === "low-stock";

  const handleAddToCart = () => {
    addToCart({
      id: String(product.id),
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      stock: product.stock,
      inStock,
    });

    toast.success("Added to cart");
  };

  const toggleWishlist = () => {
    const updated = wishlist.includes(product.id)
      ? wishlist.filter((i) => i !== product.id)
      : [...wishlist, product.id];

    setWishlist(updated);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
  };

  return (
    <section className={styles.container}>
      {/* Back */}
      <button className={styles.backButton} onClick={() => router.back()}>
        <ArrowLeft size={16} /> Back
      </button>

      {/* Product */}
      <div className={styles.wrapper}>
        {/* Media */}
        <motion.div
          className={styles.media}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Image
            src={product.image}
            alt={product.name}
            width={520}
            height={520}
            priority
            className={styles.mainImage}
          />
        </motion.div>

        {/* Info */}
        <div className={styles.info}>
          <h1 className={styles.title}>{product.name}</h1>

          <div className={styles.ratingRow}>
            {product.rating && (
              <>
                <Star size={16} fill="currentColor" />
                <span>{product.rating}</span>
                <span className={styles.reviewCount}>
                  ({product.reviewsCount} reviews)
                </span>
              </>
            )}
          </div>

          <div className={styles.priceBlock}>
            <span className={styles.price}>KES {product.price}</span>
            {product.oldPrice && (
              <span className={styles.oldPrice}>
                KES {product.oldPrice}
              </span>
            )}
          </div>

          <p className={styles.stock}>
            {status === "in-stock" && "In stock"}
            {status === "low-stock" && "Low stock – selling fast"}
            {status === "out-of-stock" && "Out of stock"}
          </p>

          <p className={styles.shortDescription}>
            {product.shortDescription}
          </p>

          <div className={styles.actions}>
            <button
              className={styles.addToCart}
              onClick={handleAddToCart}
              disabled={!inStock}
            >
              <ShoppingCart size={18} />
              Add to cart
            </button>

            <button
              className={styles.wishlist}
              onClick={toggleWishlist}
              aria-pressed={wishlist.includes(product.id)}
            >
              <Heart
                size={18}
                fill={
                  wishlist.includes(product.id) ? "currentColor" : "none"
                }
              />
            </button>
          </div>

          {/* Details */}
          <div className={styles.detailsSection}>
            <h3>Product details</h3>
            <p>{product.description}</p>

            {product.features && (
              <>
                <h4>Key features</h4>
                <ul>
                  {product.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </>
            )}

            {product.usage && (
              <>
                <h4>How to use</h4>
                <p>{product.usage}</p>
              </>
            )}

            {product.warnings && (
              <>
                <h4>Warnings</h4>
                <p className={styles.warning}>{product.warnings}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Related */}
      {relatedProducts.length > 0 && (
        <section className={styles.related}>
          <h2>You may also like</h2>

          <div className={styles.relatedGrid}>
            {relatedProducts.slice(0, 4).map((item) => (
              <button
                key={item.id}
                className={styles.relatedCard}
                onClick={() =>
                  router.push(`/popular-products/${item.id}`)
                }
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={160}
                  height={160}
                />
                <span>{item.name}</span>
                <strong>KES {item.price}</strong>
              </button>
            ))}
          </div>
        </section>
      )}
    </section>
  );
};

export default ProductDetailsPage;
