"use client";

import { memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Share2, ShoppingCart } from "lucide-react";

// Model imports
import { type Product, formatCurrency } from "../data/productData";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onShare: (id: number) => void;
  onAddToCart: (id: number) => void;
  onProductClick: (id: number) => void;
  styles: Record<string, string>;
}

const ProductCard: React.FC<ProductCardProps> = memo(
  ({
    product,
    isFavorite,
    onToggleFavorite,
    onShare,
    onAddToCart,
    onProductClick,
    styles,
  }) => {
    const { id, name, description, image, brand, price } = product;

    const handleCardAccess = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onProductClick(id);
      }
    };

    return (
      <motion.article
        className={styles.productCard}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {/* IMAGE + ICONS */}
        <div
          className={styles.imageContainer}
          onClick={() => onProductClick(id)}
          role="button"
          tabIndex={0}
          onKeyDown={handleCardAccess}
        >
          <Image
            src={image}
            alt={name}
            width={500}
            height={500}
            priority={false}
            className={styles.productImage}
          />

          <div className={styles.cardActions}>
            {/* FAVORITE */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(id);
              }}
              aria-label="Toggle favorite"
            >
              <Heart
                size={18}
                fill={isFavorite ? "#ff4757" : "none"}
                color={isFavorite ? "#ff4757" : "#666"}
              />
            </button>

            {/* SHARE */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onShare(id);
              }}
              aria-label="Share product"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* INFO + CART */}
        <div className={styles.productInfo}>
          <h3 className={styles.productName}>{name}</h3>
          <p className={styles.productDesc}>{description}</p>
          <span className={styles.brandName}>{brand}</span>

          <p className={styles.price}>{formatCurrency(price)}</p>

          <motion.button
            type="button"
            className={styles.addButton}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onAddToCart(id)}
          >
            <ShoppingCart size={16} /> Add to Cart
          </motion.button>
        </div>
      </motion.article>
    );
  }
);

ProductCard.displayName = "ProductCard";

export default ProductCard;
