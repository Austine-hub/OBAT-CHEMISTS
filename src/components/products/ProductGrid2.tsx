//src/components/products/ProductGrid2.tsx

"use client";

import {
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Star,
  Minus,
  Plus,
  Share2,
  Check,
} from "lucide-react";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import {
  getProductById,
  getRelatedProducts,
  formatPrice,
  parseId,
  type Product,
} from "@/data/details/products";

import styles from "./ProductGrid2.module.css";

/* -------------------------------------------------------------------------- */
/* Star Rating                                                                 */
/* -------------------------------------------------------------------------- */

function StarRating({
  rating,
  count,
}: {
  rating: number;
  count: number;
}) {
  const filled = Math.round(rating);

  return (
    <div
      className={styles.ratingRow}
      aria-label={`Rated ${rating} out of 5`}
    >
      <div className={styles.stars}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={styles.star}
            fill={i < filled ? "var(--accent-gold)" : "none"}
            aria-hidden
          />
        ))}
      </div>
      <span className={styles.reviewCount}>
        {rating} ({count})
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id?: string }>();

  const productId = useMemo(
    () => parseId(params?.id ?? null),
    [params?.id]
  );

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlist();

  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [added, setAdded] = useState(false);

  /* ---------------- Hydration guard ---------------- */

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ---------------- Load product ---------------- */

  useEffect(() => {
    if (!productId) return;
    const found = getProductById(productId);
    if (found) setProduct(found);
  }, [productId]);

  /* ---------------- Derived ---------------- */

  const productIdStr = useMemo(
    () => (product ? String(product.id) : null),
    [product]
  );

  const relatedProducts = useMemo(
    () => (product ? getRelatedProducts(product) : []),
    [product]
  );

  const inWishlist = useMemo(() => {
    if (!mounted || !productIdStr) return false;
    return isInWishlist(productIdStr);
  }, [mounted, productIdStr, isInWishlist]);

  const isOutOfStock = product?.inStock === false;

  /* ---------------- Handlers ---------------- */

  const handleAddToCart = useCallback(() => {
    if (!product || isOutOfStock || added) return;

    addToCart({
      ...product,
      id: String(product.id),
      quantity: qty,
    });

    setAdded(true);

    toast.success(
      "Item successfully added to your cart.",
      {
        icon: "✔",
        style: {
          background: "#0f172a",
          color: "#fff",
        },
      }
    );
  }, [product, qty, isOutOfStock, added, addToCart]);

  const toggleWishlist = useCallback(() => {
    if (!product || !productIdStr) return;

    if (inWishlist) {
      removeFromWishlist(productIdStr);
      toast("Removed from saved items.");
    } else {
      addToWishlist({
        id: productIdStr,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      });

      toast.success("Saved for later reference.");
    }
  }, [
    product,
    productIdStr,
    inWishlist,
    addToWishlist,
    removeFromWishlist,
  ]);

  /* ---------------- Loading ---------------- */

  if (!product) {
    return (
      <div className={styles.loader}>
        <motion.div
          className={styles.spinner}
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
        />
      </div>
    );
  }

  /* ---------------- Render ---------------- */

  return (
    <main className={styles.container}>
      {/* Top bar */}
      <header className={styles.nav}>
        <button
          onClick={() => router.back()}
          className={styles.iconBtn}
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <button
          className={styles.iconBtn}
          onClick={() =>
            toast.success("Product link copied.")
          }
        >
          <Share2 size={18} />
        </button>
      </header>

      {/* Main */}
      <section className={styles.grid}>
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={styles.imageWrap}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.image}
            style={{ objectFit: "contain" }}
          />
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className={styles.info}
        >
          <span className={styles.category}>
            {product.category}
          </span>
          <h1>{product.name}</h1>

          <StarRating
            rating={product.rating}
            count={product.reviewCount}
          />

          <div className={styles.priceRow}>
            <span className={styles.price}>
              {formatPrice(product.price)}
            </span>
            {isOutOfStock && (
              <span className={styles.stock}>
                Out of stock
              </span>
            )}
          </div>

          <p className={styles.desc}>
            {product.description}
          </p>

          {/* Quantity */}
          <div className={styles.qtyRow}>
            <button
              onClick={() =>
                setQty((q) => Math.max(1, q - 1))
              }
            >
              <Minus size={16} />
            </button>
            <span>{qty}</span>
            <button
              onClick={() =>
                setQty((q) => q + 1)
              }
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock || added}
              className={styles.cartBtn}
            >
              {added ? (
                <>
                  <Check size={20} />
                  Added
                </>
              ) : (
                <>
                  <ShoppingCart size={20} />
                  Add to cart
                </>
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={toggleWishlist}
              className={`${styles.wishBtn} ${
                mounted && inWishlist
                  ? styles.active
                  : ""
              }`}
              aria-label="Save item"
            >
              <Heart
                size={22}
                fill={
                  mounted && inWishlist
                    ? "var(--accent-red)"
                    : "none"
                }
              />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Related */}
      <section className={styles.related}>
        <h2>You may also like</h2>

        <div className={styles.relatedGrid}>
          <AnimatePresence>
            {relatedProducts.map((item) => (
              <motion.article
                key={String(item.id)}
                whileHover={{ y: -4 }}
                className={styles.card}
                onClick={() =>
                  router.push(
                    `/products2/${item.id}`
                  )
                }
              >
                <div className={styles.cardImage}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="200px"
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className={styles.cardInfo}>
                  <h4>{item.name}</h4>
                  <span>
                    {formatPrice(item.price)}
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
