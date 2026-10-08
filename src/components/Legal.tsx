import { legal } from '../content'

export default function Legal() {
  return (
    <div className="legal">
      <section id="impressum" className="wrap legal__section" tabIndex={-1}>
        <h2>Impressum</h2>
        <h3>Angaben gemäß § 5 DDG</h3>
        <p>
          {legal.name}
          <br />
          {legal.address}
        </p>
        <h3>Kontakt</h3>
        <p>E-Mail: {legal.email}</p>
        <h3>Verantwortlich für den Inhalt</h3>
        <p>
          {legal.name}, {legal.address}
        </p>
        <p className="legal__note">Diese Seite ist ein studentisches Projekt im Modul Startupsprint.</p>
      </section>

      <section id="datenschutz" className="wrap legal__section" tabIndex={-1}>
        <h2>Datenschutz</h2>

        <h3>Wer ist verantwortlich?</h3>
        <p>
          {legal.name}, {legal.address}, E-Mail: {legal.email}
        </p>

        <h3>Hosting</h3>
        <p>
          Diese Seite liegt bei {legal.hosting}. Wenn du sie aufrufst, verarbeitet der Anbieter technisch nötige Daten wie
          deine IP-Adresse, Datum und Uhrzeit und Angaben zu deinem Browser. Nur so kommt die Seite bei dir an und läuft
          sicher. Grundlage ist unser berechtigtes Interesse an einer sicheren Seite (Art. 6 Abs. 1 lit. f DSGVO).
        </p>

        <h3>Warteliste</h3>
        <p>
          Wenn du dich einträgst, verarbeiten wir deine E-Mail-Adresse, die gewählte Kategorie und deine Beschreibung. Wir
          nutzen sie nur, um dir Angebot und Preis per E-Mail zu schicken. Grundlage ist deine Einwilligung (Art. 6 Abs. 1
          lit. a DSGVO). Die Daten werden über {legal.formTool} übermittelt und gespeichert. Du kannst deine Einwilligung
          jederzeit per E-Mail an {legal.email} widerrufen. Dann löschen wir deine Daten.
        </p>

        <h3>Bezahlung</h3>
        <p>Auf dieser Seite bezahlst du nichts. Bezahldienst: {legal.payment}.</p>

        <h3>Keine Cookies, kein Tracking</h3>
        <p>
          Wir setzen keine Cookies und nutzen keine Analyse-Tools. Schriften und alle Programmteile werden mit der Seite
          ausgeliefert. Es werden keine Inhalte von anderen Anbietern nachgeladen.
        </p>

        <h3>Deine Rechte</h3>
        <p>
          Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und
          Widerspruch. Du kannst dich auch bei einer Datenschutz-Aufsichtsbehörde beschweren. Schreib uns dafür an{' '}
          {legal.email}.
        </p>
      </section>
    </div>
  )
}
