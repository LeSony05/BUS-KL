import { ArrowDownUp, Clock, SlidersHorizontal, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SearchForm } from "@/features/trips/search-form";
import { TripCard } from "@/features/trips/trip-card";
import { trips } from "@/features/trips/data";

export default function SearchTripsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <SearchForm compact />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 font-black">
            <SlidersHorizontal size={18} /> Bộ lọc
          </div>
          <div className="mt-5 space-y-5">
            <FilterBlock title="Khung giờ" items={["Sáng sớm", "Ban ngày", "Buổi tối", "Chuyến đêm"]} />
            <FilterBlock title="Loại xe" items={["Limousine", "Giường nằm", "Cabin", "Ghế ngồi"]} />
            <FilterBlock title="Tiện ích" items={["Đón tận điểm", "Xuất hóa đơn", "Có trung chuyển", "Wifi"]} />
            <FilterBlock title="Nhà xe" items={["An Tâm Express", "An Tâm Premium", "An Tâm Night"]} />
          </div>
        </aside>
        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-black">Sài Gòn → Đà Lạt</h1>
              <p className="mt-1 text-sm text-slate-500">3 chuyến phù hợp · Thứ hai, 14/09/2026</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge tone="blue"><ArrowDownUp size={14} /> Giá thấp trước</Badge>
              <Badge tone="amber"><Clock size={14} /> Giờ sớm nhất</Badge>
              <Badge tone="green"><Star size={14} /> Đánh giá cao</Badge>
            </div>
          </div>
          <div className="mb-4 grid gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-slate-700 md:grid-cols-3">
            <p><strong>Cam kết:</strong> giá hiển thị là giá vé cơ bản, phí phát sinh do backend báo ở bước thanh toán.</p>
            <p><strong>Ghế:</strong> trạng thái ghế được cập nhật khi vào chi tiết chuyến.</p>
            <p><strong>Hủy:</strong> chỉ thao tác khi API trả `canCancel` hợp lệ.</p>
          </div>
          <div className="grid gap-4">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function FilterBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <fieldset>
      <legend className="text-sm font-bold text-slate-700">{title}</legend>
      <div className="mt-2 space-y-2">
        {items.map((item) => (
          <label key={item} className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-300 accent-blue-600" />
            {item}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
