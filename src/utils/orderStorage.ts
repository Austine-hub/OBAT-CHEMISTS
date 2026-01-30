// utils/orderStorage.ts
import type { Order, OrderPricing } from "@/types/order";

const ORDERS_KEY = "pharmacy_orders";

/* -----------------------------
   Validation
----------------------------- */

const isBrowser = typeof window !== "undefined";

/** Validate and sanitize pricing object */
const validatePricing = (pricing: unknown): OrderPricing => {
  const p = pricing as Partial<OrderPricing> | null | undefined;
  
  const subtotal = typeof p?.subtotal === "number" ? p.subtotal : 0;
  const deliveryFee = typeof p?.deliveryFee === "number" ? p.deliveryFee : 0;
  
  return {
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    currency: "KES",
  };
};

/** Validate and sanitize order object */
const validateOrder = (data: unknown): Order | null => {
  if (!data || typeof data !== "object") return null;
  
  const order = data as Partial<Order>;
  
  if (!order.id || !order.items || !Array.isArray(order.items)) return null;
  
  return {
    id: String(order.id),
    items: order.items,
    pricing: validatePricing(order.pricing),
    status: order.status || "pending",
    createdAt: order.createdAt || new Date().toISOString(),
    updatedAt: order.updatedAt,
    whatsappSent: order.whatsappSent,
  };
};

/* -----------------------------
   Storage API
----------------------------- */

export const getOrders = (): Order[] => {
  if (!isBrowser) return [];
  
  try {
    const data = localStorage.getItem(ORDERS_KEY);
    if (!data) return [];
    
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];
    
    return parsed.map(validateOrder).filter((o): o is Order => o !== null);
  } catch (err) {
    console.error("Failed to load orders:", err);
    return [];
  }
};

export const saveOrder = (order: Order): void => {
  if (!isBrowser) return;
  
  try {
    const validOrder = validateOrder(order);
    if (!validOrder) {
      console.error("Invalid order data");
      return;
    }
    
    const existing = getOrders();
    const updated = [validOrder, ...existing];
    
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to save order:", err);
  }
};

export const clearOrders = (): void => {
  if (!isBrowser) return;
  
  try {
    localStorage.removeItem(ORDERS_KEY);
  } catch (err) {
    console.error("Failed to clear orders:", err);
  }
};