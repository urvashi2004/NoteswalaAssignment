import styles from '../../styles/Showreel.module.css';

export default function Showreel() {
  return (
    <div className={styles.container}>
      <div className={styles.videoWrapper}>
        <iframe
          title="vimeo-player"
          src="https://player.vimeo.com/video/63019263?h=be9c5b9031"
          frameBorder="0"
          allowFullScreen
          className={styles.video}
        ></iframe>
      </div>
      <div className={styles.sectionBreak}></div>
      <div className={styles.details}>
        <div className={styles.left}>
          <h1>SHOW REEL</h1>
          <p>Year of production: 2035</p>
          <p>Running Time: 2:30 min</p>
          <p>Color / Sound / Subtitled</p>
        </div>
        <div className={styles.right}>
          <p>Here&apos;s the showreel description.</p>
          <p>I&apos;m a paragraph. Click here to add your own text and edit me. It&apos;s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I&apos;m a great place for you to tell a story and let your users know a little more about you.</p>
        </div>
      </div>
    </div>
  );
}