"use client";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { memo, useMemo, useState } from "react";
import cn from "classnames";
import { Lucide } from "../common"; // Assuming you have an icon component
import { Option } from "@/interfaces/types";

type Props = {
  options?: Option[];
  value?: Option;
  error?: string;
  label?: string;
  placeholder?: string;
  onChange: (value: Option) => void;
  onApiSearch?: (query: string) => void;
  className?: string;
  buttonClassName?: string;
  labelClassName?: string;
};

export const ComboboxDropdown: React.FC<Props> = memo(
  ({
    options = [],
    value,
    label,
    placeholder,
    error,
    className,
    buttonClassName,
    labelClassName,
    onChange,
    onApiSearch,
  }) => {
    const [query, setQuery] = useState("");
    const [selectedValue, setSelectedValue] = useState<Option | undefined>(
      value || options[0]
    );

    const filteredOptions = useMemo(() => {
      if (typeof onApiSearch === "function") {
        onApiSearch(query);
        return options;
      } else {
        return query === ""
          ? options
          : options?.filter((option) =>
              option?.name.toLowerCase().includes(query.toLowerCase())
            );
      }
    }, [query]);

    const handleSelect = (value: Option) => {
      setSelectedValue(value);
      onChange(value);
      setQuery(""); // Reset query when an option is selected
    };

    return (
      <div className={cn("relative", className)}>
        {label && (
          <label
            className={cn(
              "block mb-1 ml-1 text-xs text-dash_black",
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        <Combobox value={selectedValue} onChange={handleSelect}>
          <div className="relative flex items-center">
            <ComboboxInput
              onChange={(event) => setQuery(event.target?.value || "")}
              displayValue={(person: Option) => person?.name || ""}
              className={cn(
                "w-full text-left capitalize text-xs font-medium py-2 px-2 rounded-md border outline-none focus:border-dash_red",
                buttonClassName,
                {
                  "border-dash_red": !!error,
                }
              )}
              placeholder={placeholder || "Select an option"}
            />
            <ComboboxButton className="absolute  right-3 flex items-center p-2 cursor-pointer z-10">
              <Lucide name="ChevronDown" size={16} />
            </ComboboxButton>
          </div>

          {error && <small className="text-dash_red">{error}</small>}

          <ComboboxOptions
            anchor="bottom"
            className={cn(
              "w-[var(--input-width)] rounded-xl border   bg-white  p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
              "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
            )}
          >
            {filteredOptions?.map((option) => (
              <ComboboxOption
                key={option.id}
                value={option}
                className="w-full text-sm hover:bg-gray-200 items-center gap-2 rounded-lg py-1.5 px-3 cursor-pointer"
              >
                {option?.name || ""}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </Combobox>
      </div>
    );
  }
);

ComboboxDropdown.displayName = "ComboboxDropdown";
