import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import MobileCtaBar from './components/layout/MobileCtaBar.jsx'
import Hero from './components/sections/Hero.jsx'
import Usps from './components/sections/Usps.jsx'
import Network from './components/sections/Network.jsx'
import Process from './components/sections/Process.jsx'
import Pricing from './components/sections/Pricing.jsx'
import Contact from './components/sections/Contact.jsx'
import FaqPage from './components/pages/FaqPage.jsx'
import ImprintPage from './components/pages/ImprintPage.jsx'
import PrivacyPage from './components/pages/PrivacyPage.jsx'
import useReveal from './hooks/useReveal.js'
import useRoute from './hooks/useRoute.js'

function Home() {
  return (
    <>
      <Hero />
      <Usps />
      <Network />
      <Process />
      <Pricing />
      <Contact />
    </>
  )
}

const pages = { home: Home, faq: FaqPage, impressum: ImprintPage, datenschutz: PrivacyPage }

export default function App() {
  const page = useRoute()
  useReveal(page)
  const Page = pages[page]

  return (
    <>
      <a className="skip-link" href="#main">Zum Inhalt springen</a>
      <Header />
      <main id="main">
        <Page />
      </main>
      <Footer />
      {page === 'home' && <MobileCtaBar />}
    </>
  )
}
