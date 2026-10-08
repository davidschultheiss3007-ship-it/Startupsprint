import { brand } from '../data/content.js'

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT

const budgetLabels = {
  low: 'bis 250 €',
  mid: '250 – 1.000 €',
  high: 'über 1.000 €',
  open: 'noch offen',
}

/**
 * Sendet die Anfrage an VITE_FORM_ENDPOINT (JSON-POST).
 * Ist kein Endpunkt konfiguriert, wird das E-Mail-Programm mit vorausgefüllter Nachricht geöffnet.
 */
export async function submitInquiry(values) {
  const payload = {
    name: values.name.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    request: values.request.trim(),
    budget: budgetLabels[values.budget] ?? '',
    contactVia: values.contactVia,
    createdAt: new Date().toISOString(),
  }

  if (!ENDPOINT) {
    const body = [
      `Name: ${payload.name}`,
      `E-Mail: ${payload.email}`,
      payload.phone && `Telefon: ${payload.phone}`,
      payload.budget && `Budget: ${payload.budget}`,
      `Kontakt bevorzugt per: ${payload.contactVia === 'phone' ? 'Telefon' : 'E-Mail'}`,
      '',
      payload.request,
    ]
      .filter((line) => line !== false && line !== '')
      .join('\n')
    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent('Anfrage über RareFind')}&body=${encodeURIComponent(body)}`
    return { ok: true, via: 'mailto' }
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Senden fehlgeschlagen (${res.status})`)
  return { ok: true, via: 'endpoint' }
}
