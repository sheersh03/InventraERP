export function Skeleton({ className='' }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-[rgba(0,0,0,0.06)] dark:bg-[rgba(255,255,255,0.08)] ${className}`} />;
}
