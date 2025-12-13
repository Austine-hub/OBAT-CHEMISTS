//src/app/dropups/sexual/[slug]/page.tsx

"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import SexualData, {
  type Product,
  getProductBySlug,
  getSimilarProducts,
  formatPrice,
  normalizeSlug,
} from "@/data/details/sexualData";

import styles from "./SexualDetails.module.css";

// ----------------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------------
type Tab = "features" | "description" | "usage";

// ----------------------------------------------------------------------------
// Page Component
// ----------------------------------------------------------------------------
export default function SexualDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  // --------------------------------------------------------------------------
  // Data Fetching (Model)
  // --------------------------------------------------------------------------
  const product = useMemo<Product | undefined>(
    () => getProductBySlug(slug),
    [slug]
  );

  const inStock = (product?.stock ?? 0) > 0;

  // --------------------------------------------------------------------------
  // UI State
  // --------------------------------------------------------------------------
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<Tab>("features");
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  // --------------------------------------------------------------------------
  // Effects
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (!product) {
      router.replace("/404");
    }
  }, [product, router]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setQuantity(1);
    setActiveTab("features");
    setImageLoaded(false);
  }, [slug]);

  // --------------------------------------------------------------------------
  // Similar Products
  // --------------------------------------------------------------------------
  const similarProducts = useMemo(
    () => (product ? getSimilarProducts(product.id, 4) : []),
    [product]
  );

  // --------------------------------------------------------------------------
  // Handlers
  // --------------------------------------------------------------------------
  const updateQuantity = useCallback((value: number) => {
    setQuantity(Math.max(1, Math.min(99, value)));
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!product || !inStock || isAdding) return;

    setIsAdding(true);
    setTimeout(() => {
      console.log(`Added ${quantity} × ${product.name} to cart`);
      setIsAdding(false);
    }, 800);
  }, [product, inStock, isAdding, quantity]);

  // --------------------------------------------------------------------------
  // Loading Skeleton
  // --------------------------------------------------------------------------
  if (!product) {
    return (
      <div className={styles.container}>
        <div className={styles.skeleton}>
          <div className={styles.skeletonImage} />
          <div className={styles.skeletonContent}>
            <div className={styles.skeletonTitle} />
            <div className={styles.skeletonText} />
            <div className={styles.skeletonText} />
            <div className={styles.skeletonButton} />
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Tab Content (NO JSX namespace usage)
  // --------------------------------------------------------------------------
  const tabContent: Record<Tab, ReactNode> = {
    features: (
      <ul className={styles.featuresList}>
        {(product.features ?? []).map((item, index) => (
          <li key={index}>{item}</li>
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
          <strong>How to Use:</strong>{" "}
          {product.howToUse ?? "Use strictly as directed by a healthcare professional."}
        </p>
        <p className={styles.warning}>
          ⚠️ Always seek medical advice before use.
        </p>
      </div>
    ),
  };

  // --------------------------------------------------------------------------
  // Render
  // --------------------------------------------------------------------------
  return (
    <section className={styles.container}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/" className={styles.breadcrumbLink}>Home</Link>
        <span>/</span>
        <Link href="/system/reproductive" className={styles.breadcrumbLink}>
          Reproductive System
        </Link>
        <span>/</span>
        <span className={styles.breadcrumbCurrent}>{product.name}</span>
      </nav>

      {/* Product Details */}
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
            className={`${styles.productImage} ${imageLoaded ? styles.imageLoaded : ""}`}
            onLoad={() => setImageLoaded(true)}
          />
          {!inStock && <span className={styles.outOfStockBadge}>Out of Stock</span>}
        </div>

        {/* Info */}
        <div className={styles.infoWrapper}>
          <span className={styles.category}>{product.category}</span>
          <h1 className={styles.title}>{product.name}</h1>

          <div className={styles.priceSection}>
            <span className={styles.price}>{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className={styles.oldPrice}>
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          {/* Tabs */}
          <div className={styles.tabsContainer}>
            <div className={styles.tabButtons}>
              {(["features", "description", "usage"] as const).map((key) => (
                <button
                  key={key}
                  className={`${styles.tabButton} ${activeTab === key ? styles.activeTab : ""}`}
                  onClick={() => setActiveTab(key)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>
            <div className={styles.tabContent}>
              {tabContent[activeTab]}
            </div>
          </div>

          {/* Quantity + Cart */}
          <div className={styles.actionsSection}>
            <div className={styles.quantityControl}>
              <button onClick={() => updateQuantity(quantity - 1)} disabled={quantity <= 1}>
                −
              </button>
              <input
                type="number"
                value={quantity}
                min={1}
                max={99}
                onChange={(e) => updateQuantity(Number(e.target.value))}
              />
              <button onClick={() => updateQuantity(quantity + 1)} disabled={quantity >= 99}>
                +
              </button>
            </div>

            <button
              className={styles.addToCartBtn}
              onClick={handleAddToCart}
              disabled={!inStock || isAdding}
            >
              {isAdding ? "Adding..." : inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </article>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <section className={styles.similarSection}>
          <h2>You May Also Like</h2>
          <div className={styles.similarGrid}>
            {similarProducts.map((item) => (
              <Link
                key={item.slug}
                href={`/dropups/sexual/${normalizeSlug(item.slug)}`}
                className={styles.similarCard}
              >
                <Image src={item.image} alt={item.name} width={200} height={200} />
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
