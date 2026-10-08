export default function SectionHead({ kicker, title, lead }: { kicker: string; title: string; lead?: string }) {
  return (
    <div className="section-head">
      <p className="kicker" data-reveal>
        {kicker}
      </p>
      <h2 data-reveal>{title}</h2>
      {lead && (
        <p className="lead" data-reveal>
          {lead}
        </p>
      )}
    </div>
  )
}
