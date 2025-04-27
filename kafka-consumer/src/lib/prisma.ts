import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Log the database URL (masking the password)
console.log('Database URL:', process.env.DATABASE_URL_LOOPERS?.replace(/(.*?\/\/.*?:).*?(@.*)/g, '$1[PASSWORD]$2'))

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Initialize Prisma with debug logging
const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma
