// Alle Texte der Landingpage an einem Ort – so bleiben Komponenten schlank
// und Inhalte lassen sich ohne Code-Kenntnisse anpassen.

export const brand = {
  name: 'RareFind',
  email: import.meta.env.VITE_CONTACT_EMAIL || 'anfrage@rarefind.de',
}

export const nav = [
  { label: 'Warum RareFind', href: '#warum' },
  { label: 'Netzwerk', href: '#netzwerk' },
  { label: 'Ablauf', href: '#ablauf' },
  { label: 'Preise', href: '#preise' },
]

export const hero = {
  eyebrow: 'Schwer zu finden. Einfach für dich.',
  title: ['Seltene Dinge', 'finden lassen.'],
  lead: 'Persönliche Beratung, ein starkes Netzwerk und ein Preis, der zu deinem Fall passt.',
  primaryCta: 'Anfrage starten',
  secondaryCta: 'So funktioniert’s',
  trust: [
    { icon: 'shield', label: 'Diskret' },
    { icon: 'globe', label: 'Weltweite Quellen' },
    { icon: 'user', label: 'Persönlich' },
  ],
}

export const usps = {
  eyebrow: 'Warum RareFind',
  title: 'Wir setzen unser Wissen für dich ein.',
  items: [
    {
      icon: 'network',
      title: 'Starkes Netzwerk',
      text: 'Händler, Sammler und Auktionshäuser – weltweit.',
    },
    {
      icon: 'spark',
      title: 'Echte Expertise',
      text: 'Wir kennen Varianten, Zustände und faire Preise.',
    },
    {
      icon: 'chat',
      title: 'Persönliche Beratung',
      text: 'Ein fester Ansprechpartner von Anfang bis Fund.',
    },
    {
      icon: 'tag',
      title: 'Preis pro Fall',
      text: 'Kein Katalog – ein Angebot, das zu dir passt.',
    },
  ],
}

export const network = {
  eyebrow: 'Unsere Hauptstärke',
  title: 'Unser Netzwerk ist dein Vorteil.',
  text: 'Viele Stücke tauchen nie öffentlich auf. Wir wissen, wen wir fragen müssen.',
  sources: ['Fachhändler', 'Sammler', 'Auktionshäuser', 'Communities'],
}

export const process = {
  eyebrow: 'Ablauf',
  title: 'In drei Schritten zu deinem Fund.',
  steps: [
    { title: 'Anfrage senden', text: 'Sag uns, was du suchst.' },
    { title: 'Wir suchen gezielt', text: 'Wir fragen in unserem Netzwerk an.' },
    { title: 'Dein Angebot', text: 'Du entscheidest in Ruhe.' },
  ],
}

export const pricing = {
  eyebrow: 'Preise',
  title: 'Kein Standardpreis. Dein Preis.',
  text: 'Jede Suche ist anders. Deshalb bekommst du ein individuelles Angebot – transparent und verhandelbar.',
  points: [
    'Erstanfrage kostenlos',
    'Preis immer vor dem Kauf',
    'Offen für Verhandlung',
    'Keine versteckten Gebühren',
  ],
  cta: 'Meinen Preis erfahren',
}

export const contact = {
  eyebrow: 'Anfrage',
  title: 'Was suchst du?',
  text: 'Beschreib dein Wunschstück. Wir melden uns persönlich mit einer Einschätzung und deinem Preis.',
  promise: ['Kostenlos & unverbindlich', 'Persönliche Rückmeldung'],
}
