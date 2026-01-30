// types/order.ts

/* ==========================================
   Shared Utility Types
========================================== */

/** ISO 8601 Date string */
export type ISODateString = string;

/** Supported currencies */
export type Currency = "KES";

/* ==========================================
   Cart / Order Item
========================================== */

export interface CartItem {
  readonly id: string;           // Unique identifier
  readonly name: string;         // Product name
  readonly price: number;        // Unit price in `Currency`
  readonly quantity: number;     // Quantity ordered
  readonly image: string;        // URL or path to image

  /** Optional / future-proof fields */
  readonly brand?: string;
  readonly prescriptionRequired?: boolean;
  readonly category?: string;
  readonly seller?: string;
  readonly variation?: string;
  readonly discount?: number;    // % discount if applicable
}

/* ==========================================
   Order Status & Filters
========================================== */

/** Valid order statuses */
export const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "dispatched",
  "delivered",
  "cancelled",
  "completed",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

/** Filters for querying orders */
export type OrderFilter = "all" | OrderStatus;

/* ==========================================
   Order Pricing Breakdown
========================================== */

export interface OrderPricing {
  readonly subtotal: number;      // Sum of item prices
  readonly deliveryFee: number;   // Delivery charges
  readonly total: number;         // subtotal + deliveryFee
  readonly currency: Currency;
}

/* ==========================================
   Full Order Type
========================================== */

export interface Order {
  readonly id: string;                 // Unique order ID
  readonly items: readonly CartItem[]; // Items in the order
  readonly pricing: OrderPricing;      // Pricing breakdown
  readonly status: OrderStatus;        // Current order status
  readonly createdAt: ISODateString;   // ISO string timestamp
  readonly updatedAt?: ISODateString;  // Optional last update timestamp
  readonly whatsappSent?: boolean;     // Whether sent to WhatsApp
}
