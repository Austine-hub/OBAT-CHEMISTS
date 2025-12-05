// ============================================================
// src/app/category/beauty/page.tsx
// ============================================================

// 1️⃣ Tell Next.js this is a client component where hooks like useCart can be used
"use client";

import React, { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import styles from "./Beauty.module.css";

import { productsData, type Product } from "@/data/beautyData";
import { useCart } from "@/context/CartContext";

// ------------------------------------------------------------
// Utility function to format prices
const formatPrice = (price: number) => `KSh ${price.toLocaleString()}`;

// ------------------------------------------------------------
// Cart item type (matches CartContext structure)
interface OfferCartItem {
  id: string;               // <-- MUST be "id"
  name: string;
  price: number;
  image: string | any; // Accept StaticImageData
  quantity: number;
}

// ------------------------------------------------------------
// Offers Component (Client Component)
const Offers: React.FC<{ products: Product[] }> = memo(({ products }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    const cartItem: OfferCartItem = {
      id: product.id,        // <-- MUST be id
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    };

    addToCart(cartItem);
    toast.success(`${product.brand} ${product.name} added to cart 🛒`, {
      duration: 2000,
    });
  };

  return (
    <section className={styles.offersSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Top Beauty & Makeup Offers 🛍️</h2>
        <Link href="/offers" className={styles.viewAll}>
          View all offers →
        </Link>
      </div>

      <div className={styles.offersGrid}>
        {products.map((offer) => (
          <div key={offer.id} className={styles.card}>
            {offer.discount && offer.oldPrice && (
              <div className={styles.discountTag}>-{offer.discount}%</div>
            )}

            <Link href={`/product/${offer.slug}`} className={styles.productLink}>
              <div className={styles.imageWrapper}>
                <Image
                  src={offer.image}
                  alt={`${offer.brand} ${offer.name}`}
                  className={styles.productImage}
                  width={200}
                  height={200}
                  loading="lazy"
                />
              </div>
            </Link>

            <div className={styles.info}>
              <Link href={`/product/${offer.slug}`} className={styles.productLink}>
                <p className={styles.name}>
                  {offer.brand} - {offer.name}
                </p>
              </Link>
              <div className={styles.prices}>
                <span className={styles.newPrice}>{formatPrice(offer.price)}</span>
                {offer.oldPrice && (
                  <span className={styles.oldPrice}>{formatPrice(offer.oldPrice)}</span>
                )}
              </div>
            </div>

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

// ------------------------------------------------------------
// Page Component (Server Component — fetches data server-side)
const BeautyPage = () => {
  // Filter products server-side
  const skincareOffers = productsData
    .filter((p) => p.category !== "Mascara" && p.oldPrice)
    .slice(0, 8);

  return <Offers products={skincareOffers} />;
};

export default BeautyPage;
