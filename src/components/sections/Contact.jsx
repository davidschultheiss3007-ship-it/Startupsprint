import { contact } from '../../data/content.js'
import ContactForm from '../form/ContactForm.jsx'
import Icon from '../ui/Icon.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import styles from './Contact.module.css'

export default function Contact() {
  return (
    <section id="anfrage" className={styles.contact} aria-labelledby="contact-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <SectionHeading id="contact-title" invert eyebrow={contact.eyebrow} title={contact.title} text={contact.text} />
          <ul className={styles.promise}>
            {contact.promise.map((p) => (
              <li key={p}>
                <Icon name="check" size={20} strokeWidth={2.2} />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.formCard}>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
