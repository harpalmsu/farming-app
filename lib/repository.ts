import { prisma, hasDatabase } from "@/lib/prisma";
import { buildDashboard, demoCategories, demoFarms, demoFields, demoSeasons, demoUsers } from "@/lib/demo-data";
import { getDemoEntries } from "@/lib/demo-store";
import type { DashboardData, EntryType, LedgerEntry } from "@/lib/types";
import { toNumber } from "@/lib/utils";
import type { Prisma } from "@prisma/client";

type LedgerEntryWithRelations = Prisma.LedgerEntryGetPayload<{
  include: { category: true; farm: true; field: true; cropSeason: true; createdBy: true };
}>;

function normalizeEntry(entry: LedgerEntryWithRelations): LedgerEntry {
  return {
    id: entry.id,
    type: entry.type,
    date: entry.date instanceof Date ? entry.date.toISOString().slice(0, 10) : entry.date,
    title: entry.title,
    categoryId: entry.categoryId,
    categoryName: entry.category.name,
    farmId: entry.farmId,
    farmName: entry.farm.name,
    fieldId: entry.fieldId,
    fieldName: entry.field?.name,
    cropSeasonId: entry.cropSeasonId,
    cropSeasonName: entry.cropSeason?.seasonName,
    partyName: entry.partyName,
    quantity: entry.quantity ? toNumber(entry.quantity) : null,
    unit: entry.unit,
    rate: entry.rate ? toNumber(entry.rate) : null,
    amount: toNumber(entry.amount),
    amountPaid: toNumber(entry.amountPaid),
    paymentStatus: entry.paymentStatus,
    approvalStatus: entry.approvalStatus,
    paymentMethod: entry.paymentMethod,
    paymentDate: entry.paymentDate instanceof Date ? entry.paymentDate.toISOString().slice(0, 10) : entry.paymentDate,
    notes: entry.notes,
    createdBy: entry.createdBy?.name
  };
}

export async function getBootstrapData() {
  if (!hasDatabase()) {
    return {
      farms: demoFarms,
      fields: demoFields,
      seasons: demoSeasons,
      categories: demoCategories,
      users: demoUsers
    };
  }

  const [farms, fields, seasons, categories, users] = await Promise.all([
    prisma.farm.findMany({ orderBy: { name: "asc" } }),
    prisma.field.findMany({ orderBy: { name: "asc" } }),
    prisma.cropSeason.findMany({ orderBy: { startDate: "desc" } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.profile.findMany({ orderBy: { createdAt: "desc" } })
  ]);

  return {
    farms: farms.map((farm) => ({ ...farm })),
    fields: fields.map((field) => ({ ...field, area: field.area ? toNumber(field.area) : null })),
    seasons: seasons.map((season) => ({
      ...season,
      startDate: season.startDate.toISOString().slice(0, 10),
      expectedEndDate: season.expectedEndDate?.toISOString().slice(0, 10) ?? null
    })),
    categories: categories.map((category) => ({ ...category, type: category.type as EntryType })),
    users
  };
}

export async function getLedgerEntries(type?: EntryType) {
  if (!hasDatabase()) {
    return getDemoEntries().filter((entry) => !type || entry.type === type);
  }

  const entries = await prisma.ledgerEntry.findMany({
    where: type ? { type } : undefined,
    include: { category: true, farm: true, field: true, cropSeason: true, createdBy: true },
    orderBy: { date: "desc" }
  });

  return entries.map(normalizeEntry);
}

export async function getDashboardData(): Promise<DashboardData> {
  const entries = await getLedgerEntries();
  return buildDashboard(entries);
}

export async function getArchivedEntries() {
  const entries = await getLedgerEntries();
  return entries.filter((entry) => entry.approvalStatus === "ARCHIVED");
}
