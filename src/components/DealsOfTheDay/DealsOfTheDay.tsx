"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./DealsOfTheDay.module.css";
import { motion } from "framer-motion";

// ============================
// MODEL (separated for MVC)
// ============================
export interface Deal {
  id: string;
  img: string;
  name: string;
  mrp: number;
  price: number;
  discount: number;
}

// In real MVC → this should come from a Controller
const deals: Deal[] = [
  { id: '1', img: '/api/placeholder/120/120', name: 'Depura Vitamin D3 60k Sugar Free Oral...', mrp: 167.70, price: 84.01, discount: 22 },
  { id: '2', img: '/api/placeholder/120/120', name: 'Softovac Sf Constipation Powder...', mrp: 492.00, price: 329.64, discount: 33 },
  { id: '3', img: '/api/placeholder/120/120', name: 'Diataal-D Multivitamin | Vit. D & Ala | Sustaine...', mrp: 328.18, price: 200.44, discount: 47 },
  { id: '4', img: '/api/placeholder/120/120', name: 'Lactacyd Feminine Ph 5.2 Bottle Of 100ml...', mrp: 329.00, price: 276.36, discount: 16 },
  { id: '5', img: '/api/placeholder/120/120', name: 'Celevida Nutrition Drink For Diabetes Care &...', mrp: 787.00, price: 787.00, discount: 0 },
  { id: '6', img: '/api/placeholder/120/120', name: 'Vantej Long Lasting Protection Mint Flavo...', mrp: 200.00, price: 200.00, discount: 0 },
  { id: '7', img: '/api/placeholder/120/120', name: 'Enterogermine Suspension 10...', mrp: 748.20, price: 559.65, discount: 25 },
  { id: '8', img: '/api/placeholder/120/120', name: 'Depura Vitamin D3 60k Sugar Free Oral...', mrp: 167.70, price: 84.01, discount: 22 },
  { id: '9', img: '/api/placeholder/120/120', name: 'Softovac Sf Constipation Powder...', mrp: 492.00, price: 329.64, discount: 33 },
  { id: '10', img: '/api/placeholder/120/120', name: 'Diataal-D Multivitamin | Vit. D & Ala | Sustaine...', mrp: 328.18, price: 200.44, discount: 47 },
  { id: '11', img: '/api/placeholder/120/120', name: 'Lactacyd Feminine Ph 5.2 Bottle Of 100ml...', mrp: 329.00, price: 276.36, discount: 16 },
  { id: '12', img: '/api/placeholder/120/120', name: 'Celevida Nutrition Drink For Diabetes Care &...', mrp: 787.00, price: 787.00, discount: 0 },
  { id: '13', img: '/api/placeholder/120/120', name: 'Vantej Long Lasting Protection Mint Flavo...', mrp: 200.00, price: 200.00, discount: 0 },
  { id: '14', img: '/api/placeholder/120/120', name: 'Enterogermine Suspension 10...', mrp: 748.20, price: 559.65, discount: 25 },
];

// ============================
// VIEW COMPONENT
// ============================
export default function DealsOfTheDay() {
  const [timeLeft, setTimeLeft] = React.useState(15 * 60);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((v) => (v > 0 ? v - 1 : 0));
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

        <div className={styles.timer}>
          <svg className={styles.icon} viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="7" stroke="currentColor" fill="none" />
            <path d="M8 4v4H5.5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span>{mins}:{secs} MINS LEFT</span>
        </div>

        <button className={styles.viewAll}>View All</button>
      </div>

      {/* DEALS SCROLLER */}
      <div className={styles.carousel}>
        <div className={styles.track}>
          {deals.map((d) => (
            <motion.article
              key={d.id}
              className={styles.card}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Link href={`/deals/${d.id}`}>
                <div className={styles.imgWrap}>
                  <Image
                    src={d.img}
                    alt={d.name}
                    width={120}
                    height={120}
                    className={styles.img}
                  />
                </div>

                <h3 className={styles.name}>{d.name}</h3>

                <p className={styles.mrp}>MRP ₹{d.mrp.toFixed(2)}</p>

                <div className={styles.priceRow}>
                  <span className={styles.price}>₹{d.price.toFixed(2)}</span>
                  {d.discount > 0 && (
                    <span className={styles.discount}>-{d.discount}%</span>
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
