import { SidebarProvider } from "@/components/shadcnui/sidebar";
import Header from "@/components/shared/Header";
import { AppSidebar } from "@/components/shared/Sidebar";

export default function GeneralLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="w-full">
        <Header />
        <AppSidebar />

        {children}
      </div>
    </SidebarProvider>
  );
}
