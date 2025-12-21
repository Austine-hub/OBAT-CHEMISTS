//src/components/footer/BottomNav.tsx

"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, ShoppingBag, ShoppingCart, MapPin, User } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";
import styles from "./BottomNav.module.css";

interface NavItem {
  to: string;
  label: string;
  icon: React.ElementType;
  ariaLabel: string;
  badge?: string;
  external?: boolean;
  showCartBadge?: boolean;
}

const BottomNav: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { totalItems } = useCart();

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.success("Opening your cart...", { duration: 1500 });
    setTimeout(() => router.push("/cart"), 300);
  };

  const navItems: NavItem[] = [
    {
      to: "/",
      label: "Home",
      icon: Home,
      ariaLabel: "Navigate to home page",
    },
    {
      to: "/login",
      label: "Login",
      icon: User,
      ariaLabel: "Navigate to login page",
    },
    {
      to: "/offers",
      label: "Offers",
      icon: ShoppingBag,
      badge: "New",
      ariaLabel: "View special offers",
    },
    {
      to: "/cart",
      label: "Cart",
      icon: ShoppingCart,
      ariaLabel: `View cart with ${totalItems} item${totalItems !== 1 ? "s" : ""}`,
      showCartBadge: true,
    },
    {
      to: "https://www.google.com/maps/dir/-1.1010048,37.011456/HEALTHFIELD+PHARMACY,+Jkuat,+Muramati+road,+Gate+C+Rd,+Juja",
      label: "Stores",
      icon: MapPin,
      external: true,
      ariaLabel: "Get directions to store",
    },
  ];

  const renderNavItem = (item: NavItem) => {
    const isActive = pathname === item.to;
    const Icon = item.icon;

    const iconElement = (
      <motion.div
        className={styles.iconWrapper}
        whileTap={{ scale: 0.85 }}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <span className={styles.icon}>
          <Icon strokeWidth={1.8} size={24} />
          
          {/* Cart badge with animation */}
          {item.showCartBadge && totalItems > 0 && (
            <motion.span
              className={styles.cartBadge}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              key={totalItems}
            >
              {totalItems > 99 ? "99+" : totalItems}
            </motion.span>
          )}
          
          {/* Static badge for offers */}
          {item.badge && !item.showCartBadge && (
            <span className={styles.staticBadge}>{item.badge}</span>
          )}
        </span>
      </motion.div>
    );

    const content = (
      <>
        {iconElement}
        <span className={`${styles.label} ${isActive ? styles.activeLabel : ""}`}>
          {item.label}
        </span>
      </>
    );

    // External link
    if (item.external) {
      return (
        <a
          key={item.label}
          href={item.to}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.ariaLabel}
          className={styles.navItem}
        >
          {content}
        </a>
      );
    }

    // Cart with special handler
    if (item.showCartBadge) {
      return (
        <Link
          key={item.label}
          href={item.to}
          aria-label={item.ariaLabel}
          onClick={handleCartClick}
          className={`${styles.navItem} ${isActive ? styles.active : ""}`}
        >
          {content}
        </Link>
      );
    }

    // Regular link
    return (
      <Link
        key={item.label}
        href={item.to}
        aria-label={item.ariaLabel}
        className={`${styles.navItem} ${isActive ? styles.active : ""}`}
      >
        {content}
      </Link>
    );
  };

  return (
    <motion.nav
      className={styles.bottomNav}
      role="navigation"
      aria-label="Primary navigation"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.8,
      }}
    >
      {navItems.map(renderNavItem)}
    </motion.nav>
  );
};

export default BottomNav;