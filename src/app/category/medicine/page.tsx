// src/components/offers/Offers.tsx
"use client";

import React, { useState, memo } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./Offers.module.css";

import {
  otcProducts,
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE,
} from "@/data/otc.data";

const Offers: React.FC = memo(() => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleWhatsAppOrder = (productName: string) => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}%20${encodeURIComponent(
      productName
    )}`;
    window.open(url, "_blank");
  };

  const openImage = (src: string) => setSelectedImage(src);
  const closeModal = () => setSelectedImage(null);

  return (
    <section className={styles.offersSection}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Top OTC Pharmacy Offers</h2>
        <Link href="/buy-medicines" className={styles.viewAll}>
          View all offers →
        </Link>
      </div>

      {/* Grid */}
      <div className={styles.offersGrid}>
        {otcProducts.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.discountTag}>-{item.discount}%</div>

            <div className={styles.imageWrapper} onClick={() => openImage(item.image.src)}>
              <Image
                src={item.image}
                alt={item.name}
                className={styles.productImage}
                loading="lazy"
              />
              <button className={styles.quickViewBtn}>Quick View</button>
            </div>

            <div className={styles.info}>
              <p className={styles.name}>{item.name}</p>

              <div className={styles.prices}>
                <span className={styles.newPrice}>
                  KSh {item.price.toLocaleString()}
                </span>
                <span className={styles.oldPrice}>
                  KSh {item.oldPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <div className={styles.actions}>
              <button
                className={styles.addToCart}
                onClick={() => handleWhatsAppOrder(item.name)}
              >
                Order via WhatsApp
              </button>

              <button
                className={styles.viewProduct}
                onClick={() => openImage(item.image.src)}
              >
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Product Preview"
              width={600}
              height={600}
              className={styles.modalImage}
            />
            <button className={styles.closeBtn} onClick={closeModal}>
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
});

export default Offers;
