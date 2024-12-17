"use client";
import { Lucide, Modal } from "@/components/common";
import { Input } from "@/components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/button";
import {
  CreateDesignationSchma,
  DesignationInputType,
} from "@/lib/schema/common.schema";
import { toast } from "react-toastify";
import { DesignationService } from "@/services/designation.service";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IDesignation } from "@/interfaces/designation.interface";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  designation?: IDesignation;
};

export const UpsertDesignationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  designation,
}) => {
  const session = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DesignationInputType>({
    resolver: zodResolver(CreateDesignationSchma),
    values: designation,
  });

  const createDesignation = async (body) => {
    const res = await toast.promise(
      DesignationService.createDesignation(body, session.data?.user.token),
      {
        pending: "Creating Designation",
        success: "Created Successfully 👌",
        error: "Faild to Create 🤯",
      }
    );

    if (res.statusCode == 201) {
      router.refresh();
      reset();
      onClose();
    }
  };
  const updateDesignation = async (body) => {
    const res = await toast.promise(
      DesignationService.update(body, session.data?.user.token),
      {
        pending: "Updating Designation",
        success: "Updated Successfully 👌",
        error: "Faild to Update 🤯",
      }
    );

    if (res.statusCode == 200) {
      router.refresh();
      reset();
      onClose();
    }
  };

  const onSubmit = async (values) => {
    try {
      if (values?.id) {
        updateDesignation(values);
      } else {
        createDesignation(values);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} contentClassName="p-7 max-w-96">
      <>
        <div className="flex items-center gap-2 font-bold mb-6">
          <Lucide name="Users" />
          <h3>{designation ? "Update Designation" : "Create A Designation"}</h3>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-h-[80vh] overflow-scroll"
        >
          <Input
            type={"text"}
            placeholder="Designation title"
            className="mb-2"
            error={errors?.title?.message}
            {...register("title")}
          />
          <Input
            type={"text"}
            placeholder="Description"
            className="mb-2"
            error={errors?.description?.message}
            {...register("description")}
          />

          <Button className="col-span-full mt-5" type="submit">
            {designation ? "Update" : "Create"}
          </Button>
        </form>
      </>
    </Modal>
  );
};
