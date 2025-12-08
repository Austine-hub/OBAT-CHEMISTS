"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Heart, ShoppingCart, ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import styles from "./DetailsPage.module.css";

// MVC: import Controller / Data helpers
import { getProductById, formatPrice, parseId, Product as ProductModel } from "@/data/details/products";

interface LocalState {
  quantity: number;
  addedMessage: string | null;
}

export default function DetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = parseId(params?.id ?? null);

  const [product, setProduct] = useState<ProductModel | null>(null);
  const [state, setState] = useState<LocalState>({
    quantity: 1,
    addedMessage: null
  });

  const announceRef = useRef<HTMLDivElement | null>(null);

  // Fetch product safely
  useEffect(() => {
    if (id === null) {
      setProduct(null);
      return;
    }
    setProduct(getProductById(id) ?? null);
  }, [id]);

  // A11y live region announcer
  useEffect(() => {
    if (!state.addedMessage || !announceRef.current) return;

    announceRef.current.textContent = state.addedMessage;

    const t = setTimeout(() => {
      if (announceRef.current) announceRef.current.textContent = "";
      setState((s) => ({ ...s, addedMessage: null }));
    }, 2600);

    return () => clearTimeout(t);
  }, [state.addedMessage]);

  // Invalid ID case
  if (id === null) {
    return (
      <main className={styles.container} aria-live="polite">
        <section className={styles.notFound}>
          <h2>Invalid product</h2>
          <p>The URL does not contain a valid product ID.</p>

          <button className={styles.backBtn} onClick={() => router.push("/products")}>
            Back to products
          </button>
        </section>
      </main>
    );
  }

  // Product missing case
  if (!product) {
    return (
      <main className={styles.container}>
        <section className={styles.notFound}>
          <h2>Product not found</h2>
          <p>Try browsing other items.</p>

          <button className={styles.backBtn} onClick={() => router.push("/products")}>
            Back to products
          </button>
        </section>
      </main>
    );
  }

  // Add to cart
  const onAddToCart = () => {
    setState((s) => ({
      ...s,
      addedMessage: `${state.quantity} × ${product.name} added to cart.`
    }));
  };

  // Add to wishlist
  const onAddToWishlist = () => {
    setState((s) => ({
      ...s,
      addedMessage: `${product.name} added to your wishlist.`
    }));
  };

  // Safe quantity change
  const changeQuantity = (qty: number) => {
    if (Number.isNaN(qty) || qty < 1) return;
    setState((s) => ({ ...s, quantity: qty }));
  };

  return (
    <main className={styles.container}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <button
          onClick={() => router.back()}
          className={styles.backBtn}
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
          <span className={styles.backText}>Back</span>
        </button>

        <ol className={styles.crumbList}>
          <li>
            <button onClick={() => router.push("/")} className={styles.link}>
              Home
            </button>
          </li>
          <li>
            <button onClick={() => router.push("/products")} className={styles.link}>
              Products
            </button>
          </li>
          <li aria-current="page" className={styles.current}>
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Product Content */}
      <section className={styles.productGrid}>
        <figure className={styles.imageCol}>
          <div className={styles.imageWrapper}>
            <Image
              src={product.image}
              alt={product.name}
              width={800}
              height={800}
              className={styles.productImage}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
            />
          </div>
          <figcaption className={styles.srOnly}>
            {product.name} — product image
          </figcaption>
        </figure>

        <aside className={styles.detailsCol}>
          <h1 className={styles.title}>{product.name}</h1>

          <div className={styles.priceRow}>
            <p className={styles.price}>{formatPrice(product.price)}</p>
            <p className={styles.stock}>In stock</p>
          </div>

          <p className={styles.description}>
            {product.description ?? "No description available."}
          </p>

          {/* Quantity + Buttons */}
          <div className={styles.controls}>
            <label htmlFor="quantity" className={styles.quantityLabel}>
              Quantity
            </label>

            <div className={styles.quantityRow}>
              <button
                aria-label="Decrease quantity"
                onClick={() => changeQuantity(state.quantity - 1)}
                className={styles.qtyBtn}
              >
                -
              </button>

              <input
                id="quantity"
                className={styles.qtyInput}
                inputMode="numeric"
                value={state.quantity}
                onChange={(e) => {
                  const n = parseInt(e.target.value, 10);
                  changeQuantity(Number.isFinite(n) ? n : 1);
                }}
              />

              <button
                aria-label="Increase quantity"
                onClick={() => changeQuantity(state.quantity + 1)}
                className={styles.qtyBtn}
              >
                +
              </button>
            </div>

            <div className={styles.actionRow}>
              <button className={styles.primaryBtn} onClick={onAddToCart}>
                <ShoppingCart size={18} aria-hidden="true" />
                <span>Add to cart</span>
              </button>

              <button className={styles.ghostBtn} onClick={onAddToWishlist}>
                <Heart size={18} aria-hidden="true" />
                <span>Add to wishlist</span>
              </button>
            </div>
          </div>

          {/* Meta */}
          <div className={styles.meta}>
            <dl>
              <div className={styles.metaRow}>
                <dt>Category</dt>
                <dd>{product.category ?? "—"}</dd>
              </div>

              <div className={styles.metaRow}>
                <dt>Tags</dt>
                <dd>{product.tags?.join(", ") || "—"}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </section>

      {/* Live region */}
      <div aria-live="polite" aria-atomic="true" ref={announceRef} className={styles.srOnly} />
    </main>
  );
}
