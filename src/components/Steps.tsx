import { steps } from '../content'

export default function Steps() {
  return (
    <section id="ablauf" className="steps" data-active="0">
      <div className="steps__sticky">
        <div className="wrap steps__layout">
          <div className="section-head">
            <p className="kicker">{steps.kicker}</p>
            <h2>{steps.title}</h2>
          </div>
          <div className="steps__panel">
            <ol className="steps__list">
              {steps.items.map((s, i) => (
                <li className="step" data-i={i} key={i}>
                  <span className="step__num">0{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
            <div className="steps__track" aria-hidden="true">
              {steps.items.map((_, i) => (
                <span key={i} data-i={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
