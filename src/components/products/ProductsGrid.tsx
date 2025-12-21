//src/components/products/ProductsGrid.tsx

"use client";

import { memo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Eye, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { useCart } from "@/context/CartContext";
import { products, type Product } from "@/data/details/ProductGrid";
import styles from "./ProductGrid.module.css";

/* -------------------------------------------------------------------------- */
/* Product Card                                                               */
/* -------------------------------------------------------------------------- */

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = memo(({ product, onAddToCart }: ProductCardProps) => {
  const handleAdd = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onAddToCart(product);
    },
    [onAddToCart, product]
  );

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <motion.article
      className={styles.card}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {product.discount && (
        <span className={styles.badge}>{product.discount}% OFF</span>
      )}

      {/* Quick actions */}
      <div className={styles.actions}>
        <button className={styles.iconBtn} onClick={stop} aria-label="Wishlist">
          <Heart size={16} />
        </button>

        <Link
          href={`/products/${product.id}`}
          className={styles.iconBtn}
          aria-label="View product"
          onClick={stop}
        >
          <Eye size={16} />
        </Link>

        <button
          className={styles.iconBtn}
          onClick={handleAdd}
          aria-label="Quick add to cart"
        >
          <ShoppingCart size={16} />
        </button>
      </div>

      {/* Image */}
      <div className={styles.imageWrapper}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={styles.image}
          sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 25vw"
        />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>

        <div className={styles.pricing}>
          {product.originalPrice && (
            <span className={styles.oldPrice}>
              KES {product.originalPrice.toLocaleString()}
            </span>
          )}
          <span className={styles.price}>
            KES {product.currentPrice.toLocaleString()}
          </span>
        </div>

        <div className={styles.ctaRow}>
          <Link
            href={`/products/${product.id}`}
            className={styles.viewBtn}
            onClick={stop}
          >
            View
          </Link>

          <button className={styles.addToCart} onClick={handleAdd}>
            Add to Cart
          </button>
        </div>
      </div>
    </motion.article>
  );
});

ProductCard.displayName = "ProductCard";

/* -------------------------------------------------------------------------- */
/* Grid                                                                       */
/* -------------------------------------------------------------------------- */

export default function ProductGrid() {
  const { addToCart } = useCart();

  const handleAddToCart = useCallback(
    (product: Product) => {
      addToCart({
        id: String(product.id),
        name: product.name,
        price: product.currentPrice,
        quantity: 1,
        image: product.image,
        originalPrice: product.originalPrice,
        badge: product.discount ? `${product.discount}% OFF` : undefined,
      });

      toast.success(`${product.name} added to cart`, {
        icon: "🛒",
      });
    },
    [addToCart]
  );

  return (
    <section className={styles.section} aria-labelledby="products-title">
      <header className={styles.header}>
        <h2 id="products-title" className={styles.title}>
          The Pink Rush
        </h2>

        <Link href="/products" className={styles.viewAll}>
          View All <ArrowRight size={18} />
        </Link>
      </header>

      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
