import { Search, TicketCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { sampleTickets } from "@/features/trips/data";

export default function TicketLookupPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-lg bg-blue-50 text-brand">
            <TicketCheck size={26} />
          </div>
          <div>
            <p className="text-sm font-bold uppercase text-brand">Tra cứu an toàn</p>
            <h1 className="mt-1 text-3xl font-black">Tra cứu vé</h1>
            <p className="mt-2 text-slate-600">Nhập mã vé hoặc mã đơn kèm số điện thoại đặt vé. Thông tin nhạy cảm không được đưa lên URL.</p>
          </div>
        </div>
        <form className="mt-7 grid gap-4 md:grid-cols-[1fr_1fr_auto]">
          <label className="grid gap-2">
            <span className="text-sm font-semibold">Mã vé / mã đơn</span>
            <input placeholder="VD: ATB240914A01" className="focus-ring h-12 rounded-lg border border-slate-200 px-3 font-semibold" />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-semibold">Số điện thoại</span>
            <input placeholder="VD: 0901234567" className="focus-ring h-12 rounded-lg border border-slate-200 px-3 font-semibold" />
          </label>
          <Button className="mt-auto h-12">
            <Search size={18} /> Tra cứu
          </Button>
        </form>
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {sampleTickets.map((ticket) => (
          <article key={ticket.code} className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase text-slate-500">Kết quả mẫu</p>
                <h2 className="mt-1 text-xl font-black">{ticket.code}</h2>
              </div>
              <Badge tone={ticket.status === "Hợp lệ" ? "green" : "red"}>{ticket.status}</Badge>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-600">
              <p><strong className="text-slate-950">Tuyến</strong><br />{ticket.route}</p>
              <p><strong className="text-slate-950">Ghế</strong><br />{ticket.seat}</p>
              <p><strong className="text-slate-950">Khởi hành</strong><br />{ticket.depart}</p>
              <p><strong className="text-slate-950">Hoàn tiền</strong><br />{ticket.refund}</p>
            </div>
            <div className="mt-5 flex gap-2">
              <Button variant="secondary" className="flex-1">Gửi lại vé</Button>
              <Button variant={ticket.status === "Hợp lệ" ? "danger" : "secondary"} className="flex-1">Yêu cầu hủy</Button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
