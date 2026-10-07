import { PROFILE } from "../../data/meta";
import { EXPERIENCE } from "../../data/experience";
import Tilt from "../common/Tilt";

// The "Most recently / Previously" summary, written as the profile object an
// analytics developer would actually keep. Real text, so it's crawlable.
const k = (s) => <span className="tk-k">{s}</span>;
const str = (s) => <span className="tk-s">&quot;{s}&quot;</span>;
const cm = (s) => <span className="tk-c">{`// ${s}`}</span>;
const p = (s) => <span className="tk-p">{s}</span>;

export default function HeroCode() {
  const [current, ...previous] = EXPERIENCE;
  const stack = ["SQL", "Python", "Power BI", "React"];

  const lines = [
    <>{p("const")} <span className="tk-v">analyst</span> {p("= {")}</>,
    <>  {k("role")}: {str(PROFILE.headline)},</>,
    <>  {k("base")}: {str(PROFILE.location)},</>,
    <>  {k("stack")}: [{stack.map((s, i) => <span key={s}>{str(s)}{i < stack.length - 1 ? ", " : ""}</span>)}],</>,
    <>  {cm("most recently")}</>,
    <>  {k("recent")}: {str(`${current.role} @ ${current.co}`)},</>,
    <>  {k("period")}: {str(current.period)},</>,
    <>  {cm("previously")}</>,
    <>  {k("previous")}: [</>,
    ...previous.map((e, i) => (
      <>    {str(e.co)}{i < previous.length - 1 ? "," : ""} {cm(e.type.toLowerCase())}</>
    )),
    <>  ],</>,
    <>  {k("status")}: {str("open_to_work")},</>,
    <>{p("};")}</>,
  ];

  // Entrance (.rise) and tilt both use transform, so they live on separate elements.
  return (
    <div className="hero__code rise" style={{ "--i": 5 }}>
      <Tilt as="figure" className="code" aria-label={`Most recently ${current.role} at ${current.co}`}>
        <div className="code__bar">
          <span className="code__dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="code__file">profile.ts</span>
          <span className="code__live"><span className="avail__dot" aria-hidden="true" /> live</span>
        </div>
        <pre className="code__body">
          <code>
            {lines.map((l, i) => (
              <span key={i} className="code__ln" style={{ "--l": i }}>
                <span className="code__no" aria-hidden="true">{String(i + 1).padStart(2, " ")}</span>
                <span className="code__tx">{l}</span>
                {"\n"}
              </span>
            ))}
          </code>
        </pre>
      </Tilt>
    </div>
  );
}
