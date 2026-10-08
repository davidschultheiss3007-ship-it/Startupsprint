import styles from './SectionHeading.module.css'

export default function SectionHeading({ eyebrow, title, text, align = 'left', invert = false, id }) {
  return (
    <header className={[styles.heading, styles[align], invert && styles.invert].filter(Boolean).join(' ')}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2 id={id} className={styles.title}>{title}</h2>
      {text && <p className={styles.text}>{text}</p>}
    </header>
  )
}
