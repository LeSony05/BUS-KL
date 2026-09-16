import { PackageCheck, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminShipmentsPage() {
  const rows = [
    ["VD-240914-01", "Thùng trái cây", "Sài Gòn → Đà Lạt", "Đang vận chuyển"],
    ["VD-240914-02", "Hồ sơ giấy", "Sài Gòn → Cần Thơ", "Chờ tiếp nhận"],
    ["VD-240913-08", "Linh kiện", "Đà Nẵng → Sài Gòn", "Đã giao"],
  ];

  return (
    <div className="p-4 lg:p-8">
      <p className="text-sm font-bold uppercase text-brand">Vận đơn</p>
      <h1 className="text-3xl font-black">Quản lý hàng hóa</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Metric icon={<PackageCheck />} label="Vận đơn hôm nay" value="38" />
        <Metric icon={<Truck />} label="Đang vận chuyển" value="14" />
        <Metric icon={<PackageCheck />} label="Đã giao" value="21" />
      </div>
      <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
        {rows.map((row) => (
          <div key={row[0]} className="grid gap-3 border-b border-slate-100 p-4 text-sm md:grid-cols-[160px_1fr_1fr_160px]">
            <strong>{row[0]}</strong><span>{row[1]}</span><span>{row[2]}</span><Badge tone={row[3] === "Đã giao" ? "green" : row[3].includes("Chờ") ? "amber" : "blue"}>{row[3]}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <article className="rounded-lg border border-slate-200 bg-white p-5 text-slate-700">{icon}<p className="mt-3 text-sm">{label}</p><p className="text-3xl font-black text-slate-950">{value}</p></article>;
}
