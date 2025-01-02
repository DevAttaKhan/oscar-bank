import { IBranch } from "@/interfaces/branch.interface";

import { IApiResponse, Option } from "@/interfaces/types";
import { BranchService } from "@/services/branch.service";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useGetBranchesOptions = () => {
  const session = useSession();
  const [isSuccess, setIsSucess] = useState(false);
  const [branchsAsOptions, setBranchesAsOptions] = useState<Option[]>([]);

  const searchQuery = useCallback(
    async (query: string) => {
      try {
        const res = await BranchService.list({
          token: session.data?.user.token,
          params: {
            limit: 10,
            search: query,
            fields: "name",
          },
        });
        if (res.statusCode !== 200) {
          throw new Error("faild to fetch designation");
        }
        if (res.statusCode === 200) {
          const branchesAsOptions = (
            res as IApiResponse<IBranch>
          ).result.data?.map(
            (el) => ({ id: el.id, value: el.name, name: el.name } as Option)
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
