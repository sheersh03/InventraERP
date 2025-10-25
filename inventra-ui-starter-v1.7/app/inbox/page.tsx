import { AppShell } from "@/components/AppShell";
import { NotificationsCenter } from "@/components/NotificationsCenter";

export default function InboxPage() {
  return (
    <AppShell>
      <header className="flex items-center gap-3 water-in">
        <h1 className="text-xl font-semibold">Inbox</h1>
      </header>
      <NotificationsCenter />
    </AppShell>
  );
}
