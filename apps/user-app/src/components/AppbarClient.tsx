"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Appbar from "@repo/ui/Appbar"
import { useRouter } from "next/navigation";

export default function AppbarClient() {
  const { status } = useSession();
  const router = useRouter()
  return <Appbar onSignin={signIn} onSignout={async () => {
    await signOut();
    router.push("/api/auth/signin")
  }} isAuthenticated={status === "authenticated"} />
}