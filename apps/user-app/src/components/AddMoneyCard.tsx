"use client"
import InputField from "@repo/ui/InputField"
import Select from "@repo/ui/Select"
import Button from "@repo/ui/Button"
import { Card } from "@repo/ui/card"

import { useState } from "react"
import createOnRampTransaction from "@/lib/actions/createOnRampTransaction"

const SUPPORTED_BANKS = [
  {
    name: "Hdfc Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com"
  }
]

export default function AddMoneyCard() {
  const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0].redirectUrl);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0].name);
  const [amount, setAmount] = useState(0);
  const onClickHandler = async () => {
    await createOnRampTransaction(provider, amount * 100);
    window.location.href = redirectUrl
  }
  return <Card title="Add Money">

    <div className="space-y-6 flex flex-col content-center justify-center">

      <InputField onChange={(e) => {
        setAmount(Number(e.target.value))
      }} name="amount" type="numeric" placeholder="Amount" >Amount</InputField>

      <Select name="provider"

        label="Bank"

        options={
          SUPPORTED_BANKS.map((bank) => (
            {
              label: bank.name,
              value: bank.name,
            }
          ))
        }

        onSelect={(value) => {
          setRedirectUrl(SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || "");
          setProvider(value)
        }}
      />

      <Button onClick={onClickHandler}>Add Money</Button>
    </div>
  </Card>
}