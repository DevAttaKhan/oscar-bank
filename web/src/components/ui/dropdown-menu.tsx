import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Lucide } from "../common";
import React from "react";

type MenuItemType = {
  icon?: React.ReactNode;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  funtion?: Function;
};

type Props = {
  buttonContent?: React.ReactNode | string;
  options: MenuItemType[];
};

export const DropdownMenu: React.FC<Props> = ({
  buttonContent = <Lucide name="EllipsisVertical" size={20} color="#718EBF" />,
  options,
}) => {
  return (
    <Menu>
      <MenuButton className=" ">{buttonContent}</MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="w-44 origin-top-right rounded-xl border  bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        {options?.map((el) => (
          <MenuItem key={el.label}>
            <button
              onClick={() => el.funtion && el.funtion()}
              className="group text-xs font-semibold flex w-full items-center gap-2 rounded-lg py-1 px-3 data-[focus]:bg-gray-100"
            >
              {el.icon && el.icon}
              {el.label && el.label}
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};
