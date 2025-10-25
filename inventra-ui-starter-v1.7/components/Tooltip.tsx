export function Tooltip({ tip, children }: { tip: string; children: React.ReactNode }) {
  return <span className="tooltip" data-tip={tip}>{children}</span>;
}
