import { Card } from "@repo/ui/card"

export default function RecentTransactions({ transactions }: {
  transactions: {
    time: Date,
    amount: number,
    status: string,
    trasaction_id: string
    provider: string
  }[]
}) {
  if (transactions.length === 0) {
    return <Card title="Recent Transactions">
      <div className="text-center pt-8 pb-8">No Recent Transactions</div>
    </Card>
  }

  return <div className="ui-bg-slate-900 p-2 ui-rounded-2xl">
    <div className="ui-m-0">
      <div>
        {
          transactions.map((t) => (
            <div className="grid grid-cols-5 mb-3">
              <div>
                <div className="text-sm">Received INR</div>
                <div className="text-xs">{t.time.toDateString()}</div>
              </div>
              <div>{t.status}</div>
              <div>{t.trasaction_id}</div>
              <div>{t.provider}</div>
              <div className="flex items-center">
                + Rs {t.amount / 100}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  </div>

}