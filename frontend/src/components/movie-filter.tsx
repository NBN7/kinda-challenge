"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown } from "lucide-react";

interface MovieFiltersProps {
  filterKey: string;
  formattedLabel: string;
  options: string[];
  value: string | null;
  onChange: (value: string | null) => void;
}

export const MovieFilter = ({
  formattedLabel,
  options,
  value,
  onChange,
}: MovieFiltersProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-[180px] justify-between"
        >
          <p className="w-[180px] overflow-hidden truncate text-start">
            {value ? value : formattedLabel}
          </p>
          <ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0">
        <Command>
          <CommandInput
            placeholder={`Search ${formattedLabel.toLowerCase()}...`}
          />
          <CommandList>
            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={(currentValue) => {
                    const newValue =
                      value === currentValue ? null : currentValue;
                    onChange(newValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={`mr-2 size-4 ${
                      value === option ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
