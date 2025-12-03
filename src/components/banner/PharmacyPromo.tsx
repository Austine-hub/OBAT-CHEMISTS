'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './PharmacyPromo.module.css';

const testimonials = [
  {
    text: "Online pharmacy is a helpful hand when I don't feel like getting out or some medicines or cosmetics are out of stock in my town.",
    name: "Linda Patison",
    location: "New York",
    image: "/client1.jpg"
  },
  {
    text: "Buying medicine online is a key to the safety of our country while the pandemic is spreading all around. Stay safe and buy online!",
    name: "Jenifer Johnson",
    location: "New Orleans",
    image: "/client2.jpg"
  },
  {
    text: "As a mom, I don't have much time and the opportunity to go outside at times when my kids are sick. Online pharmacy is the best solution.",
    name: "Sandy Cooper",
    location: "New York",
    image: "/client3.jpg"
  }
];

export default function PharmacyPromo() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length);
  const handleNext = () => setCurrent(prev => (prev + 1) % testimonials.length);

  return (
    <section className={styles.container}>
      <div className={styles.promoCard}>
        <div className={styles.imageWrapper}>
          <Image
            src="/promo-woman.jpg"
            alt="Healthy woman with avocado"
            fill
            className={styles.promoImage}
            priority
          />
        </div>
        <div className={styles.promoContent}>
          <h2 className={styles.promoTitle}>Browse offers on sale this week.</h2>
          <p className={styles.promoSubtitle}>Vitamins & Supplements</p>
          <p className={styles.promoSubtitle}>Weekly Deals</p>
          <a href="/shop" className={styles.promoButton}>BUY VITAMINS ONLINE</a>
        </div>
      </div>

      <div className={styles.testimonialCard}>
        <h3 className={styles.testimonialTitle}>Happy Clients</h3>
        <div className={styles.testimonialContent}>
          <p className={styles.testimonialText}>{testimonials[current].text}</p>
          <div className={styles.clientInfo}>
            <div className={styles.clientImageWrapper}>
              <Image
                src={testimonials[current].image}
                alt={testimonials[current].name}
                fill
                className={styles.clientImage}
              />
            </div>
            <div className={styles.clientDetails}>
              <p className={styles.clientName}>{testimonials[current].name}</p>
              <p className={styles.clientLocation}>{testimonials[current].location}</p>
            </div>
          </div>
        </div>
        <div className={styles.navButtons}>
          <button onClick={handlePrev} className={styles.navButton} aria-label="Previous testimonial">
            ‹
          </button>
          <button onClick={handleNext} className={styles.navButton} aria-label="Next testimonial">
            ›
          </button>
        </div>
      </div>
    </section>
  );
}