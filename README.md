# RareFind – Landingpage

Mobile-first Landingpage für **RareFind** – persönliche Beratung, starkes Netzwerk und ein individueller Preis pro Fall.
Gebaut mit **React 19, Vite und Three.js** (über React Three Fiber).

👉 **Vorschau ohne Installation:** den Ordner [`preview/`](preview/) (`index.html`, `faq.html`, `impressum.html`) herunterladen und `index.html` öffnen –
auch direkt auf dem iPhone (Dateien-App). Die Vorschau ist reines HTML+CSS ohne JavaScript,
Bilder und Schriften sind eingebettet, sie funktioniert also offline. Der 3D-Globus ist darin ein Standbild,
das Formular öffnet beim Absenden das E-Mail-Programm.

## Schnellstart

```bash
npm install
npm run dev            # Entwicklungsserver auf http://localhost:5173
npm run build          # Produktions-Build nach dist/
npm run build:preview  # Erzeugt die statische Vorschau preview/index.html (nutzt Playwright/Chromium)
```

## Aufbau der Seite

| Bereich | Ziel |
| --- | --- |
| Hero | Kernbotschaft „Seltene Dinge finden lassen.“ + Anfrage-Button |
| Warum RareFind | 4 USPs: Netzwerk, Expertise, persönliche Beratung, Preis pro Fall |
| Netzwerk | Hauptstärke, visualisiert als rotierender 3D-Netzwerk-Globus (Three.js) |
| Ablauf | 3 Schritte von der Anfrage zum Angebot |
| Preise | Kein Standardpreis – individuell, transparent, verhandelbar |
| Anfrage | Formular als Haupt-Akquiseweg (Preis erfahren / verhandeln) |

Zusätzlich gibt es zwei Unterseiten (Hash-Routing über `src/hooks/useRoute.js`, kein Router-Paket nötig):

| Seite | Adresse | Inhalt |
| --- | --- | --- |
| FAQ | `#/faq` | Vergleich mit Alternativen (eBay, Spezial-Marktplätze, Foren, Händler, Reseller) + Antworten auf typische Einwände in 4 Themen |
| Impressum | `#/impressum` | Pflichtangaben nach § 5 DDG, § 18 Abs. 2 MStV, Haftungs- und Urheberrechtshinweise |

Auf dem Smartphone erscheint nach dem Hero eine feste **„Preis anfragen“-Leiste**, die verschwindet, sobald das Formular sichtbar ist.

## Projektstruktur

```
scripts/build-static-preview.mjs  # rendert die Seite zu statischem HTML für preview/
src/
├── App.jsx                  # Setzt die Sektionen zusammen
├── main.jsx                 # Einstiegspunkt
├── assets/                  # Bilder
├── data/content.js          # ALLE Texte – hier Inhalte anpassen
├── components/
│   ├── layout/              # Header (mit Mobile-Menü), Footer, MobileCtaBar
│   ├── sections/            # Hero, Usps, Network, Process, Pricing, Contact
│   ├── pages/               # FaqPage, ImprintPage (Unterseiten)
│   ├── form/                # ContactForm, Field, ChoiceChips
│   ├── three/               # NetworkGlobe (Three.js / React Three Fiber)
│   └── ui/                  # Button, Icon, SectionHeading
├── hooks/                   # useRoute, useContactForm, useInView, useReveal, usePrefersReducedMotion
├── lib/                     # validation.js, submitInquiry.js
└── styles/                  # tokens.css (Farben, Schriften, Abstände), global.css
```

Jede Komponente hat ein eigenes CSS-Modul (`*.module.css`). Designwerte stehen zentral in `src/styles/tokens.css`.

## Mobile first

- Basis-Styles gelten fürs Smartphone, größere Layouts kommen per `min-width`-Media-Queries dazu.
- Fließtext nie unter 17 px, Formularfelder ≥ 16 px (kein Auto-Zoom auf iOS), Touch-Ziele ≥ 48 px.
- Three.js wird erst geladen, wenn der Netzwerk-Bereich in die Nähe kommt, und pausiert außerhalb des Sichtfelds.
- `prefers-reduced-motion` wird respektiert.

## Anfrageformular anbinden

Kopiere `.env.example` nach `.env` und trage einen Endpunkt ein (z. B. Formspree, Getform oder eine eigene API):

```
VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
VITE_CONTACT_EMAIL=anfrage@rarefind.de
```

Das Formular sendet dann JSON (`name`, `email`, `phone`, `request`, `budget`, `contactVia`, `createdAt`).
Ohne Endpunkt öffnet sich das E-Mail-Programm mit vorausgefüllter Nachricht.

## Offene Punkte vor dem Livegang

- **Impressum enthält fiktive Daten** (Firma, Adresse, Geschäftsführung, Register, USt-IdNr.) – in `src/data/content.js` (`imprint`) durch echte Angaben ersetzen.
- Datenschutzerklärung ergänzen (Link im Footer ist noch ein Platzhalter).
- Echte Kontakt-E-Mail eintragen.
- Hero-Bild durch eigenes, lizenzfreies Bildmaterial ohne fremde Markenlogos ersetzen.
