"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export const getOnRampTransactions = async ({ limit }: { limit?: number } = {}) => {
  const session = await getServerSession(authOptions);
  const id = Number(session?.user.id);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: id
    },
    ...(limit && {
      take: limit
    })
  })
  return txns.map((t) => (
    {
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.provider,
      trasaction_id: t.id
    }
  ))
}