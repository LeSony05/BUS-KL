"use client";

import { LockKeyhole, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const account = String(form.get("account") ?? "").trim();
    const password = String(form.get("password") ?? "");

    if (account === "admin@antambus.vn" && password === "Admin@123") {
      localStorage.setItem("antam-demo-role", "admin");
      router.push("/admin");
      return;
    }

    setError("Tài khoản demo: admin@antambus.vn / Admin@123");
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
      <label className="grid gap-2">
        <span className="text-sm font-semibold">Email hoặc số điện thoại</span>
        <span className="relative">
          <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
          <input name="account" defaultValue="admin@antambus.vn" className="focus-ring h-12 w-full rounded-lg border border-slate-200 pl-10 pr-3" />
        </span>
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-semibold">Mật khẩu</span>
        <span className="relative">
          <LockKeyhole className="absolute left-3 top-3 text-slate-400" size={18} />
          <input name="password" type="password" defaultValue="Admin@123" className="focus-ring h-12 w-full rounded-lg border border-slate-200 pl-10 pr-3" />
        </span>
      </label>
      {error ? <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p> : null}
      <Button>Đăng nhập dashboard</Button>
      <p className="rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-800">
        Demo admin: <strong>admin@antambus.vn</strong> / <strong>Admin@123</strong>
      </p>
    </form>
  );
}
