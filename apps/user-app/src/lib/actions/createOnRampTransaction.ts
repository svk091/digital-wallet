"use server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@repo/db/client";

export default async function createOnRampTransaction(provider: string, amount: number) {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;
  if (!userId) {
    return { message: "User not loged in" }
  }

  const token = Math.random().toString(); //token by provider
  const res = await prisma.onRampTransaction.create({
    data: {
      userId: Number(userId),
      status: "Processing",
      token,
      provider,
      amount,
      startTime: new Date()
    }
  })

  return {
    message: "Added onRampTransaction"
  }
}