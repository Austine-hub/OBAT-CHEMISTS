"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./DealsOfTheDayDetails.module.css";

// MODEL & CONTROLLER
import { getDealById, Deal } from "@/data/details/deals";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;
  const deal: Deal | undefined = getDealById(productId);

  if (!deal) {
    return (
      <motion.div
        className={styles.notFound}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p>❗ Product not found.</p>
        <Link href="/#deals" className={styles.goBackBtn}>
          ← Back to Deals
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {/* Back Button */}
      <button className={styles.backBtn} onClick={() => router.back()}>
        ← Back
      </button>

      {/* PRODUCT DETAILS CONTAINER */}
      <div className={styles.container}>
        {/* IMAGE */}
        <motion.div
          className={styles.imgBox}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={deal.img}
            alt={deal.name}
            width={400}
            height={400}
            className={styles.image}
            priority
          />
        </motion.div>

        {/* PRODUCT INFO */}
        <div className={styles.info}>
          <h1 className={styles.title}>{deal.name}</h1>
          <p className={styles.mrp}>MRP: ₹{deal.mrp.toFixed(2)}</p>

          <div className={styles.priceBox}>
            <span className={styles.finalPrice}>₹{deal.price.toFixed(2)}</span>
            {deal.discount > 0 && (
              <span className={styles.discount}>
                Save {deal.discount}% OFF
              </span>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.05 }}
            className={styles.addBtn}
          >
            Add to Cart
          </motion.button>

          {/* EXTRA INFO */}
          <p className={styles.shipping}>
            🚚 Free shipping on orders above ₹500
          </p>
        </div>
      </div>
    </motion.div>
  );
}
