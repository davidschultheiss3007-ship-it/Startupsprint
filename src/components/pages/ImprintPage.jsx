import { imprint } from '../../data/content.js'
import styles from './ImprintPage.module.css'

export default function ImprintPage() {
  const { company, address, representedBy, phone, email, register, vatId, responsible } = imprint

  return (
    <section className={styles.page} aria-labelledby="imprint-title">
      <div className={`container ${styles.inner}`}>
        <h1 id="imprint-title" className={styles.title}>{imprint.title}</h1>

        <div className={styles.facts}>
          <div className={styles.block}>
            <h2>Angaben gemäß § 5 DDG</h2>
            <address>
              <strong>{company}</strong>
              {address.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
          </div>

          <div className={styles.block}>
            <h2>Vertreten durch</h2>
            <p>Geschäftsführung: {representedBy.join(', ')}</p>
          </div>

          <div className={styles.block}>
            <h2>Kontakt</h2>
            <dl className={styles.list}>
              <dt>Telefon</dt>
              <dd><a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a></dd>
              <dt>E-Mail</dt>
              <dd><a href={`mailto:${email}`}>{email}</a></dd>
            </dl>
          </div>

          <div className={styles.block}>
            <h2>Registereintrag</h2>
            <dl className={styles.list}>
              <dt>Registergericht</dt>
              <dd>{register.court}</dd>
              <dt>Registernummer</dt>
              <dd>{register.number}</dd>
            </dl>
          </div>

          <div className={styles.block}>
            <h2>Umsatzsteuer-ID</h2>
            <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: {vatId}</p>
          </div>

          <div className={styles.block}>
            <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
            <p>{responsible.name}, {responsible.address}</p>
          </div>
        </div>

        <div className={styles.legal}>
          <div className={styles.block}>
            <h2>Verbraucherstreitbeilegung</h2>
            <p>
              Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen. Bei Fragen oder Problemen wende dich gern direkt an uns –
              wir finden eine Lösung.
            </p>
          </div>

          <div className={styles.block}>
            <h2>Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen
              zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen
              bleiben hiervon unberührt. Eine diesbezügliche Haftung ist erst ab dem Zeitpunkt der Kenntnis einer
              konkreten Rechtsverletzung möglich. Sobald uns entsprechende Rechtsverletzungen bekannt werden,
              entfernen wir diese Inhalte umgehend.
            </p>
          </div>

          <div className={styles.block}>
            <h2>Haftung für Links</h2>
            <p>
              Unser Angebot enthält gegebenenfalls Links zu externen Websites Dritter, auf deren Inhalte wir keinen
              Einfluss haben. Für diese fremden Inhalte übernehmen wir keine Gewähr; verantwortlich ist stets der
              jeweilige Anbieter oder Betreiber der Seiten. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung
              auf mögliche Rechtsverstöße überprüft. Eine permanente inhaltliche Kontrolle ist ohne konkrete
              Anhaltspunkte einer Rechtsverletzung jedoch nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen
              entfernen wir derartige Links umgehend.
            </p>
          </div>

          <div className={styles.block}>
            <h2>Urheberrecht</h2>
            <p>
              Die durch uns erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
              Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Soweit
              Inhalte nicht von uns erstellt wurden, werden die Urheberrechte Dritter beachtet. Solltest du trotzdem
              auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
