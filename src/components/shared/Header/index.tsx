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

      <AppSidebar />
    </header>
  );
}
