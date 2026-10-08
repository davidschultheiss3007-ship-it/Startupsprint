import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

// Gemeinsamer Zustand zwischen Scroll (DOM) und 3D-Szene. Wird pro Frame gelesen,
// deshalb ein schlichtes veränderbares Objekt statt React-State.
export const sceneState = {
  hero: 0, // 0 → 1, während der Hero aus dem Bild scrollt
  problem: 0, // 0 → 1, während der Problem-Abschnitt durchläuft
  steps: 0, // 0 → 1, über den festgehaltenen Ablauf-Abschnitt
  gather: 0, // 0 → 1, ab den Belegen bis zur Warteliste
  burst: 0, // kurzer Dreh-Impuls nach dem Eintragen
  pointer: { x: 0, y: 0 },
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

let lenis: Lenis | null = null

export function scrollToTarget(selector: string, onDone?: () => void) {
  const el = document.querySelector<HTMLElement>(selector)
  if (!el) return
  if (lenis) {
    lenis.scrollTo(el, { offset: -12, duration: 1.4, onComplete: () => onDone?.() })
  } else {
    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
    window.setTimeout(() => onDone?.(), prefersReducedMotion() ? 0 : 700)
  }
}

const progressTrigger = (trigger: string, start: string, end: string, key: 'hero' | 'problem' | 'gather') =>
  ScrollTrigger.create({
    trigger,
    start,
    end,
    onUpdate: (self) => {
      sceneState[key] = self.progress
    },
  })

export function setupMotion(): () => void {
  const reduced = prefersReducedMotion()
  const cleanups: Array<() => void> = []

  // Anker-Links (#warteliste, #impressum, #datenschutz) weich ansteuern.
  const onClick = (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
    if (!a) return
    const hash = a.getAttribute('href')!
    if (hash.length < 2) return
    e.preventDefault()
    history.replaceState(null, '', hash)
    scrollToTarget(hash, () => {
      const target = document.querySelector<HTMLElement>(hash)
      // Mit Maus direkt ins E-Mail-Feld, auf dem Handy ohne die Tastatur aufzureißen.
      const fine = window.matchMedia('(pointer: fine)').matches
      const focusEl = (fine && target?.querySelector<HTMLElement>('[data-autofocus]')) || target
      focusEl?.focus({ preventScroll: true })
    })
  }
  document.addEventListener('click', onClick)
  cleanups.push(() => document.removeEventListener('click', onClick))

  if (reduced) {
    return () => cleanups.forEach((fn) => fn())
  }

  // Weiches Scrollen (Mausrad). Auf Touch-Geräten bleibt das native Scrollen.
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  const raf = (time: number) => lenis?.raf(time * 1000)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)
  cleanups.push(() => {
    gsap.ticker.remove(raf)
    lenis?.destroy()
    lenis = null
  })

  ScrollTrigger.config({ ignoreMobileResize: true })

  const onPointer = (e: PointerEvent) => {
    sceneState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
    sceneState.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
  }
  window.addEventListener('pointermove', onPointer, { passive: true })
  cleanups.push(() => window.removeEventListener('pointermove', onPointer))

  const ctx = gsap.context(() => {
    // Hero-Überschrift: Wörter klappen nacheinander auf.
    gsap.from('.hero__word', {
      yPercent: 110,
      rotateX: -70,
      opacity: 0,
      duration: 1.2,
      ease: 'expo.out',
      stagger: 0.07,
      delay: 0.15,
    })
    gsap.from('.hero [data-hero-in]', {
      y: 24,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.12,
      delay: 0.6,
    })

    // Elemente erscheinen beim Scrollen.
    gsap.set('[data-reveal]', { opacity: 0, y: 32 })
    ScrollTrigger.batch('[data-reveal]', {
      start: 'top 88%',
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.09, overwrite: true }),
    })

    // Zitat-Karten fliegen gestaffelt mit leichter Drehung herein.
    gsap.utils.toArray<HTMLElement>('.quote').forEach((el, i) => {
      gsap.fromTo(
        el,
        { rotateY: i % 2 ? -18 : 18, rotateX: 8, z: -120, opacity: 0 },
        {
          rotateY: 0,
          rotateX: 0,
          z: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 55%', scrub: 0.6 },
        },
      )
    })

    // Fortschrittslinie oben.
    gsap.to('.progress', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
    })

    // Szene ausblenden, sobald Fragen und Rechtstexte kommen.
    gsap.to('.scene', {
      opacity: 0.14,
      ease: 'none',
      scrollTrigger: { trigger: '#fragen', start: 'top bottom', end: 'top 35%', scrub: true },
    })

    progressTrigger('#top', 'top top', 'bottom top', 'hero')
    progressTrigger('#problem', 'top bottom', 'bottom top', 'problem')
    progressTrigger('#belege', 'top bottom', 'top 25%', 'gather')

    const stepsEl = document.querySelector<HTMLElement>('#ablauf')
    if (stepsEl) {
      ScrollTrigger.create({
        trigger: stepsEl,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          sceneState.steps = self.progress
          stepsEl.style.setProperty('--p', self.progress.toFixed(4))
          const active = String(Math.min(2, Math.floor(self.progress * 3)))
          if (stepsEl.dataset.active !== active) stepsEl.dataset.active = active
        },
      })
    }
  })
  cleanups.push(() => ctx.revert())

  // Nachladende Schriften verschieben Abstände – Trigger danach neu messen.
  document.fonts?.ready.then(() => ScrollTrigger.refresh())

  return () => cleanups.forEach((fn) => fn())
}
