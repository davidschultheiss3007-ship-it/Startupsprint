import { useEffect, useRef, useState } from 'react'

/** Liefert [ref, inView]. Mit `once` bleibt der Wert nach dem ersten Treffer true. */
export default function useInView({ rootMargin = '0px', threshold = 0, once = false } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting && once) observer.disconnect()
      },
      { rootMargin, threshold },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin, threshold, once])

  return [ref, inView]
}
