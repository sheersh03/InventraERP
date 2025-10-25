import Link from "next/link";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-20 backdrop-blur-12 [background:var(--glass-bg)] [border-bottom:1px_solid_var(--glass-br)] shadow-glass">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
        <div className="h-6 w-6 rounded-md bg-brand-gradient" aria-hidden />
        <span className="font-semibold">Inventra</span>
        <div className="flex-1" />
        <Link className="text-sm text-textc-secondary hover:underline" href="/">Dashboard</Link>
        <Link className="text-sm text-textc-secondary hover:underline ml-4" href="/inventory">Inventory</Link>
        <Link className="text-sm text-textc-secondary hover:underline ml-4" href="/production">Production</Link>
      </div>
    </nav>
  );
}
