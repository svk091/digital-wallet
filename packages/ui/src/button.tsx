import clsx from "clsx"

interface IButtonProps {
  onClick?: () => void,
  children: React.ReactNode,
  isDisabled?: boolean
}

export default function Button({ onClick, children, isDisabled }: IButtonProps) {
  return <button disabled={isDisabled} onClick={onClick} type="submit"
    className={clsx(`ui-bg-slate-800 ui-py-2 ui-w-auto ui-px-4 ui-font-semibold ui-tracking-wider ui-rounded-lg hover:ui-bg-slate-700`,
      { "ui-cursor-wait": isDisabled }
    )}>
    {children}
  </button>
}