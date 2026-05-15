import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.profile.upsert({
    where: { email: "admin@farm.local" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@farm.local",
      role: "ADMIN"
    }
  });

  await prisma.profile.upsert({
    where: { email: "operator@farm.local" },
    update: {},
    create: {
      name: "Operator User",
      email: "operator@farm.local",
      role: "OPERATOR"
    }
  });

  const farm = await prisma.farm.create({
    data: {
      name: "North Canal Farm",
      location: "Punjab",
      owner: "Harpal Singh",
      notes: "Primary wheat and rice farm"
    }
  });

  const field = await prisma.field.create({
    data: {
      name: "Field A",
      farmId: farm.id,
      area: 8,
      areaUnit: "acre",
      soilType: "Loam",
      irrigationSource: "Tube well"
    }
  });

  const season = await prisma.cropSeason.create({
    data: {
      cropName: "Wheat",
      seasonName: "Wheat 2026",
      farmId: farm.id,
      fieldId: field.id,
      startDate: new Date("2026-01-05"),
      expectedEndDate: new Date("2026-04-30"),
      status: "Active"
    }
  });

  const water = await prisma.category.create({
    data: { name: "Water Cost", type: "EXPENSE" }
  });

  const cropSale = await prisma.category.create({
    data: { name: "Crop Sale", type: "INCOME" }
  });

  await prisma.ledgerEntry.createMany({
    data: [
      {
        type: "EXPENSE",
        date: new Date("2026-05-02"),
        title: "Tube well water usage",
        categoryId: water.id,
        farmId: farm.id,
        fieldId: field.id,
        cropSeasonId: season.id,
        partyName: "Local water operator",
        quantity: 12,
        unit: "hours",
        rate: 350,
        amount: 4200,
        amountPaid: 4200,
        paymentStatus: "PAID",
        approvalStatus: "APPROVED",
        paymentMethod: "UPI",
        paymentDate: new Date("2026-05-02"),
        createdById: admin.id
      },
      {
        type: "INCOME",
        date: new Date("2026-05-10"),
        title: "Wheat sale to mandi",
        categoryId: cropSale.id,
        farmId: farm.id,
        fieldId: field.id,
        cropSeasonId: season.id,
        partyName: "Khanna Mandi Buyer",
        quantity: 80,
        unit: "quintal",
        rate: 2350,
        amount: 188000,
        amountPaid: 150000,
        paymentStatus: "PARTIAL",
        approvalStatus: "APPROVED",
        paymentMethod: "Bank Transfer",
        createdById: admin.id
      }
    ]
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
