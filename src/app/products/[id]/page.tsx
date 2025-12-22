//src/app/products/[id]/page.tsx

"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, ShoppingCart, Star } from "lucide-react";
import toast from "react-hot-toast";

import styles from "./details.module.css";

import {
  products,
  Product,
  getProductById,
  getProductsByCategory,
} from "@/data/details/ProductGrid";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

type TabKey = "description" | "features" | "reviews";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const product = useMemo(
    () => getProductById(Number(id)),
    [id]
  );

  const related = useMemo(() => {
    if (!product) return [];
    return getProductsByCategory(product.category)
      .filter((p) => p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  const { addToCart } = useCart();
  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const [activeTab, setActiveTab] = useState<TabKey>("description");
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return <section className={styles.skeleton} aria-busy="true" />;
  }

  const inStock = product.stock > 0;
  const images = product.gallery?.length
    ? product.gallery
    : [product.image];

  /* ------------------------------------------------------------------ */
  /* Handlers                                                           */
  /* ------------------------------------------------------------------ */
  const handleAddToCart = () => {
    if (!inStock) {
      toast.error("Out of stock");
      return;
    }

    addToCart({
      id: String(product.id),
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      category: product.category,
      stock: product.stock,
      inStock: true,
    });

    toast.success("Added to cart 🛒");
  };

  const toggleWishlist = () => {
    const pid = String(product.id);
    if (isInWishlist(pid)) {
      removeFromWishlist(pid);
      toast("Removed from wishlist");
    } else {
      addToWishlist({
        id: pid,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      });
      toast.success("Added to wishlist ❤️");
    }
  };

  /* ------------------------------------------------------------------ */
  /* SEO JSON-LD                                                        */
  /* ------------------------------------------------------------------ */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: images,
    description: product.description,
    sku: product.id,
    offers: {
      "@type": "Offer",
      priceCurrency: product.currency,
      price: product.price,
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    aggregateRating: product.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviewsCount ?? 0,
        }
      : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className={styles.container}>
        <button className={styles.backBtn} onClick={() => router.back()}>
          <ArrowLeft size={16} /> Back
        </button>

        <div className={styles.layout}>
          {/* ------------------------------------------------------------- */}
          {/* Gallery                                                      */}
          {/* ------------------------------------------------------------- */}
          <div className={styles.gallery}>
            <motion.div
              key={images[activeImage]}
              className={styles.mainImage}
              whileHover={{ scale: 1.08 }}
            >
              <Image
                src={images[activeImage]}
                alt={product.name}
                fill
                priority
              />
            </motion.div>

            <div className={styles.thumbs}>
              {images.map((img, i) => (
                <button
                  key={img}
                  className={
                    i === activeImage
                      ? styles.thumbActive
                      : styles.thumb
                  }
                  onClick={() => setActiveImage(i)}
                >
                  <Image src={img} alt="" fill />
                </button>
              ))}
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* Info                                                         */}
          {/* ------------------------------------------------------------- */}
          <div className={styles.info}>
            <h1>{product.name}</h1>

            <div className={styles.rating}>
              {product.rating && (
                <>
                  <Star size={16} />
                  <span>{product.rating}</span>
                  <span className={styles.reviews}>
                    ({product.reviewsCount})
                  </span>
                </>
              )}
            </div>

            <div className={styles.price}>
              {product.oldPrice && (
                <span className={styles.old}>
                  {product.currency} {product.oldPrice}
                </span>
              )}
              <strong>
                {product.currency} {product.price}
              </strong>
            </div>

            <div className={styles.actions}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                disabled={!inStock}
                className={styles.cartBtn}
              >
                <ShoppingCart size={18} />
                {inStock ? "Add to cart" : "Out of stock"}
              </motion.button>

              <button
                className={styles.wishlistBtn}
                onClick={toggleWishlist}
                aria-pressed={isInWishlist(String(product.id))}
              >
                <Heart
                  size={18}
                  fill={
                    isInWishlist(String(product.id))
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>
            </div>

            {/* Tabs */}
            <div className={styles.tabs}>
              {(["description", "features", "reviews"] as TabKey[]).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={
                      activeTab === tab
                        ? styles.tabActive
                        : styles.tab
                    }
                  >
                    {tab}
                  </button>
                )
              )}
            </div>

            <div className={styles.tabPanel}>
              {activeTab === "description" && (
                <p>{product.description}</p>
              )}

              {activeTab === "features" && (
                <ul>
                  {product.features?.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              )}

              {activeTab === "reviews" && (
                <p>No reviews yet. ⭐ Be the first!</p>
              )}
            </div>
          </div>
        </div>

        {/* --------------------------------------------------------------- */}
        {/* Related                                                        */}
        {/* --------------------------------------------------------------- */}
        {related.length > 0 && (
          <section className={styles.related}>
            <h2>Related products</h2>
            <div className={styles.relatedGrid}>
              {related.map((p) => (
                <div key={p.id} className={styles.relatedCard}>
                  <Image src={p.image} alt={p.name} fill />
                  <span>{p.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </section>
    </>
  );
}
