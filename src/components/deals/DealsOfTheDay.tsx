"use client";

import React from 'react';
import styles from './DealsOfTheDay.module.css';

interface Deal {
  id: string;
  img: string;
  name: string;
  mrp: number;
  price: number;
  discount: number;
}

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

export default function DealsOfTheDay() {
  const [timeLeft, setTimeLeft] = React.useState(15 * 60);

  React.useEffect(() => {
    const timer = setInterval(() => setTimeLeft(p => p > 0 ? p - 1 : 0), 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <section className={styles.deals} aria-label="Deals of the Day">
      <div className={styles.header}>
        <h2 className={styles.title}>Deals of the Day</h2>
        <div className={styles.timer} role="timer" aria-live="polite">
          <svg className={styles.icon} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H5.5a.5.5 0 0 1 0-1H7.5V4a.5.5 0 0 1 .5-.5z"/>
          </svg>
          <span>{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')} MINS LEFT, HURRY!</span>
        </div>
        <button className={styles.viewAll} aria-label="View all deals">View All</button>
      </div>

      <div className={styles.carousel}>
        <div className={styles.track}>
          {deals.map(deal => (
            <article key={deal.id} className={styles.card}>
              <div className={styles.imgWrap}>
                <img src={deal.img} alt={deal.name} loading="lazy" />
              </div>
              <h3 className={styles.name}>{deal.name}</h3>
              <p className={styles.mrp}>MRP ₹{deal.mrp.toFixed(2)}</p>
              <div className={styles.priceRow}>
                <span className={styles.price}>₹{deal.price.toFixed(2)}</span>
                {deal.discount > 0 && (
                  <span className={styles.discount}>({deal.discount}%)</span>
                )}
              </div>
            </article>
          ))}
        </div>
        <button className={styles.navBtn} aria-label="Next deals">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
    </section>
  );
}