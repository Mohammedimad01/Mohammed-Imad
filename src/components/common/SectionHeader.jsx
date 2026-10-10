import Reveal from "./Reveal";
import ScrambleText from "./ScrambleText";

// Editorial section opener: running folio number, kicker and a two-line title.
// level={1} when the section is the page's main heading (one H1 per page).
export default function SectionHeader({ index, kicker, title, accent, lede, id, level = 2 }) {
  const H = level === 1 ? "h1" : "h2";
  return (
    <Reveal as="header" className="sec-head">
      <div className="sec-head__meta">
        <span className="sec-head__no">{String(index).padStart(2, "0")}</span>
        <span className="sec-head__rule" aria-hidden="true" />
        <ScrambleText className="sec-head__kicker" text={kicker} />
      </div>
      <H className="sec-head__title" id={id}>
        {title}
        {accent && (
          <>
            {" "}
            <em>{accent}</em>
          </>
        )}
      </H>
      {lede && <p className="sec-head__lede">{lede}</p>}
    </Reveal>
  );
}
