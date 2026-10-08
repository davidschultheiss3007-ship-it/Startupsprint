# RareFind – Landingpage

Mobile-first Landingpage für **RareFind** – persönliche Beratung, starkes Netzwerk und ein individueller Preis pro Fall.
Gebaut mit **React 19, Vite und Three.js** (über React Three Fiber).

👉 **Vorschau ohne Installation:** [`preview/index.html`](preview/index.html) herunterladen und öffnen –
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
│   ├── form/                # ContactForm, Field, ChoiceChips
│   ├── three/               # NetworkGlobe (Three.js / React Three Fiber)
│   └── ui/                  # Button, Icon, SectionHeading
├── hooks/                   # useContactForm, useInView, useReveal, usePrefersReducedMotion
├── lib/                     # validation.js, submitInquiry.js
└── styles/                  # tokens.css (Farben, Schriften, Abstände), global.css
```

Jede Komponente hat ein eigenes CSS-Modul (`*.module.css`). Designwerte stehen zentral in `src/styles/tokens.css`.

## Mobile first

- Basis-Styles gelten fürs Smartphone, größere Layouts kommen per `min-width`-Media-Queries dazu.
- Fließtext nie unter 17 px, Formularfelder ≥ 16 px (kein Auto-Zoom auf iOS), Touch-Ziele ≥ 48 px.
- Three.js wird erst geladen, wenn der Netzwerk-Bereich in die Nähe kommt, und pausiert außerhalb des Sichtfelds.
- `prefers-reduced-motion` wird respektiert.

## Anfrageformular (Web3Forms)

Das Formular sendet Anfragen über [Web3Forms](https://web3forms.com) – die Mail geht an die Adresse,
mit der der Access-Key angelegt wurde. Der Key ist in `src/lib/submitInquiry.js` hinterlegt
(öffentlich, das ist bei Web3Forms so vorgesehen) und lässt sich per `.env` überschreiben:

```
VITE_WEB3FORMS_KEY=dein-access-key
VITE_CONTACT_EMAIL=anfrage@rarefind.de
```

Übermittelt werden Name, E-Mail, Telefon, Gesuch, Budget und bevorzugter Kontaktweg; `replyto` ist die
Adresse der Anfragenden, sodass man direkt antworten kann. Das versteckte Feld `website` dient als Honeypot.
Mit `VITE_WEB3FORMS_KEY=` (leer) öffnet sich stattdessen das E-Mail-Programm.

Die statische Vorschau (`npm run build:preview`) sendet das Formular ohne JavaScript per HTML-POST an Web3Forms.

## Offene Punkte vor dem Livegang

- Impressum und Datenschutzerklärung ergänzen (Links im Footer sind Platzhalter).
- Echte Kontakt-E-Mail eintragen.
- Im Web3Forms-Dashboard die Domain der Website freigeben (optional, schützt den Key vor Fremdnutzung).
- Hero-Bild durch eigenes, lizenzfreies Bildmaterial ohne fremde Markenlogos ersetzen.
