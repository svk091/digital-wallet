import AddMoneyCard from "@/components/AddMoneyCard"
import BalanceCard from "@/components/BalanceCard"
import RecentTransactions from "@/components/RecentTransactions"
import { getOnRampTransactions } from "@/lib/actions/getOnRampTransactions"
import { getBalance } from "@/lib/actions/getBalance"

export default async function Page() {
  const balance = await getBalance();
  const txns = await getOnRampTransactions({
    limit: 5
  });
  return <div>
    <div className="text-3xl font-bold my-2 text-indigo-600">Transfer</div>
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 h-screen">
      <div>
        <AddMoneyCard />
      </div>
      <div className="space-y-3">
        <BalanceCard amount={balance.amount} locked={balance.locked} />
        <RecentTransactions transactions={txns} />
      </div>
    </div>
  </div>
}