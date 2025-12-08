"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./DealsOfTheDayDetails.module.css";

// MODEL — import from your DealsOfTheDay component
import { Deal } from "@/components/DealsOfTheDay/DealsOfTheDay";

// TEMP CONTROLLER — replace with real API fetching later
const getDealById = (id: string): Deal | undefined => {
  const sampleData: Deal[] = [
    {
      id: "1",
      img: "/api/placeholder/300/300",
      name: "Depura Vitamin D3 60k Sugar Free Oral...",
      mrp: 167.7,
      price: 84.01,
      discount: 22,
    },
    {
      id: "2",
      img: "/api/placeholder/300/300",
      name: "Softovac Sf Constipation Powder...",
      mrp: 492,
      price: 329.64,
      discount: 33,
    },
  ];

  return sampleData.find((item) => item.id === id);
};

export default function DealsOfTheDayDetails() {
  const params = useParams();
  const dealId = params?.id as string;
  const deal = getDealById(dealId);

  if (!deal) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={styles.notFound}
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
      <Link href="/#deals" className={styles.backBtn}>
        ← Back
      </Link>

      {/* MAIN CONTENT */}
      <div className={styles.container}>
        {/* IMAGE SECTION */}
        <motion.div
          className={styles.imgBox}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={deal.img}
            width={350}
            height={350}
            alt={deal.name}
            className={styles.image}
            priority
          />
        </motion.div>

        {/* INFO SECTION */}
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
            whileHover={{ scale: 1.03 }}
            className={styles.addBtn}
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

