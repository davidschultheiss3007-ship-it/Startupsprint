import { imprint, privacy } from '../../data/content.js'
import styles from './LegalPage.module.css'

export default function PrivacyPage() {
  const { company, address, email, phone } = imprint

  return (
    <section className={styles.page} aria-labelledby="privacy-title">
      <div className={`container ${styles.inner}`}>
        <h1 id="privacy-title" className={styles.title}>{privacy.title}</h1>
        <p className={styles.lead}>{privacy.lead}</p>

        <div className={styles.facts}>
          <div className={styles.block}>
            <h2>Verantwortlich</h2>
            <address>
              <strong>{company}</strong>
              {address.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
          </div>
          <div className={styles.block}>
            <h2>Datenschutz-Kontakt</h2>
            <dl className={styles.list}>
              <dt>E-Mail</dt>
              <dd><a href={`mailto:${email}`}>{email}</a></dd>
              <dt>Telefon</dt>
              <dd><a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a></dd>
            </dl>
          </div>
          <div className={styles.block}>
            <h2>Auf einen Blick</h2>
            <ul>
              {privacy.summary.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.legal}>
          {privacy.sections.map((section) => (
            <div key={section.title} className={styles.block}>
              <h2>{section.title}</h2>
              {section.body.map((part) =>
                Array.isArray(part) ? (
                  <ul key={part[0]}>
                    {part.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p key={part}>{part}</p>
                ),
              )}
            </div>
          ))}
          <p className={styles.updated}>{privacy.updated}</p>
        </div>
      </div>
    </section>
  )
}
