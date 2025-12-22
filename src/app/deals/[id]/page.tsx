//src/app/deals/[id]/page.tsx

"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";

import styles from "./DealsOfTheDayDetails.module.css";
import { getDealInKSH } from "@/data/details/deals";
import { useCart } from "@/context/CartContext";

export default function DealDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { addToCart } = useCart();

  const deal = getDealInKSH(id);
  const [toast, setToast] = useState(false);

  const handleAdd = useCallback(() => {
    if (!deal) return;

    addToCart({
      id: deal.id,
      name: deal.name,
      price: deal.priceKSH,
      quantity: 1,
      image: deal.img,
      originalPrice: deal.mrpKSH,
      discount: deal.discount,
      inStock: true,
    });

    setToast(true);
    setTimeout(() => setToast(false), 2200);
  }, [addToCart, deal]);

  if (!deal) {
    return (
      <div className={styles.notFound}>
        <p>Product not found</p>
        <Link href="/#deals">← Back to deals</Link>
      </div>
    );
  }

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <button onClick={() => router.back()} className={styles.back}>
        ← Back
      </button>

      <div className={styles.grid}>
        {/* IMAGE */}
        <div className={styles.imageWrap}>
          <Image
            src={deal.img}
            alt={deal.name}
            width={420}
            height={420}
            priority
          />
        </div>

        {/* INFO */}
        <div className={styles.info}>
          <h1>{deal.name}</h1>

          <div className={styles.priceRow}>
            <span className={styles.price}>{deal.priceFormatted}</span>
            {deal.discount > 0 && (
              <span className={styles.discount}>-{deal.discount}%</span>
            )}
          </div>

          <span className={styles.mrp}>{deal.mrpFormatted}</span>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleAdd}
            className={styles.add}
          >
            Add to cart
          </motion.button>

          {/* TRUST / UX */}
          <ul className={styles.meta}>
            <li>🚚 Free delivery over KES 2,000</li>
            <li>🔒 Secure checkout</li>
            <li>↩️ Easy returns</li>
          </ul>
        </div>
      </div>

      {/* TOAST */}
      {toast && (
        <motion.div
          className={styles.toast}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ✓ Added to cart
        </motion.div>
      )}
    </motion.div>
  );
}
