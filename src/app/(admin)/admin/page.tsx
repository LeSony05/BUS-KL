import { AlertTriangle, Bus, CircleDollarSign, TicketCheck, UsersRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/format";

const metrics = [
  { label: "Doanh thu hôm nay", value: formatCurrency(42800000), icon: CircleDollarSign, tone: "blue" },
  { label: "Vé đã bán", value: "186", icon: TicketCheck, tone: "green" },
  { label: "Chuyến đang chạy", value: "24", icon: Bus, tone: "amber" },
  { label: "Khách mới", value: "58", icon: UsersRound, tone: "slate" },
] as const;

export default function AdminDashboardPage() {
  return (
    <div className="p-4 lg:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase text-brand">Tổng quan vận hành</p>
          <h1 className="text-3xl font-black">Bảng điều khiển</h1>
        </div>
        <Badge tone="amber"><AlertTriangle size={14} /> 3 cảnh báo cần xử lý</Badge>
      </div>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article key={metric.label} className="rounded-lg border border-slate-200 bg-white p-5">
            <metric.icon className="text-brand" size={24} />
            <p className="mt-4 text-sm text-slate-500">{metric.label}</p>
            <p className="mt-1 text-3xl font-black">{metric.value}</p>
          </article>
        ))}
      </section>
      <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-black">Chuyến cần chú ý</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="text-slate-500">
                <tr>
                  <th className="py-3">Mã chuyến</th>
                  <th>Tuyến</th>
                  <th>Xe</th>
                  <th>Trạng thái</th>
                  <th className="text-right">Vé</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ["SG-DL-0720", "Sài Gòn → Đà Lạt", "51B-12345", "Sắp khởi hành", "22/34"],
                  ["SG-CT-1815", "Sài Gòn → Cần Thơ", "65A-88991", "Trễ 12 phút", "18/29"],
                  ["SG-NT-0930", "Sài Gòn → Nha Trang", "79B-45678", "Đang bán", "21/40"],
                ].map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td key={cell} className={`py-3 ${index === 4 ? "text-right font-bold" : ""}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <aside className="rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-black">Hàng đợi CSKH</h2>
          <div className="mt-4 space-y-3">
            {["Khách hỏi hủy vé A01", "VNPAY callback chậm", "Yêu cầu gửi lại hóa đơn"].map((item) => (
              <div key={item} className="rounded-lg bg-slate-50 p-3 text-sm font-semibold">{item}</div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
