// src/types/cart.ts

import type { StaticImageData } from "next/image";

/* ============================================
   Cart Item
============================================ */

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;

  image: string | StaticImageData;

  /* Optional metadata */
  originalPrice?: number;
  stock?: number;
  inStock?: boolean;

  seller?: string;
  badge?: string;
  category?: string;
  description?: string;
  variation?: string;
  discount?: number;
}

/* ============================================
   Cart State
============================================ */

export interface CartState {
  items: CartItem[];
  initialized: boolean;
}

/* ============================================
   Cart Context API
============================================ */

export interface CartContextValue {
  readonly items: CartItem[];
  readonly availableItems: CartItem[];
  readonly unavailableItems: CartItem[];

  readonly subtotal: number;
  readonly totalItems: number;
  readonly isInitialized: boolean;

  addItem: (item: CartItem) => void;
  addToCart: (item: CartItem) => void;

  removeItem: (id: CartItem["id"]) => void;
  updateQuantity: (id: CartItem["id"], quantity: number) => void;
  clearCart: () => void;
}
