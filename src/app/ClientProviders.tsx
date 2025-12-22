//src/app/ClientProviders.tsx
// ClientProviders.tsx (CLIENT)

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Toaster } from "react-hot-toast";

import Footer from "@/components/footer/Footer";
import BottomNav from "@/components/footer/BottomNav";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import Loader from "@/components/common/Loader";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);

    const timeout = setTimeout(() => {
      if (active) setLoading(false);
    }, 500);

    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [pathname]);

  return (
    <CartProvider>
      <WishlistProvider>
        <Toaster position="top-center" />

        {loading && <Loader mode="fullscreen" />}

        <LayoutWrapper />

        <main>{children}</main>

        <Footer />
        <BottomNav />
      </WishlistProvider>
    </CartProvider>
  );
}
