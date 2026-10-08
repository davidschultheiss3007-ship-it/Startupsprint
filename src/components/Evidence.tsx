import { evidence } from '../content'
import SectionHead from './SectionHead'

export default function Evidence() {
  return (
    <section id="belege" className="section">
      <div className="wrap">
        <SectionHead kicker={evidence.kicker} title={evidence.title} />
        <div className="stats">
          {evidence.items.map((s, i) => (
            <div className="stat card" key={i} data-reveal>
              <span className="stat__value">{s.value}</span>
              <span className="stat__label">{s.label}</span>
            </div>
          ))}
          {evidence.notes.map((n, i) => (
            <div className="note card" key={i} data-reveal>
              <h3>{n.title}</h3>
              <p>{n.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
