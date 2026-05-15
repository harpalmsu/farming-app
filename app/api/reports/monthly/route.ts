import { NextResponse } from "next/server";
import { Resend } from "resend";
import { buildMonthlyReportText } from "@/lib/report";

export async function GET() {
  const report = await buildMonthlyReportText();

  if (!process.env.RESEND_API_KEY || !process.env.MONTHLY_REPORT_TO) {
    return new NextResponse(report, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: process.env.MONTHLY_REPORT_FROM ?? "Farm Finance <reports@example.com>",
    to: process.env.MONTHLY_REPORT_TO.split(",").map((email) => email.trim()),
    subject: "Monthly Farm Finance Report",
    text: report
  });

  return NextResponse.json({ ok: true });
}

