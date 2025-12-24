"use client";

import { useState, useCallback, useEffect, useRef, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  MapPin, 
  Truck, 
  Package, 
  Home, 
  X, 
  Menu 
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import styles from './TopBar.module.css';

interface TopBarProps {
  onMobileToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

interface DeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Delivery Modal Component
 */
const DeliveryModal = memo(({ isOpen, onClose }: DeliveryModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className={styles.deliveryModal} 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="delivery-title"
      ref={modalRef}
    >
      <div 
        className={styles.modalOverlay} 
        onClick={handleOverlayClick}
        aria-hidden="true" 
      />
      <div className={styles.modalContent}>
        <button 
          className={styles.closeBtn} 
          onClick={onClose}
          aria-label="Close delivery options"
          type="button"
        >
          <X size={24} />
        </button>
        
        <h2 id="delivery-title" className={styles.modalTitle}>
          How do you want your items?
        </h2>
        
        <div className={styles.deliveryOptions} role="group" aria-label="Delivery methods">
          <button className={styles.optionBtn} aria-label="Shipping option" type="button">
            <Truck size={28} aria-hidden="true" />
            <span>Shipping</span>
          </button>
          <button className={styles.optionBtn} aria-label="Pickup option" type="button">
            <Package size={28} aria-hidden="true" />
            <span>Pickup</span>
          </button>
          <button className={styles.optionBtn} aria-label="Delivery option" type="button">
            <Home size={28} aria-hidden="true" />
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
        
        <button className={styles.updateBtn} type="button">
          Update address
        </button>
      </div>
    </div>
  );
});

DeliveryModal.displayName = 'DeliveryModal';

/**
 * TopBar Component - Main Header
 */
const TopBar = ({ onMobileToggle, isMobileMenuOpen = false }: TopBarProps) => {
  const router = useRouter();
  const [showDelivery, setShowDelivery] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { totalItems, subtotal } = useCart();
  const { wishlist } = useWishlist();

  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }, []);

  const toggleDelivery = useCallback(() => {
    setShowDelivery(prev => !prev);
  }, []);

  const closeDelivery = useCallback(() => {
    setShowDelivery(false);
  }, []);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    }
  }, [searchQuery, router]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  return (
    <>
      <header className={styles.topbar}>
        <div className={styles.container}>
          {/* Brand Section */}
          <Link
            href="/"
            className={styles.brandSection}
            aria-label="Go to OBAT Chemists homepage"
          >
            <Image
              src="/logo.png"
              alt="OBAT Chemists Logo"
              width={60}
              height={50}
              className={styles.brandLogo}
              priority
            />
            <span className={styles.brandName}>OBAT Chemists</span>
          </Link>

          {/* Delivery Button */}
          <button 
            className={styles.deliveryBtn}
            onClick={toggleDelivery}
            aria-label="Change delivery location"
            aria-expanded={showDelivery}
            type="button"
          >
            <MapPin size={18} aria-hidden="true" />
            <div className={styles.deliveryText}>
              <span className={styles.deliveryTitle}>Pickup or delivery?</span>
              <span className={styles.deliveryLocation}>Sacramento, 95829</span>
            </div>
          </button>

          {/* Search Bar */}
          <form 
            className={styles.searchWrapper}
            onSubmit={handleSearch}
            role="search"
          >
            <input 
              ref={searchInputRef}
              type="search"
              placeholder="Search everything at OBAT CHEMISTS..."
              className={styles.searchInput}
              aria-label="Search products"
              value={searchQuery}
              onChange={handleSearchChange}
              autoComplete="off"
              spellCheck="false"
            />
            <button 
              className={styles.searchBtn} 
              aria-label="Search"
              type="submit"
            >
              <Search size={20} />
            </button>
          </form>

          {/* Action Buttons */}
          <nav className={styles.actions} aria-label="Main navigation">
            {/* Wishlist */}
            <Link 
              href="/wishlist" 
              className={styles.actionLink} 
              aria-label={`View wishlist, ${wishlist.length} items`}
            >
              <div className={styles.iconWrapper}>
                <Heart size={24} aria-hidden="true" />
                {wishlist.length > 0 && (
                  <span className={styles.badge}>{wishlist.length}</span>
                )}
              </div>
              <div className={styles.actionText}>
                <span className={styles.actionLabel}>Wishlist</span>
                <span className={styles.actionSub}>Reorder Items</span>
              </div>
            </Link>

            {/* Account */}
            <Link 
              href="/auth/login" 
              className={styles.actionLink} 
              aria-label="Sign in to your account"
            >
              <User size={24} aria-hidden="true" />
              <div className={styles.actionText}>
                <span className={styles.actionLabel}>Sign in</span>
                <span className={styles.actionSub}>Account</span>
              </div>
            </Link>

            {/* Cart */}
            <Link 
              href="/cart" 
              className={styles.cartLink} 
              aria-label={`Shopping cart with ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}
            >
              <div className={styles.cartIconWrapper}>
                <ShoppingCart size={26} aria-hidden="true" />
                {totalItems > 0 && (
                  <span className={styles.cartBadge}>
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </div>
              <span className={styles.cartPrice}>
                {formatPrice(subtotal)}
              </span>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className={styles.mobileMenuBtn}
            onClick={onMobileToggle}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            type="button"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Delivery Modal */}
      <DeliveryModal isOpen={showDelivery} onClose={closeDelivery} />
    </>
  );
};

export default memo(TopBar);