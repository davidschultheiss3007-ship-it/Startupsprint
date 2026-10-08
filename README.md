# RareFind – Landingpage (Startupsprint)

Info- und Wartelistenseite für RareFind (siehe `Businessplan.md`). Eine einzige Seite in React mit 3D-Szene (three.js), Scroll-Animationen (GSAP) und einem eingebauten Wartelisten-Formular. Kein Preis, kein Kaufangebot, kein Login, keine Datenbank.

## Lokal starten

```bash
npm install
npm run dev        # Entwicklung: http://localhost:5173
npm run build      # fertige Seite in dist/
```

## Auf Cloudflare Pages veröffentlichen

1. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → dieses Repo wählen.
2. Einstellungen:
   - Framework preset: **Vite** (oder „None“)
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Umgebungsvariable (falls nötig): `NODE_VERSION` = `22`
3. **Save and Deploy**. Jeder Push auf den Branch baut die Seite neu.

## Texte und Platzhalter ändern

Alle Texte stehen in **`src/content.ts`**. Alles in `[eckigen Klammern]` ist ein offener Platzhalter:

| Platzhalter | Wo |
| --- | --- |
| `[Zitat 1–3 …]` | Abschnitt „Das Problem“ – wörtliche Zitate ohne Namen |
| `[Zahl]` Gespräche, `[Zahl]` + `[welche Art von Zusage]` | Abschnitt „Belege“ |
| `[Was ihr in den Gesprächen gehört habt]`, `[Eure eigene Erfahrung …]` | Abschnitt „Belege“ |
| `[Einwand aus euren Gesprächen]` + `[Antwort in höchstens zwei Sätzen]` | Fragen und Antworten |
| `[E-Mail-Adresse]` | Kontakt, Impressum, Datenschutz |
| `[Name]`, `[ladungsfähige Anschrift]` | Impressum, Datenschutz |
| `[Hosting-Anbieter: Firma und Anschrift]` | Datenschutz |
| `[Formular-Tool]`, `[Bezahldienst]` | Datenschutz |

Die Fragen 1–4 in „Fragen und Antworten“ stammen aus dem Businessplan, nicht aus Gesprächen. Bitte mit echten Einwänden bestätigen oder ersetzen.

## Formular

Das Formular ist in die Seite eingebaut. Ohne weitere Einstellung läuft es im **Demo-Modus**: Es prüft die Eingaben und zeigt die Bestätigung, speichert aber nichts. Damit Einträge ankommen, in `src/content.ts` bei `FORM_ENDPOINT` eine Adresse eintragen, die JSON per POST annimmt (z. B. ein Formular-Dienst oder eine Cloudflare Function). Dann im Datenschutz `[Formular-Tool]` ausfüllen.

## Prüfung gegen die fünf Kriterien

```bash
npm run build
npx vite preview --port 4173 &
npm run check            # SHOTS=1 npm run check speichert Screenshots in screenshots/
```

Das Skript prüft: Wörter der Überschrift, keine Preise/Kaufangebote, alle Knöpfe führen zum Formular, listet offene Platzhalter und testet 320–768 px Breite auf seitliches Scrollen.
