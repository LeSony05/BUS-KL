import { Badge } from "@/components/ui/badge";

const roles = ["Bán vé", "CSKH", "Kế toán", "Admin"];
const modules = ["Chuyến xe", "Vé", "Hàng hóa", "Báo cáo", "Phân quyền"];

export default function PermissionsPage() {
  return (
    <div className="p-4 lg:p-8">
      <p className="text-sm font-bold uppercase text-brand">Bảo mật</p>
      <h1 className="text-3xl font-black">Phân quyền nhân viên</h1>
      <div className="mt-6 overflow-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr><th className="p-4">Module</th>{roles.map((role) => <th key={role}>{role}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {modules.map((module) => (
              <tr key={module}>
                <td className="p-4 font-black">{module}</td>
                {roles.map((role) => <td key={role}><Badge tone={role === "Admin" ? "green" : module === "Phân quyền" ? "slate" : "blue"}>{role === "Admin" ? "Đầy đủ" : module === "Phân quyền" ? "Không" : "Theo quyền"}</Badge></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
