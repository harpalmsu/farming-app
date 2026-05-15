import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EntryForm } from "@/components/entry-form";
import { PageHeader } from "@/components/page-header";
import { getBootstrapData } from "@/lib/repository";

export default async function NewEntryPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const [{ farms, fields, seasons, categories }, params] = await Promise.all([getBootstrapData(), searchParams]);

  return (
    <>
      <PageHeader title="Add Entry" description="Operator entries go to Pending Approval before final reporting." />
      <Card>
        <CardHeader>
          <CardTitle>Daily Cost or Income</CardTitle>
        </CardHeader>
        <CardContent>
          <EntryForm farms={farms} fields={fields} seasons={seasons} categories={categories} error={params.error} />
        </CardContent>
      </Card>
    </>
  );
}
