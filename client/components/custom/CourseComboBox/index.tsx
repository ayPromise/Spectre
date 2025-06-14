import { useState } from "react";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

interface CourseComboboxProps {
  allCourses: string[];
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}

const CourseCombobox: React.FC<CourseComboboxProps> = ({
  allCourses,
  value,
  onChange,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const filteredCourses = allCourses.filter((course) =>
    course.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSelect = (course: string) => {
    onChange(course);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className="w-[200px] text-sm font-medium h-[36px] border"
      >
        <button disabled={disabled}>{value || "Призначте курс..."}</button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Введіть або оберіть курс..."
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            {filteredCourses.map((course) => (
              <CommandItem
                key={course}
                value={course}
                onSelect={() => handleSelect(course)}
              >
                {course}
              </CommandItem>
            ))}
            {inputValue && !filteredCourses.includes(inputValue) && (
              <CommandItem
                value={inputValue}
                onSelect={() => handleSelect(inputValue)}
                className="text-blue-600"
              >
                Додати: <strong>{inputValue}</strong>
              </CommandItem>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CourseCombobox;
