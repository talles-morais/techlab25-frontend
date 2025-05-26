"use client";

import {
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  Landmark,
  CreditCard,
  Ungroup,
  BadgeCent,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/shadcnui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Contas", url: "/contas", icon: Landmark },
  { title: "Cartões", url: "/cartoes", icon: CreditCard },
  { title: "Categorias", url: "/categorias", icon: Ungroup },
  { title: "Transações", url: "/transacoes", icon: BadgeCent },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { open, openMobile, toggleSidebar } = useSidebar();

  const currentItem = items.find((item) => pathname.startsWith(item.url));
  const currentTitle = currentItem ? currentItem.title : "Dashboard";

  return (
    <div className="flex">
      {/* open on mobile */}
      <button
        onClick={() => toggleSidebar()}
        className="flex md:hidden items-center z-50 p-2 text-xl font-bold text-primary"
      >
        {openMobile ? (
          <ChevronRight size={23} strokeWidth={3} />
        ) : (
          <ChevronLeft size={23} strokeWidth={3} />
        )}
        <span>{currentTitle}</span>
      </button>

      {/* open on desktop */}
      <button
        onClick={() => toggleSidebar()}
        className="hidden md:flex items-center z-50 p-2 text-xl font-bold text-primary"
      >
        {!open && (
          <>
            <ChevronLeft size={23} strokeWidth={3} />
            <span>Dashboard</span>
          </>
        )}
      </button>

      <Sidebar variant="floating" side="right" collapsible="offcanvas">
        <SidebarHeader className="pt-4">
          <button
            onClick={() => toggleSidebar()}
            className="relative flex justify-between w-full"
          >
            <ChevronRight size={23} strokeWidth={3} className="text-primary" />
            <Image
              src="/logo/light-horizontal.svg"
              fill
              alt="Logo horizonal do econoview"
              className="flex justify-end max-w-[160px]"
            />
          </button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu className="flex flex-col px-1 py-3.5 items-end text-primary gap-4">
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link onClick={toggleSidebar} href={item.url} className="flex items-center gap-2">
                    <span className="text-2xl font-bold hover:underline group-hover:text-primary">
                      {item.title}
                    </span>
                    <item.icon
                      size={32}
                      strokeWidth={3}
                      className="group-hover:text-primary"
                    />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
