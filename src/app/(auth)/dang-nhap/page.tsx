import { LoginForm } from "@/features/auth/login-form";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-page px-4">
      <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-brand text-xl font-black text-white">A</span>
          <h1 className="mt-4 text-3xl font-black">Đăng nhập</h1>
          <p className="mt-2 text-sm text-slate-600">Dùng email hoặc số điện thoại và mật khẩu.</p>
        </div>
        <LoginForm />
      </section>
    </main>
  );
}
