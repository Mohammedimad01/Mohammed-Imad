// Fixed atmosphere: a faint baseline grid, a column rule set and film grain.
export default function GridBackground() {
  return (
    <div className="atmos" aria-hidden="true">
      <div className="atmos__grid" />
      <div className="atmos__glow" />
      <svg className="atmos__grain" width="100%" height="100%">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
