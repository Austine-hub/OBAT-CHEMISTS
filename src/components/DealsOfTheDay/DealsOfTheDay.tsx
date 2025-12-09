"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./DealsOfTheDay.module.css";

import { deals, getAllDealsInKSH } from "@/data/details/deals";

export default function DealsOfTheDay() {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [dealsInKSH, setDealsInKSH] = useState(getAllDealsInKSH());

  // Countdown timer (accessible & robust)
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");

  return (
    <section className={styles.deals} aria-labelledby="deals-heading">
      {/* HEADER */}
      <div className={styles.header}>
        <h2 id="deals-heading" className={styles.title}>
          Deals of the Day
        </h2>

        <div className={styles.timer} aria-live="polite">
          <svg
            className={styles.icon}
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <circle cx="8" cy="8" r="7" stroke="currentColor" fill="none" />
            <path d="M8 4v4H5.5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span>
            {mins}:{secs} <strong>MINS LEFT</strong>
          </span>
        </div>

        <Link
          href="/deals"
          className={styles.viewAll}
          aria-label="View all deals"
        >
          View All
        </Link>
      </div>

      {/* DEALS CAROUSEL */}
      <div className={styles.carousel}>
        <div className={styles.track}>
          {dealsInKSH.map((deal) => (
            <motion.article
              key={deal.id}
              className={styles.card}
              whileHover={{ scale: 1.045 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 220, damping: 15 }}
              aria-label={deal.name}
            >
              <Link href={`/deals/${deal.id}`} className={styles.cardLink}>
                {/* IMAGE */}
                <div className={styles.imgWrap}>
                  <Image
                    src={deal.img}
                    alt={deal.name}
                    width={140}
                    height={140}
                    className={styles.img}
                    priority
                  />
                </div>

                {/* PRODUCT NAME */}
                <h3 className={styles.name}>{deal.name}</h3>

                {/* MRP */}
                <p className={styles.mrp}>
                  MRP: <span className={styles.strike}>{deal.mrpFormatted}</span>
                </p>

                {/* PRICE ROW */}
                <div className={styles.priceRow}>
                  <span className={styles.price}>{deal.priceFormatted}</span>
                  {deal.discount > 0 && (
                    <span className={styles.discount}>
                      -{deal.discount}% OFF
                    </span>
                  )}
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
