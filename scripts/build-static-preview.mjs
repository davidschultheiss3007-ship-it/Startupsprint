// Erzeugt preview/index.html: eine statische Vorschau der Landingpage ohne JavaScript.
//
// iOS (Dateien-App, Quick Look, Mail-Anhänge) führt in lokal geöffneten HTML-Dateien
// kein JavaScript aus – eine React-App bliebe dort weiß. Deshalb wird die gebaute Seite
// hier im Headless-Browser gerendert und als reines HTML+CSS gespeichert:
//   - alle <script>-Tags entfernt
//   - Three.js-Globus als Bild eingefroren
//   - Schriften als Base64 eingebettet (funktioniert offline)
//   - JS-abhängige Elemente (Mobile-Menü, CTA-Leiste, Scroll-Animationen) entschärft
//
// Voraussetzung: `vite build --mode singlefile` hat .preview-build/index.html erzeugt.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { chromium } from 'playwright'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const input = resolve(root, '.preview-build/index.html')
const output = resolve(root, 'preview/index.html')
const fontDir = resolve(root, 'scripts/preview-fonts')

const font = (file) => readFileSync(resolve(fontDir, file)).toString('base64')
const fontCss = `
@font-face { font-family: 'Anton'; font-weight: 400; font-style: normal; font-display: swap;
  src: url(data:font/woff2;base64,${font('anton.woff2')}) format('woff2'); }
@font-face { font-family: 'Permanent Marker'; font-weight: 400; font-style: normal; font-display: swap;
  src: url(data:font/woff2;base64,${font('permanent-marker.woff2')}) format('woff2'); }
@font-face { font-family: 'Inter'; font-weight: 400 600; font-style: normal; font-display: swap;
  src: url(data:font/woff2;base64,${font('inter.woff2')}) format('woff2'); }
`

// Ergänzende Styles, die JS-Verhalten durch reines CSS ersetzen
const staticCss = `
/* Header: Rahmen dauerhaft, statt Hamburger-Menü den Anfrage-Button zeigen */
header[class*="_header_"] { border-bottom-color: var(--color-line); }
header[class*="_header_"] [class*="_desktopCta_"] { display: block; }
@media (max-width: 30rem) {
  header[class*="_header_"] [class*="_desktopCta_"] a { padding: 0 1rem; }
}
/* Footer braucht ohne CTA-Leiste kein Extra-Polster */
footer[class*="_footer_"] { padding-bottom: 3rem; }
`

const browser = await chromium.launch({
  args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
})
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
const errors = []
page.on('pageerror', (e) => errors.push(e.message))

await page.goto(pathToFileURL(input).href)
await page.waitForSelector('#netzwerk')

// Globus laden lassen und als Bild einfrieren
await page.evaluate(() => document.getElementById('netzwerk').scrollIntoView())
await page.waitForSelector('#netzwerk canvas', { timeout: 15000 })
await page.waitForTimeout(2500)
const canvasBox = page.locator('#netzwerk [class*="_canvas_"]')
const globe = await canvasBox.screenshot({ type: 'jpeg', quality: 82 })
const globeSrc = `data:image/jpeg;base64,${globe.toString('base64')}`

if (errors.length) throw new Error(`Fehler beim Rendern:\n${errors.join('\n')}`)

const html = await page.evaluate(
  ({ globeSrc, fontCss, staticCss }) => {
    const doc = document.documentElement.cloneNode(true)
    const $ = (sel) => doc.querySelector(sel)
    const $$ = (sel) => [...doc.querySelectorAll(sel)]

    // 1. Kein JavaScript
    $$('script, link[rel="modulepreload"]').forEach((n) => n.remove())
    // Externe Schriften raus – sind eingebettet
    $$('link[href*="fonts.g"]').forEach((n) => n.remove())

    // 2. Scroll-Animationen: alles sofort sichtbar
    $$('[data-reveal]').forEach((n) => {
      n.removeAttribute('data-reveal')
      n.style.transitionDelay = ''
    })

    // 3. Three.js-Canvas durch Standbild ersetzen
    const box = $('#netzwerk [class*="_canvas_"]')
    box.innerHTML = ''
    const img = doc.ownerDocument.createElement('img')
    img.src = globeSrc
    img.alt = ''
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;border-radius:50%'
    box.appendChild(img)

    // 4. JS-abhängige Bedienelemente entfernen
    $$('[class*="_menuButton_"], #mobile-menu, [class*="_bar_"]').forEach((n) => n.remove())
    $$('.skip-link').forEach((n) => n.remove())

    // 5. Formular ohne JS: native Validierung + Versand per E-Mail-Programm
    const form = $('#anfrage form')
    const mail = $('footer a[href^="mailto:"]')?.getAttribute('href') ?? 'mailto:'
    form.removeAttribute('novalidate')
    form.setAttribute('action', `${mail}?subject=Anfrage%20%C3%BCber%20RareFind`)
    form.setAttribute('method', 'post')
    form.setAttribute('enctype', 'text/plain')
    ;['request', 'name', 'email', 'consent'].forEach((name) =>
      form.querySelector(`[name="${name}"]`)?.setAttribute('required', ''),
    )
    $$('input[name="website"]').forEach((n) => n.closest('.visually-hidden')?.remove())
    // Aktiv-Klasse kommt im statischen HTML über :has(input:checked)
    $$('[class*="_chipActive_"]').forEach((n) =>
      n.classList.remove([...n.classList].find((c) => c.includes('_chipActive_'))),
    )

    // 6. Styles ergänzen
    const style = doc.ownerDocument.createElement('style')
    style.textContent = fontCss + staticCss
    $('head').appendChild(style)

    return '<!doctype html>\n' + doc.outerHTML
  },
  { globeSrc, fontCss, staticCss },
)

await browser.close()

if (/<script/i.test(html)) throw new Error('Vorschau enthält noch <script>-Tags')
mkdirSync(dirname(output), { recursive: true })
writeFileSync(output, html)
console.log(`✓ Statische Vorschau geschrieben: ${output} (${Math.round(html.length / 1024)} kB)`)
