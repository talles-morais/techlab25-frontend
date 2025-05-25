import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
} from "@/components/shadcnui/sidebar";
import Image from "next/image";
import { AppSidebar } from "../Sidebar";

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-white w-full px-3 py-2 drop-shadow-lg shadow">
      <figure className="relative w-8 h-8">
        <Image src="/logo/icon.svg" fill alt="Ícone da logo EconoView" />
      </figure>

      <AppSidebar />
    </header>
  );
}
