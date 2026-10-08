import { brand } from '../content'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <span>
          © {new Date().getFullYear()} {brand}
        </span>
        <div className="footer__links">
          <a href="#impressum">Impressum</a>
          <a href="#datenschutz">Datenschutz</a>
        </div>
      </div>
    </footer>
  )
}
