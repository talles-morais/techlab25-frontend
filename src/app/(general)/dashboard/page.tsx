import WelcomeBalance from "@/components/dashboard/WelcomeBalance";
import NewTransaction from "@/components/transactions/NewTransaction";

export default function DashboardPage() {
  return (
    <div className="w-full">
      <main className="font-work-sans px-3 py-4 md:container md:mx-auto">
        <section className="flex flex-col items-end gap-3">
          <WelcomeBalance />
          <NewTransaction />
        </section>
      </main>
    </div>
  );
}
