"use client"

import InputField from "@repo/ui/InputField"
import Button from "@repo/ui/Button"
import { Card } from "@repo/ui/card"
import { useState } from "react"
import p2ptransfer from "@/lib/actions/p2ptransfer"
import { toast } from "sonner"

export default function P2PTransferCard() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const onClickHandler = async () => {
    if (isLoading) return;
    setIsLoading(true)
    try {
      const res = await p2ptransfer(phoneNumber, amount);

      if (res.error) {
        toast.error(res.error);
      } else if (res.message) {
        toast.success(res.message);
      }
    } catch (error) {
      console.error("An error occurred during the transfer:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }
  return <Card title="Send Money">

    <div className="space-y-6 flex flex-col content-center justify-center">

      <InputField onChange={(e) => {
        setPhoneNumber(e.target.value)
      }} name="amount" type="numeric" placeholder="Phone Number" >Phone Number</InputField>

      <InputField onChange={(e) => {
        setAmount(Number(e.target.value))
      }} name="amount" type="numeric" placeholder="Amount" >Amount</InputField>

      <Button isDisabled={isLoading} onClick={onClickHandler}>Send Money</Button>
    </div>
  </Card>
}