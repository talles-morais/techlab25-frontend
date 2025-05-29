import AccountsCarousel from "@/components/accounts/AccountsCarousel";
import NewAccount from "@/components/accounts/NewAccount";

export default function ContasPage() {
  return (
    <div className="w-full">
      <main className="flex flex-col gap-5 font-work-sans px-3 py-10 md:container md:mx-auto">
        <section className="flex flex-col items-end gap-3">
          <NewAccount />
          <AccountsCarousel />
        </section>

        <section className="py-2 bg-light-background rounded-lg">
          {/* transações */}
        </section>
      </main>
    </div>
  );
}
