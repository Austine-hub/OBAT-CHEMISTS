//src/components/DealsOfTheDay/DealsOfTheDay.tsx

"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { ShoppingCart, Eye, Check } from "lucide-react";

import styles from "./DealsOfTheDay.module.css";
import { getAllDealsInKSH } from "@/data/details/deals";
import { useCart } from "@/context/CartContext";

const COUNTDOWN_SECONDS = 15 * 60;

const DealsOfTheDay = memo(function DealsOfTheDay() {
  const { addToCart, items } = useCart();
  const [timeLeft, setTimeLeft] = useState(COUNTDOWN_SECONDS);

  /* --------------------------------------------------
     Derived data
  -------------------------------------------------- */
  const deals = useMemo(() => getAllDealsInKSH(), []);

  /* --------------------------------------------------
     Countdown timer
  -------------------------------------------------- */
  useEffect(() => {
    const timer = setInterval(
      () => setTimeLeft((t) => Math.max(t - 1, 0)),
      1000
    );
    return () => clearInterval(timer);
  }, []);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  /* --------------------------------------------------
     Helpers
  -------------------------------------------------- */
  const isInCart = useCallback(
    (id: string | number) => items.some((item) => item.id === id),
    [items]
  );

  /* --------------------------------------------------
     Actions
  -------------------------------------------------- */
  const handleAddToCart = useCallback(
    (
      deal: (typeof deals)[number],
      e: React.MouseEvent<HTMLButtonElement>
    ) => {
      e.preventDefault();
      e.stopPropagation();

      if (isInCart(deal.id)) return;

      addToCart({
        id: deal.id,
        name: deal.name,
        price: deal.priceKSH,
        quantity: 1,
        image: deal.img,
        originalPrice: deal.mrpKSH,
        discount: deal.discount,
        category: "Deals",
      });

      toast.success(`${deal.name} added to cart`, {
        duration: 2800,
        icon: <Check size={20} />,
        style: {
          background: "#ffffff",
          color: "#0f5132",
          fontWeight: 500,
        },
      });
    },
    [addToCart, isInCart]
  );

  return (
    <section className={styles.deals} aria-labelledby="deals-heading">
      {/* ================= Header ================= */}
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <h2 id="deals-heading" className={styles.title}>
            Deals of the Day
          </h2>
          <p className={styles.subtitle}>
            Limited-time offers — while stocks last
          </p>
        </div>

        <div className={styles.timer} role="timer" aria-live="polite">
          <span className={styles.timerDigits}>
            {minutes}:{seconds}
          </span>
          <span className={styles.timerLabel}>Left</span>
        </div>

        <Link href="/shop" className={styles.viewAll}>
          View All Deals →
        </Link>
      </header>

      {/* ================= Deals ================= */}
      <div className={styles.carousel}>
        <div className={styles.track}>
          {deals.map((deal) => {
            const added = isInCart(deal.id);

            return (
              <article key={deal.id} className={styles.card}>
                <motion.div
                  className={styles.cardInner}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                >
                  {deal.discount > 0 && (
                    <span className={styles.badge}>
                      -{deal.discount}%
                    </span>
                  )}

                  <Link
                    href={`/deals/${deal.slug}`}
                    className={styles.imageLink}
                  >
                    <Image
                      src={deal.img}
                      alt={deal.name}
                      width={200}
                      height={200}
                      className={styles.image}
                      priority
                    />
                  </Link>

                  <div className={styles.content}>
                    <Link
                      href={`/deals/${deal.slug}`}
                      className={styles.nameLink}
                    >
                      <h3 className={styles.name}>{deal.name}</h3>
                    </Link>

                    <div className={styles.pricing}>
                      <span className={styles.price}>
                        {deal.priceFormattedKSH}
                      </span>
                      {deal.mrpKSH > deal.priceKSH && (
                        <span className={styles.originalPrice}>
                          {deal.mrpFormattedKSH}
                        </span>
                      )}
                    </div>

                    <div className={styles.actions}>
                      <motion.button
                        type="button"
                        className={styles.cartBtn}
                        onClick={(e) => handleAddToCart(deal, e)}
                        disabled={added}
                        whileTap={!added ? { scale: 0.95 } : undefined}
                        aria-label={
                          added
                            ? `${deal.name} already in cart`
                            : `Add ${deal.name} to cart`
                        }
                      >
                        {added ? (
                          <>
                            Added <Check size={16} />
                          </>
                        ) : (
                          <>
                            Add <ShoppingCart size={16} />
                          </>
                        )}
                      </motion.button>

                      <Link
                        href={`/deals/${deal.slug}`}
                        className={styles.viewBtn}
                        aria-label={`View ${deal.name}`}
                      >
                        <Eye size={18} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </article>
            );
          })}
        </div>

        <div className={styles.scrollIndicator} aria-hidden>
          Scroll →
        </div>
      </div>
    </section>
  );
});

export default DealsOfTheDay;
