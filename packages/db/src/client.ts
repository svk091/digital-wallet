import { PrismaClient, OnRampStatus } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export { OnRampStatus };
export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma