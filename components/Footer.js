import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Top Section with Logo and Tagline */}
      <div className={styles.topSection}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logo}>SHOP CARS</Link>
          <span className={styles.divider}></span>
          <span className={styles.tagline}>Better drives, better lives</span>
        </div>
      </div>

      {/* 4 Grid Columns */}
      <div className={styles.linksContainer}>
        {/* Column 1 */}
        <div className={styles.column}>
          <h4>COMPANY</h4>
          <ul className={styles.columnList}>
            <li><Link href="#">About Us</Link></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className={styles.column}>
          <h4>DISCOVER</h4>
          <ul className={styles.columnList}>
            <li><Link href="/cars">Buy a Car</Link></li>
            <li><Link href="#">Sell a Car</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className={styles.column}>
          <h4>HELP & SUPPORT</h4>
          <ul className={styles.columnList}>
            <li><Link href="#">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className={styles.column}>
          <h4>SOCIAL LINKS</h4>
          <div className={styles.socialLinks}>
            {/* Fake icons for Instagram and LinkedIn */}
            <a href="#" className={styles.socialIcon}>IG</a>
            <a href="#" className={styles.socialIcon}>LI</a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className={styles.bottomSection}>
        <p>© 2026 Shop Cars. Built by Mayank.</p>
      </div>
    </footer>
  );
}
