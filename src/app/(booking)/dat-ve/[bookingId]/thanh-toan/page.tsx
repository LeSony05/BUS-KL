import { CreditCard, QrCode, WalletCards } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/format";

export default function PaymentPage() {
  return (
    <main className="mx-auto grid max-w-5xl gap-6 px-4 py-8 lg:grid-cols-[1fr_340px]">
      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <p className="text-sm font-bold uppercase text-brand">Bước 3/4</p>
        <h1 className="mt-2 text-3xl font-black">Thanh toán</h1>
        <div className="mt-6 grid gap-3">
          {[
            { icon: WalletCards, name: "MoMo", text: "Mở ví hoặc quét QR từ API thanh toán." },
            { icon: CreditCard, name: "VNPAY", text: "Chuyển sang cổng VNPAY bảo mật." },
            { icon: QrCode, name: "ZaloPay", text: "Tạo giao dịch idempotent từ backend." },
          ].map((item) => (
            <label key={item.name} className="flex cursor-pointer items-center gap-4 rounded-lg border border-slate-200 p-4 hover:border-brand">
              <input type="radio" name="payment" defaultChecked={item.name === "MoMo"} className="h-4 w-4 accent-blue-600" />
              <item.icon className="text-brand" size={24} />
              <span>
                <span className="block font-black">{item.name}</span>
                <span className="text-sm text-slate-500">{item.text}</span>
              </span>
            </label>
          ))}
        </div>
      </section>
      <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5">
        <Badge tone="amber">Còn 09:18 để thanh toán</Badge>
        <div className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between"><span>1 vé x A01</span><strong>{formatCurrency(320000)}</strong></div>
          <div className="flex justify-between"><span>Mã giảm giá</span><strong>-</strong></div>
          <div className="border-t border-slate-200 pt-3">
            <div className="flex justify-between text-lg"><span className="font-black">Tổng</span><strong className="text-brand">{formatCurrency(320000)}</strong></div>
          </div>
        </div>
        <Button className="mt-5 w-full">Thanh toán {formatCurrency(320000)}</Button>
      </aside>
    </main>
  );
}
