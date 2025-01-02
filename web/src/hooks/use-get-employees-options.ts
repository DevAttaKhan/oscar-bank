import { IEmployee } from "@/interfaces/employee.interface";

import { IApiResponse, Option } from "@/interfaces/types";
import { EmployeeService } from "@/services/employee.service";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useGetEmployeesOptions = () => {
  const session = useSession();
  const [isSuccess, setIsSucess] = useState(false);
  const [branchsAsOptions, setBranchesAsOptions] = useState<Option[]>([]);

  const searchQuery = useCallback(
    async (query: string) => {
      try {
        const res = await EmployeeService.list({
          token: session.data?.user.token,
          params: {
            limit: 10,
            search: query,
            fields: "firstName,lastName",
          },
        });
        if (res.statusCode !== 200) {
          throw new Error("faild to fetch designation");
        }
        if (res.statusCode === 200) {
          const branchesAsOptions = (
            res as IApiResponse<IEmployee>
          ).result.data?.map(
            (el) =>
              ({ id: el.id, value: el.firstName, name: el.firstName } as Option)
          );
          setBranchesAsOptions(branchesAsOptions);
          setIsSucess(true);
          return branchesAsOptions || [];
        }
      } catch (error: any) {
        toast.error(error.message);
        setIsSucess(false);
      }
    },
    [session.data?.user.token]
  );

  useEffect(() => {
    searchQuery("");
  }, []);

  return {
    data: branchsAsOptions,
    searchQuery,
    isSuccess,
  };
};
