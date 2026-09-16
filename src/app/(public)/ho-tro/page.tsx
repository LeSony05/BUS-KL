import { Headphones, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SupportPage() {
  return (
    <div className="mx-auto grid max-w-5xl gap-6 px-4 py-12 lg:grid-cols-[1fr_360px]">
      <section>
        <p className="text-sm font-bold uppercase text-brand">Hỗ trợ</p>
        <h1 className="mt-2 text-3xl font-black">Trung tâm trợ giúp</h1>
        <div className="mt-6 grid gap-3">
          {["Điều kiện hủy vé trước 3 giờ", "Cách tra cứu vé vãng lai", "Thanh toán chậm callback", "Quy trình gửi hàng"].map((item) => (
            <article key={item} className="rounded-lg border border-slate-200 bg-white p-4">
              <h2 className="font-black">{item}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Nội dung chi tiết sẽ lấy từ CMS hoặc backend khi tích hợp thật.</p>
            </article>
          ))}
        </div>
      </section>
      <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-blue-50 text-brand">
            <Headphones size={23} />
          </span>
          <div>
            <p className="font-black">Chat hỗ trợ</p>
            <p className="text-sm text-slate-500">Bot sẽ chuyển nhân viên khi cần.</p>
          </div>
        </div>
        <div className="mt-5 space-y-3 rounded-lg bg-slate-50 p-3 text-sm">
          <p className="w-fit rounded-lg bg-white px-3 py-2 shadow-sm">Bạn cần hỗ trợ vé hay gửi hàng?</p>
          <p className="ml-auto w-fit rounded-lg bg-brand px-3 py-2 text-white">Tôi muốn hỏi về hủy vé</p>
        </div>
        <div className="mt-4 flex gap-2">
          <input aria-label="Tin nhắn" className="focus-ring h-11 min-w-0 flex-1 rounded-lg border border-slate-200 px-3" placeholder="Nhập tin nhắn" />
          <Button aria-label="Gửi tin nhắn">
            <Send size={17} />
          </Button>
        </div>
        <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
          <MessageCircle size={16} /> Đang trực tuyến
        </p>
      </aside>
    </div>
  );
}
