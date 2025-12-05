"use client";

import { memo } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";

import { useCart } from "@/context/CartContext";
import { productsData, type Product } from "@/data/DermaData";

import styles from "./Skincare.module.css";

// ------------------------------------------------------------
// 🛒 Local Cart Item Type (aligned with CartContext)
// ------------------------------------------------------------
interface OfferCartItem {
  id: string;
  name: string;
  price: number;
  image: string; // Always string in cart
  quantity: number;
}

// ------------------------------------------------------------
// 💰 Utility Function: Currency Formatter (Controller Logic)
// ------------------------------------------------------------
const formatPrice = (priceInCents: number): string => {
  const priceInKsh = priceInCents / 100;
  return `KSh ${priceInKsh.toLocaleString("en-KE", {
    minimumFractionDigits: 0,
  })}`;
};

// ------------------------------------------------------------
// 🎯 Component: Offers (View + Controller)
// ------------------------------------------------------------
const Offers: React.FC = memo(() => {
  const { addToCart } = useCart();

  // 🧠 Controller Logic — Add to Cart
  const handleAddToCart = (product: Product) => {
    const cartItem: OfferCartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image:
        typeof product.image === "string"
          ? product.image
          : (product.image as StaticImageData).src, // Convert StaticImageData to string
      quantity: 1,
    };

    addToCart(cartItem);
    toast.success(`${product.brand} ${product.name} added to cart 🛒`, {
      duration: 2000,
    });
  };

  // ----------------------------------------------------------
  // 🎨 View Layer
  // ----------------------------------------------------------
  return (
    <section className={styles.offersSection}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Top Skincare Offers 🛍️</h2>
        <Link href="/buy-skincare" className={styles.viewAll}>
          View all offers →
        </Link>
      </div>

      {/* Offers Grid */}
      <div className={styles.offersGrid}>
        {productsData.map((offer) => (
          <div key={offer.id} className={styles.card}>
            {/* Discount Badge */}
            {offer.discount && offer.oldPrice && (
              <div className={styles.discountTag}>-{offer.discount}%</div>
            )}

            {/* Product Image */}
            <Link href={`/skin/${offer.id}`} className={styles.productLink}>
              <div className={styles.imageWrapper}>
                {typeof offer.image === "string" ? (
                  <img
                    src={offer.image}
                    alt={`${offer.brand} ${offer.name}`}
                    className={styles.productImage}
                    loading="lazy"
                  />
                ) : (
                  <Image
                    src={offer.image}
                    alt={`${offer.brand} ${offer.name}`}
                    className={styles.productImage}
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                )}
              </div>
            </Link>

            {/* Product Info */}
            <div className={styles.info}>
              <Link href={`/skin/${offer.id}`} className={styles.productLink}>
                <p className={styles.name}>
                  {offer.brand} - {offer.name}
                </p>
              </Link>
              <div className={styles.prices}>
                <span className={styles.newPrice}>{formatPrice(offer.price)}</span>
                {offer.oldPrice && (
                  <span className={styles.oldPrice}>
                    {formatPrice(offer.oldPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className={styles.actions}>
              <button
                className={styles.addToCart}
                onClick={() => handleAddToCart(offer)}
                disabled={!offer.inStock}
              >
                <ShoppingCart size={18} strokeWidth={1.8} />
                <span>{offer.inStock ? "Add to Cart" : "Out of Stock"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default Offers;
