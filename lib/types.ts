export type Role = "ADMIN" | "OPERATOR" | "USER";
export type PaymentStatus = "PAID" | "UNPAID" | "PARTIAL" | "OVERDUE" | "CANCELLED";
export type ApprovalStatus = "DRAFT" | "PENDING_APPROVAL" | "APPROVED" | "REJECTED" | "ARCHIVED";
export type EntryType = "EXPENSE" | "INCOME";

export type Farm = {
  id: string;
  name: string;
  location?: string | null;
  owner?: string | null;
  isActive: boolean;
  notes?: string | null;
};

export type Field = {
  id: string;
  name: string;
  farmId: string;
  area?: number | null;
  areaUnit?: string | null;
  soilType?: string | null;
  irrigationSource?: string | null;
};

export type CropSeason = {
  id: string;
  cropName: string;
  seasonName: string;
  farmId: string;
  fieldId?: string | null;
  startDate: string;
  expectedEndDate?: string | null;
  status: string;
};

export type Category = {
  id: string;
  name: string;
  type: EntryType;
};

export type LedgerEntry = {
  id: string;
  type: EntryType;
  date: string;
  title: string;
  categoryId: string;
  categoryName: string;
  farmId: string;
  farmName: string;
  fieldId?: string | null;
  fieldName?: string | null;
  cropSeasonId?: string | null;
  cropSeasonName?: string | null;
  partyName?: string | null;
  quantity?: number | null;
  unit?: string | null;
  rate?: number | null;
  amount: number;
  amountPaid: number;
  paymentStatus: PaymentStatus;
  approvalStatus: ApprovalStatus;
  paymentMethod?: string | null;
  paymentDate?: string | null;
  notes?: string | null;
  createdBy?: string | null;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: "ACTIVE" | "LOCKED" | "REMOVED";
  assignedFarmId?: string | null;
};

export type DashboardData = {
  totals: {
    income: number;
    expenses: number;
    profit: number;
    pendingPayments: number;
    pendingApprovals: number;
  };
  monthly: Array<{ month: string; income: number; expenses: number }>;
  categoryBreakdown: Array<{ name: string; value: number }>;
  farmSummary: Array<{ farm: string; income: number; expenses: number; profit: number }>;
  recentEntries: LedgerEntry[];
  pendingApprovals: LedgerEntry[];
};
