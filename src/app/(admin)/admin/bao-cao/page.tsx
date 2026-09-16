import { BarChart3, CircleDollarSign, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";

export default function ReportsPage() {
  return (
    <div className="p-4 lg:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div><p className="text-sm font-bold uppercase text-brand">Kế toán</p><h1 className="text-3xl font-black">Báo cáo doanh thu</h1></div>
        <Button variant="secondary"><RefreshCcw size={18} /> Làm mới</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card icon={<CircleDollarSign />} label="Doanh thu vé" value={formatCurrency(42800000)} />
        <Card icon={<CircleDollarSign />} label="Hoàn tiền chờ xử lý" value={formatCurrency(3200000)} />
        <Card icon={<BarChart3 />} label="Tỷ lệ lấp đầy" value="78%" />
      </div>
      <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-black">Doanh thu theo tuyến</h2>
        <div className="mt-5 space-y-4">
          {[
            ["Sài Gòn → Đà Lạt", 82],
            ["Sài Gòn → Nha Trang", 63],
            ["Sài Gòn → Cần Thơ", 48],
            ["Đà Nẵng → Sài Gòn", 39],
          ].map(([label, value]) => (
            <div key={label}>
              <div className="mb-1 flex justify-between text-sm font-semibold"><span>{label}</span><span>{value}%</span></div>
              <div className="h-3 rounded-full bg-slate-100"><div className="h-3 rounded-full bg-brand" style={{ width: `${value}%` }} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <article className="rounded-lg border border-slate-200 bg-white p-5 text-slate-700">{icon}<p className="mt-3 text-sm">{label}</p><p className="text-3xl font-black text-slate-950">{value}</p></article>;
}
