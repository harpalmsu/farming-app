import { demoEntries, demoCategories, demoFarms, demoFields, demoSeasons } from "@/lib/demo-data";
import type { ApprovalStatus, LedgerEntry } from "@/lib/types";
import type { LedgerEntryInput } from "@/lib/validations";

const globalDemo = globalThis as unknown as {
  farmFinanceDemoEntries?: LedgerEntry[];
};

function entries() {
  if (!globalDemo.farmFinanceDemoEntries) {
    globalDemo.farmFinanceDemoEntries = demoEntries.map((entry) => ({ ...entry }));
  }

  return globalDemo.farmFinanceDemoEntries;
}

export function getDemoEntries() {
  return entries();
}

export function createDemoEntry(input: LedgerEntryInput) {
  const category = demoCategories.find((item) => item.id === input.categoryId);
  const farm = demoFarms.find((item) => item.id === input.farmId);
  const field = demoFields.find((item) => item.id === input.fieldId);
  const season = demoSeasons.find((item) => item.id === input.cropSeasonId);

  entries().unshift({
    id: `demo-${Date.now()}`,
    type: input.type,
    date: input.date,
    title: input.title,
    categoryId: input.categoryId,
    categoryName: category?.name ?? "Uncategorized",
    farmId: input.farmId,
    farmName: farm?.name ?? "Unknown farm",
    fieldId: input.fieldId,
    fieldName: field?.name,
    cropSeasonId: input.cropSeasonId,
    cropSeasonName: season?.seasonName,
    partyName: input.partyName,
    quantity: input.quantity,
    unit: input.unit,
    rate: input.rate,
    amount: input.amount,
    amountPaid: input.amountPaid,
    paymentStatus: input.paymentStatus,
    approvalStatus: "PENDING_APPROVAL",
    paymentMethod: input.paymentMethod,
    paymentDate: input.paymentDate,
    notes: input.notes,
    createdBy: "Demo operator"
  });
}

export function updateDemoApproval(id: string, status: ApprovalStatus) {
  const entry = entries().find((item) => item.id === id);
  if (entry) {
    entry.approvalStatus = status;
  }
}
