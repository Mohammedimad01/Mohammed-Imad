import Reveal from "./Reveal";

// Section opener in Apple's two-tone style: the statement in full ink, the
// qualifier in secondary grey. level={1} when the section is the page's main
// heading (one H1 per page). align="center" for the home page's set pieces.
export default function SectionHeader({ eyebrow, title, accent, lede, id, level = 2, align = "start" }) {
  const H = level === 1 ? "h1" : "h2";
  return (
    <Reveal as="header" className={`sec-head sec-head--${align}`}>
      {eyebrow && <p className="sec-head__eyebrow">{eyebrow}</p>}
      <H className="sec-head__title" id={id}>
        {title}
        {accent && (
          <>
            {" "}
            <span className="sec-head__accent">{accent}</span>
          </>
        )}
      </H>
      {lede && <p className="sec-head__lede">{lede}</p>}
    </Reveal>
  );
}
