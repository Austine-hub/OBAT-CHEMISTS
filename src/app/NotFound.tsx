import React from 'react';
import { Home, PackageSearch, ArrowLeft } from 'lucide-react';
import styles from "@/styles/NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Animated Pills */}
        <div className={styles.pillsContainer}>
          <div className={`${styles.pill} ${styles.pill1}`}></div>
          <div className={`${styles.pill} ${styles.pill2}`}></div>
          <div className={`${styles.pill} ${styles.pill3}`}></div>
        </div>

        {/* 404 Text */}
        <div className={styles.errorCode}>
          <span className={styles.four}>4</span>
          <div className={styles.pillIcon}>
            <PackageSearch size={64} strokeWidth={1.5} />
          </div>
          <span className={styles.four}>4</span>
        </div>

        {/* Error Message */}
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.description}>
          We couldn't find the page you're looking for. The prescription you're searching for may have been moved or doesn't exist.
        </p>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <a href="/" className={styles.primaryButton}>
            <Home size={20} />
            <span>Back to Home</span>
          </a>
          <button onClick={() => window.history.back()} className={styles.secondaryButton}>
            <ArrowLeft size={20} />
            <span>Go Back</span>
          </button>
        </div>

        {/* Help Links */}
        <div className={styles.helpLinks}>
          <p className={styles.helpText}>Need assistance?</p>
          <div className={styles.links}>
            <a href="/contact" className={styles.link}>Contact Support</a>
            <span className={styles.divider}>•</span>
            <a href="/faq" className={styles.link}>View FAQ</a>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className={styles.bgCircle1}></div>
      <div className={styles.bgCircle2}></div>
      <div className={styles.bgCircle3}></div>
    </div>
  );
}