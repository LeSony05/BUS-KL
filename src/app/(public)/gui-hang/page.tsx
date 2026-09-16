import { Box, MapPinned, PackagePlus, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { shipmentTimeline } from "@/features/trips/data";

export default function ShipmentPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase text-brand">Dịch vụ phụ</p>
        <h1 className="text-3xl font-black">Gửi hàng theo tuyến xe</h1>
        <p className="mt-2 max-w-2xl text-slate-600">Khai báo hàng, tuyến gửi và liên hệ. Báo giá thật sẽ do backend trả về trước khi tạo vận đơn.</p>
      </div>
      <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <form className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <Input icon={<PackagePlus size={18} />} label="Tên hàng" placeholder="VD: Thùng trái cây" />
            <Input icon={<Scale size={18} />} label="Khối lượng" placeholder="VD: 12 kg" />
            <Input icon={<MapPinned size={18} />} label="Tuyến gửi" placeholder="Sài Gòn → Đà Lạt" />
            <Input icon={<Box size={18} />} label="Người nhận" placeholder="Tên và số điện thoại" />
          </div>
          <Button className="mt-5">Kiểm tra điều kiện gửi</Button>
        </form>
        <aside className="rounded-lg border border-slate-200 bg-white p-5">
          <p className="font-black">Timeline vận đơn</p>
          <ol className="mt-4 space-y-4 text-sm text-slate-600">
            {shipmentTimeline.map((step) => (
              <li key={step.label} className="flex gap-3">
                <span className={`mt-1 h-3 w-3 shrink-0 rounded-full ${step.done ? "bg-emerald-500" : "bg-slate-300"}`} />
                <span><strong className="block text-slate-950">{step.label}</strong>{step.description}</span>
              </li>
            ))}
          </ol>
        </aside>
      </section>
    </div>
  );
}

function Input({ icon, label, placeholder }: { icon: React.ReactNode; label: string; placeholder: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold">{label}</span>
      <span className="relative">
        <span className="pointer-events-none absolute left-3 top-3 text-slate-400">{icon}</span>
        <input placeholder={placeholder} className="focus-ring h-12 w-full rounded-lg border border-slate-200 pl-10 pr-3 font-semibold" />
      </span>
    </label>
  );
}
