"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IApiError, Option } from "@/interfaces/types";
import { UPSERT_EMPLOYEE_FORM_FIELDS } from "./data";
import { CreateBranchInputType } from "@/lib/schema/branches.schema";
import Button from "@/components/ui/button";
import {
  ComboboxDropdown,
  Input,
  SelectDropdown,
  Spinner,
} from "@/components/ui";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";
import { useGetDesignationsOptions } from "@/hooks/use-get-designations-options";
import { useGetBranchesOptions } from "@/hooks/use-get-branches-options";
import { useGetEmployeesOptions } from "@/hooks/use-get-employees-options";
import { useMemo } from "react";
import {
  CreateEmployeeSchema,
  CreateEmployeeSchemaInput,
} from "@/lib/schema/employee.schema";
import { DatePicker } from "@/components/common";
import { EmployeeService } from "@/services/employee.service";
import { useSession } from "next-auth/react";
export const UpsertEmployeeForm: React.FC = () => {
  const session = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateEmployeeSchemaInput>({
    resolver: zodResolver(CreateEmployeeSchema),
  });

  const { data: designationsAsOptions } = useGetDesignationsOptions();
  const { data: branchesAsOptions, searchQuery } = useGetBranchesOptions();
  const { data: employeesAsOptions, searchQuery: employeeSearchQuery } =
    useGetEmployeesOptions();

  const onSubmit = async (data: CreateEmployeeSchemaInput) => {
    const toastId = toast.loading("Creating Employee");
    try {
      const res = await EmployeeService.create(data, session.data?.user.token);
      if (res.statusCode !== 201) {
        throw new Error((res as IApiError).message);
      }
      if (res.statusCode === 201) {
        toast.update(toastId, {
          type: "success",
          render: "Employee Created Successfully",
          isLoading: false,
          autoClose: 2000,
        });
        router.push("/admin/users/employees");
      }
    } catch (error: any) {
      toast.update(toastId, {
        type: "error",
        render: error.message,
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const handleDropdownChange = async (name: string, option: any) => {
    setValue(
      name as keyof CreateEmployeeSchemaInput,
      option?.id || option?.value || option?.name,
      {
        shouldValidate: true,
        shouldDirty: true,
      }
    );
  };

  const searchQueryMap = useMemo(
    () => ({
      assignedBranchId: searchQuery,
      supervisorId: employeeSearchQuery,
    }),
    [employeeSearchQuery, searchQuery]
  );

  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-2">Add New Employee</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-[1fr_1fr] gap-4 bg-white rounded-lg px-5 py-9 shadow"
      >
        {UPSERT_EMPLOYEE_FORM_FIELDS(
          designationsAsOptions,
          branchesAsOptions,
          employeesAsOptions
        ).map((input) => {
          if (input.type === "text") {
            return (
              <Input
                type={input?.type || "text"}
                label={input.label}
                placeholder={input.placeholder}
                key={input.name}
                error={
                  errors[input.name as keyof CreateEmployeeSchemaInput]?.message
                }
                {...register(input.name as keyof CreateEmployeeSchemaInput)}
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
                onApiSearch={searchQueryMap[input.name]}
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
                error={
                  errors[input.name as keyof CreateBranchInputType]?.message
                }
              />
            );
          }
          if (input.type === "date") {
            return (
              <DatePicker
                key={input.name}
                label={input.label}
                placeholder={input.placeholder}
                onChange={(v) =>
                  setValue(input.name as keyof CreateEmployeeSchemaInput, v, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
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
