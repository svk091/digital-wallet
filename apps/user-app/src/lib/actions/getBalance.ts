"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export async function getBalance() {
  const session = await getServerSession(authOptions);
  const id = Number(session?.user.id);

  const balance = await prisma.balance.findFirst({
    where: {
      userId: id
    }
  })
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0
  }
}