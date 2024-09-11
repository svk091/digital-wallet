import { Card } from "@repo/ui/card"
import BalanceCardItem from "./BalanceCardItem"

export default function BalanceCard({ amount, locked }: {
  amount: number,
  locked: number
}) {
  return <Card title="Balance">
    <div>
      <BalanceCardItem label="Unlocked Balance" amount={amount / 100} />
      <BalanceCardItem label="Total Locked Balance" amount={locked / 100} />
      <BalanceCardItem label="Total Balance" amount={(locked + amount) / 100} />
    </div>
  </Card>
}