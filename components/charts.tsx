"use client";

import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatINR } from "@/lib/utils";

const colors = ["#2f6f4e", "#d78b30", "#4f7cac", "#8b5e34", "#a43d3d", "#667085"];

export function IncomeExpenseChart({ data }: { data: Array<{ month: string; income: number; expenses: number }> }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#dfe5d9" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `₹${Number(value) / 1000}k`} width={54} />
        <Tooltip formatter={(value) => formatINR(Number(value))} />
        <Line type="monotone" dataKey="income" stroke="#2f6f4e" strokeWidth={3} dot={false} />
        <Line type="monotone" dataKey="expenses" stroke="#d78b30" strokeWidth={3} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function CategoryPieChart({ data }: { data: Array<{ name: string; value: number }> }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={data.length ? data : [{ name: "No expenses", value: 1 }]} dataKey="value" nameKey="name" innerRadius={58} outerRadius={95} paddingAngle={3}>
          {(data.length ? data : [{ name: "No expenses", value: 1 }]).map((entry, index) => (
            <Cell key={entry.name} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => formatINR(Number(value))} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function FarmBarChart({ data }: { data: Array<{ farm: string; income: number; expenses: number; profit: number }> }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#dfe5d9" />
        <XAxis dataKey="farm" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `₹${Number(value) / 1000}k`} width={54} />
        <Tooltip formatter={(value) => formatINR(Number(value))} />
        <Bar dataKey="income" fill="#2f6f4e" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expenses" fill="#d78b30" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
