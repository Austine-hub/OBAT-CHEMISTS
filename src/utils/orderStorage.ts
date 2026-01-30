// utils/orderStorage.ts

// utils/orderStorage.ts
import { Order } from "@/types/order";

const ORDERS_KEY = "pharmacy_orders";

/* -----------------------------
   Helpers
----------------------------- */

/** Safe localStorage access */
const isBrowser = typeof window !== "undefined";

/** Parse JSON safely */
const safeParse = <T>(value: string | null, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

/* -----------------------------
   Orders API
----------------------------- */

/** Get all stored orders (newest first) */
export const getOrders = (): Order[] => {
  if (!isBrowser) return [];
  const data = localStorage.getItem(ORDERS_KEY);
  return safeParse<Order[]>(data, []);
};

/** Save a new order */
export const saveOrder = (order: Order): void => {
  if (!isBrowser) return;

  const existingOrders = getOrders();

  const updatedOrders = [order, ...existingOrders]; // newest first

  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
  } catch (err) {
    console.error("Failed to save order:", err);
  }
};

/** Clear all orders */
export const clearOrders = (): void => {
  if (!isBrowser) return;

  try {
    localStorage.removeItem(ORDERS_KEY);
  } catch (err) {
    console.error("Failed to clear orders:", err);
  }
};
