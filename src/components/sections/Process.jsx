import { process } from '../../data/content.js'
import SectionHeading from '../ui/SectionHeading.jsx'
import styles from './Process.module.css'

export default function Process() {
  return (
    <section id="ablauf" className="section" aria-labelledby="process-title">
      <div className={`container ${styles.grid}`}>
        <div data-reveal>
          <SectionHeading id="process-title" eyebrow={process.eyebrow} title={process.title} />
        </div>
        <ol className={styles.steps}>
          {process.steps.map((step, i) => (
            <li key={step.title} className={styles.step} data-reveal style={{ transitionDelay: `${i * 100}ms` }}>
              <span className={styles.number}>{i + 1}</span>
              <div>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.text}>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
