import { SidebarProvider } from "@/components/shadcnui/sidebar";
import Header from "@/components/shared/Header";

export default function GeneralLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider
    >
      <div className="w-full">
        <Header />
        {children}
      </div>
    </SidebarProvider>
  );
}
