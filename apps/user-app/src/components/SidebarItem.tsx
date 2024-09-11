"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"

interface SidebarItemProps {
  title: string,
  href: string,
  icon: JSX.Element
}

export default function SidebarItem({ title, href, icon }: SidebarItemProps) {
  const path = usePathname();
  return <Link className={clsx(`tracking-widest space-x-2 font-semibold flex p-2 my-1 rounded-lg hover:bg-slate-800`,
    {
      "bg-slate-800 text-indigo-600": href === path
    }
  )} href={href}>
    <div>{icon}</div>
    <p className="hidden md:block">{title}</p>
  </Link>
}