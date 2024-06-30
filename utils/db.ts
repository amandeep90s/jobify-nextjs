import { PrismaClient } from "@prisma/client";

const prismaClassSingleton = () => {
  return new PrismaClient();
};

type PrismaClassSingleton = ReturnType<typeof prismaClassSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClassSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClassSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
