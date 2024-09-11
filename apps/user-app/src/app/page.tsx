import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth"

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect('/home')

  } else {
    redirect('/api/auth/signin')
  }
}