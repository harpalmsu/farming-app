import { z } from "zod";

export const ledgerEntrySchema = z.object({
  type: z.enum(["EXPENSE", "INCOME"]),
  date: z.string().min(1, "Date is required"),
  title: z.string().min(2, "Title is required"),
  categoryId: z.string().min(1, "Category is required"),
  farmId: z.string().min(1, "Farm is required"),
  fieldId: z.string().optional(),
  cropSeasonId: z.string().optional(),
  partyName: z.string().optional(),
  quantity: z.coerce.number().optional(),
  unit: z.string().optional(),
  rate: z.coerce.number().optional(),
  amount: z.coerce.number().positive("Amount must be greater than zero"),
  amountPaid: z.coerce.number().min(0).default(0),
  paymentStatus: z.enum(["PAID", "UNPAID", "PARTIAL", "OVERDUE", "CANCELLED"]),
  paymentMethod: z.string().optional(),
  paymentDate: z.string().optional(),
  notes: z.string().optional()
});

export type LedgerEntryInput = z.infer<typeof ledgerEntrySchema>;
