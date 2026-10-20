import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import { useThemeTokens } from "../../hooks/useThemeTokens";
import { usePrefs } from "../../context/PrefsContext";

function RadarTip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { s, v } = payload[0].payload;
  return (
    <div className="chart-tip">
      <span>{s}</span>
      <strong>{v}</strong>
    </div>
  );
}

// Lazy-loaded: Recharts is the heaviest dependency on the page.
export default function SkillRadar({ data, id }) {
  const tokens = useThemeTokens();
  const { reducedMotion } = usePrefs();
  if (!tokens) return null;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={data} outerRadius="72%" margin={{ top: 8, right: 24, bottom: 8, left: 24 }}>
        <PolarGrid stroke={tokens.line} strokeOpacity={0.6} gridType="polygon" />
        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
        <PolarAngleAxis dataKey="s" tick={{ fill: tokens["ink-2"], fontSize: 12, fontWeight: 500, fontFamily: "-apple-system, BlinkMacSystemFont, Inter, Segoe UI, sans-serif" }} />
        <Tooltip content={<RadarTip />} cursor={false} />
        <Radar
          key={id}
          dataKey="v"
          stroke={tokens.link}
          strokeWidth={2}
          fill={tokens.link}
          fillOpacity={0.12}
          dot={{ r: 3, fill: tokens.link, strokeWidth: 0 }}
          isAnimationActive={!reducedMotion}
          animationDuration={900}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
