import { CheckCircle2, Clock3, MapPinned, ShieldCheck, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SeatPicker } from "@/features/booking/seat-picker";
import { getTrip, seatMap } from "@/features/trips/data";
import { formatCurrency } from "@/lib/format";

export default async function TripDetailPage({ params }: { params: Promise<{ tripId: string }> }) {
  const { tripId } = await params;
  const trip = getTrip(tripId);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <section className="mb-6 rounded-lg border border-slate-200 bg-white p-5">
        <div className="grid gap-5 lg:grid-cols-[280px_1fr] lg:items-center">
          <img src={trip.image} alt={`${trip.operator} ${trip.vehicle}`} className="h-56 w-full rounded-lg object-cover" />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="green">{trip.vehicle}</Badge>
              <Badge tone="amber"><Star size={14} fill="currentColor" /> {trip.rating} · {trip.reviews} đánh giá</Badge>
            </div>
            <h1 className="mt-3 text-3xl font-black">{trip.from} → {trip.to}</h1>
            <p className="mt-2 text-slate-600">{trip.operator} · {trip.duration} · từ {formatCurrency(trip.price)}</p>
            <div className="mt-5 grid gap-2 text-sm text-slate-600 md:grid-cols-3">
              <span className="rounded-lg bg-slate-50 p-3"><Clock3 size={17} /> Khởi hành 07:20</span>
              <span className="rounded-lg bg-slate-50 p-3"><MapPinned size={17} /> {trip.pickup[0]}</span>
              <span className="rounded-lg bg-slate-50 p-3"><ShieldCheck size={17} /> Hủy trước 3 giờ</span>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-6 grid gap-4 lg:grid-cols-3">
        <InfoPanel title="Tiện ích trên xe" items={trip.amenities} />
        <InfoPanel title="Điểm đón" items={trip.pickup} />
        <InfoPanel title="Điểm trả & chính sách" items={[...trip.dropoff.slice(0, 2), trip.policy]} />
      </section>
      <SeatPicker seats={seatMap} price={trip.price} />
    </div>
  );
}

function InfoPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4">
      <h2 className="font-black">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm text-slate-600">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={16} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
