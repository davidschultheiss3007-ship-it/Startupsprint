import { useEffect, useState } from 'react'
import { brand, nav } from '../../data/content.js'
import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'
import styles from './Header.module.css'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Body-Scroll sperren, solange das mobile Menü offen ist
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.logo} onClick={close}>
          {brand.name}
        </a>

        <nav className={styles.desktopNav} aria-label="Hauptnavigation">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.desktopCta}>
          <Button href="#anfrage" size="sm">Anfrage starten</Button>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} size={26} />
        </button>
      </div>

      <div id="mobile-menu" className={`${styles.mobileMenu} ${open ? styles.open : ''}`} hidden={!open}>
        <nav className="container" aria-label="Mobile Navigation">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={close}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <Button href="#anfrage" block size="lg" onClick={close}>
            Anfrage starten
          </Button>
        </nav>
      </div>
    </header>
  )
}
