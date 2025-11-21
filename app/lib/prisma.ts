import { PrismaClient } from "../generated/prisma/client.js";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasourceUrl: import.meta.env.VITE_DATABASE_URL_TAGGED,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
