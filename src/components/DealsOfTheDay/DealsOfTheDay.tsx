//src/components/DealsOfTheDay/DealsOfTheDay.tsx

"use client";

import React, { useEffect, useState, memo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import styles from "./DealsOfTheDay.module.css";
import { deals, getAllDealsInKSH } from "@/data/details/deals";
import { useCart } from "@/context/CartContext";

const COUNTDOWN_SECONDS = 15 * 60;

const DealsOfTheDay = memo(function DealsOfTheDay() {
  const { addToCart } = useCart();

  const [timeLeft, setTimeLeft] = useState(COUNTDOWN_SECONDS);
  const [dealsInKSH] = useState(() => getAllDealsInKSH());

  /* -------------------------------------------------------------------------- */
  /* Countdown Timer                                                            */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((t) => Math.max(t - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");

  /* -------------------------------------------------------------------------- */
  /* Add To Cart                                                                */
  /* -------------------------------------------------------------------------- */
  const handleAddToCart = useCallback(
    (deal: (typeof dealsInKSH)[number]) => {
      addToCart({
        id: deal.id,
        name: deal.name,
        price: deal.price,
        quantity: 1,
        image: deal.img,
        originalPrice: deal.mrp,
        discount: deal.discount,
        category: "Deals",
      });

      toast.success(`${deal.name} added to cart`);
    },
    [addToCart]
  );

  return (
    <section className={styles.deals} aria-labelledby="deals-heading">
      {/* HEADER */}
      <header className={styles.header}>
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

        <Link href="/deals" className={styles.viewAll}>
          View All
        </Link>
      </header>

      {/* DEALS LIST */}
      <div className={styles.carousel}>
        <div className={styles.track}>
          {dealsInKSH.map((deal) => (
            <motion.article
              key={deal.id}
              className={styles.card}
              whileHover={{ scale: 1.045 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 220, damping: 15 }}
            >
              <Link
                href={`/deals/${deal.id}`}
                className={styles.cardLink}
                aria-label={deal.name}
              >
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

                <h3 className={styles.name}>{deal.name}</h3>

                <p className={styles.mrp}>
                  MRP: <span className={styles.strike}>{deal.mrpFormatted}</span>
                </p>

                <div className={styles.priceRow}>
                  <span className={styles.price}>{deal.priceFormatted}</span>
                  {deal.discount > 0 && (
                    <span className={styles.discount}>
                      -{deal.discount}% OFF
                    </span>
                  )}
                </div>
              </Link>

              {/* ADD TO CART */}
              <button
                type="button"
                className={styles.addBtn}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCart(deal);
                }}
                aria-label={`Add ${deal.name} to cart`}
              >
                Add to Cart
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
});

export default DealsOfTheDay;
