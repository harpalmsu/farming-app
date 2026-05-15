import { Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EntriesTable } from "@/components/entries-table";
import { PageHeader } from "@/components/page-header";
import { getDashboardData, getLedgerEntries } from "@/lib/repository";
import { formatINR } from "@/lib/utils";

export default async function ReportsPage() {
  const [dashboard, entries] = await Promise.all([getDashboardData(), getLedgerEntries()]);

  return (
    <>
      <PageHeader
        title="Reports"
        description="Monthly summary, export support, and email report preview."
        action={
          <div className="flex gap-2">
            <Button asChild variant="secondary">
              <a href="/api/export/entries.csv">
                <Download className="h-4 w-4" />
                CSV
              </a>
            </Button>
            <Button asChild>
              <a href="/api/reports/monthly" target="_blank">
                <Mail className="h-4 w-4" />
                Monthly Email Preview
              </a>
            </Button>
          </div>
        }
      />
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Total Income</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">{formatINR(dashboard.totals.income)}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Total Expenses</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">{formatINR(dashboard.totals.expenses)}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Pending Payments</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">{formatINR(dashboard.totals.pendingPayments)}</CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <EntriesTable data={entries} />
      </div>
    </>
  );
}
