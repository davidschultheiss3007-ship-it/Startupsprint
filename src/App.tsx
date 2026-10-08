import { useEffect, useState } from 'react'
import { setupMotion, prefersReducedMotion } from './motion'
import SceneLoader from './three/SceneLoader'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Steps from './components/Steps'
import Evidence from './components/Evidence'
import Waitlist from './components/Waitlist'
import Faq from './components/Faq'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Legal from './components/Legal'

function canUse3D() {
  if (prefersReducedMotion()) return false
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export default function App() {
  const [use3D] = useState(canUse3D)

  useEffect(() => setupMotion(), [])

  return (
    <>
      <div className="progress" aria-hidden="true" />
      <div className="scene" aria-hidden="true">
        {use3D && <SceneLoader />}
      </div>
      <main>
        <Hero showFallbackArt={!use3D} />
        <Problem />
        <Steps />
        <Evidence />
        <Waitlist />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <Legal />
    </>
  )
}
