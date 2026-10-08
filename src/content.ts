// Alle Texte der Seite an einer Stelle.
// Quelle: Businessplan.md. Alles in [eckigen Klammern] ist ein offener Platzhalter
// und muss vom Team mit echten Angaben ersetzt werden – nichts davon erfinden.

export const CTA_LABEL = 'Auf die Warteliste'
export const CTA_NOTE = 'Trag dich ein, und wir schicken dir Angebot und Preis per E-Mail.'
export const CTA_TARGET = '#warteliste'

// Optional: Adresse, an die das Formular die Einträge per POST (JSON) schickt,
// z. B. ein Formular-Dienst oder eine Cloudflare Function. Leer = Demo-Modus:
// Das Formular zeigt die Bestätigung, speichert aber nichts.
export const FORM_ENDPOINT = ''

export const brand = 'RareFind'

export const hero = {
  eyebrow: 'Für Sammler von Auto-Raritäten, Trading Cards und Retro-Games',
  title: 'Wir finden, was du schon lange suchst.',
  sub: 'Dir fehlt ein bestimmtes Teil, eine Karte oder ein Spiel? Sag uns genau, was du suchst. Wir suchen bei Händlern, Auktionen und in Sammlergruppen für dich.',
}

export const problem = {
  kicker: 'Das Problem',
  title: 'In den Worten von Sammlern',
  lead: 'Seltene Stücke sind über viele Plattformen, Länder und private Verkäufer verstreut.',
  quotes: [
    '[Zitat 1 aus einem Kundengespräch, wörtlich, ohne Namen]',
    '[Zitat 2 aus einem Kundengespräch, wörtlich, ohne Namen]',
    '[Zitat 3 aus einem Kundengespräch, wörtlich, ohne Namen]',
  ],
}

export const steps = {
  kicker: 'So funktioniert es',
  title: 'Drei Schritte bis zu deinem Fundstück',
  items: [
    {
      title: 'Du sagst uns, was du suchst',
      text: 'Welches Stück, welche Ausführung, welcher Zustand und wie viel du ausgeben willst.',
    },
    {
      title: 'Wir suchen und prüfen',
      text: 'Bei Händlern, Auktionen, in Sammlergruppen und über Kontakte. Wir vergleichen und prüfen Zustand und Herkunft, so gut es geht.',
    },
    {
      title: 'Du entscheidest',
      text: 'Du bekommst einen klaren Vorschlag: was wir gefunden haben, in welchem Zustand und woher. Erst wenn du Ja sagst, geht es weiter.',
    },
  ],
}

export const evidence = {
  kicker: 'Belege',
  title: 'Was wir bisher wissen',
  items: [
    { value: '[Zahl]', label: 'Gespräche mit Sammlern und Händlern' },
    { value: '[Zahl]', label: 'erste Zusagen: [welche Art von Zusage]' },
  ],
  notes: [
    { title: 'Was wir gehört haben', text: '[Was ihr in den Gesprächen gehört habt]' },
    { title: 'Eigene Erfahrung', text: '[Eure eigene Erfahrung mit der Suche nach Sammlerstücken]' },
  ],
}

export const waitlist = {
  kicker: 'Warteliste',
  title: 'Was suchst du?',
  lead: 'Trag dich ein. Ein paar Worte zu deiner Suche helfen uns.',
  categories: ['Auto-Raritäten', 'Trading Cards', 'Retro-Gaming', 'Etwas anderes'],
  success: 'Danke, du bist eingetragen. Wir schicken dir Angebot und Preis per E-Mail.',
}

// Fragen 1–4 stammen aus dem Businessplan, nicht aus Gesprächen.
// Das Team muss sie mit echten Einwänden aus den Gesprächen bestätigen oder ersetzen.
export const faq = {
  kicker: 'Fragen und Antworten',
  title: 'Was Sammler uns fragen',
  items: [
    {
      q: 'Findet ihr jedes Stück?',
      a: 'Nein, das können wir nicht versprechen. Wir sagen dir ehrlich, wenn die Suche wenig Aussicht hat.',
    },
    {
      q: 'Woher weiß ich, dass das Stück echt ist?',
      a: 'Wir prüfen Verkäufer, Fotos, Herkunft und Echtheitsmerkmale, so gut es geht. Mängel und Unsicherheiten schreiben wir offen dazu.',
    },
    {
      q: 'Warum suche ich nicht einfach selbst?',
      a: 'Kannst du. Wir sparen dir die Zeit für Suche, Vergleich und Kontakt mit Verkäufern.',
    },
    {
      q: 'Was sucht ihr nicht?',
      a: 'Nichts Gefälschtes, Gestohlenes oder Verbotenes.',
    },
    {
      q: '[Einwand aus euren Gesprächen]',
      a: '[Antwort in höchstens zwei Sätzen]',
    },
  ],
}

export const contact = {
  kicker: 'Kontakt',
  title: 'Fragen? Schreib uns.',
  email: '[E-Mail-Adresse]',
}

export const legal = {
  name: '[Name]',
  address: '[ladungsfähige Anschrift]',
  email: '[E-Mail-Adresse]',
  hosting: 'Cloudflare Pages ([Hosting-Anbieter: Firma und Anschrift])',
  formTool: '[Formular-Tool]',
  payment: '[Bezahldienst]',
}
