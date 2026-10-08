import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import '@fontsource-variable/space-grotesk'
import './styles/global.css'
import App from './App'
import { prefersReducedMotion } from './motion'

if (!prefersReducedMotion()) document.documentElement.classList.add('js-motion')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
