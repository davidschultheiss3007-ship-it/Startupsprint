import { faq } from '../../data/content.js'
import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import styles from './FaqPage.module.css'

export default function FaqPage() {
  return (
    <>
      <section className={styles.intro} aria-labelledby="faq-title">
        <div className="container">
          <p className={styles.eyebrow}>{faq.eyebrow}</p>
          <h1 id="faq-title" className={styles.title}>{faq.title}</h1>
          <p className={styles.lead}>{faq.lead}</p>
          <nav className={styles.jump} aria-label="FAQ-Themen">
            {faq.groups.map((group) => (
              <a key={group.id} href={`#${group.id}`}>{group.title}</a>
            ))}
          </nav>
        </div>
      </section>

      <section className={styles.compare} aria-labelledby="compare-title">
        <div className="container">
          <SectionHeading
            id="compare-title"
            eyebrow={faq.compare.eyebrow}
            title={faq.compare.title}
            text={faq.compare.text}
          />
          <ul className={styles.compareGrid}>
            {faq.compare.items.map((item, i) => (
              <li key={item.alt} className={styles.compareCard} data-reveal style={{ transitionDelay: `${i * 60}ms` }}>
                <p className={styles.alt}>{item.alt}</p>
                <p className={styles.weakness}>{item.weakness}</p>
                <p className={styles.us}>
                  <span className={styles.usBadge}>
                    <Icon name="check" size={16} strokeWidth={2.4} />
                  </span>
                  <span>
                    <strong>RareFind:</strong> {item.us}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-label="Häufige Fragen">
        <div className={`container ${styles.groups}`}>
          {faq.groups.map((group) => (
            <div key={group.id} id={group.id} className={styles.group} data-reveal>
              <h2 className={styles.groupTitle}>{group.title}</h2>
              <div className={styles.list}>
                {group.items.map((item) => (
                  <details key={item.q} className={styles.item}>
                    <summary>
                      <span>{item.q}</span>
                      <Icon name="plus" size={22} className={styles.toggle} />
                    </summary>
                    <div className={styles.answer}>
                      {item.a.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="faq-cta-title">
        <div className={`container ${styles.ctaInner}`}>
          <div>
            <h2 id="faq-cta-title" className={styles.ctaTitle}>{faq.cta.title}</h2>
            <p className={styles.ctaText}>{faq.cta.text}</p>
          </div>
          <Button href="#anfrage" variant="light" size="lg">{faq.cta.button}</Button>
        </div>
      </section>
    </>
  )
}
