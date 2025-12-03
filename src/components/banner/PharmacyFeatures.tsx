"use client";
import { useState } from 'react';
import styles from './PharmacyFeatures.module.css';

interface Feature {
  title: string;
  description: string;
  link: string;
}

const features: Feature[] = [
  {
    title: 'Free Shipping',
    description: 'How to take advantage of our Free Standard Shipping',
    link: '/shipping'
  },
  {
    title: 'Locations',
    description: 'Find a Store Near You. View more contact information',
    link: '/locations'
  },
  {
    title: 'Support 24/7',
    description: 'We offer a 24/7 customer hotline so we can help You',
    link: '/support'
  }
];

export default function PharmacyFeatures() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className={styles.container}>
      {features.map((feature, index) => (
        <article key={index} className={styles.card}>
          <h2 className={styles.title}>{feature.title}</h2>
          <p className={styles.description}>{feature.description}</p>
          <a 
            href={feature.link}
            className={styles.link}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            aria-label={`Read more about ${feature.title}`}
          >
            <svg 
              className={styles.arrow} 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className={`${styles.tooltip} ${hoveredIndex === index ? styles.visible : ''}`}>
              Read more
            </span>
          </a>
        </article>
      ))}
    </section>
  );
}