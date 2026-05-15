import Link from "next/link";
import { BarChart3, ClipboardCheck, FileText, Home, Landmark, Leaf, Settings, Users } from "lucide-react";
import { getCurrentSession } from "@/lib/supabase/server";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/entries", label: "Entries", icon: FileText },
  { href: "/entries/new", label: "Add Entry", icon: Leaf },
  { href: "/approvals", label: "Approvals", icon: ClipboardCheck },
  { href: "/reports", label: "Reports", icon: BarChart3 },
  { href: "/farms", label: "Farms", icon: Landmark },
  { href: "/users", label: "Users", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings }
];

export async function AppShell({ children }: { children: React.ReactNode }) {
  const user = await getCurrentSession();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-[var(--border)] bg-white lg:block">
        <div className="flex h-16 items-center border-b border-[var(--border)] px-6">
          <div>
            <div className="text-lg font-bold">Farm Finance</div>
            <div className="text-xs text-[var(--muted-foreground)]">INR farming MVP</div>
          </div>
        </div>
        <nav className="space-y-1 p-3">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-[var(--muted)]">
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-white/95 px-4 py-3 backdrop-blur lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="lg:hidden">
              <div className="font-bold">Farm Finance</div>
              <div className="text-xs text-[var(--muted-foreground)]">MVP dashboard</div>
            </div>
            <div className="hidden lg:block">
              <div className="text-sm text-[var(--muted-foreground)]">Operational finance control for farms</div>
            </div>
            <div className="rounded-md bg-[var(--muted)] px-3 py-2 text-sm">
              {user?.email ?? "Demo mode"}
            </div>
          </div>
          <nav className="mt-3 flex gap-2 overflow-x-auto lg:hidden">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="whitespace-nowrap rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm">
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
