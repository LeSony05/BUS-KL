import { Armchair, Clock3, MapPinned, ShieldCheck, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import type { Trip } from "@/features/trips/data";
import { formatCurrency } from "@/lib/format";

export function TripCard({ trip }: { trip: Trip }) {
  const depart = new Date(trip.departAt);
  const arrive = new Date(trip.arriveAt);

  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-col lg:flex-row">
        <div className="relative h-44 shrink-0 lg:h-auto lg:w-56">
          <img src={trip.image} alt={`${trip.operator} ${trip.vehicle}`} className="h-full w-full object-cover" />
          <div className="absolute left-3 top-3 rounded-lg bg-white/90 px-2 py-1 text-xs font-black text-brand">{trip.tags[0]}</div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-black text-slate-950">{trip.operator}</h3>
            <Badge tone="green">{trip.vehicle}</Badge>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600">
              <Star size={15} fill="currentColor" /> {trip.rating} · {trip.reviews} đánh giá
            </span>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
            <div>
              <p className="text-2xl font-black">{depart.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}</p>
              <p className="text-sm text-slate-500">{trip.from}</p>
            </div>
            <div className="hidden min-w-36 text-center md:block">
              <p className="text-xs font-bold uppercase text-slate-400">{trip.duration}</p>
              <div className="my-2 h-px bg-slate-200" />
              <p className="text-xs text-slate-500">Không đổi tuyến</p>
            </div>
            <div className="md:text-right">
              <p className="text-2xl font-black">{arrive.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}</p>
              <p className="text-sm text-slate-500">{trip.to}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
            <span className="inline-flex items-center gap-1"><MapPinned size={16} /> {trip.pickup[0]}</span>
            <span className="inline-flex items-center gap-1"><Clock3 size={16} /> Dự kiến đúng giờ</span>
            <span className="inline-flex items-center gap-1"><Armchair size={16} /> {trip.seatsLeft} ghế trống</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {trip.amenities.slice(0, 4).map((amenity) => (
              <span key={amenity} className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">{amenity}</span>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-slate-50 p-4 lg:min-w-48 lg:text-right">
          <p className="text-sm text-slate-500">Từ</p>
          {trip.oldPrice ? <p className="text-sm font-semibold text-slate-400 line-through">{formatCurrency(trip.oldPrice)}</p> : null}
          <p className="text-2xl font-black text-brand">{formatCurrency(trip.price)}</p>
          <p className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700"><ShieldCheck size={14} /> Có chính sách hủy</p>
          <ButtonLink href={`/chuyen-xe/${trip.id}`} className="mt-4 w-full">
            Chọn chuyến
          </ButtonLink>
        </div>
        </div>
      </div>
    </article>
  );
}
