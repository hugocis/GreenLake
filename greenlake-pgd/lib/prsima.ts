// src/lib/prisma.ts
import 'dotenv/config';  

// debug log to confirm what Prisma will see
console.log('→ [prisma] using DATABASE_URL =', process.env.DATABASE_URL);

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
