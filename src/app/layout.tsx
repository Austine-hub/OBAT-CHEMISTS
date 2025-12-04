import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Use absolute paths for all imports for consistency
import { CartProvider } from "@/context/CartContext"; 
import { Toaster } from "react-hot-toast";

import Footer from "@/components/footer/Footer";
import BottomNav from "@/components/footer/BottomNav";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

// --------------------
// Fonts
// --------------------
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --------------------
// Page Metadata
// --------------------
export const metadata: Metadata = {
  title: "OBAT CHEMISTS", // Optimized placeholder title
  description: "E-commerce layout integrating TopBar and Navbar components.",
};

// --------------------
// Root Layout Component
// --------------------
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <CartProvider>
          <Toaster position="top-center" />

          {/* CLIENT-SIDE HEADER (TopBar + Navbar managed by state in LayoutWrapper) */}
          <LayoutWrapper />

          {/* MAIN CONTENT */}
          <main>{children}</main> {/* Wrapped children in <main> tag for semantics */}

          {/* FOOTER */}
          <Footer />
          <BottomNav />
        </CartProvider>
      </body>
    </html>
  );
}