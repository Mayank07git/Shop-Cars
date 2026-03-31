import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.logo}>
          SHOP CARS
        </Link>
        
        {/* The Hamburger Icon (only visible on mobile) */}
        <button className={styles.menuBtn} onClick={toggleMenu}>
          ☰
        </button>

        {/* The Sliding Drawer Links */}
        <div className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
          <button className={styles.closeBtn} onClick={toggleMenu}>×</button>
          
          <Link href="/" className={styles.link} onClick={toggleMenu}>Home</Link>
          <Link href="/cars" className={styles.link} onClick={toggleMenu}>Buy a Car</Link>
          <Link href="#" className={styles.link} onClick={toggleMenu}>Sell a Car</Link>
          <Link href="#" className={styles.link} onClick={toggleMenu}>Contact Us</Link>
        </div>
      </nav>

      {/* The Dark Background Overlay (clicks also close the menu) */}
      {isOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}
    </>
  );
}
