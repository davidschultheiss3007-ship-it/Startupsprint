import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import MobileCtaBar from './components/layout/MobileCtaBar.jsx'
import Hero from './components/sections/Hero.jsx'
import Usps from './components/sections/Usps.jsx'
import Network from './components/sections/Network.jsx'
import Process from './components/sections/Process.jsx'
import Pricing from './components/sections/Pricing.jsx'
import Contact from './components/sections/Contact.jsx'
import useReveal from './hooks/useReveal.js'

export default function App() {
  useReveal()

  return (
    <>
      <a className="skip-link" href="#main">Zum Inhalt springen</a>
      <Header />
      <main id="main">
        <Hero />
        <Usps />
        <Network />
        <Process />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <MobileCtaBar />
    </>
  )
}
