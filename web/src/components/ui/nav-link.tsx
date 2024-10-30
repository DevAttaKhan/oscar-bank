import { isPathMatched } from "@/lib/utils/routes.util";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import cn from "classnames";
type Props = {
  href: string;
  isExact?: boolean;
  className?: string | ((options: { active: boolean }) => string);
  children: React.ReactNode;
};

export const NavLink: React.FC<Props> = ({
  children,
  href,
  isExact,
  className,
}) => {
  const locationPathName = usePathname();
  const isActive = useMemo(
    () => isPathMatched(locationPathName, href, isExact),
    [href, locationPathName, isExact]
  );
  const enhancedClass = useMemo(() => {
    if (typeof className === "string") {
      return className;
    }
    if (typeof className == "function") {
      return className({ active: isActive });
    }
  }, [locationPathName, isActive, className]);
  return (
    <Link href={href} className={enhancedClass}>
      {children}
    </Link>
  );
};
