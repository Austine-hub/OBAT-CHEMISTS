"use client";

import { useState } from "react";
import TopBar from "@/components/header/TopBar";
import Navbar from "@/components/header/Navbar";
import styles from "./LayoutWrapper.module.css";

export default function LayoutWrapper() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => setMobileMenuOpen(prev => !prev);

  return (
    <div className={styles.layoutWrapper}>
      <TopBar 
        onMobileToggle={toggleMenu}
        isMobileMenuOpen={mobileMenuOpen}
      />

      <Navbar 
        isOpen={mobileMenuOpen}
        onClose={toggleMenu}
      />
    </div>
  );
}

