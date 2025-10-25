export function GlassPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-4 shadow-glass [background:var(--glass-bg)] [border:1px_solid_var(--glass-br)] backdrop-blur-12">
      {children}
    </div>
  );
}
