import { getDashboardData, getLedgerEntries } from "@/lib/repository";
import { formatDate, formatINR } from "@/lib/utils";

export async function buildMonthlyReportText() {
  const dashboard = await getDashboardData();
  const entries = await getLedgerEntries();
  const lines = [
    "Farm Finance Tracker - Monthly Report",
    "",
    `Total income: ${formatINR(dashboard.totals.income)}`,
    `Total expenses: ${formatINR(dashboard.totals.expenses)}`,
    `Net profit/loss: ${formatINR(dashboard.totals.profit)}`,
    `Pending payments: ${formatINR(dashboard.totals.pendingPayments)}`,
    `Pending approvals: ${dashboard.totals.pendingApprovals}`,
    "",
    "Recent entries:",
    ...entries.slice(0, 10).map((entry) => `${formatDate(entry.date)} | ${entry.type} | ${entry.title} | ${formatINR(entry.amount)} | ${entry.approvalStatus}`)
  ];

  return lines.join("\n");
}
