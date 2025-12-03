"use client";

import { useState } from "react";
import TopBar from "@/components/header/TopBar";
import Navbar from "@/components/header/Navbar";

/**
 * LayoutWrapper: Manages the shared state for the responsive header components.
 * Ensures TopBar receives the correct props to toggle between Menu ↔ X icons.
 */
export default function LayoutWrapper() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle the menu open/close state
  const toggleMenu = () => setMobileMenuOpen(prev => !prev);

  return (
    <>
      {/* TopBar now receives BOTH props:
          - onMobileToggle → menu toggle function
          - isMobileMenuOpen → controls Menu ↔ X icon */}
      <TopBar 
        onMobileToggle={toggleMenu}
        isMobileMenuOpen={mobileMenuOpen}
      />

      {/* Navbar receives the open state and close function */}
      <Navbar 
        isOpen={mobileMenuOpen}
        onClose={toggleMenu}
      />
    </>
  );
}
