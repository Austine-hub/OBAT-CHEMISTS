"use client";

import React from "react";
import { Heart, Eye } from "lucide-react";
import styles from "./PopularProducts.module.css";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: string;
}

const products: Product[] = [
  { id: 1, name: "Mylan HIV Self Test Kit 1s", price: 50.0, image: "/product1.jpg" },
  {
    id: 2,
    name: "Cosy Toilet Paper 8roll, Unwrap 10x 200 Sheets White",
    price: 200.0,
    oldPrice: 440.0,
    image: "/product2.jpg",
    badge: "40% off",
  },
  { id: 3, name: "Fay Everyday Baby Wet Wipes 72s + 12s Promo Bundle", price: 390.0, image: "/product3.jpg" },
  { id: 4, name: "Huggies Dry Comfort Jumbo Size 5 (12-22kg) 52s", price: 1695.0, image: "/product4.jpg" },
  { id: 5, name: "Fay Facial Decor Art Series 150s", price: 205.0, image: "/product5.jpg" },
  { id: 6, name: "Majeed Ultra Soft Value Pack 18s", price: 227.0, image: "/product6.jpg" },
  { id: 7, name: "Maths Facts Jumbo Size 5 X Large (15-20kg) 52s", price: 1799.0, image: "/product7.jpg" },
  { id: 8, name: "Dove Baby Lotion Rich Moisture 200ml", price: 785.0, image: "/product8.jpg" },
  { id: 9, name: "Ecrinal 9 Baby Junior Cream 450g", price: 1340.0, image: "/product9.jpg" },
  { id: 10, name: "Murasakit Granules 250g", price: 2750.0, image: "/product10.jpg" },
];

const PopularProducts: React.FC = () => {
  return (
    <section className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2>Popular Products</h2>
        <a href="/view-all" className={styles.viewAll}>
          View All
        </a>
      </div>

      {/* Product Grid */}
      <div className={styles.grid}>
        {products.map(({ id, name, price, oldPrice, image, badge }) => (
          <article key={id} className={styles.card}>
            {badge && <span className={styles.badge}>{badge}</span>}

            {/* Action Icons */}
            <div className={styles.actions}>
              <button aria-label="Add to wishlist" className={styles.iconBtn}>
                <Heart size={18} strokeWidth={2} />
              </button>
              <button aria-label="Quick view" className={styles.iconBtn}>
                <Eye size={18} strokeWidth={2} />
              </button>
            </div>

            {/* Image */}
            <div className={styles.imageWrapper}>
              <img src={image} alt={name} loading="lazy" decoding="async" />
            </div>

            {/* Content */}
            <div className={styles.info}>
              <h3>{name}</h3>

              <div className={styles.price}>
                <span className={styles.current}>KES {price.toFixed(2)}</span>

                {oldPrice && (
                  <span className={styles.old}>KES {oldPrice.toFixed(2)}</span>
                )}
              </div>

              <button className={styles.addBtn}>+ Add To Cart</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;
