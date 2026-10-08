import heroImage from '../../assets/hero-collage.webp'
import { hero } from '../../data/content.js'
import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <h1 id="hero-title" className={styles.title}>
            {hero.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className={styles.lead}>{hero.lead}</p>

          <div className={styles.actions}>
            <Button href="#anfrage" size="lg">{hero.primaryCta}</Button>
            <Button href="#ablauf" variant="secondary" size="lg" arrow={false}>
              {hero.secondaryCta}
            </Button>
          </div>

          <ul className={styles.trust}>
            {hero.trust.map((item) => (
              <li key={item.label}>
                <Icon name={item.icon} size={22} />
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.visual}>
          <img
            src={heroImage}
            alt="Seltene Sammelkarte, Sneaker, Baustein-Set und Bremsscheibe als Beispiele für gesuchte Raritäten"
            width="605"
            height="440"
            fetchpriority="high"
          />
        </div>
      </div>
    </section>
  )
}
