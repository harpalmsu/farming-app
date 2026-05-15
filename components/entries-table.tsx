"use client";

import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import type { LedgerEntry } from "@/lib/types";
import { formatDate, formatINR } from "@/lib/utils";

const columns: ColumnDef<LedgerEntry>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => formatDate(row.original.date)
  },
  {
    accessorKey: "title",
    header: "Entry",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.title}</div>
        <div className="text-xs text-[var(--muted-foreground)]">{row.original.categoryName}</div>
      </div>
    )
  },
  {
    accessorKey: "farmName",
    header: "Farm"
  },
  {
    accessorKey: "cropSeasonName",
    header: "Season",
    cell: ({ row }) => row.original.cropSeasonName ?? "-"
  },
  {
    accessorKey: "type",
    header: "Type"
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => formatINR(row.original.amount)
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment",
    cell: ({ row }) => <Badge value={row.original.paymentStatus} />
  },
  {
    accessorKey: "approvalStatus",
    header: "Approval",
    cell: ({ row }) => <Badge value={row.original.approvalStatus} />
  }
];

export function EntriesTable({ data }: { data: LedgerEntry[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  return (
    <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead className="bg-[var(--muted)]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-3 text-left font-semibold">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t border-[var(--border)]">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 align-middle">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
