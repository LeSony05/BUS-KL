import Link from "next/link";
import { Bell, Gift, Ticket, UserRound } from "lucide-react";

const accountNav = [
  { label: "Hồ sơ", icon: UserRound },
  { label: "Vé của tôi", icon: Ticket },
  { label: "Điểm thưởng", icon: Gift },
  { label: "Thông báo", icon: Bell },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-page">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="font-black">An Tâm Bus</Link>
          <Link href="/dang-nhap" className="text-sm font-semibold text-brand">Đăng xuất demo</Link>
        </div>
      </header>
      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-3">
          {accountNav.map((item) => (
            <button key={item.label} className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100">
              <item.icon size={18} /> {item.label}
            </button>
          ))}
        </aside>
        {children}
      </main>
    </div>
  );
}
