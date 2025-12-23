//src/components/lab/HealthLabCarousel.tsx

'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import styles from './HealthLabCarousel.module.css';

interface HealthCategory {
  id: number;
  title: string;
  imagePath: string;
  alt: string;
}

const healthCategories: HealthCategory[] = [
  { id: 1, title: 'Vitamins', imagePath: '/images/health/vitamins.jpg', alt: 'Vitamins - citrus fruits' },
  { id: 2, title: 'Diabetes', imagePath: '/images/health/diabetes.jpg', alt: 'Diabetes management device' },
  { id: 3, title: 'Women Care', imagePath: '/images/health/women-care.jpg', alt: 'Women healthcare' },
  { id: 4, title: 'Hair & Skin Care', imagePath: '/images/health/hair-skin.jpg', alt: 'Hair and skin care' },
  { id: 5, title: 'Thyroid', imagePath: '/images/health/thyroid.jpg', alt: 'Thyroid health' },
  { id: 6, title: 'Bone Health', imagePath: '/images/health/bone-health.jpg', alt: 'Bone health' },
  { id: 7, title: 'Heart', imagePath: '/images/health/heart.jpg', alt: 'Heart health' },
  { id: 8, title: 'Lifestyle', imagePath: '/images/health/lifestyle.jpg', alt: 'Lifestyle choices' },
  { id: 9, title: 'Fever & Infection', imagePath: '/images/health/fever-infection.jpg', alt: 'Fever and infection' }
];

const HealthLabCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  
  const ITEMS_PER_VIEW = 5;
  const maxIndex = Math.max(0, healthCategories.length - ITEMS_PER_VIEW);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  }, []);

  return (
    <section className={styles.container} aria-label="Lab Tests by Health Concern">
      <div className={styles.header}>
        <h2 className={styles.title}>Lab Tests by Health Concern</h2>
        <p className={styles.subtitle}>
          Powered by <span className={styles.brand}>Thyrocare</span>
        </p>
      </div>

      <div className={styles.carouselWrapper}>
        {isDesktop && (
          <button
            className={`${styles.navButton} ${styles.navButtonLeft}`}
            onClick={handlePrev}
            onKeyDown={(e) => handleKeyDown(e, handlePrev)}
            disabled={currentIndex === 0}
            aria-label="Previous health categories"
            type="button"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        <div className={styles.carouselContainer}>
          <div
            className={styles.carouselTrack}
            style={isDesktop ? {
              transform: `translateX(-${currentIndex * (100 / ITEMS_PER_VIEW)}%)`
            } : undefined}
            role="list"
            aria-live="polite"
          >
            {healthCategories.map((category) => (
              <article 
                key={category.id} 
                className={styles.card}
                role="listitem"
              >
                <div className={styles.cardImageWrapper}>
                  <Image
                    src={category.imagePath}
                    alt={category.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className={styles.cardImage}
                    priority={category.id <= 5}
                  />
                </div>
                <h3 className={styles.cardTitle}>{category.title}</h3>
              </article>
            ))}
          </div>
        </div>

        {isDesktop && (
          <button
            className={`${styles.navButton} ${styles.navButtonRight}`}
            onClick={handleNext}
            onKeyDown={(e) => handleKeyDown(e, handleNext)}
            disabled={currentIndex >= maxIndex}
            aria-label="Next health categories"
            type="button"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>

      {isDesktop && (
        <div className={styles.progressIndicator} aria-hidden="true">
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ 
                width: `${((currentIndex + ITEMS_PER_VIEW) / healthCategories.length) * 100}%` 
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default HealthLabCarousel;