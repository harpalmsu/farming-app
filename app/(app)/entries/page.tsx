import Link from "next/link";
import { Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EntriesTable } from "@/components/entries-table";
import { PageHeader } from "@/components/page-header";
import { getLedgerEntries } from "@/lib/repository";

export default async function EntriesPage() {
  const entries = await getLedgerEntries();

  return (
    <>
      <PageHeader
        title="Entries"
        description="Track expenses, income, payment state, approval state, and crop season links."
        action={
          <div className="flex gap-2">
            <Button asChild variant="secondary">
              <a href="/api/export/entries.csv">
                <Download className="h-4 w-4" />
                CSV
              </a>
            </Button>
            <Button asChild>
              <Link href="/entries/new">
                <Plus className="h-4 w-4" />
                Add Entry
              </Link>
            </Button>
          </div>
        }
      />
      <EntriesTable data={entries} />
    </>
  );
}
