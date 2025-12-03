"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Home, ShoppingBag, ShoppingCart, MapPin, User } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";
import styles from "./BottomNav.module.css";

interface BottomNavProps {
  onCartToggle?: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ onCartToggle }) => {
  const router = useRouter();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems?.() ?? 0;

  const navItems = [
    {
      to: "/",
      label: "Home",
      icon: <Home strokeWidth={1.8} />,
    },

    {
      to: "/login",
      label: "Login",
      icon: <User strokeWidth={1.8} />,
    },

    {
      to: "/offers",
      label: "Offers",
      icon: <ShoppingBag strokeWidth={1.8} />,
      badge: "New",
    },

    {
      to: "/cart",
      label: "Cart",
      icon: (
        <div className={styles.iconWithBadge}>
          <ShoppingCart strokeWidth={1.8} className={styles.cartIcon} />
          {totalItems > 0 && (
            <span className={styles.cartCount}>{totalItems}</span>
          )}
        </div>
      ),

      // Special onClick behavior preserved
      onClick: () => {
        toast.success("Opening your cart...", { duration: 1800 });
        onCartToggle?.();
        setTimeout(() => router.push("/cart"), 500);
      },
    },

    {
      to: "https://www.google.com/maps/dir/-1.1010048,37.011456/HEALTHFIELD+PHARMACY,+Jkuat,+Muramati+road,+Gate+C+Rd,+Juja",
      label: "Stores",
      icon: <MapPin strokeWidth={1.8} className={styles.mapIcon} />,
      external: true,
    },
  ];

  return (
    <motion.nav
      className={styles.bottomNav}
      role="navigation"
      aria-label="Primary navigation"
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
    >
      {navItems.map(({ to, label, icon, badge, external, onClick }) =>
        external ? (
          // ===========================
          // External Link (Google Maps)
          // ===========================
          <a
            key={label}
            href={to}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${label}`}
            className={`${styles.navItem} ${styles.externalLink}`}
          >
            <motion.div
              className={styles.iconWrapper}
              whileTap={{ scale: 0.9 }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <span className={styles.icon}>{icon}</span>
              {badge && <span className={styles.badge}>{badge}</span>}
            </motion.div>
            <span className={styles.label}>{label}</span>
          </a>
        ) : onClick ? (
          // ==================================
          // Special Case: Cart Button Handling
          // ==================================
          <button
            key={label}
            className={styles.navItem}
            aria-label={label}
            onClick={onClick}
          >
            <motion.div
              className={styles.iconWrapper}
              whileTap={{ scale: 0.9 }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <span className={styles.icon}>{icon}</span>
              {badge && <span className={styles.badge}>{badge}</span>}
            </motion.div>
            <span className={styles.label}>{label}</span>
          </button>
        ) : (
          // ============================
          // Internal Next.js Navigation
          // ============================
          <Link
            key={label}
            href={to}
            aria-label={label}
            className={styles.navItem}
          >
            <motion.div
              className={styles.iconWrapper}
              whileTap={{ scale: 0.9 }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <span className={styles.icon}>{icon}</span>
              {badge && <span className={styles.badge}>{badge}</span>}
            </motion.div>
            <span className={styles.label}>{label}</span>
          </Link>
        )
      )}
    </motion.nav>
  );
};

export default BottomNav;
