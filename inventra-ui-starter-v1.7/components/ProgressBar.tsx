export function ProgressBar({ value, indeterminate=false }: { value?: number; indeterminate?: boolean }) {
  return (
    <div className="relative h-1 w-full overflow-hidden rounded-full bg-bg-subtle">
      <div
        className="absolute top-0 left-0 h-full bg-[color:var(--color-brand-solid)] transition-all"
        style={{ width: indeterminate ? '40%' : `${value||0}%`, animation: indeterminate ? 'barSlide 1.2s var(--ease-standard) infinite' : undefined }}
      />
    </div>
  );
}
