import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useState } from "react";
import cn from "classnames";

import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import { format } from "date-fns";

type Props = {
  type?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  error?: string;
  onChange?: (e: any) => void;
};
export const DatePicker: React.FC<Props> = ({
  placeholder,
  label,
  labelClassName,
  error,
  onChange,
}) => {
  const [selected, setSelected] = useState<Date>();
  const defaultClassNames = getDefaultClassNames();

  const handleSelect = (date) => {
    setSelected(date);
    if (typeof onChange === "function") onChange(date);
  };

  return (
    <Popover className="relative">
      {label && (
        <label
          className={cn(
            `block mb-1 ml-1 text-xs text-dash_black`,
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      <PopoverButton className="w-full text-left text-xs font-medium py-2 px-2 rounded-md border outline-none focus:border-dash_red ">
        {selected
          ? format(selected, "dd MMM YYY")
          : placeholder || " Pick a Date"}
      </PopoverButton>
      {error && <small className="text-dash_red ml-1">{error}</small>}
      <PopoverPanel anchor="bottom" className="bg-white p-2 rounded z-50 ">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={handleSelect}
          classNames={{
            today: `border-amber-500`, // Add a border to today's date
            selected: `bg-amber-500 border-amber-500 text-white`, // Highlight the selected day
            root: `${defaultClassNames.root} shadow-lg p-5`, // Add a shadow to the root element
            chevron: `${defaultClassNames.chevron} fill-amber-500`, // Change the color of the chevron
          }}
        />
      </PopoverPanel>
    </Popover>
  );
};
