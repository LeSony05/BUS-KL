import { Mail, MapPin, Phone, UserRound } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export default function PassengerPage() {
  return (
    <main className="mx-auto grid max-w-5xl gap-6 px-4 py-8 lg:grid-cols-[1fr_320px]">
      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <p className="text-sm font-bold uppercase text-brand">Bước 2/4</p>
        <h1 className="mt-2 text-3xl font-black">Thông tin hành khách</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Field icon={<UserRound size={18} />} label="Họ tên" value="Nguyễn An" />
          <Field icon={<Phone size={18} />} label="Số điện thoại" value="0901234567" />
          <Field icon={<Mail size={18} />} label="Email nhận vé" value="an@example.com" />
          <Field icon={<MapPin size={18} />} label="Điểm đón" value="Bến xe Miền Đông mới" />
          <Field icon={<MapPin size={18} />} label="Điểm trả" value="Bến xe liên tỉnh Đà Lạt" />
        </div>
      </section>
      <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5">
        <p className="text-sm text-slate-500">Ghế A01 · giữ đến</p>
        <p className="mt-1 text-2xl font-black text-amber-600">09:18</p>
        <p className="mt-4 text-sm leading-6 text-slate-600">Khách vãng lai vẫn đặt được vé. Đăng nhập chỉ cần khi muốn tích điểm và xem lịch sử lâu dài.</p>
        <ButtonLink href="/dat-ve/BK-20260914/thanh-toan" className="mt-5 w-full">
          Tiếp tục thanh toán
        </ButtonLink>
      </aside>
    </main>
  );
}

function Field({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <span className="relative">
        <span className="pointer-events-none absolute left-3 top-3 text-slate-400">{icon}</span>
        <input defaultValue={value} className="focus-ring h-12 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm font-semibold" />
      </span>
    </label>
  );
}
