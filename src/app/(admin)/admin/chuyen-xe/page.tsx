import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { adminTrips } from "@/features/trips/data";
import { formatCurrency } from "@/lib/format";

export default function AdminTripsPage() {
  return (
    <div className="p-4 lg:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase text-brand">Điều phối</p>
          <h1 className="text-3xl font-black">Quản lý chuyến xe</h1>
        </div>
        <Button><Plus size={18} /> Tạo chuyến</Button>
      </div>
      <div className="mb-4 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-[1fr_180px_180px]">
        <label className="relative">
          <Search className="absolute left-3 top-3 text-slate-400" size={18} />
          <input placeholder="Tìm mã chuyến, tuyến, biển số" className="focus-ring h-11 w-full rounded-lg border border-slate-200 pl-10 pr-3" />
        </label>
        <select className="focus-ring h-11 rounded-lg border border-slate-200 px-3"><option>Hôm nay</option></select>
        <select className="focus-ring h-11 rounded-lg border border-slate-200 px-3"><option>Tất cả trạng thái</option></select>
      </div>
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr><th className="p-4">Mã chuyến</th><th>Tuyến</th><th>Xe</th><th>Tài xế</th><th>Trạng thái</th><th>Vé</th><th className="text-right pr-4">Doanh thu</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {adminTrips.map((trip) => (
              <tr key={trip.code}>
                <td className="p-4 font-black">{trip.code}</td>
                <td>{trip.route}</td>
                <td>{trip.vehicle}</td>
                <td>{trip.driver}</td>
                <td><Badge tone={trip.status.includes("Trễ") ? "red" : trip.status.includes("Ít") ? "amber" : "green"}>{trip.status}</Badge></td>
                <td className="font-semibold">{trip.tickets}</td>
                <td className="pr-4 text-right font-black text-brand">{formatCurrency(trip.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
