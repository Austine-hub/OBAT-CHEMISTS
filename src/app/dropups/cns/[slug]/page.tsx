// src/app/dropups/cns/[slug]/page.tsx

"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import cnsData, { type cnsProduct } from "@/data/nervousData";
import styles from "./CnsDetails.module.css";

/* -------------------------------------------------------------------------- */
/*                              CONTROLLER (SSOT)                             */
/* -------------------------------------------------------------------------- */

const {
  getProductBySlug,
  getSimilarProducts,
  formatPrice,
  getStockStatus,
} = cnsData;

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type TabKey = "features" | "description" | "usage";

/* -------------------------------------------------------------------------- */
/*                                   PAGE                                     */
/* -------------------------------------------------------------------------- */

export default function CnsDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  /* ------------------------------------------------------------------------ */
  /*                                  MODEL                                   */
  /* ------------------------------------------------------------------------ */

  const product: cnsProduct | undefined = useMemo(
    () => getProductBySlug(slug),
    [slug]
  );

  /* ------------------------------------------------------------------------ */
  /*                                 UI STATE                                 */
  /* ------------------------------------------------------------------------ */

  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<TabKey>("features");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const inStock = product?.stock === "In Stock";

  /* ------------------------------------------------------------------------ */
  /*                              ROUTE GUARD                                 */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (!product) router.replace("/404");
  }, [product, router]);

  /* ------------------------------------------------------------------------ */
  /*                          RESET ON SLUG CHANGE                             */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setQuantity(1);
    setActiveTab("features");
    setImageLoaded(false);
  }, [slug]);

  /* ------------------------------------------------------------------------ */
  /*                             SIMILAR PRODUCTS                              */
  /* ------------------------------------------------------------------------ */

  const similarProducts = useMemo(() => {
    if (!product) return [];
    return getSimilarProducts(product.id, 4);
  }, [product]);

  /* ------------------------------------------------------------------------ */
  /*                              EVENT HANDLERS                               */
  /* ------------------------------------------------------------------------ */

  const updateQuantity = useCallback((value: number) => {
    setQuantity(Math.max(1, Math.min(99, value)));
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!product || !inStock || isAdding) return;

    setIsAdding(true);
    setTimeout(() => {
      console.log(`Added ${quantity} × ${product.name}`);
      setIsAdding(false);
    }, 600);
  }, [product, quantity, inStock, isAdding]);

  /* ------------------------------------------------------------------------ */
  /*                               SKELETON                                    */
  /* ------------------------------------------------------------------------ */

  if (!product) {
    return (
      <section className={styles.container}>
        <div className={styles.skeleton}>
          <div className={styles.skeletonImage} />
          <div className={styles.skeletonContent}>
            <div className={styles.skeletonTitle} />
            <div className={styles.skeletonText} />
            <div className={styles.skeletonButton} />
          </div>
        </div>
      </section>
    );
  }

  /* ------------------------------------------------------------------------ */
  /*                               TAB CONTENT                                 */
  /* ------------------------------------------------------------------------ */

  const tabContent: Record<TabKey, React.ReactNode> = {

    features: (
      <ul className={styles.featuresList}>
        {(product.features ?? [
          "Clinically validated use",
          "Guideline-aligned therapy",
          "Standard pharmaceutical manufacturing",
        ]).map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    ),

    description: (
      <div className={styles.description}>
        <p>{product.fullDescription ?? product.description}</p>
      </div>
    ),

    usage: (
      <div className={styles.usage}>
        <p>
          <strong>Indications:</strong>
        </p>
        <ul>
          {product.indications.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <p className={styles.warning}>
          ⚠️ Use strictly as prescribed by a qualified healthcare professional.
        </p>
      </div>
    ),
  };

  /* ------------------------------------------------------------------------ */
  /*                                   VIEW                                    */
  /* ------------------------------------------------------------------------ */

  return (
    <section className={styles.container}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/system/cns">CNS System</Link>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      {/* Details */}
      <article className={styles.detailsSection}>
        {/* Image */}
        <div className={styles.imageWrapper}>
          {!imageLoaded && <div className={styles.imagePlaceholder} />}
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            priority
            onLoad={() => setImageLoaded(true)}
            className={styles.productImage}
          />
          {!inStock && (
            <div className={styles.outOfStockBadge}>Out of Stock</div>
          )}
        </div>

        {/* Info */}
        <div className={styles.infoWrapper}>
          <span className={styles.category}>{product.category}</span>
          <h1 className={styles.title}>{product.name}</h1>

          <div className={styles.priceSection}>
            <span className={styles.price}>
              {formatPrice(product.price)}
            </span>
            <span className={styles.stockBadge}>
              {getStockStatus(product)}
            </span>
          </div>

          {/* Tabs */}
          <div className={styles.tabsContainer}>
            <div className={styles.tabButtons}>
              {(Object.keys(tabContent) as TabKey[]).map((key) => (
                <button
                  key={key}
                  className={activeTab === key ? styles.activeTab : ""}
                  onClick={() => setActiveTab(key)}
                >
                  {key.toUpperCase()}
                </button>
              ))}
            </div>
            <div className={styles.tabContent}>
              {tabContent[activeTab]}
            </div>
          </div>

          {/* Actions */}
          <div className={styles.actionsSection}>
            <div className={styles.quantityControl}>
              <button onClick={() => updateQuantity(quantity - 1)} disabled={!inStock}>
                −
              </button>
              <input value={quantity} readOnly />
              <button onClick={() => updateQuantity(quantity + 1)} disabled={!inStock}>
                +
              </button>
            </div>

            <button
              className={styles.addToCartBtn}
              disabled={!inStock || isAdding}
              onClick={handleAddToCart}
            >
              {isAdding ? "Adding…" : inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </article>

      {/* Similar */}
      {similarProducts.length > 0 && (
        <section className={styles.similarSection}>
          <h2>You May Also Like</h2>
          <div className={styles.similarGrid}>
            {similarProducts.map((item) => (
              <Link
                key={item.slug}
                href={`/dropups/cns/${item.slug}`}
                className={styles.similarCard}
              >
                <Image src={item.image} alt={item.name} width={220} height={220} />
                <h3>{item.name}</h3>
                <p>{formatPrice(item.price)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
