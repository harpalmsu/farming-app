import { getLedgerEntries } from "@/lib/repository";

function csvValue(value: unknown) {
  const text = String(value ?? "");
  return `"${text.replaceAll("\"", "\"\"")}"`;
}

export async function GET() {
  const entries = await getLedgerEntries();
  const header = ["Date", "Type", "Title", "Farm", "Field", "Crop Season", "Category", "Amount INR", "Paid INR", "Payment Status", "Approval Status"];
  const rows = entries.map((entry) => [
    entry.date,
    entry.type,
    entry.title,
    entry.farmName,
    entry.fieldName,
    entry.cropSeasonName,
    entry.categoryName,
    entry.amount,
    entry.amountPaid,
    entry.paymentStatus,
    entry.approvalStatus
  ]);

  const csv = [header, ...rows].map((row) => row.map(csvValue).join(",")).join("\n");
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=farm-finance-entries.csv"
    }
  });
}
