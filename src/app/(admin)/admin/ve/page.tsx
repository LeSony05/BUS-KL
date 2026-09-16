import { Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { sampleTickets } from "@/features/trips/data";

export default function AdminTicketsPage() {
  return (
    <div className="p-4 lg:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase text-brand">Bán vé & CSKH</p>
          <h1 className="text-3xl font-black">Quản lý vé</h1>
        </div>
        <Button variant="secondary"><Download size={18} /> Xuất danh sách</Button>
      </div>
      <div className="mb-4 rounded-lg border border-slate-200 bg-white p-4">
        <label className="relative block">
          <Search className="absolute left-3 top-3 text-slate-400" size={18} />
          <input placeholder="Tìm mã vé, số điện thoại, tuyến" className="focus-ring h-11 w-full rounded-lg border border-slate-200 pl-10 pr-3" />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {sampleTickets.map((ticket) => (
          <article key={ticket.code} className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between gap-3">
              <div><p className="text-sm text-slate-500">{ticket.code}</p><h2 className="mt-1 text-xl font-black">{ticket.route}</h2></div>
              <Badge tone={ticket.status === "Hợp lệ" ? "green" : "red"}>{ticket.status}</Badge>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
              <span><strong>Ghế</strong><br />{ticket.seat}</span>
              <span><strong>Khởi hành</strong><br />{ticket.depart}</span>
              <span><strong>Hoàn tiền</strong><br />{ticket.refund}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
