export function StatCard({
  title, value, hint
}: { title: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl p-4 border border-borderc-soft bg-bg-elevated water-in">
      <div className="text-xs text-textc-muted">{title}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
      {hint ? <div className="text-xs text-textc-secondary mt-2">{hint}</div> : null}
    </div>
  );
}
