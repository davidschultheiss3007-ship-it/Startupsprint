import { useRef, type PointerEvent } from 'react'
import { problem } from '../content'
import SectionHead from './SectionHead'

function Quote({ text, index }: { text: string; index: number }) {
  const inner = useRef<HTMLDivElement>(null)
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !inner.current) return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    inner.current.style.setProperty('--rx', `${(-y * 10).toFixed(2)}deg`)
    inner.current.style.setProperty('--ry', `${(x * 12).toFixed(2)}deg`)
    inner.current.style.setProperty('--gx', `${((x + 0.5) * 100).toFixed(1)}%`)
    inner.current.style.setProperty('--gy', `${((y + 0.5) * 100).toFixed(1)}%`)
  }
  const onLeave = () => {
    inner.current?.style.setProperty('--rx', '0deg')
    inner.current?.style.setProperty('--ry', '0deg')
  }
  return (
    <figure className="quote" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="quote__inner" ref={inner}>
        <span className="quote__mark" aria-hidden="true">
          „
        </span>
        <blockquote>{text}</blockquote>
        <span className="quote__index" aria-hidden="true">
          0{index + 1}
        </span>
      </div>
    </figure>
  )
}

export default function Problem() {
  return (
    <section id="problem" className="section">
      <div className="wrap">
        <SectionHead kicker={problem.kicker} title={problem.title} lead={problem.lead} />
        <div className="quotes">
          {problem.quotes.map((q, i) => (
            <Quote key={i} text={q} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
