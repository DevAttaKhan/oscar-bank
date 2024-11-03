"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useParamsNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigateWithQueryParams = (param) => {
    const query = param.toString();
    const newUrl = pathname + "?" + query;

    router.push(newUrl);
  };

  const getParams = () => {
    const params = new URLSearchParams(searchParams);

    return params;
  };

  return {
    getParams,
    navigateWithQueryParams,
  };
};
