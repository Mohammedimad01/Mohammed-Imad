import Reveal from "./Reveal";
import ScrambleText from "./ScrambleText";

// Editorial section opener: running folio number, kicker and a two-line title.
export default function SectionHeader({ index, kicker, title, accent, lede, id }) {
  return (
    <Reveal as="header" className="sec-head">
      <div className="sec-head__meta">
        <span className="sec-head__no">§ {String(index).padStart(2, "0")}</span>
        <span className="sec-head__rule" aria-hidden="true" />
        <ScrambleText className="sec-head__kicker" text={kicker} />
      </div>
      <h2 className="sec-head__title" id={id}>
        {title}
        {accent && (
          <>
            {" "}
            <em>{accent}</em>
          </>
        )}
      </h2>
      {lede && <p className="sec-head__lede">{lede}</p>}
    </Reveal>
  );
}
