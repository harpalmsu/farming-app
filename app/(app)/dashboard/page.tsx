import { ArrowDownRight, ArrowUpRight, ClipboardCheck, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EntriesTable } from "@/components/entries-table";
import { PageHeader } from "@/components/page-header";
import { CategoryPieChart, FarmBarChart, IncomeExpenseChart } from "@/components/charts";
import { getDashboardData } from "@/lib/repository";
import { formatINR } from "@/lib/utils";

export default async function DashboardPage() {
  const dashboard = await getDashboardData();
  const cards = [
    { label: "Approved Income", value: formatINR(dashboard.totals.income), icon: ArrowUpRight },
    { label: "Approved Expenses", value: formatINR(dashboard.totals.expenses), icon: ArrowDownRight },
    { label: "Net Profit/Loss", value: formatINR(dashboard.totals.profit), icon: Wallet },
    { label: "Pending Approvals", value: String(dashboard.totals.pendingApprovals), icon: ClipboardCheck }
  ];

  return (
    <>
      <PageHeader title="Dashboard" description="Graph and table view of approved financials, pending work, and farm-level performance." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.label}>
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <div className="text-sm text-[var(--muted-foreground)]">{card.label}</div>
                  <div className="mt-2 text-2xl font-bold">{card.value}</div>
                </div>
                <div className="rounded-md bg-[var(--muted)] p-3">
                  <Icon className="h-5 w-5 text-[var(--primary)]" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <IncomeExpenseChart data={dashboard.monthly} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Expense Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryPieChart data={dashboard.categoryBreakdown} />
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Farm Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <FarmBarChart data={dashboard.farmSummary} />
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <PageHeader title="Recent Entries" />
        <EntriesTable data={dashboard.recentEntries} />
      </div>
    </>
  );
}
