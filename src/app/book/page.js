"use client"

import styles from '../../styles/Book.module.css';
import Image from 'next/image';
import Image8 from '../../../public/images/Image8.jpg';
import Image2 from '../../../public/images/Image2.jpg';
import Image9 from '../../../public/images/Image9.jpeg';
import { useRouter } from 'next/navigation';

export default function BookOnline() {
  const router = useRouter();

  const cards = [
    { title: 'TV COMMERCIAL', subtitle: '1 hr', description: 'Creative Meeting', image: Image8 },
    { title: 'FASHION VIDEO', subtitle: '1 hr', description: 'Creative Meeting', image: Image2 },
    { title: 'MUSIC VIDEO', subtitle: '1 hr', description: 'Creative Meeting', image: Image9 },
  ];

  const handleCardClick = (title) => {
    router.push(`/book/schedule?title=${encodeURIComponent(title)}`);
  };

  return (
    <div className={styles.container}>
      {cards.map((card, index) => (
        <div
          key={index}
          className={styles.card}
          onClick={() => handleCardClick(card.title)}
          style={{ cursor: 'pointer' }}
        >
          <Image src={card.image} alt={card.title} className={styles.image} />
          <div className={styles.text}>
            <h2>{card.title}</h2>
            <p>{card.subtitle}</p>
            <p>{card.description}</p>
            <button className={styles.bookNow}>BOOK NOW</button>
          </div>
        </div>
      ))}
    </div>
  );
}