import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { CTA_LABEL, CTA_NOTE, CTA_TARGET } from '../content'

function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      x((e.clientX - (r.left + r.width / 2)) * 0.25)
      y((e.clientY - (r.top + r.height / 2)) * 0.35)
    }
    const leave = () => {
      x(0)
      y(0)
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [])
  return ref
}

function Arrow() {
  return (
    <span className="cta__icon" aria-hidden="true">
      <svg viewBox="0 0 20 20" width="18" height="18">
        <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

// Jeder Knopf der Seite: gleicher Text, gleiches Ziel (das Formular auf dieser Seite).
export function CtaLink() {
  const ref = useMagnetic<HTMLAnchorElement>()
  return (
    <div className="cta-block">
      <a ref={ref} className="cta" href={CTA_TARGET}>
        <span>{CTA_LABEL}</span>
        <Arrow />
      </a>
      <p className="cta-note">{CTA_NOTE}</p>
    </div>
  )
}

export function CtaSubmit({ busy }: { busy: boolean }) {
  const ref = useMagnetic<HTMLButtonElement>()
  return (
    <div className="cta-block">
      <button ref={ref} className="cta" type="submit" disabled={busy} aria-busy={busy}>
        <span>{CTA_LABEL}</span>
        <Arrow />
      </button>
      <p className="cta-note">{CTA_NOTE}</p>
    </div>
  )
}
