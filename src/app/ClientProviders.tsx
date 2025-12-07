// ==================================
// ClientProviders.tsx (CLIENT)
// ==================================
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { CartProvider } from "@/context/CartContext";
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

  // global route-change loader
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
      <Toaster position="top-center" />

      {/* Global loader */}
      {loading && <Loader mode="fullscreen" />}

      {/* Top header + nav */}
      <LayoutWrapper />

      {/* Content */}
      <main>{children}</main>

      {/* Footer */}
      <Footer />
      <BottomNav />
    </CartProvider>
  );
}
