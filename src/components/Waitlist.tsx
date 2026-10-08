import { useId, useState, type FormEvent } from 'react'
import { FORM_ENDPOINT, waitlist } from '../content'
import { sceneState } from '../motion'
import { CtaSubmit } from './CtaButton'

type Status = 'idle' | 'busy' | 'done' | 'error'

async function submitWaitlist(data: Record<string, string>) {
  if (!FORM_ENDPOINT) {
    // Demo-Modus: Es wird nichts gespeichert oder verschickt.
    await new Promise((r) => setTimeout(r, 700))
    return
  }
  const res = await fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
}

export default function Waitlist() {
  const id = useId()
  const [status, setStatus] = useState<Status>('idle')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.reportValidity()) return
    const fd = new FormData(form)
    setStatus('busy')
    try {
      await submitWaitlist({
        email: String(fd.get('email') ?? ''),
        kategorie: String(fd.get('kategorie') ?? ''),
        suche: String(fd.get('suche') ?? ''),
      })
      setStatus('done')
      sceneState.burst = 1
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="warteliste" className="section waitlist" tabIndex={-1}>
      <div className="wrap">
        <div className="waitlist__card card" data-reveal>
          <p className="kicker">{waitlist.kicker}</p>
          <h2>{waitlist.title}</h2>
          <p className="lead">{waitlist.lead}</p>

          {status === 'done' ? (
            <div className="waitlist__done" role="status">
              <svg viewBox="0 0 52 52" width="56" height="56" aria-hidden="true">
                <circle cx="26" cy="26" r="24" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
                <path d="M15 27l7 7 15-16" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p>{waitlist.success}</p>
            </div>
          ) : (
            <form className="form" onSubmit={onSubmit} noValidate>
              <div className="field">
                <label htmlFor={`${id}-email`}>Deine E-Mail-Adresse</label>
                <input
                  id={`${id}-email`}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  placeholder="du@beispiel.de"
                  data-autofocus
                />
              </div>
              <div className="field">
                <label htmlFor={`${id}-cat`}>Was sammelst du?</label>
                <div className="select">
                  <select id={`${id}-cat`} name="kategorie" defaultValue="">
                    <option value="" disabled>
                      Bitte wählen
                    </option>
                    {waitlist.categories.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor={`${id}-suche`}>
                  Was suchst du genau? <span className="optional">(freiwillig)</span>
                </label>
                <textarea
                  id={`${id}-suche`}
                  name="suche"
                  rows={3}
                  maxLength={600}
                  placeholder="Zum Beispiel Edition, Variante, Zustand, Budget"
                />
              </div>
              <label className="check">
                <input type="checkbox" name="einwilligung" required />
                <span>
                  Ihr dürft meine Angaben speichern, um mir Angebot und Preis per E-Mail zu schicken. Mehr dazu im{' '}
                  <a href="#datenschutz">Datenschutz</a>.
                </span>
              </label>
              <CtaSubmit busy={status === 'busy'} />
              {status === 'error' && (
                <p className="form__error" role="alert">
                  Das hat nicht geklappt. Bitte versuch es noch einmal.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
