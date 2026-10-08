import { lazy, Suspense } from 'react'
import { network } from '../../data/content.js'
import useInView from '../../hooks/useInView.js'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion.js'
import SectionHeading from '../ui/SectionHeading.jsx'
import styles from './Network.module.css'

// Three.js wird erst geladen, wenn der Bereich in die Nähe des Viewports kommt
const NetworkGlobe = lazy(() => import('../three/NetworkGlobe.jsx'))

export default function Network() {
  const [nearRef, isNear] = useInView({ rootMargin: '300px', once: true })
  const [visibleRef, isVisible] = useInView()
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section id="netzwerk" className={styles.network} aria-labelledby="network-title" ref={nearRef}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy} data-reveal>
          <SectionHeading
            id="network-title"
            invert
            eyebrow={network.eyebrow}
            title={network.title}
            text={network.text}
          />
          <ul className={styles.sources}>
            {network.sources.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div className={styles.canvas} ref={visibleRef}>
          <div className={styles.glow} />
          {isNear && (
            <Suspense fallback={null}>
              <NetworkGlobe active={isVisible} reducedMotion={reducedMotion} />
            </Suspense>
          )}
        </div>
      </div>
    </section>
  )
}
