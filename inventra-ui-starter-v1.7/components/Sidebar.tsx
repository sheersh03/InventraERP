'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();
  const items = [
    { href: "/webhooks", label: "Webhooks" } ,
    { href: "/audit", label: "Audit" } ,
    { href: "/integrations", label: "Integrations" } ,
    { href: "/billing", label: "Billing" } ,
    { href: "/approvals", label: "Approvals" } ,
    { href: "/inbox", label: "Inbox" } ,
    { href: "/invis", label: "invis" } ,
    { href: "/orders", label: "Orders" },
    { href: "/", label: "Dashboard" },
    { href: "/inventory", label: "Inventory" },
    { href: "/production", label: "Production" },
    { href: "/sales", label: "Sales" }
  ];

  return (
    <aside className="hidden md:block w-56 shrink-0 h-[calc(100vh-56px)] sticky top-[56px] border-r border-borderc-soft bg-bg-elevated">
      <div className="p-3 text-xs text-textc-secondary">Inventra</div>
      <nav className="px-2 space-y-1">
        {items.map(it => {
          const active = pathname === it.href;
          return (
            <Link key={it.href} href={it.href}
              className={`block rounded-lg px-3 py-2 text-sm ${active ? 'bg-bg-subtle text-textc-primary border border-borderc-soft' : 'text-textc-secondary hover:text-textc-primary'}`}>
              {it.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
