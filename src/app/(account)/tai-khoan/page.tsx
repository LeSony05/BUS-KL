import { Bell, Gift, TicketCheck, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { sampleTickets } from "@/features/trips/data";

export default function AccountPage() {
  return (
    <div className="grid gap-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="grid h-16 w-16 place-items-center rounded-lg bg-blue-50 text-brand"><UserRound size={30} /></span>
            <div>
              <h1 className="text-3xl font-black">Nguyễn An</h1>
              <p className="text-slate-600">0901234567 · an@example.com</p>
            </div>
          </div>
          <Badge tone="green">Hạng Bạc · 1.240 điểm</Badge>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        <Card icon={<TicketCheck />} label="Vé sắp đi" value="1" />
        <Card icon={<Gift />} label="Điểm khả dụng" value="1.240" />
        <Card icon={<Bell />} label="Thông báo mới" value="3" />
      </section>
      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-black">Vé của tôi</h2>
        <div className="mt-4 grid gap-3">
          {sampleTickets.map((ticket) => (
            <div key={ticket.code} className="grid gap-2 rounded-lg bg-slate-50 p-4 text-sm md:grid-cols-[1fr_160px_160px]">
              <strong>{ticket.route}</strong><span>{ticket.depart}</span><span>{ticket.status}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Card({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <article className="rounded-lg border border-slate-200 bg-white p-5 text-slate-700">{icon}<p className="mt-3 text-sm">{label}</p><p className="text-3xl font-black text-slate-950">{value}</p></article>;
}
