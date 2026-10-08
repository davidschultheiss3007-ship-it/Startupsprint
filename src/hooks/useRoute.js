import { useEffect, useState } from 'react'

// Unterseiten laufen über den Hash (#/faq) – kein Router-Paket nötig,
// und normale Anker wie #anfrage führen weiterhin zur Startseite.
export const routes = {
  faq: '#/faq',
  impressum: '#/impressum',
}

const pageFor = (hash) => Object.keys(routes).find((key) => routes[key] === hash) ?? 'home'

/** Liefert die aktuelle Seite ('home' | 'faq' | 'impressum') und scrollt passend nach Seitenwechseln. */
export default function useRoute() {
  const [page, setPage] = useState(() => pageFor(window.location.hash))

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash
      // Anker innerhalb der aktuellen Seite (z. B. #main) wechseln die Seite nicht
      const isRoute = Object.values(routes).includes(hash)
      if (!isRoute && hash.length > 1 && document.getElementById(hash.slice(1))) return
      setPage(pageFor(hash))
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // Nach dem Rendern: Unterseiten oben öffnen, Anker auf der Startseite anspringen
  useEffect(() => {
    const hash = window.location.hash
    if (page !== 'home') window.scrollTo(0, 0)
    else if (hash.length > 1) document.getElementById(hash.slice(1))?.scrollIntoView()
  }, [page])

  return page
}
