'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from "@/styles/Cart.module.css";


interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  inStock: boolean;
}

const initialItems: CartItem[] = [
  {
    id: '1',
    name: 'Marboro KICKS7 - Stainless Steel Table Top 3-Burner Gas Cooker',
    price: 1390,
    image: '/api/placeholder/60/60',
    quantity: 1,
    inStock: true
  },
  {
    id: '2',
    name: 'Vitron AC25CE-VITRO 2.1 SPEAKER Banner Class Table Top + Woofer + Soft Bluetooth +USB + Modern 75W BT/USB/SD',
    price: 2325,
    image: '/api/placeholder/60/60',
    quantity: 1,
    inStock: true
  },
  {
    id: '3',
    name: 'NIVEA MEN Deep Active Lotion For Men - 400ml (Pack of 2)',
    price: 839,
    image: '/api/placeholder/60/60',
    quantity: 1,
    inStock: false
  },
  {
    id: '4',
    name: 'Chandon Dior Sauvage Skin - 100ml EDT',
    price: 1558,
    image: '/api/placeholder/60/60',
    quantity: 1,
    inStock: true
  },
  {
    id: '5',
    name: 'EVERBIO TEENAGER WITH YOU UNDER PERFUME',
    price: 1587,
    image: '/api/placeholder/60/60',
    quantity: 1,
    inStock: true
  }
];

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>(initialItems);

  const updateQuantity = (id: string, delta: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + 1275;

  return (
    <div className={styles.container}>
      <div className={styles.cart}>
        <h1 className={styles.title}>Cart ({items.length})</h1>

        <div className={styles.items}>
          {items.map(item => (
            <article key={item.id} className={styles.item}>
              <Image
                src={item.image}
                alt={item.name}
                width={60}
                height={60}
                className={styles.img}
              />
              
              <div className={styles.details}>
                <h2 className={styles.name}>{item.name}</h2>
                {!item.inStock && (
                  <span className={styles.stock}>Out of stock</span>
                )}
                <button
                  onClick={() => removeItem(item.id)}
                  className={styles.remove}
                  aria-label="Remove item"
                >
                  Remove
                </button>
              </div>

              <div className={styles.actions}>
                <span className={styles.price}>KSh {item.price.toLocaleString()}</span>
                <div className={styles.qty}>
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={item.quantity === 1}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <aside className={styles.summary}>
        <h2 className={styles.summaryTitle}>CART SUMMARY</h2>
        <div className={styles.row}>
          <span>Subtotal</span>
          <span>KSh {subtotal.toLocaleString()}</span>
        </div>
        <div className={styles.row}>
          <span>Delivery</span>
          <span>KSh 1,275</span>
        </div>
        <div className={styles.total}>
          <span>Total</span>
          <span>KSh {total.toLocaleString()}</span>
        </div>
        <button className={styles.checkout}>CHECKOUT (KSh {total.toLocaleString()})</button>
      </aside>

      <section className={styles.viewed}>
        <h2>Recently Viewed</h2>
        <button className={styles.seeAll}>See All</button>
      </section>

      <section className={styles.recommendations}>
        <h2>Customers who viewed this also viewed</h2>
      </section>
    </div>
  );
}