import { useEffect, useState } from 'react'
import Button from '../ui/Button.jsx'
import styles from './MobileCtaBar.module.css'

/**
 * Feste Anfrage-Leiste am unteren Rand (nur Mobile).
 * Erscheint nach dem Hero und verschwindet, sobald das Formular sichtbar ist.
 */
export default function MobileCtaBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('top')
    const form = document.getElementById('anfrage')
    if (!hero || !form || typeof IntersectionObserver === 'undefined') return

    const state = { heroVisible: true, formVisible: false }
    const update = () => setVisible(!state.heroVisible && !state.formVisible)

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === hero) state.heroVisible = entry.isIntersecting
        if (entry.target === form) state.formVisible = entry.isIntersecting
      })
      update()
    })
    observer.observe(hero)
    observer.observe(form)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={`${styles.bar} ${visible ? styles.visible : ''}`} aria-hidden={!visible}>
      <Button href="#anfrage" block tabIndex={visible ? 0 : -1}>
        Preis anfragen
      </Button>
    </div>
  )
}
