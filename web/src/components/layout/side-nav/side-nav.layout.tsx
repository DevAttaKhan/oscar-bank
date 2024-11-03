"use client";
import Link from "next/link";
import { NavItem } from "./data";
import cn from "classnames";
import { Lucide } from "@/components/common";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { isPathMatched } from "@/lib/utils/routes.util";
import { NavLink } from "@/components/ui/nav-link";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";

interface SideNavProps {
  navItems: NavItem[];
}

export const SideNav: React.FC<SideNavProps> = ({ navItems }) => {
  const locationPathName = usePathname();
  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-white border border-r flex flex-col items-center pt-6">
      <Link href="#" className="flex items-center gap-2 mb-8">
        <Image src="/images/cards.logo.png" alt="logo" width={36} height={36} />
        <h1 className="text-xl font-semibold text-blue-600">Oscar Bank</h1>
      </Link>
      <nav className="w-full px-2 text-sm">
        {navItems.map((item, i) => {
          if (item.children) {
            return (
              <Disclosure key={item.label}>
                <DisclosureButton
                  className={cn(
                    `flex items-center w-full px-6 py-2 mb-1 rounded-xl  hover:text-blue-500 hover:bg-gray-100 cursor-pointer `,
                    [
                      isPathMatched(locationPathName, item.route, item.exact)
                        ? "text-blue-500 bg-gray-100 "
                        : "text-gray-600",
                    ]
                  )}
                >
                  <Lucide name={item.icon as any} className="mr-2" size={16} />
                  <span>{item.label}</span>
                </DisclosureButton>
                <Transition
                  as={Fragment}
                  enter="ease-out duration-100"
                  enterFrom="max-h-0"
                  enterTo="max-h-16"
                  leave="ease-in duration-100 "
                  leaveFrom="max-h-16"
                  leaveTo="max-h-0"
                >
                  <DisclosurePanel transition className="overflow-hidden">
                    {item.children.map((c) => (
                      <Link
                        key={c.label}
                        href={c.route}
                        className={cn(
                          "flex items-center w-full pl-8 py-2 text-xs hover:text-blue-500 ",
                          [
                            isPathMatched(locationPathName, c.route, c.exact)
                              ? "text-blue-500 "
                              : "text-gray-600",
                          ]
                        )}
                      >
                        <Lucide
                          name={c.icon as any}
                          className="mr-2"
                          size={16}
                        />
                        {c.label}
                      </Link>
                    ))}
                  </DisclosurePanel>
                </Transition>
              </Disclosure>
            );
          } else
            return (
              <NavLink
                key={item.route}
                href={item.route}
                isExact={item.exact}
                className={({ active }) =>
                  cn(
                    `flex items-center w-full px-6 py-2 rounded-xl  mb-2  hover:text-blue-500 hover:bg-gray-100 `,
                    [active ? "text-blue-500 bg-gray-100 " : "text-gray-600"]
                  )
                }
              >
                <Lucide name={item.icon as any} className="mr-2" size={16} />
                <span>{item.label}</span>
              </NavLink>
            );
        })}
      </nav>
    </aside>
  );
};
