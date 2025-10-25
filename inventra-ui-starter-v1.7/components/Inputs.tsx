export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-borderc-soft bg-bg-elevated px-3 py-2 text-sm outline-none focus:border-borderc-strong ${props.className||''}`}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full rounded-lg border border-borderc-soft bg-bg-elevated px-3 py-2 text-sm outline-none focus:borderc-strong ${props.className||''}`}
    />
  );
}
