"use client";

import Image from "next/image";
import { useSidebar } from "@/components/shadcnui/sidebar";
import { ChevronLeft } from "lucide-react";
import { usePathname } from "next/navigation";

const items = [
  { title: "Dashboard", url: "/dashboard" },
  { title: "Contas", url: "/contas" },
  { title: "Cartões", url: "/cartoes" },
  { title: "Categorias", url: "/categorias" },
  { title: "Transações", url: "/transacoes" },
];

export default function Header() {
  const pathname = usePathname();

  const { open, toggleSidebar } = useSidebar();

  const currentItem = items.find((item) => pathname.startsWith(item.url));
  const currentTitle = currentItem ? currentItem.title : "Dashboard";

  return (
    <header className="flex justify-between items-center bg-white w-full px-3 py-2 drop-shadow-lg shadow">
      {/* mobile */}
      <figure className="md:hidden block relative w-8 h-8">
        <Image src="/logo/icon.svg" fill alt="Ícone da logo EconoView" />
      </figure>

      {/* desktop */}
      <img
        className="hidden md:block h-11"
        src="/logo/light-horizontal.svg"
        alt="Ícone da logo EconoView"
      />

      <button
        onClick={() => toggleSidebar()}
        className="flex items-center p-2 text-xl font-bold text-primary"
      >
        {!open && (
          <>
            <ChevronLeft size={23} strokeWidth={3} />
            <span>{currentTitle}</span>
          </>
        )}
      </button>
    </header>
  );
}
