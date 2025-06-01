"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/shadcnui/button";
import { Label } from "@/components/shadcnui/label";
import { RadioGroup, RadioGroupItem } from "@/components/shadcnui/radio-group";
import { SortValues } from "@/components/shared/types/searchAndFilterTypes";

interface SortPopoverContentProps {
  initialSort: SortValues;
  onApply: (sortToApply: SortValues) => void;
  onClose: () => void;
}

export default function SortPopoverContent({
  initialSort,
  onApply,
  onClose,
}: SortPopoverContentProps) {
  const [stagedSort, setStagedSort] = useState<SortValues>(initialSort);

  useEffect(() => {
    setStagedSort(initialSort);
  }, [initialSort]);

  const handleSortChange = (
    field: keyof SortValues,
    value: "date" | "amount" | "asc" | "desc" | undefined
  ) => {
    setStagedSort((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyClick = () => {
    onApply(stagedSort);
    onClose();
  };

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Ordenação</h4>
        <p className="text-sm text-muted-foreground">
          Escolha como os itens serão ordenados.
        </p>
      </div>
      <div className="grid gap-3">
        <div>
          <Label>Ordenar por</Label>
          <RadioGroup
            value={stagedSort.by || ""}
            onValueChange={(value) =>
              handleSortChange("by", value as "date" | "amount" | undefined)
            }
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="date" id="popover-sort-date" />
              <Label htmlFor="popover-sort-date" className="font-normal">
                Data
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="amount" id="popover-sort-amount" />
              <Label htmlFor="popover-sort-amount" className="font-normal">
                Valor
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Label>Ordem</Label>
          <RadioGroup
            value={stagedSort.order || ""}
            onValueChange={(value) =>
              handleSortChange("order", value as "asc" | "desc" | undefined)
            }
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="asc" id="popover-sort-asc" />
              <Label htmlFor="popover-sort-asc" className="font-normal">
                Crescente
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="desc" id="popover-sort-desc" />
              <Label htmlFor="popover-sort-desc" className="font-normal">
                Decrescente
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <Button size="sm" onClick={handleApplyClick}>
          Aplicar Ordenação
        </Button>
      </div>
    </div>
  );
}
