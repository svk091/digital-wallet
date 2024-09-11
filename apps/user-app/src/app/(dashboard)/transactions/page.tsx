import { getOnRampTransactions } from "@/lib/actions/getOnRampTransactions"
import OnRampTransactions from "@/components/OnRampTransactions"



export default async function Page() {
  const txns = await getOnRampTransactions();
  return <div>
    <div className="text-3xl font-bold my-2 text-indigo-600">Transactions</div>
    <OnRampTransactions transactions={txns} />
  </div>
}