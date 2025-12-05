"use client";

import React, { memo } from "react";
import Image from "next/image";
import styles from "../Shop.module.css";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  stock: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Cartil Omega 30’s",
    image: "/images/cartil-omega.jpg",
    price: 2395,
    category: "Joint Supplements",
    stock: "In Stock",
  },
  {
    id: 2,
    name: "Cartil Collagen Caps 30’s",
    image: "/images/cartil-collagen.jpg",
    price: 2747,
    category: "Joint Supplements",
    stock: "In Stock",
  },
  {
    id: 3,
    name: "Cartimove-D Tabs 30’s",
    image: "/images/cartimove-d.jpg",
    price: 1714,
    category: "Joint Supplements",
    stock: "In Stock",
  },
  {
    id: 4,
    name: "Cartimove Tabs 30’s",
    image: "/images/cartimove.jpg",
    price: 1420,
    category: "Joint Supplements",
    stock: "In Stock",
  },
  {
    id: 5,
    name: "Cartimove Tabs 30’s",
    image: "/images/cartimove.jpg",
    price: 1420,
    category: "Joint Supplements",
    stock: "In Stock",
  },
  {
    id: 6,
    name: "Cartimove Tabs 30’s",
    image: "/images/cartimove.jpg",
    price: 1420,
    category: "Joint Supplements",
    stock: "In Stock",
  },
  {
    id: 7,
    name: "Cartimove Tabs 30’s",
    image: "/images/cartimove.jpg",
    price: 1420,
    category: "Joint Supplements",
    stock: "In Stock",
  },
  {
    id: 8,
    name: "Cartimove Tabs 30’s",
    image: "/images/cartimove.jpg",
    price: 1420,
    category: "Joint Supplements",
    stock: "In Stock",
  },
  {
    id: 9,
    name: "Cartimove Tabs 30’s",
    image: "/images/cartimove.jpg",
    price: 1420,
    category: "Joint Supplements",
    stock: "In Stock",
  },
  {
    id: 10,
    name: "Cartimove Tabs 30’s",
    image: "/images/cartimove.jpg",
    price: 1420,
    category: "Joint Supplements",
    stock: "In Stock",
  },
];

const GUT: React.FC = () => {
  return (
    <section className={styles.shopSection} aria-labelledby="joint-supplements-title">
      <div className={styles.header}>
        <h2 id="joint-supplements-title">Shop</h2>
        <div className={styles.subCategory}>
          <label>Subcategory:</label>
          <span>Joint Supplements</span>
        </div>
      </div>

      <div className={styles.grid} role="list">
        {products.map((product) => (
          <article key={product.id} className={styles.card} role="listitem">
            <div className={styles.imageWrapper}>
              <Image
                src={product.image}
                alt={product.name}
                width={450}
                height={450}
                className={styles.image}
                loading="lazy"
              />

              <span className={styles.stockBadge}>
                {product.stock}
              </span>
            </div>

            <div className={styles.details}>
              <p className={styles.category}>{product.category}</p>

              <h3 className={styles.name}>{product.name}</h3>

              <p className={styles.price}>KES {product.price.toLocaleString()}</p>
            </div>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.addToCart}
                aria-label={`Add ${product.name} to cart`}
              >
                Add to Cart
              </button>

              <button
                type="button"
                className={styles.moreInfo}
                aria-label={`More info about ${product.name}`}
              >
                More Info
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default memo(GUT);
