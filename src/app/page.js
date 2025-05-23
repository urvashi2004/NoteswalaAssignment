// app/page.js
import styles from './page.module.css';
import ImageGallery from '../components/ImageGallery';  // Assuming you have a gallery component
import Image from 'next/image';

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.headerContainer}>
        <Image
          src="/images/Image1.jpg" // Replace with your actual image
          alt="Adam Scharf"
          width={500}
          height={300}
          className={styles.headerImage}
        />
        <div className={styles.headerText}>
          <h1 className={styles.name}>ADAM SCHARF</h1>
          <p className={styles.title}><br/>ART DIRECTOR</p>
        </div>
      </div>
      <ImageGallery /> 
    </div>
  );
}
