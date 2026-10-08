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

## Deployment (Cloudflare Pages)

Die Seite muss **gebaut** werden. Wird das Repo ungebaut ausgeliefert, lädt der Browser `src/main.jsx`
direkt, und die Seite bleibt weiß. Einstellungen unter *Workers & Pages → Projekt → Settings → Builds*:

| Einstellung | Wert |
| --- | --- |
| Framework preset | `Vite` (oder `None`) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | *(leer lassen)* |

Die Node-Version (22) kommt aus `.node-version`. Danach unter *Deployments* neu deployen.

## Anfrageformular anbinden

Kopiere `.env.example` nach `.env` und trage einen Endpunkt ein (z. B. Formspree, Getform oder eine eigene API):

```
VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
VITE_CONTACT_EMAIL=anfrage@rarefind.de
```

Das Formular sendet dann JSON (`name`, `email`, `phone`, `request`, `budget`, `contactVia`, `createdAt`).
Ohne Endpunkt öffnet sich das E-Mail-Programm mit vorausgefüllter Nachricht.

## Offene Punkte vor dem Livegang

- Impressum und Datenschutzerklärung ergänzen (Links im Footer sind Platzhalter).
- Echte Kontakt-E-Mail eintragen.
- Hero-Bild durch eigenes, lizenzfreies Bildmaterial ohne fremde Markenlogos ersetzen.
