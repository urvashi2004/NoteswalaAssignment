import { projects } from "../data/data";
import styles from "./ImageGallery.module.css";
import Link from "next/link";
import Image from "next/image";

export default function ImageGallery() {
  return (
    <div className={styles.galleryContainer}>
      {projects.slice(0, 7).map((project, index) => (
        <div key={index} className={styles.imageWrapper}>
          <Link href={`/project/${index}`}>
            <Image
              src={project.image}
              alt={project.title}
              width={500}
              height={300}
              className={styles.galleryImage}
            />
          </Link>
          <h2 className={styles.imageTitle}>{project.title}</h2>
        </div>
      ))}
    </div>
  );
}
