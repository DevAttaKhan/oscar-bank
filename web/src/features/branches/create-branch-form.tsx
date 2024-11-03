"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { GetCountries, GetState, GetCity } from "react-country-state-city";
import { useAction } from "next-safe-action/hooks";
import { Option } from "@/interfaces/types";
import { createBranchAction } from "@/lib/actions/branch.actions";
import { CREATE_BRANCH_FORM_FIELDS } from "./data";
import {
  CreateBranchInputType,
  CreateBranchSchema,
} from "@/lib/schema/branches.schema";
import Button from "@/components/ui/button";
import {
  ComboboxDropdown,
  Input,
  SelectDropdown,
  Spinner,
} from "@/components/ui";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";
export const CreateBranchForm: React.FC = () => {
  const router = useRouter();
  const { executeAsync, isExecuting, result } = useAction(createBranchAction, {
    onExecute: () => {
      toast.loading("Saving Branch", {
        toastId: "saving-branch",
      });
    },
    onSuccess: () => {
      toast.update("saving-branch", {
        render: "Branch Saved ",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      router.push("/admin/branches");
    },

    onError: ({ error: { serverError, validationErrors } }) => {
      toast.update("saving-branch", {
        render: serverError,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    },
  });
  const [selectedCountryId, setSelectedCountryId] = useState<number>(1);
  const [cities, setCities] = useState<Awaited<ReturnType<typeof GetCity>>>([]);
  const [countries, setCountries] = useState<
    Awaited<ReturnType<typeof GetCountries>>
  >([]);
  const [states, setStates] = useState<Awaited<ReturnType<typeof GetState>>>(
    []
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateBranchInputType>({
    resolver: zodResolver(CreateBranchSchema),
  });

  const onSubmit = async (data: CreateBranchInputType) => {
    const res = await executeAsync(data);
  };

  const handleDropdownChange = async (name: string, value: any) => {
    if (name === "country") {
      setSelectedCountryId(value.id);
      const states = await GetState(value.id);
      setStates(states);
    }
    if (name === "state") {
      const cities = await GetCity(selectedCountryId, value.id);
      setCities(cities);
    }
    if (name === "city") {
      const cities = await GetCity(selectedCountryId, value.id);
      setCities(cities);
    }

    setValue(name as keyof CreateBranchInputType, value.name, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    (async () => {
      const c = await GetCountries();
      setCountries(c);
    })();
  }, []);

  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-2">Add New Branch</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-[1fr_1fr] gap-4 bg-white rounded-lg px-5 py-9 shadow"
      >
        {CREATE_BRANCH_FORM_FIELDS(countries, states, cities).map((input) => {
          if (input.type === "text") {
            return (
              <Input
                type={input?.type || "text"}
                label={input.label}
                placeholder={input.placeholder}
                key={input.name}
                error={
                  errors[input.name as keyof CreateBranchInputType]?.message
                }
                {...register(input.name as keyof CreateBranchInputType)}
              />
            );
          }
          if (input.type === "combobox") {
            return (
              <ComboboxDropdown
                key={input.name}
                label={input.label}
                placeholder={input.placeholder}
                onChange={(v) => handleDropdownChange(input.name, v)}
                options={input.options as Option[]}
                // accessorKey="name"
                error={
                  errors[input.name as keyof CreateBranchInputType]?.message
                }
              />
            );
          }
          if (input.type === "dropdown") {
            return (
              <SelectDropdown
                key={input.name}
                label={input.label}
                placeholder={input.placeholder}
                onChange={(v) => handleDropdownChange(input.name, v)}
                options={input.options as Option[]}
                accessorKey="name"
                error={
                  errors[input.name as keyof CreateBranchInputType]?.message
                }
              />
            );
          }
        })}
        <Button className="col-span-full mt-5" type="submit">
          {false ? <Spinner classNames="w-6 bg-white p-1" /> : "Create Branch"}
        </Button>
      </form>
    </div>
  );
};
