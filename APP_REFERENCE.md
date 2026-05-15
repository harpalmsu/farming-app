# Farm Finance Tracker App Reference

This file is the working reference for the Farm Finance Tracker application. It is derived from `farming-app.prd` and should be used when planning, building, or reviewing future app changes.

## Product Summary

Farm Finance Tracker is a role-based financial tracking web app for farming operations. It helps farm owners and teams record farm expenses, income, payments, approvals, reports, monthly summaries, and audit-friendly archived records.

The app is focused on farm finance visibility across multiple farms, fields, and crop seasons.

## Core Principles

- Use Indian Rupees only: INR/₹.
- Track income and expenses in one place.
- Support multiple farms under one admin account.
- Link records to farm, field, and crop season when applicable.
- Require approval workflow for operator-created financial records.
- Archive records instead of permanently deleting them.
- Keep audit history for sensitive actions.
- Make daily entry fast and mobile-friendly for operators.
- Show reports and dashboards using both charts and tables.

## User Roles

### Admin

Admin has full system access.

Admin can:

- Manage users, roles, locks, and access.
- Manage farms, fields, crops, crop seasons, and categories.
- Add, edit, approve, reject, archive, and restore expenses.
- Add, edit, approve, reject, archive, and restore income.
- View dashboards, reports, archived records, and audit logs.
- Export reports.
- Configure monthly report recipients and schedules.
- Configure water rates, rental terms, and other system settings.

### Operator

Operator has limited operational access.

Operator can:

- Add daily expense entries.
- Add daily income entries if permitted.
- Update payment details where allowed.
- Upload receipts, invoices, or photos when attachments are supported.
- Edit records they created if admin settings allow it.
- View operational dashboards relevant to assigned work.

Operator cannot:

- Manage users.
- Change system settings.
- Approve or reject records.
- Archive or restore records in the initial version.

Operator-created records require approval before becoming final.

### User

User has view-only access to assigned data.

User can:

- View assigned farm, field, crop, season, or financial data.
- View relevant dashboards, tables, and reports.
- Export assigned reports and permitted data.

User cannot:

- Add, edit, delete, archive, approve, or reject records.
- Manage users or system settings.

## Main Workflows

### Daily Entry Workflow

1. Operator or Admin creates an expense or income entry.
2. Entry includes category, farm, optional field, optional crop season, party, amount, payment state, and notes.
3. Operator-created entries default to pending approval.
4. Admin reviews pending entries.
5. Approved entries appear in finalized financial reports.
6. Rejected entries remain visible for audit and correction history.

### Approval Workflow

Approval statuses:

- Draft, optional.
- Pending Approval.
- Approved.
- Rejected.
- Archived.

Reports must clearly separate approved financials from pending entries.

### Payment Workflow

Payment statuses:

- Paid.
- Unpaid.
- Partially paid.
- Overdue.
- Cancelled.

Payment details should include:

- Amount paid in INR.
- Remaining amount in INR.
- Payment date.
- Payment method.
- Reference number.
- Notes.

## Categories

### Expense Categories

The app should support expenses such as:

- Land Rental.
- Water Cost.
- Labor.
- Outsourced Work.
- Repairs.
- Equipment Maintenance.
- Seeds.
- Fertilizer.
- Pesticides.
- Fuel.
- Transportation.
- Harvesting.
- Storage.
- Miscellaneous Costs.

### Income Categories

The app should support income such as:

- Crop Sale.
- Subsidy.
- Water Income.
- Land Rental Income.
- Rental Income.
- Other Farm Income.

Future optional income sources:

- Livestock sales.
- Byproduct sales.

## Expense Entry Fields

Each expense should capture:

- Date.
- Category.
- Subcategory.
- Farm.
- Field, if applicable.
- Crop season, if applicable.
- Vendor, worker, or service provider.
- Quantity or hours, if applicable.
- Rate in INR.
- Total amount in INR.
- Amount paid in INR.
- Payment status.
- Approval status.
- Payment method.
- Payment date.
- Notes.
- Created by.
- Last updated by.
- Receipt or attachment, planned future support.

### Water Cost Fields

Water cost entries should capture:

- Water source.
- Number of hours used.
- Rate per hour in INR.
- Total water cost.
- Farm.
- Field.
- Crop season, if applicable.

### Labor Cost Fields

Labor entries should capture:

- Worker name or group.
- Work type.
- Number of workers.
- Hours or days worked.
- Rate per hour or day in INR.
- Total labor cost.
- Payment status.
- Approval status.

### Outsourced Work Fields

Outsourced work entries should capture:

- Service type, such as plowing, leveling, spraying, harvesting, or land preparation.
- Contractor or vendor name.
- Work date.
- Rate.
- Total amount in INR.
- Payment details.
- Approval status.

## Income Entry Fields

Each income should capture:

- Date.
- Income category.
- Crop or product.
- Crop season, if applicable.
- Quantity sold, if applicable.
- Unit price in INR, if applicable.
- Total income in INR.
- Buyer, tenant, renter, or payer name.
- Payment status.
- Approval status.
- Payment method.
- Payment date.
- Notes.
- Created by.
- Last updated by.
- Attachment or invoice, planned future support.

## Farm, Field, And Crop Season Model

### Farm

Farm records should include:

- Farm name.
- Location.
- Owner or responsible person.
- Active or inactive status.
- Notes.

### Field

Field records should include:

- Field name.
- Farm.
- Area.
- Area unit.
- Soil type, optional.
- Irrigation source, optional.
- Notes.

### Crop Season

Crop season records should include:

- Crop name.
- Season name.
- Farm.
- Field.
- Start date.
- Expected end date.
- Actual end date.
- Status.
- Notes.

Examples:

- Wheat 2026.
- Rice 2026.
- Cotton Summer 2026.

Expenses and income should be linkable to a crop season.

## Dashboard Requirements

Dashboard metrics should include:

- Total income.
- Total expenses.
- Net profit or loss.
- Pending payments.
- Paid expenses.
- Pending approvals.
- Rejected entries.
- Monthly cost trend.
- Category-wise expense breakdown.
- Farm-wise summary.
- Field-wise summary.
- Crop season-wise profitability.
- Recent transactions.
- High-cost categories.
- Upcoming or unpaid obligations.

Charts may include:

- Monthly income vs expense line chart.
- Expense category pie or donut chart.
- Farm, field, crop, or season bar chart.
- Payment status chart.
- Approval status chart.
- Profit/loss trend over time.

Tables may include:

- Recent expense entries.
- Recent income entries.
- Outstanding payments.
- Pending approvals.
- Category summary.
- Monthly summary.
- Farm summary.
- Field summary.
- Crop season summary.

## Reporting And Export

Reports should include:

- Monthly income and expense report.
- Profit and loss report.
- Expense by category report.
- Income by crop report.
- Farm-wise financial report.
- Field-wise cost report.
- Crop season-wise profitability report.
- Worker/labor cost report.
- Water usage and water cost report.
- Outstanding payments report.
- Pending approval report.
- Vendor/contractor payment report.
- Archived records report for Admin.

Report filters should include:

- Date range.
- Farm.
- Field.
- Crop.
- Crop season.
- Category.
- Payment status.
- Approval status.
- User or operator.
- Vendor or worker.

Supported exports:

- PDF.
- CSV.
- Excel, optional future support.

PDF exports should include:

- Report title.
- Date range.
- Summary metrics.
- Charts where applicable.
- Tabular details.
- Generated date.
- Generated by.
- Farm/company name.
- Currency as INR/₹.

## Monthly Email Report

The app should send an automatic monthly email report.

Monthly report contents:

- Total income for the month.
- Total expenses for the month.
- Net profit or loss.
- Pending approvals.
- Pending payments.
- Category-wise expense summary.
- Farm-wise summary.
- Crop season-wise summary.
- Major cost items.
- Income by crop or product.
- Comparison with previous month.
- Attached PDF report.

Admin should be able to configure:

- Report recipients.
- Report schedule.
- Report format.
- Farms included.
- Whether operators or users receive reports.

Email is required for the initial version. WhatsApp and SMS are future enhancements.

## Archive And Audit

Records should be archived instead of permanently deleted.

Archived record data should include:

- Record type.
- Record ID.
- Archived by.
- Archived date/time.
- Archive reason, optional.
- Original record data.
- Restore history, if restored later.

Audit logs should capture:

- User who performed the action.
- Action type.
- Record affected.
- Previous value, where useful.
- New value, where useful.
- Timestamp.

Important audited actions:

- User created, removed, locked, or unlocked.
- Expense added, updated, approved, rejected, archived, or restored.
- Income added, updated, approved, rejected, archived, or restored.
- Payment updated.
- Report exported.
- Monthly report sent.
- Settings changed.

## Notifications

Notifications should support:

- Monthly report generated.
- Payment overdue.
- Pending approval.
- Entry approved.
- Entry rejected.
- User locked or unlocked.
- Large expense added.
- Report export completed.
- Failed monthly report delivery.

Channels:

- Email.
- In-app notification.
- SMS or WhatsApp, optional future enhancement.

## Main Data Entities

- User.
- Role.
- Farm.
- Field.
- Crop.
- Crop Season.
- Expense.
- Income.
- Payment.
- Category.
- Vendor/Contractor.
- Worker.
- Attachment.
- Report.
- Monthly Report Schedule.
- Audit Log.
- Archive Record.

## Suggested Screens

- Login screen.
- Dashboard.
- Farms management.
- Fields management.
- Crop seasons management.
- Expenses list.
- Add/Edit expense form.
- Income list.
- Add/Edit income form.
- Approvals queue.
- Payments view.
- Reports view.
- Export PDF preview.
- Monthly report settings.
- User management.
- Role and access management.
- Categories/settings.
- Archived records.
- Audit log.

## MVP Scope

The first complete version should include:

- Admin, Operator, and User roles.
- Login and role-based access.
- Multi-farm support.
- Farm and field management.
- Crop season tracking.
- Expense tracking.
- Income tracking.
- Payment status tracking.
- Approval workflow for expenses and income.
- Dashboard with charts and tables.
- PDF export.
- CSV export.
- User export permissions for assigned data.
- Monthly report by email with PDF attachment.
- User management for Admin.
- Basic category setup.
- INR-only currency support.
- Archive instead of permanent delete.
- Basic audit log.

## Future Enhancements

- Mobile app.
- Offline data entry.
- Receipt scanning.
- Attachment uploads.
- WhatsApp monthly reports.
- SMS notifications.
- Budget planning.
- Profit/loss forecasting.
- Inventory tracking.
- Equipment tracking.
- Weather integration.
- Crop yield tracking.
- Multi-language support.
- Bank/payment integration.
- Excel export.

## Open Product Questions

- Should admin-created entries be auto-approved by default?
- Should rejected operator entries be editable and resubmitted?
- Should crop season profitability include shared farm costs automatically or only directly assigned costs?
- Should monthly reports include only approved records or also show pending entries separately?
- Should exports include archived records for Admin-only reports?

## Current Implementation Notes

- App framework: Next.js with TypeScript.
- Database layer: Prisma with PostgreSQL when `DATABASE_URL` is configured.
- Demo mode: local demo data when database credentials are not configured.
- Authentication integration point: Supabase Auth.
- Charts: Recharts.
- Tables: TanStack Table.
- Monthly report email endpoint: Resend integration point.
- Existing demo and seed categories should stay aligned when categories are added.
