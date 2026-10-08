const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Gibt ein Objekt { feldname: fehlermeldung } zurück – leer, wenn alles passt. */
export function validateInquiry(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Bitte gib deinen Namen an.'
  if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Bitte gib eine gültige E-Mail-Adresse an.'
  if (values.request.trim().length < 10) errors.request = 'Beschreib kurz, was du suchst (mind. 10 Zeichen).'
  if (values.contactVia === 'phone' && values.phone.trim().length < 6) {
    errors.phone = 'Bitte gib deine Telefonnummer an.'
  }
  if (!values.consent) errors.consent = 'Bitte stimme der Kontaktaufnahme zu.'
  return errors
}
