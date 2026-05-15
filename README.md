# Farm Finance Tracker MVP

This MVP was built from `farming-app.prd` using:

- Next.js + TypeScript
- PostgreSQL + Prisma
- Supabase Auth integration points
- Tailwind CSS + shadcn-style components
- Recharts
- TanStack Table
- Resend monthly report endpoint

## Run In Demo Mode

The app can run without database credentials and will show demo data.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Configure Real Services

Copy `.env.example` to `.env` and fill:

```bash
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_SUPABASE_URL="..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."
RESEND_API_KEY="..."
MONTHLY_REPORT_TO="owner@example.com"
```

Then run:

```bash
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

## MVP Included

- Dashboard with INR cards, charts, and recent entries
- Expense and income entry form
- Payment status and approval status
- Approval queue
- CSV export
- Monthly report endpoint at `/api/reports/monthly`
- Multi-farm, field, and crop season views
- User/role overview
- Prisma schema for PostgreSQL

## Still To Add After MVP

- Full Supabase login screens and route protection
- PDF rendering with charts
- Real user management actions
- Attachment uploads
- Restore archived records UI
- Fine-grained row-level data scoping
