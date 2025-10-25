export function Badge({ tone='info', children }: { tone?: 'success'|'warning'|'error'|'info'; children: React.ReactNode }) {
  const map = {
    success: 'bg-[color:var(--color-success)]',
    warning: 'bg-[color:var(--color-warning)]',
    error:   'bg-[color:var(--color-error)]',
    info:    'bg-[color:var(--color-info)]'
  } as const;
  return <span className={`px-2 py-1 text-xs rounded-md text-white ${map[tone]}`}>{children}</span>;
}
