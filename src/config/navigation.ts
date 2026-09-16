import { BadgeCheck, Bell, Bus, Headphones, Package, Search, ShieldCheck, Ticket } from "lucide-react";

export const publicNav = [
  { href: "/", label: "Dat ve", icon: Bus },
  { href: "/tim-chuyen", label: "Tim chuyen", icon: Search },
  { href: "/tra-cuu-ve", label: "Tra cuu ve", icon: Ticket },
  { href: "/gui-hang", label: "Gui hang", icon: Package },
  { href: "/ho-tro", label: "Ho tro", icon: Headphones },
];

export const adminNav = [
  { href: "/admin", label: "Tong quan", icon: Bell },
  { href: "/admin/chuyen-xe", label: "Chuyen xe", icon: Bus },
  { href: "/admin/ve", label: "Ve", icon: Ticket },
  { href: "/admin/hang-hoa", label: "Hang hoa", icon: Package },
  { href: "/admin/phan-quyen", label: "Phan quyen", icon: ShieldCheck },
  { href: "/admin/bao-cao", label: "Bao cao", icon: BadgeCheck },
];
