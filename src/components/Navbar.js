'use client';

import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import styles from '../styles/Navbar.module.css';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>ADAM SCHARF</div>
      <nav className={`${styles.links} ${isMenuOpen ? styles.showMenu : ''}`}>
        <Link href="/" className={`${styles.navButton} ${pathname === '/' ? styles.active : ''}`}>HOME</Link>
        <Link href="/showreel" className={`${styles.navButton} ${pathname === '/showreel' ? styles.active : ''}`}>SHOW REEL</Link>
        <Link href="/about" className={`${styles.navButton} ${pathname === '/about' ? styles.active : ''}`}>ABOUT</Link>
        <Link href="/book" className={`${styles.navButton} ${pathname === '/book' ? styles.active : ''}`}>BOOK ONLINE</Link>
      </nav>
      <div className={styles.auth}>
        <button className={styles.menuToggle} onClick={toggleMenu}>
          {isMenuOpen ? '✖' : '☰'}
        </button>
        <FaUser />
        <Link href="/login">Log In</Link>
      </div>
    </header>
  );
}
