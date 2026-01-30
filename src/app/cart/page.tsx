//src/app/cart/page.tsx

'use client';

import { useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { saveOrder } from '@/utils/orderStorage';
import { Order } from '@/types/order';
import styles from './cart.module.css';

/* ==========================================
   Constants
========================================== */

const WHATSAPP_PHONE = '254796787207';
const FREE_DELIVERY_THRESHOLD = 5000;
const DELIVERY_FEE = 200;

/* ==========================================
   Helper Functions
========================================== */

const formatCurrency = (value: number): string => `KSh ${value.toLocaleString()}`;

const calculateDiscount = (price: number, originalPrice?: number): number =>
  originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;

const normalizeImage = (image: string | { src: string }): string =>
  typeof image === 'string' ? image : image.src;

/* ==========================================
   Main Component
========================================== */

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
    addToCart,
    clearCart,
  } = useCart();

  const { wishlist, removeFromWishlist } = useWishlist();

  /* -----------------------------
     Computed Values
  ----------------------------- */

  const deliveryFee = useMemo(
    () => (subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE),
    [subtotal]
  );

  const total = useMemo(() => subtotal + deliveryFee, [subtotal, deliveryFee]);

  /* -----------------------------
     Event Handlers
  ----------------------------- */

  const handleQuantityChange = useCallback(
    (id: string, delta: number) => {
      const item = items.find((i) => i.id === id);
      if (!item) return;

      const newQty = Math.max(1, Math.min(item.quantity + delta, item.stock || 999));
      updateQuantity(id, newQty);
    },
    [items, updateQuantity]
  );

  const createWhatsAppMessage = useCallback((): string => {
    if (!availableItems.length) return '';

    const itemsList = availableItems
      .map((item, index) => {
        const itemTotal = item.price * item.quantity;
        return (
          `${index + 1}. ${item.name}\n` +
          `   Qty: ${item.quantity} × ${formatCurrency(item.price)} = ${formatCurrency(itemTotal)}`
        );
      })
      .join('\n\n');

    return (
      `Hello Obat Pharmacy,\n\n` +
      `I would like to place an order:\n\n` +
      `${itemsList}\n\n` +
      `-----------------------------\n` +
      `Subtotal: ${formatCurrency(subtotal)}\n` +
      `Delivery: ${deliveryFee === 0 ? 'Free' : formatCurrency(deliveryFee)}\n` +
      `Total: ${formatCurrency(total)}\n` +
      `Items: ${totalItems}\n` +
      `-----------------------------\n\n` +
      `Please confirm availability.\n` +
      `Thank you.`
    );
  }, [availableItems, subtotal, deliveryFee, total, totalItems]);

  const handleWhatsAppCheckout = useCallback(() => {
    if (!availableItems.length) return;

    try {
      const order: Order = {
        id: uuidv4(),
        items: availableItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: normalizeImage(item.image),
        })),
        pricing: {
          subtotal,
          deliveryFee,
          total,
          currency: 'KES',
        },
        status: 'pending',
        createdAt: new Date().toISOString(),
        whatsappSent: true,
      };

      saveOrder(order);

      const message = createWhatsAppMessage();
      window.open(
        `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`,
        '_blank',
        'noopener,noreferrer'
      );
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Failed to process order. Please try again.');
    }
  }, [availableItems, subtotal, deliveryFee, total, createWhatsAppMessage]);

  const handleMoveToCart = useCallback(
    (wishItem: typeof wishlist[0]) => {
      addToCart({
        ...wishItem,
        quantity: 1,
        inStock: true,
        stock: 999,
      });
      removeFromWishlist(wishItem.id);
    },
    [addToCart, removeFromWishlist]
  );

  /* -----------------------------
     Render States
  ----------------------------- */

  if (!isInitialized) {
    return (
      <div className={styles.container}>
        <div className={styles.loader}>
          <div className={styles.spinner} />
          <p>Loading cart...</p>
        </div>
      </div>
    );
  }

  if (!items.length && !wishlist.length) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h2>Your cart is empty</h2>
          <p>Browse our products and add items to get started</p>
          <Link href="/" className={styles.shopBtn}>
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  /* -----------------------------
     Main Render
  ----------------------------- */

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <main className={styles.main}>
          <header className={styles.header}>
            <div className={styles.titleGroup}>
              <h1>Shopping Cart</h1>
              {items.length > 0 && (
                <span className={styles.itemBadge}>
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
              )}
              <button onClick={clearCart} className={styles.clearBtn}>
                Clear Cart
              </button>
            </div>
            <a href="#order-summary" className={styles.summaryLink}>
              View order summary
            </a>
          </header>

          {/* Available Items */}
          {availableItems.length > 0 && (
            <section className={styles.section}>
              {availableItems.map((item) => {
                const discount = calculateDiscount(item.price, item.originalPrice);
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
                        <span className={styles.stockAlert}>Only {item.stock} left</span>
                      )}
                      {item.seller && (
                        <div className={styles.seller}>
                          <span>{item.seller}</span>
                          {item.badge && <span className={styles.badge}>{item.badge}</span>}
                        </div>
                      )}
                      <button
                        onClick={() => removeItem(item.id)}
                        className={styles.removeBtn}
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        Remove
                      </button>
                    </div>

                    <div className={styles.itemActions}>
                      <div className={styles.priceBlock}>
                        <span className={styles.price}>{formatCurrency(item.price)}</span>
                        {item.originalPrice && (
                          <div className={styles.discount}>
                            <span className={styles.originalPrice}>
                              {formatCurrency(item.originalPrice)}
                            </span>
                            <span className={styles.discountBadge}>−{discount}%</span>
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
                        <input type="number" value={item.quantity} readOnly aria-label="Quantity" />
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
                    <Image src={item.image} alt={item.name} width={100} height={100} priority={false} />
                    <span className={styles.outOfStockBadge}>Out of Stock</span>
                  </div>
                  <div className={styles.itemDetails}>
                    <h3>{item.name}</h3>
                    <button
                      onClick={() => removeItem(item.id)}
                      className={styles.removeBtn}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                  <div className={styles.itemActions}>
                    <span className={styles.price}>{formatCurrency(item.price)}</span>
                  </div>
                </article>
              ))}
            </section>
          )}

          {/* Wishlist */}
          {wishlist.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Wishlist ({wishlist.length})</h2>
              {wishlist.map((item) => (
                <article key={item.id} className={styles.wishItem}>
                  <div className={styles.itemImage}>
                    <Image src={item.image} alt={item.name} width={100} height={100} priority={false} />
                  </div>
                  <div className={styles.itemDetails}>
                    <h3>{item.name}</h3>
                    {item.brand && <span className={styles.brand}>{item.brand}</span>}
                    <div className={styles.wishActions}>
                      <button
                        onClick={() => handleMoveToCart(item)}
                        className={styles.moveBtn}
                        aria-label={`Add ${item.name} to cart`}
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className={styles.removeBtn}
                        aria-label={`Remove ${item.name} from wishlist`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className={styles.itemActions}>
                    <span className={styles.price}>{formatCurrency(item.price)}</span>
                  </div>
                </article>
              ))}
            </section>
          )}
        </main>

        {/* Order Summary Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.summary} id="order-summary">
            <h2>Order Summary</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Delivery</span>
              <span>{deliveryFee === 0 ? 'Free' : formatCurrency(deliveryFee)}</span>
            </div>
            {deliveryFee === 0 && (
              <p className={styles.freeDelivery}>
                Free delivery on orders over {formatCurrency(FREE_DELIVERY_THRESHOLD)}
              </p>
            )}
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <button
              onClick={handleWhatsAppCheckout}
              className={styles.checkoutBtn}
              disabled={!availableItems.length}
              aria-label="Complete order via WhatsApp"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Complete Order via WhatsApp
            </button>
            <p className={styles.checkoutNote}>Secure checkout through WhatsApp</p>
          </div>
          <Link href="/" className={styles.continueBtn}>
            Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}