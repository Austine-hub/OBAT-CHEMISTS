'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, X } from 'lucide-react';
import Link from 'next/link';
import styles from './Navbar.module.css';

interface Column {
  title?: string;
  items: string[];
}

interface MenuSection {
  title: string;
  columns: Column[];
}

interface MenuData {
  departments: MenuSection;
  services: MenuSection;
  more: MenuSection;
}

interface NavbarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems: string[] = [
  'Deals & More',
  'New Arrivals',
  'Holiday Shop',
  'Get it Fast',
  'Dinner Made Easy',
  'Gift Shop',
  'My Items',
];

const menuData: MenuData = {
  departments: {
    title: 'Departments',
    columns: [
      {
        title: 'Electronics',
        items: ['Computers', 'Tablets', 'TVs', 'Cameras', 'Audio', 'Wearables', 'Gaming'],
      },
      {
        title: 'Home & Kitchen',
        items: ['Furniture', 'Appliances', 'Bedding', 'Decor', 'Kitchen'],
      },
      {
        title: 'Fashion',
        items: ['Clothing', 'Shoes', 'Jewelry', 'Accessories', 'Watches'],
      },
    ],
  },
  services: {
    title: 'Services',
    columns: [
      {
        items: ['Pharmacy', 'Auto Care', 'Photo Center', 'Financial Services', 'Vision Center'],
      },
    ],
  },
  more: {
    title: 'More',
    columns: [
      {
        items: ['Registry', 'Protection Plans', 'Credit Cards', 'Gift Cards', 'Subscriptions'],
      },
    ],
  },
};

export default function Navbar({ isOpen, onClose }: NavbarProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(e.target as Node)) {
      setActiveDropdown(null);
    }
  }, []);

  useEffect(() => {
    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [activeDropdown, handleClickOutside]);

  const toggleDropdown = (key: string) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  const handleNavLinkClick = () => {
    onClose();
    setActiveDropdown(null);
  };

  const renderDropdown = (section: MenuSection) => (
    <div className={styles.dropdown} role="menu">
      {section.columns.map((col, idx) => (
        <div key={idx} className={styles.column}>
          {col.title && <h3 className={styles.columnTitle}>{col.title}</h3>}
          <ul className={styles.columnList}>
            {col.items.map((item, i) => (
              <li key={i} className={styles.columnItem}>
                <Link href="#" role="menuitem" onClick={handleNavLinkClick}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <nav 
      className={`${styles.navbar} ${isOpen ? styles.open : ''}`} 
      ref={navRef} 
      aria-label="Main navigation"
    >
      <div className={styles.mobileHeader}>
        <h2 className={styles.mobileTitle}>Shop by Category</h2>
        <button 
          onClick={onClose} 
          className={styles.closeBtn} 
          aria-label="Close mobile navigation"
        >
          <X size={24} />
        </button>
      </div>

      <div className={styles.container}>
        <div className={styles.desktopNav}>
          <div className={styles.dropdownWrapper}>
            <button
              className={`${styles.navBtn} ${activeDropdown === 'departments' ? styles.active : ''}`}
              onClick={() => toggleDropdown('departments')}
              aria-expanded={activeDropdown === 'departments'}
              aria-haspopup="true"
            >
              Departments <ChevronDown size={16} aria-hidden="true" />
            </button>
            {activeDropdown === 'departments' && renderDropdown(menuData.departments)}
          </div>

          <div className={styles.dropdownWrapper}>
            <button
              className={`${styles.navBtn} ${activeDropdown === 'services' ? styles.active : ''}`}
              onClick={() => toggleDropdown('services')}
              aria-expanded={activeDropdown === 'services'}
              aria-haspopup="true"
            >
              Services <ChevronDown size={16} aria-hidden="true" />
            </button>
            {activeDropdown === 'services' && renderDropdown(menuData.services)}
          </div>

          {navItems.map((item) => (
            <Link key={item} href="#" className={styles.navLink} onClick={handleNavLinkClick}>
              {item}
            </Link>
          ))}

          <div className={styles.dropdownWrapper}>
            <button
              className={`${styles.navBtn} ${activeDropdown === 'more' ? styles.active : ''}`}
              onClick={() => toggleDropdown('more')}
              aria-expanded={activeDropdown === 'more'}
              aria-haspopup="true"
            >
              More <ChevronDown size={16} aria-hidden="true" />
            </button>
            {activeDropdown === 'more' && renderDropdown(menuData.more)}
          </div>
        </div>
      </div>
    </nav>
  );
}