import { pricing } from '../../data/content.js'
import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import styles from './Pricing.module.css'

export default function Pricing() {
  return (
    <section id="preise" className="section" aria-labelledby="pricing-title">
      <div className="container">
        <div className={styles.card} data-reveal>
          <SectionHeading id="pricing-title" eyebrow={pricing.eyebrow} title={pricing.title} text={pricing.text} />
          <div>
            <ul className={styles.points}>
              {pricing.points.map((p) => (
                <li key={p}>
                  <span className={styles.check}>
                    <Icon name="check" size={18} strokeWidth={2.2} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <Button href="#anfrage" size="lg" className={styles.cta}>
              {pricing.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
