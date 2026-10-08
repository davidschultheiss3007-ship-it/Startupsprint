import { lazy, Suspense, useEffect, useState } from 'react'

// three.js erst nach dem ersten Bild laden – der Text ist sofort da.
const Scene = lazy(() => import('./Scene'))

export default function SceneLoader() {
  const [mount, setMount] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setMount(true), 120)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <div className={`scene__canvas${ready ? ' is-ready' : ''}`}>
      {mount && (
        <Suspense fallback={null}>
          <Scene onReady={() => setReady(true)} />
        </Suspense>
      )}
    </div>
  )
}
