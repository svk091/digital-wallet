"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { z } from "zod";

const transferSchema = z.object({
  amount: z.number().positive({ message: "Invalid amount. Please provide a positive number" }),
  to: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number format" }),
});


export default async function p2ptransfer(to: string, amount: number) {
  const result = transferSchema.safeParse({ amount, to });
  if (!result.success) {
    const errorMessages = result.error.errors.map((err) => err.message).join(", ");
    return { error: errorMessages };
  }
  try {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if (!from) {
      return { error: "User not authenticated." };
    }

    if (String(from) === to) {
      return { error: "Cannot transfer to yourself." };
    }

    const fromBalance = await prisma.balance.findFirst({
      where: { userId: Number(from) },
      select: { amount: true },
    });

    if (!fromBalance || fromBalance.amount < amount) {
      return { error: "Insufficient funds." };
    }

    const toUser = await prisma.user.findFirst({
      where: { number: to },
      select: { id: true },
    });

    if (!toUser) {
      return { error: "Recipient user not found" };
    }

    await prisma.$transaction([
      prisma.balance.update({
        where: { userId: Number(from) },
        data: {
          amount: {
            decrement: amount * 100,
          },
        },
      }),
      prisma.balance.update({
        where: { userId: toUser.id },
        data: {
          amount: {
            increment: amount * 100,
          },
        },
      }),
    ]);

    return { message: "Transfer successful." };
  } catch (error) {
    console.error("Transfer error:", error);
    return { error: "Error while processing the transfer." };
  }
}
