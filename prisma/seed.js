const { PrismaClient } = require("@prisma/client");
const data = require("./mock-data.json");

const prisma = new PrismaClient();

async function main() {
  const clerkId = "user_2iXP8bsSubmTLCrCRNnWq1JZBRy";
  const jobs = data.map((job) => ({ ...job, clerkId }));

  for (const job of jobs) {
    await prisma.job.create({ data: job });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    await prisma.$disconnect();
  });
