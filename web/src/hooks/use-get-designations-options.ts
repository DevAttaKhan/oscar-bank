import { IDesignation } from "@/interfaces/designation.interface";
import { IApiResponse, Option } from "@/interfaces/types";
import { DesignationService } from "@/services/designation.service";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useGetDesignationsOptions = () => {
  const session = useSession();
  const [isSuccess, setIsSucess] = useState(false);
  const [designationsAsOptions, setDesignationsAsOptions] = useState<Option[]>(
    []
  );

  useEffect(() => {
    (async () => {
      try {
        const res = await DesignationService.list({
          token: session.data?.user.token,
          params: {
            limit: 1000,
          },
        });
        if (res.statusCode !== 200) {
          throw new Error("faild to fetch designation");
        }
        if (res.statusCode === 200) {
          const designationsAsOptions = (
            res as IApiResponse<IDesignation>
          ).result.data?.map(
            (el) => ({ id: el.id, value: el.title, name: el.title } as Option)
          );
          setDesignationsAsOptions(designationsAsOptions);
          setIsSucess(true);
        }
      } catch (error: any) {
        toast.error(error.message);
        setIsSucess(false);
      }
    })();
  }, [session.data?.user.token]);

  return {
    data: designationsAsOptions,
    isSuccess,
  };
};
