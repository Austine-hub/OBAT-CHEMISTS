
"use client";

import { useState } from 'react';
import styles from './PharmacyBanners.module.css';

interface BannerProps {
  href: string;
  bg: string;
  children: React.ReactNode;
}

const BannerCard = ({ href, bg, children }: BannerProps) => {
  const [hover, setHover] = useState(false);
  
  return (
    <a 
      href={href}
      className={`${styles.card} ${styles[bg]}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ transform: hover ? 'translateY(-8px)' : 'translateY(0)' }}
    >
      {children}
    </a>
  );
};

export default function PharmacyBanners() {
  return (
    <section className={styles.container}>
      <div className={styles.grid}>
        <BannerCard href="/team" bg="red">
          <div className={styles.icon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4.5 12.5h15M12 5v14M9 3h6v3H9zM7 8h10v13H7z"/>
            </svg>
          </div>
          <h2 className={styles.title}>Our Pharmacists<br/>Are Here To Help</h2>
        </BannerCard>

        <BannerCard href="/shop" bg="blue">
          <div className={styles.content}>
            <h3 className={styles.saleTitle}>Sale!</h3>
            <p className={styles.discount}>Up to 20% off</p>
            <p className={styles.subtitle}>For all products</p>
            <button className={styles.btn}>LEARN MORE</button>
          </div>
          <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=300&fit=crop" alt="Family" className={styles.img}/>
        </BannerCard>

        <BannerCard href="/category/vitamins" bg="purple">
          <div className={styles.badge}>Only<br/>Today</div>
          <div className={styles.promoContent}>
            <h3 className={styles.promoTitle}>25% off</h3>
            <p className={styles.promoText}>your purchase*</p>
            <button className={styles.shopBtn}>SHOP NOW</button>
          </div>
          <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop" alt="Probiotics" className={styles.productImg}/>
        </BannerCard>
      </div>
    </section>
  );
}