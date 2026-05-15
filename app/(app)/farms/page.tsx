import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { getBootstrapData } from "@/lib/repository";

export default async function FarmsPage() {
  const { farms, fields, seasons } = await getBootstrapData();

  return (
    <>
      <PageHeader title="Farms" description="Multi-farm, field, and crop season setup for reporting scope." />
      <div className="grid gap-4 lg:grid-cols-2">
        {farms.map((farm) => (
          <Card key={farm.id}>
            <CardHeader>
              <CardTitle>{farm.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-[var(--muted-foreground)]">{farm.location ?? "No location"} · {farm.owner ?? "No owner"}</div>
              <div className="mt-4 grid gap-3">
                {fields.filter((field) => field.farmId === farm.id).map((field) => (
                  <div key={field.id} className="rounded-md border border-[var(--border)] p-3">
                    <div className="font-medium">{field.name}</div>
                    <div className="text-sm text-[var(--muted-foreground)]">
                      {field.area ?? "-"} {field.areaUnit ?? ""} · {field.irrigationSource ?? "No irrigation source"}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <div className="text-sm font-semibold">Crop seasons</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {seasons.filter((season) => season.farmId === farm.id).map((season) => (
                    <span key={season.id} className="rounded-full bg-[var(--muted)] px-3 py-1 text-sm">
                      {season.seasonName}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
