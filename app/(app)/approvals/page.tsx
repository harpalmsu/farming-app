import { updateApproval } from "@/app/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { getDashboardData } from "@/lib/repository";
import { formatDate, formatINR } from "@/lib/utils";

export default async function ApprovalsPage() {
  const dashboard = await getDashboardData();

  return (
    <>
      <PageHeader title="Approvals" description="Admin review queue for operator-created records before final reports." />
      <div className="grid gap-4">
        {dashboard.pendingApprovals.length ? (
          dashboard.pendingApprovals.map((entry) => (
            <Card key={entry.id}>
              <CardContent className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-semibold">{entry.title}</h2>
                    <Badge value={entry.type} />
                    <Badge value={entry.paymentStatus} />
                  </div>
                  <div className="mt-2 text-sm text-[var(--muted-foreground)]">
                    {formatDate(entry.date)} · {entry.farmName} · {entry.categoryName} · {formatINR(entry.amount)}
                  </div>
                  {entry.notes ? <p className="mt-2 text-sm">{entry.notes}</p> : null}
                </div>
                <div className="flex gap-2">
                  <form action={updateApproval}>
                    <input type="hidden" name="id" value={entry.id} />
                    <input type="hidden" name="status" value="APPROVED" />
                    <Button type="submit" size="sm">Approve</Button>
                  </form>
                  <form action={updateApproval}>
                    <input type="hidden" name="id" value={entry.id} />
                    <input type="hidden" name="status" value="REJECTED" />
                    <Button type="submit" size="sm" variant="secondary">Reject</Button>
                  </form>
                  <form action={updateApproval}>
                    <input type="hidden" name="id" value={entry.id} />
                    <input type="hidden" name="status" value="ARCHIVED" />
                    <Button type="submit" size="sm" variant="destructive">Archive</Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-5 text-sm text-[var(--muted-foreground)]">No pending approvals.</CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
