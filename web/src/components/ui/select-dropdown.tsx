"use client";
import { Fragment, useState } from "react";
import { Option } from "@/interfaces/types";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import cn from "classnames";
import { Lucide } from "../common";
type Props = {
  options?: Option[] | [];
  value?: Option;
  error?: string;
  label?: string;
  placeholder?: string;
  onChange: (value: any) => void;
  className?: string;
  buttonClassName?: string;
  labelClassName?: string;
  accessorKey?: string;
};
export const SelectDropdown: React.FC<Props> = ({
  value,
  options,
  label,
  placeholder,
  error,
  accessorKey,
  className,
  buttonClassName,
  labelClassName,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState(
    value || (options && options[0])
  );
  const handleChange = (value: { id: string | number; value: string }) => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div className={cn("relative", className)}>
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
      <Listbox value={selectedValue} onChange={handleChange}>
        <ListboxButton
          className={cn(
            `flex justify-between items-center w-full text-left  capitalize text-xs font-medium py-2 px-2 rounded-md border outline-none focus:border-dash_red `,
            buttonClassName,
            {
              "border-dash_red": !!error,
            }
          )}
        >
          {(selectedValue && selectedValue[accessorKey as string]) ||
            selectedValue?.value ||
            placeholder}{" "}
          <Lucide name="ChevronDown" size={16} />
        </ListboxButton>

        {error && <small className="text-dash_red">{error}</small>}

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <ListboxOptions
            key={1}
            anchor="bottom"
            className={cn(
              "w-[var(--button-width)] rounded-xl border bg-white p-1 [--anchor-gap:var(--spacing-1)] transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
            )}
          >
            {(options || []).map((el, i) => (
              <ListboxOption
                key={el.id + i}
                value={el}
                className="w-full text-sm hover:bg-gray-200 items-center gap-2 rounded-lg py-1.5 px-3  cursor-pointer"
              >
                {el[accessorKey as string] || el.value}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </Listbox>
    </div>
  );
};
