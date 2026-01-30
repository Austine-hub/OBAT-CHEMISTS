//src/app/orders/page.tsx
'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getOrders, clearOrders } from '@/utils/orderStorage';
import { Order, OrderFilter, OrderStatus } from '@/types/order';
import styles from './Orders.module.css';

/* ==========================================
   Constants
========================================== */

const FILTER_OPTIONS: readonly OrderFilter[] = ['all', 'pending', 'completed', 'cancelled'];

/* ==========================================
   Helper Functions
========================================== */

const formatCurrency = (value: number): string => `KSh ${value.toLocaleString()}`;

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return `Today at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
  }

  if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const getStatusBadge = (status: OrderStatus) => {
  const badges: Record<OrderStatus, { label: string; className: string }> = {
    pending: { label: 'Pending', className: styles.statusPending },
    confirmed: { label: 'Confirmed', className: styles.statusConfirmed },
    dispatched: { label: 'Dispatched', className: styles.statusDispatched },
    delivered: { label: 'Delivered', className: styles.statusDelivered },
    cancelled: { label: 'Cancelled', className: styles.statusCancelled },
    completed: { label: 'Completed', className: styles.statusCompleted },
  };
  return badges[status] || badges.pending;
};

/* ==========================================
   Main Component
========================================== */

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<OrderFilter>('all');
  const [isInitialized, setIsInitialized] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  /* -----------------------------
     Load Orders
  ----------------------------- */

  useEffect(() => {
    try {
      const storedOrders = getOrders();
      setOrders(storedOrders);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  /* -----------------------------
     Computed Values
  ----------------------------- */

  const filteredOrders = useMemo(() => {
    if (filter === 'all') return orders;
    return orders.filter((order) => order.status === filter);
  }, [orders, filter]);

  const orderStats = useMemo(() => {
    const stats = {
      total: orders.length,
      pending: 0,
      completed: 0,
      cancelled: 0,
      totalSpent: 0,
    };

    orders.forEach((order) => {
      stats.totalSpent += order.pricing.total;

      if (order.status === 'pending') stats.pending++;
      else if (order.status === 'completed' || order.status === 'delivered') stats.completed++;
      else if (order.status === 'cancelled') stats.cancelled++;
    });

    return stats;
  }, [orders]);

  /* -----------------------------
     Event Handlers
  ----------------------------- */

  const handleClearHistory = useCallback(() => {
    if (
      window.confirm(
        'Are you sure you want to clear your entire order history? This action cannot be undone.'
      )
    ) {
      try {
        clearOrders();
        setOrders([]);
        setExpandedOrder(null);
      } catch (error) {
        console.error('Failed to clear orders:', error);
        alert('Failed to clear order history. Please try again.');
      }
    }
  }, []);

  const toggleOrderExpansion = useCallback((orderId: string) => {
    setExpandedOrder((prev) => (prev === orderId ? null : orderId));
  }, []);

  /* -----------------------------
     Render States
  ----------------------------- */

  if (!isInitialized) {
    return (
      <div className={styles.container}>
        <div className={styles.loader}>
          <div className={styles.spinner} />
          <p>Loading order history...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
          <h2>No Orders Yet</h2>
          <p>You haven't placed any orders. Start shopping to see your order history here.</p>
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
        <header className={styles.header}>
          <div className={styles.titleGroup}>
            <h1>Order History</h1>
            <span className={styles.orderCount}>
              {orders.length} {orders.length === 1 ? 'order' : 'orders'}
            </span>
          </div>
          <button
            onClick={handleClearHistory}
            className={styles.clearBtn}
            aria-label="Clear order history"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Clear History
          </button>
        </header>

        {/* Order Statistics */}
        <section className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Total Orders</p>
              <p className={styles.statValue}>{orderStats.total}</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Total Spent</p>
              <p className={styles.statValue}>{formatCurrency(orderStats.totalSpent)}</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Pending</p>
              <p className={styles.statValue}>{orderStats.pending}</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Completed</p>
              <p className={styles.statValue}>{orderStats.completed}</p>
            </div>
          </div>
        </section>

        {/* Filter Tabs */}
        <nav className={styles.filterTabs} role="tablist" aria-label="Order filter">
          {FILTER_OPTIONS.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`${styles.filterTab} ${filter === tab ? styles.filterTabActive : ''}`}
              role="tab"
              aria-selected={filter === tab}
              aria-label={`Show ${tab} orders`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab !== 'all' && (
                <span className={styles.filterCount}>
                  {orderStats[tab as keyof typeof orderStats]}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Orders List */}
        <section className={styles.ordersList}>
          {filteredOrders.length === 0 ? (
            <div className={styles.noResults}>
              <p>No {filter !== 'all' ? filter : ''} orders found.</p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const isExpanded = expandedOrder === order.id;
              const statusBadge = getStatusBadge(order.status);

              return (
                <article key={order.id} className={styles.orderCard}>
                  <button
                    onClick={() => toggleOrderExpansion(order.id)}
                    className={styles.orderHeader}
                    aria-expanded={isExpanded}
                    aria-label={`${isExpanded ? 'Collapse' : 'Expand'} order details`}
                  >
                    <div className={styles.orderHeaderLeft}>
                      <div className={styles.orderIcon}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                      </div>
                      <div className={styles.orderInfo}>
                        <h3>Order #{order.id.slice(0, 8).toUpperCase()}</h3>
                        <p className={styles.orderDate}>{formatDate(order.createdAt)}</p>
                      </div>
                    </div>

                    <div className={styles.orderHeaderRight}>
                      <span className={`${styles.statusBadge} ${statusBadge.className}`}>
                        {statusBadge.label}
                      </span>
                      <span className={styles.orderTotal}>
                        {formatCurrency(order.pricing.total)}
                      </span>
                      <svg
                        className={`${styles.expandIcon} ${isExpanded ? styles.expandIconRotated : ''}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className={styles.orderDetails}>
                      <div className={styles.orderSummary}>
                        <div className={styles.summaryRow}>
                          <span>Subtotal</span>
                          <span>{formatCurrency(order.pricing.subtotal)}</span>
                        </div>
                        <div className={styles.summaryRow}>
                          <span>Delivery Fee</span>
                          <span>
                            {order.pricing.deliveryFee === 0
                              ? 'Free'
                              : formatCurrency(order.pricing.deliveryFee)}
                          </span>
                        </div>
                        <div className={styles.summaryTotal}>
                          <span>Total</span>
                          <span>{formatCurrency(order.pricing.total)}</span>
                        </div>
                      </div>

                      <div className={styles.itemsList}>
                        <h4>Items ({order.items.length})</h4>
                        {order.items.map((item) => (
                          <div key={item.id} className={styles.orderItem}>
                            <div className={styles.itemImage}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={60}
                                height={60}
                                priority={false}
                              />
                            </div>
                            <div className={styles.itemInfo}>
                              <h5>{item.name}</h5>
                              <p className={styles.itemQuantity}>Qty: {item.quantity}</p>
                            </div>
                            <div className={styles.itemPrice}>
                              <span>{formatCurrency(item.price * item.quantity)}</span>
                              <span className={styles.itemPriceUnit}>
                                {item.quantity} × {formatCurrency(item.price)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              );
            })
          )}
        </section>

        <footer className={styles.footer}>
          <Link href="/" className={styles.continueBtn}>
            Continue Shopping
          </Link>
        </footer>
      </div>
    </div>
  );
}