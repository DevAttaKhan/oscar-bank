"use client";
import Link from "next/link";
import { NavItem } from "./data";
import cn from "classnames";
import { Lucide } from "@/components/common";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { isPathMatched } from "@/lib/utils/routes.util";

interface SideNavProps {
  navItems: NavItem[];
}

export const SideNav: React.FC<SideNavProps> = ({ navItems }) => {
  const pathname = usePathname();
  console.log(isPathMatched(pathname, "/admin"));
  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-white border border-r flex flex-col items-center pt-6">
      <Link href="#" className="flex items-center gap-2 mb-8">
        <Image src="/images/cards.logo.png" alt="logo" width={36} height={36} />
        <h1 className="text-xl font-semibold text-blue-600">Oscar Band</h1>
      </Link>
      <nav className="w-full">
        {navItems.map((item) => (
          <Link
            key={item.route}
            href={item.route}
            className={cn(
              `flex items-center w-full px-6 py-3 mb-2  hover:text-blue-500 hover:bg-gray-100 `,
              [
                isPathMatched(pathname, item.pattern || item.route)
                  ? "text-blue-500 bg-gray-100 "
                  : "text-gray-600",
              ]
            )}
          >
            <Lucide name={item.icon as any} className="mr-3" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};
