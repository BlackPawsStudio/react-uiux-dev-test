export default function StatCard({ label, value, trend }) {
  const trendClass = trend > 0 ? "good" : trend < 0 ? "bad" : "neutral";
  const trendPrefix = trend > 0 ? "+" : "";

  return (
    <article className="stat-card">
      <p>{label}</p>
      <strong>{value}</strong>
      <span className={trendClass}>
        {trendPrefix}
        {trend}%
      </span>
    </article>
  );
}
