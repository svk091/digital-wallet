import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
import bcrypt from "bcrypt";
async function main() {

  const don = prisma.user.upsert({
    where: {
      number: "9999999999"
    },
    update: {},
    create: {
      email: "don@gmail.com",
      name: "don",
      number: "9999999999",
      password: await bcrypt.hash("Don1@local", 10),
      Balance: {
        create: {
          amount: 300000,
          locked: 2300
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 10400,
          token: "don_gadi_token",
          provider: "Hdfc Bank"
        }
      }
    }
  }
  )

  const alice = await prisma.user.upsert({
    where: { number: '1111111111' },
    update: {},
    create: {
      number: '1111111111',
      password: await bcrypt.hash('alice', 10),
      name: 'alice',
      Balance: {
        create: {
          amount: 20000,
          locked: 0
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "token__1",
          provider: "HDFC Bank",
        },
      },
    },
  })
  const bob = await prisma.user.upsert({
    where: { number: '2222222222' },
    update: {},
    create: {
      number: '2222222222',
      password: await bcrypt.hash('bob', 10),
      name: 'bob',
      email: "bob@gmail.com",
      Balance: {
        create: {
          amount: 2000,
          locked: 0
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          token: "token__2",
          provider: "HDFC Bank",
        },
      },
    },
  })
  console.log({ alice, bob, don })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })