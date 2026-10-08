import { usps } from '../../data/content.js'
import Icon from '../ui/Icon.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import styles from './Usps.module.css'

export default function Usps() {
  return (
    <section id="warum" className={`section ${styles.usps}`} aria-labelledby="usps-title">
      <div className="container">
        <div data-reveal>
          <SectionHeading id="usps-title" eyebrow={usps.eyebrow} title={usps.title} />
        </div>
        <ul className={styles.grid}>
          {usps.items.map((item, i) => (
            <li key={item.title} className={styles.card} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
              <span className={styles.icon}>
                <Icon name={item.icon} size={28} />
              </span>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.text}>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
