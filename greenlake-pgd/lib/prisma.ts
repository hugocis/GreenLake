// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// debug log to confirm what Prisma will see
if (process.env.DATABASE_URL_LOOPERS) {
  console.log('→ [prisma] using DATABASE_URL_LOOPERS =', process.env.DATABASE_URL_LOOPERS);
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
