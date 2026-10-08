import { contact } from '../content'

export default function Contact() {
  return (
    <section id="kontakt" className="section contact">
      <div className="wrap">
        <p className="kicker" data-reveal>
          {contact.kicker}
        </p>
        <h2 data-reveal>{contact.title}</h2>
        {/* Bewusst kein mailto-Link: Die Seite hat nur einen Knopf und keine Links nach außen. */}
        <p className="contact__mail" data-reveal>
          {contact.email}
        </p>
      </div>
    </section>
  )
}
