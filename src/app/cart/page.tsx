// src/app/cart/page.tsx
'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './cart.module.css';

const WHATSAPP_PHONE = '254700000000'; // Update with actual Obat Pharmacy number

export default function CartPage() {
  const {
    items,
    availableItems,
    unavailableItems,
    subtotal,
    totalItems,
    removeItem,
    updateQuantity,
    isInitialized,
  } = useCart();

  const handleQuantityChange = useCallback(
    (id: string, delta: number) => {
      const item = items.find((i) => i.id === id);
      if (!item) return;
      
      const newQuantity = item.quantity + delta;
      const maxStock = item.stock || 999;
      
      if (newQuantity >= 1 && newQuantity <= maxStock) {
        updateQuantity(id, newQuantity);
      }
    },
    [items, updateQuantity]
  );

  const handleWhatsAppCheckout = useCallback(() => {
    if (availableItems.length === 0) {
      alert('Your cart is empty or contains only unavailable items');
      return;
    }

    const itemsList = availableItems
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.name}\n   Qty: ${item.quantity} × KSh ${item.price.toLocaleString()} = KSh ${(
            item.price * item.quantity
          ).toLocaleString()}`
      )
      .join('\n\n');

    const message = `Hello Obat Pharmacy! 🛒

I would like to place an order:

${itemsList}

*Total Amount: KSh ${subtotal.toLocaleString()}*
*Total Items: ${totalItems}*

Please confirm availability and delivery details. Thank you!`;

    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [availableItems, subtotal, totalItems]);

  if (!isInitialized) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading cart...</div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add items to get started</p>
          <Link href="/" className={styles.shopBtn}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <main className={styles.main}>
          <header className={styles.header}>
            <h1>Shopping Cart ({items.length})</h1>
          </header>

          {/* Available Items */}
          {availableItems.length > 0 && (
            <section className={styles.section}>
              {availableItems.map((item) => {
                const discount = item.originalPrice
                  ? Math.round((1 - item.price / item.originalPrice) * 100)
                  : 0;
                const isLowStock = item.stock && item.stock <= 5;

                return (
                  <article key={item.id} className={styles.item}>
                    <div className={styles.itemImage}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                        priority={false}
                      />
                    </div>

                    <div className={styles.itemDetails}>
                      <h3>{item.name}</h3>
                      
                      {isLowStock && (
                        <p className={styles.stockAlert}>
                          Only {item.stock} left in stock
                        </p>
                      )}

                      {item.seller && (
                        <div className={styles.seller}>
                          <span>{item.seller}</span>
                          {item.badge && (
                            <span className={styles.badge}>{item.badge}</span>
                          )}
                        </div>
                      )}

                      <button
                        onClick={() => removeItem(item.id)}
                        className={styles.removeBtn}
                        aria-label={`Remove ${item.name}`}
                      >
                        Remove
                      </button>
                    </div>

                    <div className={styles.itemActions}>
                      <div className={styles.priceBlock}>
                        <span className={styles.price}>
                          KSh {item.price.toLocaleString()}
                        </span>
                        {item.originalPrice && (
                          <div className={styles.discount}>
                            <span className={styles.originalPrice}>
                              KSh {item.originalPrice.toLocaleString()}
                            </span>
                            <span className={styles.discountBadge}>
                              -{discount}%
                            </span>
                          </div>
                        )}
                      </div>

                      <div className={styles.quantity}>
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          readOnly
                          aria-label="Quantity"
                        />
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          disabled={item.quantity >= (item.stock || 999)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>
          )}

          {/* Unavailable Items */}
          {unavailableItems.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Unavailable Items</h2>
              {unavailableItems.map((item) => (
                <article key={item.id} className={styles.itemUnavailable}>
                  <div className={styles.itemImage}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                    />
                    <span className={styles.outOfStockBadge}>
                      Out of Stock
                    </span>
                  </div>

                  <div className={styles.itemDetails}>
                    <h3>{item.name}</h3>
                    <button
                      onClick={() => removeItem(item.id)}
                      className={styles.removeBtn}
                      aria-label={`Remove ${item.name}`}
                    >
                      Remove
                    </button>
                  </div>

                  <div className={styles.itemActions}>
                    <span className={styles.price}>
                      KSh {item.price.toLocaleString()}
                    </span>
                  </div>
                </article>
              ))}
            </section>
          )}
        </main>

        {/* Sidebar Summary */}
        <aside className={styles.sidebar}>
          <div className={styles.summary}>
            <h2>Order Summary</h2>

            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span className={styles.summaryPrice}>
                KSh {subtotal.toLocaleString()}
              </span>
            </div>

            <div className={styles.summaryRow}>
              <span>Items</span>
              <span>{totalItems}</span>
            </div>

            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>KSh {subtotal.toLocaleString()}</span>
            </div>

            <button
              onClick={handleWhatsAppCheckout}
              className={styles.checkoutBtn}
              disabled={availableItems.length === 0}
              aria-label="Complete order via WhatsApp"
            >
              <span className={styles.btnIcon}>🛒</span>
              Order via WhatsApp
            </button>

            <p className={styles.checkoutNote}>
              You&apos;ll complete your order through WhatsApp with Obat
              Pharmacy
            </p>
          </div>

          <Link href="/" className={styles.continueBtn}>
            Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}