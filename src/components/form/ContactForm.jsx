import useContactForm from '../../hooks/useContactForm.js'
import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'
import ChoiceChips from './ChoiceChips.jsx'
import Field from './Field.jsx'
import styles from './Form.module.css'

const budgetOptions = [
  { value: 'low', label: 'bis 250 €' },
  { value: 'mid', label: '250 – 1.000 €' },
  { value: 'high', label: 'über 1.000 €' },
  { value: 'open', label: 'Noch offen' },
]

const contactOptions = [
  { value: 'email', label: 'E-Mail' },
  { value: 'phone', label: 'Telefon' },
]

export default function ContactForm() {
  const { values, errors, status, onChange, setField, onSubmit, reset } = useContactForm()

  if (status === 'success') {
    return (
      <div className={styles.success} role="status">
        <span className={styles.successIcon}>
          <Icon name="check" size={32} strokeWidth={2.2} />
        </span>
        <h3>Danke für deine Anfrage!</h3>
        <p>Wir prüfen dein Gesuch und melden uns persönlich bei dir – mit Einschätzung und Preis.</p>
        <Button variant="secondary" arrow={false} onClick={reset} type="button">
          Weitere Anfrage senden
        </Button>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <Field
        as="textarea"
        label="Was suchst du?"
        name="request"
        rows={4}
        placeholder="z. B. Pokémon-Karte Glurak, 1. Edition, guter Zustand"
        value={values.request}
        onChange={onChange}
        error={errors.request}
      />

      <ChoiceChips
        legend="Budget-Vorstellung"
        name="budget"
        optional
        options={budgetOptions}
        value={values.budget}
        onChange={setField}
      />

      <div className={styles.row}>
        <Field
          label="Name"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={onChange}
          error={errors.name}
        />
        <Field
          label="E-Mail"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={values.email}
          onChange={onChange}
          error={errors.email}
        />
      </div>

      <ChoiceChips
        legend="Wie sollen wir dich erreichen?"
        name="contactVia"
        options={contactOptions}
        value={values.contactVia}
        onChange={setField}
      />

      {values.contactVia === 'phone' && (
        <Field
          label="Telefon"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={onChange}
          error={errors.phone}
        />
      )}

      {/* Honeypot */}
      <div className="visually-hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} />
        </label>
      </div>

      <div className={styles.consent}>
        <label>
          <input type="checkbox" name="consent" checked={values.consent} onChange={onChange} aria-invalid={Boolean(errors.consent)} />
          <span>
            Ich bin einverstanden, dass RareFind mich zu meiner Anfrage kontaktiert. Mehr in der{' '}
            <a href="#datenschutz">Datenschutzerklärung</a>.
          </span>
        </label>
        {errors.consent && (
          <p className={styles.error} role="alert">
            {errors.consent}
          </p>
        )}
      </div>

      {status === 'error' && (
        <p className={styles.error} role="alert">
          Da ist etwas schiefgelaufen. Bitte versuch es noch einmal oder schreib uns direkt per E-Mail.
        </p>
      )}

      <Button type="submit" size="lg" block disabled={status === 'sending'}>
        {status === 'sending' ? 'Wird gesendet …' : 'Kostenlos Preis anfragen'}
      </Button>
    </form>
  )
}
