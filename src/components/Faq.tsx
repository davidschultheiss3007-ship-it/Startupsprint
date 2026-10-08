import { faq } from '../content'
import SectionHead from './SectionHead'
import { CtaLink } from './CtaButton'

export default function Faq() {
  return (
    <section id="fragen" className="section">
      <div className="wrap faq">
        <SectionHead kicker={faq.kicker} title={faq.title} />
        <div className="faq__list">
          {faq.items.map((item, i) => (
            <details className="faq__item" key={i} data-reveal>
              <summary>
                <span>{item.q}</span>
                <span className="faq__icon" aria-hidden="true" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
        <div className="faq__cta" data-reveal>
          <CtaLink />
        </div>
      </div>
    </section>
  )
}
