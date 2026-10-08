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
          q: 'Wie und wann bezahle ich?',
          a: [
            'Auf dieser Website bezahlst du nie etwas – hier gibt es keinen Bezahlknopf und kein Kartenformular. Erst wenn du ein konkretes Angebot annimmst, schicken wir dir den Bezahllink persönlich per E-Mail. So weißt du immer genau, wofür du zahlst.',
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

export const privacy = {
  title: 'Datenschutz',
  lead: 'Wir verarbeiten so wenige Daten wie möglich – und nur, um dir zu antworten. Hier steht genau, was passiert.',
  summary: [
    'Keine Cookies, kein Tracking, keine Analyse-Tools',
    'Schriften und Bilder kommen von unserem eigenen Server',
    'Daten aus dem Formular nutzen wir nur für die Antwort auf deine Anfrage',
    'Weitere E-Mails nur, wenn du das freiwillig ankreuzt',
  ],
  sections: [
    {
      title: '1. Aufruf der Website',
      body: [
        'Schon beim Aufruf dieser Website werden technisch notwendige Daten verarbeitet, die dein Browser automatisch übermittelt:',
        [
          'IP-Adresse',
          'Datum und Uhrzeit des Abrufs',
          'aufgerufene Seite und übertragene Datenmenge',
          'Website, von der du kommst (Referrer)',
          'Browser und Betriebssystem',
        ],
        'Diese Daten brauchen wir, um die Website auszuliefern, ihre Stabilität und Sicherheit zu gewährleisten und Missbrauch zu erkennen. Rechtsgrundlage ist unser berechtigtes Interesse an einem sicheren Betrieb (Art. 6 Abs. 1 lit. f DSGVO). Die Server-Logfiles werden nach spätestens 14 Tagen gelöscht, sofern sie nicht zur Aufklärung eines konkreten Sicherheitsvorfalls benötigt werden.',
        'Die Website wird bei einem Hosting-Dienstleister betrieben, der die Daten in unserem Auftrag verarbeitet. Mit ihm besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO.',
      ],
    },
    {
      title: '2. Anfrageformular und E-Mail',
      body: [
        'Wenn du uns über das Formular oder per E-Mail schreibst, verarbeiten wir die Angaben, die du machst: Name, E-Mail-Adresse, deine Suchanfrage und – falls angegeben – Budget und Telefonnummer.',
        'Zweck: Wir nutzen diese Daten ausschließlich, um deine Anfrage zu beantworten, dir eine Einschätzung sowie Angebot und Preis per E-Mail zu schicken und dich bei Rückfragen zu erreichen. Rechtsgrundlage ist die Durchführung vorvertraglicher Maßnahmen auf deine Anfrage hin (Art. 6 Abs. 1 lit. b DSGVO).',
        'Kommt kein Auftrag zustande, löschen wir deine Anfrage spätestens sechs Monate nach unserer letzten Nachricht. Nimmst du ein Angebot an, bewahren wir die für die Abwicklung nötigen Daten so lange auf, wie es gesetzliche Aufbewahrungspflichten verlangen (in der Regel sechs bzw. zehn Jahre nach HGB und AO).',
        'Die Angabe deiner Daten ist freiwillig. Ohne Name, E-Mail-Adresse und Beschreibung deines Wunsches können wir deine Anfrage aber nicht bearbeiten.',
      ],
    },
    {
      title: '3. Freiwillige Einwilligung in weitere E-Mails',
      body: [
        'Nur wenn du im Formular das freiwillige Kästchen ankreuzt, schreiben wir dir auch über deine Anfrage hinaus zu neuen Funden und Angeboten von RareFind. Rechtsgrundlage ist deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).',
        'Du kannst diese Einwilligung jederzeit ohne Angabe von Gründen widerrufen – mit einer kurzen Nachricht an uns oder über den Abmeldelink in jeder E-Mail. Die Bearbeitung deiner Anfrage hängt nicht davon ab, ob du das Kästchen ankreuzt.',
      ],
    },
    {
      title: '4. Bezahlung',
      body: [
        'Auf dieser Website werden keine Zahlungsdaten erhoben. Nimmst du ein Angebot an, schicken wir dir einen Bezahllink persönlich per E-Mail. Die Zahlung wird dann über den jeweiligen Zahlungsdienstleister abgewickelt, für den dessen eigene Datenschutzhinweise gelten.',
      ],
    },
    {
      title: '5. Weitergabe von Daten',
      body: [
        'Wir verkaufen keine Daten und geben sie nicht zu Werbezwecken weiter. Erst wenn du ein Angebot annimmst, geben wir die für die Abwicklung nötigen Daten weiter – etwa deine Lieferadresse an den Versanddienstleister (Art. 6 Abs. 1 lit. b DSGVO). Eine Übermittlung in Länder außerhalb der EU findet durch uns nicht statt.',
      ],
    },
    {
      title: '6. Cookies, Tracking und externe Inhalte',
      body: [
        'Diese Website setzt keine Cookies, nutzt keine Analyse- oder Tracking-Dienste und bindet keine Inhalte von Drittanbietern ein. Schriften und Bilder werden direkt von unserem Server geladen.',
      ],
    },
    {
      title: '7. Deine Rechte',
      body: [
        'Du hast jederzeit das Recht auf:',
        [
          'Auskunft über deine gespeicherten Daten (Art. 15 DSGVO)',
          'Berichtigung unrichtiger Daten (Art. 16 DSGVO)',
          'Löschung (Art. 17 DSGVO)',
          'Einschränkung der Verarbeitung (Art. 18 DSGVO)',
          'Datenübertragbarkeit (Art. 20 DSGVO)',
          'Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21 DSGVO)',
          'Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)',
        ],
        'Eine kurze E-Mail an uns genügt. Außerdem kannst du dich bei einer Datenschutz-Aufsichtsbehörde beschweren, zum Beispiel beim Bayerischen Landesamt für Datenschutzaufsicht (BayLDA), Promenade 18, 91522 Ansbach.',
        'Eine automatisierte Entscheidungsfindung oder ein Profiling findet nicht statt.',
      ],
    },
  ],
  updated: 'Stand: Oktober 2026',
}
