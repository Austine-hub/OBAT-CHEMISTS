//src/components/products/ProductsGrid.tsx

"use client";

import { memo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Eye, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { useCart } from "@/context/CartContext";
import {
  products,
  type Product,
  formatCurrency,
  getDiscountPercent,
  isInStock,
} from "@/data/details/ProductGrid";

import styles from "./ProductGrid.module.css";

/* -------------------------------------------------------------------------- */
/* Product Card                                                               */
/* -------------------------------------------------------------------------- */

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = memo(function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  // HARD GUARD — prevents runtime crashes forever
  if (!product || typeof product.price !== "number") {
    return null;
  }

  const discount = getDiscountPercent(product);
  const inStock = isInStock(product);

  const handleAdd = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!inStock) {
        toast.error("Out of stock");
        return;
      }
      onAddToCart(product);
    },
    [onAddToCart, product, inStock]
  );

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <motion.article
      className={styles.card}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      aria-disabled={!inStock}
    >
      {discount > 0 && (
        <span className={styles.badge}>{discount}% OFF</span>
      )}

      {/* Quick actions */}
      <div className={styles.actions}>
        <button
          className={styles.iconBtn}
          onClick={stop}
          aria-label="Add to wishlist"
        >
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
          disabled={!inStock}
        >
          <ShoppingCart size={16} />
        </button>
      </div>

      {/* Image */}
      <Link
        href={`/products/${product.id}`}
        className={styles.imageWrapper}
        onClick={stop}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={styles.image}
          sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 25vw"
        />
      </Link>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>

        <div className={styles.pricing}>
          {product.oldPrice && (
            <span className={styles.oldPrice}>
              {formatCurrency(product.oldPrice, product.currency)}
            </span>
          )}

          <span className={styles.price}>
            {formatCurrency(product.price, product.currency)}
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

          <button
            className={styles.addToCart}
            onClick={handleAdd}
            disabled={!inStock}
          >
            {inStock ? "Add to cart" : "Out of stock"}
          </button>
        </div>
      </div>
    </motion.article>
  );
});

/* -------------------------------------------------------------------------- */
/* Grid                                                                       */
/* -------------------------------------------------------------------------- */

export default function ProductsGrid() {
  const { addToCart } = useCart();

  const handleAddToCart = useCallback(
    (product: Product) => {
      addToCart({
        id: String(product.id),
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        category: product.category,
        stock: product.stock,
        inStock: product.stock > 0,
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
          Popular Products
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
