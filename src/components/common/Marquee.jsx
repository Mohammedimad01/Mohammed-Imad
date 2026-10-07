// Infinite, seamless horizontal loop: the list is rendered twice and the
// track slides by exactly one copy. The second copy is hidden from assistive
// tech so screen readers hear each item once. Pauses on hover/focus; under
// reduced motion it becomes a plain horizontally scrollable row.
export default function Marquee({ items, render, reverse = false, duration = 40, label, className = "" }) {
  return (
    <div className={`marquee ${className}`} role="region" aria-label={label}>
      <div className={`marquee__track${reverse ? " is-reverse" : ""}`} style={{ "--dur": `${duration}s` }}>
        <ul className="marquee__group">{items.map((it, i) => render(it, i))}</ul>
        <ul className="marquee__group" aria-hidden="true">
          {items.map((it, i) => render(it, i))}
        </ul>
      </div>
    </div>
  );
}
