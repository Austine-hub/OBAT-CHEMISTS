"use client";

import React from "react";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import styles from "./DetailsPage.module.css";
import { useRouter, useParams } from "next/navigation";

// ===== MODEL =====
interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  stock: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Dewyglot's Lemon-Grass Essential oil 15ml",
    price: "KES 900.00",
    description:
      "Pure and natural Lemon-Grass Essential Oil. Perfect for aromatherapy, skincare, and wellness routines.",
    image: "https://via.placeholder.com/600x600/4CAF50/ffffff?text=Lemon",
    rating: 4.5,
    reviews: 42,
    stock: "In Stock",
  },
  {
    id: 2,
    name: "SKIN1004 Centella Toning Toner 210ml",
    price: "KES 1,132.00",
    description:
      "Hydrating toner infused with Centella Asiatica to soothe and strengthen skin barrier.",
    image: "https://via.placeholder.com/600x600/FFA726/ffffff?text=Toner",
    rating: 4.8,
    reviews: 87,
    stock: "In Stock",
  },
  // Add other products here...
];

// ===== CONTROLLER =====
function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

// ===== VIEW =====
export default function DetailsPage() {
  const router = useRouter();
  const params = useParams();
  const productId = Number(params.id); // dynamic id from URL
  const product = getProductById(productId);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Product not found</h2>
        <button
          onClick={() => router.push("/products2")}
          className={styles.backBtn}
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button onClick={() => router.back()} className={styles.backBtn}>
        &larr; Back
      </button>

      <div className={styles.productWrapper}>
        <div className={styles.imageSection}>
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className={styles.productImage}
            loading="lazy"
          />
        </div>

        <div className={styles.detailsSection}>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.price}>{product.price}</p>
          <p className={styles.stock}>{product.stock}</p>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.actions}>
            <button className={styles.addCartBtn}>
              <ShoppingCart size={20} /> Add to Cart
            </button>
            <button className={styles.wishlistBtn}>
              <Heart size={20} /> Add to Wishlist
            </button>
          </div>

          <div className={styles.rating}>
            <span>⭐ {product.rating} ({product.reviews} reviews)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
