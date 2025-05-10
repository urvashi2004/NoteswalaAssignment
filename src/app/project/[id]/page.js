"use client";

import { projects } from "../../../data/data";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";

export default function ProjectPage() {
  const { id } = useParams();
  const projectIndex = parseInt(id, 10);
  const project = projects[projectIndex];
  const [showFullImage, setShowFullImage] = useState(false);

  useEffect(() => {
    if (showFullImage) {
      document.body.classList.add("hide-content");
    } else {
      document.body.classList.remove("hide-content");
    }
    return () => document.body.classList.remove("hide-content");
  }, [showFullImage]);

  if (!project) return <p>Loading...</p>;

  const prevIndex = projectIndex > 0 ? projectIndex - 1 : projects.length - 1;
  const nextIndex = (projectIndex + 1) % projects.length;

  if (showFullImage) {
    return (
      <div className={styles.fullImageContainer} onClick={() => setShowFullImage(false)}>
        <Image src={project.image} alt={project.title} width={500} height={300} className={styles.fullImageOnly} />
      </div>
    );
  }

  return (
    <div className={styles.projectPage}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.description}>It&apos;s a project description.</p>
      </div>
      <Image
        src={project.image}
        alt={project.title}
        width={500}
        height={300}
        className={styles.fullImage}
        onClick={() => setShowFullImage(true)}
      />
      <div className={styles.navigationButtons}>
        <Link href={`/project/${prevIndex}`} className={styles.button}>
          <span>&lt;</span> Previous Project
        </Link>
        <Link href={`/project/${nextIndex}`} className={styles.button}>
          Next Project <span>&gt;</span>
        </Link>
      </div>
    </div>
  );
}
