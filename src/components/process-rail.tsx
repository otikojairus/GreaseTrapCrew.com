const steps = [
  { n: "01", title: "Scope & access", body: "Trap size, hood volume, and after-hours entry confirmed before dispatch." },
  { n: "02", title: "Pump & clean", body: "Vacuum, scrape baffles, flush lines, and reset covers without leaving debris." },
  { n: "03", title: "Inspect & advise", body: "Note corrosion, missing gaskets, or overflow risk — with plain-language next steps." },
  { n: "04", title: "Manifest & follow-up", body: "Digital service record the same day; optional recurring schedule so nothing lapses." },
];

export function ProcessRail() {
  return (
    <ol className="process-rail">
      {steps.map((step) => (
        <li key={step.n} className="process-step">
          <span className="process-step-n">{step.n}</span>
          <h3>{step.title}</h3>
          <p>{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
