'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './cart.module.css';

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  stock: number;
  inStock: boolean;
  seller?: string;
  badge?: string;
}

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  discount?: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Vitron V636 3.1CH Multimedia Bluetooth Speaker System - Black (1YR WRTY)',
      price: 5730,
      originalPrice: 9000,
      image: '/speaker.jpg',
      quantity: 1,
      stock: 3,
      inStock: true,
      seller: 'JUMIA',
      badge: 'EXPRESS'
    },
    {
      id: '2',
      name: "Naviforce Men's Dual Time 30M Water Resistant Wrist Watch",
      price: 3450,
      originalPrice: 4500,
      image: '/watch.jpg',
      quantity: 1,
      stock: 4,
      inStock: true
    },
    {
      id: '3',
      name: 'Blueing 14" Laptop N3350 6GB+192GB SSD Portable Computer Student PC',
      price: 20971,
      originalPrice: 23617,
      image: '/laptop.jpg',
      quantity: 1,
      stock: 0,
      inStock: true,
      seller: 'JUMIA',
      badge: 'EXPRESS'
    },
    {
      id: '4',
      name: 'Nunix Free Standing Cooker 50*55 4-Gas Oven Cooker (WLD-560-GC)',
      price: 19999,
      image: '/cooker.jpg',
      quantity: 1,
      stock: 0,
      inStock: false
    }
  ]);

  const [wishlist] = useState<WishlistItem[]>([
    { id: 'w1', name: '1 PC Elastic fitted Bed Sh...', price: 1424, originalPrice: 3499, image: '/sheet.jpg', discount: '-5%' },
    { id: 'w2', name: '5*6 Soft Velvet Woolen D...', price: 1999, originalPrice: 4000, image: '/duvet.jpg', discount: '-50%' },
    { id: 'w3', name: 'Men Durable Boots', price: 5999, image: '/boots1.jpg', discount: '-50%' },
    { id: 'w4', name: 'Vintage Man Boots Lace-...', price: 6390, originalPrice: 12875, image: '/boots2.jpg', discount: '-42%' }
  ]);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, Math.min(item.stock || 99, item.quantity + delta));
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const { subtotal, savings } = useMemo(() => {
    const sub = cartItems.filter(i => i.inStock).reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const save = cartItems.filter(i => i.inStock).reduce((sum, item) => {
      if (item.originalPrice) return sum + ((item.originalPrice - item.price) * item.quantity);
      return sum;
    }, 0);
    return { subtotal: sub, savings: save };
  }, [cartItems]);

  const availableItems = cartItems.filter(i => i.inStock);
  const unavailableItems = cartItems.filter(i => !i.inStock);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.main}>
          <div className={styles.cartHeader}>
            <h1>Cart ({cartItems.length})</h1>
          </div>

          <div className={styles.cartSection}>
            {availableItems.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  <Image src={item.image} alt={item.name} width={80} height={80} />
                </div>
                
                <div className={styles.itemDetails}>
                  <h3>{item.name}</h3>
                  {item.stock > 0 && item.stock <= 5 && (
                    <p className={styles.stockWarning}>{item.stock} units left</p>
                  )}
                  {item.seller && (
                    <div className={styles.seller}>
                      {item.seller} {item.badge && <span className={styles.badge}>#{item.badge}</span>}
                    </div>
                  )}
                  <button onClick={() => removeItem(item.id)} className={styles.remove}>
                    Remove
                  </button>
                </div>

                <div className={styles.itemPrice}>
                  <div className={styles.priceBlock}>
                    <span className={styles.price}>KSh {item.price.toLocaleString()}</span>
                    {item.originalPrice && (
                      <>
                        <span className={styles.originalPrice}>KSh {item.originalPrice.toLocaleString()}</span>
                        <span className={styles.discount}>
                          -{Math.round((1 - item.price / item.originalPrice) * 100)}%
                        </span>
                      </>
                    )}
                  </div>
                  
                  <div className={styles.quantity}>
                    <button onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1}>−</button>
                    <input type="number" value={item.quantity} readOnly />
                    <button onClick={() => updateQuantity(item.id, 1)} disabled={item.quantity >= item.stock}>+</button>
                  </div>
                </div>
              </div>
            ))}

            {unavailableItems.map(item => (
              <div key={item.id} className={`${styles.cartItem} ${styles.outOfStock}`}>
                <div className={styles.itemImage}>
                  <Image src={item.image} alt={item.name} width={80} height={80} />
                  <span className={styles.stockBadge}>Out of Stock</span>
                </div>
                
                <div className={styles.itemDetails}>
                  <h3>{item.name}</h3>
                  <button onClick={() => removeItem(item.id)} className={styles.remove}>
                    Remove
                  </button>
                </div>

                <div className={styles.itemPrice}>
                  <span className={styles.price}>KSh {item.price.toLocaleString()}</span>
                  <button className={styles.soldOut} disabled>Sold out</button>
                </div>
              </div>
            ))}
          </div>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Wishlist ({wishlist.length})</h2>
              <Link href="/wishlist">See All</Link>
            </div>
            <div className={styles.productGrid}>
              {wishlist.map(item => (
                <div key={item.id} className={styles.productCard}>
                  {item.discount && <span className={styles.discountBadge}>{item.discount}</span>}
                  <Image src={item.image} alt={item.name} width={200} height={200} />
                  <h4>{item.name}</h4>
                  <div className={styles.cardPrice}>
                    <span>KSh {item.price.toLocaleString()}</span>
                    {item.originalPrice && <span>KSh {item.originalPrice.toLocaleString()}</span>}
                  </div>
                  <button className={styles.addBtn}>Add to cart</button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.summary}>
            <h2>CART SUMMARY</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span className={styles.summaryPrice}>KSh {subtotal.toLocaleString()}</span>
            </div>
            <button className={styles.checkoutBtn}>
              CHECKOUT (KSh {subtotal.toLocaleString()})
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;