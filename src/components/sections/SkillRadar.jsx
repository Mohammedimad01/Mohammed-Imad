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
        <PolarGrid stroke={tokens.line} gridType="polygon" />
        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
        <PolarAngleAxis dataKey="s" tick={{ fill: tokens["ink-2"], fontSize: 11, fontFamily: "JetBrains Mono, monospace" }} />
        <Tooltip content={<RadarTip />} cursor={false} />
        <Radar
          key={id}
          dataKey="v"
          stroke={tokens.accent}
          strokeWidth={1.5}
          fill={tokens.accent}
          fillOpacity={0.14}
          dot={{ r: 2.5, fill: tokens.accent, strokeWidth: 0 }}
          isAnimationActive={!reducedMotion}
          animationDuration={700}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
