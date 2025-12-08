"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./DealsOfTheDay.module.css";
import { deals, Deal } from "@/data/details/deals";

export default function DealsOfTheDay() {
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");

  return (
    <section className={styles.deals}>
      {/* HEADER */}
      <div className={styles.header}>
        <h2 className={styles.title}>Deals of the Day</h2>

        <div className={styles.timer} aria-label="Countdown Timer">
          <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="8" cy="8" r="7" stroke="currentColor" fill="none" />
            <path d="M8 4v4H5.5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span>{mins}:{secs} MINS LEFT</span>
        </div>

        <Link href="/deals" className={styles.viewAll}>
          View All
        </Link>
      </div>

      {/* DEALS SCROLLER */}
      <div className={styles.carousel}>
        <div className={styles.track}>
          {deals.map((deal: Deal) => (
            <motion.article
              key={deal.id}
              className={styles.card}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 250 }}
            >
              <Link href={`/deals/${deal.id}`} className={styles.cardLink}>
                <div className={styles.imgWrap}>
                  <Image
                    src={deal.img}
                    alt={deal.name}
                    width={120}
                    height={120}
                    className={styles.img}
                  />
                </div>

                <h3 className={styles.name}>{deal.name}</h3>

                <p className={styles.mrp}>MRP ₹{deal.mrp.toFixed(2)}</p>

                <div className={styles.priceRow}>
                  <span className={styles.price}>₹{deal.price.toFixed(2)}</span>
                  {deal.discount > 0 && (
                    <span className={styles.discount}>-{deal.discount}%</span>
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
