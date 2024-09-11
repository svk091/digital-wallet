"use client"
import Button from "./button"

interface IAppbarProps {
  onSignin: () => void,
  onSignout: () => void,
  isAuthenticated: boolean
}

export default function Appbar({ onSignin, onSignout, isAuthenticated }: IAppbarProps) {
  return <nav className="ui-flex ui-sticky ui-z-10 ui-top-0 ui-min-w-max ui-justify-between ui-px-4 ui-py-2 ui-bg-slate-900">
    <h1 className="ui-font-bold ui-tracking-wider ui-flex ui-text-xl ui-items-center ui-text-indigo-600">Paytm</h1>
    <Button
      onClick={() => {
        isAuthenticated ? onSignout() : onSignin()
      }}>
      {isAuthenticated ? "Signout" : "Signin"}
    </Button>
  </nav>
} 