import Reveal from "./Reveal";

// Section opener: the heading carries the section on its own (no folio
// number or kicker label above it), with an optional lede underneath.
// level={1} when the section is the page's main heading (one H1 per page).
export default function SectionHeader({ title, accent, lede, id, level = 2 }) {
  const H = level === 1 ? "h1" : "h2";
  return (
    <Reveal as="header" className="sec-head">
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
