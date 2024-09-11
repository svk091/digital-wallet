import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {

  return (
    <div className="flex min-w-full min-h-screen">

      <div className="w-2/12"><Sidebar /></div>
      <div className="w-11/12 p-2 pl-4">{children}</div>
    </div>
  );
}
