import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/shadcnui/carousel";
import AccountCard from "../AccountCard";

export default function AccountsCarousel() {
  return (
    <div className="w-full">
      <Carousel>
        <CarouselContent>
          {mockAccounts.map((account) => (
            <CarouselItem key={account.bankName} className="basis-3/5 max-w-[160px]">
              <AccountCard
                bankName={account.bankName}
                accountType={account.accountType}
                balance={account.balance}
                icon={account.icon}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

const mockAccounts: {
  bankName: string;
  accountType: string;
  balance: number;
  icon: string;
}[] = [
  {
    bankName: "Nubank",
    accountType: "Conta-corrente",
    balance: 13343.12,
    icon: "/icon/bank/nubank.svg",
  },
  {
    bankName: "Inter",
    accountType: "Conta-corrente",
    balance: 13343.12,
    icon: "/icon/bank/inter.svg",
  },
  {
    bankName: "PicPay",
    accountType: "Conta-corrente",
    balance: 13343.12,
    icon: "/icon/bank/picPay.svg",
  },
];
