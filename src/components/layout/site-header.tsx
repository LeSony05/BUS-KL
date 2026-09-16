import { Bell, Languages, Menu, UserRound } from "lucide-react";
import Link from "next/link";
import { publicNav } from "@/config/navigation";
import { ButtonLink } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/88 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-sm font-black text-white shadow-lg shadow-teal-200">AT</span>
          <div>
            <p className="text-base font-black leading-4 text-slate-950">An Tâm Bus</p>
            <p className="text-xs font-semibold text-teal-700">Mobility hub</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Điều hướng chính">
          {publicNav.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm font-bold text-slate-600 hover:bg-teal-50 hover:text-teal-700">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <button aria-label="Đổi ngôn ngữ" className="focus-ring grid h-10 w-10 place-items-center rounded-full text-slate-600 hover:bg-slate-100">
            <Languages size={18} />
          </button>
          <button aria-label="Thông báo" className="focus-ring grid h-10 w-10 place-items-center rounded-full text-slate-600 hover:bg-slate-100">
            <Bell size={18} />
          </button>
          <ButtonLink href="/dang-nhap" variant="secondary" className="rounded-full">
            <UserRound size={17} /> Đăng nhập
          </ButtonLink>
        </div>
        <button aria-label="Mở menu" className="focus-ring grid h-10 w-10 place-items-center rounded-lg text-slate-700 hover:bg-slate-100 md:hidden">
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}
