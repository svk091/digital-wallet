export default function BalanceCardItem({ label, amount }: {
  label: string,
  amount: number
}) {
  return <div className="flex justify-between border-b border-slate-600 border-opacity-40">
    <h1>{label}</h1>
    <h1>{amount} {"INR"}</h1>
  </div>
}