import ResumeChart from "@/components/dashboard/ResumeChart";
import WelcomeBalance from "@/components/dashboard/WelcomeBalance";
import NewTransaction from "@/components/transactions/NewTransaction";

export default function DashboardPage() {
  return (
    <div className="w-full">
      <main className="flex flex-col gap-5 font-work-sans px-3 py-4 md:container md:mx-auto">
        <section className="flex flex-col items-end gap-3">
          <WelcomeBalance />
          <NewTransaction />
        </section>

        <section className="py-2 bg-light-background rounded-lg">
          <ResumeChart />
        </section>
      </main>
    </div>
  );
}
