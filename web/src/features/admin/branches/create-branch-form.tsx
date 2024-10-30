"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateBranchInputType,
  CreateBranchSchema,
} from "@/lib/schema/branches.schema";
import { CREATE_BRANCH_FORM_FIELDS } from "./data";
import { Input } from "@/components/ui";

export const CreateBranchForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBranchInputType>({
    resolver: zodResolver(CreateBranchSchema),
  });

  const onSubmit = (data: CreateBranchInputType) => {
    console.log(data);
    // Handle form submission here
  };

  return (
    <div className="bg-white rounded px-4 py-5 shadow">
      <h2>Add New Branch</h2>
      <p className="description">
        Fill out the details below to add a new branch to the system. Ensure all
        information is accurate before submission.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-[1fr_1fr] gap-4"
      >
        {CREATE_BRANCH_FORM_FIELDS.map((input) => {
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
        })}
        <button type="submit" className="submit-button">
          Add Branch
        </button>
      </form>
    </div>
  );
};
