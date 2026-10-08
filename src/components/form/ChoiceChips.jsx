import styles from './Form.module.css'

/** Auswahl als große, gut tippbare Chips (Radio-Gruppe). */
export default function ChoiceChips({ legend, name, options, value, onChange, optional }) {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.label}>
        {legend}
        {optional && <span className={styles.optional}>optional</span>}
      </legend>
      <div className={styles.chips}>
        {options.map((opt) => (
          <label key={opt.value} className={`${styles.chip} ${value === opt.value ? styles.chipActive : ''}`}>
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(name, opt.value)}
              className="visually-hidden"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
