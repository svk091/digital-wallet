import { Home, Transfer, Transactions, P2PTransfer } from "@repo/ui/Icons"
import SidebarItem from "./SidebarItem"
const sideBarItems = [
  {
    title: "Home", href: "/home", icon: <Home />
  },
  {
    title: "Transfer", href: "/transfer", icon: <Transfer />
  },
  {
    title: "Transactions", href: "/transactions", icon: <Transactions />
  },
  {
    title: "P2P Transfer", href: "/p2ptransfer", icon: <P2PTransfer />
  }
]

export default function Sidebar() {
  return <div className="flex flex-col fixed bg-slate-900  px-2 py-6 h-screen border-r border-slate-600">
    {
      sideBarItems.map((sideBar) => (
        <SidebarItem title={sideBar.title} href={sideBar.href} icon={sideBar.icon} />
      ))
    }
  </div>
}