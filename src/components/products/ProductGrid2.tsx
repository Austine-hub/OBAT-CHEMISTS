"use client";

import Image from "next/image";
import { Heart, Eye } from "lucide-react";
import styles from "./ProductGrid2.module.css";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

const products: Product[] = [
  { id: 1, name: "Dewyglot's Lemon-Grass Essential oil 15ml", price: "KES 900.00", image: "https://via.placeholder.com/300x300/4CAF50/ffffff?text=Lemon" },
  { id: 2, name: "SKIN1004 Centella Toning Toner 210ml", price: "KES 1,132.00", image: "https://via.placeholder.com/300x300/FFA726/ffffff?text=Toner" },
  { id: 3, name: "Dewyglot's Organic Castor Oil", price: "KES 700.00", image: "https://via.placeholder.com/300x300/8B4513/ffffff?text=Castor" },
  { id: 4, name: "Cerave Intensive Moisturizing Lotion 236ml", price: "KES 2,850.00", image: "https://via.placeholder.com/300x300/2196F3/ffffff?text=Cerave" },
  { id: 5, name: "Lalo Amba-Jasmine Strengthening Hair Serum 100ml", price: "KES 2,398.00", image: "https://via.placeholder.com/300x300/1565C0/ffffff?text=Serum" },
  { id: 6, name: "Lalo Hydrating UV Defense Sunscreen SPF50 100ml", price: "KES 2,300.00", image: "https://via.placeholder.com/300x300/FFD54F/ffffff?text=SPF50" },
  { id: 7, name: "La Roche Posay Effaclar Duo+M Unipod Patches", price: "KES 2,000.00", image: "https://via.placeholder.com/300x300/64B5F6/ffffff?text=Patches" },
  { id: 8, name: "Dercos Densi-Solutions Thickening Shampoo 250ml", price: "KES 3,000.00", image: "https://via.placeholder.com/300x300/FFE082/ffffff?text=Dercos" },
  { id: 9, name: "Dercos Anti-Dandruff Shampoo Normal/Oily Hair 200ml", price: "KES 3,000.00", image: "https://via.placeholder.com/300x300/81C784/ffffff?text=Anti-D" },
  { id: 10, name: "Dercos Anti-Dandruff Shampoo - Dry Hair 200ml", price: "KES 3,000.00", image: "https://via.placeholder.com/300x300/66BB6A/ffffff?text=Dry" },
];

export default function ProductGrid() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>New at OBAT</h2>
        <a href="/products" className={styles.viewAll}>
          View All
        </a>
      </header>

      <div className={styles.grid}>
        {products.map((product) => (
          <article key={product.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                loading="lazy"
                className={styles.image}
              />

              <div className={styles.icons}>
                <button aria-label="Add to wishlist" className={styles.iconBtn}>
                  <Heart size={18} />
                </button>
                <button aria-label="Quick view" className={styles.iconBtn}>
                  <Eye size={18} />
                </button>
              </div>
            </div>

            <div className={styles.content}>
              <h3>{product.name}</h3>
              <p className={styles.price}>{product.price}</p>

              <button className={styles.addBtn}>+ Add To Cart</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

