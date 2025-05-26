"use client";

import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/shadcnui/dialog";
import * as LucideIcons from "lucide-react";

const financialIconNames = [
  "CreditCard",
  "DollarSign",
  "Wallet",
  "PieChart",
  "BarChart2",
  "TrendingUp",
  "TrendingDown",
  "Banknote",
  "Coin",
  "Activity",
  "Zap",
  "ShoppingCart",
  "Tag",
  "Calculator",
  "Clipboard",
  "FileText",
  "Folder",
  "Briefcase",
  "Safe",
  "CheckCircle",
];

export function IconPickerDialog({
  onSelect,
  open,
  onOpenChange,
}: {
  onSelect: (icon: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [search, setSearch] = useState("");

  const filteredIcons = useMemo(() => {
    return financialIconNames.filter((name) =>
      name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogTitle>Selecionar Ícone</DialogTitle>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar ícone..."
          className="w-full p-2 border rounded mb-4"
          autoFocus
        />

        <div className="grid grid-cols-6 gap-2">
          {filteredIcons.map((name) => {
            const Icon = (LucideIcons as any)[name];
            if (!Icon) return null;

            return (
              <button
                key={name}
                onClick={() => {
                  onSelect(name);
                  onOpenChange(false); // fecha o diálogo após seleção
                }}
                className="p-2 border rounded hover:bg-gray-100 flex flex-col items-center"
                type="button"
              >
                <Icon className="w-6 h-6" />
                <span className="text-[10px] mt-1">{name}</span>
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
