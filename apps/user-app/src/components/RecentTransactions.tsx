import { Card } from "@repo/ui/card"

export default function RecentTransactions({ transactions }: {
  transactions: {
    time: Date,
    amount: number,
    status: string,
    provider: string
  }[]
}) {
  if (transactions.length === 0) {
    return <Card title="Recent Transactions">
      <div className="text-center pt-8 pb-8">No Recent Transactions</div>
    </Card>
  }

  return <Card title="Recent Transactions">
    <div>
      {
        transactions.map((t) => (
          <div className="grid grid-cols-4 mb-3">
            <div>
              <div className="text-sm">Received INR</div>
              <div className="text-xs">{t.time.toDateString()}</div>
            </div>
            <div>{t.status}</div>
            <div>{t.provider}</div>
            <div className="flex items-center">
              + Rs {t.amount / 100}
            </div>
          </div>
        ))
      }
    </div>
  </Card>
}