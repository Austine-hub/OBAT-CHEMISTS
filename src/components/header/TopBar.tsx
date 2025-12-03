"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Heart, User, MapPin, Truck, Package, Home, X, Menu } from 'lucide-react';
import styles from './TopBar.module.css';

interface TopBarProps {
  onMobileToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

const TopBar = ({ onMobileToggle, isMobileMenuOpen = false }: TopBarProps) => {
  const [showDelivery, setShowDelivery] = useState(false);
  const [cartCount] = useState(0);

  const toggleDelivery = () => setShowDelivery(prev => !prev);
  const closeDelivery = () => setShowDelivery(false);

  return (
    <>
      <header className={styles.topbar}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo} aria-label="Home">
            <Home size={28} />
          </Link>

          <button 
            className={styles.deliveryBtn}
            onClick={toggleDelivery}
            aria-label="Change delivery location"
            aria-expanded={showDelivery}
          >
            <MapPin size={18} />
            <div className={styles.deliveryText}>
              <span className={styles.deliveryTitle}>Pickup or delivery?</span>
              <span className={styles.deliveryLocation}>Sacramento, 95829</span>
            </div>
          </button>

          <div className={styles.searchWrapper}>
            <input 
              type="search"
              placeholder="Search everything at Walmart"
              className={styles.searchInput}
              aria-label="Search products"
            />
            <button className={styles.searchBtn} aria-label="Search">
              <Search size={20} />
            </button>
          </div>

          <nav className={styles.actions} aria-label="Main navigation">
            <Link href="/reorder" className={styles.actionLink} aria-label="Reorder items">
              <Heart size={24} />
              <div className={styles.actionText}>
                <span className={styles.actionLabel}>Reorder</span>
                <span className={styles.actionSub}>My Items</span>
              </div>
            </Link>

            <Link href="/account" className={styles.actionLink} aria-label="Account">
              <User size={24} />
              <div className={styles.actionText}>
                <span className={styles.actionLabel}>Sign in</span>
                <span className={styles.actionSub}>Account</span>
              </div>
            </Link>

            <Link href="/cart" className={styles.cartLink} aria-label={`Cart with ${cartCount} items`}>
              <ShoppingCart size={26} />
              {cartCount > 0 && (
                <span className={styles.cartBadge} aria-label={`${cartCount} items in cart`}>
                  {cartCount}
                </span>
              )}
              <span className={styles.cartPrice}>$0.00</span>
            </Link>
          </nav>

          <button
            className={styles.mobileMenuBtn}
            onClick={onMobileToggle}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {showDelivery && (
        <div className={styles.deliveryModal} role="dialog" aria-modal="true" aria-labelledby="delivery-title">
          <div className={styles.modalOverlay} onClick={closeDelivery} aria-hidden="true" />
          <div className={styles.modalContent}>
            <button 
              className={styles.closeBtn} 
              onClick={closeDelivery}
              aria-label="Close delivery options"
            >
              <X size={24} />
            </button>
            
            <h2 id="delivery-title" className={styles.modalTitle}>How do you want your items?</h2>
            
            <div className={styles.deliveryOptions} role="group" aria-label="Delivery methods">
              <button className={styles.optionBtn} aria-label="Shipping option">
                <Truck size={28} />
                <span>Shipping</span>
              </button>
              <button className={styles.optionBtn} aria-label="Pickup option">
                <Package size={28} />
                <span>Pickup</span>
              </button>
              <button className={styles.optionBtn} aria-label="Delivery option">
                <Home size={28} />
                <span>Delivery</span>
              </button>
            </div>
            
            <div className={styles.addressSection}>
              <MapPin size={20} aria-hidden="true" />
              <div className={styles.addressInfo}>
                <span className={styles.addressLabel}>Your location</span>
                <span className={styles.addressValue}>Sacramento, CA 95829</span>
              </div>
            </div>
            
            <button className={styles.updateBtn}>Update address</button>
          </div>
        </div>
      )}
    </>
  );
};

export default TopBar;