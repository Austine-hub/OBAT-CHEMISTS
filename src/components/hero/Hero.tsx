"use client";

import { useState, useEffect } from "react";
import Image, { type StaticImageData } from "next/image";
import styles from "./Hero.module.css";

import hero1 from "@/assets/images/hero1.png";
import hero2 from "@/assets/images/hero2.png";
import hero3 from "@/assets/images/hero3.png";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  image: StaticImageData;
  categories: string[];
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Free yourself from allergies.",
    subtitle: "Ask your pharmacist for advice on managing your symptoms.",
    buttonText: "FIND A PHARMACY",
    image: hero1,
    categories: ["Pharmacy", "Healthcare", "Diet and Fitness"],
  },
  {
    id: 2,
    title: "Flu Season Is Coming",
    subtitle: "And We Can Help You Prepare",
    buttonText: "LEARN MORE",
    image: hero2,
    categories: ["Pharmacy", "Healthcare", "Diet and Fitness"],
  },
  {
    id: 3,
    title: "9 Herbs That Fight Colds",
    subtitle: "We will help you",
    buttonText: "LEARN MORE",
    image: hero3,
    categories: ["Pharmacy", "Healthcare", "Diet and Fitness"],
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const img = document.createElement("img");
    img.src = slides[current].image.src;
    img.onload = () => {
      setLoaded(true);
      setTimeout(() => setAnimate(true), 50);
    };
  }, [current]);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimate(false);
      setLoaded(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
      }, 500);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    if (index !== current) {
      setAnimate(false);
      setLoaded(false);
      setTimeout(() => setCurrent(index), 500);
    }
  };

  const goToPrev = () => {
    setAnimate(false);
    setLoaded(false);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    }, 500);
  };

  const goToNext = () => {
    setAnimate(false);
    setLoaded(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 500);
  };

  return (
    <section className={styles.hero}>
      <div className={`${styles.slide} ${loaded ? styles.loaded : ""}`}>
        <Image
          src={slides[current].image}
          alt={slides[current].title}
          className={styles.backgroundImage}
          fill
          priority
        />

        <div className={styles.overlay} />

        <div className={styles.content}>
          <div className={`${styles.text} ${animate ? styles.animate : ""}`}>
            <h1 className={styles.title}>{slides[current].title}</h1>
            <p className={styles.subtitle}>{slides[current].subtitle}</p>
            <button className={styles.cta}>{slides[current].buttonText}</button>
          </div>

          <div className={`${styles.meta} ${animate ? styles.animate : ""}`}>
            <ul className={styles.categories}>
              {slides[current].categories.map((cat, idx) => (
                <li key={idx}>{cat}</li>
              ))}
            </ul>
            <span className={styles.number}>0{current + 1}</span>
          </div>
        </div>

        <button
          className={`${styles.nav} ${styles.prev}`}
          onClick={goToPrev}
          aria-label="Previous slide"
        >
          ‹
        </button>

        <button
          className={`${styles.nav} ${styles.next}`}
          onClick={goToNext}
          aria-label="Next slide"
        >
          ›
        </button>

        <div className={styles.dots}>
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${
                idx === current ? styles.active : ""
              }`}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
