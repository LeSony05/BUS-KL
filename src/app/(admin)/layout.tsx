import Link from "next/link";
import { adminNav } from "@/config/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 lg:grid lg:grid-cols-[250px_1fr]">
      <aside className="border-r border-slate-200 bg-slate-950 text-white">
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-white text-lg font-black text-brand">A</span>
          <div>
            <p className="font-black">An Tâm Ops</p>
            <p className="text-xs text-slate-400">Khu vực nhân viên</p>
          </div>
        </div>
        <nav className="grid gap-1 p-3">
          {adminNav.map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white">
              <item.icon size={18} /> {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main>{children}</main>
    </div>
  );
}
