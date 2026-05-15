"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma, hasDatabase } from "@/lib/prisma";
import { createDemoEntry, updateDemoApproval } from "@/lib/demo-store";
import { ledgerEntrySchema } from "@/lib/validations";

function valueOrNull(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  return text.length ? text : null;
}

export async function createLedgerEntry(formData: FormData) {
  const parsed = ledgerEntrySchema.safeParse({
    type: formData.get("type"),
    date: formData.get("date"),
    title: formData.get("title"),
    categoryId: formData.get("categoryId"),
    farmId: formData.get("farmId"),
    fieldId: valueOrNull(formData.get("fieldId")) ?? undefined,
    cropSeasonId: valueOrNull(formData.get("cropSeasonId")) ?? undefined,
    partyName: valueOrNull(formData.get("partyName")) ?? undefined,
    quantity: valueOrNull(formData.get("quantity")) ?? undefined,
    unit: valueOrNull(formData.get("unit")) ?? undefined,
    rate: valueOrNull(formData.get("rate")) ?? undefined,
    amount: formData.get("amount"),
    amountPaid: formData.get("amountPaid") ?? 0,
    paymentStatus: formData.get("paymentStatus"),
    paymentMethod: valueOrNull(formData.get("paymentMethod")) ?? undefined,
    paymentDate: valueOrNull(formData.get("paymentDate")) ?? undefined,
    notes: valueOrNull(formData.get("notes")) ?? undefined
  });

  if (!parsed.success) {
    redirect(`/entries/new?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid entry")}`);
  }

  const input = parsed.data;

  if (hasDatabase()) {
    await prisma.ledgerEntry.create({
      data: {
        type: input.type,
        date: new Date(input.date),
        title: input.title,
        categoryId: input.categoryId,
        farmId: input.farmId,
        fieldId: input.fieldId || null,
        cropSeasonId: input.cropSeasonId || null,
        partyName: input.partyName || null,
        quantity: input.quantity || null,
        unit: input.unit || null,
        rate: input.rate || null,
        amount: input.amount,
        amountPaid: input.amountPaid,
        paymentStatus: input.paymentStatus,
        approvalStatus: "PENDING_APPROVAL",
        paymentMethod: input.paymentMethod || null,
        paymentDate: input.paymentDate ? new Date(input.paymentDate) : null,
        notes: input.notes || null
      }
    });
  } else {
    createDemoEntry(input);
  }

  revalidatePath("/dashboard");
  revalidatePath("/entries");
  redirect("/entries?created=1");
}

export async function updateApproval(formData: FormData) {
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));

  if (hasDatabase() && ["APPROVED", "REJECTED", "ARCHIVED"].includes(status)) {
    await prisma.ledgerEntry.update({
      where: { id },
      data: {
        approvalStatus: status as "APPROVED" | "REJECTED" | "ARCHIVED",
        approvedAt: status === "APPROVED" ? new Date() : null,
        archivedAt: status === "ARCHIVED" ? new Date() : null
      }
    });
  } else if (["APPROVED", "REJECTED", "ARCHIVED"].includes(status)) {
    updateDemoApproval(id, status as "APPROVED" | "REJECTED" | "ARCHIVED");
  }

  revalidatePath("/approvals");
  revalidatePath("/dashboard");
}
