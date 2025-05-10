import { projects } from "../data/data";
import styles from "./ImageGallery.module.css";
import Link from "next/link";

export default function ImageGallery() {
  return (
    <div className={styles.galleryContainer}>
      {projects.slice(0, 7).map((project, index) => (
        <div key={index} className={styles.imageWrapper}>
          <Link href={`/project/${index}`}>
            <img
              src={project.image}
              alt={project.title}
              className={styles.galleryImage}
            />
          </Link>
          <h2 className={styles.imageTitle}>{project.title}</h2>
        </div>
      ))}
    </div>
  );
}
