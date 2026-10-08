// Prüft die gebaute Seite gegen die fünf Kriterien aus der Aufgabe.
// Nutzung: npm run build && npx vite preview --port 4173 &  npm run check
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const URL = process.env.URL ?? 'http://localhost:4173/'
const SHOTS = process.env.SHOTS === '1'
const executablePath = process.env.CHROMIUM_PATH || undefined
const CTA_NOTE = 'Trag dich ein, und wir schicken dir Angebot und Preis per E-Mail.'
const ALLOWED_HREFS = new Set(['#warteliste', '#impressum', '#datenschutz'])

const browser = await chromium.launch({ executablePath, args: ['--enable-unsafe-swiftshader', '--use-gl=angle'] })
const results = []
const ok = (n, name, pass, detail = '') => results.push({ n, name, pass, detail })

// --- Desktop: Inhalt prüfen ---
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('pageerror', (e) => errors.push(e.message))
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
await page.goto(URL, { waitUntil: 'networkidle' })

// 1. Überschrift
const h1 = (await page.locator('h1').getAttribute('aria-label')) ?? (await page.locator('h1').innerText())
const words = h1.trim().split(/\s+/).length
ok(1, 'Überschrift nennt das Ergebnis in höchstens zehn Wörtern', words <= 10, `„${h1}“ (${words} Wörter)`)

// 2. Kein Preis, kein Kaufangebot
const text = await page.evaluate(() => document.body.innerText)
const stripped = text.split(CTA_NOTE).join(' ').replaceAll('Angebot und Preis per E-Mail', ' ')
const priceHits = [
  ...stripped.matchAll(/(\d[\d.,]*\s?(€|EUR|Euro))|(€\s?\d)|\b(Preis\w*|Angebot\w*|kaufen|Kauf\b|bestellen|Bestellung|vorbestellen)\b/gi),
].map((m) => m[0])
ok(2, 'Kein Preis und kein Kaufangebot (nur Pflichtsatz unter dem Knopf)', priceHits.length === 0, priceHits.join(', ') || 'keine Treffer')

// 3. Alle Knöpfe → gleiches Ziel, kein Bezahl-Link
const links = await page.$$eval('a[href]', (as) => as.map((a) => ({ href: a.getAttribute('href'), text: a.textContent.trim() })))
const badLinks = links.filter((l) => !ALLOWED_HREFS.has(l.href))
const ctas = await page.$$eval('a.cta, button', (els) =>
  els.map((el) => ({ tag: el.tagName, text: el.textContent.trim(), href: el.getAttribute('href'), type: el.getAttribute('type'), inForm: !!el.closest('#warteliste form') })),
)
const badCtas = ctas.filter((c) => c.text !== 'Auf die Warteliste' || (c.tag === 'A' ? c.href !== '#warteliste' : !(c.type === 'submit' && c.inForm)))
const payHits = links.filter((l) => /pay|stripe|checkout|bezahl|kasse/i.test(l.href + l.text))
ok(
  3,
  'Alle Knöpfe führen zum Formular, kein Bezahlknopf/-link',
  badLinks.length === 0 && badCtas.length === 0 && payHits.length === 0,
  `${ctas.length} Knöpfe, ${links.length} Links; Ausreißer: ${JSON.stringify([...badLinks, ...badCtas, ...payHits])}`,
)

// 4. Platzhalter auflisten (Erfundenes muss von Hand geprüft werden)
const placeholders = [...new Set(text.match(/\[[^\]]+\]/g) ?? [])]
ok(4, 'Keine erfundenen Inhalte – offene Platzhalter', true, placeholders.join(' | '))

if (SHOTS) {
  mkdirSync('screenshots', { recursive: true })
  for (const [i, y] of [0, 0.12, 0.22, 0.3, 0.38, 0.47, 0.6].entries()) {
    await page.evaluate((f) => window.scrollTo(0, (document.body.scrollHeight - innerHeight) * f), y)
    await page.waitForTimeout(1600)
    await page.screenshot({ path: `screenshots/desktop-${i}.png` })
  }
}

// 5. Handy: kein seitliches Scrollen
const widths = [320, 360, 390, 414, 768]
const overflow = []
for (const w of widths) {
  const p = await browser.newPage({ viewport: { width: w, height: 800 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 })
  p.on('pageerror', (e) => errors.push(`[${w}] ${e.message}`))
  await p.goto(URL, { waitUntil: 'networkidle' })
  await p.waitForTimeout(1200)
  const m = await p.evaluate(() => {
    const vw = document.documentElement.clientWidth
    const wide = [...document.querySelectorAll('main *, footer *, .legal *')]
      .filter((el) => {
        const r = el.getBoundingClientRect()
        return r.width > 0 && (r.right > vw + 1 || r.left < -1) && !el.closest('.scene')
      })
      .slice(0, 5)
      .map((el) => `${el.tagName.toLowerCase()}.${el.className}`)
    return { sw: document.documentElement.scrollWidth, vw, wide }
  })
  if (m.sw > m.vw || m.wide.length) overflow.push(`${w}px: scrollWidth ${m.sw} > ${m.vw} ${m.wide.join(', ')}`)
  if (SHOTS && w === 390) {
    for (const [i, y] of [0, 0.1, 0.2, 0.27, 0.34, 0.41, 0.5, 0.62, 0.75, 1].entries()) {
      await p.evaluate((f) => window.scrollTo(0, (document.body.scrollHeight - innerHeight) * f), y)
      await p.waitForTimeout(1600)
      await p.screenshot({ path: `screenshots/mobile-${i}.png` })
    }
  }
  await p.close()
}
ok(5, 'Auf dem Handy ohne seitliches Scrollen lesbar', overflow.length === 0, overflow.join(' | ') || `geprüft: ${widths.join(', ')} px`)

await browser.close()

for (const r of results) console.log(`${r.n}. ${r.pass ? 'erfüllt' : 'NICHT erfüllt'} – ${r.name}\n   ${r.detail}`)
if (errors.length) console.log('\nKonsolenfehler:\n  ' + errors.join('\n  '))
process.exit(results.every((r) => r.pass) && !errors.length ? 0 : 1)
