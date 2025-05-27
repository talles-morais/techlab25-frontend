import Image from "next/image";

interface AccountCardProps {
  bankName: string;
  accountType: string;
  balance: number;
  icon: string;
}

export default function AccountCard({
  bankName,
  accountType,
  balance,
  icon,
}: AccountCardProps) {
  return (
    <div className="flex flex-col justify-between bg-light-background border border-primary rounded-lg px-3 py-2  min-h-36">
      <h1 className="text-lg font-bold">{bankName}</h1>
      <h2 className="text-sm">{accountType}</h2>

      <span className="text-xl font-bold">
        R$ {balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
      </span>

      <figure className="block relative min-w-8 w-fit h-6 self-end">
        <Image
          src={icon}
          fill
          alt="Ícone do banco"
          className="max-h-6"
        />
      </figure>
    </div>
  );
}
