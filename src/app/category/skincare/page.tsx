"use client";

import { useState, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

import styles from "./Skincare.module.css";

// === Product Assets ===
import pic1 from "@/assets/products/Allergy.png";
import pic2 from "@/assets/products/Anthelios.png";
import pic3 from "@/assets/products/Contraception.png";
import pic4 from "@/assets/products/Cough.png";
import pic5 from "@/assets/products/Headache.png";
import pic6 from "@/assets/products/Eno.png";
import pic7 from "@/assets/products/Diclofenac.png";
import pic8 from "@/assets/products/UTI.png";

type Offer = {
  id: string;
  name: string;
  image: any;
  discount: number;
  price: number;
  oldPrice: number;
};

const offersData: Offer[] = [
  { id: "1", name: "Allergy Relief", image: pic1, discount: 12, price: 350, oldPrice: 490 },
  { id: "2", name: "La Roche-Posay Effaclar Foaming Gel", image: pic2, discount: 12, price: 830, oldPrice: 980 },
  { id: "3", name: "Emergency Contraception", image: pic3, discount: 11, price: 1700, oldPrice: 2035 },
  { id: "4", name: "Benyllin Cough Syrup", image: pic4, discount: 15, price: 989, oldPrice: 1075 },
  { id: "5", name: "Paracetamol Headache Relief", image: pic5, discount: 15, price: 84, oldPrice: 95 },
  { id: "6", name: "ENO Antacid Relief", image: pic6, discount: 11, price: 50, oldPrice: 75 },
  { id: "7", name: "Diclofenac Pain Relief", image: pic7, discount: 15, price: 159, oldPrice: 175 },
  { id: "8", name: "Cystex Painful Urination Relief", image: pic8, discount: 15, price: 214, oldPrice: 305 },
];

const Skincare: React.FC = memo(() => {
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const { addToCart } = useCart();

  const handleAddToCart = (offer: Offer) => {
    addToCart({
      id: offer.id,
      name: offer.name,
      price: offer.price,
      image: offer.image.src,
      quantity: 1,
    });

    toast.success(`${offer.name} added to cart 🛒`, { duration: 1500 });
  };

  const closeModal = () => setPreviewImg(null);

  return (
    <section className={styles.offersSection}>
      
      {/* === Header Section === */}
      <header className={styles.header}>
        <h2 className={styles.title}>Skincare Offers</h2>

        <Link href="/buy-medicines" className={styles.viewAll}>
          View all offers →
        </Link>
      </header>

      {/* === Offers Grid === */}
      <div className={styles.offersGrid}>
        {offersData.map((offer) => (
          <div key={offer.id} className={styles.card}>
            
            <span className={styles.discountTag}>-{offer.discount}%</span>

            <div
              className={styles.imageWrapper}
              onClick={() => setPreviewImg(offer.image.src)}
            >
              <Image
                src={offer.image}
                alt={offer.name}
                width={200}
                height={200}
                className={styles.productImage}
                priority={false}
              />

              <button className={styles.quickViewBtn}>Quick View</button>
            </div>

            <div className={styles.info}>
              <p className={styles.name}>{offer.name}</p>

              <div className={styles.prices}>
                <span className={styles.newPrice}>
                  KSh {offer.price.toLocaleString()}
                </span>

                <span className={styles.oldPrice}>
                  KSh {offer.oldPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* === Action Buttons === */}
            <div className={styles.actions}>
              <button onClick={() => handleAddToCart(offer)} className={styles.addToCart}>
                <ShoppingCart size={18} strokeWidth={2} />
                Add to Cart
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* === Quick View Modal === */}
      {previewImg && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <Image
              src={previewImg}
              alt="Product Preview"
              width={450}
              height={450}
              className={styles.modalImage}
            />

            <button className={styles.closeBtn} onClick={closeModal}>✕</button>
          </div>
        </div>
      )}

    </section>
  );
});

export default Skincare;
