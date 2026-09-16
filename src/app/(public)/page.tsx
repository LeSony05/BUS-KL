import { ArrowRight, BusFront, Headphones, PackageCheck, Percent, ShieldCheck, TicketCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { SearchForm } from "@/features/trips/search-form";
import { TripCard } from "@/features/trips/trip-card";
import { popularRoutes, promotions, trips } from "@/features/trips/data";
import { formatCurrency } from "@/lib/format";

export default function HomePage() {
  return (
    <div className="bg-[#f6faf9]">
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#eef8f7] pb-10">
        <div className="absolute inset-x-0 top-0 h-72 bg-[linear-gradient(135deg,#0f766e_0%,#0f172a_58%,#1e3a8a_100%)]" />
        <div className="absolute inset-x-0 top-0 h-72 opacity-40 [background-image:linear-gradient(45deg,transparent_0_35%,rgba(255,255,255,.2)_35%_36%,transparent_36%_65%,rgba(255,255,255,.16)_65%_66%,transparent_66%)]" />
        <div className="relative mx-auto max-w-[1340px] px-4 py-6 sm:px-6 lg:py-8">
          <div className="relative overflow-hidden rounded-[28px] bg-slate-950 text-white shadow-2xl ring-1 ring-white/20">
            <img
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1800&q=80"
              alt="Đoàn xe khách hiện đại"
              className="absolute inset-0 h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(45,212,191,.35),transparent_24%),linear-gradient(90deg,rgba(15,23,42,.96),rgba(15,23,42,.62)_48%,rgba(15,118,110,.72))]" />
            <div className="relative grid gap-8 p-6 sm:p-8 md:p-10 lg:min-h-[380px] lg:grid-cols-[1fr_400px] lg:items-center">
              <div>
                <p className="w-fit rounded-full bg-white/12 px-4 py-2 text-sm font-black uppercase tracking-wide text-cyan-100 ring-1 ring-white/20">
                  An Tâm Bus · tuyến xe liên tỉnh
                </p>
                <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.08] md:text-5xl lg:text-[56px]">
                  Đi đâu cũng gọn, đặt vé trong vài chạm.
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
                  So sánh chuyến, chọn ghế, điểm đón trả và thanh toán online trong một trải nghiệm rõ ràng, dễ dùng trên cả điện thoại.
                </p>
                <div className="mt-7 grid max-w-2xl gap-3 sm:grid-cols-3">
                  {[
                    ["46", "tuyến hoạt động"],
                    ["10 phút", "giữ ghế"],
                    ["24/7", "hỗ trợ vé"],
                  ].map(([value, label]) => (
                    <div key={label} className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
                      <p className="text-2xl font-black md:text-3xl">{value}</p>
                      <p className="text-sm font-bold text-cyan-100">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[24px] bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur">
                <p className="text-sm font-black uppercase text-cyan-100">Chuyến đang mở bán</p>
                <div className="mt-4 space-y-3">
                  {[
                    ["07:20", "Sài Gòn → Đà Lạt", "12 ghế"],
                    ["09:30", "Sài Gòn → Nha Trang", "19 ghế"],
                    ["21:00", "Đà Nẵng → Sài Gòn", "6 ghế"],
                  ].map(([time, route, seats]) => (
                    <div key={route} className="grid grid-cols-[72px_1fr_auto] items-center gap-3 rounded-2xl bg-white p-3 text-slate-950">
                      <span className="font-black text-teal-700">{time}</span>
                      <span className="font-black">{route}</span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{seats}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mx-auto mt-5 max-w-[1280px]">
            <SearchForm home />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-8 md:grid-cols-3">
        {[
          { icon: TicketCheck, title: "Đặt vé không cần tài khoản", text: "Khách vãng lai vẫn tra cứu, hủy vé hợp lệ và nhận thông báo." },
          { icon: ShieldCheck, title: "Giá và quyền hủy từ server", text: "UI không tự tính phí hủy, giảm giá hoặc trạng thái hoàn tiền." },
          { icon: PackageCheck, title: "Gửi hàng cùng tuyến", text: "Khai báo hàng, báo giá và theo dõi vận đơn trong một luồng riêng." },
        ].map((item) => (
          <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-5">
            <item.icon className="text-brand" size={26} />
            <h2 className="mt-4 text-lg font-black">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="bg-white py-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase text-brand">Tuyến phổ biến</p>
              <h2 className="text-3xl font-black">Đặt nhanh các tuyến nhiều khách</h2>
            </div>
            <ButtonLink href="/tim-chuyen" variant="secondary">
              Tìm chuyến <ArrowRight size={17} />
            </ButtonLink>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {popularRoutes.map((route) => (
              <article key={`${route.from}-${route.to}`} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <img src={route.image} alt={`${route.from} đến ${route.to}`} className="h-32 w-full object-cover" />
                <div className="p-4">
                  <p className="font-black">{route.from} → {route.to}</p>
                  <p className="mt-1 text-sm text-slate-500">{route.trips} chuyến/ngày</p>
                  <p className="mt-3 text-sm font-bold text-brand">Từ {formatCurrency(route.price)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase text-brand">Chuyến nổi bật</p>
            <h2 className="text-3xl font-black">Gợi ý hôm nay</h2>
          </div>
          <ButtonLink href="/tim-chuyen" variant="secondary">
            Xem tất cả <ArrowRight size={17} />
          </ButtonLink>
        </div>
        <div className="grid gap-4">
          {trips.slice(0, 2).map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-blue-50 py-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase text-brand">Ưu đãi</p>
              <h2 className="text-3xl font-black">Mã giảm giá đang mở</h2>
            </div>
            <Percent className="text-brand" size={30} />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {promotions.map((promo) => (
              <article key={promo.code} className="rounded-lg border border-blue-100 bg-white p-5">
                <p className="w-fit rounded-lg bg-brand px-3 py-1 text-sm font-black text-white">{promo.code}</p>
                <h3 className="mt-4 text-lg font-black">{promo.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{promo.description}</p>
                <p className="mt-4 text-xs font-bold text-slate-500">Hết hạn {promo.expires}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-10 md:grid-cols-3">
        {[
          { icon: BusFront, title: "So sánh chuyến rõ ràng", text: "Giờ chạy, loại xe, ghế trống, điểm đón/trả và chính sách được đặt trong cùng card." },
          { icon: Headphones, title: "CSKH trong luồng đặt vé", text: "Chat hỗ trợ không che CTA thanh toán và có hàng đợi nhân viên." },
          { icon: ShieldCheck, title: "Sẵn sàng nối backend", text: "Các trạng thái vé, thanh toán, hoàn tiền và ghế đã tách riêng theo đặc tả." },
        ].map((item) => (
          <article key={item.title} className="rounded-lg bg-slate-950 p-5 text-white">
            <item.icon className="text-blue-200" size={26} />
            <h3 className="mt-4 text-lg font-black">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{item.text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
