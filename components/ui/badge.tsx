import { cn } from "@/lib/utils";

const styles = {
  APPROVED: "bg-emerald-100 text-emerald-800",
  PENDING_APPROVAL: "bg-amber-100 text-amber-800",
  REJECTED: "bg-red-100 text-red-800",
  ARCHIVED: "bg-slate-200 text-slate-700",
  DRAFT: "bg-slate-100 text-slate-700",
  PAID: "bg-emerald-100 text-emerald-800",
  PARTIAL: "bg-blue-100 text-blue-800",
  UNPAID: "bg-amber-100 text-amber-800",
  OVERDUE: "bg-red-100 text-red-800",
  CANCELLED: "bg-slate-200 text-slate-700"
};

export function Badge({ value, className }: { value: string; className?: string }) {
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", styles[value as keyof typeof styles] ?? "bg-slate-100 text-slate-700", className)}>
      {value.replaceAll("_", " ")}
    </span>
  );
}
