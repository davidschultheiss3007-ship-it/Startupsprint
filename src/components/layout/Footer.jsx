import { brand } from '../../data/content.js'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div>
          <p className={styles.logo}>{brand.name}</p>
          <p className={styles.claim}>Wir finden, was du schon lange suchst.</p>
        </div>
        <nav className={styles.links} aria-label="Rechtliches">
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
          <a href="#/faq">FAQ</a>
          <a href="#/impressum">Impressum</a>
          <a href="#datenschutz">Datenschutz</a>
        </nav>
      </div>
      <div className={`container ${styles.bottom}`}>
        © {new Date().getFullYear()} {brand.name}
      </div>
    </footer>
  )
}
