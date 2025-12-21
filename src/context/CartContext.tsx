//src/context/CartContext.tsx

"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import type { StaticImageData } from "next/image";

/* ========================================================================== */
/* Types                                                                      */
/* ========================================================================== */

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string | StaticImageData;

  /* Optional commerce metadata */
  originalPrice?: number;
  stock?: number;        // numeric stock limit
  inStock?: boolean;     // availability flag
  seller?: string;
  badge?: string;
  category?: string;
  description?: string;
  variation?: string;
  discount?: number;
}

interface CartState {
  items: CartItem[];
  initialized: boolean;
}

type CartAction =
  | { type: "INIT"; payload: CartItem[] }
  | { type: "ADD"; payload: CartItem }
  | { type: "REMOVE"; payload: string }
  | { type: "UPDATE_QTY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR" };

export interface CartContextValue {
  /* State */
  items: CartItem[];
  availableItems: CartItem[];
  unavailableItems: CartItem[];

  /* Totals */
  subtotal: number;
  totalItems: number;
  isInitialized: boolean;

  /* Actions (stable public API) */
  addToCart: (item: CartItem) => void;
  addItem: (item: CartItem) => void;        // alias (legacy-safe)
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

/* ========================================================================== */
/* Context                                                                    */
/* ========================================================================== */

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "obat_cart_v2";

/* ========================================================================== */
/* Utilities                                                                  */
/* ========================================================================== */

const clamp = (val: number, min: number, max: number) =>
  Math.max(min, Math.min(max, val));

const sanitizeItem = (item: CartItem): CartItem => {
  const safeStock = typeof item.stock === "number" && item.stock > 0
    ? item.stock
    : 999;

  return {
    ...item,
    price: Math.max(0, item.price),
    quantity: clamp(Math.floor(item.quantity || 1), 1, safeStock),
    inStock: item.inStock ?? true,
    stock: safeStock,
  };
};

const validateStoredItems = (data: unknown): CartItem[] => {
  if (!Array.isArray(data)) return [];

  return data.filter(
    (i): i is CartItem =>
      typeof i === "object" &&
      i !== null &&
      typeof i.id === "string" &&
      typeof i.name === "string" &&
      typeof i.price === "number"
  );
};

/* ========================================================================== */
/* Reducer                                                                    */
/* ========================================================================== */

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "INIT":
      return {
        items: action.payload.map(sanitizeItem),
        initialized: true,
      };

    case "ADD": {
      const item = sanitizeItem(action.payload);
      const index = state.items.findIndex((i) => i.id === item.id);

      if (index >= 0) {
        const updated = [...state.items];
        const existing = updated[index];

        updated[index] = {
          ...existing,
          quantity: clamp(
            existing.quantity + item.quantity,
            1,
            existing.stock ?? 999
          ),
        };

        return { ...state, items: updated };
      }

      return { ...state, items: [...state.items, item] };
    }

    case "REMOVE":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };

    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id
            ? {
                ...i,
                quantity: clamp(
                  action.payload.quantity,
                  1,
                  i.stock ?? 999
                ),
              }
            : i
        ),
      };

    case "CLEAR":
      return { ...state, items: [] };

    default:
      return state;
  }
};

/* ========================================================================== */
/* Provider                                                                   */
/* ========================================================================== */

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    initialized: false,
  });

  const saveTimer = useRef<NodeJS.Timeout | null>(null);

  /* Load from storage */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? validateStoredItems(JSON.parse(raw)) : [];
      dispatch({ type: "INIT", payload: parsed });
    } catch {
      dispatch({ type: "INIT", payload: [] });
    }
  }, []);

  /* Persist (debounced) */
  useEffect(() => {
    if (!state.initialized) return;

    if (saveTimer.current) clearTimeout(saveTimer.current);

    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
      } catch {
        /* silent fail */
      }
    }, 250);
  }, [state.items, state.initialized]);

  /* Cross-tab sync */
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;

      try {
        const parsed = e.newValue
          ? validateStoredItems(JSON.parse(e.newValue))
          : [];
        dispatch({ type: "INIT", payload: parsed });
      } catch {}
    };

    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  /* Actions */
  const addItem = useCallback(
    (item: CartItem) => dispatch({ type: "ADD", payload: item }),
    []
  );

  const removeItem = useCallback(
    (id: string) => dispatch({ type: "REMOVE", payload: id }),
    []
  );

  const updateQuantity = useCallback(
    (id: string, quantity: number) =>
      dispatch({ type: "UPDATE_QTY", payload: { id, quantity } }),
    []
  );

  const clearCart = useCallback(
    () => dispatch({ type: "CLEAR" }),
    []
  );

  /* Derived values */
  const availableItems = useMemo(
    () => state.items.filter((i) => i.inStock !== false),
    [state.items]
  );

  const unavailableItems = useMemo(
    () => state.items.filter((i) => i.inStock === false),
    [state.items]
  );

  const subtotal = useMemo(
    () =>
      availableItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      ),
    [availableItems]
  );

  const totalItems = useMemo(
    () => state.items.reduce((sum, i) => sum + i.quantity, 0),
    [state.items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      availableItems,
      unavailableItems,
      subtotal,
      totalItems,
      isInitialized: state.initialized,

      /* Public API */
      addToCart: addItem, // 🔑 FIXES YOUR ERROR
      addItem,            // legacy-safe
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [
      state.items,
      availableItems,
      unavailableItems,
      subtotal,
      totalItems,
      state.initialized,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/* ========================================================================== */
/* Hooks                                                                      */
/* ========================================================================== */

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}

export const useCartCount = () => useCart().totalItems;
export const useCartTotal = () => useCart().subtotal;
