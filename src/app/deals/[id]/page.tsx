"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./DealsOfTheDayDetails.module.css";

// MODEL + CURRENCY UTILS
import { getDealInKSH, Deal } from "@/data/details/deals";

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string;

  // Get enriched deal object with KSH prices
  const deal: (Deal & {
    mrpKSH: number;
    priceKSH: number;
    mrpFormatted: string;
    priceFormatted: string;
  }) | undefined = getDealInKSH(productId);

  // If deal not found, render fallback
  if (!deal) {
    return (
      <motion.div
        className={styles.notFound}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
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
      {/* BACK BUTTON */}
      <button
        className={styles.backBtn}
        onClick={() => router.back()}
        aria-label="Go back"
      >
        ← Back
      </button>

      {/* MAIN CONTAINER */}
      <div className={styles.container}>
        {/* IMAGE */}
        <motion.div
          className={styles.imgBox}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.28 }}
        >
          <Image
            src={deal.img}
            alt={deal.name}
            width={420}
            height={420}
            className={styles.image}
            priority
          />
        </motion.div>

        {/* PRODUCT INFO */}
        <div className={styles.info}>
          <h1 className={styles.title}>{deal.name}</h1>

          <p className={styles.mrp}>
            MRP: <span className={styles.strike}>{deal.mrpFormatted}</span>
          </p>

          <div className={styles.priceBox}>
            <span className={styles.finalPrice}>{deal.priceFormatted}</span>
            {deal.discount > 0 && (
              <span className={styles.discount}>
                Save {deal.discount}% OFF
              </span>
            )}
          </div>

          {/* ADD TO CART BUTTON */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.05 }}
            className={styles.addBtn}
          >
            Add to Cart
          </motion.button>

          {/* EXTRA INFO */}
          <p className={styles.shipping}>
            🚚 Free shipping on orders above KES 2,000
          </p>
        </div>
      </div>
    </motion.div>
  );
}
