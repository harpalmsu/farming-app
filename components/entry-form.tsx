import { createLedgerEntry } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/input";
import type { Category, CropSeason, Farm, Field } from "@/lib/types";

export function EntryForm({
  farms,
  fields,
  seasons,
  categories,
  error
}: {
  farms: Farm[];
  fields: Field[];
  seasons: CropSeason[];
  categories: Category[];
  error?: string;
}) {
  return (
    <form action={createLedgerEntry} className="grid gap-5">
      {error ? <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="type">Type</Label>
          <Select id="type" name="type" defaultValue="EXPENSE">
            <option value="EXPENSE">Expense</option>
            <option value="INCOME">Income</option>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="date">Date</Label>
          <Input id="date" name="date" type="date" required defaultValue={new Date().toISOString().slice(0, 10)} />
        </div>
        <div className="grid gap-2 md:col-span-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" placeholder="Water usage, worker wages, crop sale..." required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="categoryId">Category</Label>
          <Select id="categoryId" name="categoryId" required>
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name} ({category.type.toLowerCase()})
              </option>
            ))}
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="farmId">Farm</Label>
          <Select id="farmId" name="farmId" required>
            <option value="">Select farm</option>
            {farms.map((farm) => (
              <option key={farm.id} value={farm.id}>
                {farm.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="fieldId">Field</Label>
          <Select id="fieldId" name="fieldId">
            <option value="">No field</option>
            {fields.map((field) => (
              <option key={field.id} value={field.id}>
                {field.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="cropSeasonId">Crop Season</Label>
          <Select id="cropSeasonId" name="cropSeasonId">
            <option value="">No season</option>
            {seasons.map((season) => (
              <option key={season.id} value={season.id}>
                {season.seasonName}
              </option>
            ))}
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="partyName">Vendor, Worker, or Buyer</Label>
          <Input id="partyName" name="partyName" placeholder="Name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="quantity">Quantity/Hours</Label>
          <Input id="quantity" name="quantity" type="number" min="0" step="0.01" placeholder="12" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="unit">Unit</Label>
          <Input id="unit" name="unit" placeholder="hours, days, quintal" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="rate">Rate (INR)</Label>
          <Input id="rate" name="rate" type="number" min="0" step="0.01" placeholder="350" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="amount">Total Amount (INR)</Label>
          <Input id="amount" name="amount" type="number" min="0" step="0.01" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="amountPaid">Amount Paid (INR)</Label>
          <Input id="amountPaid" name="amountPaid" type="number" min="0" step="0.01" defaultValue="0" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="paymentStatus">Payment Status</Label>
          <Select id="paymentStatus" name="paymentStatus" defaultValue="UNPAID">
            <option value="UNPAID">Unpaid</option>
            <option value="PARTIAL">Partial</option>
            <option value="PAID">Paid</option>
            <option value="OVERDUE">Overdue</option>
            <option value="CANCELLED">Cancelled</option>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="paymentMethod">Payment Method</Label>
          <Input id="paymentMethod" name="paymentMethod" placeholder="UPI, cash, bank transfer" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="paymentDate">Payment Date</Label>
          <Input id="paymentDate" name="paymentDate" type="date" />
        </div>
        <div className="grid gap-2 md:col-span-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" name="notes" placeholder="Extra context for approval and audit trail" />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Submit for Approval</Button>
      </div>
    </form>
  );
}
