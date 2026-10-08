import { Fragment } from 'react'
import { brand, hero } from '../content'
import { CtaLink } from './CtaButton'

export default function Hero({ showFallbackArt }: { showFallbackArt: boolean }) {
  const words = hero.title.split(' ')
  return (
    <header id="top" className="hero">
      <div className="brand" data-hero-in>
        <svg viewBox="0 0 64 64" width="22" height="22" aria-hidden="true">
          <path d="M32 6 54 32 32 58 10 32Z" fill="var(--accent)" />
          <path d="M32 6 54 32H10Z" fill="var(--accent-light)" />
        </svg>
        <span>{brand}</span>
      </div>

      {showFallbackArt && (
        <svg className="hero__art" viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="88" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity=".5" />
          <path d="M100 30 150 100 100 170 50 100Z" fill="var(--accent)" />
          <path d="M100 30 150 100H50Z" fill="var(--accent-light)" />
        </svg>
      )}

      <div className="wrap hero__inner">
        <p className="eyebrow" data-hero-in>
          {hero.eyebrow}
        </p>
        <h1 className="hero__title" aria-label={hero.title}>
          {words.map((w, i) => (
            <Fragment key={i}>
              {i > 0 && ' '}
              <span className="hero__wordwrap" aria-hidden="true">
                <span className="hero__word">{w}</span>
              </span>
            </Fragment>
          ))}
        </h1>
        <p className="hero__sub" data-hero-in>
          {hero.sub}
        </p>
        <div data-hero-in>
          <CtaLink />
        </div>
      </div>

      <div className="hero__hint" aria-hidden="true" data-hero-in>
        <span />
      </div>
    </header>
  )
}
