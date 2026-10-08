import { brand } from '../data/content.js'

// Web3Forms-Access-Key ist öffentlich (wird ohnehin im Browser mitgeschickt) und darf im Code stehen.
// Per VITE_WEB3FORMS_KEY überschreibbar, leerer Wert schaltet auf das E-Mail-Programm um.
export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
export const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY ?? 'a705af5b-a068-40ae-8c58-25217bef35c9'
export const WEB3FORMS_SUBJECT = 'Neue Anfrage über RareFind'

const budgetLabels = {
  low: 'bis 250 €',
  mid: '250 – 1.000 €',
  high: 'über 1.000 €',
  open: 'noch offen',
}

/**
 * Sendet die Anfrage an Web3Forms (JSON-POST), die Mail landet im Postfach des Access-Keys.
 * Ist kein Key konfiguriert, wird das E-Mail-Programm mit vorausgefüllter Nachricht geöffnet.
 */
export async function submitInquiry(values) {
  const payload = {
    name: values.name.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    request: values.request.trim(),
    budget: budgetLabels[values.budget] ?? '',
    contactVia: values.contactVia === 'phone' ? 'Telefon' : 'E-Mail',
  }

  if (!WEB3FORMS_KEY) {
    const body = [
      `Name: ${payload.name}`,
      `E-Mail: ${payload.email}`,
      payload.phone && `Telefon: ${payload.phone}`,
      payload.budget && `Budget: ${payload.budget}`,
      `Kontakt bevorzugt per: ${payload.contactVia}`,
      '',
      payload.request,
    ]
      .filter((line) => line !== false && line !== '')
      .join('\n')
    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent('Anfrage über RareFind')}&body=${encodeURIComponent(body)}`
    return { ok: true, via: 'mailto' }
  }

  const res = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: WEB3FORMS_SUBJECT,
      from_name: 'RareFind Website',
      replyto: payload.email,
      botcheck: values.website,
      Name: payload.name,
      'E-Mail': payload.email,
      Telefon: payload.phone || '–',
      Gesuch: payload.request,
      Budget: payload.budget || '–',
      'Kontakt bevorzugt per': payload.contactVia,
    }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data.success) throw new Error(data.message || `Senden fehlgeschlagen (${res.status})`)
  return { ok: true, via: 'web3forms' }
}
