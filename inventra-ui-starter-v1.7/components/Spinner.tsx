export function Spinner({ size=16 }: { size?: number }) {
  const s = `${size}px`;
  return (
    <div
      className="inline-block border-2 border-[rgba(255,255,255,0.6)] border-t-[rgba(255,255,255,1)] rounded-full spin"
      style={{ width: s, height: s }}
      aria-label="Loading"
    />
  );
}
