import type { Category, CropSeason, DashboardData, Farm, Field, LedgerEntry, UserProfile } from "@/lib/types";

export const demoUsers: UserProfile[] = [
  { id: "user-admin", name: "Admin User", email: "admin@farm.local", role: "ADMIN", status: "ACTIVE" },
  { id: "user-operator", name: "Operator User", email: "operator@farm.local", role: "OPERATOR", status: "ACTIVE" },
  { id: "user-viewer", name: "Viewer User", email: "viewer@farm.local", role: "USER", status: "ACTIVE", assignedFarmId: "farm-1" }
];

export const demoFarms: Farm[] = [
  { id: "farm-1", name: "North Canal Farm", location: "Punjab", owner: "Harpal Singh", isActive: true, notes: "Primary wheat and rice farm" },
  { id: "farm-2", name: "Green Valley Plot", location: "Haryana", owner: "Harpal Singh", isActive: true, notes: "Vegetable rotation plot" }
];

export const demoFields: Field[] = [
  { id: "field-1", farmId: "farm-1", name: "Field A", area: 8, areaUnit: "acre", soilType: "Loam", irrigationSource: "Tube well" },
  { id: "field-2", farmId: "farm-1", name: "Field B", area: 5, areaUnit: "acre", soilType: "Clay loam", irrigationSource: "Canal" },
  { id: "field-3", farmId: "farm-2", name: "Field East", area: 3, areaUnit: "acre", soilType: "Sandy loam", irrigationSource: "Drip" }
];

export const demoSeasons: CropSeason[] = [
  { id: "season-1", farmId: "farm-1", fieldId: "field-1", cropName: "Wheat", seasonName: "Wheat 2026", startDate: "2026-01-05", expectedEndDate: "2026-04-30", status: "Active" },
  { id: "season-2", farmId: "farm-1", fieldId: "field-2", cropName: "Rice", seasonName: "Rice 2026", startDate: "2026-05-01", expectedEndDate: "2026-09-30", status: "Planning" },
  { id: "season-3", farmId: "farm-2", fieldId: "field-3", cropName: "Tomato", seasonName: "Tomato Summer 2026", startDate: "2026-03-15", expectedEndDate: "2026-07-20", status: "Active" }
];

export const demoCategories: Category[] = [
  { id: "cat-land", name: "Land Rental", type: "EXPENSE" },
  { id: "cat-water", name: "Water Cost", type: "EXPENSE" },
  { id: "cat-labor", name: "Labor", type: "EXPENSE" },
  { id: "cat-outsourcing", name: "Outsourced Work", type: "EXPENSE" },
  { id: "cat-repair", name: "Repairs", type: "EXPENSE" },
  { id: "cat-seeds", name: "Seeds", type: "EXPENSE" },
  { id: "cat-crop-sale", name: "Crop Sale", type: "INCOME" },
  { id: "cat-subsidy", name: "Subsidy", type: "INCOME" }
];

export const demoEntries: LedgerEntry[] = [
  {
    id: "entry-1",
    type: "EXPENSE",
    date: "2026-05-02",
    title: "Tube well water usage",
    categoryId: "cat-water",
    categoryName: "Water Cost",
    farmId: "farm-1",
    farmName: "North Canal Farm",
    fieldId: "field-1",
    fieldName: "Field A",
    cropSeasonId: "season-1",
    cropSeasonName: "Wheat 2026",
    partyName: "Local water operator",
    quantity: 12,
    unit: "hours",
    rate: 350,
    amount: 4200,
    amountPaid: 4200,
    paymentStatus: "PAID",
    approvalStatus: "APPROVED",
    paymentMethod: "UPI",
    paymentDate: "2026-05-02",
    notes: "Hourly water cost"
  },
  {
    id: "entry-2",
    type: "EXPENSE",
    date: "2026-05-04",
    title: "Land preparation tractor work",
    categoryId: "cat-outsourcing",
    categoryName: "Outsourced Work",
    farmId: "farm-1",
    farmName: "North Canal Farm",
    fieldId: "field-2",
    fieldName: "Field B",
    cropSeasonId: "season-2",
    cropSeasonName: "Rice 2026",
    partyName: "Gill Tractor Services",
    quantity: 6,
    unit: "hours",
    rate: 1250,
    amount: 7500,
    amountPaid: 3000,
    paymentStatus: "PARTIAL",
    approvalStatus: "PENDING_APPROVAL",
    paymentMethod: "Cash",
    notes: "Operator entry waiting for admin review"
  },
  {
    id: "entry-3",
    type: "EXPENSE",
    date: "2026-05-06",
    title: "Daily worker wages",
    categoryId: "cat-labor",
    categoryName: "Labor",
    farmId: "farm-2",
    farmName: "Green Valley Plot",
    fieldId: "field-3",
    fieldName: "Field East",
    cropSeasonId: "season-3",
    cropSeasonName: "Tomato Summer 2026",
    partyName: "Worker group",
    quantity: 5,
    unit: "days",
    rate: 650,
    amount: 3250,
    amountPaid: 0,
    paymentStatus: "UNPAID",
    approvalStatus: "APPROVED",
    notes: "Five workers for weeding"
  },
  {
    id: "entry-4",
    type: "INCOME",
    date: "2026-05-10",
    title: "Wheat sale to mandi",
    categoryId: "cat-crop-sale",
    categoryName: "Crop Sale",
    farmId: "farm-1",
    farmName: "North Canal Farm",
    fieldId: "field-1",
    fieldName: "Field A",
    cropSeasonId: "season-1",
    cropSeasonName: "Wheat 2026",
    partyName: "Khanna Mandi Buyer",
    quantity: 80,
    unit: "quintal",
    rate: 2350,
    amount: 188000,
    amountPaid: 150000,
    paymentStatus: "PARTIAL",
    approvalStatus: "APPROVED",
    paymentMethod: "Bank Transfer",
    paymentDate: "2026-05-12"
  },
  {
    id: "entry-5",
    type: "EXPENSE",
    date: "2026-05-12",
    title: "Pump repair",
    categoryId: "cat-repair",
    categoryName: "Repairs",
    farmId: "farm-1",
    farmName: "North Canal Farm",
    fieldId: "field-1",
    fieldName: "Field A",
    partyName: "Sharma Repairs",
    amount: 8600,
    amountPaid: 0,
    paymentStatus: "OVERDUE",
    approvalStatus: "PENDING_APPROVAL",
    notes: "Needs invoice confirmation"
  }
];

export function buildDashboard(entries = demoEntries): DashboardData {
  const approved = entries.filter((entry) => entry.approvalStatus === "APPROVED");
  const income = approved.filter((entry) => entry.type === "INCOME").reduce((sum, entry) => sum + entry.amount, 0);
  const expenses = approved.filter((entry) => entry.type === "EXPENSE").reduce((sum, entry) => sum + entry.amount, 0);
  const pendingPayments = entries.reduce((sum, entry) => sum + Math.max(entry.amount - entry.amountPaid, 0), 0);
  const pendingApprovals = entries.filter((entry) => entry.approvalStatus === "PENDING_APPROVAL");

  const monthly = [
    { month: "Jan", income: 72000, expenses: 41000 },
    { month: "Feb", income: 56000, expenses: 46000 },
    { month: "Mar", income: 108000, expenses: 59000 },
    { month: "Apr", income: 134000, expenses: 68000 },
    { month: "May", income, expenses }
  ];

  const categoryMap = new Map<string, number>();
  approved.filter((entry) => entry.type === "EXPENSE").forEach((entry) => {
    categoryMap.set(entry.categoryName, (categoryMap.get(entry.categoryName) ?? 0) + entry.amount);
  });

  const farmSummary = demoFarms.map((farm) => {
    const farmEntries = approved.filter((entry) => entry.farmId === farm.id);
    const farmIncome = farmEntries.filter((entry) => entry.type === "INCOME").reduce((sum, entry) => sum + entry.amount, 0);
    const farmExpenses = farmEntries.filter((entry) => entry.type === "EXPENSE").reduce((sum, entry) => sum + entry.amount, 0);
    return { farm: farm.name, income: farmIncome, expenses: farmExpenses, profit: farmIncome - farmExpenses };
  });

  return {
    totals: { income, expenses, profit: income - expenses, pendingPayments, pendingApprovals: pendingApprovals.length },
    monthly,
    categoryBreakdown: Array.from(categoryMap.entries()).map(([name, value]) => ({ name, value })),
    farmSummary,
    recentEntries: entries.slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8),
    pendingApprovals
  };
}
