import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Farm Finance Tracker",
  description: "MVP farming expense, income, approval, and reporting dashboard"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
