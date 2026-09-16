import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-page">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-700">
            <ArrowLeft size={18} /> Quay lại
          </Link>
          <div className="hidden items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700 md:flex">
            <ShieldCheck size={18} /> Thanh toán an toàn
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
