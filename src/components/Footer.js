'use client';

import styles from '../styles/Footer.module.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaVimeoV } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <p>
          © 2035 by ADAM SCHARF. Powered and secured by <u>Wix</u>
        </p>
      </div>
      <div className={styles.socials}>
        <FaFacebookF />
        <FaInstagram />
        <FaTwitter />
        <FaVimeoV />
      </div>
    </footer>
  );
}
