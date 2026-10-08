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
  { label: 'FAQ', href: '#/faq' },
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

export const faq = {
  eyebrow: 'FAQ',
  title: 'Ehrliche Antworten auf berechtigte Zweifel.',
  lead: 'Ein Suchservice für Raritäten wirft Fragen auf – zu Recht. Hier beantworten wir die häufigsten Einwände, ohne etwas schönzureden.',

  compare: {
    eyebrow: 'Was uns abhebt',
    title: 'Nicht noch ein Marktplatz.',
    text: 'Es gibt viele Orte, an denen Sammlerstücke angeboten werden. Wir sind keiner davon – wir suchen für dich an all diesen Orten.',
    items: [
      {
        alt: 'eBay & Kleinanzeigen',
        weakness: 'Riesige Auswahl – aber du suchst, vergleichst und prüfst Verkäufer selbst.',
        us: 'Du beschreibst deinen Wunsch einmal. Die Suche übernehmen wir.',
      },
      {
        alt: 'Spezial-Marktplätze',
        weakness: 'Gute Filter, aber meist auf eine Kategorie begrenzt.',
        us: 'Ein Ansprechpartner – egal ob Karte, Konsole oder Originalteil.',
      },
      {
        alt: 'Foren & Sammlergruppen',
        weakness: 'Viel Wissen, aber unterschiedliche Sicherheit beim Kauf.',
        us: 'Wir nutzen das Wissen der Szene – mit festem Ablauf und Dokumentation.',
      },
      {
        alt: 'Fachhändler & Auktionen',
        weakness: 'Echte Expertise, aber nur das, was gerade im Bestand ist.',
        us: 'Wir suchen gezielt dein Stück, nicht das, was zufällig da ist.',
      },
      {
        alt: 'Private Reseller',
        weakness: 'Spannende Funde, aber du bist von einer einzigen Quelle abhängig.',
        us: 'Wir vergleichen mehrere Quellen und sagen dir ehrlich, was fair ist.',
      },
    ],
  },

  groups: [
    {
      id: 'faq-konzept',
      title: 'Konzept & Mehrwert',
      items: [
        {
          q: 'Warum sollte ich nicht einfach selbst auf eBay suchen?',
          a: [
            'Kannst du – und bei Standardware ist das oft auch die beste Wahl. Bei echten Raritäten sieht es anders aus: Die passende Variante taucht verstreut auf verschiedenen Plattformen, in anderen Ländern oder nur in geschlossenen Gruppen auf. Viele Stücke werden nie öffentlich gelistet.',
            'Wir übernehmen die zeitintensive Recherche, vergleichen identische Varianten und fragen in unserem Netzwerk nach. Du bekommst am Ende eine geprüfte Auswahl statt hunderter Suchergebnisse.',
          ],
        },
        {
          q: 'Seid ihr nicht einfach Zwischenhändler, die einen Aufschlag nehmen?',
          a: [
            'Wir verdienen an der Beschaffung, ja – und sagen das offen. Der Unterschied: Du zahlst nicht für ein Produkt aus unserem Lager, sondern für Suche, Prüfung und Abwicklung deines konkreten Wunsches.',
            'Den Gesamtpreis kennst du immer, bevor etwas gekauft wird. Ist er dir zu hoch, sagst du Nein und es kostet dich nichts.',
          ],
        },
        {
          q: 'Was, wenn ich den Anbieter danach einfach selbst kontaktiere?',
          a: [
            'Das können wir nicht verhindern – und wollen es auch nicht erzwingen. Unser Mehrwert endet aber nicht beim Finden: Wir prüfen Verkäufer, Fotos und Herkunft, klären Versand und Zahlung und bleiben dein Ansprechpartner, falls etwas schiefgeht. Das ist bei internationalen Käufen und höheren Beträgen oft der eigentliche Wert.',
          ],
        },
        {
          q: 'Welche Dinge sucht ihr?',
          a: [
            'Unser Schwerpunkt liegt auf Automobil-Raritäten (Originalteile, Embleme, Zubehör, Memorabilia), Trading Cards (z. B. Pokémon, Yu-Gi-Oh!, Magic) und Retro-Gaming. Andere legale Sammlerstücke prüfen wir gern auf Anfrage.',
            'Gefälschte, gestohlene oder rechtswidrig gehandelte Gegenstände suchen wir grundsätzlich nicht.',
          ],
        },
      ],
    },
    {
      id: 'faq-preis',
      title: 'Preis & Kosten',
      items: [
        {
          q: 'Warum gibt es keinen festen Preis? Das wirkt intransparent.',
          a: [
            'Ein Festpreis wäre für dich meist schlechter: Eine leicht zu findende Karte und ein Originalteil aus Japan verursachen völlig unterschiedlichen Aufwand. Mit einem Pauschalpreis würdest du bei einfachen Suchen die schweren mitbezahlen.',
            'Deshalb rechnen wir pro Fall – und legen offen, woraus sich der Preis zusammensetzt: Einkauf, Versand und Prüfung, Gebühren und unser Anteil für die Suche.',
          ],
        },
        {
          q: 'Was kostet mich die Anfrage?',
          a: [
            'Nichts. Die Erstanfrage und unsere Einschätzung sind kostenlos und unverbindlich. Kosten entstehen erst, wenn du ein konkretes Angebot annimmst.',
          ],
        },
        {
          q: 'Ist das am Ende nicht teurer, als selbst zu kaufen?',
          a: [
            'Manchmal ja – wenn man den eigenen Zeitaufwand und das Risiko nicht mitrechnet. Wir wollen nicht der billigste Anbieter sein, sondern der verlässlichste: richtige Variante, ehrlich beschriebener Zustand, sichere Abwicklung.',
            'Ein Fehlkauf, eine Fälschung oder ein Paket, das im Zoll hängen bleibt, ist am Ende meist teurer als unser Aufschlag.',
          ],
        },
        {
          q: 'Kann ich über den Preis verhandeln?',
          a: [
            'Ja. Sag uns dein Budget gleich bei der Anfrage. Wir sagen dir ehrlich, ob es realistisch ist, und suchen gezielt in diesem Rahmen.',
          ],
        },
      ],
    },
    {
      id: 'faq-vertrauen',
      title: 'Vertrauen & Sicherheit',
      items: [
        {
          q: 'Ihr seid neu – warum sollte ich euch vertrauen?',
          a: [
            'Berechtigte Frage. Wir können noch keine jahrelange Historie vorweisen. Deshalb ist unser Ablauf so gebaut, dass du kein Risiko eingehst: Die Suche ist kostenlos, du siehst Preis und Zustand vor dem Kauf, und es wird nichts verbindlich erworben, bevor du zustimmst.',
          ],
        },
        {
          q: 'Woher weiß ich, dass ein Stück echt ist?',
          a: [
            'Wir prüfen Verkäufer, Fotos, Herkunft und bekannte Echtheitsmerkmale und dokumentieren das für dich. Bei hochpreisigen Stücken ziehen wir externe Experten hinzu.',
            'Was wir nicht tun: pauschale Echtheitsgarantien geben, die wir nicht belegen können. Wenn etwas unsicher ist, sagen wir dir das – bevor du kaufst.',
          ],
        },
        {
          q: 'Was, wenn der Zustand nicht passt?',
          a: [
            'Vor dem Kauf bekommst du Fotos und eine Zustandsbeschreibung nach festen Kriterien – inklusive Mängeln und fehlender Originalverpackung. Sollte trotzdem etwas nicht stimmen, sind wir dein Ansprechpartner. Deine gesetzlichen Rechte bleiben selbstverständlich bestehen.',
          ],
        },
        {
          q: 'Sucht ihr auch im Ausland?',
          a: [
            'Ja, weltweit. Bevorzugt arbeiten wir mit gut überprüfbaren Quellen in der EU. Bei Käufen außerhalb der EU sind Versand, Zoll und Einfuhrumsatzsteuer im Angebot bereits berücksichtigt – keine Überraschungen an der Haustür.',
          ],
        },
      ],
    },
    {
      id: 'faq-ablauf',
      title: 'Ablauf & Suche',
      items: [
        {
          q: 'Was passiert, wenn ihr nichts findet?',
          a: [
            'Dann sagen wir dir das ehrlich – und du zahlst nichts. Wir versprechen nicht, jedes Objekt zu finden. Schon bei der Anfrage schätzen wir ein, wie realistisch die Suche ist, damit du weißt, woran du bist.',
          ],
        },
        {
          q: 'Wie lange dauert eine Suche?',
          a: [
            'Das hängt stark vom Stück ab: Manches finden wir in wenigen Tagen, für echte Raritäten kann es Wochen dauern. Eine erste persönliche Einschätzung bekommst du in der Regel innerhalb von zwei Werktagen.',
          ],
        },
        {
          q: 'Wie genau muss meine Anfrage sein?',
          a: [
            'Je genauer, desto besser: Edition, Variante, gewünschter Zustand, Originalverpackung, Budget. Wenn du dir bei Details unsicher bist, ist das kein Problem – genau dafür beraten wir dich.',
          ],
        },
        {
          q: 'Ich bin Händler – kann ich auch anfragen?',
          a: [
            'Gern. Wenn ein Kundenwunsch nicht aus deinem Bestand lieferbar ist, übernehmen wir die Beschaffung. Für wiederkehrende Anfragen vereinbaren wir individuelle Konditionen.',
          ],
        },
      ],
    },
  ],

  cta: {
    title: 'Deine Frage war nicht dabei?',
    text: 'Schreib uns einfach – kostenlos und unverbindlich. Wir antworten persönlich.',
    button: 'Anfrage starten',
  },
}

// Fiktive Angaben für den Sprint – vor dem echten Livegang durch reale Daten ersetzen.
export const imprint = {
  title: 'Impressum',
  company: 'RareFind UG (haftungsbeschränkt)',
  address: ['Hirschgartenstraße 27', '80639 München', 'Deutschland'],
  representedBy: ['Lena Hartwig', 'Jonas Albrecht'],
  phone: '+49 89 4129 5530',
  email: 'kontakt@rarefind.de',
  register: { court: 'Amtsgericht München', number: 'HRB 287 413' },
  vatId: 'DE 341 728 590',
  responsible: { name: 'Lena Hartwig', address: 'Hirschgartenstraße 27, 80639 München' },
}
