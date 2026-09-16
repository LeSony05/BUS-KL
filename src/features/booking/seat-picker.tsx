"use client";

import { Armchair, TimerReset } from "lucide-react";
import { useMemo, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import type { Seat } from "@/features/trips/data";
import { formatCurrency } from "@/lib/format";

export function SeatPicker({ seats, price }: { seats: Seat[]; price: number }) {
  const [selected, setSelected] = useState<string[]>(["A01"]);
  const total = useMemo(() => selected.length * price, [selected, price]);

  function toggleSeat(seat: Seat) {
    if (seat.status !== "available") return;
    setSelected((current) => (current.includes(seat.id) ? current.filter((id) => id !== seat.id) : [...current, seat.id]));
  }

  const groups = [
    { id: "lower", label: "Tầng dưới" },
    { id: "upper", label: "Tầng trên" },
  ] as const;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black">Chọn ghế</h2>
            <p className="mt-1 text-sm text-slate-500">Ghế chỉ được giữ sau khi bấm tiếp tục.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-sm font-bold text-amber-700">
            <TimerReset size={18} /> Giữ chỗ 10 phút
          </div>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {groups.map((group) => (
            <div key={group.id} className="rounded-lg bg-slate-50 p-4">
              <p className="mb-4 text-sm font-black uppercase text-slate-500">{group.label}</p>
              <div className="grid grid-cols-4 gap-3">
                {seats
                  .filter((seat) => seat.deck === group.id)
                  .map((seat) => {
                    const isSelected = selected.includes(seat.id);
                    const unavailable = seat.status !== "available";
                    return (
                      <button
                        key={seat.id}
                        type="button"
                        disabled={unavailable}
                        aria-label={`Ghế ${seat.id} ${seat.status === "sold" ? "đã bán" : seat.status === "held" ? "đang giữ" : isSelected ? "đang chọn" : "còn trống"}`}
                        onClick={() => toggleSeat(seat)}
                        className={`focus-ring grid aspect-square place-items-center rounded-lg border text-xs font-black transition ${
                          isSelected
                            ? "border-brand bg-brand text-white"
                            : unavailable
                              ? "cursor-not-allowed border-slate-200 bg-slate-200 text-slate-400"
                              : "border-slate-200 bg-white text-slate-700 hover:border-brand hover:text-brand"
                        }`}
                      >
                        <Armchair size={17} />
                        <span>{seat.id}</span>
                      </button>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-600">
          <span className="inline-flex items-center gap-2"><i className="h-3 w-3 rounded bg-white ring-1 ring-slate-300" /> Còn trống</span>
          <span className="inline-flex items-center gap-2"><i className="h-3 w-3 rounded bg-brand" /> Đang chọn</span>
          <span className="inline-flex items-center gap-2"><i className="h-3 w-3 rounded bg-slate-300" /> Đã bán/đang giữ</span>
        </div>
      </section>
      <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-bold uppercase text-slate-500">Tóm tắt đặt vé</p>
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between"><span>Ghế đã chọn</span><strong>{selected.join(", ") || "Chưa chọn"}</strong></div>
          <div className="flex justify-between"><span>Đơn giá</span><strong>{formatCurrency(price)}</strong></div>
          <div className="border-t border-slate-200 pt-3">
            <div className="flex justify-between text-lg"><span className="font-black">Tổng tiền</span><strong className="text-brand">{formatCurrency(total)}</strong></div>
          </div>
        </div>
        <ButtonLink href="/dat-ve/BK-20260914/hanh-khach" className={`mt-5 w-full ${selected.length === 0 ? "pointer-events-none opacity-50" : ""}`}>
          Tiếp tục
        </ButtonLink>
      </aside>
    </div>
  );
}
