"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateBranchInputType,
  CreateBranchSchema,
} from "@/lib/schema/branches.schema";
import { CREATE_BRANCH_FORM_FIELDS } from "./data";
import { Input, SelectDropdown, Spinner } from "@/components/ui";
import Button from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { GetCountries, GetState, GetCity } from "react-country-state-city";
import { Option } from "@/interfaces/types";
export const CreateBranchForm: React.FC = () => {
  const [countries, setCountries] = useState<
    Awaited<ReturnType<typeof GetCountries>>
  >([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBranchInputType>({
    resolver: zodResolver(CreateBranchSchema),
  });

  const onSubmit = async (data: CreateBranchInputType) => {
    // console.log(data);
    // Handle form submission here
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
        {CREATE_BRANCH_FORM_FIELDS(
          countries,
          [{ id: 1, value: "value" }],
          [{ id: 1, value: "value" }]
        ).map((input) => {
          if (input.type !== "dropdown") {
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
          if (input.type === "dropdown") {
            return (
              <SelectDropdown
                key={input.name}
                label={input.label}
                placeholder={input.placeholder}
                onChange={() => {}}
                options={input.options as Option[]}
                accessorKey="name"
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
