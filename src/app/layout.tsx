import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "An Tam Bus",
  description: "Website dat ve xe khach hien dai cho khach hang va nhan vien van hanh.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
