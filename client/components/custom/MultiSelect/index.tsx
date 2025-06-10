"use client";
import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronsUpDown, X } from "lucide-react";

interface Option {
  value: string;
  label: string;
  disable?: boolean;
}

interface MultiSelectProps {
  options: Option[];
  selectedValues: string[];
  setSelectedValues: (vals: string[]) => void;
  placeholder?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedValues,
  setSelectedValues,
  placeholder = "Select materials...",
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const filteredOptions = inputValue
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(inputValue.toLowerCase())
      )
    : options;

  const toggleSelection = (value: string) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((v) => v !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  const removeSelected = (value: string) =>
    setSelectedValues(selectedValues.filter((v) => v !== value));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between h-fit"
          onClick={() => setOpen((o) => !o)}
        >
          <div className="flex flex-wrap gap-2 items-center">
            {selectedValues.length > 0 ? (
              selectedValues.map((val) => {
                const opt = options.find((o) => o.value === val);
                return (
                  <Badge
                    key={val}
                    variant="secondary"
                    className="flex items-center gap-1 bg-slate-200 hover:bg-slate-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSelected(val);
                    }}
                  >
                    {opt?.label}
                    <X className="h-3 w-3 cursor-pointer" />
                  </Badge>
                );
              })
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-5 w-5 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search..."
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            {filteredOptions.length === 0 && (
              <CommandEmpty>No options found.</CommandEmpty>
            )}
            {filteredOptions.map((option) => {
              const isSelected = selectedValues.includes(option.value);
              return (
                <CommandItem
                  key={option.value}
                  onSelect={() => toggleSelection(option.value)}
                  className={
                    option.disable ? "opacity-50 cursor-not-allowed" : ""
                  }
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${isSelected ? "" : "opacity-0"}`}
                  />
                  {option.label}
                </CommandItem>
              );
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelect;
