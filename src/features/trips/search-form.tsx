"use client";

import { ArrowLeftRight, CalendarDays, MapPin, Search, UsersRound } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { locations } from "@/features/trips/data";

export function SearchForm({ compact = false, home = false }: { compact?: boolean; home?: boolean }) {
  const [from, setFrom] = useState("TP. Hồ Chí Minh");
  const [to, setTo] = useState("Vũng Liêm - Vĩnh Long");

  if (home) {
    return (
      <form action="/tim-chuyen" className="rounded-[24px] bg-white p-3 shadow-xl shadow-slate-300/35 ring-1 ring-slate-200">
        <div className="rounded-[20px] border-2 border-teal-200 bg-white p-4 md:p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-5 text-base font-black md:text-lg">
              <label className="inline-flex cursor-pointer items-center gap-3 text-teal-700">
                <input type="radio" name="tripType" defaultChecked className="h-5 w-5 accent-teal-600" />
                Một chiều
              </label>
              <label className="inline-flex cursor-pointer items-center gap-3 text-slate-600">
                <input type="radio" name="tripType" className="h-5 w-5 accent-teal-600" />
                Khứ hồi
              </label>
              <label className="hidden cursor-pointer items-center gap-3 text-slate-600 md:inline-flex">
                <input type="radio" name="tripType" className="h-5 w-5 accent-teal-600" />
                Thuê xe
              </label>
            </div>
            <a href="/ho-tro" className="text-sm font-black text-coral-700 text-rose-600 hover:text-rose-700">
              Hướng dẫn mua vé
            </a>
          </div>

          <div className="relative mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-[1.12fr_1.12fr_.86fr_.58fr]">
            <HomeField label="Điểm đi">
              <select name="from" value={from} onChange={(event) => setFrom(event.target.value)} className="focus-ring h-14 w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-4 text-base font-black text-slate-950">
                {locations.map((location) => (
                  <option key={location}>{location}</option>
                ))}
              </select>
            </HomeField>

            <button
              type="button"
              aria-label="Đổi chiều"
              onClick={() => {
                setFrom(to);
                setTo(from);
              }}
              className="focus-ring absolute left-[27.5%] top-[43px] z-10 hidden h-10 w-10 -translate-x-1/2 place-items-center rounded-full border border-slate-200 bg-white text-teal-700 shadow-lg xl:grid"
            >
              <ArrowLeftRight size={18} />
            </button>

            <HomeField label="Điểm đến">
              <select name="to" value={to} onChange={(event) => setTo(event.target.value)} className="focus-ring h-14 w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-4 text-base font-black text-slate-950">
                {locations.map((location) => (
                  <option key={location}>{location}</option>
                ))}
              </select>
            </HomeField>

            <HomeField label="Ngày đi">
              <span className="grid h-14 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-1.5">
                <input name="date" type="date" defaultValue="2026-09-13" className="focus-ring min-w-0 bg-transparent text-base font-black text-slate-950" />
                <span className="text-xs font-bold text-slate-500">Chủ nhật</span>
              </span>
            </HomeField>

            <HomeField label="Số vé">
              <select name="tickets" defaultValue="1" className="focus-ring h-14 w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-4 text-base font-black text-slate-950">
                {[1, 2, 3, 4, 5, 6].map((count) => (
                  <option key={count}>{count}</option>
                ))}
              </select>
            </HomeField>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_260px] lg:items-stretch">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-base font-black text-slate-800">Tìm kiếm gần đây</p>
              <button type="button" className="mt-3 w-full max-w-xl rounded-2xl border border-slate-200 bg-white px-5 py-3 text-left text-sm font-bold text-slate-700 shadow-sm md:text-base">
                TP. Hồ Chí Minh - Vũng Liêm - Vĩnh Long · 13/09/2026
              </button>
            </div>
            <Button className="h-14 w-full self-end rounded-2xl bg-gradient-to-r from-teal-600 to-sky-600 text-base hover:from-teal-700 hover:to-sky-700 lg:h-full lg:min-h-20">
              <Search size={22} /> Tìm chuyến
            </Button>
          </div>
        </div>
      </form>
    );
  }

  return (
    <form action="/tim-chuyen" className={`grid gap-3 ${compact ? "lg:grid-cols-[1fr_1fr_150px_120px_auto]" : "lg:grid-cols-[1fr_auto_1fr_170px_130px_auto]"}`}>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-slate-700">Điểm đi</span>
        <span className="relative">
          <MapPin className="pointer-events-none absolute left-3 top-3 text-slate-400" size={20} />
          <select name="from" value={from} onChange={(event) => setFrom(event.target.value)} className="focus-ring h-12 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm font-semibold">
            {locations.map((location) => (
              <option key={location}>{location}</option>
            ))}
          </select>
        </span>
      </label>
      {!compact && (
        <button
          type="button"
          aria-label="Đổi chiều"
          onClick={() => {
            setFrom(to);
            setTo(from);
          }}
          className="focus-ring mt-7 hidden h-12 w-12 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-blue-50 hover:text-brand lg:grid"
        >
          <ArrowLeftRight size={19} />
        </button>
      )}
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-slate-700">Điểm đến</span>
        <span className="relative">
          <MapPin className="pointer-events-none absolute left-3 top-3 text-slate-400" size={20} />
          <select name="to" value={to} onChange={(event) => setTo(event.target.value)} className="focus-ring h-12 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm font-semibold">
            {locations.map((location) => (
              <option key={location}>{location}</option>
            ))}
          </select>
        </span>
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-slate-700">Ngày đi</span>
        <span className="relative">
          <CalendarDays className="pointer-events-none absolute left-3 top-3 text-slate-400" size={20} />
          <input name="date" type="date" defaultValue="2026-09-14" className="focus-ring h-12 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm font-semibold" />
        </span>
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-slate-700">Số vé</span>
        <span className="relative">
          <UsersRound className="pointer-events-none absolute left-3 top-3 text-slate-400" size={20} />
          <input name="tickets" type="number" min={1} max={8} defaultValue={1} className="focus-ring h-12 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm font-semibold" />
        </span>
      </label>
      <Button className="mt-auto h-12">
        <Search size={18} /> Tìm chuyến
      </Button>
    </form>
  );
}

function HomeField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="px-2 text-sm font-black text-slate-700 md:text-base">{label}</span>
      {children}
    </label>
  );
}
