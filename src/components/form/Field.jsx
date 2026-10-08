import styles from './Form.module.css'

/** Beschriftetes Eingabefeld mit Fehlermeldung. `as="textarea"` für mehrzeilige Felder. */
export default function Field({ label, name, error, hint, optional, as: Tag = 'input', ...rest }) {
  const id = `field-${name}`
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(' ') || undefined
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {optional && <span className={styles.optional}>optional</span>}
      </label>
      <Tag
        id={id}
        name={name}
        className={`${styles.input} ${error ? styles.invalid : ''}`}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        {...rest}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className={styles.hint}>
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
