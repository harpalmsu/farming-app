import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { getBootstrapData } from "@/lib/repository";

export default async function UsersPage() {
  const { users, farms } = await getBootstrapData();

  return (
    <>
      <PageHeader title="Users" description="Admin role management, lock state, and farm assignment overview." />
      <div className="grid gap-3">
        {users.map((user) => (
          <Card key={user.id}>
            <CardContent className="flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-semibold">{user.name}</div>
                <div className="text-sm text-[var(--muted-foreground)]">{user.email}</div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[var(--muted)] px-3 py-1 text-sm">{user.role}</span>
                <Badge value={user.status} />
                <span className="text-sm text-[var(--muted-foreground)]">
                  {farms.find((farm) => farm.id === user.assignedFarmId)?.name ?? "All permitted data"}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
