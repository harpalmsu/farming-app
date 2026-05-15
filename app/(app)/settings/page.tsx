import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";

const settings = [
  ["Currency", "Indian Rupees (INR/₹)"],
  ["Authentication", "Supabase Auth when NEXT_PUBLIC_SUPABASE_URL and keys are configured"],
  ["Database", "PostgreSQL through Prisma when DATABASE_URL is configured"],
  ["Monthly report", "Email through Resend when RESEND_API_KEY and MONTHLY_REPORT_TO are configured"],
  ["Deletion policy", "Archive records for audit instead of permanent delete"],
  ["Attachments", "Kept in PRD as future support"]
];

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" description="MVP configuration checkpoints from the PRD." />
      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-[var(--border)]">
            {settings.map(([label, value]) => (
              <div key={label} className="grid gap-1 py-4 md:grid-cols-[220px_1fr]">
                <div className="font-medium">{label}</div>
                <div className="text-sm text-[var(--muted-foreground)]">{value}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
