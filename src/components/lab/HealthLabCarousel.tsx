//src/components/lab/HealthLabCarousel.tsx

"use client";

import React, { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./HealthLabCarousel.module.css";
import { HEALTH_CATEGORIES } from "@/data/details/healthCategories";

const ITEMS_PER_VIEW = 5;

export default function HealthLabCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const isDesktop = useMemo(
    () => typeof window !== "undefined" && window.innerWidth >= 768,
    []
  );

  const maxIndex = Math.max(0, HEALTH_CATEGORIES.length - ITEMS_PER_VIEW);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  return (
    <section
      className={styles.container}
      aria-label="Lab Tests by Health Concern"
    >
      {/* Header */}
      <header className={styles.header}>
        <h2 className={styles.title}>Lab Tests by Health Concern</h2>
        <p className={styles.subtitle}>
          Powered by <span className={styles.brand}>Thyrocare</span>
        </p>
      </header>

      {/* Carousel */}
      <div className={styles.carouselWrapper}>
        {isDesktop && (
          <button
            className={`${styles.navButton} ${styles.navButtonLeft}`}
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous categories"
            type="button"
          >
            ‹
          </button>
        )}

        <div className={styles.carouselContainer}>
          <div
            className={styles.carouselTrack}
            style={
              isDesktop
                ? {
                    transform: `translateX(-${
                      currentIndex * (100 / ITEMS_PER_VIEW)
                    }%)`,
                  }
                : undefined
            }
            role="list"
          >
            {HEALTH_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/side/${category.slug}`}
                className={styles.card}
                role="listitem"
                aria-label={`View ${category.title} tests`}
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
              </Link>
            ))}
          </div>
        </div>

        {isDesktop && (
          <button
            className={`${styles.navButton} ${styles.navButtonRight}`}
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            aria-label="Next categories"
            type="button"
          >
            ›
          </button>
        )}
      </div>

      {/* Progress */}
      {isDesktop && (
        <div className={styles.progressIndicator} aria-hidden="true">
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: `${
                  ((currentIndex + ITEMS_PER_VIEW) /
                    HEALTH_CATEGORIES.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
